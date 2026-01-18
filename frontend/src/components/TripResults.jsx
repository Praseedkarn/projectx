import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const TextSkeleton = ({ lines = 6 }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 rounded bg-gray-200 ${i === lines - 1 ? "w-3/4" : "w-full"
          }`}
      />
    ))}
  </div>
);


const TripResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const isDemo = location.state?.isDemo;
  const demoReason = location.state?.reason;

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
  const [loading, setLoading] = useState(true);

  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [qrTripId, setQrTripId] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);

  const [guide, setGuide] = useState(null);

  const [cityInfo, setCityInfo] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const [osmData, setOsmData] = useState(null);
  const [osmLoading, setOsmLoading] = useState(false);
  const [osmError, setOsmError] = useState("");
  const [activeAttraction, setActiveAttraction] = useState(null);
  const [attractionSummary, setAttractionSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);


  /* ================= HARD REDIRECT IF NOTHING ================= */
  useEffect(() => {
    if (!suggestions) {
      navigate("/", { replace: true });
    }
  }, [suggestions, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  /* ================= LOADING TEXT ================= */
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loading ,messages.length]);

  /* ================= GUIDE (STAGE 1 - MANUAL) ================= */

  useEffect(() => {
    if (!city) return;

    const fetchGuide = async () => {
      try {


        const res = await fetch(
          `https://projectx-yzu3.onrender.com/api/guides?city=${city}`
        );

        const data = await res.json();

        if (data.available) {
          setGuide(data.guide);
        } else {
          setGuide(null);
        }
      } catch (err) {
        console.error("Failed to fetch guide");
        setGuide(null);
      } finally {

      }
    };

    fetchGuide();
  }, [city]);

  useEffect(() => {
    if (!city) return;

    const fetchCityInfo = async () => {
      try {
        setCityLoading(true);
        const res = await fetch(
          `https://projectx-yzu3.onrender.com/api/wiki?query=${encodeURIComponent(city)}`
        );
        const data = await res.json();

        if (data.available) {
          setCityInfo(data);
        } else {
          setCityInfo(null);
        }
      } catch {
        setCityInfo(null);
      } finally {
        setCityLoading(false);
      }
    };

    fetchCityInfo();
  }, [city]);

  useEffect(() => {
    if (!city) return;

    const fetchOSMData = async () => {
      try {
        setOsmLoading(true);
        setOsmError("");
        setOsmData(null);

        const res = await fetch(
          `https://projectx-yzu3.onrender.com/api/osm?city=${encodeURIComponent(city)}`
        );

        if (!res.ok) throw new Error("OSM request failed");

        const data = await res.json();

        if (data.available) {
          setOsmData(data);
        } else {
          setOsmData(null);
        }
      } catch (err) {
        setOsmError("Failed to load nearby places");
        setOsmData(null);
      } finally {
        setOsmLoading(false);
      }
    };

    fetchOSMData();
  }, [city]);

  const handleAttractionClick = async (place) => {
    // Toggle close
    if (activeAttraction === place.id) {
      setActiveAttraction(null);
      setAttractionSummary(null);
      return;
    }

    setActiveAttraction(place.id);
    setAttractionSummary(null);
    setSummaryLoading(true);

    try {
      const query = `${place.name} ${city}`;
      const res = await fetch(
        `https://projectx-yzu3.onrender.com/api/wiki?query=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (data.available) {
        setAttractionSummary(data);
      } else {
        setAttractionSummary({
          title: place.name,
          description: "No summary available for this place.",
        });
      }
    } catch {
      setAttractionSummary({
        title: place.name,
        description: "Failed to load information.",
      });
    } finally {
      setSummaryLoading(false);
    }
  };






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
    }, 110 + Math.random() * 40);

    return () => clearInterval(typingInterval);
  }, [suggestions]);

  /* ================= QR ================= */
  const handleGenerateQR = async () => {
    if (!finalText || qrLoading) return;

    setQrLoading(true);


    try {
      const res = await fetch("https://projectx-yzu3.onrender.com/api/qr-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: finalText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setQrTripId(data.qrTripId);
    } catch {

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
    <div className=" pt-16 sm:pt-20 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-4  sm:p-6 rounded-3xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-x font-semibold">
            Your AI Travel Plan
          </h2>


          {isDemo && (
            <div className="inline-flex items-center gap-2 text-xs
                            bg-yellow-100 text-yellow-800
                            px-3 py-1 rounded-full w-fit">
              ⚠ Demo result
            </div>
          )}

          {isDemo && demoReason && (
            <p className="text-xs text-gray-500">
              {demoReason}
            </p>
          )}
          <button onClick={() => navigate("/")}>✕</button>

        </div>

        {/* ================= CITY INFO (WIKIPEDIA) ================= */}
        {city && (
          <div className="bg-white rounded-3xl shadow p-6 space-y-4">
            {cityLoading ? (
              <p className="text-gray-500 text-sm">
                Loading information about {city}…
              </p>
            ) : cityInfo ? (
              <>
                <h2 className="text-2xl font-semibold">
                  About {cityInfo.title}
                </h2>

                {cityInfo.image && (
                  <img
                    src={cityInfo.image}
                    alt={cityInfo.title}
                    className="w-full max-h-64 object-cover rounded-xl"
                  />
                )}

                <p className="text-gray-700 leading-relaxed">
                  {cityInfo.description}
                </p>

                <a
                  href={cityInfo.wikipediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 text-sm font-medium"
                >
                  Read more on Wikipedia →
                </a>
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                No information found for {city}.
              </p>
            )}
          </div>
        )}

        {city && (
          <div className="bg-white rounded-3xl shadow p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Explore {city}
            </h3>

            <p className="text-sm text-gray-500">
              Zoom in to see famous places, attractions, and landmarks
            </p>

            <iframe
              title="city-attractions-map"
              className="w-full h-96 rounded-xl"
              loading="lazy"
              src={`https://www.google.com/maps?q=top+tourist+attractions+in+${encodeURIComponent(
                city
              )}&z=13&output=embed`}
            />
          </div>
        )}




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

{/* AI TEXT AREA */}
<div
  className="
    sm:bg-slate-50
    sm:rounded-xl
    sm:p-5

    p-0
    text-[15px] sm:text-base
    leading-7
    font-['Inter']
    whitespace-pre-wrap
    break-words
    text-gray-800
  "
>
  {/* Skeleton */}
  {isTyping && displayText === "" && (
    <TextSkeleton lines={6} />
  )}

  {/* Typing animation */}
  {isTyping && displayText !== "" && (
    <div className="block">
      {displayText}
      <span className="ml-1 animate-pulse">▍</span>
    </div>
  )}

  {/* Final text */}
  {!isTyping && !isEditing && finalText && (
    <div className="whitespace-pre-wrap break-words">
      {finalText}
    </div>
  )}
</div>



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
          <div className="flex flex-col items-center gap-3 mt-4">

            <QRCodeCanvas
              value={`${window.location.origin}/qr-trip/${qrTripId}`}
              size={220}
            />

            {/* Clickable link */}
            <a
              href={`${window.location.origin}/qr-trip/${qrTripId}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-indigo-600 underline break-all"
            >
              {window.location.origin}/qr-trip/{qrTripId}
            </a>

            {/* Expiry note */}
            <p className="text-xs text-gray-500">
              ⏳ This QR link will expire in <strong>7 days</strong>
            </p>

          </div>
        )}

        {/* ================= HOTELS & ATTRACTIONS (OSM) ================= */}
        {city && (
          <div className="bg-white rounded-3xl shadow p-6 space-y-6">

            <h2 className="text-xl font-semibold">
              Hotels & Attractions in {city}
            </h2>


            {osmData?.fallback && (
              <div className="bg-yellow-50 border rounded-xl p-3 text-sm text-gray-700">
                {osmData.fallbackReason === "UNSUPPORTED_CITY" && (
                  <>🚧 Detailed hotel & attraction support for <strong>{city}</strong> is coming soon.</>
                )}

                {osmData.fallbackReason === "NO_DATA" && (
                  <>ℹ️ Limited nearby hotel & attraction data available for <strong>{city}</strong>.</>
                )}

                {osmData.fallbackReason === "OVERPASS_ERROR" && (
                  <>⚠️ Map services are busy right now. Showing limited results.</>
                )}
              </div>
            )}




            {/* Loading */}
            {osmLoading && (
              <p className="text-sm text-gray-500">
                Finding nearby hotels & attractions…
              </p>
            )}

            {/* Error */}
            {!osmLoading && osmError && !osmData?.fallback && (
              <p className="text-sm text-red-500">{osmError}</p>
            )}


            {/* Data */}
            {!osmLoading && osmData && (
              <>
                {/* HOTELS */}
                <div>
                  <h3 className="text-lg font-medium mb-3">🏨 Hotels</h3>

                  {osmData.hotels.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hotels found nearby
                    </p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {osmData.hotels.slice(0, 8).map((hotel) => (
                        <div
                          key={hotel.id}
                          className="border rounded-xl p-4 hover:shadow transition"
                        >
                          <p className="font-medium text-gray-800">
                            {hotel.name}
                          </p>

                          {hotel.stars && (
                            <p className="text-sm text-gray-600">
                              ⭐ {hotel.stars} star
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ATTRACTIONS */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    📍 Tourist Attractions
                  </h3>

                  {osmData.attractions.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No attractions found nearby
                    </p>
                  ) : (
                    <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                      {osmData.attractions.slice(0, 10).map((place) => (
                        <li key={place.id} className="space-y-2">
                          <button
                            onClick={() => handleAttractionClick(place)}
                            className="font-medium text-left text-gray-800 hover:underline"
                          >
                            {place.name}
                          </button>

                          {place.mapsLink && (
                            <a
                              href={place.mapsLink}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-indigo-600 underline text-xs"
                            >
                              View on map
                            </a>
                          )}

                          {/* EXPANDABLE SUMMARY CARD */}
                          {activeAttraction === place.id && (
                            <div className="mt-2 border rounded-xl p-4 bg-slate-50">
                              {summaryLoading ? (
                                <p className="text-sm text-gray-500">Loading details…</p>
                              ) : (
                                <>
                                  <h4 className="font-semibold text-gray-800">
                                    {attractionSummary?.title}
                                  </h4>

                                  <p className="text-sm text-gray-700 mt-1">
                                    {attractionSummary?.description}
                                  </p>

                                  {attractionSummary?.wikipediaUrl && (
                                    <a
                                      href={attractionSummary.wikipediaUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-indigo-600 underline mt-2 inline-block"
                                    >
                                      Read more on Wikipedia →
                                    </a>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </li>


                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        )}


        {/* ================= LOCAL GUIDE CARD ================= */}
        <div className="mt-10">
          {city && guide ? (
            <div className="bg-green-50 border border-green-200
                            rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800">
                Local Guide Available in {city}
              </h3>

              <p className="mt-2 text-gray-600">
                Explore {city} with a verified local expert.
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p><strong>Name:</strong> {guide.name}</p>
                <p><strong>Languages:</strong> {guide.languages}</p>
              </div>

              <a
                href={`https://wa.me/${guide.phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-5 rounded-full
                          bg-green-600 px-6 py-3 text-white
                          font-medium hover:bg-green-700 transition"
              >
                💬 Contact Guide on WhatsApp
              </a>
            </div>
          ) : city ? (
            <div className="bg-gray-50 border rounded-3xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No Local Guide Available Yet
              </h3>

              <p className="mt-2 text-gray-600">
                Want a local expert for {city}?
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <a
                  href="mailto:l@gmail.com"
                  className="rounded-full border px-5 py-2 text-sm"
                >
                  Email Us
                </a>

                <a
                  href="https://instagram.com/praseed_karn"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border px-5 py-2 text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>
          ) : null}
        </div>


      </div>
    </div>
  );
};

export default TripResults;
