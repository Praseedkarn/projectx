import React from "react";

const OneDayItinerary = ({ data }) => {
  if (!data?.days?.length) {
    return (
      <p className="text-sm text-gray-500">
        No itinerary available
      </p>
    );
  }

  const activities = data.days[0].activities || [];

  const sections = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  activities.forEach((item) => {
    if (item.startsWith("Morning")) sections.Morning.push(item);
    else if (item.startsWith("Afternoon")) sections.Afternoon.push(item);
    else if (item.startsWith("Evening")) sections.Evening.push(item);
  });

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">

        {/* Big day card */}
        <div className="bg-white border rounded-2xl p-6 space-y-8">

          <h3 className="text-xl font-semibold text-gray-800">
            One Day Plan
          </h3>

          {Object.entries(sections).map(
            ([period, items]) =>
              items.length > 0 && (
                <div key={period} className="space-y-3">

                  <h4 className="text-sm font-semibold text-[#5b7c67] uppercase tracking-wide">
                    {period}
                  </h4>

                  <div className="space-y-2">
                    {items.map((text, i) => (
                      <div
                        key={i}
                        className="border-l-4 border-[#5b7c67] pl-4 text-sm text-gray-700 leading-relaxed"
                      >
                        {text}
                      </div>
                    ))}
                  </div>

                </div>
              )
          )}

        </div>
      </div>
    </section>
  );
};

export default OneDayItinerary;
