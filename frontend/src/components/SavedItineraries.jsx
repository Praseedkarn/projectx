import React, { useState, useEffect } from 'react';
import '../styles/SavedItineraries.css';

const SavedItineraries = ({ onBack, onItineraryClick }) => {
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load saved itineraries from localStorage
  useEffect(() => {
    const loadSavedItineraries = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('savedItineraries')) || [];
        setSavedItineraries(saved);
      } catch (error) {
        console.error('Error loading saved itineraries:', error);
        setSavedItineraries([]);
      } finally {
        setLoading(false);
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
  
  // Remove saved itinerary
  const removeSavedItinerary = (id) => {
    const updated = savedItineraries.filter(item => item.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('savedItineraries', JSON.stringify(updated));
  };
  
  // Clear all saved itineraries
  const clearAllSaved = () => {
    if (window.confirm('Are you sure you want to clear all saved itineraries?')) {
      setSavedItineraries([]);
      localStorage.removeItem('savedItineraries');
      alert('All saved itineraries have been cleared!');
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="saved-page">
        <button className="back-button" onClick={onBack}>
          ← Back to Popular Itineraries
        </button>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your saved itineraries...</p>
        </div>
      </div>
    );
  }
  
  if (savedItineraries.length === 0) {
    return (
      <div className="saved-page">
        <button className="back-button" onClick={onBack}>
          ← Back to Popular Itineraries
        </button>
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h2>No Saved Itineraries Yet</h2>
          <p>Go to Popular Itineraries and click "Save" on itineraries you like!</p>
          <button className="browse-btn" onClick={onBack}>
            Browse Popular Itineraries
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="saved-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Popular Itineraries
      </button>
      
      <div className="saved-header">
        <div className="header-left">
          <h1>⭐ My Saved Itineraries</h1>
          <p className="saved-count">{savedItineraries.length} {savedItineraries.length === 1 ? 'itinerary' : 'itineraries'} saved</p>
        </div>
        <button className="clear-all-btn" onClick={clearAllSaved}>
          Clear All
        </button>
      </div>
      
      <div className="saved-grid">
        {savedItineraries.map((itinerary) => (
          <div key={itinerary.id} className="saved-card">
            <div className="card-header">
              <div className="card-title-section">
                <h3>{itinerary.title}</h3>
                <span className="saved-date">
                  Saved on {formatDate(itinerary.savedAt || new Date())}
                </span>
              </div>
              <div className="card-actions">
                <button 
                  className="view-btn"
                  onClick={() => onItineraryClick(itinerary.id)}
                >
                  View Details
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => removeSavedItinerary(itinerary.id)}
                  title="Remove from saved"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="card-content">
              <div className="location-duration">
                <span className="location">📍 {itinerary.location}</span>
                <span className="duration">🕒 {itinerary.duration}</span>
                <span className={`difficulty difficulty-${itinerary.difficulty?.toLowerCase() || 'moderate'}`}>
                  {itinerary.difficulty || 'Moderate'}
                </span>
                <span className="price">{itinerary.price || '$$'}</span>
              </div>
              
              <p className="description">{itinerary.description}</p>
              
              {itinerary.tags && itinerary.tags.length > 0 && (
                <div className="tags-container">
                  {itinerary.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                  {itinerary.tags.length > 3 && (
                    <span className="tag-more">+{itinerary.tags.length - 3} more</span>
                  )}
                </div>
              )}
              
              {itinerary.userNotes && (
                <div className="user-notes">
                  <h4>Your Notes:</h4>
                  <p>{itinerary.userNotes}</p>
                </div>
              )}
            </div>
            
            <div className="card-footer">
              <button 
                className="plan-trip-btn"
                onClick={() => {
                  alert(`Let's plan your trip to ${itinerary.location}!`);
                  // You could add functionality to use this as a template
                }}
              >
                ✨ Use as Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItineraries;