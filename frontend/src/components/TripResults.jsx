import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

import DayMap from "./DayMap";

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

  const [activeDay, setActiveDay]=useState(1)
  const itineraryScrollRef = useRef(null);

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
      className="relative flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all select-none"
    >
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
        Itinerary
      </div>

      <div className="text-xl font-bold text-gray-900 mb-2">
        Day {day.displayDay}
      </div>

      {/* ✅ DRAG HANDLE */}
      <button
        {...attributes}
        {...listeners}
        className="mt-2 px-4 py-2 text-sm font-semibold bg-gray-100 rounded-full cursor-grab active:cursor-grabbing hover:bg-gray-200"
      >
        ⠿ Drag
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


  const convertTextToJSON = (text, suggestions) => {
    if (!text) return null;

    // normalize dashes
    text = text.replace(/–|—/g, "-");

    const lines = text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const result = {
      title: "",
      preferences:
        typeof suggestions === "string"
          ? suggestions.split(",").map(s => s.trim())
          : Array.isArray(suggestions)
            ? suggestions
            : [],
       estimatedBudget: null,
      days: [],
    };

    let currentDay = null;
    let currentSection = null;

    const fallbackPeriods = ["Morning", "Afternoon", "Evening"];
    let fallbackIndex = 0;

    for (let line of lines) {
      /* ===== TITLE ===== */
      if (line.startsWith("TITLE:")) {
        result.title = line.replace("TITLE:", "").trim();
        continue;
      }

      /* ===== ESTIMATED BUDGET ===== */
      if (/^estimated budget/i.test(line)) {
        result.estimatedBudget = line
          .replace(/estimated budget[:-]*/i, "")
          .trim();
        continue;
      }


      /* ===== DAY ===== */
      if (/^day\s+\d+/i.test(line)) {
        currentDay = {
          day: line.toUpperCase(),
          sections: [],
        };
        result.days.push(currentDay);
        currentSection = null;
        fallbackIndex = 0;
        continue;
      }

      /* ===== SECTION ===== */
      if (line.startsWith("##")) {
        if (!currentDay) {
          currentDay = { day: "DAY 1", sections: [] };
          result.days.push(currentDay);
        }

        currentSection = {
          period: line.replace("##", "").trim(),
          activities: [],
        };

        currentDay.sections.push(currentSection);
        continue;
      }

      /* ===== BULLET ACTIVITY (OLD FORMAT SUPPORT) ===== */
      if (line.startsWith("-")) {
        if (!currentSection) {
          const period =
            fallbackPeriods[fallbackIndex] || `Part ${fallbackIndex + 1}`;

          currentSection = {
            period,
            activities: [],
          };

          currentDay.sections.push(currentSection);
          fallbackIndex++;
        }

        const raw = line.replace(/^-+\s*/, "").trim();

        const costMatch = raw.match(/Cost:\s*([^.]+)/i);
        const locationMatch = raw.match(/Location:\s*(.+)$/i);

        const description = raw
          .replace(/Cost:\s*[^.]+\.?/i, "")
          .replace(/Location:\s*.+$/i, "")
          .trim();

        currentSection.activities.push({
          time: null,
          description,
          cost: costMatch ? costMatch[1].trim() : null,
          location: locationMatch ? locationMatch[1].trim() : null,
          raw,
        });

        continue;
      }

      /* ===== PARAGRAPH ACTIVITY (NEW FORMAT) ===== */
      if (currentSection) {
        const costMatch = line.match(/Cost:\s*([^.]+)/i);
        const locationMatch = line.match(/Location:\s*(.+)$/i);

        const description = line
          .replace(/Cost:\s*[^.]+\.?/i, "")
          .replace(/Location:\s*.+$/i, "")
          .trim();

        currentSection.activities.push({
          time: null,
          description,
          cost: costMatch ? costMatch[1].trim() : null,
          location: locationMatch ? locationMatch[1].trim() : null,
          raw: line,
        });

        continue;
      }
    }

    return result.days.length ? result : null;
  };




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






  // const transformAIJsonToDayWise = (aiJson) => {
  //   if (!aiJson || !aiJson.days) return null;

  //   return {
  //     title: aiJson.title,
  //     preferences: aiJson.preferences || [],
  //     days: aiJson.days.map((dayObj, index) => {
  //       const activities = [];

  //       dayObj.sections.forEach(section => {
  //         section.activities.forEach(act => {
  //           activities.push(
  //             `${section.period}: ${act.description}`
  //           );
  //         });
  //       });

  //       return {
  //         day: index + 1,
  //         title: `Day ${index + 1}`,
  //         activities,
  //       };
  //     }),
  //   };
  // };

  // const transformAIJsonToHours = (aiJson) => {
  //   if (!aiJson || !aiJson.days?.length) return null;

  //   const hours = [];

  //   aiJson.days.forEach((day) => {
  //     day.sections.forEach((section) => {
  //       section.activities.forEach((act) => {
  //         hours.push(
  //           `${section.period}: ${act.description}`
  //         );
  //       });
  //     });
  //   });

  //   return {
  //     title: aiJson.title,
  //     hours,
  //   };
  // };



  /* ⬆️ END HERE ⬆️ */


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

    const parsed = convertTextToJSON(finalText, suggestions);

    if (!parsed) {
      setJsonError("Failed to create JSON");
      return;
    }

    if (mode === "json") {
      setJsonData(parsed);
      setJsonError("");
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
          `https://projectx-yzu3.onrender.com/api/guides?city=${city}`
        );

        const data = await res.json();

        if (data.available) {
          setGuide(data.guide);
        } else {
          setGuide(null);
        }
      } catch (err) {
        console.error("Failed to fetch guide");
        setGuide(null);
      } finally {

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

  useEffect(() => {
    if (!finalText) return;

    const parsed = convertTextToJSON(finalText, suggestions);

    // ❌ JSON failed → fallback immediately
    if (!parsed) {
      setViewMode("text");
      setJsonError("Failed to convert itinerary");
      return;
    }

    // ✅ JSON success → show loader first
    setBuildingDays(true);
    setViewMode("days");

    const timer = setTimeout(() => {


      setJsonData(parsed);
      setBuildingDays(false);
    }, 5000); // ⏱️ 2 seconds buffer

    return () => clearTimeout(timer);

  }, [finalText, tripType, suggestions]);



  /* ================= LOADING SCREEN ================= */


  const AttractionSection = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{title}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((place) => (
            <div key={place.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-1 bg-indigo-100 p-2 rounded-lg text-indigo-600">
                📍
              </div>
              <div>
                <div className="font-semibold text-gray-900">{place.name}</div>
                {place.mapsLink && (
                  <a
                    href={place.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-500 hover:text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    View on map ↗
                  </a>
                )}
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-800 pb-20">

      {/* ================= HERO HEADER ================= */}
      <div className="max-w-5xl mx-auto px-6 py-10 sm:py-16 space-y-6">
        <div className="animate-fade-in space-y-2">

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
          >
            ← Back
          </button>

          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold tracking-wide uppercase">
            Trip Itinerary
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            {city || "Your Destination"}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            A personalized travel plan curated just for you. Explore, eat, and enjoy {city}.
          </p>
        </div>

        {/* ================= IMAGES + WIKI GRID ================= */}
        {city && (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">

    {/* Left: Main Visuals */}
    <div className="lg:col-span-8 space-y-6">

      {/* Image Gallery */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 min-h-[300px] relative">
        {imageLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="animate-pulse">Loading visual inspiration...</span>
          </div>
        ) : heroImage ? (
          placeImages.length > 0 ? (
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-96 p-2">
              <img
                src={heroImage}
                className="col-span-2 row-span-2 w-full h-full object-cover rounded-2xl"
                alt={city}
              />
              {placeImages.slice(1, 3).map((img, i) => (
                <img
                  key={i}
                  src={img.urls.regular}
                  className="w-full h-full object-cover rounded-2xl"
                  alt={city}
                />
              ))}
            </div>
          ) : (
            <img
              src={heroImage}
              className="w-full h-96 object-cover"
              alt={city}
            />
          )
        ) : (
          <div className="h-96 flex flex-col items-center justify-center text-gray-400 p-10 text-center">
            <span className="text-4xl mb-2">📸</span>
            <p>No images available for this destination.</p>
          </div>
        )}
      </div>

    </div>

    {/* Right: Wiki / Info Card */}
    <div className="lg:col-span-4 flex flex-col gap-6">
      {cityLoading ? (
        <div className="h-full bg-gray-50 rounded-3xl animate-pulse" />
      ) : cityInfo ? (
        <div className="bg-gray-50 rounded-3xl p-6 h-full flex flex-col justify-between border border-gray-100">
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>ℹ️</span> About {city}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-6">
              {cityInfo.description}
            </p>
          </div>
          {cityInfo.wikipediaUrl && (
            <a
              href={cityInfo.wikipediaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Read on Wikipedia →
            </a>
          )}
        </div>
      ) : null}

      {/* Local Guide Teaser */}
      {guide && (
        <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-xl">👋</div>
            <div>
              <p className="text-xs font-bold text-green-800 uppercase">Local Expert</p>
              <p className="font-semibold text-green-900">{guide.name}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${guide.phone}`}
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-white text-green-700 font-medium py-2 rounded-xl text-sm shadow-sm hover:shadow-md transition"
          >
            Chat Now
          </a>
        </div>
      )}
    </div>
  </div>
)}

      </div>



      {/* ================= ITINERARY SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-12">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Itinerary</h2>

          <div className="flex bg-gray-100 p-1 rounded-full self-start sm:self-auto">
            {["days", "text", "json"].map((m) => (
              <button
                key={m}
                onClick={() => handleViewChange(m)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${viewMode === m
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {m === "days" ? "Day by Day" : m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden min-h-[400px]">

          {/* Top Actions Bar (Inside Content) */}
          <div className="border-b px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Trip Dates:</span>
              <input
                type="date"
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none text-sm font-semibold text-gray-900 focus:ring-0 p-0"
              />
              {!startDate && <span className="text-xs text-red-400">(Select to export)</span>}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReorderModal(true)}
                className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                title="Reorder Days"
              >
                <span className="sr-only">Reorder</span>
                ✏️
              </button>

              <button
                onClick={handleExportToGoogleCalendar}
                disabled={!startDate}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${!startDate ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
              >
                📆 Add to Calendar
              </button>
            </div>
          </div>

          {/* MAIN CONTENT DISPLAY */}
          <div className="p-6 sm:p-10">

            {/* Typewriter text */}
            {isTyping && (
              <div className="prose max-w-none text-gray-600">
                <div className="whitespace-pre-wrap font-mono text-sm">
                  {displayText}<span className="animate-pulse">|</span>
                </div>
              </div>
            )}

            {/* Text Mode Display */}
            {!isTyping && viewMode === "text" && (
              isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={finalText}
                    onChange={(e) => setFinalText(e.target.value)}
                    className="w-full h-[500px] p-4 font-mono text-sm bg-gray-50 rounded-xl border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      ✅ Done Editing
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                  {finalText || <TextSkeleton />}

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 text-sm text-indigo-600 hover:underline"
                  >
                    Edit raw text
                  </button>
                </div>
              )
            )}

            {/* JSON Mode Display */}
            {!isTyping && viewMode === "json" && (
              <div className="relative group">
                <div className="absolute top-2 right-2 flex gap-2">
                  {jsonError && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Error parsing JSON</span>}
                </div>
                <pre className="bg-gray-900 text-gray-300 p-6 rounded-2xl overflow-auto text-xs font-mono max-h-[600px] shadow-inner">
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
              </div>
            )}

            {/* Day Wise Mode - The Star Show */}
            {!isTyping && viewMode === "days" && (
              <div className="space-y-8">
              {buildingDays ? (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-500 font-medium">Organizing your schedule...</p>
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
    {tripType === "multi" && (
      <>
        {/* DESKTOP SPLIT VIEW */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <div
            ref={itineraryScrollRef}
            className="h-[calc(100vh-140px)] overflow-y-auto pr-4"
          >
            <MultiDayItinerary
              data={jsonData}
              city={city}
              startDate={startDate}
              onActiveDayChange={setActiveDay}
              scrollContainerRef={itineraryScrollRef}
            />
          </div>

          <div className="sticky top-28 h-[calc(100vh-140px)] rounded-3xl overflow-hidden border">
            <DayMap
              city={city}
              data={jsonData}
              day={activeDay}
            />
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden">
          <MultiDayItinerary
            data={jsonData}
            city={city}
            startDate={startDate}
          />
        </div>
      </>
    )}
  </>
)}

              </div>
            )}

          </div>

        </div>
      </div>

      {/* ================= ACTIONS & SAVE ================= */}
      <div className="max-w-3xl mx-auto px-6 mt-12 text-center space-y-8">

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-white shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Save this Trip</h3>
          <p className="text-gray-600 mb-6">Create a unique QR code to access this itinerary on your phone or share it with friends.</p>

          {!qrTripId ? (
            <button
              onClick={handleGenerateQR}
              disabled={!finalText || qrLoading}
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {qrLoading ? "Generating..." : "Generate QR Code"}
            </button>
          ) : (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white p-4 rounded-2xl shadow-sm inline-block">
                <QRCodeCanvas
                  value={`${window.location.origin}/qr-trip/${qrTripId}`}
                  size={200}
                />
              </div>
              <div>
                <a
                  href={`${window.location.origin}/qr-trip/${qrTripId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 font-medium hover:underline break-all"
                >
                  {window.location.origin}/qr-trip/{qrTripId}
                </a>
                <p className="text-xs text-gray-400 mt-2">Link expires in 7 days</p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                ✅ Trip Saved for later
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ================= EXPLORE MAP & ATTRACTIONS ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-12">

        {/* Map */}
        {city && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Map Exploration</h3>
            <div className="h-96 w-full rounded-3xl overflow-hidden shadow-sm border border-gray-200">
              <iframe
                title="city-map"
                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                src={`https://www.google.com/maps?q=top+tourist+attractions+in+${encodeURIComponent(city)}&z=13&output=embed`}
              />
            </div>
          </div>
        )}

        {/* OSM Attractions */}
        {osmData?.attractions?.length > 0 && (
          <div className="space-y-4">
            {!osmError && <AttractionSection title={`Top Sights in ${city}`} items={osmData.attractions} />}
          </div>
        )}

      </div>

      {/* ================= MODAL: REORDER ================= */}
      {showReorderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Reorder Days</h3>
            <p className="text-gray-500 mb-6">Drag and drop to rearrange your itinerary.</p>

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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {tempDays.map((day) => (
                    <DraggableDayCard key={day._id} id={day._id} day={day} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowReorderModal(false)}
                className="px-6 py-3 rounded-full text-gray-600 font-medium hover:bg-gray-100 transition"
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
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2"
              >
                {savingOrder && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />}
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

};

export default TripResults;
