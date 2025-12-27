import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer';
import SignIn from './components/SignIn';
import TripResults from './components/TripResults';
import ProfilePage from './components/ProfilePage';
import ItineraryPage from './components/ItineraryPage';
import ItineraryDetail from './components/ItineraryDetail';
import SavedItineraries from './components/SavedItineraries';
import PackingList from './components/PackingList';
import { generateTravelItinerary } from './services/api';
// Import detailed itineraries from ItineraryDetail component
import { detailedItineraries } from './components/ItineraryDetail';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tripSuggestions, setTripSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const [selectedItineraryId, setSelectedItineraryId] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'available', 'unavailable'

  // Check login status from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Check API status when user logs in
  useEffect(() => {
    const checkAPIStatus = async () => {
      if (currentUser) {
        try {
          // Test the API with a simple request
          const testResult = await generateTravelItinerary('test trip', 'morning');
          if (testResult && Array.isArray(testResult)) {
            setApiStatus('available');
          } else {
            setApiStatus('unavailable');
          }
        } catch (error) {
          console.log('API test failed, using mock data:', error.message);
          setApiStatus('unavailable');
        }
      }
    };
    
    checkAPIStatus();
  }, [currentUser]);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setShowSignIn(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setActiveComponent('home');
    alert('Logged out successfully!');
  };

  // Generate mock AI suggestions (fallback function)
  const generateMockSuggestions = (description, detailLevel) => {
    const suggestions = [];
    const times = detailLevel === 'hourly' 
      ? ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
      : ['Morning', 'Afternoon', 'Evening'];
    
    const activities = [
      {
        activity: "Visit Local Markets",
        location: "Chandni Chowk, Delhi",
        transport: "Auto - ₹150-200",
        duration: "2-3 hours",
        cost: "₹500",
        description: "Experience local culture and street food"
      },
      {
        activity: "Historical Site Exploration",
        location: "Red Fort, Delhi",
        transport: "Metro - ₹50",
        duration: "2 hours",
        cost: "₹350",
        description: "Explore Mughal architecture and history"
      },
      {
        activity: "Lunch at Local Restaurant",
        location: "Karim's, Jama Masjid",
        transport: "Walk - 10min",
        duration: "1.5 hours",
        cost: "₹800",
        description: "Authentic Mughlai cuisine"
      },
      {
        activity: "Shopping Experience",
        location: "Dilli Haat",
        transport: "Taxi - ₹250",
        duration: "2 hours",
        cost: "₹1000",
        description: "Handicrafts from all over India"
      },
      {
        activity: "Evening Cultural Show",
        location: "Kingdom of Dreams",
        transport: "Taxi - ₹300",
        duration: "3 hours",
        cost: "₹1200",
        description: "Bollywood musical and dinner"
      }
    ];

    times.forEach((time, index) => {
      if (index < activities.length) {
        suggestions.push({
          time,
          ...activities[index]
        });
      }
    });

    return suggestions;
  };

  // Handle form submit - UPDATED WITH AI API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please sign in first to plan your trip!');
      setShowSignIn(true);
      return;
    }
    
    const formData = new FormData(e.target);
    const description = formData.get('description');
    const detailLevel = formData.get('detail') || 'morning';
    
    if (!description.trim()) {
      alert('Please enter trip details!');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Calling OpenRouter AI API...');
      const aiSuggestions = await generateTravelItinerary(description, detailLevel);
      
      // Check if we got valid suggestions from API
      if (aiSuggestions && Array.isArray(aiSuggestions) && aiSuggestions.length > 0) {
        console.log('AI suggestions received:', aiSuggestions.length);
        setTripSuggestions(aiSuggestions);
        setApiStatus('available');
      } else {
        // Fallback to mock data if API returns empty or invalid
        console.log('Using mock suggestions as fallback');
        const mockSuggestions = generateMockSuggestions(description, detailLevel);
        setTripSuggestions(mockSuggestions);
        if (apiStatus === 'available') {
          setApiStatus('unavailable');
        }
      }
      
      setActiveComponent('results');
      
      // Save the trip to localStorage
      const tripData = {
        id: Date.now(),
        description: description,
        suggestions: tripSuggestions,
        date: new Date().toISOString(),
        detailLevel: detailLevel,
        source: aiSuggestions && aiSuggestions.length > 0 ? 'ai' : 'mock'
      };
      
      const savedTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
      savedTrips.push(tripData);
      localStorage.setItem('userTrips', JSON.stringify(savedTrips));
      
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      
      // Fallback to mock data on error
      const mockSuggestions = generateMockSuggestions(description, detailLevel);
      setTripSuggestions(mockSuggestions);
      setActiveComponent('results');
      setApiStatus('unavailable');
      
      // Show error message but continue with mock data
      alert('AI service is temporarily unavailable. Showing sample itinerary.');
      
    } finally {
      setLoading(false);
    }
  };

  // Fetch itineraries - using data from ItineraryDetail
  const fetchItineraries = async () => {
    // Check localStorage for saved itineraries
    const savedItineraries = localStorage.getItem('itineraries');
    if (savedItineraries) {
      return JSON.parse(savedItineraries);
    }
    
    // Create simplified version of detailed itineraries for the gallery view
    const simplifiedItineraries = Object.values(detailedItineraries).map(itinerary => ({
      id: itinerary.id,
      title: itinerary.title,
      location: itinerary.location,
      description: itinerary.description.substring(0, 150) + '...', // Shorten description
      duration: itinerary.duration,
      difficulty: itinerary.difficulty,
      priceRange: itinerary.priceRange,
      bestTime: itinerary.bestTime,
      tags: [
        itinerary.location.includes('India') ? 'India' : 'International',
        itinerary.duration.includes('day') ? 'Multi-day' : 'Weekend',
        itinerary.difficulty === 'Easy' ? 'Family Friendly' : 'Adventure',
        ...(itinerary.tags || [])
      ].slice(0, 4), // Limit to 4 tags
      highlights: itinerary.highlights?.slice(0, 3) || [],
      image: itinerary.image // Include image if available
    }));
    
    // Save to localStorage for next time
    localStorage.setItem('itineraries', JSON.stringify(simplifiedItineraries));
    return simplifiedItineraries;
  };

  // Handle packing list navigation
  const handlePackingListClick = (tripDetails = null) => {
    if (!currentUser) {
      alert('Please sign in to use the packing list!');
      setShowSignIn(true);
      return;
    }
    
    // Create trip details for packing list
    const packingTripDetails = tripDetails || {
      description: tripSuggestions.length > 0 
        ? document.querySelector('.trip-input')?.value || 'My AI-Planned Trip'
        : 'My Trip',
      duration: 'Flexible',
      travelers: '1',
      budget: 'Medium'
    };
    
    // Set packing list trip details
    localStorage.setItem('packingTripDetails', JSON.stringify(packingTripDetails));
    setActiveComponent('packing');
  };

  // Navigation
  const handleNavigation = (destination) => {
    setActiveComponent(destination);
  };

  // Get trip details for packing list
  const getPackingTripDetails = () => {
    try {
      const savedDetails = localStorage.getItem('packingTripDetails');
      return savedDetails ? JSON.parse(savedDetails) : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="App">
      <Header 
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onLogoutClick={handleLogout}
        onProfileClick={() => handleNavigation('profile')}
        onHomeClick={() => handleNavigation('home')}
        onItinerariesClick={() => {
          if (currentUser) {
            handleNavigation('itineraries');
          } else {
            alert('Please sign in to view popular itineraries!');
            setShowSignIn(true);
          }
        }}
        onSavedClick={() => {
          if (currentUser) {
            handleNavigation('saved');
          } else {
            alert('Please sign in to view saved itineraries!');
            setShowSignIn(true);
          }
        }}
        onPackingListClick={() => handlePackingListClick()}
      />

      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      <main className="main-content">
        {(() => {
          switch (activeComponent) {
            case 'profile':
              return (
                <ProfilePage
                  user={currentUser}
                  onBack={() => handleNavigation('home')}
                  onLogout={handleLogout}
                  onTripClick={(trip) => {
                    setTripSuggestions(trip.suggestions);
                    setActiveComponent('results');
                  }}
                  onPackingListClick={() => handlePackingListClick()}
                />
              );
              
            case 'itineraries':
              return (
                <ItineraryPage
                  onBack={() => handleNavigation('home')}
                  onItineraryClick={(itineraryId) => {
                    setSelectedItineraryId(itineraryId);
                    setActiveComponent('itinerary-detail');
                  }}
                  onViewSaved={() => handleNavigation('saved')}
                  fetchItineraries={fetchItineraries}
                />
              );
              
            case 'itinerary-detail':
              return (
                <ItineraryDetail 
                  itineraryId={selectedItineraryId}
                  onBack={() => handleNavigation('itineraries')}
                  onPackingListClick={() => handlePackingListClick()}
                />
              );
              
            case 'saved':
              return (
                <SavedItineraries
                  onBack={() => handleNavigation('itineraries')}
                  onItineraryClick={(itineraryId) => {
                    setSelectedItineraryId(itineraryId);
                    setActiveComponent('itinerary-detail');
                  }}
                  user={currentUser}
                />
              );
              
            case 'results':
              return (
                <TripResults 
                  suggestions={tripSuggestions}
                  onClose={() => handleNavigation('home')}
                  onBack={() => {
                    if (selectedItineraryId) {
                      setActiveComponent('itinerary-detail');
                    } else {
                      handleNavigation('home');
                    }
                  }}
                  onPackingListClick={() => handlePackingListClick()}
                  aiGenerated={tripSuggestions.length > 0 && tripSuggestions[0]?.source !== 'mock'}
                />
              );
              
            case 'packing':
              return (
                <PackingList
                  onBack={() => {
                    // Go back to previous component
                    if (tripSuggestions.length > 0) {
                      setActiveComponent('results');
                    } else {
                      setActiveComponent('home');
                    }
                  }}
                  user={currentUser}
                  tripDetails={getPackingTripDetails()}
                />
              );
              
            default:
              return (
                <>
                  {currentUser && (
                    <div className="user-welcome">
                      <h3> Welcome back, {currentUser.username || currentUser.name}!</h3>
                      <p>Ready to plan your next adventure? </p>
                      <div className="quick-tools">
                        <button 
                          className="tool-btn packing-tool-btn"
                          onClick={() => handlePackingListClick()}
                        >
                          🧳 Create Packing List
                        </button>
                        <button 
                          className="tool-btn"
                          onClick={() => handleNavigation('itineraries')}
                        >
                          📋 Browse Itineraries
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="trip-planner">
                    <h1 className="planner-title">Plan Your Trip</h1>
                    
                    {!currentUser && (
                      <div className="signin-prompt">
                        <p>Already have an account? 
                          <button 
                            className="signin-link"
                            onClick={() => setShowSignIn(true)}
                          >
                            Sign In
                          </button>
                        </p>
                        <p className="demo-note">
                          <small>Demo: Use any email/password</small>
                        </p>
                      </div>
                    )}
                    
                    {/* API Status Indicator */}
                    {currentUser && apiStatus !== 'checking' && (
                      <div className={`api-status ${apiStatus}`}>
                        {apiStatus === 'available' ? '✅ AI Assistant Ready' : '⚠️ Using Offline Mode'}
                      </div>
                    )}
                    
                    <div className="divider"></div>
                    
                    <form className="trip-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Where to, how long, and any other details?</label>
                        <textarea 
                          className="trip-input"
                          name="description"
                          placeholder={currentUser 
                            ? "e.g., Weekend trip to Delhi with family, want to see historical sites and try local food..."
                            : "Please sign in first to plan your trip..."
                          }
                          rows="4"
                          disabled={!currentUser || loading}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="form-group">
                        <label>Itinerary Detail Level</label>
                        <div className="radio-group">
                          <label className="radio-option">
                            <input 
                              type="radio" 
                              name="detail" 
                              value="morning" 
                              defaultChecked 
                              disabled={!currentUser || loading}
                            />
                            <span>Morning/Afternoon/Evening</span>
                          </label>
                          <label className="radio-option">
                            <input 
                              type="radio" 
                              name="detail" 
                              value="hourly" 
                              disabled={!currentUser || loading}
                            />
                            <span>Hour-by-hour</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="divider"></div>
                      
                      <div className="action-buttons">
                        <button 
                          type="submit" 
                          className="get-itinerary-btn"
                          disabled={!currentUser || loading}
                        >
                          {loading ? (
                            <>
                              <span className="loading-spinner"></span>
                              ⚡ Planning with AI...
                            </>
                          ) : currentUser ? (
                            '✨ Generate AI Itinerary'
                          ) : (
                            'Please Sign In First'
                          )}
                        </button>
                        
                        {currentUser && (
                          <>
                            
                            
                            
                          </>
                        )}
                      </div>
                    </form>
                    
                    {currentUser && (
                      <div className="sample-prompt">
                        <p className="sample-title">Try these examples:</p>
                        <button 
                          className="sample-btn"
                          onClick={() => {
                            const textarea = document.querySelector('.trip-input');
                            if (textarea) textarea.value = "Weekend trip to Delhi with family";
                          }}
                        >
                          "Weekend trip to Delhi with family"
                        </button>
                        <button 
                          className="sample-btn"
                          onClick={() => {
                            const textarea = document.querySelector('.trip-input');
                            if (textarea) textarea.value = "Mumbai to Goa train journey with layover";
                          }}
                        >
                          "Train journey with layover"
                        </button>
                        <button 
                          className="sample-btn"
                          onClick={() => handleNavigation('itineraries')}
                        >
                          "Browse popular itineraries"
                        </button>
                        <button 
                          className="sample-btn"
                          onClick={() => handlePackingListClick()}
                        >
                          "Create packing list"
                        </button>
                      </div>
                    )}
                  </div>
                </>
              );
          }
        })()}
      </main>
      <Footer />
    </div>
  );
}

export default App;