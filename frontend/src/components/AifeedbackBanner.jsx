import { useState } from "react";
import { Link } from "react-router-dom";
import AiSticker from "../assets/illustrations/undraw_questions_52ic.svg";

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
    <section className="relative my-20">
      <div
        className="
        relative rounded-[32px] md:rounded-[60px]
        bg-gradient-to-br from-[#f3f4ee] via-[#fafaf7] to-white
        border border-[#5b6f00]/5
        px-6 py-12 md:px-20 md:py-24
        overflow-hidden
        shadow-[0_20px_60px_rgba(0,0,0,0.03)]
        "
      >
        {/* Soft Glow Background */}
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-[#5b6f00]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 
                w-[420px] h-[420px] hidden md:block">

          {/* Soft subtle glow (lighter than before) */}
          <div className="absolute inset-0 bg-[#5b6f00]/10 rounded-full blur-3xl opacity-40" />

          <img
            src={AiSticker}
            alt="AI Questions Illustration"
            className="
      relative z-10
      w-full h-full
      opacity-90
      pointer-events-none
      drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    "
          />
        </div>


        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5b6f00] uppercase tracking-widest mb-6">
            <span className="w-8 h-[1px] bg-[#5b6f00]"></span>
            Personal Support
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-[#1f2d1f] leading-tight text-center md:text-left">
            Having trouble with <br className="hidden md:block" /> AI results?
          </h2>

          <p className="mt-4 md:mt-6 text-sm md:text-lg text-[#4b5563] max-w-xl leading-relaxed text-center md:text-left mx-auto md:mx-0">
            Sometimes our AI might miss the mark. If you couldn’t plan your trip,
            tell us what you were looking for and we’ll personally help you.
          </p>

          {/* FORM */}
          <div className="mt-12 flex flex-col md:flex-row gap-5">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What were you trying to plan?"
              className="
                flex-[2] rounded-2xl px-8 py-5
                text-sm outline-none
                bg-white border border-gray-100
                shadow-sm
                focus:border-[#5b6f00]/40
                focus:ring-4 focus:ring-[#5b6f00]/5
                transition-all duration-300
              "
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="
                flex-1 rounded-2xl px-8 py-5
                text-sm outline-none
                bg-white border border-gray-100
                shadow-sm
                focus:border-[#5b6f00]/40
                focus:ring-4 focus:ring-[#5b6f00]/5
                transition-all duration-300
              "
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full md:w-auto shrink-0 rounded-2xl px-10 py-5
                text-sm font-bold text-white
                bg-[#5b6f00] hover:bg-[#4a5a00]
                shadow-[0_10px_25px_rgba(91,111,0,0.2)] hover:shadow-[0_15px_30px_rgba(91,111,0,0.3)]
                md:hover:-translate-y-0.5
                transition-all duration-300 flex items-center justify-center
              "
            >
              {loading ? "Sending..." : "📩 Send Details"}
            </button>
          </div>

          {sent && (
            <p className="mt-6 text-sm font-medium text-[#5b6f00] animate-bounce">
              ✅ Thanks! We’ll get back to you shortly.
            </p>
          )}

          <p className="mt-10 text-xs text-[#6b7280] flex items-center gap-1">
            By continuing, you agree to our{" "}
            <Link
              to="/privacy"
              target="_blank"
              className="font-medium text-[#5b6f00] hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link
              to="/terms"
              target="_blank"
              className="font-medium text-[#5b6f00] hover:underline"
            >
              Terms of Use
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
}