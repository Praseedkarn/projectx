import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Terms & Conditions
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-3 text-sm text-gray-700">
          <p>
            Welcome to <strong>Expeditio</strong>. By using this website,
            you agree to these Terms & Conditions.
          </p>

          <h2 className="font-semibold text-gray-900">
            1. Nature of the Service
          </h2>
          <p>
            Expeditio is an <strong>AI-powered travel planning platform</strong>.
            We provide travel itineraries, suggestions, and planning tools
            for informational purposes only.
          </p>
          <p>
            We do <strong>not</strong> provide travel bookings, ticketing,
            hotel reservations, or payment services.
          </p>

          <h2 className="font-semibold text-gray-900">
            2. Accuracy of Information
          </h2>
          <p>
            Travel information such as routes, places, timings, or suggestions
            may change over time. We do not guarantee that all information
            is complete, accurate, or up-to-date.
          </p>

          <h2 className="font-semibold text-gray-900">
            3. User Accounts
          </h2>
          <p>
            You may create an account using manual login or Google authentication.
            You are responsible for keeping your account secure.
          </p>

          <h2 className="font-semibold text-gray-900">
            4. Tokens & Usage
          </h2>
          <p>
            Tokens are required to generate AI itineraries.
            Tokens have no monetary value and cannot be transferred or sold.
          </p>

          <h2 className="font-semibold text-gray-900">
            5. QR Code Sharing
          </h2>
          <p>
            Generated QR links allow temporary sharing of itineraries.
            Shared itineraries are accessible for a limited time (e.g. 7 days).
          </p>

          <h2 className="font-semibold text-gray-900">
            6. Prohibited Use
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Misusing or attempting to hack the platform</li>
            <li>Using the service for illegal activities</li>
            <li>Copying or redistributing content without permission</li>
          </ul>

          <h2 className="font-semibold text-gray-900">
            7. Limitation of Liability
          </h2>
          <p>
            Expeditio shall not be liable for any loss, damage, delay,
            or inconvenience resulting from the use of the platform.
          </p>

          <h2 className="font-semibold text-gray-900">
            8. Changes to Terms
          </h2>
          <p>
            We may update these Terms at any time.
            Continued use of the website means you accept the updated Terms.
          </p>

          <h2 className="font-semibold text-gray-900">
            9. Contact
          </h2>
          <p>
            For any questions, contact us at:
            <br />
            <strong>Email:</strong> praseedkumar104@gmail.com 
          </p>
        </section>

      </div>
    </div>
  );
};

export default Terms;
