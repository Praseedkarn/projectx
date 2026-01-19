import express from "express";
import fetch from "node-fetch";
import CITY_COORDS from "../config/cityCoords.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.json({ available: false, sightseeing: [] });

    const cityKey = city.toLowerCase().split(",")[0].trim();
    const coords = CITY_COORDS[cityKey];

    if (!coords) {
      console.log("❌ City not found:", cityKey);
      return res.json({ available: false, sightseeing: [] });
    }

    const { lat, lng } = coords;
    const apiKey = process.env.OPENTRIPMAP_API_KEY;

    // small bounding box (~10km)
    const url =
      `https://api.opentripmap.com/0.1/en/places/bbox` +
      `?lon_min=${lng - 0.1}` +
      `&lon_max=${lng + 0.1}` +
      `&lat_min=${lat - 0.1}` +
      `&lat_max=${lat + 0.1}` +
      `&limit=50` +
      `&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("📍 BBOX COUNT:", Array.isArray(data) ? data.length : data);

    if (!Array.isArray(data)) {
      return res.json({ available: true, sightseeing: [] });
    }

    // simple filter: name exists
    const sightseeing = data
      .filter(p => p.name)
      .slice(0, 10)
      .map(p => ({
        id: p.xid,
        name: p.name,
        mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          p.name + " " + city
        )}`,
      }));

    res.json({ available: true, sightseeing });
  } catch (err) {
    console.error("❌ OTM ERROR:", err.message);
    res.json({ available: false, sightseeing: [] });
  }
});

export default router;
