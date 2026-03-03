import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FaqFooterSection from "../components/FaqFooterSection";

const MainLayout = ({ user, onLogoutClick, onSignInClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isQrTrip = location.pathname.startsWith("/qr-trip/");

  // Header hidden only on QR trip pages
  const showHeader = !isQrTrip;

  // Footer visible ONLY on home page
  const showFooter = isHome;

  return (
    <>
      {/* ===== HEADER ===== */}
      {showHeader && (
        <>
          <Header
            user={user}
            variant={isHome ? "home" : "compact"}
            onHomeClick={() => navigate("/")}
            onItinerariesClick={() => navigate("/itineraries")}
            onSavedClick={() => navigate("/saved")}
            onBlogsClick={() => navigate("/blogs")}
            onCitClick={() => navigate("/cities")}
            onLogoutClick={onLogoutClick}
            onSignInClick={onSignInClick}
          />

          {/* Header Spacer */}
          <div className={isHome ? "h-[24px]" : "h-[88px]"} />
        </>
      )}

      {/* ===== PAGE CONTENT ===== */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* ===== FOOTER (HOME ONLY) ===== */}
      {showFooter && <FaqFooterSection />}
    </>
  );
};

export default MainLayout;