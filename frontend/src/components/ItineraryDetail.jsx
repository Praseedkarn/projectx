import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { detailedItineraries } from "../data/itinerary";
import { fetchItineraryBySlug } from "../services/api";




const ItineraryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  /* ===== STATE ===== */
  const [itineraryDetails, setItineraryDetails] = useState(null);

  const [selected360Place, setSelected360Place] = useState("");
  const [guide, setGuide] = useState(null);
  const [guideLoading, setGuideLoading] = useState(true);
  const [openDay, setOpenDay] = useState(1);
const [activeDay, setActiveDay] = useState(1);

useEffect(() => {
  const onScroll = () => {
    const sections = document.querySelectorAll("[data-day]");
    let current = 1;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        current = Number(section.dataset.day);
      }
    });

    setActiveDay(current);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  /* ===== LOAD ITINERARY ===== */
  useEffect(() => {
    const loadItinerary = async () => {
      try {
        const staticData = Object.values(detailedItineraries).find(
          (it) => it.slug === slug
        );


        if (staticData) {
          setItineraryDetails(staticData);
          return;
        }

        const dbData = await fetchItineraryBySlug(slug);
        setItineraryDetails(dbData);

      } catch (err) {
        console.error("Failed to load itinerary:", err);
        setItineraryDetails(null);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    loadItinerary();
  }, [slug]);

  useEffect(() => {
    if (!itineraryDetails?.location) return;

    const fetchGuide = async () => {
      try {
        const res = await fetch(
          `https://projectx-yzu3.onrender.com/api/guides?city=${itineraryDetails.location}`
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
    <section className="bg-white px-4 pt-24 pb-32">
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

         <div className="relative">
          <img
            src={itineraryDetails.image}
            className="w-full h-[380px] object-cover rounded-[36px]"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur
                          rounded-2xl px-6 py-4 shadow-lg max-w-xl">
            <h1 className="text-2xl font-semibold">
              {itineraryDetails.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {itineraryDetails.description}
            </p>
          </div>
        </div>


          {/* FACT STRIP */}
         

        </header>

        {/* ================= OVERVIEW ================= */}
        <section className="bg-white py-16 -mx-4 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-semibold">Overview</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Fact
                label="Best time"
                value={itineraryDetails.bestTime}
              />
              <Fact
                label="Duration"
                value={itineraryDetails.duration}
              />
              <Fact
                label="Difficulty"
                value={itineraryDetails.difficulty}
              />
              <Fact
                label="Budget"
                value={itineraryDetails.priceRange}
              />
            </div>
          </div>
        </section>


        {/* ================= HIGHLIGHTS ================= */}
     <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Why this trip is special</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {itineraryDetails.highlights?.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm flex gap-3"
            >
              <span className="text-[#5b7c67] text-lg"></span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {h}
              </p>
            </div>
          ))}
        </div>
      </section>


        {/* ================= 360 MAP EXPERIENCE ================= */}
        {highlight360Places.length > 0 && (
          <section className="bg-transprent py-24 -mx-4 px-4">
            <div className="max-w-6xl mx-auto space-y-12">

             
              <div className="space-y-2 text-center">
                <h2 className="text-3xl md:text-3xl font-semibold">
                   Explore on Map (360°)
                </h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto">
                  Preview the key locations from your itinerary before you go.
                </p>
              </div>


              {/* Location Selector */}
              <div className="flex flex-wrap justify-center gap-3">
                {highlight360Places.map(({ label, place }) => (
                  <button
                    key={place}
                    onClick={() => setSelected360Place(place)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${selected360Place === place
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

{/* ================= DAY WISE ITINERARY (SCROLL TIMELINE) ================= */}
<section className="bg-transparent py-16 -mx-4 px-4">
  <div className="max-w-4xl mx-auto space-y-10">

    {/* Title */}
    <div>
      <h2 className="text-4xl font-semibold">Itinerary</h2>
      <p className="text-sm text-gray-500 mt-1">
        Follow your journey day by day
      </p>
    </div>

    <div className="relative">

      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

      {safe.days.map((day) => (
        <div
          key={day.day}
          data-day={day.day}
          className="relative pl-12 pb-10"
        >

          {/* Moving Green Dot */}
          <div
            className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2
              transition-all duration-300
              ${
                activeDay === day.day
                  ? "bg-[#5b7c67] border-[#5b7c67] scale-110"
                  : "bg-white border-gray-300"
              }`}
          />

          {/* Day Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">

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

            {/* Activities */}
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              {(day.activities || []).map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#5b7c67]">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            {/* Map */}
            {day.places?.length > 1 && (
              <button
                onClick={() => openDayInMaps(day)}
                className="text-sm font-medium text-[#5b7c67] hover:text-[#4a6a58]"
              >
                🗺 View route →
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>






     <section className="space-y-6">
  <h2 className="text-2xl font-semibold">Local guide</h2>

  {guideLoading ? (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <p className="text-gray-500 text-sm">
        Checking availability…
      </p>
    </div>
  ) : guide ? (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">

      {/* Name */}
      <p className="text-lg font-semibold text-gray-800">
        {guide.name}
      </p>

      {/* Info */}
      <p className="text-sm text-gray-700 leading-relaxed">
        Verified local expert in <strong>{guide.city}</strong>.
        {guide.languages?.length > 0 && (
          <> Languages spoken: {guide.languages.join(", ")}.</>
        )}
      </p>

      {/* Action */}
      <a
        href={`https://wa.me/${guide.phone}`}
        target="_blank"
        rel="noreferrer"
        className="
          inline-flex items-center gap-2
          text-sm font-medium
          text-[#5b7c67]
          hover:text-[#4a6a58]
        "
      >
        💬 Contact on WhatsApp →
      </a>
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
      <p className="text-sm text-gray-600">
        No local guide available yet.
      </p>
      <a
        href="mailto:your@email.com"
        className="text-sm font-medium text-[#5b7c67] hover:underline"
      >
        Contact us →
      </a>
    </div>
  )}
</section>


        {/* ================= PRACTICAL INFO ================= */}
        <section className="bg-white  py-20 -mx-4 px-4">
  <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-sm text-gray-700">

    {/* INCLUDED */}
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-semibold mb-4 text-gray-800">
        Included
      </h3>
      <ul className="space-y-2">
        {safe.inclusions.map((i, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-[#5b7c67]">✓</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* NOT INCLUDED */}
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-semibold mb-4 text-gray-800">
        Not included
      </h3>
      <ul className="space-y-2">
        {safe.exclusions.map((i, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-gray-400">–</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* TRAVEL TIPS */}
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-semibold mb-4 text-gray-800">
        Travel tips
      </h3>
      <ul className="space-y-2">
        {safe.tips.map((t, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-[#5b7c67]">•</span>
            <span>{t}</span>
          </li>
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


function Fact({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-sm mt-1">
        {value || "—"}
      </div>
    </div>
  );
}
