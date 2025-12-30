import React, { useState, useEffect } from "react";
import { detailedItineraries } from "../data/itinerary";

const ItineraryDetail = ({ itineraryId, onBack }) => {
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const detail = detailedItineraries[itineraryId];
    setItineraryDetails(detail || null);
    window.scrollTo(0, 0);
  }, [itineraryId]);

  /* ===== GOOGLE MAPS ROUTE ===== */
  const openDayInMaps = (day) => {
    if (!day?.places || day.places.length < 2) {
      alert("Not enough places to create a route");
      return;
    }

    const origin = day.places[0];
    const destination = day.places[day.places.length - 1];
    const waypoints =
      day.places.length > 2 ? day.places.slice(1, -1).join("|") : "";

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${encodeURIComponent(origin)}` +
      `&destination=${encodeURIComponent(destination)}` +
      (waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : "") +
      `&travelmode=driving`;

    window.open(url, "_blank");
  };

  if (!itineraryDetails) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        <p className="mb-4">Itinerary not found</p>
        <button
          onClick={onBack}
          className="rounded-full border px-6 py-2 hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>
    );
  }
// ===== BUILD MAP WITH ALL LOCATIONS =====
          const mapLocations =  Array.from(
            new Set(
              itineraryDetails?.days?.flatMap((day) => day.places || []) || []
            )
          );
          const mapQuery = mapLocations.join(" | ");
          const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;


  return (
    <section className="bg-[#fdfcf7] px-4 pt-24 pb-24">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ===== HEADER / HERO ===== */}
        <div className="bg-white rounded-[32px] shadow-lg p-8 md:p-10 space-y-6">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to All Itineraries
          </button>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {itineraryDetails.title}
            </h1>
            <p className="text-gray-600">
              {itineraryDetails.description}
            </p>
          </div>

          {itineraryDetails.image && (
            <img
              src={itineraryDetails.image}
              alt={itineraryDetails.title}
              className="w-full rounded-2xl max-h-[420px] object-cover"
            />
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>📍 {itineraryDetails.location}</span>
            <span>⏳ {itineraryDetails.duration}</span>
            <span>⚡ {itineraryDetails.difficulty}</span>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["overview", "itinerary", "practical", "budget"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
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
          <div className="bg-white rounded-[32px] shadow-lg p-8 md:p-10 space-y-10
           animate-[fadeUp_0.5s_ease-out]">
            {/* <h3 className="text-lg font-semibold">Highlights</h3> */}
            {/* ===== LOCATIONS COVERED ===== */}
              <div className="pt-4">
                {/* ===== MAP PINPOINTS ===== */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Trip Flow
                  </h3>

                  {/* <div className="w-full h-[360px] rounded-2xl overflow-hidden border">
                    <iframe
                      title="Trip locations map"
                      src={mapUrl}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div> */}

                  {/* <p className="mt-2 text-xs text-gray-500">
                    All major places in this itinerary are marked on the map.
                  </p> */}
                </div>

                            <div className="space-y-4">
                    {itineraryDetails.days.map((day, idx) => (
                      <div
                        key={day.day}
                        style={{ animationDelay: `${idx * 80}ms` }}
                        className="flex gap-4 items-start
                                  animate-[fadeLeft_0.4s_ease-out_forwards]
                                  opacity-0"
                      >

            
                      <div className="shrink-0">
                        <span className="inline-flex items-center justify-center
                                        h-8 w-8 rounded-full
                                        bg-[#5b7c67]/10
                                        text-[#5b7c67]
                                        text-sm font-semibold">
                          {day.day}
                        </span>
                      </div>

                      {/* PLACES */}
                      <div className="text-gray-600 leading-relaxed">
                        <span className="font-medium text-gray-800">
                          Day {day.day}:
                        </span>{" "}
                        {day.places.join(" → ")}
                      </div>
                    </div>
                  ))}
                </div>


                {/* <h3 className="text-lg font-semibold mb-3">
                  📍 Places Covered
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm">
                  {mapLocations.map((place, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{place}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
                  <div className="border-t border-gray-100" />
                  <h3 className="text-lg font-semibold text-gray-800">
                      ✨ Highlights
                    </h3>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3
                     text-gray-600 text-sm">
                    {itineraryDetails.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="mt-1 text-[#5b7c67]">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                              </ul>
                </div>
              )}

        {/* ===== DAILY ITINERARY ===== */}
        {activeTab === "itinerary" && (
          <div className="space-y-8">

            {/* DAY SELECTOR */}
            <div className="flex flex-wrap gap-3">
              {itineraryDetails.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`px-4 py-2 rounded-full text-sm
                    ${
                      selectedDay === d.day
                        ? "bg-[#5b7c67] text-white"
                        : "bg-white border hover:bg-gray-50"
                    }`}
                >
                  Day {d.day}
                </button>
              ))}
            </div>

            {/* DAY DETAILS */}
            {itineraryDetails.days
              .filter((d) => d.day === selectedDay)
              .map((day) => (
                <div
                  key={day.day}
                  className="bg-white rounded-[32px] shadow-lg p-8 space-y-4"
                >
                  <h3 className="text-lg font-semibold">{day.title}</h3>

                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {day.activities.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  <p><strong>🏨 Accommodation:</strong> {day.accommodation}</p>
                  <p><strong>🍽 Meals:</strong> {day.meals}</p>

                  {day.places && day.places.length > 1 && (
                    <button
                      onClick={() => openDayInMaps(day)}
                      className="mt-4 inline-flex items-center gap-2
                                 rounded-full bg-[#5b7c67]
                                 px-5 py-2 text-white text-sm
                                 hover:bg-[#4a6a58]"
                    >
                      🗺 Open Route in Google Maps
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* ===== PRACTICAL INFO ===== */}
        {activeTab === "practical" && (
          <div className="bg-white rounded-[32px] shadow-lg p-8 space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Inclusions</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {itineraryDetails.inclusions.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Exclusions</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {itineraryDetails.exclusions.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Travel Tips</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
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
            <h3 className="font-semibold mb-4">Budget Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(itineraryDetails.budget).map(
                    ([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-2 font-medium">
                          {key.toUpperCase()}
                        </td>
                        <td className="py-2 text-right">{value}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ItineraryDetail;
