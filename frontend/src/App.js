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
  const [tripType, setTripType] = useState("multi");
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(4);
  const [place, setPlace] = useState("");
  const [group, setGroup] = useState("Family");
  const [budget, setBudget] = useState("Medium");
  const [pace, setPace] = useState("Balanced");
  const [detailLevel, setDetailLevel] = useState("morning");
  const [Month, setMonth] = useState("");
  const [Transport, setTransport] = useState("");

  /* ===== Load user ===== */
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setCurrentUser(JSON.parse(userData));
  }, []);

  /* ===== Check AI status ===== */
  useEffect(() => {
    const checkAPI = async () => {
      if (!currentUser) return;
      try {
        const test = await generateTravelItinerary("test", "morning");
        setApiStatus(test?.text ? "available" : "unavailable");
      } catch {
        setApiStatus("unavailable");
      }
    };
    checkAPI();
  }, [currentUser]);

  /* ===== Auth ===== */
  const handleLoginSuccess = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setShowSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setTripSuggestions(null);
    setActiveComponent("home");
  };

  /* ===== Submit Trip ===== */
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

    let description = "";

    if (tripType === "hours") {
      description = `
      You are a professional travel planner.

        Create a realistic ${hours}-hour itinerary in ${place}.
        Traveler type: ${group}
        Pace: ${pace}
        Month: ${Month}
        Transport: ${Transport}
        Rules:
        - Use HOUR-WISE format (Hour 1, Hour 2, etc.)
        - Max 3–4 nearby places only
        - Keep travel time minimal
        - Focus on cafes, parks, markets, viewpoints
        - Include short food/snack suggestions
        - No hotels or long-distance travel
        - Simple bullet points
        - Practical and relaxed flow
        Budget:
        - Mention estimated cost per activity
        - End with TOTAL ESTIMATED COST for ${hours} hours
        `;
    } else if (tripType === "day") {
      description = `
      You are a professional travel planner .

          Create a realistic 1-day itinerary for ${place}.
          Traveler type: ${group}
          Budget: ${budget}
          Pace: ${pace}
          Month: ${Month}
          Transport: ${Transport}
          Rules:
          - Morning / Afternoon / Evening
          - Max 2–3 main attractions
          - Include breakfast, lunch, and evening food spots
          - Keep travel distances short
          - Mention local specialties
          - Avoid rushing and overcrowding
          - Add practical tips (best time, ticket tips)
          - Easy-to-follow formatting
            Budget:
          - Show cost for food, transport, attractions
          - End with TOTAL DAY BUDGET (one clear number)

          `;
    } else {
      description = `
      You are a professional travel planner .
          Create a realistic ${days}-day itinerary for ${place}.
          Traveler type: ${group}
          Budget: ${budget}
          Pace: ${pace}
          Detail level: ${detailLevel}
          Month: ${Month}
          Transport: ${Transport}
          Rules:
          - Day-wise structured plan (Day 1, Day 2, etc.)
          - Max 3–4 activities per day
          - First day should be light, last day relaxed
          - Include local food recommendations daily
          - Suggest transport options between places
          - Mention approximate daily cost (rough estimate)
          - Consider weather and season
          - Avoid unrealistic travel distances
          - Clear headings and bullet points

        
        Budget:
          - Show DAILY estimated cost breakdown
          - Include food, transport, attractions
          - End with TOTAL TRIP COST (sum of all days)
          `;
    }

    setLoading(true);

    try {
      const aiResponse = await generateTravelItinerary(description, detailLevel);
      setTripSuggestions(aiResponse);
      setApiStatus("available");
      setActiveComponent("results");

      const saved = JSON.parse(localStorage.getItem("userTrips") || "[]");
      saved.push({
        id: Date.now(),
        date: new Date().toISOString(),
        description,
        text: aiResponse.text,
      });
      localStorage.setItem("userTrips", JSON.stringify(saved));
    } catch {
      setApiStatus("unavailable");
      alert("AI service unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onLogoutClick={handleLogout}
        onHomeClick={() => setActiveComponent("home")}
        onItinerariesClick={() => setActiveComponent("itineraries")}
        onSavedClick={() => setActiveComponent("saved")}
        onPackingListClick={() => setActiveComponent("packing")}
        onProfileClick={()=>setActiveComponent("profile")}
      />

      {showSignIn && (
        <SignIn onClose={() => setShowSignIn(false)} onLoginSuccess={handleLoginSuccess} />
      )}

      <main className="main-content">
        {activeComponent === "home" && (
          <div className="trip-planner">
            <h1 className="planner-title">Plan Your Trip</h1>

            {currentUser && apiStatus !== "checking" && (
              <div className={`api-status ${apiStatus}`}>
                {apiStatus === "available" ? "✅ AI Assistant Ready" : "⚠️ AI Offline"}
              </div>
            )}

            <form className="trip-form" onSubmit={handleSubmit}>
              <div className="trip-form-header">
                <h2>Build Your Trip Preferences</h2>
                <p>Tell us a few details so the AI can plan your trip perfectly</p>
              </div>

              {/* Trip Type */}
              <div className="field">
                <label>Trip Type</label>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                  <option value="hours">Few Hours</option>
                  <option value="day">1 Day</option>
                  <option value="multi">Multiple Days</option>
                </select>
              </div>

              {tripType === "hours" && (
                <div className="field">
                  <label>Number of Hours</label>
                  <input type="number" min="1" max="12" value={hours} onChange={(e) => setHours(e.target.value)} />
                </div>
              )}

              {tripType === "multi" && (
                <div className="field">
                  <label>Number of Days</label>
                  <input type="number" min="2" value={days} onChange={(e) => setDays(e.target.value)} />
                </div>
              )}

              {/* Common fields */}
              <div className="field">
                <label>Destination</label>
                <input value={place} onChange={(e) => setPlace(e.target.value)} />
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

              {(tripType === "day" || tripType === "multi") && (
                <div className="field">
                  <label>Budget</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Luxury</option>
                  </select>
                </div>
              )}

              <div className="field">
                <label>Travel Pace</label>
                <select value={pace} onChange={(e) => setPace(e.target.value)}>
                  <option>Slow & Relex</option>
                  <option>Balanced (Sightseeing +Rest)</option>
                  <option>Fast (Tight schedule)</option>
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
                <label>Transport</label>
                <select value={Transport} onChange={(e) => setTransport(e.target.value)}>
                  <option>Public Transport </option>
                  <option>Rented car</option>
                  <option>Walking</option>
                </select>
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
          <TripResults suggestions={tripSuggestions} onClose={() => setActiveComponent("home")} />
        )}

        {activeComponent === "itineraries" && (
          <ItineraryPage
            onBack={() => setActiveComponent("home")}
            onItineraryClick={(id) => {
              setSelectedItineraryId(id);
              setActiveComponent("itinerary-detail");
            }}
          />
        )}

        {activeComponent === "profile" && (
          <ProfilePage
            user={currentUser}
            onBack={() => setActiveComponent("home")}
            onLogout={handleLogout}
            onPackingListClick={() => setActiveComponent("packing")}
          />
        )}


        {activeComponent === "itinerary-detail" && (
          <ItineraryDetail itineraryId={selectedItineraryId}
          onBack={()=>setActiveComponent("itineraries")} />
        )}

        {activeComponent === "saved" && <SavedItineraries />}
        {activeComponent === "packing" && <PackingList />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
