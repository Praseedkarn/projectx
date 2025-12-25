import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ user, onSignInClick, onLogoutClick }) => {
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

  const handleNavClick = (item) => {
    alert(`Navigating to ${item}`);
    setIsMenuOpen(false);
    setShowProfileMenu(false);
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
        <div className="logo-container" onClick={() => handleNavClick('Home')}>
          <div className="logo-text-container">
            <h2 className="logo-text">Project X</h2>
          </div>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <nav className="desktop-nav-links">
          <a 
            href="#home" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home');
            }}
          >
            Home
          </a>
          
          <a 
            href="#tools" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Tools');
            }}
          >
            Tools
          </a>
          
          <a 
            href="#help" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Help');
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
              <span className="profile-icon">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
              <span className="profile-name">{user.name}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="profile-info">
                  <div className="profile-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="profile-details">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    handleNavClick('My Profile');
                    setShowProfileMenu(false);
                  }}
                >
                  👤 My Profile
                </button>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    handleNavClick('My Trips');
                    setShowProfileMenu(false);
                  }}
                >
                  🗺️ My Trips
                </button>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    handleNavClick('Settings');
                    setShowProfileMenu(false);
                  }}
                >
                  ⚙️ Settings
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  className="dropdown-item logout-item"
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
                <p>Welcome to Project X! ✈️</p>
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
                onClick={() => handleNavClick('Home')}
              >
                🏠 Home
              </button>
              
              <button 
                className="mobile-nav-item"
                onClick={() => handleNavClick('Tools')}
              >
                🛠️ Tools
              </button>
              
              <button 
                className="mobile-nav-item"
                onClick={() => handleNavClick('Help')}
              >
                ❓ Help
              </button>
              
              {user && (
                <>
                  <button 
                    className="mobile-nav-item"
                    onClick={() => handleNavClick('My Trips')}
                  >
                    🗺️ My Trips
                  </button>
                  
                  <button 
                    className="mobile-nav-item"
                    onClick={() => handleNavClick('Settings')}
                  >
                    ⚙️ Settings
                  </button>
                </>
              )}
            </div>
            
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