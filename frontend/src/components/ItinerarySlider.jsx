import { useState } from "react";

const itineraries = [
  {
    id: 10,
    title: "Goa Beach Escape",
    duration: "5 days",
    location: "Goa, India",
    image: "/goa.jpg", // you can add later
  },
  {
    id: 33,
    title: "Sikkim ",
    duration: "6 days",
    location: "Sikkim , india",
    image: "manali2.webp",
  },
  {
    id: 12,
    title: "Jaipur Heritage",
    duration: "3 days",
    location: "Rajasthan",
    image: "/jaipur.webp",
  },
  {
    id: 13,
    title: "Kerala Backwaters",
    duration: "4 days",
    location: "Kerala",
    image: "kerala.webp",
  },
];

const ItinerarySlider = ({ onItineraryClick = () => {} }) => {
  const [index, setIndex] = useState(0);
  const total = itineraries.length;

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
  <div className="relative w-full max-w-6xl mx-auto py-4 mt-2">

    {/* SLIDER WINDOW */}
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {itineraries.map((item, i) => {
          const isActive = i === index;
          const isSide =
            i === (index + 1) % total ||
            i === (index - 1 + total) % total;

          return (
            <div
              key={item.id}
              className="min-w-full flex justify-center px-6"
            >
              <div
                onClick={() => onItineraryClick(item.id)}
                className={`
                  cursor-pointer
                  bg-white rounded-3xl p-6
                  transition-all duration-500
                  w-full max-w-md
                  
                  ${isActive && `
                    scale-100 opacity-100
                    shadow-[0_35px_80px_rgba(0,0,0,0.25)]
                  `}

                  ${isSide && `
                    scale-95 opacity-60
                    blur-[1px]
                    shadow-[0_20px_40px_rgba(0,0,0,0.18)]
                  `}

                  ${!isActive && !isSide && `
                    scale-90 opacity-0
                  `}
                `}
              >
                {/* IMAGE */}
                <div className="h-44 rounded-2xl bg-gray-100 overflow-hidden mb-5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center
                                    text-gray-400 text-sm">
                      Image coming soon
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.duration}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  📍 {item.location}
                </p>

                <div className="mt-5">
                  <span className="inline-block rounded-full
                                   bg-[#5b7c67]/10
                                   text-[#5b7c67]
                                   px-4 py-1.5
                                   text-sm font-medium">
                    View itinerary →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* CONTROLS */}
    <button
      onClick={prev}
      className="absolute left-2 top-1/2 -translate-y-1/2
                 h-11 w-11 rounded-full bg-white
                 shadow-lg flex items-center justify-center
                 hover:scale-105 transition"
    >
      ◀
    </button>

    <button
      onClick={next}
      className="absolute right-2 top-1/2 -translate-y-1/2
                 h-11 w-11 rounded-full bg-white
                 shadow-lg flex items-center justify-center
                 hover:scale-105 transition"
    >
      ▶
    </button>
  </div>
);

};

export default ItinerarySlider;
