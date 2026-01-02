import { useState, useEffect, useRef } from "react";
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
import ItinerarySlider from "./components/ItinerarySlider";
import BlogDetail from "./components/BlogDetail";
import Blogs from "./components/Blogs";

import { generateTravelItinerary } from "./services/api";

function App() {
  const formCardRef = useRef(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [tripSuggestions, setTripSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeComponent, setActiveComponent] = useState("home");
  const [selectedItineraryId, setSelectedItineraryId] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
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
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);
  const [suggestions, setSuggestions]=useState("");
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

  useEffect(() => {
  if (!headerRef.current) return;

  const updateHeight = () => {
    setHeaderHeight(headerRef.current.offsetHeight);
  };

  updateHeight(); // initial
  window.addEventListener("resize", updateHeight);

  return () => window.removeEventListener("resize", updateHeight);
}, [activeComponent]);


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
        Create a realistic ${hours}-hour itinerary in ${place}.
        Traveler type: ${group}
        Pace: ${pace}
        Month: ${Month}
        Transport: ${Transport}
        Rules:
        - Use HOUR-WISE format (Hour 1, Hour 2, etc.) and keep it relaxed.
        - Max 3–4 nearby places only
        - Keep travel time minimal
        - Focus on cafes, parks, markets, viewpoints
        - Include short food/snack suggestions
        - No hotels or long-distance travel
        - Simple bullet points
        - Practical and relaxed flow
        User Preferences / special Request:
         ${suggestions||"None"}
        Budget:
        - Mention estimated cost per activity
        - End with TOTAL ESTIMATED COST for ${hours} hours
        

      `;
    } else if (tripType === "day") {
        description = `
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
          User Preferences / special Request:
      ${suggestions||"None"}
            Budget:
          - Show cost for food, transport, attractions
          - End with TOTAL DAY BUDGET (one clear number)
        `;
    } else {
      description = `
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

        User Preferences / special Request:
      ${suggestions || "None"}
        Budget:
          - Show DAILY estimated cost breakdown
          - Include food, transport, attractions
          - End with TOTAL TRIP COST (sum of all days)
        `;
    }

    setLoading(true);
    setTripSuggestions(null);
    setActiveComponent("results");
    try {
      const aiResponse = await generateTravelItinerary(description, detailLevel);

      setTripSuggestions({
        text:
          aiResponse?.text ||
          aiResponse?.result ||
          aiResponse?.choices?.[0]?.message?.content ||
          String(aiResponse),
      });

      setApiStatus("available");
      

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
      ref={headerRef}
        variant={activeComponent === "home" ? "home" : "compact"}
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onLogoutClick={handleLogout}
        onHomeClick={() => setActiveComponent("home")}
        onItinerariesClick={() => setActiveComponent("itineraries")}
        onSavedClick={() => setActiveComponent("saved")}
        onPackingListClick={() => setActiveComponent("packing")}
        onProfileClick={() => setActiveComponent("profile")}
        onBlogsClick={()=>setActiveComponent("blogs")}
      />

      <div
        style={{
          height:
            activeComponent === "home"
              ? headerHeight + 480   // 👈 extra space for hero
              : headerHeight,
        }}
        className="transition-[height] duration-500"
      />


      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <main className="bg-[#d7f26e]/80 px-4  pb-24 overflow-hidden">

        {/* ===== HERO (HOME ONLY) ===== */}
        {activeComponent === "home" && (
          <div className="max-w-6xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                What is PROJECT X ?
              </h2>
              <p className="text-gray-600">
                {/* Handpicked itineraries for every kind of traveler */}
                Project X is an AI-powered travel planning platform designed to help travelers create realistic, well-paced itineraries based on their available time, travel style, budget, and destination.
              </p>
              <button
                onClick={() =>
                  formCardRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-[#5b7c67] px-6 py-3 text-white"
              >
                 Start Planning
              </button>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src="/world_map_PNG34.png"
                alt="Map"
                className=" w-72 md:w-96
                opacity-95
                -rotate-2
                drop-shadow-[0_25px_40px_rgba(91,124,103,0.35)]
                transition-transform duration-500
                hover:rotate-0 hover:scale-105"
              />
            </div>
          </div>
        )}
        {/* HOME */}
        {activeComponent === "home" && (
          <div className="max-w-6xl mx-auto space-y-24">
            <div ref = {formCardRef} className="bg-white rounded-[32px] shadow-lg p-8">

              {/* card header */}
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Build your trip
                  </h2>
                  <p className="text-sm text-gray-500">
                    A few details are all we need to plan your perfect journey
                  </p>

                  {/* ===== AI STATUS ===== */}
                  {currentUser && apiStatus !== "checking" && (
                    <div
                      className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5
                        rounded-full text-xs font-medium
                        ${
                          apiStatus === "available"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          apiStatus === "available" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {apiStatus === "available"
                        ? "AI assistant is online"
                        : "AI assistant is offline"}
                    </div>
                  )}
                </div>


             <form onSubmit={handleSubmit} className="space-y-6">

                {/* ===== Trip Type ===== */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Trip type
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3
                              focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/30"
                  >
                    <option value="hours">Few hours</option>
                    <option value="day">One day</option>
                    <option value="multi">Multiple days</option>
                  </select>
                </div>

                {/* ===== Conditional Fields ===== */}
                {tripType === "hours" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Number of hours
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    />
                  </div>
                )}

                {tripType === "multi" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Number of days
                    </label>
                    <input
                      type="number"
                      min="2"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    />
                  </div>
                )}

                {/* ===== Destination ===== */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Enter city or place"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>

                {/* ===== Grid Fields ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Travel group</label>
                    <select
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3"
                    >
                      <option>Solo</option>
                      <option>Couple</option>
                      <option>Family</option>
                      <option>Friends</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Travel pace</label>
                    <select
                      value={pace}
                      onChange={(e) => setPace(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3"
                    >
                      <option>Slow & relaxed</option>
                      <option>Balanced</option>
                      <option>Fast</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Month</label>
                    <select
                      value={Month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3"
                    >
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transport</label>
                    <select
                      value={Transport}
                      onChange={(e) => setTransport(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3"
                    >
                      <option>Public transport</option>
                      <option>Rented car</option>
                      <option>Walking</option>
                    </select>
                  </div>
                  {(tripType === "day" || tripType === "multi") && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Budget</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>Luxury</option>
                      </select>
                    </div>
                  )}

                  {/* <div className="suggestion-box">
                    <label>Any special preferences? (optional)</label>
                    <textarea
                      placeholder="Eg: avoid crowds, add cafes, photography spots, local food, slow travel..."
                      value={suggestions}
                      onChange={(e) => setSuggestions(e.target.value)}
                      rows={4}
                    />
                  </div> */}

                  <div className="suggestion-box">
                  <label >
                    Any special preferences? (optional)
                  </label>
                  <input
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="Eg: avoid crowds, add cafes, photography sports, local food..... "
                    className="w-full rounded-xl border border-gray-200 px-4 py-3"
                  />
                </div>
                </div>

                {/* ===== ACTION AREA ===== */}
                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#5b7c67] py-4 text-white
                              font-medium hover:bg-[#4a6a58]
                              transition disabled:opacity-60"
                  >
                    {loading ? "Planning your trip…" : "Generate itinerary"}
                  </button>

                  {loading && (
                    <p className="text-center text-sm text-gray-500">
                      Analyzing destinations, routes & experiences…
                    </p>
                  )}
                </div>
              </form>
            </div>
            {/* ===== FORM CARD 2 ===== */}
                  <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl space-y-12">

              {/* ===== CARD HEADER ===== */}
              {/* <div className="text-center space-y-3">
                <h2 className="text-3xl font-semibold text-gray-800">
                  What is PROJECT X?
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Project X is an AI-powered travel planning platform designed to help
                  travelers create realistic, well-paced itineraries based on their
                  available time, travel style, budget, and destination.
                  <br />
                  <br />
                  Whether you have just a few hours or multiple days, Project X analyzes
                  travel flow and activities to help you plan smarter, stress-free journeys.
                </p>
              </div> */}

              {/* ===== INNER INFO CARDS ===== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CARD 1 */}
               <div className="bg-[#6b8e23] text-white rounded-3xl p-6 flex items-center gap-6">

                {/* LEFT — TEXT */}
                <div className="w-1/2 space-y-2">
                  <h4 className="text-xl font-semibold">
                    AI-Generated Itineraries
                  </h4>
                  <p className="text-sm opacity-90">
                    Instantly generate realistic, well-paced travel plans using AI.
                    From a few hours to multi-day trips — customized by budget, pace,
                    travel group, and season.
                  </p>
                </div>

                {/* RIGHT — IMAGE */}
                <div className="w-1/2 flex justify-center">
                  <img
                    src="/point.png"
                    alt="AI Generated"
                    className="w-28 md:w-32 opacity-90"
                  />
                </div>

              </div>

                {/* CARD 2 */}
              
            <div className="bg-[#6b8e23] text-white rounded-3xl p-6 flex items-center gap-6">

                {/* LEFT — TEXT */}
                <div className="w-1/2 space-y-2">
                  <h4 className="text-xl font-semibold">
                    Save Your Itineraries
                  </h4>
                  <p className="text-sm opacity-90">
                    Save your favorite trips and access them anytime. Revisit past plans, compare journeys, and continue planning without starting from scratch.
                  </p>
                </div>

                {/* RIGHT — IMAGE */}
                <div className="w-1/2 flex justify-center">
                  <img
                    src="/map-location.png"
                    alt="AI Generated"
                    className="w-28 md:w-32 opacity-90"
                  />
                </div>

              </div>
                {/* CARD 3 */}
               


                <div className="bg-[#6b8e23] text-white rounded-3xl p-6 flex items-center gap-6">

                {/* LEFT — TEXT */}
                <div className="w-1/2 space-y-2">
                  <h4 className="text-xl font-semibold">
                    Explore with Maps & 360° Views
                  </h4>
                  <p className="text-sm opacity-90">
                   Visualize your journey using interactive maps and Google 360° views. Explore locations before you travel and understand routes day-by-day.
                  </p>
                </div>

                {/* RIGHT — IMAGE */}
                <div className="w-1/2 flex justify-center">
                  <img
                    src="\360-camera.png"
                    alt="AI Generated"
                    className="w-28 md:w-32 opacity-90"
                  />
                </div>

              </div>


              <div className="bg-[#6b8e23] text-white rounded-3xl p-6 flex items-center gap-6">

                {/* LEFT — TEXT */}
                <div className="w-1/2 space-y-2">
                  <h4 className="text-xl font-semibold">
                    Smart Packing & Planning
                  </h4>
                  <p className="text-sm opacity-90">
                                            Use built-in packing lists and day-wise plans to stay organized.
                        Designed for real travel — not rushed, not generic.
                  </p>
                </div>

                {/* RIGHT — IMAGE */}
                <div className="w-1/2 flex justify-center">
                  <img
                    src="/passport.png"
                    alt="AI Generated"
                    className="w-28 md:w-32 opacity-90"
                  />
                </div>

              </div>

                {/* CARD 4 */}
                

              </div>
             
            </div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-4xl font-semibold text-gray-800">
                Explore ready-made itineraries
              </h2>

              <p className="mt-3 text-gray-500 text-sm md:text-base">
                Hand-crafted travel plans you can explore, customize, or use instantly.
                Click any card to see the full day-by-day itinerary.
              </p>
            </div>
              <ItinerarySlider
              onItineraryClick={(id) => {
                setSelectedItineraryId(id);
                setActiveComponent("itinerary-detail");
              }}
              />
          </div>
        )}

          {activeComponent === "blogs" && (
            <Blogs
              onBlogClick={(slug) => {
                setSelectedBlogSlug(slug);
                setActiveComponent("blog-detail");
              }}
            />
          )}

          {activeComponent === "blog-detail" && (
            <BlogDetail
              slug={selectedBlogSlug}
              onBack={() => setActiveComponent("blogs")}
            />
          )}


        {/* RESULTS */}
        {activeComponent === "results" && (
          <TripResults
            suggestions={tripSuggestions}
            loading={loading}
            onClose={() => setActiveComponent("home")}
          />
        )}

        {/* ITINERARIES */}
        {activeComponent === "itineraries" && (
          <ItineraryPage
            onBack={() => setActiveComponent("home")}
            onItineraryClick={(id) => {
              setSelectedItineraryId(id);
              setActiveComponent("itinerary-detail");
            }}
          />
        )}

        {/* ITINERARY DETAIL */}
        {activeComponent === "itinerary-detail" && (
          <ItineraryDetail
            itineraryId={selectedItineraryId}
            onBack={() => setActiveComponent("itineraries")}
          />
        )}

        {/* PROFILE */}
        {activeComponent === "profile" && (
          <ProfilePage
            user={currentUser}
            onBack={() => setActiveComponent("home")}
            onLogout={handleLogout}
            onPackingListClick={() => setActiveComponent("packing")}
          />
        )}

        {activeComponent === "saved" && <SavedItineraries />}
        {activeComponent === "packing" && <PackingList />}
      </main>

      <Footer />
    </div>
  );
}

export default App;