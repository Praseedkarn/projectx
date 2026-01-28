import React, { useState } from "react";

const getBudgetText = (data) => {
  if (data?.estimatedBudget) return data.estimatedBudget;

  const sections = data?.days?.[0]?.sections || [];
  const budgetSection = sections.find(s =>
    s.period.toLowerCase().includes("estimated budget")
  );

  return budgetSection?.activities?.[0]?.description || null;
};
const HoursItinerary = ({ data, city }) => {
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);

  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const sections = data.days[0].sections || [];

  const transportSection = sections.find(
    s => s.period.toLowerCase() === "transportation"
  );

  const hours = sections
    .filter(s => s.period.toLowerCase() !== "transportation")
    .flatMap(section =>
      section.activities.map(act => ({
        description: act.description,
        location: act.location,
      }))
    );

  // 🔹 Budget extraction
const budgetText = getBudgetText(data);




  return (
    <div className="space-y-8 animate-fade-in">
      {city && (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="text-2xl">⏳</span>
          <h2 className="text-xl font-bold text-gray-900">
            Hourly Plan for {city}
          </h2>
        </div>
      )}

      {/* 💰 Budget */}
      {budgetText && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 overflow-hidden">
          <button
            onClick={() => setShowBudgetDetails(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              💰 Estimated Budget
            </div>
            <span className="text-sm text-emerald-700">
              {showBudgetDetails ? "Hide details ▲" : "View details ▼"}
            </span>
          </button>

          <div className="px-5 pb-4 text-sm text-emerald-900">
            {budgetText}
          </div>

          {showBudgetDetails && (
            <div className="px-5 pb-5 pt-2 text-xs text-emerald-700 space-y-1 border-t border-emerald-100">
              <p>• Estimated for this visit (single day / few hours)</p>
              <p>• Includes food, local transport & entry fees</p>
              <p>• Excludes flights & accommodation</p>
            </div>
          )}
        </div>
      )}

      {/* Hours list */}
      <div className="grid gap-4">
        {hours.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition"
          >
            <div className="w-14 text-right">
              <div className="text-xs text-gray-400 uppercase">Hour</div>
              <div className="text-2xl font-bold text-indigo-600">
                {index + 1}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-800 font-medium">{item.description}</p>
              {item.location && (
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  📍 {item.location}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Transportation */}
      {transportSection && (
        <div className="pt-6 border-t border-gray-100">
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
            🚕
            <div>
              <h4 className="font-bold text-gray-900 mb-1">
                Transportation & Logistics
              </h4>
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

export default HoursItinerary;
