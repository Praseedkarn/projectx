import express from "express";
import CITY_COORDS from "../config/cityCoords.js";
import DEFAULT_ATTRACTIONS from "../config/defaultAttractions.js";

const router = express.Router();

/**
 * GET /api/osm?city=CityName
 */
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.json({ available: false });

    /* ===============================
       1️⃣ NORMALIZE CITY NAME
       =============================== */
    const cityKey = city
      .toLowerCase()
      .split(",")[0]
      .trim();

    /* ===============================
       2️⃣ CHECK STATIC COORDS
       =============================== */
    if (!CITY_COORDS[cityKey]) {
      return sendFallback(res, city, cityKey, true);
    }

    const { lat, lng } = CITY_COORDS[cityKey];

    /* ===============================
       3️⃣ OVERPASS QUERY (ONE TIME)
       =============================== */
    const query = `
[out:json][timeout:25];
(
  node["tourism"~"hotel|guest_house|hostel|resort|motel"](around:10000,${lat},${lng});
  way["tourism"~"hotel|guest_house|hostel|resort|motel"](around:10000,${lat},${lng});

  node["tourism"="attraction"](around:10000,${lat},${lng});
  node["natural"~"waterfall|beach"](around:10000,${lat},${lng});
  node["historic"](around:10000,${lat},${lng});
  node["leisure"="park"](around:10000,${lat},${lng});
);
out center tags;
`;

    const overpassRes = await fetch(
      "https://overpass.kumi.systems/api/interpreter",
      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: query,
      }
    );

    const overpassText = await overpassRes.text();
    if (!overpassText.trim().startsWith("{")) {
      throw new Error("Overpass failed");
    }

    const overpassData = JSON.parse(overpassText);

    /* ===============================
       4️⃣ CLEAN DATA
       =============================== */
    const hotels = [];
    const attractions = [];

    for (const el of overpassData.elements || []) {
      if (!el.tags?.name) continue;

      const name = el.tags.name;
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        name + " " + city
      )}`;

      if (
        el.tags?.tourism &&
        ["hotel", "guest_house", "hostel", "resort", "motel"].includes(
          el.tags.tourism
        )
      ) {
        hotels.push({
          id: el.id,
          name,
          stars: el.tags.stars || null,
          mapsLink,
        });
        continue;
      }

      attractions.push({
        id: el.id,
        name,
        mapsLink,
      });
    }

    /* ===============================
       5️⃣ SINGLE DECISION
       =============================== */
    if (hotels.length || attractions.length) {
      return res.json({
        available: true,
        fallback: false,
        searchedCity: city,
        showingCity: cityKey,
        hotels,
        attractions,
      });
    }

    return sendFallback(res, city, cityKey, false);
  } catch (err) {
    console.error("OSM route error:", err.message);
    return sendFallback(res, req.query.city, req.query.city, true);
  }
});

/* ===============================
   🔁 FALLBACK (SAFE + HONEST)
   =============================== */
function sendFallback(res, city, cityKey, reason) {
  const fallback = DEFAULT_ATTRACTIONS[cityKey] || [];

  return res.json({
    available: true,
    fallback: true,
    fallbackReason: reason, // 👈 NEW
    searchedCity: city,
    showingCity: cityKey,
    hotels: [],
    attractions: fallback.map((a, i) => ({
      id: `fallback-${i}`,
      name: a.name,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        a.name + " " + city
      )}`,
    })),
  });
}


export default router;
