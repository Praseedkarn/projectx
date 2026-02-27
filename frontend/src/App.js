import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./analytics";
import "./App.css";
import API_BASE_URL from "./services/apiClient";

/* ===== COMPONENT IMPORTS ===== */
import Header from "./components/Header";
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
import FaqFooterSection from "./components/FaqFooterSection";
// import BecomeGuide from "./components/BecomeGuide";
import { demoItinerary } from "./data/demoItineraries";
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
  const isQrTrip = location.pathname.startsWith("/qr-trip/");

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
  const headerRef = useRef(null);
const [popupMessage, setPopupMessage] = useState("");
  /* ================= AI ================= */
  const [apiStatus, setApiStatus] = useState("checking");
  /* ================= USER ================= */
const [tripDate, setTripDate] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);


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
        // ✅ Set user
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        
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

  console.log("TripType:", tripType);
console.log("TripDate:", tripDate);
  if (!place.trim()) {
    alert("Please enter a destination");
    return;
  }

  setLoading(true);

  const cleanedPlace = place.trim();
  const isDemoRequest = cleanedPlace.toLowerCase() === "demo";

  try {
    let result;
    let aiResponse;
    let weatherData = null;

    /* ================= DEMO ================= */
    if (isDemoRequest) {
      result = { text: demoItinerary.text };
    } else {

      /* ================= WEATHER (ONLY IF DATE SELECTED) ================= */
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

      /* ================= BUILD PROMPT ================= */
      const prompt = buildPrompt({
        tripType,
        place: cleanedPlace,
        hours,
        days,
        group,
        suggestions,
        weatherData,   // 🔥 inject here
        tripDate       // 🔥 inject here
      });

      /* ================= CALL AI ================= */
      aiResponse = await generateTravelItinerary(prompt);

      if (!aiResponse?.text) {
        throw new Error("AI_EMPTY");
      }

      /* ================= GUEST FREE COUNT ================= */
      if (
        !currentUser &&
        typeof aiResponse.remainingFree === "number" &&
        !showFreePopup
      ) {
        setFreeRemaining(aiResponse.remainingFree);
        setShowFreePopup(true);
      }

      result = { text: aiResponse.text };

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
    }

    /* ================= SAVE RESULT ================= */
    localStorage.setItem("lastTripResult", JSON.stringify(result));

    setTimeout(() => {
      navigate("/results", {
        state: {
          suggestions: result,
          city: isDemoRequest ? "Demo City" : cleanedPlace,
          tripType,
          isDemo: isDemoRequest,
          weather: weatherData || null,  // 🔥 pass weather
          tripDate: tripDate || null     // 🔥 pass date
        },
      });

      setLoading(false);
    }, 1200);

  } catch (err) {
    console.error("AI ERROR:", err);
    setLoading(false);

    if (err.status === 429) {
      setShowFreePopup(true);
      return;
    }

    if (err.code === "NO_TOKENS") {
      navigate("/quiz");
      return;
    }

    navigate("/ai-failed", {
      state: { reason: "AI service temporarily unavailable" },
    });
  }
};


  /* ================= SUBMIT ================= */
const handleSubmit = (e) => {
  e.preventDefault();

 

  runGeneration();
};

  /* ================= RENDER PAGE ================= */


  return (


    <div className="App">


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
      {/* ===== HEADER ===== */}
      {!isQrTrip && (
        <Header
          ref={headerRef}
          variant={location.pathname === "/" ? "home" : "compact"}
          user={currentUser}
          onSignInClick={() => setShowSignIn(true)}
          onLogoutClick={handleLogout}
          onHomeClick={() => navigate("/")}
          onItinerariesClick={() => navigate("/itineraries")}
          onSavedClick={() => navigate("/saved")}
          onPackingListClick={() => navigate("/packing")}
          onProfileClick={() => navigate("/profile")}
          onBlogsClick={() => navigate("/blogs")}
        />
      )}


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

      {/* ===== MAIN CONTENT AREA ===== */}
      <main
        className={` pb-24 overflow-hidden transition-all duration-500 ${isQrTrip
          ? "pt-0 bg-[#f6f7f9]"
          : location.pathname === "/"
            ? "pt-[250px] bg-[#d7f26e]"
            : "pt-32 bg-white"
          }`}
      >

        <AppRouter
          currentUser={currentUser}
          handleLogout={handleLogout}
          navigate={navigate}
           openLogin={() => setShowSignIn(true)}
          // QUICK FIX: Pass your entire Home logic as a prop so variables stay linked
          homeContent={
            <>
              {/* HERO SECTION */}
              <div className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-56 md:mt-60">
                <div className="space-y-6 text-center md:text-left">
   <h2 className="font-serif text-3xl sm:text-4xl md:text-4xl font-medium leading-[1.05] tracking-tight text-[#2f3e2f]">
  Stop Planning . 
  {"  "} 
  <span className="text-[#5b7c67] italic">
     Start Exploring.
  </span>
  <br />
 
</h2>

<p className="mt-4 text-lg italic text-gray-700">
  Expeditio creates intelligent, well-paced travel itineraries
  tailored to your time, style, and destination - in seconds.
</p>
                  <button
                    onClick={() => formCardRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="rounded-full bg-[#5b7c67] px-8 py-3.5 text-white font-medium hover:bg-[#4a6a58] transition-all shadow-md hover:shadow-lg"
                  >
                    Start my trip →
                  </button>
                </div>

                <div className="flex justify-center md:justify-end">
                  <img
                    src="/world_map_PNG34.png"
                    alt="Map"
                    className="w-72 md:w-96 opacity-95 -rotate-2 drop-shadow-[0_25px_40px_rgba(91,124,103,0.35)] transition-transform duration-500 hover:rotate-0 hover:scale-105"
                  />
                </div>
              </div>

              {/* AI FORM CARD */}
              <div className="w-full bg-white rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div ref={formCardRef} className="max-w-[1400px] mx-auto px-8 md:px-20 py-12">
                  <div className="text-center space-y-3 mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">
                      Tell us your travel preferences
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Just provide some basic information and we’ll plan your trip.
                    </p>

                    {currentUser && apiStatus !== "checking" && (
                      <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-xs font-medium ${apiStatus === "available" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                        <span className={`h-2 w-2 rounded-full ${apiStatus === "available" ? "bg-green-500" : "bg-red-500"}`} />
                        {apiStatus === "available" ? "AI assistant is online" : "AI assistant is offline"}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* SEGMENTED CONTROL */}
                    <div className="w-full sm:max-w-md mx-auto">
                      <div className="relative flex w-full rounded-xl border border-gray-200 bg-gray-50 p-1.5">
                        {[
                          { key: "hours", label: "Few hours" },
                          { key: "day", label: "One day" },
                          { key: "multi", label: "Multi-day" },
                        ].map((t) => (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => setTripType(t.key)}
                            className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium
                            transition-all duration-200 ease-out
                            ${tripType === t.key
                                ? "bg-white text-blue-700 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                              }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>


                    {/* CONDITIONAL INPUTS */}
                    {tripType === "hours" && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                          Number of hours
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={hours}
                          onChange={(e) => setHours(Number(e.target.value))}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-shadow"
                        />
                      </div>
                    )}
       
                    {tripType === "multi" && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                          Number of days (Max 7)
                        </label>
                        <input
                          type="number"
                          min={2}
                          max={7}   // 👈 ADD THIS
                          value={days}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value <= 7) {
                              setDays(value);
                            }
                          }}
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    )}


                    <div className="relative space-y-3">
                      <label className="text-sm font-medium text-gray-700">Destination</label>

                      <input
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        placeholder="Enter city or place"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5
                          focus:ring-2 focus:ring-[#5b7c67] focus:border-transparent outline-none transition-shadow"
                      />

                      {/* ===== SUGGESTIONS DROPDOWN ===== */}
                      {showSuggestions && citySuggestions.length > 0 && (
                        <div className="absolute z-20 w-full bg-white border border-gray-200
                          rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto">
                          {citySuggestions.map((city) => (
                            <div
                              key={city.geonameId}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setPlace(`${city.name}, ${city.countryName}`);
                                setShowSuggestions(false);
                              }}
                              className="px-4 py-3 hover:bg-gray-50
                               cursor-pointer text-sm transition-colors border-b border-gray-100 last:border-0"
                            >
                              <strong>{city.name}</strong>, {city.countryName}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {tripType === "day" && (
  <div className="space-y-4">
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Trip Date (Optional)
      </label>
      <input
        type="date"
        value={tripDate}
        onChange={(e) => setTripDate(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  </div>
)}


                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-700">Travel group</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["Solo", "Couple", "Family", "Friends"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGroup(g)}
                            className={`rounded-lg border px-4 py-3 text-sm transition-all ${group === g ? "border-[#5b7c67] bg-[#5b7c67]/10 font-medium" : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        Special preferences (optional)
                      </label>
                      <input
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                        placeholder="Avoid crowds, cafes, photography spots..."
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#5b7c67] focus:border-transparent outline-none transition-shadow"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        "Hotels",
                        "Food spots",
                        "Local sightseeing",
                        "Nature places",
                        // "Shopping areas",
                        // "Photography spots",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => addSuggestion(item)}
                          className="
                            rounded-full border border-gray-200
                            px-3 py-1.5
                            text-xs font-medium
                            text-gray-600
                            hover:bg-gray-50
                            hover:border-gray-300
                            transition-all
                          "
                        >
                          + {item}
                        </button>
                      ))}
                    </div>




                    <div className="pt-8 border-t border-gray-100">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[#5b7c67] py-4 text-white font-semibold hover:bg-[#4a6a58] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? "Planning your trip..." : "Create My Travel Plan"}
                      </button>
                      {loading && <p className="text-center text-sm text-gray-500 mt-3">Analyzing destinations, routes & experiences...</p>}
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/quiz")}
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Earn tokens (Take Quiz)
                    </button>



                  </form>
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
              <CitySlider
                onCityClick={(slug) => navigate(`/cities/${slug}`)}
              />




              <div className="mt-24">
                <div className="bg-[#d7f26e] py-20 px-6 text-center">
                  <div className="max-w-3xl mx-auto space-y-8">
                    <div className="w-16 h-1 bg-black/30 mx-auto rounded-full" />
                    <h2 className="text-3xl md:text-4xl font-serif text-black leading-tight">You too can earn while on the move</h2>
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
        />
      </main>

      {/* FOOTER */}
      {location.pathname === "/" && <FaqFooterSection />}




    </div>
  );


}

export default App;   