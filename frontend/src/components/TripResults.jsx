import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
// import DayWiseItinerary from "./DayWiseItinerary";
import HoursItinerary from "./itinerary/HoursItinerary";
import OneDayItinerary from "./itinerary/OneDayItinerary";
import MultiDayItinerary from "./itinerary/MultiDayItinerary";
import API_BASE_URL from "../services/apiClient";
const TextSkeleton = ({ lines = 6 }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 rounded bg-gray-200 ${i === lines - 1 ? "w-3/4" : "w-full"
          }`}
      />
    ))}
  </div>
);


const TripResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const isDemo = location.state?.isDemo;
  const demoReason = location.state?.reason;
const tripType = location.state?.tripType || "multi";

const [placeImages, setPlaceImages] = useState([]);
const [imageLoading, setImageLoading] = useState(false);


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
          Authorization: `Client-ID S8jFr1b4DhFXDDhlt4amvJLAvqjl4apOlPzDvej5BgI`,
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
const [osmLoading, setOsmLoading] = useState(false);
const [osmError, setOsmError] = useState("");

const [viewMode, setViewMode] = useState("days"); // text | json|Days
const [jsonData, setJsonData] = useState(null);


const [jsonError, setJsonError] = useState("");


useEffect(() => {
  if (!city) return;

  setImageLoading(true);

  fetchPlaceImages(city , osmData?.attractions||[])
    .then((imgs) => setPlaceImages(imgs))
    .catch(() => setPlaceImages([]))
    .finally(() => setImageLoading(false));

}, [city , osmData]);


const convertTextToJSON = (text, suggestions) => {
  if (!text) return null;

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

    /* ===== SECTION (## Morning / ## Hour 1) ===== */
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

    /* ===== ACTIVITY ===== */
    if (line.startsWith("-")) {
      // ⛑ fallback if section is missing
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

      const match = line.match(/\[(.*?)\]\s*:\s*(.*)/);
      const raw = match?.[2] || line.replace("-", "").trim();

      const costMatch = raw.match(/Cost:\s*([^.]+)/i);
      const locationMatch = raw.match(/Location:\s*(.+)$/i);

      const description = raw
        .replace(/Cost:\s*[^.]+\.?/i, "")
        .replace(/Location:\s*.+$/i, "")
        .trim();

      currentSection.activities.push({
        time: match?.[1] || null,
        description,
        cost: costMatch ? costMatch[1].trim() : null,
        location: locationMatch ? locationMatch[1].trim() : null,
        raw,
      });
    }
  }

  return result.days.length ? result : null;
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




  /* ================= LOADING TEXT ================= */
 

  /* ================= GUIDE (STAGE 1 - MANUAL) ================= */

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
    setOsmLoading(true);
    
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
      setOsmLoading(false);
    }
  };

  fetchCityData();
}, [city]);












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
    body: JSON.stringify({ text: finalText, place:city }),
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
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
        {items.map((place) => (
          <li key={place.id}>
            <span className="font-medium text-gray-800">
              {place.name}
            </span>

            {place.mapsLink && (
              <a
                href={place.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="ml-2 text-indigo-600 underline text-xs"
              >
                View on map
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};




  /* ================= RESULT ================= */
 return (
  <div className="pt-16 sm:pt-20 px-4 animate-fade-in">
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow flex items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Your AI Travel Plan
          </h2>

          {isDemo && demoReason && (
            <p className="text-xs text-gray-500 mt-1">
              {demoReason}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isDemo && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              ⚠ Demo
            </span>
          )}
          <button onClick={() => navigate("/")}>✕</button>
        </div>
      </div>

      {/* ================= CITY INFO (WIKI) ================= */}
      {city && (
        <div className="bg-white rounded-3xl shadow p-6 space-y-4">
          {cityLoading ? (
            <p className="text-sm text-gray-500">
              Loading information about {city}…
            </p>
          ) : cityInfo ? (
            <>
              <h2 className="text-2xl font-semibold">
                About {cityInfo.title}
              </h2>

              {cityInfo.image && (
              <div className="relative">
                <img
                  src={cityInfo.image}
                  alt={cityInfo.title}
                  className="w-full max-h-64 object-cover rounded-xl"
                />

                {/* CITY TAG (LIKE CITY PAGE) */}
               <div className="absolute bottom-4 left-4
                bg-white
                rounded-full px-5 py-2
                shadow-md">
  <span className="text-sm font-medium text-gray-900">
    📍 {city}
  </span>
</div>

              </div>
            )}

              <p className="text-gray-700 leading-relaxed">
                {cityInfo.description}
              </p>

              <a
                href={cityInfo.wikipediaUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 text-sm font-medium"
              >
                Read more on Wikipedia →
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              No information found for {city}.
            </p>
          )}
        </div>
      )}

      {city && (
  <div className="bg-white rounded-3xl shadow p-6 space-y-4">
    <h2 className="text-xl font-semibold">
      📸 Views of {city}
    </h2>

    {imageLoading && (
      <p className="text-sm text-gray-500">
        Loading images…
      </p>
    )}

    {!imageLoading && placeImages.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {placeImages.map((img) => (
          <img
            key={img.id}
            src={img.urls.regular}
            alt={img.alt_description || city}
            className="rounded-xl object-cover h-40 w-full hover:scale-[1.02] transition"
            loading="lazy"
          />
        ))}
      </div>
    )}

    {!imageLoading && placeImages.length === 0 && (
  <div className="text-sm text-gray-500 text-center py-6">
    📷 No images found for <strong>{city}</strong>.<br />
    This destination may be less photographed — still worth exploring!
  </div>
)}


    <p className="text-[11px] text-gray-400">
      Images powered by Unsplash
    </p>
  </div>
)}


      {/* ================= MAP ================= */}
      {city && (
        <div className="bg-white rounded-3xl shadow p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Explore {city}
          </h3>

          <p className="text-sm text-gray-500">
            Zoom in to see famous places, attractions, and landmarks
          </p>

          <iframe
            title="city-map"
            className="w-full h-96 rounded-xl"
            loading="lazy"
            src={`https://www.google.com/maps?q=top+tourist+attractions+in+${encodeURIComponent(
              city
            )}&z=13&output=embed`}
          />
        </div>
      )}

      {/* ================= AI TEXT (DO NOT TOUCH LOGIC) ================= */}
      <div className="bg-white p-6 rounded-3xl shadow space-y-4">
        <div className="flex justify-end">
          {!isEditing ? (
            <button
              disabled={isTyping}
              onClick={() => setIsEditing(true)}
              className="bg-slate-800 text-white px-4 py-2 rounded"
            >
              ✏️ Edit
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              ✅ Save
            </button>
          )}
        </div>

       <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleViewChange("text")}
          className={`px-4 py-2 rounded ${
            viewMode === "text" ? "bg-slate-800 text-white" : "bg-gray-100"
          }`}
        >
          Text
        </button>

        <button
          onClick={() => handleViewChange("json")}
          className={`px-4 py-2 rounded ${
            viewMode === "json" ? "bg-slate-800 text-white" : "bg-gray-100"
          }`}
        >
          JSON
        </button>

        <button
          onClick={() => handleViewChange("days")}
          className={`px-4 py-2 rounded ${
            viewMode === "days" ? "bg-slate-800 text-white" : "bg-gray-100"
          }`}
        >
          Day-wise
        </button>
      </div>



        <div
          className="
            sm:bg-slate-50 sm:rounded-xl sm:p-5
            text-[15px] sm:text-base leading-7
            whitespace-pre-wrap break-words text-gray-800
          "
        >
          {isTyping && displayText === "" && (
            <TextSkeleton lines={6} />
          )}

          {isTyping && displayText !== "" && (
            <div>
              {displayText}
              <span className="ml-1 animate-pulse">▍</span>
            </div>
          )}

         {!isTyping && !isEditing && viewMode === "text" && finalText && (
  <div>{finalText}</div>
)}

{!isTyping && viewMode === "json" && (
  <pre className="bg-black text-green-400 text-xs p-4 rounded-xl overflow-auto">
    {jsonError
      ? jsonError
      : JSON.stringify(jsonData, null, 2)}
  </pre>
)}

{/* ⏳ Day-wise loading buffer */}
{viewMode === "days" && buildingDays && (
  <div className="py-12 text-center space-y-3 animate-fade-in">
    <div className="w-10 h-10 mx-auto rounded-full border-4 border-[#5b7c67] border-t-transparent animate-spin" />
    <p className="text-sm text-gray-500">
      Building your itinerary…
    </p>
  </div>
)}

{viewMode === "days" && tripType === "multi" && (
  <MultiDayItinerary data={jsonData} city={city}/>
)}

{viewMode === "days" && tripType === "day" && (
  <OneDayItinerary data={jsonData}  city={city}/>
)}

{viewMode === "days" && tripType === "hours" && (
  <HoursItinerary data={jsonData} city={city}/>
)}






        </div>

        {isEditing && (
          <textarea
            value={finalText}
            onChange={(e) => setFinalText(e.target.value)}
            className="w-full min-h-[300px] border rounded-xl p-4"
          />
        )}
      </div>

      {!isEditing && finalText && (
  <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-2 text-xs text-indigo-700">
    ℹ️ Generating the QR will <strong>save</strong> this trip and make it
    <strong> shareable & downloadable</strong>.
  </div>
)}


      {/* ================= QR ================= */}
      <button
        onClick={handleGenerateQR}
        disabled={!finalText || isEditing || qrLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {qrLoading ? "Generating QR..." : "📱 Generate QR"}
      </button>

      {qrTripId && (
        <div className="flex flex-col items-center gap-3">
          <QRCodeCanvas
            value={`${window.location.origin}/qr-trip/${qrTripId}`}
            size={220}
          />

          <a
            href={`${window.location.origin}/qr-trip/${qrTripId}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-600 underline break-all"
          >
            {window.location.origin}/qr-trip/{qrTripId}
          </a>

        <p className="text-xs text-gray-500 text-center">
          ⏳ Expires in <strong>7 days</strong> · This itinerary is safely saved in
          <strong> Saved Trips</strong>
        </p>
        </div>
      )}

      {qrTripId && (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm">
          <p className="font-medium text-gray-800">
            Trip saved successfully
          </p>
          <p className="text-xs text-gray-600">
            Available in <strong>Saved Trips</strong>
          </p>
        </div>
      )}

      {/* ================= OSM ATTRACTIONS ================= */}
      {city && (
        <div className="bg-white rounded-3xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            📍 Things to Explore in {city}
          </h2>

          {osmLoading && (
            <p className="text-sm text-gray-500">
              Finding attractions…
            </p>
          )}

          {!osmLoading && osmError && (
            <p className="text-sm text-red-500">{osmError}</p>
          )}

          {!osmLoading && osmData?.attractions?.length > 0 && (
            <AttractionSection
              title="🏛️ Tourist Attractions"
              items={osmData.attractions}
            />
          )}

          {!osmLoading &&
            osmData &&
            osmData.attractions?.length === 0 && (
              <p className="text-sm text-gray-500">
                Showing limited attractions for {city}.
              </p>
            )}
        </div>
      )}

      {/* ================= LOCAL GUIDE ================= */}
      <div>
        {city && guide ? (
          <div className="bg-green-50 border border-green-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              Local Guide Available in {city}
            </h3>

            <p className="mt-2 text-gray-600">
              Explore {city} with a verified local expert.
            </p>

            <p className="text-sm mt-3">
              <strong>Name:</strong> {guide.name}
            </p>
            <p className="text-sm">
              <strong>Languages:</strong> {guide.languages}
            </p>

            <a
              href={`https://wa.me/${guide.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 rounded-full bg-green-600 px-6 py-3 text-white"
            >
              💬 Contact Guide
            </a>
          </div>
        ) : city ? (
          <div className="bg-gray-50 border rounded-3xl p-6 text-center">
            <h3 className="text-lg font-semibold">
              No Local Guide Available Yet
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Want a local expert for {city}?
            </p>
          </div>
        ) : null}
      </div>

    </div>
  </div>
);

};

export default TripResults;
