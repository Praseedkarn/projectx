import express from "express";
import axios from "axios";
import CITY_COORDS from "../config/cityCoords.js";

const router = express.Router();

/* =====================================================
   ⚡ SIMPLE IN-MEMORY CACHE (FAST FOR RENDER FREE)
===================================================== */
const climateCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

/* =====================================================
   🧠 SCORING FUNCTIONS
===================================================== */

// Ideal temperature = 22–28°C
function tempScore(avg) {
  if (avg >= 22 && avg <= 28) return 50;
  if (avg >= 18 && avg <= 32) return 35;
  if (avg >= 15 && avg <= 35) return 20;
  return 5;
}

// Rain strongly affects comfort
function rainScore(rain) {
  if (rain < 30) return 30;
  if (rain < 80) return 22;
  if (rain < 150) return 15;
  if (rain < 300) return 8;
  return 0; // heavy monsoon
}

// Penalize extreme heat/cold
function extremePenalty(avg) {
  if (avg > 40 || avg < 3) return -25;
  if (avg > 35 || avg < 8) return -15;
  return 0;
}

// Normalize score to 0–100 clean index
function normalize(score) {
  const maxPossible = 80; // 50 temp + 30 rain
  return Math.max(0, Math.min(100, Math.round((score / maxPossible) * 100)));
}

/* =====================================================
   🌍 ROUTER
===================================================== */

router.get("/", async (req, res) => {
  try {
    const city = req.query.city?.toLowerCase().trim();

    if (!city) {
      return res.status(400).json({ error: "City required" });
    }

    const coords = CITY_COORDS[city];

    if (!coords) {
      return res.status(404).json({ error: "City not supported" });
    }

    /* ================= CACHE ================= */
    const cached = climateCache.get(city);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return res.json(cached.data);
    }

    /* ================= FETCH LAST YEAR ================= */
    const response = await axios.get(
      "https://archive-api.open-meteo.com/v1/archive",
      {
        params: {
          latitude: coords.lat,
          longitude: coords.lng,
          start_date: "2023-01-01",
          end_date: "2023-12-31",
          daily: "temperature_2m_mean,precipitation_sum",
          timezone: "auto",
        },
      }
    );

    const temps = response.data.daily.temperature_2m_mean;
    const rains = response.data.daily.precipitation_sum;
    const dates = response.data.daily.time;

    const monthly = {};

    dates.forEach((date, i) => {
      const month = new Date(date).getMonth();

      if (!monthly[month]) {
        monthly[month] = { temp: [], rain: [] };
      }

      monthly[month].temp.push(temps[i]);
      monthly[month].rain.push(rains[i]);
    });

    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    /* ================= CALCULATE SCORES ================= */
    const monthScores = Object.keys(monthly).map((m) => {
      const avgTemp =
        monthly[m].temp.reduce((a, b) => a + b, 0) /
        monthly[m].temp.length;

      const totalRain =
        monthly[m].rain.reduce((a, b) => a + b, 0);

      const rawScore =
        tempScore(avgTemp) +
        rainScore(totalRain) +
        extremePenalty(avgTemp);

      const comfortIndex = normalize(rawScore);

      return {
        month: parseInt(m),
        monthName: monthNames[m],
        avgTemp: Math.round(avgTemp),
        rainfall: Math.round(totalRain),
        score: comfortIndex,
      };
    });

    monthScores.sort((a, b) => b.score - a.score);

    const bestMonths = monthScores.slice(0, 3);

    /* ================= BUILD RANGE ================= */
    const sortedBest = [...bestMonths]
      .map(m => m.month)
      .sort((a, b) => a - b);

    const bestRange = `${monthNames[sortedBest[0]]} – ${monthNames[sortedBest[sortedBest.length - 1]]}`;

    /* ================= SEASON CLASSIFICATION ================= */
    monthScores.forEach(m => {
      if (m.score >= 75) m.season = "Peak";
      else if (m.score >= 55) m.season = "Shoulder";
      else m.season = "Off";
    });

    /* ================= EXPLANATION ================= */
    const avgBestTemp =
      bestMonths.reduce((sum, m) => sum + m.avgTemp, 0) /
      bestMonths.length;

    const explanation =
      `Pleasant temperatures around ${Math.round(avgBestTemp)}°C with low rainfall make this period ideal for sightseeing and outdoor exploration.`;

    const result = {
      city,
      bestTimeRange: bestRange,
      bestMonths: bestMonths.map(m => m.monthName),
      travelComfortIndex: bestMonths[0].score,
      explanation,
      seasonSummary: {
        peak: monthScores.filter(m => m.season === "Peak").map(m => m.monthName),
        shoulder: monthScores.filter(m => m.season === "Shoulder").map(m => m.monthName),
        off: monthScores.filter(m => m.season === "Off").map(m => m.monthName),
      },
      monthlyBreakdown: monthScores,
    };

    climateCache.set(city, {
      timestamp: Date.now(),
      data: result,
    });

    res.json(result);

  } catch (error) {
    console.error("Climate error:", error.message);
    res.status(500).json({ error: "Climate analysis failed" });
  }
});

export default router;