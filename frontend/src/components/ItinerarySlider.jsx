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

const ItinerarySlider = ({ onItineraryClick = () => { } }) => {
  const [index, setIndex] = useState(0);
  const total = itineraries.length;

  // 🔹 Swipe state
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

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
    if (!isDragging || startX === null) return;

    const x = e.touches[0].clientX;
    setCurrentX(x);

    // 🔥 follow finger slightly (damped)
    setDragOffset((x - startX) * 0.6);
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
    setDragOffset(0); // 🔥 snap back
  };




  return (
    <section className="w-full  py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADING */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1f2d1f]">
            Places You’ll Brag About Forever
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-2xl mx-auto text-base md:text-lg px-4">
            Destinations so good, they turn into stories, memories,
            and serious travel envy.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative w-full max-w-6xl mx-auto h-[480px] md:h-[540px]">
          <div
            className="overflow-hidden h-full touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {itineraries.map((item, i) => {
                let offset = i - index;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                // show only 3 cards
                if (Math.abs(offset) > 1) return null;

                return (
                  <div
                    key={item.slug}
                    onClick={() => onItineraryClick(item.slug)}
                    className="
                      absolute
                      transition-all duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      cursor-pointer
                      md:hover:scale-[1.03]
                    "
                    style={{
                      transform: `
                        translateX(${offset * (window.innerWidth < 768 ? 300 : 380) + (offset === 0 ? dragOffset : 0)}px)
                        scale(${offset === 0 ? 1 : 0.88})
                      `,
                      filter: offset === 0 ? "none" : "blur(4px)",
                      opacity: offset === 0 ? 1 : 0.5,
                      zIndex: offset === 0 ? 20 : 10,
                    }}
                  >

                    <div
                      className="
                        relative
                        w-[280px] sm:w-[380px] h-[440px] md:h-[500px]
                        rounded-[24px] md:rounded-[32px]
                        overflow-hidden
                        shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                        bg-white
                        group
                      "
                    >


                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* GRADIENT Overlay - darker at bottom for better readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* TAGS */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                          Top Rated
                        </span>
                      </div>

                      {/* ARROW */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2.5 shadow-lg text-white group-hover:bg-white group-hover:text-black transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </div>

                      {/* TEXT */}
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2 font-bold">{item.location}</div>
                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
                          <span className="w-1 h-1 bg-white/40 rounded-full" /> {item.duration}
                        </p>
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
            className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2
                     h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                     flex items-center justify-center hover:bg-[#5b6f00] hover:text-white transition-all z-30 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button
            onClick={next}
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2
                     h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                     flex items-center justify-center hover:bg-[#5b6f00] hover:text-white transition-all z-30 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>

  );
};

export default ItinerarySlider;
