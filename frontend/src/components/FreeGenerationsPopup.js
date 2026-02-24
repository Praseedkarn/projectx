import React from "react";

export default function FreeGenerationPopup({ remaining, onContinue, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl text-center space-y-6">

        <h2 className="text-2xl font-semibold text-gray-800">
          Try Expeditio for Free
        </h2>

       <p>
        {remaining > 0
          ? `You have ${remaining} free ${
              remaining === 1 ? "trip" : "trips"
            } remaining.`
          : "This was your last free trip."}
      </p>

        <p className="text-sm text-gray-500">
          After that, you’ll need to sign in to continue planning.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="px-6 py-2 rounded-lg bg-[#5b7c67] text-white font-medium hover:bg-[#4a6a58]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}