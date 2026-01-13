import React from "react";
import { useNavigate } from "react-router-dom";

const BecomeGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 px-4 bg-transprent">
      <div className="max-w-xl mx-auto">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 relative">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h1 className="text-3xl font-semibold text-gray-800">
            Become a Local Guide 
          </h1>

          <p className="mt-3 text-gray-600">
            Love your city? Help travelers explore it better and earn while on the move.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>✔ Get travelers from your city</li>
            <li>✔ Flexible working hours</li>
            <li>✔ Verified & trusted platform</li>
            <li>✔ Earn per trip</li>
          </ul>

          <div className="mt-8 space-y-3">
            <a
              href="praseedkumar104@gmail.com"
              className="block w-full text-center rounded-full
                         border px-4 py-3 font-medium
                         hover:bg-gray-50"
            >
               Contact via Email
            </a>

            <a
              href="https://instagram.com/praseed_karn"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center rounded-full
                         border px-4 py-3 font-medium
                         hover:bg-gray-50"
            >
               Contact on Instagram
            </a>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center rounded-full
                         bg-green-600 text-white px-4 py-3
                         font-medium hover:bg-green-700"
            >
               WhatsApp Us
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeGuide;
