import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { detailedItineraries } from "../data/itinerary";
import { fetchItineraryBySlug } from "../services/api";


/* ===== 360 STREET VIEW (NO API KEY) ===== */
const StreetView360 = ({ place }) => {
  if (!place) return null;

  return (
    <div className="w-full h-[320px] rounded-2xl overflow-hidden border">
      <iframe
        title={`360 view of ${place}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          place
        )}&output=svembed`}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

const ItineraryDetail = () => {
  const { slug } = useParams();
  const navigate=useNavigate();
  /* ===== STATE ===== */
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selected360Place, setSelected360Place] = useState("");
  const [guide, setGuide] = useState(null);
  const [guideLoading, setGuideLoading] = useState(true);
  const [openDay, setOpenDay] = useState(1);

  /* ===== LOAD ITINERARY ===== */
useEffect(() => {
  const loadItinerary = async () => {
    try {
      const staticData = Object.values(detailedItineraries).find(
        (it) => it.citySlug === slug
      );


      if (staticData) {
        setItineraryDetails(staticData);
      } else {
        const dbData = await fetchItineraryBySlug(slug);
        setItineraryDetails(dbData);
      }
    } catch (err) {
      console.error("Failed to load itinerary:", err);
      setItineraryDetails(null);
    }

    setSelectedDay(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  loadItinerary();
}, [slug]);

useEffect(() => {
  if (!itineraryDetails?.location) return;

  const fetchGuide = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/guides?city=${itineraryDetails.location}`
      );
      const data = await res.json();
      setGuide(data?.guide || null);
    } catch {
      setGuide(null);
    } finally {
      setGuideLoading(false);
    }
  };

  fetchGuide();
}, [itineraryDetails]);



  /* ===== 360 PLACES ===== */
 const highlight360Places =
  itineraryDetails?.highlight360Views ||
  (() => {
    const unique = {};
    (itineraryDetails?.days || []).forEach((day) => {
      (day.places || []).forEach((p) => {
        if (!unique[p]) {
          unique[p] = {
            label: p.split(",")[0],
            place: p,
          };
        }
      });
    });
    return Object.values(unique).slice(0, 6);
  })();



  /* ===== DEFAULT 360 ===== */
  useEffect(() => {
    if (highlight360Places.length > 0) {
      setSelected360Place(highlight360Places[0].place);
    }
  }, [highlight360Places]);

  /* ===== MAP ROUTE ===== */
  const openDayInMaps = (day) => {
    if (!day?.places || day.places.length < 2) return;

    const origin = day.places[0];
    const destination = day.places[day.places.length - 1];
    const waypoints =
      day.places.length > 2 ? day.places.slice(1, -1).join("|") : "";

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${encodeURIComponent(origin)}` +
      `&destination=${encodeURIComponent(destination)}` +
      (waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : "");

    window.open(url, "_blank");
  };

  /* ===== LOADING ===== */
  if (!itineraryDetails) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border px-6 py-2"
        >
          ← Back
        </button>

      </div>
    );
  }

  const safe = {
  highlights: [],
  highlight360Views: [],
  days: [],
  inclusions: [],
  exclusions: [],
  tips: [],
  budget: {},
  ...itineraryDetails,
};



 return (
  <section className="bg-[#f4f6f4] px-4 pt-24 pb-32">
    <div className="max-w-5xl mx-auto space-y-24">

      {/* ================= HERO ================= */}
      <header className="space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back
        </button>

        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
          Complete Travel Guide
        </p>

        <h1 className="text-4xl font-semibold leading-tight">
          {itineraryDetails.title}
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {itineraryDetails.description}
        </p>

        <img
          src={itineraryDetails.image}
          alt={itineraryDetails.title}
          className="w-full rounded-3xl max-h-[480px] object-cover"
        />

        {/* FACT STRIP */}
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-gray-600 pt-6">
          <p><strong>📍 Location:</strong> {itineraryDetails.location}</p>
          <p><strong>⏳ Duration:</strong> {itineraryDetails.duration}</p>
          <p><strong>⚡ Difficulty:</strong> {itineraryDetails.difficulty}</p>
          <p><strong>💰 Budget:</strong> {itineraryDetails.priceRange}</p>
        </div>
      </header>

      {/* ================= OVERVIEW ================= */}
      <section className="bg-[#fdfcf7] py-16 -mx-4 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-2xl font-semibold">Overview</h2>

          <div className="grid sm:grid-cols-2 gap-8 text-gray-600">
            <p>
              <strong className="text-gray-800">Best time to visit:</strong><br />
              {itineraryDetails.bestTime}
            </p>
            <p>
              <strong className="text-gray-800">Expected budget:</strong><br />
              {itineraryDetails.priceRange}
            </p>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Why this trip is special</h2>

        <ul className="grid sm:grid-cols-2 gap-4 text-gray-600">
          {itineraryDetails.highlights?.map((h, i) => (
            <li key={i} className="leading-relaxed">
              • {h}
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 360 EXPERIENCE (MAP STAYS) ================= */}
      {/* ================= 360 MAP EXPERIENCE ================= */}
{highlight360Places.length > 0 && (
  <section className="bg-[#eef3f0] py-24 -mx-4 px-4">
    <div className="max-w-6xl mx-auto space-y-12">

      {/* Section Header */}
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
          Explore in 360°
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Experience the destination
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take a virtual look at the key places included in your itinerary.
        </p>
      </div>

      {/* Location Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {highlight360Places.map(({ label, place }) => (
          <button
            key={place}
            onClick={() => setSelected360Place(place)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${
                selected360Place === place
                  ? "bg-[#5b7c67] text-white"
                  : "bg-white text-[#5b7c67] hover:bg-[#5b7c67]/10"
              }`}
          >
            📍 {label}
          </button>
        ))}
      </div>

      {/* Big Immersive Map */}
      <div className="relative rounded-[36px] overflow-hidden
                      shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

        {/* Soft gradient overlay */}
        <div className="pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-black/20 via-transparent to-transparent z-10" />

        <iframe
          title={`360 view of ${selected360Place}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            selected360Place
          )}&output=svembed`}
          className="w-full h-[420px] md:h-[600px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  </section>
)}

  {/* ================= DAY WISE ITINERARY (CLEAN ACCORDION) ================= */}
<section className="bg-transprent py-16 -mx-4 px-4">
  <div className="max-w-4xl mx-auto space-y-8">

    {/* Section Title */}
    <div>
      <h2 className="text-4xl font-semibold">Itinerary</h2>
      <p className="text-sm text-gray-500 mt-1">
        Day-wise plan for your journey
      </p>
    </div>

    {safe.days.map((day) => {
      const isOpen = openDay === day.day;

      return (
        <div
          key={day.day}
          className="rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* ===== Day Header ===== */}
          <button
            onClick={() => setOpenDay(isOpen ? null : day.day)}
            className="w-full flex items-center justify-between
                       px-5 py-4 bg-gray-50 hover:bg-gray-100
                       transition text-left"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Day {day.day}
              </p>
              {day.title && (
                <p className="text-sm text-gray-500">
                  {day.title}
                </p>
              )}
            </div>

            <span
              className={`text-2xl font-light transition-transform
                ${isOpen ? "rotate-180" : ""}`}
            >
              ⌄
            </span>
          </button>

          {/* ===== Day Content ===== */}
          {isOpen && (
            <div className="px-5 py-5 space-y-4 bg-white">

              {/* Activities */}
              {(day.activities || []).length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  {day.activities.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#5b7c67]">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No activities planned for this day.
                </p>
              )}

              {/* Map Button */}
              {day.places?.length > 1 && (
                <div>
                  <button
                    onClick={() => openDayInMaps(day)}
                    className="inline-flex items-center gap-2
                               text-sm font-medium
                               text-[#5b7c67]
                               hover:text-[#4a6a58]"
                  >
                    🗺 View route on Google Maps
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}

  </div>
</section>


    

      {/* ================= LOCAL GUIDE ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Local guide</h2>

        {guideLoading ? (
          <p className="text-gray-500 text-sm">Checking availability…</p>
        ) : guide ? (
          <p className="text-gray-700 leading-relaxed">
            <strong>{guide.name}</strong> is a verified local expert in{" "}
            {guide.city}.  
            {guide.languages?.length > 0 && (
              <> Languages spoken: {guide.languages.join(", ")}.</>
            )}{" "}
            <a
              href={`https://wa.me/${guide.phone}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#5b7c67] hover:underline ml-1"
            >
              Contact on WhatsApp →
            </a>
          </p>
        ) : (
          <p className="text-gray-600">
            No local guide available yet.  
            <a href="mailto:your@email.com" className="text-[#5b7c67] hover:underline ml-1">
              Contact us
            </a>
          </p>
        )}
      </section>

      {/* ================= PRACTICAL INFO ================= */}
      <section className="bg-[#fdfcf7] py-20 -mx-4 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-12 text-sm text-gray-700">

          <div>
            <h3 className="font-semibold mb-4">Included</h3>
            <ul className="space-y-2">
              {safe.inclusions.map((i, idx) => (
                <li key={idx}>✓ {i}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Not included</h3>
            <ul className="space-y-2">
              {safe.exclusions.map((i, idx) => (
                <li key={idx}>– {i}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Travel tips</h3>
            <ul className="space-y-2">
              {safe.tips.map((t, idx) => (
                <li key={idx}>• {t}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ================= BUDGET ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Budget breakdown</h2>

        <div className="space-y-3 text-sm text-gray-700">
          {Object.entries(safe.budget).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="capitalize">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  </section>
);


};

export default ItineraryDetail;
