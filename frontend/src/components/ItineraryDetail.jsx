import React, { useState, useEffect } from "react";
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

const ItineraryDetail = ({ itineraryId, onBack }) => {
  /* ===== STATE ===== */
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDay, setSelectedDay] = useState(1);
  const [selected360Place, setSelected360Place] = useState("");

  /* ===== LOAD ITINERARY ===== */
useEffect(() => {
  const loadItinerary = async () => {
    try {
      const staticData = Object.values(detailedItineraries).find(
  (it) => it.citySlug === itineraryId
);

      if (staticData) {
        setItineraryDetails(staticData);
      } else {
        const dbData = await fetchItineraryBySlug(itineraryId);
        setItineraryDetails(dbData);
      }
    } catch (err) {
      console.error("Failed to load itinerary:", err);
      setItineraryDetails(null);
    }

    setActiveTab("overview");
    setSelectedDay(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  loadItinerary();
}, [itineraryId]);


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
        <button onClick={onBack} className="rounded-full border px-6 py-2">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <section className="bg-[#fdfcf7] px-4 pt-24 pb-24">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ===== HERO / GUIDE HEADER ===== */}
        <div className="bg-white rounded-[32px] shadow-lg p-8 space-y-6 relative">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-sm text-gray-600 hover:underline"
          >
            ← Back
          </button>

          <p className="text-xs uppercase tracking-widest text-gray-500 pt-6">
            Your Complete Travel Guide
          </p>

          <h1 className="text-3xl font-semibold">
            {itineraryDetails.title}
          </h1>

          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {itineraryDetails.description}
          </p>

          <img
            src={itineraryDetails.image}
            alt={itineraryDetails.title}
            className="w-full rounded-2xl max-h-[420px] object-cover"
          />

          {/* FACT BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>📍 <strong>Location</strong><br />{itineraryDetails.location}</div>
            <div>⏳ <strong>Duration</strong><br />{itineraryDetails.duration}</div>
            <div>⚡ <strong>Difficulty</strong><br />{itineraryDetails.difficulty}</div>
            <div>💰 <strong>Budget</strong><br />{itineraryDetails.priceRange}</div>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["overview", "itinerary", "practical", "budget"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                activeTab === tab
                  ? "bg-[#5b7c67] text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-[32px] shadow-lg p-8 space-y-10">

            {/* BEST TIME */}
            <div className="bg-[#f7f9f7] rounded-2xl p-5">
              <h3 className="font-semibold mb-2">🌤 Best Time to Visit</h3>
              <p className="text-sm text-gray-600">
                {itineraryDetails.bestTime}
              </p>
            </div>

            {/* 360 */}
            {highlight360Places.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  🌍 Experience the Destination
                </h3>
                <p className="text-sm text-gray-600 max-w-2xl">
                  Explore key landmarks included in this itinerary through immersive 360° views.
                </p>

                <div className="flex flex-wrap gap-3">
                  {highlight360Places.map(({ label, place }) => (
                    <button
                      key={place}
                      onClick={() => setSelected360Place(place)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all
                        ${
                          selected360Place === place
                            ? "bg-[#5b7c67] text-white shadow-md scale-105"
                            : "bg-white border hover:bg-gray-50 hover:scale-105"
                        }`}
                    >
                      📍 {label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl overflow-hidden border shadow-sm">
                  <div className="bg-[#f7f9f7] px-4 py-2 text-sm font-medium text-gray-700">
                    🌍 {selected360Place}
                  </div>
                  <StreetView360 place={selected360Place} />
                </div>
              </div>
            )}

            {/* HIGHLIGHTS */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                ✨ Why Visit This Destination
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                {itineraryDetails.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#5b7c67]">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===== ITINERARY ===== */}
        {activeTab === "itinerary" && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {itineraryDetails.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedDay === d.day
                      ? "bg-[#5b7c67] text-white"
                      : "bg-white border hover:bg-gray-50"
                  }`}
                >
                  Day {d.day}
                </button>
              ))}
            </div>

            {itineraryDetails.days
              .filter((d) => d.day === selectedDay)
              .map((day) => (
                <div
                  key={day.day}
                  className="bg-white rounded-[32px] shadow-lg p-8 space-y-4"
                >
                  <h3 className="text-lg font-semibold">
                    Day {day.day}: {day.title}
                  </h3>

                  <ul className="list-disc pl-5 text-gray-600">
                    {day.activities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  <p><strong>🏨 Accommodation:</strong> {day.accommodation}</p>
                  <p><strong>🍽 Meals:</strong> {day.meals}</p>

                  <button
                    onClick={() => openDayInMaps(day)}
                    className="mt-4 rounded-full bg-[#5b7c67] px-5 py-2 text-white text-sm"
                  >
                    🗺 Open Route in Google Maps
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* ===== PRACTICAL ===== */}
        {activeTab === "practical" && (
          <div className="bg-white rounded-[32px] shadow-lg p-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">✔ What’s Included</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {itineraryDetails.inclusions.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">✖ What’s Not Included</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {itineraryDetails.exclusions.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">💡 Travel Tips</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {itineraryDetails.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===== BUDGET ===== */}
        {activeTab === "budget" && (
          <div className="bg-white rounded-[32px] shadow-lg p-8">
            <h3 className="text-lg font-semibold mb-6">
              💰 Estimated Trip Cost
            </h3>

            {Object.entries(itineraryDetails.budget).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span className="font-medium">{k.toUpperCase()}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItineraryDetail;
