import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = ({ user, onBack, onLogout, onPackingListClick }) => {
  const [userData, setUserData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });
  
  const [preferences, setPreferences] = useState({
    travelStyle: user?.preferences?.travelStyle || 'balanced',
    tripType: user?.preferences?.tripType || ['sightseeing', 'food'],
    budgetRange: user?.preferences?.budgetRange || 'medium',
    dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
    accessibilityNeeds: user?.preferences?.accessibilityNeeds || false,
    notificationEmails: user?.preferences?.notificationEmails || true
  });

  // Initialize with saved user data
  useEffect(() => {
    const savedUserData = localStorage.getItem(`userProfile_${user?.id || user?.email}`);
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      setEditForm({
        name: parsedData.name || '',
        email: parsedData.email || '',
        phone: parsedData.phone || '',
        location: parsedData.location || ''
      });
      setPreferences(parsedData.preferences || {
        travelStyle: 'balanced',
        tripType: ['sightseeing', 'food'],
        budgetRange: 'medium',
        dietaryRestrictions: [],
        accessibilityNeeds: false,
        notificationEmails: true
      });
    } else if (user) {
      // Initialize with basic user data
      setUserData(user);
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        location: ''
      });
    }
  }, [user]);

  // Save profile changes
  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...userData,
      ...editForm,
      updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem(`userProfile_${user?.id || user?.email}`, JSON.stringify(updatedUser));
    
    // Update global user data
    const allUsers = JSON.parse(localStorage.getItem('travelUsers') || '[]');
    const updatedUsers = allUsers.map(u => 
      u.email === userData.email ? { ...u, ...editForm } : u
    );
    localStorage.setItem('travelUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setUserData(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully! ✨');
  };

  // Save preferences
  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...userData,
      preferences: preferences,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`userProfile_${user?.id || user?.email}`, JSON.stringify(updatedUser));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setUserData(updatedUser);
    setIsEditingPreferences(false);
    alert('Preferences saved! 🎯');
  };

  // Handle preference changes
  const handlePreferenceChange = (key, value) => {
    if (key === 'tripType') {
      const currentTypes = [...preferences.tripType];
      if (currentTypes.includes(value)) {
        setPreferences({
          ...preferences,
          tripType: currentTypes.filter(type => type !== value)
        });
      } else {
        setPreferences({
          ...preferences,
          tripType: [...currentTypes, value]
        });
      }
    } else if (key === 'dietaryRestrictions') {
      const currentRestrictions = [...preferences.dietaryRestrictions];
      if (currentRestrictions.includes(value)) {
        setPreferences({
          ...preferences,
          dietaryRestrictions: currentRestrictions.filter(item => item !== value)
        });
      } else {
        setPreferences({
          ...preferences,
          dietaryRestrictions: [...currentRestrictions, value]
        });
      }
    } else {
      setPreferences({
        ...preferences,
        [key]: value
      });
    }
  };

  // Get user statistics
  const getUserStats = () => {
    const trips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    const packingLists = JSON.parse(localStorage.getItem(`packingLists_${user?.id || 'guest'}`) || '[]');
    const savedItineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
    
    return {
      totalTrips: trips.length,
      savedHours: trips.reduce((sum, trip) => sum + (trip.suggestions?.length || 0) * 2, 0),
      packingLists: packingLists.length,
      savedItineraries: savedItineraries.filter(it => it.userId === user?.id || it.userEmail === user?.email).length,
      joinedDate: new Date(userData.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  // Quick action functions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'packing':
        if (onPackingListClick) onPackingListClick();
        break;
      case 'newTrip':
        if (onBack) onBack();
        // You might want to trigger a new trip form here
        break;
      case 'saved':
        // Navigate to saved itineraries
        alert('Redirecting to saved itineraries...');
        break;
      default:
        break;
    }
  };

  const stats = getUserStats();
  const travelStyles = [
    { id: 'budget', label: '💰 Budget Traveler', desc: 'Save money, find deals' },
    { id: 'luxury', label: '⭐ Luxury Traveler', desc: 'Comfort and premium experiences' },
    { id: 'adventure', label: '🧗 Adventure Seeker', desc: 'Thrilling activities' },
    { id: 'relaxed', label: '🌴 Relaxed Traveler', desc: 'Take it easy, enjoy' },
    { id: 'balanced', label: '⚖️ Balanced', desc: 'Mix of everything' }
  ];

  const tripTypes = [
    { id: 'sightseeing', label: '🏛️ Sightseeing', icon: '🏛️' },
    { id: 'food', label: '🍜 Food & Dining', icon: '🍜' },
    { id: 'nature', label: '🌳 Nature & Hiking', icon: '🌳' },
    { id: 'shopping', label: '🛍️ Shopping', icon: '🛍️' },
    { id: 'culture', label: '🎭 Culture & Arts', icon: '🎭' },
    { id: 'beach', label: '🏖️ Beach & Relaxation', icon: '🏖️' },
    { id: 'nightlife', label: '🌃 Nightlife', icon: '🌃' },
    { id: 'family', label: '👨‍👩‍👧‍👦 Family Friendly', icon: '👨‍👩‍👧‍👦' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Halal', 'Kosher', 'Diabetic'
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to App
        </button>
        <h1>👤 My Profile</h1>
      </div>

      <div className="profile-content-container">
        {/* Profile Card */}
        <div className="profile-main-card">
          <div className="profile-header-section">
            <div className="profile-avatar-large">
              {userData.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="profile-basic-info">
              <h2 className="profile-name">{userData.name || 'User'}</h2>
              <p className="profile-email">{userData.email || 'No email'}</p>
              <p className="profile-member-since">
                Member since: {stats.joinedDate}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-box">
              <div className="stat-icon">🗺️</div>
              <div className="stat-content">
                <h4>Trips Planned</h4>
                <p className="stat-number">{stats.totalTrips}</p>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <h4>Hours Saved</h4>
                <p className="stat-number">{stats.savedHours}h</p>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">🧳</div>
              <div className="stat-content">
                <h4>Packing Lists</h4>
                <p className="stat-number">{stats.packingLists}</p>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h4>Saved Trips</h4>
                <p className="stat-number">{stats.savedItineraries}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button 
                className="action-btn quick-action-btn"
                onClick={() => handleQuickAction('packing')}
              >
                🧳 Create Packing List
              </button>
              <button 
                className="action-btn quick-action-btn"
                onClick={() => handleQuickAction('newTrip')}
              >
                ✨ Plan New Trip
              </button>
              <button 
                className="action-btn quick-action-btn"
                onClick={() => handleQuickAction('saved')}
              >
                ⭐ View Saved Trips
              </button>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <div className="edit-section">
              <h3>Edit Your Profile</h3>
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="save-btn">
                    💾 Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({
                        name: userData.name || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                        location: userData.location || ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Account ID:</span>
                <span className="detail-value">USER_{String(userData.id || userData.email || '001').slice(-6)}
              </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{userData.phone || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{userData.location || 'Not specified'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-active">Active</span>
              </div>
            </div>
          )}

          {/* Travel Preferences */}
          

          {/* Action Buttons */}
          <div className="profile-actions">
            <button 
              className="action-btn edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '👁️ View Profile' : '✏️ Edit Profile'}
            </button>
            
            <button 
              className="action-btn logout-btn"
              onClick={onLogout}
            >
              🚪 Logout
            </button>
          </div>

          {/* Account Actions */}
          <div className="account-actions">
            <h4>⚙️ Account Settings</h4>
            <div className="account-buttons">
              <button 
                className="account-btn"
                onClick={() => {
                  const userData = JSON.parse(localStorage.getItem(`userProfile_${user?.id || user?.email}`) || '{}');
                  const dataStr = JSON.stringify(userData, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `travelai-profile-${Date.now()}.json`;
                  link.click();
                  alert('Profile data exported! 📥');
                }}
              >
                💾 Export Data
              </button>
              
              <button 
                className="account-btn delete-account-btn"
                onClick={() => {
                  if (window.confirm('⚠️ This will delete ALL your data permanently. Are you sure?')) {
                    localStorage.removeItem(`userProfile_${user?.id || user?.email}`);
                    localStorage.removeItem(`packingLists_${user?.id || 'guest'}`);
                    localStorage.removeItem('currentUser');
                    alert('Account data cleared. Redirecting...');
                    window.location.reload();
                  }
                }}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;