import express from "express";
import CITY_COORDS from "../config/cityCoords.js";
import CITY_COUNTRY from "../config/cityCountry.js";
import COUNTRY_META from "../config/countryMeta.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { city } = req.query;
  if (!city) return res.json({ available: false });

  const key = city
    .toLowerCase()
    .replace(/\s+/g, "_")
    .trim();

  // 1️⃣ City must exist
  if (!CITY_COORDS[key]) {
    return res.json({
      available: true,
      city,
      country: "Unknown",
      region: "Asia",
      currency: "Local currency",
      timezone: "Local time",
      avgTemp: "20°C – 35°C",
      bestTime: "October to March",
      fallback: true,
    });
  }

  // 2️⃣ City → Country
  const country = CITY_COUNTRY[key] || "India";

  // 3️⃣ Country → Meta
  const meta = COUNTRY_META[country];

  if (!meta) {
    return res.json({
      available: true,
      city,
      country,
      region: "Asia",
      currency: "Local currency",
      timezone: "Local time",
      avgTemp: "20°C – 35°C",
      bestTime: "October to March",
      fallback: true,
    });
  }

  // ✅ FINAL RESPONSE
  return res.json({
    available: true,
    city,
    country,
    ...meta,
    fallback: false,
  });
});

export default router;
