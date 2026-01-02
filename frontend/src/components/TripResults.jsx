import React, { useState, useEffect } from "react";

const TripResults = ({ suggestions, loading, onClose }) => {
  const messages = [
    "Understanding your preferences…",
    "Analyzing routes & distances…",
    "Finding food & local spots…",
    "Balancing time and budget…",
    "Finalizing your itinerary…",
  ];

  const [step, setStep] = useState(0);
  const [isEditing , setIsEditing]=useState(false);
  const [editableText , setEditableText ] = useState("");


  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
  if (suggestions?.text) {
    setEditableText(suggestions.text);
    setIsEditing(false);
  }
}, [suggestions]);


  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12
                        text-center space-y-6 max-w-md w-full">

          <div className="w-14 h-14 border-4 border-[#5b7c67]/30
                          border-t-[#5b7c67]
                          rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-800">
            ✨ Planning your trip
          </p>

          <p className="text-sm text-gray-600">
            {messages[step]}
          </p>

          <div className="text-xs text-gray-400 space-y-1">
            <p>AI may take 10–25 seconds</p>
            <p>Please don’t refresh the page</p>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#5b7c67]
                            animate-[progress_2.5s_ease-in-out_infinite]" />
          </div>

        </div>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!suggestions?.text) {
    return (
      <div className="pt-24 text-center text-gray-600 px-4">
        No itinerary generated.
      </div>
    );
  }

  /* ================= RESULT ================= */
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8
                        flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Your AI Travel Plan
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* AI Output */}
                    {/* AI Output */}
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-4">

              {/* Top bar */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Itinerary
                </h3>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-[#5b7c67] hover:underline"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditableText(suggestions.text); // revert changes
                      }}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      ❌ Cancel
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // update AI text in same page
                        suggestions.text = editableText;
                      }}
                      className="text-sm text-[#5b7c67] font-medium hover:underline"
                    >
                      💾 Save
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              {!isEditing ? (
                <pre className="bg-slate-50 border border-slate-200 rounded-xl
                                p-4 md:p-6 text-slate-700 text-[15px]
                                leading-[1.7] font-serif
                                whitespace-pre-wrap break-words overflow-x-auto">
                  {editableText}
                </pre>
              ) : (
                <textarea
                  value={editableText}
                  onChange={(e) => setEditableText(e.target.value)}
                  rows={Math.max(12, editableText.split("\n").length)}
                  className="w-full rounded-xl border border-gray-200
                            p-4 md:p-6 text-[15px] leading-relaxed
                            font-serif bg-slate-50
                            focus:outline-none focus:ring-2
                            focus:ring-[#5b7c67]/30"
                />
              )}

            </div>


        {/* Actions */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8
                        flex flex-wrap gap-4 justify-center md:justify-between">

          <button className="rounded-full bg-[#5b7c67] px-6 py-3
                             text-white text-sm font-medium hover:bg-[#4a6a58]">
            💾 Save
          </button>

          <button className="rounded-full border border-gray-300 px-6 py-3
                             text-sm font-medium text-gray-700 hover:bg-gray-50">
            📤 Share
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-full border border-gray-300 px-6 py-3
                       text-sm font-medium text-gray-700 hover:bg-gray-50">
            🖨️ Print
          </button>

        </div>

        <div className="text-center text-xs text-gray-500">
          ✨ Generated by AI. Times and costs are approximate.
        </div>

      </div>
    </div>
  );
};

export default TripResults;
