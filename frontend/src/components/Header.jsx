import React, { useState } from "react";

const Header = ({
  user,
  variant = "home", // "home" | "compact"
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

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  /* ===== SAFE NAVIGATION HANDLERS ===== */
  const go = (fn) => {
    closeAllMenus();
    fn && fn();
  };

  return (
    <header className="bg-[#d7f26e]/80">
      <div
        className={`relative bg-[#fdfcf7] ${
          variant === "home" ? "rounded-b-[72px] pb-24" : "pb-6"
        } px-6 pt-5 overflow-hidden`}
      >
        {/* ===== TOP BAR ===== */}
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => go(onHomeClick)}
            className="text-3xl font-extrabold tracking-wide text-[#c8e24a]"
          >
            PROJECT X
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5b6f00]">
            <button onClick={() => go(onHomeClick)}>Home</button>

            {user && (
              <>
                <button onClick={() => go(onItinerariesClick)}>
                  Itineraries
                </button>
                <button onClick={() => go(onSavedClick)}>Saved</button>
              </>
            )}

            <button onClick={() => alert("Help coming soon")}>Help</button>
          </nav>

          {/* RIGHT */}
          <div className="relative flex items-center gap-3">
            {/* PROFILE */}
            {user ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu((p) => !p);
                }}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#5b6f00]/30 rounded-full"
              >
                <span className="w-7 h-7 rounded-full bg-[#5b6f00]/10 flex items-center justify-center font-semibold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="hidden sm:block text-sm">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-4 py-2 rounded-full bg-[#5b7c67] text-white text-sm"
              >
                Sign in
              </button>
            )}

            {/* PROFILE MENU */}
            {showProfileMenu && user && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border">
                <div className="px-4 py-3">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="border-t">
                  <button onClick={() => go(onProfileClick)} className="menu-item">
                    My profile
                  </button>
                  <button
                    onClick={() => go(onPackingListClick)}
                    className="menu-item"
                  >
                    Packing list
                  </button>
                  <button
                    onClick={() => go(onLogoutClick)}
                    className="menu-item text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* MOBILE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((p) => !p);
              }}
              className="md:hidden w-9 h-9 rounded-full border flex items-center justify-center"
            >
              ☰
            </button>

            {/* MOBILE MENU */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-lg border p-3">
                <button onClick={() => go(onHomeClick)} className="menu-item">
                  Home
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => go(onItinerariesClick)}
                      className="menu-item"
                    >
                      Itineraries
                    </button>
                    <button
                      onClick={() => go(onSavedClick)}
                      className="menu-item"
                    >
                      Saved
                    </button>
                    <button
                      onClick={() => go(onPackingListClick)}
                      className="menu-item"
                    >
                      Packing list
                    </button>
                  </>
                )}
                {user && (
                  <button
                    onClick={() => go(onLogoutClick)}
                    className="menu-item text-red-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== HERO (HOME ONLY) ===== */}
        {variant === "home" && (
          
          <div className="mt-28 text-center max-w-3xl mx-auto">
            <img src="" alt="" />
            
            <h1 className="text-4xl md:text-6xl font-semibold italic text-[#5b6f00]">
              Off the beaten path
            </h1>
            <p className="mt-4 text-lg italic text-gray-500">
              thoughtful trips built around how you travel
            </p>
          </div>
        )}
      </div>

      <style>{`
        .menu-item {
          display: block;
          width: 100%;
          padding: 0.6rem 1rem;
          text-align: left;
          font-size: 0.875rem;
        }
        .menu-item:hover {
          background: #f9fafb;
        }
      `}</style>
    </header>
  );
};

export default Header;
