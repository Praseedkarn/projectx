import express from "express";
import axios from "axios";
import CITY_COORDS from "../config/cityCoords.js";

const router = express.Router();

function getWeatherCondition(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    51: "Light drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Snow",
    80: "Rain showers",
    95: "Thunderstorm",
  };

  return map[code] || "Unknown";
}

router.get("/", async (req, res) => {
  try {
    const city = req.query.city?.toLowerCase().trim();
    const date = req.query.date; // 🔥 read date

    if (!city) {
      return res.status(400).json({ error: "City required" });
    }

    const coords = CITY_COORDS[city];

    if (!coords) {
      return res.status(404).json({ error: "City not supported" });
    }

    // 🔥 IF DATE PROVIDED → FETCH FORECAST
    if (date) {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: coords.lat,
            longitude: coords.lng,
            daily: "temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max",
            start_date: date,
            end_date: date,
            timezone: "auto",
          },
        }
      );

      const daily = response.data.daily;

      if (!daily || !daily.time?.length) {
        return res.status(404).json({ error: "Forecast not available for date" });
      }

      const avgTemp = Math.round(
        (daily.temperature_2m_max[0] + daily.temperature_2m_min[0]) / 2
      );

      return res.json({
        city,
        date,
        temperature: avgTemp,
        windSpeed: daily.windspeed_10m_max[0],
        condition: getWeatherCondition(daily.weathercode[0]),
      });
    }

    // 🔥 ELSE → RETURN CURRENT WEATHER
    const response = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: coords.lat,
          longitude: coords.lng,
          current_weather: true,
          timezone: "auto",
        },
      }
    );

    const weather = response.data.current_weather;

    return res.json({
      city,
      temperature: weather.temperature,
      windSpeed: weather.windspeed,
      condition: getWeatherCondition(weather.weathercode),
      time: weather.time,
    });

  } catch (error) {
    console.error("Weather error:", error.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

export default router;