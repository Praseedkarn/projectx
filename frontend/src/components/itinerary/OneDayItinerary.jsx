import React from "react";

const OneDayItinerary = ({ data, city }) => {
  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const day = data.days[0];

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto space-y-8">

        {city && (
          <h2 className="text-2xl font-semibold text-gray-800">
            📍 {city} One-Day Itinerary
          </h2>
        )}

        <div className="bg-white border rounded-2xl p-6 space-y-8">

          <h3 className="text-xl font-semibold text-gray-800">
            Day Plan
          </h3>

          {(day.sections || []).map((section, idx) => (
            <div key={idx} className="space-y-3">

              <h4 className="text-sm font-semibold text-[#5b7c67] uppercase tracking-wide">
                {section.period}
              </h4>

              <div className="space-y-3">
                {(section.activities || []).map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="border-l-4 border-[#5b7c67] pl-4 text-sm text-gray-700 space-y-1"
                  >
                    <p>{act.description}</p>

                    {(act.cost || act.location) && (
                      <p className="text-xs text-gray-500">
                        {act.cost && <>💰 {act.cost}</>}
                        {act.cost && act.location && " · "}
                        {act.location && <>📍 {act.location}</>}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OneDayItinerary;
