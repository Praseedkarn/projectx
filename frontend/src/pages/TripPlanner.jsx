import React from "react";

function PlanPage({
  formCardRef,
  handleSubmit,
  tripType,
  setTripType,
  hours,
  setHours,
  days,
  setDays,
  multiStartDate,
  setMultiStartDate,
  place,
  setPlace,
  group,
  setGroup,
  suggestions,
  setSuggestions,
  addSuggestion,
  loading,
  citySuggestions,
  showSuggestions,
  setShowSuggestions,
  tripDate,
  setTripDate,
}) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      <div ref={formCardRef} className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative z-10">

        {/* ================= HEADER ================= */}
        <header className="mb-20 space-y-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-[#1a1a1a]">
            Design Your <br />
            <span className="text-[#5b6f00]">Perfect Trip.</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-24">

          {/* ================= TRIP TYPE ================= */}
          <section className="space-y-8">
            <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
              Trip Style
            </h2>

            <div className="inline-flex p-1.5 bg-gray-100 rounded-[24px] border">
              {[
                { id: "hours", label: "Few Hours" },
                { id: "day", label: "One Day" },
                { id: "multi", label: "Multi-Day" }
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setTripType(style.id)}
                  className={`px-8 py-3 rounded-[20px] transition ${tripType === style.id
                    ? "bg-white text-[#5b6f00] shadow"
                    : "text-gray-500"
                    }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </section>

          {/* ================= DESTINATION ================= */}
          <section className="space-y-8">
            <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
              Destination
            </h2>

            <div className="relative">
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Where are you heading?"
                className="w-full text-3xl border-b-2 border-gray-200 focus:border-[#5b6f00] outline-none py-4"
              />

              {showSuggestions && citySuggestions?.length > 0 && (
                <div className="absolute w-full bg-white border rounded-xl shadow mt-2 z-50">
                  {citySuggestions.map((city) => (
                    <button
                      key={city.geonameId}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setPlace(`${city.name}, ${city.countryName}`);
                        setShowSuggestions(false);
                      }}
                      className="block w-full text-left px-6 py-3 hover:bg-gray-50"
                    >
                      <strong>{city.name}</strong>, {city.countryName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ================= DATE & DURATION ================= */}
          <section className="grid md:grid-cols-2 gap-16">

            {/* DATE */}
            <div className="space-y-6">
              <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
                Starting
              </h2>

              {tripType === "day" || tripType === "multi" ? (
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={tripType === "day" ? tripDate : multiStartDate}
                  onChange={(e) =>
                    tripType === "day"
                      ? setTripDate(e.target.value)
                      : setMultiStartDate(e.target.value)
                  }
                  className="w-full rounded-xl bg-gray-50 px-6 py-4"
                />
              ) : (
                <div className="p-6 bg-gray-50 rounded-xl text-gray-500">
                  No fixed date required.
                </div>
              )}
            </div>

            {/* DURATION */}
            <div className="space-y-6">
              <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
                Duration
              </h2>

              {/* HOURS */}
              {tripType === "hours" && (
                <DurationControl
                  value={hours}
                  setValue={setHours}
                  min={1}
                  max={12}
                  label="Hour"
                />
              )}

              {/* ONE DAY */}
              {tripType === "day" && (
                <div className="p-6 bg-gray-50 rounded-full text-center max-w-[200px]">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs uppercase text-gray-400">Day</div>
                </div>
              )}

              {/* MULTI DAY */}
              {tripType === "multi" && (
                <DurationControl
                  value={days}
                  setValue={setDays}
                  min={1}
                  max={14}
                  label="Day"
                />
              )}
            </div>
          </section>

          {/* ================= TRAVEL GROUP ================= */}
          <section className="space-y-6">
            <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
              Travel Group
            </h2>

            <div className="flex flex-wrap gap-4">
              {["Solo", "Couple", "Family", "Friends"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`px-6 py-3 rounded-full border ${group === g
                    ? "bg-[#5b6f00] text-white"
                    : "bg-white text-gray-600"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </section>

          {/* ================= ACTIVITIES ================= */}
          <section className="space-y-6">
            <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
              Activities
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Nature",
                "Culture",
                "Hidden Gems",
                "Photography",
                "Cafes",
                "Adventure",
                "Museums",
                "Relaxation",
                "Nightlife",
                "Shopping",
              ].map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => addSuggestion(activity)}
                  className="px-4 py-2 rounded-full border text-sm"
                >
                  + {activity}
                </button>
              ))}
            </div>
          </section>

          {/* ================= PREFERENCES ================= */}
          <section className="space-y-6">
            <h2 className="text-sm uppercase font-bold text-[#5b6f00]">
              Special Preferences
            </h2>

            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="Vegetarian food, avoid stairs..."
              className="w-full rounded-xl bg-gray-50 p-6 min-h-[120px]"
            />
          </section>

          {/* ================= CTA ================= */}
          <div className="pt-12 text-center">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-black text-white px-12 py-5 disabled:opacity-50"
            >
              {loading
                ? "Calculating Route..."
                : "Generate My Itinerary"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE DURATION CONTROL ================= */
function DurationControl({ value, setValue, min, max, label }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-full bg-gray-50 border max-w-[280px]">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        className="w-10 h-10 bg-white rounded-full shadow"
      >
        –
      </button>

      <div className="text-center">
        <span className="text-2xl font-bold">{value}</span>
        <span className="block text-xs uppercase text-gray-400">
          {value === 1 ? label : label + "s"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        className="w-10 h-10 bg-white rounded-full shadow"
      >
        +
      </button>
    </div>
  );
}

export default PlanPage;