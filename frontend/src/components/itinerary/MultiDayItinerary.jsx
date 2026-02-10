import React, { useState } from "react";

const MultiDayItinerary = ({ data, city, startDate }) => {
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);

  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

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

  const transportSection = data.days
    .flatMap(d => d.sections || [])
    .find(s => s.period.toLowerCase() === "transportation");

  /* ================= BUDGET ================= */
  let budgetText = data?.estimatedBudget;

  if (!budgetText) {
    const budgetSection = data?.days?.[0]?.sections?.find(
      s => s.period.toLowerCase().includes("budget")
    );
    budgetText = budgetSection?.activities?.[0]?.description;
  }

  return (
    <div className="space-y-12 animate-fade-in">

      {/* Header */}
      {city && (
        <div className="text-center pb-8 border-b border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Trip to {city}
          </h2>
          <p className="text-gray-500">
            A day-by-day roadmap of your adventure
          </p>
        </div>
      )}

      {/* Budget */}
      {budgetText && (
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 overflow-hidden">
          <button
            onClick={() => setShowBudgetDetails(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              💰 Estimated Budget
            </div>

            <span className="text-sm text-emerald-700 font-medium">
              {showBudgetDetails ? "Hide details ▲" : "View details ▼"}
            </span>
          </button>

          <div className="px-5 pb-4 text-sm text-emerald-900">
            {budgetText}
          </div>

          {showBudgetDetails && (
            <div className="px-5 pb-5 pt-2 text-xs text-emerald-700 space-y-2 border-t border-emerald-100">
              <p>• Calculated per person, per day</p>
              <p>• Includes food, local transport & attractions</p>
              <p>• Excludes flights, accommodation & shopping</p>
            </div>
          )}
        </div>
      )}

      {/* Days */}
      <div className="space-y-16">
        {data.days.map((day, index) => {
          const sections = day.sections.filter(
            s => s.period.toLowerCase() !== "transportation"
          );

          return (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {getDateLabel(startDate, index)}
              </h3>

              <div className="grid gap-4">
                {sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-md transition"
                  >
                    <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                      {section.period}
                    </span>

                    <div className="space-y-4">
                      {section.activities.map((act, aIdx) => (
                        <div key={aIdx}>
                          <p className="text-gray-800 leading-relaxed">
                            {act.description}
                          </p>

                          {act.location && (
                            <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                              📍 {act.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Transportation */}
      {transportSection && (
        <div className="mt-12 bg-gray-100 rounded-2xl p-8 shadow-xl">
          <div className="flex gap-4">
            <span className="text-3xl">🚗</span>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Logistics & Transportation
              </h3>
              {transportSection.activities.map((act, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {act.description}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiDayItinerary;
