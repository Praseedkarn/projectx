import React, { useState, useEffect , useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";



import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  rectSortingStrategy,
  SortableContext,
  useSortable,

} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";


// import DayWiseItinerary from "./DayWiseItinerary";
import HoursItinerary from "./itinerary/HoursItinerary";
import OneDayItinerary from "./itinerary/OneDayItinerary";
import MultiDayItinerary from "./itinerary/MultiDayItinerary";
import { parseHoursText } from "../utils/parsers/parseHoursText";
import { parseOneDayText } from "../utils/parsers/parseOneDayText";
import { parseMultiDayText } from "../utils/parsers/parseMultiDayText";

import API_BASE_URL from "../services/apiClient";
const TextSkeleton = ({ lines = 6 }) => (
  <div className="space-y-4 py-6 w-full max-w-2xl mx-auto">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`bg-gray-100 rounded-xl animate-pulse ${i === 0 ? "h-8 w-1/3 mb-8" :
          i === 1 ? "h-4 w-full" :
            i === lines - 1 ? "h-4 w-2/3" : "h-4 w-full"
          }`}
      />
    ))}
  </div>
);


const TripResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  // const isDemo = location.state?.isDemo;
  // const demoReason = location.state?.reason;
  const tripType = location.state?.tripType || "multi";

  const [placeImages, setPlaceImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(null); // yyyy-mm-dd

 

  const fetchPlaceImages = async (place, osmAttractions = []) => {
    const queries = [
      `${place} city`,
      `${place} skyline`,
      `${place} landmarks`,
      `${place} tourism`,
      `${place} travel`,
    ];

    const isGoodImage = (img) => {
      const text =
        `${img.alt_description || ""} ${img.description || ""}`.toLowerCase();

      const banned = [
        "person",
        "people",
        "portrait",
        "model",
        "food",
        "dish",
        "drink",
        "selfie",
        "face",
      ];

      if (banned.some((w) => text.includes(w))) return false;

      return (
        text.includes(place.toLowerCase()) ||
        text.includes("city") ||
        text.includes("street") ||
        text.includes("landscape")
      );
    };

    const search = async (q) => {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          q
        )}&per_page=9&orientation=landscape&content_filter=high`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
          },
        }
      );

      if (!res.ok) return [];

      const data = await res.json();
      if (!data.results) return [];

      return data.results.filter(isGoodImage);
    };

    // 1️⃣ Try city queries
    for (const q of queries) {
      const imgs = await search(q);
      if (imgs.length >= 3) return imgs.slice(0, 6);
    }

    // 2️⃣ Try OSM attraction names
    for (const a of osmAttractions) {
      const imgs = await search(`${a.name} ${place}`);
      if (imgs.length >= 3) return imgs.slice(0, 6);
    }

    // 3️⃣ Fail cleanly
    return [];
  };

  const DraggableDayCard = ({ id, day }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all select-none group"
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Day
        </div>

        <div className="text-3xl font-bold text-gray-900 mb-4">
          {day.displayDay}
        </div>

        {/* ✅ DRAG HANDLE */}
        <button
          {...attributes}
          {...listeners}
          className="px-6 py-2.5 text-sm font-medium bg-gray-50 rounded-xl cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors text-gray-600"
        >
          <span className="mr-2">⋮⋮</span>
          Drag
        </button>
      </div>
    );
  };



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // desktop drag threshold
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // ⏱️ long press for mobile
        tolerance: 5,
      },
    })
  );



  /* ================= GET DATA SAFELY ================= */
  const suggestions =
    location.state?.suggestions ||
    JSON.parse(localStorage.getItem("lastTripResult"));



  const [buildingDays, setBuildingDays] = useState(false);


  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [qrTripId, setQrTripId] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);

  const [guide, setGuide] = useState(null);

  const [cityInfo, setCityInfo] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const [osmData, setOsmData] = useState(null);
  // const [osmLoading, setOsmLoading] = useState(false);
  const [osmError, setOsmError] = useState("");

  const [viewMode, setViewMode] = useState("days"); // text | json|Days
  const [jsonData, setJsonData] = useState(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [tempDays, setTempDays] = useState([]);
  useEffect(() => {
    if (showReorderModal && jsonData?.days?.length) {
      setTempDays(
        jsonData.days.map((day, index) => ({
          ...day,
          _id: `day-${index}`,     // required by dnd-kit
          displayDay: index + 1,   // for UI label
        }))
      );
    }
  }, [showReorderModal, jsonData]);



  const [jsonError, setJsonError] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);



  useEffect(() => {
    if (!city) return;

    setImageLoading(true);

    fetchPlaceImages(city, osmData?.attractions || [])
      .then((imgs) => setPlaceImages(imgs))
      .catch(() => setPlaceImages([]))
      .finally(() => setImageLoading(false));

  }, [city, osmData]);







  const handleExportToGoogleCalendar = () => {
    if (!startDate || !jsonData?.days?.length) {
      alert("Please select a start date first");
      return;
    }

    const urls = buildGoogleCalendarUrl({
      startDate,
      days: jsonData.days.length,
      city,
      tripType, // 🔥 IMPORTANT
    });

    urls.forEach((url) => window.open(url, "_blank"));
  };
 const parseByTripType = useCallback(
  (text) => {
    if (!text) return null;

    try {
      if (tripType === "hours") return parseHoursText(text);
      if (tripType === "day") return parseOneDayText(text);
      return parseMultiDayText(text);
    } catch (err) {
      console.error("Parsing failed:", err);
      return null;
    }
  },
  [tripType]
);

  useEffect(() => {
    if (!finalText) return;

    setBuildingDays(true);

    const timer = setTimeout(() => {
      try {
        const parsed = parseByTripType(finalText);
        setJsonData(parsed);
        setJsonError("");
      } catch (e) {
        console.error(e);
        setJsonError("Failed to parse itinerary");
        setJsonData(null);
      } finally {
        setBuildingDays(false);
      }
    }, 300); // 👈 small delay so spinner renders

    return () => clearTimeout(timer);
  }, [finalText, parseByTripType]);




  const handleViewChange = (mode) => {
    setViewMode(mode);

    if (mode === "text") {
      setJsonError("");
      return;
    }

    if (!finalText) {
      setJsonError("Text not ready");
      return;
    }

  };


  /* ================= HARD REDIRECT IF NOTHING ================= */
  useEffect(() => {
    if (!suggestions) {
      navigate("/", { replace: true });
    }
  }, [suggestions, navigate]);

  useEffect(() => {
    if (!city) return;

    const fetchGuide = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/guides?city=${encodeURIComponent(city)}`
        );

        if (!res.ok) throw new Error("Guide fetch failed");

        const data = await res.json();

        setGuide(data.available ? data.guide : null);
      } catch (err) {
        console.error("Failed to fetch guide:", err);
        setGuide(null);
      }
    };

    fetchGuide();
  }, [city]);



  useEffect(() => {
    if (!city) return;

    const fetchCityData = async () => {
      setCityLoading(true);
      // setOsmLoading(true);

      setOsmError("");

      try {
        const [wikiRes, osmRes] = await Promise.allSettled([
          fetch(
            `${API_BASE_URL}/api/wiki?query=${encodeURIComponent(city)}`
          ).then(r => r.json()),

          fetch(
            `${API_BASE_URL}/api/osm?city=${encodeURIComponent(city)}`
          ).then(r => r.json()),
        ]);

        // ✅ WIKI (independent)
        if (
          wikiRes.status === "fulfilled" &&
          wikiRes.value?.available
        ) {
          setCityInfo(wikiRes.value);
        }

        // ✅ OSM (independent)
        if (
          osmRes.status === "fulfilled" &&
          osmRes.value?.available &&
          osmRes.value?.attractions?.length > 0
        ) {
          setOsmData(osmRes.value);
        }
      } catch (err) {
        console.error("City data load failed", err);
        setOsmError("Attractions service temporarily unavailable");
      } finally {
        setCityLoading(false);
        // setOsmLoading(false);
      }
    };

    fetchCityData();
  }, [city]);







  const buildGoogleCalendarUrl = ({
    startDate,
    days,
    city,
    tripType,
  }) => {
    const base =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";

    const events = [];

    // 🔹 Title logic
    const title =
      tripType === "day"
        ? `${city} One Day Trip`
        : `${city} ${days} Days Trip`;

    // 🔹 One-day → ONE event
    if (tripType === "day") {
      const date = new Date(startDate);
      const start = date.toISOString().slice(0, 10).replace(/-/g, "");

      events.push(
        `${base}` +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${start}/${start}` +
        `&details=${encodeURIComponent(`Travel itinerary for ${city}`)}` +
        `&location=${encodeURIComponent(city)}`
      );

      return events;
    }

    // 🔹 Multi-day → ONE event per day (same title)
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      const start = date.toISOString().slice(0, 10).replace(/-/g, "");

      events.push(
        `${base}` +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${start}/${start}` +
        `&details=${encodeURIComponent(`Travel itinerary for ${city}`)}` +
        `&location=${encodeURIComponent(city)}`
      );
    }

    return events;
  };












  /* ================= TYPE EFFECT ================= */
  useEffect(() => {
    if (!suggestions?.text) return;


    setIsTyping(true);
    setFinalText("");
    setDisplayText("");
    setIsEditing(false);

    const lines = suggestions.text.split("\n");
    let index = 0;

    const typingInterval = setInterval(() => {
      index++;
      setDisplayText(lines.slice(0, index).join("\n"));

      if (index >= lines.length) {
        clearInterval(typingInterval);
        setFinalText(suggestions.text);
        setDisplayText("");
        setIsTyping(false);
      }
    }, 220 + Math.random() * 80);

    return () => clearInterval(typingInterval);
  }, [suggestions]);

  /* ================= QR ================= */
  const handleGenerateQR = async () => {
    if (!finalText || qrLoading) return;

    setQrLoading(true);


    try {
      const token =
        sessionStorage.getItem("token") ||
        localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL}/api/qr-trips`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: finalText, place: city }),
        }
      );



      const data = await res.json();
      if (!res.ok) throw new Error();

      setQrTripId(data.qrTripId);
    } catch {

    } finally {
      setQrLoading(false);
    }
  };





  /* ================= LOADING SCREEN ================= */


  const AttractionSection = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((place) => (
            <div key={place.id} className="group">
              <div className="flex items-start gap-4 py-4 border-b border-gray-100 group-hover:border-gray-300 transition-colors">
                <div className="text-2xl flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 mb-1 truncate">{place.name}</div>
                  {place.mapsLink && (
                    <a
                      href={place.mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors group"
                    >
                      <span>View map</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  const heroImage =
    placeImages.length > 0
      ? placeImages[0].urls.regular
      : cityInfo?.image || null;


  /* ================= RESULT ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-800 pb-32">

      {/* ================= HERO HEADER ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-8">

        {/* Back Button - Minimal */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>

        {/* Hero Content */}
        <div className="space-y-4 animate-fade-in">
          <div className="inline-block">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Your Journey
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-none">
            {city || "Your Destination"}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-500 max-w-3xl font-light leading-relaxed">
            A personalized travel plan curated just for you
          </p>
        </div>

        {/* ================= IMAGES + INFO LAYOUT ================= */}
        {city && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">

            {/* Main Image - Full Width on Mobile, 2/3 on Desktop */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl overflow-hidden bg-gray-100 min-h-[400px] relative group">
                {imageLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      <span className="text-sm text-gray-400">Loading images...</span>
                    </div>
                  </div>
                ) : heroImage ? (
                  placeImages.length > 0 ? (
                    <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[500px] p-3">
                      <img
                        src={heroImage}
                        className="col-span-2 row-span-2 w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                        alt={city}
                      />
                      {placeImages.slice(1, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img.urls.regular}
                          className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                          alt={city}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={heroImage}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      alt={city}
                    />
                  )
                ) : (
                  <div className="h-[500px] flex flex-col items-center justify-center text-gray-300">
                    <span className="text-6xl mb-4">📸</span>
                    <p className="text-sm">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Info & Guide */}
            <div className="lg:col-span-1 space-y-6">

              {/* City Info - Minimal Card */}
              {cityLoading ? (
                <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              ) : cityInfo ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                      About
                    </h2>
                    <p className="text-base leading-relaxed text-gray-600">
                      {cityInfo.description}
                    </p>
                  </div>

                  {cityInfo.wikipediaUrl && (
                    <a
                      href={cityInfo.wikipediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors group"
                    >
                      <span>Learn more</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                </div>
              ) : null}

              {/* Local Guide - Conversational */}
              {guide && (
                <div className="pt-8 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        👋
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                          Local Expert
                        </p>
                        <p className="text-lg font-semibold text-gray-900">{guide.name}</p>
                        <p className="text-sm text-gray-500 mt-1">Available to help you explore</p>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${guide.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center bg-gray-900 text-white font-medium py-3 rounded-xl text-sm hover:bg-gray-800 transition-colors"
                    >
                      Start Conversation
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ================= ITINERARY SECTION ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">

        {/* Section Header - Clean */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Itinerary
          </h2>

          {/* View Toggle + Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

            {/* View Mode Toggle */}
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              {["days", "text", "json"].map((m) => (
                <button
                  key={m}
                  onClick={() => handleViewChange(m)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${viewMode === m
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {m === "days" ? "Timeline" : m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            {/* Trip Actions - Subtle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Start date:</span>
                <input
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                />
              </div>

              <button
                onClick={() => setShowReorderModal(true)}
                className="p-2.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"
                title="Reorder Days"
              >
                <span className="text-lg">⚙️</span>
              </button>

              <button
                onClick={handleExportToGoogleCalendar}
                disabled={!startDate}
                className={`text-sm px-5 py-2.5 rounded-lg font-medium transition-all ${!startDate
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="mr-2">📆</span>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - No Heavy Box */}
        <div className="min-h-[500px]">

          {/* Typewriter Effect */}
          {isTyping && (
            <div className="py-12">
              <div className="whitespace-pre-wrap font-mono text-sm text-gray-500 leading-relaxed">
                {displayText}<span className="animate-pulse">|</span>
              </div>
            </div>
          )}

          {/* Text Mode */}
          {!isTyping && viewMode === "text" && (
            <div className="py-8">
              {isEditing ? (
                <div className="space-y-6">
                  <textarea
                    value={finalText}
                    onChange={(e) => setFinalText(e.target.value)}
                    className="w-full h-[600px] p-6 font-mono text-sm bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Done Editing
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {finalText || <TextSkeleton />}
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    Edit text →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* JSON Mode */}
          {!isTyping && viewMode === "json" && (
            <div className="py-8">
              <div className="relative">
                {jsonError && (
                  <div className="absolute top-4 right-4 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">
                    Parse error
                  </div>
                )}
                <pre className="bg-gray-900 text-gray-300 p-8 rounded-2xl overflow-auto text-xs font-mono max-h-[700px] leading-relaxed">
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Timeline Mode - The Star */}
          {!isTyping && viewMode === "days" && (
            <div className="py-8">
              {buildingDays ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                  <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 font-medium">Building your timeline...</p>
                </div>
              ) : (
                <>
                  {/* HOURS TRIP */}
                  {tripType === "hours" && (
                    <HoursItinerary
                      data={jsonData}
                      city={city}
                    />
                  )}

                  {/* ONE DAY TRIP */}
                  {tripType === "day" && (
                    <OneDayItinerary
                      data={jsonData}
                      city={city}
                      startDate={startDate}
                    />
                  )}

                  {/* MULTI DAY TRIP */}
                  {tripType === "multi" && jsonData?.days?.length > 0 && (
                    <MultiDayItinerary
                      data={jsonData}
                      city={city}
                      startDate={startDate}
                    />
                  )}
                </>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ================= SAVE TRIP - Smart Insight Style ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 relative overflow-hidden">

          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Save for Later
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Generate a QR code to access this itinerary on any device, anytime
              </p>
            </div>

            {!qrTripId ? (
              <button
                onClick={handleGenerateQR}
                disabled={!finalText || qrLoading}
                className="bg-gray-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                {qrLoading ? "Generating..." : "Generate QR Code"}
              </button>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="inline-block bg-white p-6 rounded-2xl shadow-lg">
                  <QRCodeCanvas
                    value={`${window.location.origin}/qr-trip/${qrTripId}`}
                    size={220}
                  />
                </div>

                <div className="space-y-3">
                  <a
                    href={`${window.location.origin}/qr-trip/${qrTripId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-indigo-600 font-medium hover:text-indigo-700 transition-colors break-all px-4"
                  >
                    {window.location.origin}/qr-trip/{qrTripId}
                  </a>
                  <p className="text-sm text-gray-400">Expires in 7 days</p>
                </div>

                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <span>✓</span>
                  <span>Saved successfully</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAP & ATTRACTIONS - Soft Sections ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 space-y-20">

        {/* Map Section */}
        {city && (
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Explore the Area
            </h3>
            <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <iframe
                title="city-map"
                className="w-full h-full grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                src={`https://www.google.com/maps?q=top+tourist+attractions+in+${encodeURIComponent(city)}&z=13&output=embed`}
              />
            </div>
          </div>
        )}

        {/* Attractions Section */}
        {osmData?.attractions?.length > 0 && (
          <div className="space-y-8">
            {!osmError && <AttractionSection title={`Must-See in ${city}`} items={osmData.attractions} />}
          </div>
        )}

      </div>

      {/* ================= MODAL: REORDER ================= */}
      {showReorderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-10 shadow-2xl animate-scale-in">
            <div className="space-y-2 mb-8">
              <h3 className="text-3xl font-bold text-gray-900">Reorder Days</h3>
              <p className="text-gray-500">Drag cards to rearrange your itinerary</p>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={({ active, over }) => {
                if (!over || active.id === over.id) return;
                setTempDays((items) => {
                  const oldIndex = items.findIndex((d) => d._id === active.id);
                  const newIndex = items.findIndex((d) => d._id === over.id);
                  const updated = [...items];
                  const [moved] = updated.splice(oldIndex, 1);
                  updated.splice(newIndex, 0, moved);
                  return updated;
                });
              }}
            >
              <SortableContext items={tempDays.map((day) => day._id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {tempDays.map((day) => (
                    <DraggableDayCard key={day._id} id={day._id} day={day} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowReorderModal(false)}
                className="px-8 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={savingOrder}
                onClick={() => {
                  setSavingOrder(true);
                  setTimeout(() => {
                    setJsonData((prev) => ({
                      ...prev,
                      days: tempDays.map((day, index) => ({
                        ...day,
                        day: `DAY ${index + 1}`,
                        displayDay: index + 1,
                      })),
                    }));
                    setSavingOrder(false);
                    setShowReorderModal(false);
                  }, 2000);
                }}
                className="bg-gray-900 text-white px-10 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center gap-3"
              >
                {savingOrder && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

};

export default TripResults;
