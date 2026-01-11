import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";
import App from "./App";
import ItineraryPage from "./components/ItineraryPage";
import ItineraryDetail from "./components/ItineraryDetail";
import TripResults from "./components/TripResults";
import QrTripPage from "./components/QrTripPage";
import DistanceCalculator from "./components/DistanceCalculator";
import ExploreCities from "./components/ExploreCities";
import CityPage from "./components/CityPage";
import PackingList from "./components/PackingList";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import ProfilePage from "./components/ProfilePage";

const AppRouter = () => {
  const [user, setUser] = useState(null);

  /* ===== LOAD USER ONCE ===== */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      {/* ===== ROUTES WITH HEADER ===== */}
      <Route element={<MainLayout user={user} onLogoutClick={handleLogout} />}>
        <Route path="/" element={<App />} />

        {/* 🌍 Cities */}
        <Route path="/cities" element={<ExploreCities />} />
        <Route path="/cities/:slug" element={<CityPage />} />
        <Route path="/distance" element={<DistanceCalculator />} />
        <Route path ="/packing" element ={<PackingList/>}/>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/itineraries" element={<ItineraryPage />} />
        <Route path="/itineraries/:slug" element={<ItineraryDetail />} />
        <Route path="/results" element={<TripResults />} />
      </Route>

      {/* ===== ROUTES WITHOUT HEADER ===== */}
      <Route path="/qr-trip/:id" element={<QrTripPage />} />
    </Routes>
  );
};

export default AppRouter;
