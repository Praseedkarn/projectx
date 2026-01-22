import React from "react";

const HoursItinerary = ({ data }) => {
  if (!data?.hours?.length) {
    return (
      <p className="text-sm text-gray-500">
        No itinerary available
      </p>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto space-y-4">

        {data.hours.map((hour, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white border rounded-xl p-5"
          >
            <div className="text-sm font-semibold text-[#5b7c67] whitespace-nowrap">
              Hour {index + 1}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {hour}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HoursItinerary;
