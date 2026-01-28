import React, { useEffect, useState } from "react";

// const PERIOD_STYLES = {
//   Morning: "bg-yellow-400",
//   Afternoon: "bg-blue-400",
//   Evening: "bg-purple-400",
// };



const MultiDayItinerary = ({ data, city, startDate }) => {
  const [activeDay, setActiveDay] = useState(1);
const [showBudgetDetails, setShowBudgetDetails] = useState(false);

  const getDateLabel = (startDate, index) => {
    if (!startDate) return `Day ${index + 1}`;

    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };


  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("[data-day]");
      let current = 1;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55) {
          current = Number(section.dataset.day);
        }
      });

      setActiveDay(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const transportSection = data.days
    .flatMap(d => d.sections || [])
    .find(s => s.period.toLowerCase() === "transportation");




  return (
    <div className="space-y-12 animate-fade-in">

      {/* Main Header */}
      {city && (
        <div className="text-center pb-8 border-b border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Trip to {city}</h2>
          <p className="text-gray-500">A day-by-day roadmap of your adventure</p>
        </div>
      )}

    {(() => {
  let budgetText = data?.estimatedBudget;

  if (!budgetText) {
    const budgetSection = data?.days?.[0]?.sections?.find(
      s => s.period.toLowerCase().includes("estimated budget")
    );
    budgetText = budgetSection?.activities?.[0]?.description;
  }

  if (!budgetText) return null;

  const totalDays = data?.days?.length || 1;

  return (
    <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 overflow-hidden">
      
      {/* Header */}
      <button
        onClick={() => setShowBudgetDetails(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2 text-emerald-800 font-semibold">
          <span className="text-lg">💰</span>
          <span>Estimated Budget</span>
        </div>

        <span className="text-sm text-emerald-700 font-medium">
          {showBudgetDetails ? "Hide details ▲" : "View details ▼"}
        </span>
      </button>

      {/* Summary */}
      <div className="px-5 pb-4 text-sm text-emerald-900">
        {budgetText}
      </div>

      {/* Expanded Details */}
      {showBudgetDetails && (
        <div className="px-5 pb-5 pt-2 text-xs text-emerald-700 space-y-2 border-t border-emerald-100">
          <p>• Budget is calculated <b>per person, per day</b></p>

          {totalDays > 1 && (
            <p>• Total trip estimate ≈ per-day budget × {totalDays} days</p>
          )}

          <p>• Includes food, local transport, and attraction entry fees</p>
          <p>• Excludes flights, accommodation, and shopping</p>
          <p>• Actual spending may vary based on preferences and season</p>
        </div>
      )}
    </div>
  );
})()}




      <div className="relative space-y-16">
        {/* Continuous Line */}
        <div className="absolute left-4 sm:left-8 top-4 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent" />

        {data.days.map((day, index) => {
          const normalSections = day.sections.filter(
            s => s.period.toLowerCase() !== "transportation"
          );

          const isActive = activeDay === index + 1;

          return (
            <div key={index} data-day={index + 1} className="relative pl-12 sm:pl-24 transition-opacity duration-500">

              {/* Floating Date Marker */}
              <div className={`absolute left-0 sm:left-4 top-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                <div className={`flex flex-col items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full border-4 border-white shadow-sm z-10 
                        ${isActive ? "bg-black text-white ring-4 ring-gray-100" : "bg-white text-gray-400 border-gray-200"}`}>
                  <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                </div>
              </div>

              {/* Day Content Card */}
              <div className={`space-y-6 ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
                <h3 className="text-2xl font-bold text-gray-900">
                  {getDateLabel(startDate, index)}
                </h3>

                <div className="grid gap-4">
                  {normalSections.map((section, sIdx) => {
                    const isMorning = section.period.toLowerCase().includes("morning");
                    const isEvening = section.period.toLowerCase().includes("evening");

                    return (
                      <div key={sIdx} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                                       ${isMorning ? "bg-orange-100 text-orange-700" :
                              isEvening ? "bg-indigo-100 text-indigo-700" :
                                "bg-blue-100 text-blue-700"}`}>
                            {section.period}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {section.activities.map((act, aIdx) => (
                            <div key={aIdx} className="group">
                              <p className="text-gray-800 leading-relaxed">
                                {act.description}
                              </p>
                              {act.location && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400 group-hover:text-indigo-600 transition-colors">
                                  <span>📍</span>
                                  <span>{act.location}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Transportation */}
      {transportSection && (
        <div className="mt-12 bg-gray-100 text-gray-900 rounded-2xl p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <span className="text-3xl"></span>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-black">Logistics & Transportation</h3>
              <div className="space-y-2">
                {transportSection.activities.map((act, i) => (
                  <p key={i} className="leading-relaxed text-sm opacity-90">
                    {act.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MultiDayItinerary;
