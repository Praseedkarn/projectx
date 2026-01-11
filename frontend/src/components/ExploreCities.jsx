import { useState , useEffect } from "react";
import { cities } from "../data/cities";
import { useNavigate } from "react-router-dom";
const ITEMS_PER_PAGE = 9;
const optimizeUnsplash = (url, width = 400) =>
  `${url}&w=${width}&auto=format&fit=crop&q=60`;

export default function ExploreCities() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCities.length / ITEMS_PER_PAGE);

  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return (
    <section className="h-screen flex items-center justify-center bg-[#f6f8f5]">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5b7c67] rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-600">Loading cities…</p>
      </div>
    </section>
  );
}


  return (
    <section className="bg-[#f6f8f5] px-4 pt-24 pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <button
            onClick={()=> navigate("/")}
            className="text-sm font-medium text-black hover:underline"
          >
            ← Back to Home
          </button>
        </div>

        {/* HERO */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Explore Cities Around the World
          </h1>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Discover destinations through culture, food, history, and local experiences.
          </p>

          <div className="max-w-md mx-auto relative">
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search city or country"
              className="w-full rounded-full border px-5 py-3 text-sm outline-none"
            />
            <span className="absolute right-4 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* CITY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCities.map((city) => (
            <div
              key={city._id || city.id}
              onClick={() => navigate(`/cities/${city.slug}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
            >
             <div className="h-40 w-full bg-gray-200 overflow-hidden">
              <img
                src={optimizeUnsplash(city.image, 400)}
                alt={city.name}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover transition-opacity duration-300"
              />
            </div>


              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Explore {city.name}
                </h3>

                <div className="text-xs text-gray-500">📍 {city.country}</div>

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

        {/* EMPTY */}
        {filteredCities.length === 0 && (
          <div className="text-center text-sm text-gray-500 pt-10">
            No cities found for “{query}”
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-full text-sm
                  ${currentPage === i + 1
                    ? "bg-[#5b7c67] text-white"
                    : "border hover:bg-gray-100"}
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
