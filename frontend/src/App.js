import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/footer";
import SignIn from "./components/SignIn";
import TripResults from "./components/TripResults";
import ProfilePage from "./components/ProfilePage";
import ItineraryPage from "./components/ItineraryPage";
import ItineraryDetail from "./components/ItineraryDetail";
import SavedItineraries from "./components/SavedItineraries";
import PackingList from "./components/PackingList";

import { generateTravelItinerary } from "./services/api";
import { detailedItineraries } from "./components/ItineraryDetail";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [tripSuggestions, setTripSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeComponent, setActiveComponent] = useState("home");
  const [selectedItineraryId, setSelectedItineraryId] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");

  /* ===== Trip Builder States ===== */
  const [days, setDays] = useState(3);
  const [place, setPlace] = useState("");
  const [group, setGroup] = useState("Family");
  const [budget, setBudget] = useState("Medium");
  const [pace, setPace] = useState("Balanced");
  const [detailLevel, setDetailLevel] = useState("morning");
  const [Month , setMonth]=useState('');
  const [Transport , setTransport]=useState("");
  /* ===== Load user ===== */
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setCurrentUser(JSON.parse(userData));
  }, []);

  /* ===== Check API ===== */
  useEffect(() => {
    const checkAPIStatus = async () => {
      if (!currentUser) return;
      try {
        const test = await generateTravelItinerary("test", "morning");
        setApiStatus(test?.text ? "available" : "unavailable");
      } catch {
        setApiStatus("unavailable");
      }
    };
    checkAPIStatus();
  }, [currentUser]);

  /* ===== Auth ===== */
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    setShowSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setTripSuggestions(null);
    setActiveComponent("home");
  };

  /* ===== SUBMIT TRIP ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setShowSignIn(true);
      return;
    }

    if (!place.trim()) {
      alert("Please enter a destination");
      return;
    }

    const description = `
          Create a ${days}-day travel itinerary for ${place}.

          Traveler type: ${group}
          Budget: ${budget}
          Travel pace: ${pace}
          Detail level: ${detailLevel}
          month :${Month}
          transport preference :${Transport}
          Rules:
          - Day-wise plan
          - Morning / Afternoon / Evening structure
          - Transport options (Indian context if applicable)
          - Local food recommendations
          - Approximate daily costs
          - Practical travel tips
          - Clear, readable formatting
          `;

    setLoading(true);

    try {
      const aiResponse = await generateTravelItinerary(
        description,
        detailLevel
      );

      if (!aiResponse?.text) throw new Error("Invalid AI response");

      setTripSuggestions(aiResponse);
      setApiStatus("available");

      setTimeout(() => setActiveComponent("results"), 300);

      const savedTrips = JSON.parse(
        localStorage.getItem("userTrips") || "[]"
      );

      savedTrips.push({
        id: Date.now(),
        date: new Date().toISOString(),
        description,
        text: aiResponse.text
      });

      localStorage.setItem("userTrips", JSON.stringify(savedTrips));
    } catch (err) {
      console.error(err);
      setApiStatus("unavailable");
      alert("AI service unavailable");
    } finally {
      setLoading(false);
    }
  };

  /* ===== Itinerary Gallery ===== */
  const fetchItineraries = async () => {
    const cached = localStorage.getItem("itineraries");
    if (cached) return JSON.parse(cached);

    const simplified = Object.values(detailedItineraries).map((i) => ({
      id: i.id,
      title: i.title,
      location: i.location,
      description: i.description.slice(0, 150) + "...",
      duration: i.duration,
      difficulty: i.difficulty,
      image: i.image
    }));

    localStorage.setItem("itineraries", JSON.stringify(simplified));
    return simplified;
  };

  const handlePackingListClick = () => {
    if (!currentUser) {
      setShowSignIn(true);
      return;
    }
    setActiveComponent("packing");
  };

  const handleNavigation = (page) => setActiveComponent(page);

  return (
    <div className="App">
      <Header
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onLogoutClick={handleLogout}
        onProfileClick={() => handleNavigation("profile")}
        onHomeClick={() => handleNavigation("home")}
        onItinerariesClick={() =>
          currentUser ? handleNavigation("itineraries") : setShowSignIn(true)
        }
        onSavedClick={() =>
          currentUser ? handleNavigation("saved") : setShowSignIn(true)
        }
        onPackingListClick={handlePackingListClick}
      />

      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <main className="main-content">
        {activeComponent === "home" && (
          <div className="trip-planner">
            <h1 className="planner-title">Plan Your Trip</h1>

            {currentUser && apiStatus !== "checking" && (
              <div className={`api-status ${apiStatus}`}>
                {apiStatus === "available"
                  ? "✅ AI Assistant Ready"
                  : "⚠️ AI Offline"}
              </div>
            )}

            <form className="trip-form" onSubmit={handleSubmit}>
               <div className="trip-form-header">
                  <h2 className="trip-form-title"> Build Your Trip Preferences</h2>
                  <p className="trip-form-subtitle">
                    Tell us a few details so the AI can plan your trip perfectly
                  </p>
                </div>

              <div className="trip-builder">
                <div className="field">
                <label>Number of Days</label>
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  placeholder="Days"
                  disabled={loading}
                  required
                />
                <div className="field">
                  <label>Destination</label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Destination (e.g. Goa)"
                  disabled={loading}
                  required
                />
                </div>

              <div className="field">
                  <label>Travel Group</label>
                  <select value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option>Solo</option>
                    <option>Couple</option>
                    <option>Family</option>
                    <option>Friends</option>
                  </select>
                </div>

                <div className="field">
                  <label>Budget Level</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Luxury</option>
                  </select>
                </div>

                <div className="field">
                  <label>Travel Pace</label>
                  <select value={pace} onChange={(e) => setPace(e.target.value)}>
                    <option value="Slow">Slow – Relax & fewer places</option>
                    <option value="Balanced">Balanced – Sightseeing + rest</option>
                    <option value="Fast">Fast – Tight schedule</option>
                  </select>
                </div>

                <div className="field">
                  <label>Travel Month</label>
                  <select value={Month} onChange={(e) => setMonth(e.target.value)}>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>

                <div className="field">
                  <label>Transport Preference</label>
                  <select value={Transport} onChange={(e) => setTransport(e.target.value)}>
                    <option>Walking</option>
                    <option>Taxi</option>
                    <option>Public Transport</option>
                    <option>Rental Car</option>
                  </select>
                </div>

                </div>
                
              </div>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={detailLevel === "morning"}
                    onChange={() => setDetailLevel("morning")}
                  />
                  Morning / Afternoon / Evening
                </label>

                <label>
                  <input
                    type="radio"
                    checked={detailLevel === "hourly"}
                    onChange={() => setDetailLevel("hourly")}
                  />
                  Hour-by-hour
                </label>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "⚡ Planning with AI..." : "✨ Generate AI Itinerary"}
              </button>

              {loading && (
                <div className="home-loading">
                  <div className="spinner"></div>
                  <p>Analyzing destinations, routes & experiences…</p>
                </div>
              )}
            </form>
          </div>
        )}

        {activeComponent === "results" && (
          <TripResults
            suggestions={tripSuggestions}
            loading={loading}
            onClose={() => handleNavigation("home")}
          />
        )}

        {activeComponent === "profile" && (
          <ProfilePage
            user={currentUser}
            onBack={() => handleNavigation("home")}
            onLogout={handleLogout}
          />
        )}

        {activeComponent === "itineraries" && (
          <ItineraryPage
            onBack={() => handleNavigation("home")}
            onItineraryClick={(id) => {
              setSelectedItineraryId(id);
              setActiveComponent("itinerary-detail");
            }}
            fetchItineraries={fetchItineraries}
          />
        )}

        {activeComponent === "itinerary-detail" && (
          <ItineraryDetail
            itineraryId={selectedItineraryId}
            onBack={() => handleNavigation("itineraries")}
          />
        )}

        {activeComponent === "saved" && (
          <SavedItineraries
            user={currentUser}
            onBack={() => handleNavigation("home")}
          />
        )}

        {activeComponent === "packing" && (
          <PackingList
            user={currentUser}
            onBack={() => handleNavigation("home")}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
