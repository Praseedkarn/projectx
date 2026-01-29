import React from "react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Privacy Policy
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
            This Privacy Policy explains how <strong>Expeditio</strong>
            collects, uses, and protects your data.
          </p>

          <h2 className="font-semibold text-gray-900">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Name and email address</li>
            <li>Google profile information (if Google login is used)</li>
            <li>Saved itineraries and preferences</li>
            <li>Token usage and activity history</li>
          </ul>

          <h2 className="font-semibold text-gray-900">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Authentication and account management</li>
            <li>Generating and saving itineraries</li>
            <li>Improving platform functionality</li>
          </ul>

          <h2 className="font-semibold text-gray-900">
            3. Data Sharing
          </h2>
          <p>
            We do <strong>not</strong> sell or rent your personal data.
            Data is shared only with essential services such as
            authentication providers (Google OAuth).
          </p>

          <h2 className="font-semibold text-gray-900">
            4. Cookies & Storage
          </h2>
          <p>
            We use browser storage (localStorage / sessionStorage)
            to manage login sessions and user preferences.
          </p>

          <h2 className="font-semibold text-gray-900">
            5. Data Security
          </h2>
          <p>
            We use secure authentication methods such as JWT and encrypted
            credentials to protect user data.
          </p>

          <h2 className="font-semibold text-gray-900">
            6. User Rights
          </h2>
          <p>
            You may request account deletion or data removal by
            contacting us via email.
          </p>

          <h2 className="font-semibold text-gray-900">
            7. Changes to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated from time to time.
          </p>

          <h2 className="font-semibold text-gray-900">
            8. Contact
          </h2>
          <p>
            If you have questions about this policy:
            <br />
            <strong>Email:</strong> praseedkumar104@gmail.com
          </p>
        </section>

      </div>
    </div>
  );
};

export default Privacy;
