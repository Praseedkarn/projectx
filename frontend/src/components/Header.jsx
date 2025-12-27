import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ 
  user, 
  onSignInClick, 
  onLogoutClick, 
  onProfileClick, 
  onHomeClick, 
  onItinerariesClick,
  onSavedClick,
  onPackingListClick  // Add this prop
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSignIn = () => {
    if (onSignInClick) {
      onSignInClick();
    }
  };

  const handleLogout = () => {
    if (onLogoutClick) {
      onLogoutClick();
    }
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    }
    setIsMenuOpen(false);
  };

  const handleItinerariesClick = (e) => {
    e.preventDefault();
    if (onItinerariesClick) {
      onItinerariesClick();
    }
    setIsMenuOpen(false);
  };

  const handleSavedClick = (e) => {
    e.preventDefault();
    if (onSavedClick) {
      onSavedClick();
    }
    setIsMenuOpen(false);
  };

  // In Header.jsx
const handlePackingListClick = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  if (onPackingListClick) {
    onPackingListClick();
  }
  setIsMenuOpen(false);
};

  const handleToolsDropdown = (e) => {
    e.stopPropagation();
    // For desktop, directly open packing list
    if (onPackingListClick) {
      onPackingListClick();
    }
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
      setShowProfileMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      {/* Left: Logo + Desktop Navigation */}
      <div className="header-left">
        {/* Logo */}
        <div className="logo-container" onClick={handleHomeClick}>
          <div className="logo-text-container">
            <h2 className="logo-text">PROJECT X</h2>
          </div>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <nav className="desktop-nav-links">
          <a 
            href="#home" 
            className="nav-link"
            onClick={handleHomeClick}
          >
            Home
          </a>
          
          {user && (
            <>
              <a 
                href="#itineraries" 
                className="nav-link"
                onClick={handleItinerariesClick}
              >
                Popular Itineraries
              </a>
              
              <a 
                href="#saved" 
                className="nav-link"
                onClick={handleSavedClick}
              >
                Saved Trips
              </a>
              
              {/* Tools Dropdown for Desktop */}
              <div className="tools-dropdown">
                <a 
                  href="#tools" 
                  className="nav-link tools-link"
                  onClick={handleToolsDropdown}
                >
                  🧳 Tools
                </a>
              </div>
            </>
          )}
          
          <a 
            href="#help" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              alert('Help section coming soon!');
            }}
          >
            Help
          </a>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="header-right">
        {/* User Profile (Desktop) */}
        {user ? (
          <div className="profile-container">
            <button 
              className="profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleProfileMenu();
              }}
            >
              <span className="header-profile-icon">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
              <span className="header-profile-name">{user.name}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="header-profile-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="header-profile-info">
                  <div className="header-profile-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="header-profile-details">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="header-dropdown-divider"></div>
                
                <button 
                  className="header-dropdown-item"
                  onClick={() => {
                    if (onProfileClick) onProfileClick();
                    setShowProfileMenu(false);
                  }}
                >
                  👤 My Profile
                </button>
                
                <button 
                  className="header-dropdown-item"
                  onClick={() => {
                    handlePackingListClick();
                    setShowProfileMenu(false);
                  }}
                >
                  🧳 Packing List
                </button>
                
                <button 
                  className="header-dropdown-item"
                  onClick={() => {
                    alert('Settings coming soon!');
                    setShowProfileMenu(false);
                  }}
                >
                  ⚙️ Settings
                </button>
                
                <div className="header-dropdown-divider"></div>
                
                <button 
                  className="header-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn" onClick={handleSignIn}>
            Sign In
          </button>
        )}

        {/* Hamburger Menu (Desktop & Mobile) */}
        <button 
          className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="mobile-dropdown" onClick={(e) => e.stopPropagation()}>
            {user ? (
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="mobile-signin-prompt">
                <p>Welcome to TravelPlanner! ✈️</p>
                <button 
                  className="mobile-signin-btn"
                  onClick={handleSignIn}
                >
                  Sign In / Sign Up
                </button>
              </div>
            )}
            
            <div className="mobile-nav-links">
              <button 
                className="mobile-nav-item"
                onClick={handleHomeClick}
              >
                🏠 Home
              </button>
              
              {user && (
                <>
                  <button 
                    className="mobile-nav-item"
                    onClick={handleItinerariesClick}
                  >
                    📋 Popular Itineraries
                  </button>
                  
                  <button 
                    className="mobile-nav-item"
                    onClick={handleSavedClick}
                  >
                    ⭐ Saved Trips
                  </button>
                  
                  <button 
                    className="mobile-nav-item"
                    onClick={handlePackingListClick}
                  >
                    🧳 Packing List
                  </button>
                  
                  
                  
                  
                </>
              )}
              
              {user && (
                <>
                  <button 
                    className="mobile-nav-item"
                    onClick={() => {
                      if (onProfileClick) onProfileClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    👤 My Profile
                  </button>
                  
                  <button 
                    className="mobile-nav-item"
                    onClick={() => {
                      alert('Settings coming soon!');
                      setIsMenuOpen(false);
                    }}
                  >
                    ⚙️ Settings
                  </button>
                </>
              )}
            </div>
            
            <div className="mobile-divider"></div>
            
            <button 
              className="mobile-nav-item help-item"
              onClick={() => {
                alert('Help section coming soon!');
                setIsMenuOpen(false);
              }}
            >
              ❓ Help
            </button>
            
            {user && (
              <>
                <div className="mobile-divider"></div>
                <button 
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;