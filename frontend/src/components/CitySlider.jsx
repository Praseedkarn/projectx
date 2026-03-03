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

const CitySlider = ({ onCityClick = () => { } }) => {
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
    <section className="w-full  py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== HEADING ===== */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1f2d1f]">
            Discover Iconic Cities
          </h2>
          <p className="mt-4 text-[#6b7280] text-lg max-w-2xl mx-auto">
            Handpicked destinations known for culture, beauty, and unforgettable
            experiences.
          </p>
        </div>

        {/* ===== SLIDER ===== */}
        <div
          className="relative h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden touch-pan-y"
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
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer md:hover:scale-[1.02]"
                style={{
                  transform: `
                      translateX(${offset * (window.innerWidth < 768 ? 300 : 380)}px)
                      scale(${offset === 0 ? 1 : 0.88})
                    `,
                  filter: offset === 0 ? "none" : "blur(4px)",
                  opacity: offset === 0 ? 1 : 0.5,
                  zIndex: offset === 0 ? 10 : 5,
                }}
              >
                <div className="relative w-[280px] sm:w-[380px] h-[440px] md:h-[500px] rounded-[24px] md:rounded-[32px] overflow-hidden  group">
                  {/* IMAGE */}
                  <img
                    src={city.image}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-semibold leading-tight">{city.name}</h3>
                    <p className="text-xs md:text-sm text-white/70 mt-1 uppercase tracking-widest font-medium">{city.country}</p>
                    <p className="text-sm text-white/80 mt-4 line-clamp-2 leading-relaxed">
                      {city.desc}
                    </p>

                    <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#f3f4ee] group-hover:text-white transition-colors">
                      Explore City <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ===== ARROWS ===== */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-[#5b6f00] hover:text-white transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button
            onClick={next}
            className="absolute right-2 md:right-4 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-[#5b6f00] hover:text-white transition-all group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CitySlider;
