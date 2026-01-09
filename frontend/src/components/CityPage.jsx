import { useEffect, useState } from "react";

/* ================= GOOGLE MAP EMBED (NO API KEY) ================= */
const GoogleMapEmbed = ({ place }) => {
  if (!place) return null;

  return (
    <div className="w-full h-[380px] rounded-3xl overflow-hidden border shadow-sm">
      <iframe
        title={`Map of ${place}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          place
        )}&output=embed`}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default function CityPage({ slug, onBack, onItineraryClick }) {
  const [city, setCity] = useState(null);
  const [cityItinerary, setCityItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMapPlace, setSelectedMapPlace] = useState("");

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

  /* ================= FETCH ITINERARY ================= */
  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5001/api/itineraries/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCityItinerary(data))
      .catch(() => setCityItinerary(null));
  }, [slug]);

  /* ================= MAP HIGHLIGHTS (FAIL-SAFE LOGIC) ================= */
  const mapHighlights = (() => {
    // 1️⃣ Explicit city map highlights (if you add later)
    if (city?.mapHighlights?.length) {
      return city.mapHighlights;
    }

    // 2️⃣ Itinerary 360 highlights
    if (cityItinerary?.highlight360Views?.length) {
      return cityItinerary.highlight360Views;
    }

    // 3️⃣ Itinerary day places
    const fromDays = {};
    cityItinerary?.days?.forEach((day) => {
      day.places?.forEach((p) => {
        if (!fromDays[p]) {
          fromDays[p] = {
            label: p.split(",")[0],
            place: p,
          };
        }
      });
    });

    if (Object.keys(fromDays).length > 0) {
      return Object.values(fromDays).slice(0, 6);
    }

    // 4️⃣ Neighborhoods fallback (IMPORTANT)
    if (city?.neighborhoods?.length) {
      return city.neighborhoods.slice(0, 6).map((n) => ({
        label: n.name,
        place: `${n.name}, ${city.name}`,
      }));
    }

    // 5️⃣ FINAL fallback → city itself (NEVER FAILS)
    if (city?.name) {
      return [
        {
          label: city.name,
          place: city.name,
        },
      ];
    }

    return [];
  })();

  /* ================= SET DEFAULT MAP PLACE ================= */
  useEffect(() => {
    if (mapHighlights.length > 0) {
      setSelectedMapPlace(mapHighlights[0].place);
    }
  }, [slug, cityItinerary, city]);

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

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-6 py-4 shadow-lg">
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

        {/* MAP EXPLORE (ALWAYS SHOWS) */}
        <Card title="📍 Explore on Map">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Explore important locations and areas around {city.name}.
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            {mapHighlights.map(({ label, place }) => (
              <button
                key={place}
                onClick={() => setSelectedMapPlace(place)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition
                  ${
                    selectedMapPlace === place
                      ? "bg-[#5b7c67] text-white shadow-md scale-105"
                      : "bg-white border hover:bg-gray-50 hover:scale-105"
                  }`}
              >
                📍 {label}
              </button>
            ))}
          </div>

          <GoogleMapEmbed place={selectedMapPlace} />
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

        <Card title="🌡️ Average Temperature">
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-sm text-gray-500">Summer</div>
      <div className="text-lg font-semibold">
        {city.avgTemp?.summer || "—"}
      </div>
    </div>
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-sm text-gray-500">Winter</div>
      <div className="text-lg font-semibold">
        {city.avgTemp?.winter || "—"}
      </div>
    </div>
  </div>
</Card>

<Card title="👥 Best For">
  <div className="space-y-3 text-sm text-gray-700">
    <p><strong>Couples:</strong> {city.bestForPeople?.couples}</p>
    <p><strong>Families:</strong> {city.bestForPeople?.families}</p>
    <p><strong>Friends:</strong> {city.bestForPeople?.friends}</p>
    <p><strong>Solo:</strong> {city.bestForPeople?.solo}</p>
  </div>
</Card>
<Card title="🏙️ Neighborhoods">
  <div className="grid sm:grid-cols-2 gap-4">
    {city.neighborhoods?.map((n, i) => (
      <div key={i} className="border rounded-2xl p-4">
        <div className="font-medium">{n.name}</div>
        <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
      </div>
    ))}
  </div>
</Card>
<Card title="🚇 Transport">
  <div className="flex flex-wrap gap-2">
    {city.transport?.map((t, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
      >
        {t}
      </span>
    ))}
  </div>
</Card>
<Card title="🎯 Things To Do">
  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
    {city.thingsToDo?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
</Card>
<Card title="🧭 Nearby Cities">
  <div className="grid sm:grid-cols-2 gap-4">
    {city.nearbyCities?.map((c, i) => (
      <div key={i} className="border rounded-xl p-4">
        <div className="font-medium">{c.name}</div>
        <div className="text-sm text-gray-500">
          {c.distance}
        </div>
      </div>
    ))}
  </div>
</Card>







        {/* RECOMMENDED ITINERARY */}
        <Card title="Recommended Itinerary">
          {cityItinerary ? (
            <div
              onClick={() => onItineraryClick(city.slug)}
              className="cursor-pointer border rounded-2xl p-5 hover:shadow-md transition"
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
          ) : (
            <p className="text-sm text-gray-500">
              No itinerary available for this city yet.
            </p>
          )}
        </Card>

      </div>
    </section>
  );
}

/* ================= UI HELPERS ================= */

function Card({ title, children }) {
  return (
    <section className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
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
