import express from "express";
import fetch from "node-fetch";
import CITY_COORDS from "../config/cityCoords.js";
import DEFAULT_ATTRACTIONS from "../config/defaultAttractions.js";

const router = express.Router();

console.log("🔥 OTM ROUTE LOADED");

router.get("/", async (req, res) => {
  try {
    console.log("🔥 /api/otm HIT", req.query);

    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ available: false });
    }

    const cityKey = city.toLowerCase().split(",")[0].trim();

    if (!CITY_COORDS[cityKey]) {
      return sendFallback(res, city, cityKey);
    }

    const { lat, lng } = CITY_COORDS[cityKey];
    const apiKey = process.env.OPENTRIPMAP_API_KEY;

    if (!apiKey) {
      throw new Error("OTM API KEY MISSING");
    }

    const radiusUrl =
      `https://api.opentripmap.com/0.1/en/places/radius` +
      `?radius=10000` +
      `&lon=${lng}` +
      `&lat=${lat}` +
      `&kinds=interesting_places` +
      `&limit=20` +
      `&apikey=${apiKey}`;

    const radiusRes = await fetch(radiusUrl);
    const radiusData = await radiusRes.json();

    if (!radiusData.features?.length) {
      return sendFallback(res, city, cityKey);
    }

    const places = radiusData.features.map((f) => ({
      id: f.properties.xid,
      name: f.properties.name,
      kinds: f.properties.kinds,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        f.properties.name + " " + city
      )}`,
    }));

    res.json({
      available: true,
      fallback: false,
      places,
    });
  } catch (err) {
    console.error("❌ OTM ERROR:", err.message);
    sendFallback(res, req.query.city, req.query.city);
  }
});

function sendFallback(res, city, cityKey) {
  const fallback = DEFAULT_ATTRACTIONS[cityKey] || [];

  res.json({
    available: true,
    fallback: true,
    places: fallback.map((a, i) => ({
      id: `fallback-${i}`,
      name: a.name,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        a.name + " " + city
      )}`,
    })),
  });
}

export default router;
