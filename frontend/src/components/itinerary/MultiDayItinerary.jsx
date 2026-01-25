import React, { useEffect, useState } from "react";

const PERIOD_STYLES = {
  Morning: "bg-yellow-400",
  Afternoon: "bg-blue-400",
  Evening: "bg-purple-400",
};

const MultiDayItinerary = ({ data, city }) => {
  const [activeDay, setActiveDay] = useState(1);

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

  // 🚍 collect transport ONCE
  const transportSection = data.days
    .flatMap((d) => d.sections || [])
    .find((s) => s.period.toLowerCase() === "transportation");

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto relative px-4 sm:px-0 space-y-10">

        {city && (
          <h2 className="text-2xl font-semibold text-gray-800">
            📍 {city} Itinerary
          </h2>
        )}

        {/* 🔴 TIMELINE LINE (single source of truth) */}
        <div
          className="
            absolute 
            left-[16px] sm:left-[28px]
            top-24 bottom-40 
            w-px bg-gray-200
          "
        />

        {data.days.map((day, index) => {
          const normalSections = (day.sections || []).filter(
            (s) => s.period.toLowerCase() !== "transportation"
          );

          return (
            <div
              key={index}
              data-day={index + 1}
              className="relative pl-10 sm:pl-16"
            >
              {/* 🟢 DOT — EXACTLY ON THE LINE */}
              <span
                className={`
                  absolute 
                  left-[12px] sm:left-[24px]
                  top-7
                  w-3 h-3 rounded-full
                  transition-all
                  ${
                    activeDay === index + 1
                      ? "bg-[#5b7c67] scale-125"
                      : "bg-gray-300"
                  }
                `}
              />

              {/* DAY CARD */}
              <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-6 space-y-5 shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Day {index + 1}
                </h3>

                {normalSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
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
                    <div className="space-y-3 pl-3 sm:pl-5 border-l border-gray-100">
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
          );
        })}

        {/* 🚍 TRANSPORT (OUTSIDE TIMELINE) */}
        {transportSection && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
              🚍 Transportation
            </h3>

            {transportSection.activities.map((act, i) => (
              <p
                key={i}
                className="mt-3 text-sm text-blue-700 leading-relaxed"
              >
                {act.description}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MultiDayItinerary;
