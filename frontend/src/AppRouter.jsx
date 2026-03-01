import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

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
import AuthSuccess from "./pages/AuthSuccess";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import PlanPage from "./pages/TripPlanner";

/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";

const AppRouter = ({
  currentUser,
  setCurrentUser,
  handleLogout,
  navigate,
  homeContent,
  openLogin,

  formCardRef,
  handleSubmit,
  tripType,
  setTripType,
  hours,
  setHours,
  days,
  setDays,
  multiStartDate,
  setMultiStartDate,
  place,
  setPlace,
  group,
  setGroup,
  suggestions,
  setSuggestions,
  addSuggestion,
  loading,
  apiStatus,
  citySuggestions,
  showSuggestions,
  setShowSuggestions,
  tripDate,
  setTripDate,
}) => {
  return (
    <Routes>
      {/* ===== MAIN LAYOUT WRAPPER ===== */}
      <Route
        element={
          <MainLayout
  user={currentUser}
  onLogoutClick={handleLogout}
  onSignInClick={openLogin}
/>
        }
      >
        <Route path="/" element={homeContent} />
 <Route path="/auth-success" element={<AuthSuccess />} />
        <Route
          path="/results"
          element={<TripResults openLogin={openLogin} />}
        />

       

        <Route
          path="/plan"
          element={
            <PlanPage
              formCardRef={formCardRef}
              handleSubmit={handleSubmit}
              tripType={tripType}
              setTripType={setTripType}
              hours={hours}
              setHours={setHours}
              days={days}
              setDays={setDays}
              multiStartDate={multiStartDate}
              setMultiStartDate={setMultiStartDate}
              place={place}
              setPlace={setPlace}
              group={group}
              setGroup={setGroup}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              addSuggestion={addSuggestion}
              loading={loading}
              currentUser={currentUser}
              apiStatus={apiStatus}
              citySuggestions={citySuggestions}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              tripDate={tripDate}
              setTripDate={setTripDate}
            />
          }
        />

        {/* ITINERARIES */}
        <Route path="/itineraries" element={<ItineraryPage />} />
        <Route path="/itineraries/:slug" element={<ItineraryDetail />} />

        {/* CITIES */}
        <Route path="/cities" element={<ExploreCities />} />
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
        <Route path="/help" element={<HelpPage />} />

        {/* OTHERS */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/distance" element={<DistanceCalculator />} />
        <Route path="/become-guide" element={<BecomeGuide />} />
        <Route path="/ai-failed" element={<AiFailPage />} />
        <Route path="/qr-trip/:id" element={<QrTripPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={homeContent} />
      </Route>
    </Routes>
  );
};

export default AppRouter;