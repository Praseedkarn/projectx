import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = ({
  user,
  onSignInClick,
  onLogoutClick,
  onProfileClick,
  onHomeClick,
  onItinerariesClick,
  onSavedClick,
  onPackingListClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /* ================= HELPERS ================= */

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  const safeCall = (fn) => fn && fn();

  /* ================= HANDLERS ================= */

  const handleHome = (e) => {
    e?.preventDefault();
    safeCall(onHomeClick);
    closeAllMenus();
  };

  const handleItineraries = (e) => {
    e?.preventDefault();
    safeCall(onItinerariesClick);
    closeAllMenus();
  };

  const handleSaved = (e) => {
    e?.preventDefault();
    safeCall(onSavedClick);
    closeAllMenus();
  };

  const handlePackingList = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    safeCall(onPackingListClick);
    closeAllMenus();
  };

  const handleLogout = () => {
    safeCall(onLogoutClick);
    closeAllMenus();
  };

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = () => closeAllMenus();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= RENDER ================= */

  return (
    <header className="header">
      {/* LEFT */}
      <div className="header-left">
        {/* Logo */}
        <div className="logo-container" onClick={handleHome}>
          <h2 className="logo-text">PROJECT X</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav-links">
          <a href="#home" className="nav-link" onClick={handleHome}>
            Home
          </a>

          {user && (
            <>
              <a href="#itineraries" className="nav-link" onClick={handleItineraries}>
                Popular Itineraries
              </a>

              <a href="#saved" className="nav-link" onClick={handleSaved}>
                Saved Trips
              </a>

              
            </>
          )}

          <a
            href="#help"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              alert("Help section coming soon!");
            }}
          >
            Help
          </a>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        {/* Profile / Sign In */}
        {user ? (
          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((prev) => !prev);
              }}
            >
              <span className="header-profile-icon">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span className="header-profile-name">{user.name}</span>
            </button>

            {showProfileMenu && (
              <div
                className="header-profile-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="header-profile-info">
                  <div className="header-profile-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className="header-dropdown-divider" />

                <button className="header-dropdown-item" onClick={onProfileClick}>
                   My Profile
                </button>

                <button className="header-dropdown-item" onClick={handlePackingList}>
                   Packing List
                </button>

                <button
                  className="header-dropdown-item"
                  onClick={() => alert("Settings coming soon!")}
                >
                   Settings
                </button>

                <div className="header-dropdown-divider" />

                <button
                  className="header-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                   Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn" onClick={onSignInClick}>
            Sign In
          </button>
        )}

        {/* Hamburger */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-dropdown" onClick={(e) => e.stopPropagation()}>
            {user ? (
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="mobile-signin-prompt">
                <p>Welcome to Project X </p>
                <button className="mobile-signin-btn" onClick={onSignInClick}>
                  Sign In / Sign Up
                </button>
              </div>
            )}

            <div className="mobile-nav-links">
              <button className="mobile-nav-item" onClick={handleHome}>
                 Home
              </button>

              {user && (
                <>
                  <button className="mobile-nav-item" onClick={handleItineraries}>
                     Popular Itineraries
                  </button>
                  <button className="mobile-nav-item" onClick={handleSaved}>
                     Saved Trips
                  </button>
                  <button className="mobile-nav-item" onClick={handlePackingList}>
                     Packing List
                  </button>
                  <button className="mobile-nav-item" onClick={onProfileClick}>
                     My Profile
                  </button>
                </>
              )}

              <button
                className="mobile-nav-item"
                onClick={() => alert("Help coming soon!")}
              >
                ❓ Help
              </button>

              {user && (
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
