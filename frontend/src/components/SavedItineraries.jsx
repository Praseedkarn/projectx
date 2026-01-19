import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/SavedItineraries.css";
import API_BASE_URL from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const SavedItineraries = ({ onBack }) => {
  const [savedQrs, setSavedQrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSavedQrs = async () => {
      try {
        const token =
            sessionStorage.getItem("token") ||
            localStorage.getItem("token");

        const res = await fetch(
  `${API_BASE_URL}/api/qr-trips/my`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setSavedQrs(data);
      } catch (err) {
        console.error("Failed to fetch saved QRs", err);
        setSavedQrs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedQrs();
  }, []);

  if (loading) {
    return (
      <div className="saved-page">
        <p>Loading saved trips...</p>
      </div>
    );
  }

  if (savedQrs.length === 0) {
    return (
      <div className="saved-page">
        <button onClick={onBack}>← Back</button>
        <h2>No saved trips yet</h2>
        <p>Generate a QR to save your trip</p>
      </div>
    );
  }
return (
  <div className="max-w-6xl mx-auto px-4 pt-24 pb-32 animate-fade-in">
    {/* Back */}
  <button
  onClick={() => navigate(-1)}
  className="mb-6 text-sm font-medium text-indigo-600 hover:underline"
>
  ← Back
</button>


    {/* Title */}
    <h1 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-2">
       My Saved Trips
    </h1>

    {/* Loading */}
    {loading && (
      <p className="text-center text-gray-500">Loading saved trips…</p>
    )}

    {/* Empty */}
    {!loading && savedQrs.length === 0 && (
      <div className="text-center mt-20 space-y-3">
        <div className="text-5xl">⭐</div>
        <h2 className="text-xl font-semibold text-gray-800">
          No saved trips yet
        </h2>
        <p className="text-gray-500">
          Generate a QR to save your trip for later
        </p>
      </div>
    )}

    {/* Grid */}
    {!loading && savedQrs.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {savedQrs.map((item) => (
          <div
            key={item.qrTripId}
            className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center
                       hover:shadow-xl transition-all duration-300"
          >
            {/* QR */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <QRCodeCanvas
                value={`${window.location.origin}/qr-trip/${item.qrTripId}`}
                size={140}
              />
            </div>

            {/* Link */}
            <a
              href={`/qr-trip/${item.qrTripId}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-indigo-600 font-medium text-sm hover:underline"
            >
              Open Trip →
            </a>

            {/* Place */}
            <p className="mt-4 text-sm font-semibold text-gray-800">
              📍 {item.place}
            </p>

            {/* Time */}
            <p className="text-xs text-gray-500">
              Searched on{" "}
              {new Date(item.searchedAt).toLocaleString()}
            </p>


            {/* Expiry */}
            <p className="mt-2 text-xs text-gray-500">
              ⏳ Expires on{" "}
              <strong>
                {new Date(item.expiresAt).toLocaleDateString()}
              </strong>
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

  
};

export default SavedItineraries;
