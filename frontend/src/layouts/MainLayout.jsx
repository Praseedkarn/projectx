import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = ({ user, onLogoutClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <>
      {/* ===== HEADER ===== */}
      <Header
        user={user}
        variant={isHome ? "home" : "compact"}
        onHomeClick={() => navigate("/")}
        onItinerariesClick={() => navigate("/itineraries")}
        onSavedClick={() => navigate("/saved")}
        onBlogsClick={() => navigate("/blogs")}
        onCitClick={() =>navigate("/cities")}
        onLogoutClick={onLogoutClick}
      />

      {/* ===== HEADER SPACER (CRITICAL FIX) ===== */}
      <div
        className={isHome ? "h-[520px]" : "h-[88px]"}
      />

      {/* ===== PAGE CONTENT ===== */}
      <main
        className={`min-h-screen ${
          isHome ? "bg-[#d7f26e]" : "bg-[#f6f8f5]"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
