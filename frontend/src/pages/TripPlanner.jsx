import { useState ,useEffect} from "react";

const TripPlannerPage = ({
  tripType = "multi",
  setTripType = () => {},
  days = 3,
  setDays = () => {},
  hours = 4,
  setHours = () => {},
  place = "",
  setPlace = () => {},
  group = "Family",
  setGroup = () => {},
  suggestions = "",
  setSuggestions = () => {},
  onSubmit = () => {},
  loading = false,
}) => {

  const [step, setStep] = useState(1);
  const [destinationMode, setDestinationMode] = useState("single");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  useEffect(() => {
    if (!place || place.length < 3) {
      setCitySuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(
            place
          )}&maxRows=8&featureClass=P&username=praseed`
        );

        const data = await res.json();
        setCitySuggestions(data.geonames || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("GeoNames error");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [place]);

  // single | multi

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Build your trip, step by step
          </h1>
          <p className="text-gray-500 mt-2">
            Answer a few questions and let AI plan the rest.
          </p>
        </div>

        {/* ===== PROGRESS ===== */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 mx-1 rounded-full ${
                step >= s ? "bg-[#5b7c67]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-800">
              What kind of trip is this?
            </h2>

            {/* Single / Multi destination */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "single", label: "Single destination" },
                { key: "multi", label: "Multiple destinations" },
              ].map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDestinationMode(d.key)}
                  className={`rounded-xl border p-4 text-sm font-medium transition
                    ${
                      destinationMode === d.key
                        ? "border-[#5b7c67] bg-[#5b7c67]/10"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Destination input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700">
                Destination {destinationMode === "multi" && "(comma separated)"}
              </label>
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder={
                  destinationMode === "single"
                    ? "e.g. Jaipur"
                    : "e.g. Delhi, Jaipur, Jaisalmer"
                }
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />

              {/* Autocomplete */}
              {showSuggestions && citySuggestions.length > 0 && destinationMode === "single" && (
                <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                  {citySuggestions.map((city) => (
                    <div
                      key={city.geonameId}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setPlace(`${city.name}, ${city.countryName}`);
                        setShowSuggestions(false);
                      }}
                    >
                      <strong>{city.name}</strong>
                      {city.adminName1 ? `, ${city.adminName1}` : ""}
                      {city.countryName ? `, ${city.countryName}` : ""}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-800">
              How long is your trip?
            </h2>

            {/* Trip type */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: "hours", label: "Few hours" },
                { key: "day", label: "One day" },
                { key: "multi", label: "Multiple days" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTripType(t.key)}
                  className={`rounded-xl border p-4 text-sm font-medium transition
                    ${
                      tripType === t.key
                        ? "border-[#5b7c67] bg-[#5b7c67]/10"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tripType === "hours" && (
              <input
                type="number"
                min={1}
                max={12}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Number of hours"
              />
            )}

            {tripType === "multi" && (
              <input
                type="number"
                min={2}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Number of days"
              />
            )}
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-800">
              Final details
            </h2>

            {/* Travel group */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Travel group
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Solo", "Couple", "Family", "Friends"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    className={`rounded-lg border px-3 py-2 text-sm transition
                      ${
                        group === g
                          ? "border-[#5b7c67] bg-[#5b7c67]/10"
                          : "hover:bg-gray-50"
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <input
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="Any preferences? (cafes, slow pace, nature…)"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        )}

        {/* ===== ACTIONS ===== */}
        <div className="flex justify-between mt-10">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-3 rounded-full border disabled:opacity-40"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-3 rounded-full bg-[#5b7c67] text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-full bg-[#5b7c67] text-white disabled:opacity-60"
            >
              {loading ? "Planning…" : "Generate itinerary"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage;
