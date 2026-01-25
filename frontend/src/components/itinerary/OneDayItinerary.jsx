import React from "react";

const OneDayItinerary = ({ data, city }) => {
  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const day = data.days[0];

  const transportSection = day.sections?.find(
    s => s.period.toLowerCase() === "transportation"
  );

  const normalSections = day.sections?.filter(
    s => s.period.toLowerCase() !== "transportation"
  );

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-3 sm:px-0 space-y-6 relative">

        {city && (
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            📍 {city} One-Day Itinerary
          </h2>
        )}

        {/* Timeline line */}
        <div className="absolute left-3 sm:left-5 top-16 bottom-0 w-px bg-gray-200" />

        <div className="space-y-8">
          {normalSections.map((section, idx) => (
            <div key={idx} className="relative pl-10 sm:pl-14">

              {/* Green dot */}
              <span className="absolute left-[10px] sm:left-[18px] top-2 w-3 h-3 rounded-full bg-[#5b7c67]" />

              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#5b7c67]">
                {section.period}
              </h4>

              <div className="mt-3 space-y-3">
                {section.activities.map((act, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">
                    {act.description}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 🚍 Transportation (NO TIMELINE) */}
        {transportSection && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h4 className="font-semibold text-blue-800">🚍 Transportation</h4>
            {transportSection.activities.map((act, i) => (
              <p key={i} className="mt-2 text-sm text-blue-700">
                {act.description}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OneDayItinerary;
