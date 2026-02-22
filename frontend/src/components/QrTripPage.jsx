import React, { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";

import HoursItinerary from "../components/itinerary/HoursItinerary";
import OneDayItinerary from "../components/itinerary/OneDayItinerary";
import MultiDayItinerary from "../components/itinerary/MultiDayItinerary";

import { parseHoursText } from "../utils/parsers/parseHoursText";
import { parseOneDayText } from "../utils/parsers/parseOneDayText";
import { parseMultiDayText } from "../utils/parsers/parseMultiDayText";

/* =========================
   Helpers
========================= */

const extractLocation = (text = "") => {
  if (!text) return null;

  const titleMatch = text.match(/TITLE:\s*(.+)/i);
  if (titleMatch) {
    return titleMatch[1].replace(/Itinerary/i, "").trim();
  }

  const firstLine = text.split("\n")[0];
  if (firstLine?.toLowerCase().includes("itinerary")) {
    return firstLine.replace(/itinerary/i, "").trim();
  }

  return null;
};

const detectTripType = (text = "") => {
  const lower = text.toLowerCase();

  if (lower.includes("hour 1")) return "hours";

  const dayMatches = lower.match(/day\s+\d+/g);
  if (dayMatches && dayMatches.length > 1) return "multi";

  if (lower.includes("day 1")) return "day";

  return "day";
};

const QrTripPage = () => {
  const [tripText, setTripText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const qrTripId = window.location.pathname.split("/qr-trip/")[1];

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

  const location = useMemo(() => extractLocation(tripText), [tripText]);
  const tripType = useMemo(() => detectTripType(tripText), [tripText]);

  const parsedData = useMemo(() => {
    try {
      if (tripType === "hours") return parseHoursText(tripText);
      if (tripType === "multi") return parseMultiDayText(tripText);
      return parseOneDayText(tripText);
    } catch (err) {
      console.error("QR parsing failed:", err);
      return null;
    }
  }, [tripText, tripType]);

  const handleDownloadPDF = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5b6f00] rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm tracking-wide">
            Preparing your travel document…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">

      {/* ================= HERO ================= */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">

        {/* BRAND NAME */}
        <span className="italic text-4xl md:text-4xl text-[#5b6f00]">
          EXPEDITIO
        </span>

        <div className="w-16 h-[1px] bg-gray-300 mx-auto my-8" />

        {/* DESTINATION */}
        {location && (
          <>
            <h2 className="text-5xl font-bold tracking-tight leading-tight">
              {location}
            </h2>

            <p className="mt-4 text-gray-500 text-lg tracking-wide">
              {tripType === "hours" && "Hourly Travel Plan"}
              {tripType === "day" && "1-Day Curated Itinerary"}
              {tripType === "multi" &&
                `${parsedData?.days?.length || ""}-Day Curated Itinerary`}
            </p>
          </>
        )}

        {/* DOWNLOAD BUTTON */}
        <div className="mt-10 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="px-7 py-2.5 rounded-full border text-sm font-medium transition hover:bg-gray-100 border-[#5b6f00] text-[#5b6f00]"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-6 pb-24 leading-relaxed print:pb-12">

       {parsedData ? (
          <>
            {tripType === "hours" && (
              <HoursItinerary
                data={parsedData}
                city={location}
                hideHeader
              />
            )}

            {tripType === "day" && (
              <OneDayItinerary
                data={parsedData}
                city={location}
                hideHeader
              />
            )}

            {tripType === "multi" && (
              <MultiDayItinerary
                data={parsedData}
                city={location}
                hideHeader
              />
            )}
          </>
        ) : (
          <div className="prose max-w-none">
            <ReactMarkdown>{tripText}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-center text-xs text-gray-400 pb-12 tracking-wide">
        Crafted by Expeditio AI • Smart Travel Planning
      </div>
    </div>
  );
};

export default QrTripPage;