import React, { useEffect, useState } from "react";
import SimpleLoader from "../components/LogoLoader";
import worldIllustration from "../assets/illustrations/undraw_connected-world_anke.svg";
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
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <SimpleLoader />;
  }

  return (
    <div
      ref={formCardRef}
      className="bg-white/90 backdrop-blur-3xl rounded-[24px] md:rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-white/40 p-6 md:p-10 lg:p-12 w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center justify-between mb-8">
         {/* HEADER */}
{/* CARD HEADER */}
<div className="flex items-center justify-between mb-6">

  {/* Left Side: Icon + Title */}
  <div className="flex items-center gap-2">
   
    <h2 className="text-sm font-semibold text-[#1f2d1f]">
      ✧ Smart AI Trip Planner
    </h2>
  </div>

  {/* Right Side: World Sticker */}
  <img
    src={worldIllustration}
    alt="World"
    className="w-18 h-16 object-contain absolute right-7 opacity-70"
  />

</div>
        </div>

        {/* TRIP STYLE */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-[#5b6f00] uppercase tracking-[0.2em]">
            Trip Style
          </h2>

          <div className="grid grid-cols-3 bg-[#f3f4ee] p-1.5 rounded-2xl w-full border border-[#1f2d1f]/5">
            {[
              { id: "hours", label: "Few Hours" },
              { id: "day", label: "One Day" },
              { id: "multi", label: "Multi-Day" }
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setTripType(style.id)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${tripType === style.id
                  ? "bg-[#5b6f00] text-white shadow-[0_4px_12px_rgba(91,111,0,0.25)]"
                  : "text-[#6b7280] hover:text-[#1f2d1f] hover:bg-white/50"
                  }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </section>

        {/* DESTINATION */}
        {/* DESTINATION */}
        {/* DESTINATION */}
<section className="space-y-4">
  <h3 className="text-xs font-bold text-[#5b6f00] uppercase tracking-[0.2em]">
    Destination
  </h3>

  <div className="relative group">

    {/* Location Icon */}
    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M12 2a7 7 0 00-7 7c0 4.25 7 13 7 13s7-8.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
          clipRule="evenodd"
        />
      </svg>
    </span>

    {/* Input Field */}
    <input
      value={place}
      onChange={(e) => setPlace(e.target.value)}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      placeholder="Where are you going?"
      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#fafaf7] text-sm font-medium border border-[#1f2d1f]/5 focus:border-[#5b6f00]/40 focus:bg-white focus:ring-4 focus:ring-[#5b6f00]/5 outline-none transition-all duration-300"
    />

    {/* Suggestions Dropdown */}
    {showSuggestions && citySuggestions?.length > 0 && (
      <div className="absolute w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 overflow-hidden">
        {citySuggestions.map((city) => (
          <button
            key={city.geonameId}
            onMouseDown={(e) => {
              e.preventDefault();
              setPlace(`${city.name}, ${city.countryName}`);
              setShowSuggestions(false);
            }}
            className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
          >
            <strong>{city.name}</strong>, {city.countryName}
          </button>
        ))}
      </div>
    )}
  </div>
</section>

        {/* DATE + DURATION */}
        <section className="grid grid-cols-2 gap-4">

          {/* DATE */}
          <div className="space-y-1">
            <h2 className="text-[11px] uppercase font-semibold text-[#5b6f00]">
              Date
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
                className="w-full rounded-lg bg-gray-50 px-3 py-2 text-xs"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 text-xs">
                Flexible
              </div>
            )}
          </div>

          {/* DURATION */}
          <div className="space-y-1">
            <h2 className="text-[11px] uppercase font-semibold text-[#5b6f00]">
              Duration
            </h2>

            {tripType === "hours" && (
              <CompactDuration
                value={hours}
                setValue={setHours}
                min={1}
                max={12}
                label="Hr"
              />
            )}

            {tripType === "day" && (
              <div className="p-2 bg-gray-50 rounded-lg text-center text-xs font-medium">
                1 Day
              </div>
            )}

            {tripType === "multi" && (
              <CompactDuration
                value={days}
                setValue={setDays}
                min={1}
                max={14}
                label="Day"
              />
            )}
          </div>

        </section>

        {/* GROUP */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-[#5b6f00] uppercase tracking-wider">
            Travel Group
          </h2>



          {/* ACTIVITIES */}
          <section className="space-y-2">


            <div className="grid grid-cols-4 gap-2">
              {["Solo", "Couple", "Family", "Friends"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`py-2 rounded-full text-sm font-medium border transition-all ${group === g
                    ? "bg-[#5b6f00] text-white border-[#5b6f00] shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* SPECIAL PREFERENCES */}

          </section>
          {/* ACTIVITIES */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold text-[#5b6f00] uppercase tracking-wider">
              Activities
            </h2>

            <div className="flex flex-wrap gap-2">
              {[
                "Nature",
                "Culture",
                "Cafes",
                "Adventure",
                "Beaches",
                "Nightlife",
                "Hidden Gems",
                "Museums",
              ].map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => addSuggestion(activity)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white 
        hover:bg-gray-50 transition-all"
                >
                  + {activity}
                </button>
              ))}
            </div>
          </section>

          {/* SPECIAL PREFERENCES */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-[#5b6f00] uppercase tracking-wider">
              Special Preferences
            </h2>

            <div className="relative">
              <input
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Early morning, vegetarian, budget..."
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm 
      border border-gray-200 outline-none 
      focus:border-[#5b6f00] focus:ring-1 focus:ring-[#5b6f00]/20 transition"
              />


            </div>
          </section>
        </section>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#5b6f00] hover:bg-[#4e6100] text-white py-2.5 text-sm font-medium transition shadow-md"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>

      </form>
    </div>
  );
  /* ================= REUSABLE DURATION CONTROL ================= */
  function CompactDuration({ value, setValue, min, max, label }) {
    return (
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - 1))}
          className="text-sm px-2"
        >
          –
        </button>

        <span className="text-xs font-medium">
          {value} {label}
        </span>

        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + 1))}
          className="text-sm px-2"
        >
          +
        </button>
      </div>
    );
  }

}

export default PlanPage;