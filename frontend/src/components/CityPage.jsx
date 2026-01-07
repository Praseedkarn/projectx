import { useEffect, useState } from "react";
import { detailedItineraries } from "../data/itinerary";

export default function CityPage({
  slug,
  onBack,
  onItineraryClick, // 👈 IMPORTANT (passed from App.js)
}) {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* ================= FETCH CITY ================= */
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`http://localhost:5001/api/cities/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setCity(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  /* ================= FIND ITINERARY ================= */
  const cityItinerary = city
    ? Object.values(detailedItineraries).find(
        (it) => it.citySlug === city.slug
      )
    : null;

  /* ================= STATES ================= */
  if (loading) {
    return <div className="pt-40 text-center">Loading…</div>;
  }

  if (error || !city) {
    return (
      <div className="pt-40 text-center text-red-500">
        City not found
      </div>
    );
  }

  return (
    <section className="bg-[#f7f9f8] pt-24 pb-28 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* BACK */}
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Cities
        </button>

        {/* HERO */}
        <div className="relative">
          <img
            src={city.heroImage}
            alt={city.name}
            className="w-full h-[360px] object-cover rounded-[36px]"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur
                          rounded-2xl px-6 py-4 shadow-lg">
            <h1 className="text-3xl font-semibold">{city.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {city.tagline}
            </p>
          </div>
        </div>

        {/* QUICK FACTS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Fact label="Timezone" value={city.quickFacts?.timezone} />
          <Fact label="Region" value={city.quickFacts?.region} />
          <Fact label="Budget" value={city.quickFacts?.budget} />
          <Fact
            label="Best For"
            value={city.quickFacts?.bestFor?.join(", ")}
          />
        </section>

        {/* ABOUT */}
        <Card title={`About ${city.name}`}>
          <p className="text-gray-700 leading-relaxed">
            {city.about}
          </p>
        </Card>

        {/* BEST TIME */}
        <Card title="Best Time to Visit">
          <div className="grid sm:grid-cols-2 gap-4">
            {city.bestTime?.map((s, i) => (
              <div key={i} className="border rounded-2xl p-4">
                <div className="font-medium">
                  {s.season} · {s.months}
                </div>
                <div className="text-sm text-gray-500">{s.temp}</div>
                <p className="text-sm mt-2 text-gray-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* ================= ITINERARY CONNECTOR ================= */}
        {cityItinerary && (
          <Card title="Recommended Itinerary">
            <div
              onClick={() => onItineraryClick(city.slug)}
              className="cursor-pointer border rounded-2xl p-5
                         hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">
                {cityItinerary.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {cityItinerary.duration} · {cityItinerary.difficulty}
              </p>

              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                {cityItinerary.description}
              </p>

              <div className="mt-3 text-sm text-[#5b7c67] font-medium">
                View itinerary →
              </div>
            </div>
          </Card>
        )}

        {/* NEIGHBORHOODS */}
        <Card title="Neighborhoods to Explore">
          <div className="grid sm:grid-cols-2 gap-4">
            {city.neighborhoods?.map((n, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-2xl">
                <div className="font-medium">{n.name}</div>
                <p className="text-sm text-gray-600 mt-1">
                  {n.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* THINGS TO DO */}
        <Card title="Things to Do">
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            {city.thingsToDo?.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* TRANSPORT */}
        <Card title="Getting Around">
          <div className="flex flex-wrap gap-3">
            {city.transport?.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </div>
        </Card>

        {/* NEARBY */}
        <Card title="Nearby Cities">
          <div className="flex flex-wrap gap-3">
            {city.nearbyCities?.map((n, i) => (
              <Tag key={i}>
                {n.name} · {n.distance}
              </Tag>
            ))}
          </div>
        </Card>

      </div>
    </section>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, children }) {
  return (
    <section className="bg-white rounded-[32px] p-6 md:p-8
                        shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-sm mt-1">
        {value || "—"}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="px-4 py-2 rounded-full border text-sm bg-white">
      {children}
    </span>
  );
}
