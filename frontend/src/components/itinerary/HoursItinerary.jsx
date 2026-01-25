import React from "react";

const HoursItinerary = ({ data, city }) => {
  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const sections = data.days[0].sections || [];

  const transportSection = sections.find(
    s => s.period.toLowerCase() === "transportation"
  );

  const hours = sections
    .filter(s => s.period.toLowerCase() !== "transportation")
    .flatMap(section =>
      section.activities.map(act => ({
        period: section.period,
        description: act.description,
      }))
    );

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-3 sm:px-0 space-y-4">

        {city && (
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            ⏱ {city} Hourly Itinerary
          </h2>
        )}

        {hours.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 space-y-1"
          >
            <p className="text-xs font-semibold text-[#5b7c67]">
              Hour {index + 1} · {item.period}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}

        {/* 🚍 Transportation */}
        {transportSection && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
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

export default HoursItinerary;
