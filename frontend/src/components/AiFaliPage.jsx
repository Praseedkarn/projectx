import React from "react";
import { useNavigate } from "react-router-dom";
import aiFailMessages from "../data/aiFailMessages";

const AiFailPage = () => {
  const navigate = useNavigate();

  // pick random funny message
  const random =
    aiFailMessages[Math.floor(Math.random() * aiFailMessages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold">{random.title}</h2>

        <p className="text-gray-600">{random.message}</p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-[#5b7c67] px-6 py-3 text-white
                       hover:bg-[#4a6a58] transition"
          >
            🔄 Try again
          </button>

          <button
            onClick={() => navigate("/help")}
            className="rounded-full border px-6 py-3 text-gray-700
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
