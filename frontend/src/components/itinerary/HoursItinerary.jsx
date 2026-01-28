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
        location: act.location,
      }))
    );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      {city && (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="text-2xl">⏳</span>
          <h2 className="text-xl font-bold text-gray-900">
            Hourly Plan for {city}
          </h2>
        </div>
      )}

      {/* Grid of Hours */}
      <div className="grid gap-4 sm:grid-cols-1">
        {hours.map((item, index) => (
          <div
            key={index}
            className="group flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
          >
            {/* Time Marker */}
            <div className="flex-shrink-0 w-16 text-right">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Hour
              </span>
              <div className="text-2xl font-bold text-indigo-600 leading-none">
                {index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-1 pt-1 opacity-90 group-hover:opacity-100">
              <p className="text-gray-800 leading-relaxed font-medium">
                {item.description}
              </p>
              {item.location && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span>📍</span>
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Transportation */}
      {transportSection && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-2xl">🚕</div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900">Transportation & Logistics</h4>
              {transportSection.activities.map((act, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {act.description}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoursItinerary;
