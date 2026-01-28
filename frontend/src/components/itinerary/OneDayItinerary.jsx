import React, { useState } from "react";

const getBudgetText = (data) => {
  if (data?.estimatedBudget) return data.estimatedBudget;

  const sections = data?.days?.[0]?.sections || [];
  const budgetSection = sections.find(s =>
    s.period.toLowerCase().includes("estimated budget")
  );

  return budgetSection?.activities?.[0]?.description || null;
};

const OneDayItinerary = ({ data, city, startDate }) => {
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);

  if (!data?.days?.length) {
    return <p className="text-sm text-gray-500">No itinerary available</p>;
  }

  const day = data.days[0];

  const transportSection = day.sections?.find(
    s => s.period.toLowerCase() === "transportation"
  );

  const normalSections = day.sections?.filter(
    s => s.period.toLowerCase() !== "transportation"
  );

  // 🔹 Budget extraction
const budgetText = getBudgetText(data);



  return (
    <div className="space-y-8 animate-fade-in">
      {city && (
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {city}
            <span className="text-gray-400 font-normal mx-2">·</span>
            <span className="text-gray-500 text-lg font-normal">
              {startDate
                ? new Date(startDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "1-Day Guide"}
            </span>
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
            <div className="font-semibold text-emerald-800">
              💰 Estimated Budget (per person)
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
              <p>• Calculated per person for one full day</p>
              <p>• Includes food, local transport & attractions</p>
              <p>• Excludes flights & accommodation</p>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-100 ml-4 pl-8 space-y-10">
        {normalSections.map((section, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full bg-indigo-500 ring-2 ring-indigo-50" />

            <h4 className="text-sm font-bold uppercase text-gray-500 mb-4">
              {section.period}
            </h4>

            {section.activities.map((act, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-5 mb-4 hover:bg-white hover:shadow-md transition"
              >
                <p className="text-gray-800 font-medium">
                  {act.description}
                </p>

                {act.location && (
                  <div className="mt-2 text-xs text-indigo-600 flex items-center gap-1">
                    📍 {act.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Transportation */}
      {transportSection && (
        <div className="mt-6 ml-4 pl-8 border-l-2 border-dashed border-gray-200">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Getting Around</h4>
            {transportSection.activities.map((act, i) => (
              <p key={i} className="text-sm text-gray-600">
                {act.description}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OneDayItinerary;
