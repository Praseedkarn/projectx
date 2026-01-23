import React, { useEffect, useState } from "react";

const PERIOD_STYLES = {
  Morning: "bg-yellow-400",
  Afternoon: "bg-blue-400",
  Evening: "bg-purple-400",
};

const MultiDayItinerary = ({ data, city }) => {
  const [activeDay, setActiveDay] = useState(1);

  /* ===== SCROLL TRACKING ===== */
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("[data-day]");
      let current = 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55) {
          current = Number(section.dataset.day);
        }
      });

      setActiveDay(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto relative px-3 sm:px-0 space-y-12">

        {city && (
          <h2 className="text-2xl font-semibold text-gray-800">
            📍 {city} Itinerary
          </h2>
        )}

        {/* Vertical timeline */}
        <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-px bg-gray-200" />

        {data.days.map((day, index) => (
          <div
            key={index}
            data-day={index + 1}
            className="relative pl-10 sm:pl-14"
          >
            {/* Day dot */}
            <div
              className={`absolute left-[14px] sm:left-[22px] top-6 w-3 h-3 rounded-full transition-all
                ${
                  activeDay === index + 1
                    ? "bg-[#5b7c67] scale-125"
                    : "bg-gray-300"
                }`}
            />

            {/* Day card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Day {index + 1}
              </h3>

              {/* Sections */}
              {(day.sections || []).map((section, sIdx) => (

                <div key={sIdx} className="space-y-3">
                  {/* Section header */}
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${PERIOD_STYLES[section.period]}`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${PERIOD_STYLES[section.period]}`}
                      />
                    </span>

                    <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {section.period}
                    </h4>
                  </div>

                  {/* Activities */}
                  <div className="space-y-3 pl-5 border-l border-gray-100">
                    {section.activities.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className="text-sm text-gray-700 leading-relaxed space-y-1"
                      >
                        <p>{act.description}</p>

                        {(act.cost || act.location) && (
                          <p className="text-xs text-gray-500">
                            {act.cost && <span>💰 {act.cost}</span>}
                            {act.cost && act.location && " · "}
                            {act.location && <span>📍 {act.location}</span>}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultiDayItinerary;
