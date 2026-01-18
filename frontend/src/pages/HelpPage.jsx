import React from "react";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();

  const Section = ({ title, children }) => (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Help & Support
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500"
          >
            ← Back
          </button>
        </div>

        {/* WHAT IS PROJECT X */}
        <Section title="What is Project X?">
          <p>
            Project X is an AI-powered travel planning platform that creates
            realistic and time-aware itineraries based on your destination,
            available time, travel group, and preferences.
          </p>
          <p>
            Instead of generic plans, Project X focuses on practical routes,
            pacing, and real-world feasibility.
          </p>
        </Section>

        {/* HOW TO CREATE A TRIP */}
        <Section title="How to create a travel plan">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Go to the home page</li>
            <li>Select trip duration (hours / one day / multiple days)</li>
            <li>Enter your destination</li>
            <li>Choose travel group</li>
            <li>Add optional preferences (cafes, photography, relaxed pace)</li>
            <li>Click <strong>Generate itinerary</strong></li>
          </ol>
        </Section>

        {/* AI WORKING */}
        <Section title="How does the AI planner work?">
          <p>
            The AI uses your inputs to generate a structured travel plan.
            It considers:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Available time</li>
            <li>Destination type</li>
            <li>Travel group</li>
            <li>Pacing and realism</li>
          </ul>
          <p>
            The output is generated in real time and displayed with a typing
            effect for better readability.
          </p>
        </Section>

        {/* TOKENS */}
        <Section title="How does the token system work?">
          <p>
            Tokens are used to generate AI travel plans.
            Each AI generation consumes tokens from your account.
          </p>

          <ul className="list-disc ml-5 space-y-1">
            <li>New users receive a limited number of tokens</li>
            <li>Each AI-generated itinerary deducts tokens</li>
            <li>Admins have unlimited tokens</li>
          </ul>

          <p>
            If you run out of tokens, you can earn more by completing quizzes.
          </p>

          <p>
            You can view your remaining tokens and usage history in:
            <br />
            <strong>Profile → Token History</strong>
          </p>
        </Section>

        {/* DEMO MODE */}
        <Section title="What is Demo mode?">
          <p>
            If you enter <strong>demo</strong> as the destination, Project X
            shows a sample itinerary.
          </p>
          <p>
            Demo mode does not consume tokens and is useful for previewing
            how the AI works.
          </p>
        </Section>

        {/* PACKING LIST */}
        <Section title="Packing List">
          <p>
            The Packing List helps you organize items for your trip.
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Automatically generated based on trip description</li>
            <li>Mark items as packed</li>
            <li>Add custom items</li>
            <li>Download the list</li>
          </ul>
        </Section>

        {/* QR */}
        <Section title="QR Trip sharing">
          <p>
            You can generate a QR code for your itinerary.
          </p>
          <p>
            The QR link can be shared and will remain active for
            <strong> 7 days</strong>.
          </p>
        </Section>

        {/* COMMON ISSUES */}
        <Section title="Common problems & solutions">
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <strong>AI not responding:</strong> The service may be temporarily
              unavailable. Try again later.
            </li>
            <li>
              <strong>No tokens left:</strong> Complete a quiz to earn more
              tokens.
            </li>
            <li>
              <strong>Page reload lost result:</strong> Generated results are
              saved temporarily in your browser.
            </li>
          </ul>
        </Section>

      </div>
    </div>
  );
};

export default HelpPage;
