import React from "react";
import { Routes, Route } from "react-router-dom";

/* COMPONENTS */
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
import QuizPage from "./pages/QuizPage";
import TokenHistoryPage from "./components/TokenHistoryPage";
import HelpPage from "./pages/HelpPage";
/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";

const AppRouter = ({
  currentUser,
  setCurrentUser,
  handleLogout,
  navigate,
  homeContent,
}) => {
  return (
    <Routes>
      <Route path="/" element={homeContent} />
      <Route path="/results" element={<TripResults />} />

      {/* ITINERARIES */}
      <Route
        path="/itineraries"
        element={
          <ItineraryPage
            onItineraryClick={(slug) =>
              navigate(`/itineraries/${slug}`)
            }
          />
        }
      />
      <Route path="/itineraries/:slug" element={<ItineraryDetail />} />

      {/* CITIES */}
      <Route
        path="/cities"
        element={
          <ExploreCities
            onCityClick={(slug) => navigate(`/cities/${slug}`)}
          />
        }
      />
      <Route path="/cities/:slug" element={<CityPage />} />

      {/* USER */}
      <Route
        path="/profile"
        element={
          <ProfilePage
            user={currentUser}
            setCurrentUser={setCurrentUser}
            onLogout={handleLogout}
          />
        }
      />
      <Route path="/saved" element={<SavedItineraries />} />
      <Route path="/packing" element={<PackingList />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/tokens" element={<TokenHistoryPage />} />
      <Route path="/help" element={<HelpPage/>}/>
      {/* OTHERS */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/distance" element={<DistanceCalculator />} />
      <Route path="/become-guide" element={<BecomeGuide />} />
      <Route path="/ai-failed" element={<AiFailPage />} />
      <Route path="/qr-trip/:id" element={<QrTripPage />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={homeContent} />
    </Routes>
  );
};

export default AppRouter;
