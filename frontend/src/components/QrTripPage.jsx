import React, { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";

import HoursItinerary from "../components/itinerary/HoursItinerary";
import OneDayItinerary from "../components/itinerary/OneDayItinerary";
import MultiDayItinerary from "../components/itinerary/MultiDayItinerary";

import { parseHoursText } from "../utils/parsers/parseHoursText";
import { parseOneDayText } from "../utils/parsers/parseOneDayText";
import { parseMultiDayText } from "../utils/parsers/parseMultiDayText";

/* =========================
   Brand Color
========================= */
const BRAND_COLOR = "#6A8F00";

/* =========================
   Helpers
========================= */

const extractLocation = (text = "") => {
  const match =
    text.match(/Destinations?:\s*(.+)/i) ||
    text.match(/Destination:\s*(.+)/i);

  return match ? match[1].trim() : null;
};

const detectTripType = (text = "") => {
  const lower = text.toLowerCase();
  if (lower.includes("hour")) return "hours";
  if (lower.includes("day 1") && lower.includes("day 2")) return "multi";
  return "day";
};

const QrTripPage = () => {
  const [tripText, setTripText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const path = window.location.pathname;
  const qrTripId = path.split("/qr-trip/")[1];

  /* =========================
     Fetch itinerary
  ========================= */
  useEffect(() => {
    if (!qrTripId) {
      setError("Invalid QR link");
      setLoading(false);
      return;
    }

    const fetchTrip = async () => {
      try {
        const res = await fetch(
          `https://projectx-yzu3.onrender.com/api/qr-trips/${qrTripId}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Trip not found");
        }

        setTripText(data.text);
      } catch {
        setError("Unable to load itinerary.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [qrTripId]);

  const location = extractLocation(tripText);
  const tripType = useMemo(() => detectTripType(tripText), [tripText]);

  const parsedData = useMemo(() => {
    try {
      if (tripType === "hours") return parseHoursText(tripText);
      if (tripType === "multi") return parseMultiDayText(tripText);
      return parseOneDayText(tripText);
    } catch {
      return null;
    }
  }, [tripText, tripType]);

  const handleDownloadPDF = () => {
    window.print();
  };

  /* =========================
     Loading
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div
            className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin mx-auto"
            style={{ borderTopColor: BRAND_COLOR }}
          />
          <p className="text-gray-500 text-sm">Loading itinerary…</p>
        </div>
      </div>
    );
  }

  /* =========================
     Error
  ========================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 border-b border-gray-100">

        {/* Brand Centered */}
        <div className="flex flex-col items-center text-center space-y-4">

          

          {/* EXPEDITIO */}
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-widest italic"
            style={{ color: BRAND_COLOR }}
          >
            EXPEDITIO
          </h1>

          {/* Divider */}
          <div className="w-24 h-[2px] bg-gray-200" />

          {/* Destination */}
          {location && (
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {location}
              </h2>

              <p className="text-gray-500 text-lg">
                {tripType === "hours" && "Hourly Travel Plan"}
                {tripType === "day" && "1-Day Itinerary"}
                {tripType === "multi" &&
                  `${parsedData?.days?.length || ""}-Day Itinerary`}
              </p>
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-2.5 rounded-full border text-sm font-medium transition hover:bg-gray-100"
              style={{ borderColor: BRAND_COLOR, color: BRAND_COLOR }}
            >
              ⬇ Download PDF
            </button>
          </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 py-14">

        {parsedData ? (
          <>
            {tripType === "hours" && (
              <HoursItinerary data={parsedData} city={location} />
            )}

            {tripType === "day" && (
              <OneDayItinerary data={parsedData} city={location} />
            )}

            {tripType === "multi" && (
              <MultiDayItinerary data={parsedData} city={location} />
            )}
          </>
        ) : (
          <div className="prose max-w-none">
            <ReactMarkdown>{tripText}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-center text-xs text-gray-400 pb-10">
        ✨ Generated by Expeditio AI • Shared via QR
      </div>
    </div>
  );
};

export default QrTripPage;
