import { useState } from "react";

const itineraries = [
  {
    slug: "goa",
    title: "Goa Beach Escape",
    duration: "5 days",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hfGVufDB8fDB8fHww",
  },
  {
    slug: "sikkim-gangtok",
    title: "Sikkim Explorer",
    duration: "6 days",
    location: "Sikkim, India",
    image: "https://images.unsplash.com/photo-1634400001131-d04275db2076?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNpa2tpbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    slug: "rajastan-royal",
    title: "Jaipur Heritage",
    duration: "3 days",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1619014452346-dc868be175cb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFqc3RoYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    slug: "kerala-backwater",
    title: "Kerala Backwaters",
    duration: "4 days",
    location: "Kerala",
    image: "https://plus.unsplash.com/premium_photo-1697729600773-5b039ef17f3b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2VyYWxhfGVufDB8fDB8fHww",
  },
];

const ItinerarySlider = ({ onItineraryClick = () => {} }) => {
  const [index, setIndex] = useState(0);
  const total = itineraries.length;

  // 🔹 Swipe state
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  // 🔹 Touch handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!startX || !currentX) return;

    const diff = startX - currentX;
    const threshold = 60;

    if (diff > threshold) next();
    else if (diff < -threshold) prev();

    setIsDragging(false);
    setStartX(null);
    setCurrentX(null);
  };

  const dragOffset =
    isDragging && startX && currentX ? currentX - startX : 0;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-16">
      {/* HEADING */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Explore ready-made itineraries
        </h2>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Hand-picked trips crafted by travelers like you
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative w-full max-w-6xl mx-auto py-4">
        {/* SLIDER WINDOW */}
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${
              isDragging
                ? ""
                : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            }`}
            style={{
              transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
            }}
          >
            {itineraries.map((item, i) => {
              const isActive = i === index;
              const isSide =
                i === (index + 1) % total ||
                i === (index - 1 + total) % total;

              return (
                <div key={item.slug} className="min-w-full flex justify-center px-6">
                  <div
                    onClick={() => onItineraryClick(item.slug)}
                    className={`
                      cursor-pointer bg-white rounded-3xl p-6
                      transition-all duration-500 w-full max-w-md
                      ${isActive && "scale-100 opacity-100 shadow-[0_35px_80px_rgba(0,0,0,0.25)]"}
                      ${isSide && "scale-95 opacity-60 blur-[1px] shadow-[0_20px_40px_rgba(0,0,0,0.18)]"}
                      ${!isActive && !isSide && "scale-90 opacity-0"}
                    `}
                  >
                    <div className="h-44 rounded-2xl bg-gray-100 overflow-hidden mb-5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

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
                      <span className="inline-block rounded-full bg-[#5b7c67]/10 text-[#5b7c67] px-4 py-1.5 text-sm font-medium">
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
                     h-11 w-11 rounded-full bg-white shadow-lg
                     flex items-center justify-center hover:scale-105 transition"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     h-11 w-11 rounded-full bg-white shadow-lg
                     flex items-center justify-center hover:scale-105 transition"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default ItinerarySlider;
