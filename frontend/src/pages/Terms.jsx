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

        <section className="space-y-4 text-sm text-gray-700 leading-relaxed">

  <p>
    Welcome to <strong>Expeditio</strong> ("we", "our", "us"). By accessing or using
    our website and services, you agree to be bound by these Terms & Conditions.
    If you do not agree, please do not use the platform.
  </p>

  <h2 className="font-semibold text-gray-900">1. Description of Service</h2>
  <p>
    Expeditio is an AI-powered travel planning platform that generates
    travel itineraries based on user inputs such as destination,
    duration, and preferences.
  </p>
  <p>
    We do not provide travel bookings, ticketing, hotel reservations,
    transportation services, or payment processing.
  </p>

  <h2 className="font-semibold text-gray-900">2. Eligibility</h2>
  <p>
    You must be at least 13 years old to use this service.
    If you are under 18, you must use the platform with parental or guardian consent.
  </p>

  <h2 className="font-semibold text-gray-900">3. User Accounts</h2>
  <p>
    To access certain features, you may create an account via email
    or third-party authentication (e.g., Google).
  </p>
  <p>
    You are responsible for maintaining the confidentiality of your account
    credentials and all activities under your account.
  </p>

  <h2 className="font-semibold text-gray-900">4. AI-Generated Content</h2>
  <p>
    Travel itineraries are generated using artificial intelligence.
    The information provided is for informational purposes only.
  </p>
  <p>
    We do not guarantee the accuracy, completeness, reliability,
    or availability of any recommendations.
    Travel details such as pricing, timings, routes, and availability
    may change without notice.
  </p>

  <h2 className="font-semibold text-gray-900">5. Tokens & Digital Credits</h2>
  <p>
    Certain features require tokens to generate AI itineraries.
    Tokens:
  </p>
  <ul className="list-disc ml-5 space-y-1">
    <li>Have no monetary value</li>
    <li>Are non-transferable</li>
    <li>Cannot be exchanged for cash</li>
    <li>May be modified or discontinued at our discretion</li>
  </ul>

  <h2 className="font-semibold text-gray-900">6. QR Code & Shared Links</h2>
  <p>
    Generated QR codes or shared links allow temporary access to itineraries.
    We are not responsible for unauthorized sharing of such links.
  </p>

  <h2 className="font-semibold text-gray-900">7. Acceptable Use</h2>
  <p>You agree not to:</p>
  <ul className="list-disc ml-5 space-y-1">
    <li>Use the platform for illegal or fraudulent purposes</li>
    <li>Attempt to hack, disrupt, or reverse engineer the system</li>
    <li>Scrape or copy content without permission</li>
    <li>Misuse AI outputs for harmful or misleading purposes</li>
  </ul>

  <h2 className="font-semibold text-gray-900">8. Intellectual Property</h2>
  <p>
    All website design, branding, logos, and software are owned by Expeditio.
    You may not reproduce, distribute, or modify any part of the platform
    without written permission.
  </p>

  <h2 className="font-semibold text-gray-900">9. Third-Party Services</h2>
  <p>
    Our platform may reference third-party travel providers, maps,
    or external services. We do not control or endorse third-party services
    and are not responsible for their actions or policies.
  </p>

  <h2 className="font-semibold text-gray-900">10. Limitation of Liability</h2>
  <p>
    Expeditio is provided "as is" and "as available".
    We shall not be liable for any direct, indirect, incidental,
    or consequential damages resulting from the use or inability to use the platform.
  </p>
  <p>
    You are solely responsible for verifying travel details before making
    bookings or financial decisions.
  </p>

  <h2 className="font-semibold text-gray-900">11. Termination</h2>
  <p>
    We reserve the right to suspend or terminate accounts that violate
    these Terms or misuse the platform.
  </p>

  <h2 className="font-semibold text-gray-900">12. Changes to Terms</h2>
  <p>
    We may update these Terms at any time.
    Continued use of the platform after updates means you accept the revised Terms.
  </p>

  {/* <h2 className="font-semibold text-gray-900">13. Governing Law</h2>
  <p>
    These Terms shall be governed by the laws of India.
    Any disputes shall be subject to the jurisdiction of courts in India.
  </p> */}

  <h2 className="font-semibold text-gray-900">13. Contact Information</h2>
  <p>
    For questions regarding these Terms:
    <br />
    <strong>Email:</strong> praseedkumar104@gmail.com
  </p>

</section>


      </div>
    </div>
  );
};

export default Terms;
