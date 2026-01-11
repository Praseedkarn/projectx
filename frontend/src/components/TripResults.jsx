import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const TripResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= GET DATA SAFELY ================= */
  const suggestions =
    location.state?.suggestions ||
    JSON.parse(localStorage.getItem("lastTripResult"));

  const messages = [
    "Understanding your preferences…",
    "Analyzing routes & distances…",
    "Finding food & local spots…",
    "Balancing time and budget…",
    "Finalizing your itinerary…",
  ];

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(!suggestions);

  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [qrTripId, setQrTripId] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState("");

  /* ================= HARD REDIRECT IF NOTHING ================= */
  useEffect(() => {
    if (!suggestions) {
      navigate("/", { replace: true });
    }
  }, [suggestions, navigate]);

  /* ================= LOADING TEXT ================= */
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loading]);

  /* ================= TYPE EFFECT ================= */
  useEffect(() => {
    if (!suggestions?.text) return;

    setLoading(false);
    setIsTyping(true);
    setFinalText("");
    setDisplayText("");
    setIsEditing(false);

    const lines = suggestions.text.split("\n");
    let index = 0;

    const typingInterval = setInterval(() => {
      index++;
      setDisplayText(lines.slice(0, index).join("\n"));

      if (index >= lines.length) {
        clearInterval(typingInterval);
        setFinalText(suggestions.text);
        setDisplayText("");
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [suggestions]);

  /* ================= QR ================= */
  const handleGenerateQR = async () => {
    if (!finalText || qrLoading) return;

    setQrLoading(true);
    setQrError("");

    try {
      const res = await fetch("http://localhost:5001/api/qr-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: finalText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setQrTripId(data.qrTripId);
    } catch {
      setQrError("Failed to generate QR. Try again.");
    } finally {
      setQrLoading(false);
    }
  };

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-4">
          <div className="w-14 h-14 border-4 border-[#5b7c67]/30
                          border-t-[#5b7c67]
                          rounded-full animate-spin mx-auto" />
          <p className="font-semibold">✨ Planning your trip</p>
          <p className="text-sm text-gray-500">{messages[step]}</p>
        </div>
      </div>
    );
  }

  /* ================= RESULT ================= */
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl shadow flex justify-between">
          <h2 className="text-xl font-semibold">Your AI Travel Plan</h2>
          <button onClick={() => navigate("/")}>✕</button>
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 rounded-3xl shadow space-y-4">
          <div className="flex justify-end">
            {!isEditing ? (
              <button
                disabled={isTyping}
                onClick={() => setIsEditing(true)}
                className="bg-slate-800 text-white px-4 py-2 rounded"
              >
                ✏️ Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-emerald-600 text-white px-4 py-2 rounded"
              >
                ✅ Save
              </button>
            )}
          </div>

          {isTyping && (
            <pre className="bg-slate-50 p-5 rounded-xl whitespace-pre-wrap">
              {displayText}
              <span className="animate-pulse">▍</span>
            </pre>
          )}

          {!isTyping && !isEditing && (
            <pre className="bg-slate-50 p-5 rounded-xl whitespace-pre-wrap">
              {finalText}
            </pre>
          )}

          {isEditing && (
            <textarea
              value={finalText}
              onChange={(e) => setFinalText(e.target.value)}
              className="w-full min-h-[300px] border rounded-xl p-4"
            />
          )}
        </div>

        {/* QR */}
        <button
          onClick={handleGenerateQR}
          disabled={!finalText || isEditing || qrLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {qrLoading ? "Generating QR..." : "📱 Generate QR"}
        </button>

        {qrTripId && (
          <div className="flex flex-col items-center">
            <QRCodeCanvas
              value={`${window.location.origin}/qr-trip/${qrTripId}`}
              size={220}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripResults;
