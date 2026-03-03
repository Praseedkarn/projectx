import React, { useState, useEffect, forwardRef ,useRef} from "react";
import { useNavigate } from "react-router-dom";

const Header = forwardRef(({ user, variant = "home", onSignInClick, onLogoutClick }, ref) => {
  const navigate = useNavigate();
  const profileMenuRef=useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);


  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };

const go = (path) => {
  closeAllMenus();
  navigate(path);
};


  /* ===== SCROLL BEHAVIOUR ===== */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY > lastScrollY && currentY > 80) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }

        setLastScrollY(currentY);
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);


return (
  <header
    ref={ref}
    className={`fixed top-0 left-0 w-full z-50 bg-[#fdfcf7] border-b border-gray-100 transition-transform duration-500 ${
      hideHeader ? "-translate-y-full" : "translate-y-0"
    }`}
  >
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      
      {/* ===== LOGO ===== */}
      <button
        onClick={() => {
          closeAllMenus();
          navigate("/");
        }}
        className="flex items-center gap-2"
      >
        <span className="italic text-2xl md:text-3xl text-[#5b6f00] tracking-wide">
          EXPEDITIO
        </span>
      </button>

      {/* ===== DESKTOP NAV ===== */}
      <nav className="hidden md:flex gap-8 text-sm font-medium text-[#5b6f00]">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/blogs")}>Blogs</button>

        {user && (
          <>
            <button onClick={() => navigate("/itineraries")}>
              Itineraries
            </button>
            <button onClick={() => navigate("/saved")}>
              Saved
            </button>
          </>
        )}

        <button onClick={() => navigate("/help")}>Help</button>
      </nav>

      {/* ===== RIGHT SIDE ===== */}
      <div ref={profileMenuRef} className="relative flex items-center gap-4">
        
        {/* TOKEN BADGE (DESKTOP) */}
        {user && (
          <div
            onClick={() => go("/tokens")}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5b6f00]/10 text-[#5b6f00] text-sm font-semibold border border-[#5b6f00]/20 cursor-pointer"
          >
            🪙 {user.role === "admin" ? "∞" : user.tokens}
          </div>
        )}

        {/* DESKTOP PROFILE / SIGN IN */}
        {user ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu((p) => !p);
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 border rounded-full"
          >
            <span className="w-7 h-7 rounded-full bg-[#5b6f00]/10 flex items-center justify-center">
              {user.name?.[0]?.toUpperCase() || "U"}
            </span>
            <span className="text-sm">{user.name}</span>
          </button>
        ) : (
          <button
            onClick={() => onSignInClick?.()}
            className="hidden md:block px-4 py-2 rounded-full bg-[#5b7c67] text-white text-sm"
          >
            Sign in
          </button>
        )}

        {/* MOBILE LOGIN BUTTON */}
        {!user && (
          <button
            onClick={() => {
              closeAllMenus();
              onSignInClick?.();
            }}
            className="md:hidden px-4 py-1.5 rounded-full border border-[#5b6f00] text-[#5b6f00] text-sm font-medium"
          >
            Login
          </button>
        )}

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          className="md:hidden w-9 h-9 rounded-full border flex items-center justify-center"
        >
          ☰
        </button>

        {/* ===== DESKTOP PROFILE DROPDOWN ===== */}
        {showProfileMenu && user && (
          <div className="absolute right-0 top-12 w-56 rounded-xl bg-white shadow-2xl border border-gray-200">
            <div className="px-4 py-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div className="border-t">
              <button onClick={() => go("/profile")} className="menu-item">
                My profile
              </button>
              <button onClick={() => go("/packing")} className="menu-item">
                Packing list
              </button>
              <button
                onClick={onLogoutClick}
                className="menu-item text-red-600"
              >
                Logout
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => go("/admin")}
                  className="menu-item"
                >
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===== MOBILE MENU ===== */}
        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-64 rounded-xl bg-white p-4 shadow-2xl border border-gray-200 z-50">
            
            {user && (
              <div className="pb-3 border-b space-y-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>

                <div
                  onClick={() => go("/tokens")}
                  className="mt-2 inline-flex items-center gap-2 text-sm bg-[#5b6f00]/10 text-[#5b6f00] px-3 py-1.5 rounded-full"
                >
                  🪙 {user.role === "admin" ? "∞" : user.tokens}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button onClick={() => go("/")} className="menu-item">
                Home
              </button>
              <button onClick={() => go("/blogs")} className="menu-item">
                Blogs
              </button>
              <button onClick={() => go("/help")} className="menu-item">
                Help
              </button>

              {user && (
                <>
                  <button onClick={() => go("/itineraries")} className="menu-item">
                    Itineraries
                  </button>
                  <button onClick={() => go("/saved")} className="menu-item">
                    Saved
                  </button>
                  <button onClick={() => go("/packing")} className="menu-item">
                    Packing list
                  </button>
                </>
              )}
            </div>

            {user && (
              <div className="pt-2 border-t mt-2">
                <button onClick={() => go("/profile")} className="menu-item">
                  My profile
                </button>
                <button
                  onClick={() => {
                    closeAllMenus();
                    onLogoutClick();
                  }}
                  className="menu-item text-red-600"
                >
                  Logout
                </button>

                {user.role === "admin" && (
                  <button
                    onClick={() => go("/admin")}
                    className="menu-item"
                  >
                    Admin Dashboard
                  </button>
                )}
              </div>
            )}

            {!user && (
              <button
                onClick={() => {
                  closeAllMenus();
                  onSignInClick?.();
                }}
                className="mt-3 w-full rounded-lg bg-[#5b7c67] text-white py-2 text-sm"
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
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
});

export default Header;
