import { useState } from "react";
import { cities } from "../data/cities";

export default function ExploreCities({ onBack, onCityClick }) {
  const [query, setQuery] = useState("");

  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-[#f6f8f5] px-4 pt-24 pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ===== HEADER BAR ===== */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-medium text-black hover:underline"
          >
            ← Back to Home
          </button>
        </div>

        {/* ===== HERO CARD ===== */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Explore Cities Around the World
          </h1>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Discover destinations through culture, food, history, and local
            experiences.
          </p>

          {/* SEARCH */}
          <div className="max-w-md mx-auto relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or country"
              className="
                w-full rounded-full border
                px-5 py-3 text-sm
                outline-none
              "
            />
            <span className="absolute right-4 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* ===== CITY GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onCityClick?.(city)}
              className="
                bg-white rounded-2xl overflow-hidden
                shadow-md hover:shadow-xl
                transition cursor-pointer
              "
            >
              {/* IMAGE */}
              <img
                src={city.image}
                alt={city.name}
                className="h-40 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Explore {city.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  📍 {city.country}
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {city.desc}
                </p>

                <div className="pt-2 text-sm text-[#5b7c67] font-medium">
                  View city →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredCities.length === 0 && (
          <div className="text-center text-sm text-gray-500 pt-10">
            No cities found for “{query}”
          </div>
        )}
      </div>
    </section>
  );
}
