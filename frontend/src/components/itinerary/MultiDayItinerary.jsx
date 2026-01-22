import React, { useEffect, useState } from "react";

const MultiDayItinerary = ({ data }) => {
  const [activeDay, setActiveDay] = useState(1);

  /* ===== SCROLL TRACKING ===== */
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("[data-day]");
      let current = 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          current = Number(section.dataset.day);
        }
      });

      setActiveDay(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== SAFE RETURN ===== */
  if (!data?.days?.length) {
    return (
      <p className="text-sm text-gray-500">
        No itinerary available
      </p>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto space-y-12 relative">

        {/* Vertical timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

        {data.days.map((day) => {
          const sections = {
            Morning: [],
            Afternoon: [],
            Evening: [],
          };

          (day.activities || []).forEach((a) => {
            if (a.startsWith("Morning")) sections.Morning.push(a);
            else if (a.startsWith("Afternoon")) sections.Afternoon.push(a);
            else if (a.startsWith("Evening")) sections.Evening.push(a);
          });

          return (
            <div
              key={day.day}
              data-day={day.day}
              className="relative pl-12 pb-10"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2
                  transition-all duration-300
                  ${
                    activeDay === day.day
                      ? "bg-[#5b7c67] border-[#5b7c67] scale-110"
                      : "bg-white border-gray-300"
                  }`}
              />

              {/* Day card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">

                <h3 className="text-xl font-semibold text-gray-800">
                  Day {day.day}
                </h3>

                {/* Morning / Afternoon / Evening cards */}
                {Object.entries(sections).map(
                  ([period, items]) =>
                    items.length > 0 && (
                      <div
                        key={period}
                        className="rounded-xl border border-gray-100 bg-slate-50 p-4 space-y-2"
                      >
                        <h4 className="text-sm font-semibold text-[#5b7c67] uppercase tracking-wide">
                          {period}
                        </h4>

                        {items.map((text, i) => (
                          <p
                            key={i}
                            className="text-sm text-gray-700 leading-relaxed"
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    )
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MultiDayItinerary;
