import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = forwardRef(({ user, variant = "home", onSignInClick, onLogoutClick }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHero, setShowHero] = useState(true);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
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

        if (currentY < 100) setShowHero(true);
        else if (currentY > 160) setShowHero(false);

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
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500
        ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div
        className={`relative bg-[#fdfcf7] px-6 pt-5 transition-all duration-500
          ${
            variant === "home" && showHero
              ? "rounded-b-[72px] pb-24 max-h-[520px]"
              : "pb-9 max-h-[95px]"
          }`}
      >
        {/* ===== TOP BAR ===== */}
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => {
              closeAllMenus();
              navigate("/");
            }}
            className="flex items-center gap-3"
          >
            <span className="italic text-3xl md:text-4xl text-[#5b6f00]">
              PROJECT
            </span>
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-[#5b6f00]">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/blogs")}>Blogs</button>

            {user && (
              <>
                <button onClick={() => navigate("/itineraries")}>
                  Itineraries
                </button>
                <button onClick={() => navigate("/saved")}>Saved</button>
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
                className="flex items-center gap-2 px-3 py-1.5 border rounded-full"
              >
                <span className="w-7 h-7 rounded-full bg-[#5b6f00]/10 flex items-center justify-center">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="hidden sm:block">{user.name}</span>
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
              <div className="absolute right-0 top-12 w-56 rounded-xl border bg-white shadow-xl">
                <div className="px-4 py-3">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="border-t">
                  <button onClick={() => navigate("/profile")} className="menu-item">
                    My profile
                  </button>
                  <button onClick={() => navigate("/packing")} className="menu-item">
                    Packing list
                  </button>
                  <button
                    onClick={onLogoutClick}
                    className="menu-item text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="md:hidden w-9 h-9 rounded-full border"
            >
              ☰
            </button>

            {/* MOBILE MENU */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-60 rounded-xl border bg-white p-3 shadow-xl">
                <button onClick={() => navigate("/")} className="menu-item">
                  Home
                </button>
                <button onClick={() => navigate("/blogs")} className="menu-item">
                  Blogs
                </button>

                {user && (
                  <>
                    <button
                      onClick={() => navigate("/itineraries")}
                      className="menu-item"
                    >
                      Itineraries
                    </button>
                    <button
                      onClick={() => navigate("/saved")}
                      className="menu-item"
                    >
                      Saved
                    </button>
                    <button
                      onClick={() => navigate("/packing")}
                      className="menu-item"
                    >
                      Packing list
                    </button>
                  </>
                )}

                {user && (
                  <button
                    onClick={onLogoutClick}
                    className="menu-item text-red-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {variant === "home" && (
  <img
    src="/airplane.png"
    alt="Travel path"
    className="
      absolute
      bottom-[80px]     /* 👈 controls vertical position */
      left-1/2
      left-16 md:left-24
      w-28 md:w-36       /* 👈 smaller size */
      opacity-20
      drop-shadow-[0_20px_30px_rgba(91,111,0,0.25)]
      pointer-events-none
      z-0
    "
  />
)}
{variant === "home" && (
  <img
    src="/t.png"
    alt="Travel path right"
    className="
      absolute
      bottom-[130px]          /* slightly different height = natural look */
      right-6 sm:right-12 md:right-24
      w-24 md:w-32            /* a bit smaller for depth */
      opacity-20
      rotate-6
      scale-x-[-1]            /* 👈 mirror horizontally */
      pointer-events-none
      z-0
    "
  />
)}


        {/* ===== HERO (HOME ONLY) ===== */}
        {variant === "home" && (
          <div
            className={`mt-28 text-center max-w-3xl mx-auto transition-all duration-500
              ${
                showHero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-6 pointer-events-none"
              }`}
          >
            <h1 className="text-4xl md:text-6xl italic text-[#5b6f00]">
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
});

export default Header;
