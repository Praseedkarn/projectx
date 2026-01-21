import { useState } from "react";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function AiFeedbackBanner({ source = "AI Planner" }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      console.log("Sending feedback to:", API_URL); // 🔎 debug

      await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email,
          source,
        }),
      });

      setSent(true);
      setMessage("");
      setEmail("");
    } catch (err) {
      console.error("Feedback error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative my-16">
      <div className="rounded-[36px] bg-[#d7f26e]/80 px-6 py-12 md:px-14 md:py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Having trouble with AI results?
          </h2>

          <p className="mt-3 text-sm md:text-base text-black/80 max-w-2xl">
            Sometimes our AI might miss the mark.
            If you couldn’t plan your trip, tell us what you were looking for
            and we’ll help you manually.
          </p>

          {/* FORM */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What were you trying to plan?"
              className="flex-1 rounded-full px-6 py-4
                         text-sm outline-none
                         bg-white/80 backdrop-blur"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com (optional)"
              className="flex-1 rounded-full px-6 py-4
                         text-sm outline-none
                         bg-white/80 backdrop-blur"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="shrink-0 rounded-full px-8 py-4
                         text-sm font-medium text-white
                         bg-[#5b7c67] hover:bg-[#4a6857]
                         transition flex items-center justify-center"
            >
              {loading ? "Sending..." : "📩 Send"}
            </button>
          </div>

          {sent && (
            <p className="mt-4 text-sm text-black/80">
              ✅ Thanks! We’ll get back to you shortly.
            </p>
          )}

         <p className="mt-4 text-xs text-black/70 text-center">
            By continuing, you agree to our{" "}
            <Link
              to="/privacy"
              target="_blank"
              className="underline ml-1 text-blue-600 hover:text-blue-800"
            >
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link
              to="/terms"
              target="_blank"
              className="underline ml-1 text-blue-600 hover:text-blue-800"
            >
              Terms of Use
            </Link>.
          </p>

        </div>
      </div>
    </section>
  );
}
