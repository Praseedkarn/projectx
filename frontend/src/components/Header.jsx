import React, { useState ,useEffect , forwardRef } from "react";

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
  onBlogsClick,
},ref) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hideHeader , setHideHeader ]=useState(false);
  const [lastScrollY ,setLastScrollY ]=useState(0);
  const [lastRevealY , setLastRevealY]=useState(0);
  const [showHero , setShowHero]=useState(true);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

  /* ===== SAFE NAVIGATION HANDLERS ===== */
  const go = (fn) => {
    closeAllMenus();
    fn && fn();
  };

useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;

      // HEADER HIDE / SHOW
      if (currentY > lastScrollY && currentY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      // HERO VISIBILITY (with buffer)
      if (currentY < 100) {
        setShowHero(true);
      } else if (currentY > 160) {
        setShowHero(false);
      }

      setLastScrollY(currentY);
      ticking = false;
    });

    ticking = true;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);




  return (
    <header 
    ref={ref}
    className={` fixed top-0 left-0 w-full z-50
  transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
  ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}>
      <div
  className={`relative bg-[#fdfcf7] px-6 pt-5 overflow-hidden
  transition-[max-height,padding] duration-500
  ease-[cubic-bezier(0.22,1,0.36,1)]
  ${
    variant === "home" && showHero
      ? "rounded-b-[72px] pb-24 max-h-[520px]"
      : "pb-6 max-h-[88px]"
  }`}
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
            <button onClick={() => go(onBlogsClick)}>Blogs</button>
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
  <div
    className={`mt-28 text-center max-w-3xl mx-auto
      transition-all duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      ${
        showHero
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
  >
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
