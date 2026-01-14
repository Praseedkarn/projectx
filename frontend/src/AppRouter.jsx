import React from "react";
import { Routes, Route } from "react-router-dom";

/* ===== COMPONENT IMPORTS ===== */
import TripResults from "./components/TripResults";
import ProfilePage from "./components/ProfilePage";
import ItineraryPage from "./components/ItineraryPage";
import ItineraryDetail from "./components/ItineraryDetail";
import SavedItineraries from "./components/SavedItineraries";
import PackingList from "./components/PackingList";
import ExploreCities from "./components/ExploreCities";
import CityPage from "./components/CityPage";
import BecomeGuide from "./components/BecomeGuide";
import AiFailPage from "./components/AiFaliPage";
import Blogs from "./components/Blogs";
import DistanceCalculator from "./components/DistanceCalculator";
import QrTripPage from "./components/QrTripPage";

const AppRouter = ({
  currentUser,
  handleLogout,
  navigate,
  homeContent
}) => {
  return (
    <Routes>
      <Route path="/" element={homeContent} />
      <Route path="/results" element={<TripResults />} />

      {/* ✅ FIXED ITINERARIES */}
      <Route
        path="/itineraries"
        element={
          <ItineraryPage
            onItineraryClick={(slug) => {
              console.log("NAVIGATE SLUG:", slug);
              navigate(`/itineraries/${slug}`);
            }}
          />
        }
      />

      {/* ✅ FIXED PARAM NAME */}
      <Route
        path="/itineraries/:slug"
        element={<ItineraryDetail />}
      />

      {/* Cities */}
      <Route path="/cities" element={<ExploreCities onCityClick={(slug) => navigate(`/cities/${slug}`)} />} />
      <Route path="/cities/:slug" element={<CityPage />} />

      {/* Others */}
      <Route path="/packing" element={<PackingList />} />
      <Route path="/distance" element={<DistanceCalculator />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
      <Route path="/saved" element={<SavedItineraries />} />
      <Route path="/become-guide" element={<BecomeGuide />} />
      <Route path="/ai-failed" element={<AiFailPage />} />
      <Route path="/qr-trip/:id" element={<QrTripPage />} />

      <Route path="*" element={homeContent} />
    </Routes>
  );
};

export default AppRouter;
