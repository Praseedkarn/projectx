import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const TripResults = ({ suggestions, loading, onClose }) => {
  const messages = [
    "Understanding your preferences…",
    "Analyzing routes & distances…",
    "Finding food & local spots…",
    "Balancing time and budget…",
    "Finalizing your itinerary…",
  ];

  const [step, setStep] = useState(0);

  // typing + content states
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [qrTripId, setQrTripId] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState("");

  /* ================= LOADING TEXT ROTATION ================= */
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  /* ================= START TYPING AFTER LOADING ================= */
  useEffect(() => {
    if (loading) return;

    if (!suggestions?.text) return;

    setIsTyping(true);
    setDisplayText("");
    setFinalText("");
    setIsEditing(false);

    const lines = suggestions.text.split("\n");
    let index = 0;

    const typingInterval = setInterval(() => {
      index++;
      const current = lines.slice(0, index).join("\n");
      setDisplayText(current);

      if (index >= lines.length) {
        clearInterval(typingInterval);
        setFinalText(suggestions.text);
        setDisplayText("");
        setIsTyping(false);
      }
    }, 80); // FAST: line-by-line typing

    return () => clearInterval(typingInterval);
  }, [loading, suggestions]);

  const handleGenerateQR = async () => {
  if (!finalText || qrLoading) return;

  setQrLoading(true);
  setQrError("");

  try {
    const res = await fetch("http://localhost:5001/api/qr-trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: finalText }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to generate QR");
    }

    setQrTripId(data.qrTripId);
  } catch (err) {
    setQrError("Failed to generate QR. Try again.");
  } finally {
    setQrLoading(false);
  }
};



  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 max-w-md w-full">
          <div className="w-14 h-14 border-4 border-[#5b7c67]/30
                          border-t-[#5b7c67]
                          rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-800">
            ✨ Planning your trip
          </p>

          <p className="text-sm text-gray-600">
            {messages[step]}
          </p>

          <p className="text-xs text-gray-400">
            This may take a few seconds…
          </p>
        </div>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!suggestions?.text) {
    return (
      <div className="pt-24 text-center text-gray-600">
        No itinerary generated.
      </div>
    );
  }

  /* ================= MAIN RESULT ================= */
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Your AI Travel Plan
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            {!isEditing ? (
              <button
                disabled={isTyping || !finalText}
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 text-sm rounded-lg transition
                  ${isTyping || !finalText
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
              >
                ✏️ Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm rounded-lg
                           bg-emerald-600 text-white
                           hover:bg-emerald-500 transition"
              >
                ✅ Save
              </button>

              
            )}
            
          </div>

          {/* Typing View */}
          {isTyping && (
            <pre
              className="bg-slate-50 border border-slate-200 rounded-xl
                         p-5 text-slate-700 text-[15px]
                         leading-[1.7] font-serif
                         whitespace-pre-wrap break-words
                         min-h-[300px]"
            >
              {displayText}
              <span className="animate-pulse">▍</span>
            </pre>
          )}

          {/* View Mode */}
          {!isTyping && !isEditing && (
            <pre
              className="bg-slate-50 border border-slate-200 rounded-xl
                         p-5 text-slate-700 text-[15px]
                         leading-[1.7] font-serif
                         whitespace-pre-wrap break-words
                         min-h-[300px]"
            >
              {finalText}
            </pre>
          )}

          {/* Edit Mode */}
          {!isTyping && isEditing && (
            <textarea
              value={finalText}
              onChange={(e) => setFinalText(e.target.value)}
              className="w-full min-h-[300px]
                         bg-white border border-slate-300
                         rounded-xl p-4 text-[15px]
                         leading-[1.7] font-serif
                         focus:outline-none focus:ring-2
                         focus:ring-slate-400"
            />
          )}

        </div>
        <button
  onClick={handleGenerateQR}
  disabled={!finalText || isEditing || qrLoading}
  className={`px-4 py-2 text-sm rounded-lg transition
    ${(!finalText || isEditing || qrLoading)
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-indigo-600 text-white hover:bg-indigo-500"
    }`}
>
  {qrLoading ? "Generating QR..." : "📱 Generate QR"}
</button>

{qrTripId && (
  <div className="mt-6 flex flex-col items-center gap-3">
    <QRCodeCanvas
      value={`http://localhost:3000/qr-trip/${qrTripId}`}
      size={220}
    />

    <p className="text-sm text-gray-600">
      Scan to view itinerary anytime
    </p>

    <p className="text-xs text-gray-400 break-all">
      http://localhost:3000/qr-trip/{qrTripId}
    </p>
  </div>
)}


        <div className="text-center text-xs text-gray-500">
          ✨ Generated by AI. Content may vary.
        </div>

      </div>
    </div>
  );
};



export default TripResults;
