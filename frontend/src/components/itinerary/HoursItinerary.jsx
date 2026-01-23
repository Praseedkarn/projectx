import React from "react";

const HoursItinerary = ({ data, city }) => {
  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  // Flatten DAY 1 into hours
  const hours = data.days[0].sections.flatMap(section =>
    (section.activities || []).map(act => ({
      period: section.period,
      ...act,
    }))
  );

  if (!hours.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto space-y-4">

        {city && (
          <h2 className="text-2xl font-semibold text-gray-800">
            ⏱ {city} Hourly Itinerary
          </h2>
        )}

        {hours.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white border rounded-xl p-5"
          >
            <div className="text-sm font-semibold text-[#5b7c67] whitespace-nowrap">
              Hour {index + 1}
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">{item.period}:</span>{" "}
                {item.description}
              </p>

              {(item.cost || item.location) && (
                <p className="text-xs text-gray-500">
                  {item.cost && <>💰 {item.cost}</>}
                  {item.cost && item.location && " · "}
                  {item.location && <>📍 {item.location}</>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoursItinerary;
