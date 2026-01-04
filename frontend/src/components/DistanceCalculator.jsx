import { useState } from "react";

export default function DistanceCalculator({ onBack }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState("driving");

const openGoogleMaps = () => {
  if (!from || !to) {
    alert("Please enter both locations");
    return;
  }

  const url =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${encodeURIComponent(from)}` +
    `&destination=${encodeURIComponent(to)}` +
    `&travelmode=${mode}`;

  window.open(url, "_blank");
};


  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Distance Calculator
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      </div>

      {/* Inputs */}
      <input
        placeholder="From (e.g. Delhi)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      />

      <input
        placeholder="To (e.g. Jaipur)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      >
        <option value="driving">🚗 Car</option>
        <option value="transit">🚆 Public transport</option>
        <option value="walking">🚶 Walking</option>
        <option value="bicycling">🚴 Bike</option>
      </select>

      {/* Action */}
      <button
        onClick={openGoogleMaps}
        className="w-full rounded-full bg-[#5b7c67] py-3 text-white font-medium"
      >
        View route on Google Maps
      </button>

      <p className="text-xs text-gray-500 text-center">
        Opens Google Maps in a new tab with live distance & routes.
      </p>
    </div>
  );
}
