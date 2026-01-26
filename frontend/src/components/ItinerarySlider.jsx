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



return (
  <section className="w-full max-w-7xl mx-auto px-4 mt-20">
    {/* HEADING */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
        Places You’ll Brag About Forever
      </h2>
      <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
        Destinations so good, they turn into stories, memories,
        and serious travel envy.
      </p>
    </div>

    {/* SLIDER */}
    <div className="relative w-full max-w-6xl mx-auto h-[520px] ">
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
                "
                style={{
                  transform: `
                    translateX(${offset * 360}px)
                    scale(${offset === 0 ? 1 : 0.88})
                  `,
                  filter: offset === 0 ? "none" : "blur(2px)",
                  opacity: offset === 0 ? 1 : 0.6,
                  zIndex: offset === 0 ? 20 : 10,
                }}
              >

               <div
                  className="
                    relative
                    w-[380px] h-[500px]
                    rounded-[28px]
                    overflow-hidden
                    shadow-2xl
                    bg-white
                  "
                >


                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* TAGS */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 text-xs px-3 py-1 rounded-full">
                      Adventure
                    </span>
                    <span className="bg-white/90 text-xs px-3 py-1 rounded-full">
                      Nature
                    </span>
                  </div>

                  {/* ARROW */}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow">
                    ↗
                  </div>

                  {/* TEXT */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90 mt-1">
                      {item.duration} · {item.location}
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
        className="absolute left-0 top-1/2 -translate-y-1/2
                   h-11 w-11 rounded-full bg-white shadow
                   flex items-center justify-center hover:scale-105 transition z-30"
      >
        ◀
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2
                   h-11 w-11 rounded-full bg-white shadow
                   flex items-center justify-center hover:scale-105 transition z-30"
      >
        ▶
      </button>
    </div>

    {/* CTA */}
   
  </section>
);


};

export default ItinerarySlider;
