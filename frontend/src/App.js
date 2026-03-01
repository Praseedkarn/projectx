import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./analytics";
import "./App.css";
import API_BASE_URL from "./services/apiClient";

/* ===== COMPONENT IMPORTS ===== */
import SignIn from "./components/SignIn";
// import TripResults from "./components/TripResults";
// import ProfilePage from "./components/ProfilePage";
// import ItineraryPage from "./components/ItineraryPage";
// import ItineraryDetail from "./components/ItineraryDetail";
// import SavedItineraries from "./components/SavedItineraries";
// import PackingList from "./components/PackingList";
import ItinerarySlider from "./components/ItinerarySlider";
// import BlogDetail from "./components/BlogDetail";
// import Blogs from "./components/Blogs";
// import AdminBlog from "./components/AdminBlog";
import FeatureCards from "./components/FeatureCards";
// import DistanceCalculator from "./components/DistanceCalculator";
// import ExploreCities from "./components/ExploreCities";
// import CityPage from "./components/CityPage";
import AiFeedbackBanner from "./components/AifeedbackBanner";
// import BecomeGuide from "./components/BecomeGuide";
// import { demoItinerary } from "./data/demoItineraries";
import { generateTravelItinerary } from "./services/api";
// import AiFailPage from "./components/AiFaliPage";
import AppRouter from "./AppRouter";
// import QuizPage from "./pages/QuizPage";
// import { logTokenChange } from "./services/api";
import LogoLoader from "./components/LogoLoader";
import FreeGenerationPopup from "./components/FreeGenerationsPopup";
import CitySlider from "./components/CitySlider";
import { buildPrompt } from "./services/prompts/buildPrompt";


function App() {

  // 🔥 Guarantee guestId immediately
  if (!localStorage.getItem("guestId")) {
    localStorage.setItem("guestId", crypto.randomUUID());
  }

  const navigate = useNavigate();
  /* ================= ROUTER ================= */

  const location = useLocation();

  // 🔥 Google Analytics
  useEffect(() => {
    initGA();
  }, []);



  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);


  /* ================= STATE ================= */
  // const [activeComponent, setActiveComponent] = useState("home");
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [selectedItineraryId, setSelectedItineraryId] = useState(null);
  // const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
  // const [showBecomeGuide, setShowBecomeGuide] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showFreePopup, setShowFreePopup] = useState(false);
  const [freeRemaining, setFreeRemaining] = useState(null);
  //const [pendingSubmitEvent, setPendingSubmitEvent] = useState(null);

  /* ================= REFS ================= */
  const formCardRef = useRef(null);
  const [popupMessage, setPopupMessage] = useState("");
  /* ================= AI ================= */
  const [apiStatus, setApiStatus] = useState("checking");
  /* ================= USER ================= */
  const [tripDate, setTripDate] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [multiStartDate, setMultiStartDate] = useState("");

  useEffect(() => {
    let isMounted = true;

    const checkApiStatus = async () => {
      try {
        const res = await fetch("https://projectx-yzu3.onrender.com/api/health");

        if (!res.ok) throw new Error("API down");

        if (isMounted) setApiStatus("available");
      } catch (err) {
        if (isMounted) setApiStatus("offline");
      }
    };

    checkApiStatus();

    return () => {
      isMounted = false;
    };
  }, []);



  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    // 🔹 No token → stop loading
    if (!token) {
      setAuthLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((user) => {
        const safeUser =
          user.role === "admin"
            ? { ...user, tokens: Infinity }
            : user;

        setCurrentUser(safeUser);
        localStorage.setItem("user", JSON.stringify(safeUser));
      })
      .catch(() => {
        // ❌ Invalid / expired token
        localStorage.clear();
        sessionStorage.clear();
        setCurrentUser(null);
      })
      .finally(() => {
        // 🔥 ALWAYS stop loader
        setAuthLoading(false);
      });
  }, []);





  /* ================= FORM ================= */
  const [tripType, setTripType] = useState("multi");
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(4);
  const [place, setPlace] = useState("");
  const [group, setGroup] = useState("Family");
  // const [budget, setBudget] = useState("Medium");
  // const [Transport, setTransport] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [step, setStep] = useState(1);
  // const [travelDate, setTravelDate] = useState("");

  /* ================= AI ================= */

  /* ================= URL → STATE SYNC ================= */
  //  useEffect(() => {
  //   const path = location.pathname;

  //   if (path === "/") setActiveComponent("home");
  //   else if (path === "/cities") setActiveComponent("cities");
  //   else if (path.startsWith("/cities/")) {
  //     setSelectedCity(path.split("/")[2]);
  //     setActiveComponent("city");
  //   }
  //   else if (path === "/itineraries") setActiveComponent("itineraries");
  //   else if (path.startsWith("/itineraries/")) {
  //     setSelectedItineraryId(path.split("/")[2]);
  //     setActiveComponent("itinerary-detail");
  //   }
  //   else if (path === "/packing") setActiveComponent("packing");
  //   else if (path === "/become-guide") setActiveComponent("become-guide");
  //   else if (path === "/ai-failed") setActiveComponent("ai-failed");

  // }, [location.pathname]);



  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!place || place.length < 3) {
        setCitySuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://secure.geonames.org/searchJSON?name_startsWith=${place}&maxRows=6&cities=cities15000&username=praseed`
        );

        const data = await res.json();
        setCitySuggestions(data.geonames || []);
      } catch (err) {
        console.error("GeoNames error", err);
      }
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [place]);

  const addSuggestion = (text) => {
    setSuggestions((prev) => {
      if (!prev) return text;
      if (prev.toLowerCase().includes(text.toLowerCase())) return prev;
      return prev + ", " + text;
    });
  };






  /* ================= AUTH ================= */
  const handleLoginSuccess = (user) => {
    const safeUser =
      user.role === "admin"
        ? { ...user, tokens: Infinity }
        : user;

    setCurrentUser(safeUser);

    // 🎯 Dynamic popup message
    setPopupMessage(
      ` Welcome to Expeditio! You have ${safeUser.tokens} travel tokens.`
    );

    setShowLoginPopup(true);

    setTimeout(() => {
      setShowLoginPopup(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser(null);

    setPopupMessage(" You’ve been logged out successfully.");

    setShowLoginPopup(true);

    setTimeout(() => {
      setShowLoginPopup(false);
    }, 2000);

    navigate("/");
  };


  const runGeneration = async () => {
    if (loading) return; // 🚀 prevent double execution

    const cleanedPlace = place.trim();

    if (!cleanedPlace) {
      alert("Please enter a destination");
      return;
    }

    // 🔥 Date validation
    if (tripType === "day" && !tripDate) {
      alert("Please select a travel date");
      return;
    }

    if (tripType === "multi" && !multiStartDate) {
      alert("Please select a start date");
      return;
    }

    setLoading(true);

    try {
      let weatherData = null;

      /* ================= WEATHER ================= */
      if (tripType === "day" && tripDate) {
        try {
          const weatherRes = await fetch(
            `${API_BASE_URL}/api/weather?city=${encodeURIComponent(cleanedPlace)}&date=${tripDate}`
          );
          if (weatherRes.ok) {
            weatherData = await weatherRes.json();
          }
        } catch (err) {
          console.error("Weather fetch failed:", err);
        }
      }

      if (tripType === "multi" && multiStartDate) {
        try {
          const weatherRes = await fetch(
            `${API_BASE_URL}/api/weather?city=${encodeURIComponent(cleanedPlace)}&date=${multiStartDate}`
          );
          if (weatherRes.ok) {
            weatherData = await weatherRes.json();
          }
        } catch (err) {
          console.error("Weather fetch failed:", err);
        }
      }

      /* ================= BUILD PROMPT ================= */
      const prompt = buildPrompt({
        tripType,
        place: cleanedPlace,
        hours,
        days,
        group,
        suggestions,
        weatherData,
        tripDate,
      });

      /* ================= CALL AI ================= */
      const aiResponse = await generateTravelItinerary(prompt);

      if (!aiResponse?.text) {
        throw new Error("AI_EMPTY");
      }

      /* ================= GUEST FREE POPUP ================= */
      if (!currentUser && typeof aiResponse.remainingFree === "number") {
        setFreeRemaining(aiResponse.remainingFree);

        if (aiResponse.remainingFree <= 1) {
          setShowFreePopup(true);
        }
      }

      /* ================= TOKEN UPDATE ================= */
      if (
        currentUser &&
        currentUser.role !== "admin" &&
        typeof aiResponse.remainingTokens === "number"
      ) {
        const updatedUser = {
          ...currentUser,
          tokens: aiResponse.remainingTokens,
        };

        const storage =
          localStorage.getItem("user") ? localStorage : sessionStorage;

        storage.setItem("user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }

      /* ================= SAVE RESULT ================= */
      const result = { text: aiResponse.text };
      localStorage.setItem("lastTripResult", JSON.stringify(result));

      navigate("/results", {
        state: {
          suggestions: result,
          city: cleanedPlace,
          tripType,
          weather: weatherData || null,
          tripDate: tripDate || null,
          startDate: multiStartDate || null,
        },
      });

    } catch (err) {
      console.error("AI ERROR:", err);
      setLoading(false);

      // 🔥 Guest limit reached
      if (err.status === 429 || err.code === "GUEST_LIMIT") {
        setFreeRemaining(0);
        setShowFreePopup(true);
        return;
      }

      // 🔥 Not enough tokens
      if (err.status === 403 && err.code === "NO_TOKENS") {
        navigate("/quiz");
        return;
      }

      navigate("/ai-failed", {
        state: { reason: err.message || "AI service unavailable" },
      });

      return;
    }

    setLoading(false);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    runGeneration();
  };

  /* ================= RENDER PAGE ================= */


  return (



    <div className="App min-h-screen">
      {/* ✅ LOGIN SUCCESS POPUP */}
      {showLoginPopup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: popupMessage.includes("logged")
              ? "#374151"
              : "linear-gradient(135deg, #5b7c67, #4a6a58)",
            color: "#fff",
            padding: "16px 22px",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontSize: "14px",
            animation: "slideIn 0.4s ease-out",
          }}
        >
          {popupMessage}
        </div>
      )}
      {authLoading && <LogoLoader />}

      {loading && <LogoLoader />}

      {/* ===== SIGN IN MODAL ===== */}
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showFreePopup && !currentUser && (
        <FreeGenerationPopup
          remaining={freeRemaining}
          onClose={() => setShowFreePopup(false)}
          onContinue={() => {
            setShowFreePopup(false);
          }}
        />
      )}

      {/* ===== ROUTER ===== */}
      <AppRouter
        currentUser={currentUser}
        handleLogout={handleLogout}
        navigate={navigate}
        openLogin={() => setShowSignIn(true)}
        // QUICK FIX: Pass your entire Home logic as a prop so variables stay linked
        homeContent={
          <>
            {/* HERO SECTION */}
            <div className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-16 md:mt-18">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-4xl font-medium leading-[1.05] tracking-tight text-[#2f3e2f]">
                  Stop Planning.
                  <span className="text-[#5b7c67] italic"> Start Exploring.</span>
                </h2>

                <p className="mt-4 text-lg italic text-gray-700">
                  Expeditio creates intelligent, well-paced travel itineraries
                  tailored to your time, style, and destination — in seconds.
                </p>

                <button
                  onClick={() => navigate("/plan")}
                  className="rounded-full bg-[#5b7c67] px-8 py-3.5 text-white font-medium hover:bg-[#4a6a58] transition-all shadow-md hover:shadow-lg"
                >
                  Start my trip →
                </button>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  src="/world_map_PNG34.png"
                  alt="Map"
                  className="w-72 md:w-96 opacity-95 -rotate-2 drop-shadow-[0_25px_40px_rgba(91,124,103,0.35)]"
                />
              </div>
            </div>

            {/* ================= ROUNDED PREMIUM BLOCK ================= */}
            <div className="relative rounded-[48px] bg-white px-10 md:px-20 py-36 text-center overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-gray-100">
              {/* Soft Olive Glow */}
              <div className="absolute inset-0 flex justify-center">
                <div className="w-[600px] h-[600px] bg-[#5b6f00]/8 rounded-full blur-[120px] -translate-y-1/3"></div>
              </div>

              <div className="relative z-10 max-w-5xl mx-auto">
                <p className="text-sm tracking-[0.35em] uppercase text-[#5b6f00] font-semibold mb-8">
                  Intelligent Travel
                </p>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-[#1f2d1f]">
                  Plan Smarter.
                  <br />
                  <span className="text-[#5b6f00]">Travel Better.</span>
                </h2>

                <p className="mt-10 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Expeditio builds structured, balanced itineraries powered by AI — so you spend less time planning and more time experiencing.
                </p>

                <div className="mt-14">
                  <button
                    onClick={() => navigate("/plan")}
                    className="rounded-full bg-[#1f2d1f] px-10 py-4 text-white text-lg font-medium 
                    hover:bg-[#5b6f00] transition-all duration-300 
                    shadow-[0_20px_40px_rgba(31,45,31,0.25)] 
                    hover:shadow-[0_25px_60px_rgba(91,111,0,0.35)]"
                  >
                    Start My Trip →
                  </button>
                </div>
              </div>
            </div>

            {/* LOWER SECTIONS */}
            <AiFeedbackBanner source="AI Planner" />

            <FeatureCards onNavigate={(path) => navigate(path)} />
            <ItinerarySlider
              onItineraryClick={(slug) => {
                navigate(`/itineraries/${slug}`);
              }}
            />
            <CitySlider onCityClick={(slug) => navigate(`/cities/${slug}`)} />

            <div className="mt-24">
              <div className=" py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="w-16 h-1 bg-black/30 mx-auto rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-serif text-black leading-tight">
                    You too can earn while on the move
                  </h2>
                  <button
                    onClick={() => navigate("/become-guide")}
                    className="inline-flex items-center justify-center rounded-full bg-[#556b00] px-10 py-4 text-white text-lg font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                  >
                    Become a local guide
                  </button>
                </div>
              </div>
            </div>
          </>
        }
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
        apiStatus={apiStatus}
        citySuggestions={citySuggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        tripDate={tripDate}
        setTripDate={setTripDate}
      />
    </div>
  );


}

export default App;   