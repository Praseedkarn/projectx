import React from "react";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();

  const Section = ({ title, children }) => (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Help & Guide
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back
          </button>
        </div>

       
        <Section title="What is Expeditio?">
          <p>
            Expeditio  is an <strong>AI-powered travel planning website</strong>.
            It helps you create realistic and well-paced travel itineraries
            based on your destination, time, and preferences.
          </p>
          <p>
            Instead of random suggestions, Expeditio creates
            <strong> practical travel plans</strong> that you can actually follow.
          </p>
        </Section>

        {/* HOW IT WORKS */}
        <Section title="How does Expeditio X work?">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Go to the home page</li>
            <li>Select how long your trip is</li>
            <li>Enter the destination</li>
            <li>Choose who you are traveling with</li>
            <li>Add optional preferences</li>
            <li>Click <strong>Generate itinerary</strong></li>
          </ol>
          <p>
            The AI will generate your travel plan and display it
            step-by-step on the screen.
          </p>
        </Section>

        {/* AI EXPLANATION */}
        <Section title="How does the AI generate itineraries?">
          <p>
            The AI analyzes your inputs and creates a structured plan by
            considering:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Time available</li>
            <li>Destination type</li>
            <li>Travel group</li>
            <li>Realistic pacing</li>
          </ul>
          <p>
            This helps avoid rushed or unrealistic schedules.
          </p>
        </Section>

        {/* TOKEN SYSTEM */}
        <Section title="What is the token system?">
          <p>
            Tokens are used to generate AI itineraries.
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Each AI itinerary costs tokens</li>
            <li>New users get free tokens</li>
            <li>Admins have unlimited tokens</li>
          </ul>
          <p>
            You can view token usage in:
            <br />
            <strong>Profile → Token History</strong>
          </p>
        </Section>

        {/* EARN TOKENS */}
        <Section title="How can I earn more tokens?">
          <p>You can earn tokens by:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Completing quizzes</li>
            <li>Participating in activities provided in the app</li>
          </ul>
          <p>
            This allows you to keep generating itineraries without payment.
          </p>
        </Section>

        {/* DEMO MODE */}
        <Section title="What is Demo mode?">
          <p>
            If you enter <strong>demo</strong> as the destination,
            Expeditio shows a sample itinerary.
          </p>
          <p>
            Demo mode:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Does not consume tokens</li>
            <li>Is not saved</li>
            <li>Helps you understand how the AI works</li>
          </ul>
        </Section>

        {/* SAVED TRIPS */}
        <Section title="How to save your itinerary">
          <p>
            After generating an itinerary, click
            <strong> Generate QR</strong>.
          </p>
          <p>
            This will:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Save your itinerary automatically</li>
            <li>Create a QR link for sharing</li>
            <li>Allow access for 7 days</li>
          </ul>
          <p>
            You can view all saved itineraries in:
            <br />
            <strong>Saved Trips</strong>
          </p>
        </Section>

        {/* QR */}
        <Section title="What is QR Trip sharing?">
          <p>
            QR codes allow you to share your travel plan easily.
          </p>
          <p>
            Anyone with the QR link can view the itinerary for
            <strong> 7 days</strong>.
          </p>
        </Section>

        {/* COMMON ISSUES */}
        <Section title="Common issues & solutions">
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <strong>AI not responding:</strong> Try again after some time.
            </li>
            <li>
              <strong>No tokens left:</strong> Complete quizzes to earn more.
            </li>
            <li>
              <strong>Page refreshed:</strong> Results are temporarily saved.
            </li>
          </ul>
        </Section>

      </div>
    </div>
  );
};

export default HelpPage;
