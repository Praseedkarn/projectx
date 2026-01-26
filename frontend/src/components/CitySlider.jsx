import { useState } from "react";
import { cities } from "../data/cities"; // <-- adjust path if needed

// 🔥 pick only 8 featured cities
const featuredCities = cities.filter((c) =>
  [
    "paris",
    "rome",
    "barcelona",
    "london",
    "amsterdam",
    "vienna",
    "prague",
    "florence",
  ].includes(c.slug)
);

const CitySlider = ({ onCityClick = () => {} }) => {
  const [index, setIndex] = useState(0);

  // 🔹 touch state
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const total = featuredCities.length;

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  /* ================= TOUCH HANDLERS ================= */
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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-24">
      {/* ===== HEADING ===== */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Discover Iconic Cities Worth Traveling For
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Handpicked destinations known for culture, beauty, and unforgettable
          experiences.
        </p>
      </div>

      {/* ===== SLIDER ===== */}
      <div
        className="relative h-[520px] flex items-center justify-center overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {featuredCities.map((city, i) => {
        let offset = i - index;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;


          // only render center + sides
          if (Math.abs(offset) > 1) return null;

          return (
            <div
              key={city.slug}
              onClick={() => onCityClick(city.slug)}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              style={{
                transform: `
                  translateX(${offset * 360}px)
                  scale(${offset === 0 ? 1 : 0.88})
                `,
                filter: offset === 0 ? "none" : "blur(2px)",
                opacity: offset === 0 ? 1 : 0.6,
                zIndex: offset === 0 ? 10 : 5,
              }}
            >
              <div className="relative w-[380px] h-[500px] rounded-[28px] overflow-hidden shadow-2xl">
                {/* IMAGE */}
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-semibold">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.country}</p>
                  <p className="text-sm opacity-80 mt-3 line-clamp-2">
                    {city.desc}
                  </p>

                  <span className="inline-block mt-4 text-sm font-medium underline">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* ===== ARROWS ===== */}
        <button
          onClick={prev}
          className="absolute left-4 z-20 h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="absolute right-4 z-20 h-11 w-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default CitySlider;
