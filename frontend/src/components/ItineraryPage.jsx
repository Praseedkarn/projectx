import React, { useState, useEffect } from 'react';
import '../styles/ItineraryPage.css';

const ItineraryPage = ({ onBack, onItineraryClick, onViewSaved }) => {
  // Sample popular itineraries data
  const [popularItineraries] = useState([
    {
      id: 1,
      title: 'Bali Adventure',
      duration: '7 days',
      description: 'Explore the best of Bali - beaches, temples, and rice terraces',
      location: 'Bali, Indonesia',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Beach', 'Culture', 'Adventure']
    },
    {
      id: 2,
      title: 'European Capitals',
      duration: '10 days',
      description: 'Visit Paris, Rome, and Amsterdam in one unforgettable trip',
      location: 'Europe',
      difficulty: 'Easy',
      price: '$$$',
      tags: ['City', 'Culture', 'History']
    },
    {
      id: 3,
      title: 'Japanese Culture',
      duration: '14 days',
      description: 'Traditional temples, modern cities, and authentic cuisine',
      location: 'Japan',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Culture', 'Food', 'History']
    },
    {
      id: 4,
      title: 'Australian Road Trip',
      duration: '12 days',
      description: 'Coastal drives from Sydney to Melbourne with wildlife encounters',
      location: 'Australia',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Nature', 'Road Trip', 'Beach']
    },
    {
      id: 5,
      title: 'Peru Discovery',
      duration: '9 days',
      description: 'Machu Picchu, Sacred Valley, and Peruvian cuisine',
      location: 'Peru',
      difficulty: 'Challenging',
      price: '$$',
      tags: ['Adventure', 'History', 'Mountains']
    },
    {
      id: 6,
      title: 'Thai Islands',
      duration: '8 days',
      description: 'Island hopping in Southern Thailand paradise',
      location: 'Thailand',
      difficulty: 'Easy',
      price: '$',
      tags: ['Beach', 'Island', 'Relaxation']
    },
    {
      id: 7,
      title: 'Safari Experience',
      duration: '6 days',
      description: 'Wildlife safari in the heart of Africa',
      location: 'Kenya',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Wildlife', 'Adventure', 'Nature']
    },
    {
      id: 8,
      title: 'California Coast',
      duration: '10 days',
      description: 'Highway 1 road trip from San Francisco to Los Angeles',
      location: 'USA',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Road Trip', 'Beach', 'Nature']
    },
    {
      id: 9,
      title: 'Delhi Heritage Tour',
      duration: '3 days',
      description: 'Explore the rich history and culture of Delhi',
      location: 'Delhi, India',
      difficulty: 'Easy',
      price: '$',
      tags: ['History', 'Culture', 'Food']
    },
    {
      id: 10,
      title: 'Goa Beach Holiday',
      duration: '5 days',
      description: 'Relax on beautiful beaches and enjoy seafood',
      location: 'Goa, India',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Beach', 'Relaxation', 'Food']
    },
    {
      id: 11,
      title: 'Kashmir Valley',
      duration: '6 days',
      description: 'Houseboats, gardens, and mountain views',
      location: 'Kashmir, India',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Mountains', 'Nature', 'Culture']
    },
    {
      id: 12,
      title: 'Rajasthan Royal Tour',
      duration: '8 days',
      description: 'Palaces, forts, and desert safari',
      location: 'Rajasthan, India',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['History', 'Culture', 'Desert']
    }
  ]);

  const [savedItineraries, setSavedItineraries] = useState([]);
  const [savedCount, setSavedCount] = useState(0);

  // Load saved itineraries
  useEffect(() => {
    const loadSavedItineraries = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('savedItineraries')) || [];
        setSavedItineraries(saved);
        setSavedCount(saved.length);
      } catch (error) {
        console.error('Error loading saved itineraries:', error);
      }
    };
    
    loadSavedItineraries();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadSavedItineraries();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to handle itinerary click
  const handleItineraryClick = (itinerary) => {
    if (onItineraryClick) {
      onItineraryClick(itinerary.id);
    }
  };

  // Toggle save itinerary
  const toggleSaveItinerary = (itinerary, e) => {
    e.stopPropagation(); // Prevent card click
    
    let updatedSaved;
    const isAlreadySaved = savedItineraries.some(item => item.id === itinerary.id);
    
    if (isAlreadySaved) {
      // Remove from saved
      updatedSaved = savedItineraries.filter(item => item.id !== itinerary.id);
    } else {
      // Add to saved
      updatedSaved = [...savedItineraries, { 
        ...itinerary, 
        savedAt: new Date().toISOString(),
        userNotes: '' 
      }];
    }
    
    setSavedItineraries(updatedSaved);
    setSavedCount(updatedSaved.length);
    localStorage.setItem('savedItineraries', JSON.stringify(updatedSaved));
    
    // Optional: Show a quick notification
    const saveBtn = e.target;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = isAlreadySaved ? '☆ Save' : '⭐ Saved';
    setTimeout(() => {
      saveBtn.textContent = originalText;
    }, 1000);
  };

  // Check if itinerary is saved
  const isItinerarySaved = (id) => {
    return savedItineraries.some(item => item.id === id);
  };

  return (
    <div className="itinerary-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        
        {savedCount > 0 && onViewSaved && (
          <button 
            className="view-saved-btn"
            onClick={onViewSaved}
          >
            ⭐ View Saved ({savedCount})
          </button>
        )}
      </div>
      
      <div className="hero-section">
        <h1 className="page-title">Popular Travel Itineraries</h1>
        <p className="page-subtitle">
          Click on any itinerary to view detailed trip information. 
          {savedCount > 0 && ` You have ${savedCount} saved ${savedCount === 1 ? 'itinerary' : 'itineraries'}.`}
        </p>
      </div>

      <div className="itinerary-grid">
        {popularItineraries.map((itinerary) => (
          <button
            key={itinerary.id}
            className="itinerary-card"
            onClick={() => handleItineraryClick(itinerary)}
          >
            <div className="card-header">
              <h3 className="itinerary-title">{itinerary.title}</h3>
              <div className="card-header-right">
                <span className="duration-badge">{itinerary.duration}</span>
                {/* <button 
                  className={`save-btn ${isItinerarySaved(itinerary.id) ? 'saved' : ''}`}
                  onClick={(e) => toggleSaveItinerary(itinerary, e)}
                  title={isItinerarySaved(itinerary.id) ? "Remove from saved" : "Save this itinerary"}
                >
                  {isItinerarySaved(itinerary.id) ? '⭐ Saved' : '☆ Save'}
                </button> */}
              </div>
            </div>
            
            <p className="itinerary-location">📍 {itinerary.location}</p>
            
            <p className="itinerary-description">{itinerary.description}</p>
            
            <div className="itinerary-meta">
              <span className={`difficulty-badge difficulty-${itinerary.difficulty.toLowerCase()}`}>
                {itinerary.difficulty}
              </span>
              <span className="price-badge">{itinerary.price}</span>
            </div>
            
            <div className="tags-container">
              {itinerary.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="view-details">
              Click to view details →
            </div>
          </button>
        ))}
      </div>
      
      <div className="instructions">
        <p>💡 <strong>How to use:</strong> Click on any itinerary button above to see detailed trip information including day-by-day plans, activities, accommodations, and travel tips.</p>
        <p>⭐ <strong>Save feature:</strong> Click the "Save" button on any itinerary to add it to your saved collection for easy access later.</p>
        {savedCount > 0 && onViewSaved && (
          <button 
            className="view-saved-bottom-btn"
            onClick={onViewSaved}
          >
            ⭐ View All Saved Itineraries ({savedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;