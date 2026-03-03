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
import PlanPage from "./pages/TripPlanner";
import heroImage from "./assets/illustrations/bg1.webp";

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
  <div className="relative max-w-7xl mx-auto mt-4 md:mt-14 px-4 md:px-4">

  {/* ================= MOBILE ================= */}
 {/* ================= MOBILE ================= */}
<div className="block md:hidden relative">

  {/* ===== FULL BLEED HERO ===== */}
  <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-[82vh] overflow-hidden">

    {/* Background Image */}
    <img
      src={heroImage}
      alt="Travel"
      className="absolute inset-0 w-full h-full object-cover scale-110"
    />

    {/* Cinematic Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 backdrop-blur-[4px]" />

    {/* Smooth fade into form */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#f7f6f1] to-transparent" />

    {/* HERO CONTENT */}
    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-7">

      <div className="mb-8 tracking-[0.6em] uppercase text-white/80 font-semibold text-sm">
        EXPEDITIO
      </div>

      <div className="mb-6 text-[11px] tracking-[0.45em] uppercase text-white/70 font-semibold">
        Smart Travel Planning
      </div>

      <h1 className="font-serif text-[46px] leading-[1.05] font-semibold text-white">
        Plan Smart.
        <br />
        <span className="text-[#dce775]">
          Travel Better.
        </span>
      </h1>

      <p className="mt-7 text-[17px] text-white/85 leading-relaxed max-w-sm">
        AI builds refined itineraries in seconds —
        from short city escapes to immersive journeys.
      </p>

      <button
        onClick={() =>
          formCardRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-10 w-full rounded-full bg-[#5b6f00] px-8 py-5 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] active:scale-95 transition"
      >
        Generate My Itinerary →
      </button>

    </div>
  </div>


 
{/* ===== CLEAN CONNECTED FORM ===== */}
<div
  ref={formCardRef}
  className="-mt-16 relative z-40 "
>
  <div className="
    bg-white
    rounded-3xl
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-6
  ">

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
      citySuggestions={citySuggestions}
      showSuggestions={showSuggestions}
      setShowSuggestions={setShowSuggestions}
      tripDate={tripDate}
      setTripDate={setTripDate}
    />

  </div>
</div>
</div>



  {/* ================= DESKTOP ================= */}
  <div className="hidden md:grid md:grid-cols-[1fr_1.35fr] gap-12 items-center mb-20">

    {/* LEFT TEXT */}
    <div className="relative space-y-6 text-left z-20">

      <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#5b6f00] font-semibold">
        <span className="w-6 h-[1px] bg-[#5b6f00]" />
        Smart Travel Planning
      </div>

      <h1 className="font-serif text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-[#1f2d1f]">
        Plan Smart.
        <br />
        <span className="relative inline-block text-[#5b6f00]">
          Travel Better.
          <span className="absolute left-0 bottom-2 w-full h-3 bg-[#5b6f00]/10 -z-10 rounded" />
        </span>
      </h1>

      <p className="text-xl text-[#4b5563] max-w-lg leading-relaxed">
        AI builds your itinerary in seconds — whether it’s a few hours,
        one perfect day, or a complete multi-day escape.
      </p>

      <button
        onClick={() =>
          formCardRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        className="rounded-full bg-[#5b6f00] px-10 py-4 text-white font-semibold 
        hover:bg-[#4a5a00] transition-all duration-300 
        shadow-[0_10px_30px_rgba(91,111,0,0.25)]"
      >
        Generate My Itinerary →
      </button>
    </div>

    {/* RIGHT SIDE WITH FLOATING IMAGE + FORM */}
    <div className="relative flex justify-end">

      <div className="relative w-full max-w-xl">

        <div className="absolute -left-40 top-1/2 -translate-y-1/2 z-0">
          <div className="absolute inset-0 -m-20 bg-[#5b6f00]/10 rounded-full blur-[100px]" />

          <div className="relative w-[420px] h-[600px] rounded-[220px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.08)]">
            <img
              src={heroImage}
              alt="Travel Destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-[#f7f6f1]/60" />
          </div>
        </div>

        <div className="relative z-20">
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
            citySuggestions={citySuggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            tripDate={tripDate}
            setTripDate={setTripDate}
          />
        </div>

      </div>
    </div>
  </div>
</div>

            {/* LOWER SECTIONS */}
            <FeatureCards onNavigate={(path) => navigate(path)} />

            <ItinerarySlider
              onItineraryClick={(slug) => {
                navigate(`/itineraries/${slug}`);
              }}
            />
            <CitySlider onCityClick={(slug) => navigate(`/cities/${slug}`)} />
            <AiFeedbackBanner source="AI Planner" />
            <div className="mt-16 md:mt-24">
              <div className="py-12 md:py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
                  <div className="w-16 h-1 bg-black/30 mx-auto rounded-full" />
                  <h2 className="text-2xl md:text-4xl font-serif text-[#1f2d1f] leading-tight">
                    You too can earn while on the move
                  </h2>
                  <button
                    onClick={() => navigate("/become-guide")}
                    className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-[#5b6f00] px-10 py-4 text-white text-lg font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
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