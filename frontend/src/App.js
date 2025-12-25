import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer';
import SignIn from './components/SignIn';
import TripResults from './components/TripResults';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [tripSuggestions, setTripSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check login status
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.isLoggedIn) {
        setCurrentUser(user);
      }
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setShowSignIn(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowResults(false);
    alert('Logged out successfully!');
  };

  // Generate mock AI suggestions
  const generateSuggestions = (description, detailLevel) => {
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

  // Handle form submit
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
    
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = generateSuggestions(description, detailLevel);
      setTripSuggestions(suggestions);
      setShowResults(true);
      setLoading(false);
      
      // Save to user's trip history
      const userTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
      userTrips.push({
        id: Date.now(),
        description,
        suggestions,
        date: new Date().toLocaleDateString(),
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('userTrips', JSON.stringify(userTrips));
    }, 1500);
  };

  // Create demo accounts
  useEffect(() => {
    const hasDemoAccounts = localStorage.getItem('demoAccountsCreated');
    if (!hasDemoAccounts) {
      const demoUsers = [
        {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
          password: 'test123',
          createdAt: new Date().toISOString(),
          trips: []
        }
      ];
      localStorage.setItem('travelUsers', JSON.stringify(demoUsers));
      localStorage.setItem('demoAccountsCreated', 'true');
    }
  }, []);

  return (
    <div className="App">
      <Header 
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onLogoutClick={handleLogout}
      />

      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      <main className="main-content">
        {/* User Welcome */}
        {currentUser && (
          <div className="user-welcome">
            <h3> Welcome back, {currentUser.name}!</h3>
            <p>Ready to plan your next adventure? </p>
          </div>
        )}
        
        {!showResults ? (
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
                  <small>Demo: test@test.com / test123</small>
                </p>
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
              
              <button 
                type="submit" 
                className="get-itinerary-btn"
                disabled={!currentUser || loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Planning your trip...
                  </>
                ) : currentUser ? (
                  ' Generate AI Itinerary'
                ) : (
                  'Please Sign In First'
                )}
              </button>
            </form>
            
            {currentUser && (
              <div className="sample-prompt">
                <p className="sample-title">Try these examples:</p>
                <button 
                  className="sample-btn"
                  onClick={() => {
                    document.querySelector('.trip-input').value = "Weekend trip to Delhi with family, want to see historical sites";
                  }}
                >
                  "Weekend trip to Delhi with family"
                </button>
                <button 
                  className="sample-btn"
                  onClick={() => {
                    document.querySelector('.trip-input').value = "Mumbai to Goa train journey with 4 hour layover";
                  }}
                >
                  "Train journey with layover"
                </button>
              </div>
            )}
          </div>
        ) : (
          <TripResults 
            suggestions={tripSuggestions}
            onClose={() => setShowResults(false)}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;