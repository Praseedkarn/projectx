import express from "express";
import fetch from "node-fetch";
import CITY_COORDS from "../config/cityCoords.js";
import DEFAULT_ATTRACTIONS from "../config/defaultAttractions.js";

const router = express.Router();

/**
 * GET /api/osm?city=CityName
 */
router.get("/", async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.json({ available: false });
  }

  const cityKey = city.toLowerCase().split(",")[0].trim();

  // 1️⃣ City not supported → fallback
  if (!CITY_COORDS[cityKey]) {
    return sendFallback(res, city, cityKey, "CITY_NOT_FOUND");
  }

  const { lat, lng } = CITY_COORDS[cityKey];

  try {
    // 2️⃣ OSM best-effort query
    const query = `
[out:json][timeout:20];
(
  node["tourism"="attraction"](around:12000,${lat},${lng});
  node["tourism"="museum"](around:12000,${lat},${lng});
  node["historic"](around:12000,${lat},${lng});
  node["natural"~"waterfall|beach|peak"](around:12000,${lat},${lng});
  node["leisure"="park"](around:12000,${lat},${lng});
);
out tags;
`;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "User-Agent": "ai-travel-planner/1.0",
        },
        body: query,
      }
    );

    const text = await response.text();
    if (!text || !text.trim().startsWith("{")) {
      throw new Error("Bad OSM response");
    }

    const data = JSON.parse(text);

    if (!data.elements || data.elements.length === 0) {
      throw new Error("Empty OSM result");
    }

    // 3️⃣ Pick famous places
    const attractions = data.elements
      .filter(el => el.tags?.name)
      .sort((a, b) => score(b) - score(a))
      .slice(0, 6)
      .map(el => ({
        id: el.id,
        name: el.tags.name,
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          el.tags.name + " " + city
        )}`,
      }));

    if (attractions.length === 0) {
      throw new Error("No good attractions");
    }

    return res.json({
      available: true,
      fallback: false,
      searchedCity: city,
      showingCity: cityKey,
      attractions,
    });

  } catch (err) {
    // 4️⃣ ANY ERROR → fallback immediately
    console.warn("OSM failed, using fallback:", err.message);
    return sendFallback(res, city, cityKey, "OSM_UNAVAILABLE");
  }
});

/* ⭐ SIMPLE FAME SCORING */
function score(el) {
  return (
    (el.tags.wikipedia ? 5 : 0) +
    (el.tags.wikidata ? 4 : 0) +
    (el.tags.historic ? 3 : 0) +
    (el.tags.tourism ? 2 : 0)
  );
}

/* 🔁 FALLBACK (ALWAYS WORKS) */
function sendFallback(res, city, cityKey, reason) {
  const fallback = DEFAULT_ATTRACTIONS[cityKey] || [];

  return res.json({
    available: true,
    fallback: true,
    fallbackReason: reason,
    searchedCity: city,
    showingCity: cityKey,
    attractions: fallback.slice(0, 6).map((a, i) => ({
      id: `fallback-${i}`,
      name: a.name,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        a.name + " " + city
      )}`,
    })),
  });
}

export default router;
