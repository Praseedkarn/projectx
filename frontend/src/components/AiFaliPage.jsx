import React from "react";
import { useNavigate } from "react-router-dom";
import aiFailMessages from "../data/aiFailMessages";

const AiFailPage = () => {
  const navigate = useNavigate();

  const random =
    aiFailMessages[Math.floor(Math.random() * aiFailMessages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f6f7f9]">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center space-y-5 border border-gray-100">

        <h2 className="text-2xl font-semibold text-[#2f3e2f]">
          {random.title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {random.message}
        </p>

        {/* Subtle Network Hint */}
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
          If you're using a public or shared network (like campus or office WiFi),
          you might temporarily hit usage limits.  
          Try switching to a personal connection and refresh.
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-[#5b7c67] px-6 py-3 text-white
                       hover:bg-[#4a6a58] transition shadow-md"
          >
            🔄 Try again
          </button>

          <button
            onClick={() => navigate("/help")}
            className="rounded-xl border border-gray-200 px-6 py-3 text-gray-700
                       hover:bg-gray-50 transition"
          >
            ❓ Get Help
          </button>
        </div>

      </div>
    </div>
  );
};

export default AiFailPage;