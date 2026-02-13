import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

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

import CitySlider from "./components/CitySlider";
import { buildPrompt } from "./services/prompts/buildPrompt";


function App() {
  /* ================= ROUTER ================= */
  const navigate = useNavigate();
  const location = useLocation();
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


  /* ================= REFS ================= */
  const formCardRef = useRef(null);
  const headerRef = useRef(null);

  /* ================= AI ================= */
  const [apiStatus, setApiStatus] = useState("checking");
  /* ================= USER ================= */


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

        // ✅ Show login success popup ONCE
        const loginFlag = sessionStorage.getItem("loginSuccess", true);
        if (loginFlag) {
          setShowLoginPopup(true);
          sessionStorage.removeItem("loginSuccess");

          setTimeout(() => {
            setShowLoginPopup(false);
          }, 2500);
        }
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
  };



  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser(null);
    navigate("/");
  };


  /* ================= NAV ================= */


  /* ================= SUBMIT ================= */
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

    setLoading(true);

    const cleanedPlace = place.trim();
    const isDemoRequest = cleanedPlace.toLowerCase() === "demo";

    try {
      let result;
      let aiResponse;


      /* ================= DEMO ================= */
      if (isDemoRequest) {
        result = { text: demoItinerary.text };
      }
      /* ================= AI ================= */
      else {
        // 🔥 STEP 2 — SELECT PROMPT BASED ON TRIP TYPE
        const prompt = buildPrompt({
          tripType,
          place: cleanedPlace,
          hours,
          days,
          group,
          suggestions,
        });


        aiResponse = await generateTravelItinerary(prompt);

        if (!aiResponse?.text) {
          throw new Error("AI_EMPTY");
        }

        result = { text: aiResponse.text };

        /* ================= TOKENS ================= */
        if (
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

      /* ================= SAVE ================= */
      localStorage.setItem("lastTripResult", JSON.stringify(result));

      /* ================= NAVIGATE ================= */
      setTimeout(() => {
        navigate("/results", {
          state: {
            suggestions: result,
            city: isDemoRequest ? "Demo City" : cleanedPlace,
            tripType, // ✅ IMPORTANT
            isDemo: isDemoRequest,
          },
        });
        setLoading(false);
      }, 5000);

    } catch (err) {
      console.error("AI ERROR:", err);
      setLoading(false);

      if (err.code === "NO_TOKENS") {
        navigate("/quiz");
        return;
      }

      navigate("/ai-failed", {
        state: { reason: "AI service temporarily unavailable" },
      });
    }
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
            background: "#2e7d32",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "14px",
          }}
        >
          ✅ Logged in successfully
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
          // QUICK FIX: Pass your entire Home logic as a prop so variables stay linked
          homeContent={
            <>
              {/* HERO SECTION */}
              <div className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-60 md:mt-60">
                <div className="space-y-6 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                    What is EXPEDITIO ?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Expeditio is an AI-powered travel planning platform designed to help travelers create realistic, well-paced itineraries based on their available time, travel style, budget, and destination.
                  </p>
                  <button
                    onClick={() => formCardRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="rounded-full bg-[#5b7c67] px-8 py-3.5 text-white font-medium hover:bg-[#4a6a58] transition-all shadow-md hover:shadow-lg"
                  >
                    Start Planning
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
                          Number of days
                        </label>
                        <input
                          type="number"
                          min={2}
                          value={days}
                          onChange={(e) => setDays(Number(e.target.value))}
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
                        {loading ? "Planning your trip..." : "Generate itinerary"}
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