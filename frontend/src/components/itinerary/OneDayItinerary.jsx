import React from "react";

const OneDayItinerary = ({ data, city, startDate }) => {
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
    <div className="space-y-8 animate-fade-in">

      {/* Header logic included in existing props */}
      {city && (
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {city} <span className="text-gray-400 font-normal">·</span>
            <span className="text-gray-500 text-lg font-normal ml-2">
              {startDate
                ? new Date(startDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
                : "1-Day Guide"}
            </span>
          </h2>
        </div>
      )}

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-10 pl-8 py-2">
        {normalSections.map((section, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white ring-2 ring-indigo-50 bg-indigo-500" />

            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              {section.period}
            </h4>

            <div className="space-y-6">
              {section.activities.map((act, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    {act.description}
                  </p>

                  {act.location && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-indigo-600 font-medium">
                      <span>📍</span>
                      <span className="underline decoration-indigo-200 underline-offset-2">
                        {act.location}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🚍 Transportation */}
      {transportSection && (
        <div className="mt-6 ml-4 pl-8 border-l-2 border-dashed border-gray-200 relative">
          <div className="absolute -left-[14px] top-0 text-xl bg-white p-1">🚕</div>

          <div className="bg-gray-50 rounded-2xl p-6 mt-2">
            <h4 className="font-bold text-gray-900 mb-2">Getting Around</h4>
            {transportSection.activities.map((act, i) => (
              <p key={i} className="text-sm text-gray-600 leading-relaxed">
                {act.description}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OneDayItinerary;
