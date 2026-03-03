import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const faqs = [
  {
    q: "Why yet another trip planning tool?",
    a: "Most travel tools focus on bookings. Expeditio focuses on planning, clarity, and real-world travel logic before you spend money."
  },
  {
    q: "What can I do with Expeditio?",
    a: "You can plan trips day-by-day, estimate budgets, discover destinations, and organize travel details in one place."
  },
  {
    q: "Who is Expeditio for?",
    a: "Expeditio is for solo travelers, families, students, and anyone who wants stress-free and realistic trip planning."
  },
  {
    q: "How can I plan my stay with Expeditio?",
    a: "You can explore destinations, choose activities, estimate stay duration, and build a structured itinerary based on your travel style."
  },
  {
    q: "How does the trip budgeting work?",
    a: "Expeditio provides rough cost estimates for transport, stay, food, and activities to help you plan within your budget."
  },
  {
    q: "Can I book plane tickets or accommodations?",
    a: "Currently, Expeditio focuses on planning. Booking integrations may be added in the future."
  },
  {
    q: "Why are there so few places listed on Expeditio?",
    a: "Expeditio is growing gradually to ensure accurate and meaningful data rather than overwhelming users with unreliable information."
  },
  {
    q: "How can I connect with communities and travelers?",
    a: "Future updates will allow you to connect with travelers, local guides, and communities for shared experiences and tips."
  },
  {
    q: "What activities can I experience on Expeditio?",
    a: "You can explore sightseeing spots, local experiences, nature activities, cultural visits, and travel-friendly adventures."
  }
];

export default function FaqFooterSection() {
  const [open, setOpen] = useState(null);
  const [footerHero, setFooterHero] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* ===== FOOTER HERO SCROLL LOGIC ===== */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const nearBottom = scrollY + windowHeight > docHeight - 220;
      setFooterHero(nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== HANDLE HASH SCROLL (FROM OTHER PAGES) ===== */
  useEffect(() => {
    if (location.hash === "#faq") {
      const el = document.getElementById("faq");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  const handleFaqClick = () => {
    if (location.pathname !== "/") {
      navigate("/#faq");
    } else {
      const el = document.getElementById("faq");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= FAQ SECTION ================= */}
      <section
        id="faq"
        className={`
          relative
          transition-all duration-700 ease-out
          bg-[#fafaf7]
          ${footerHero
            ? "rounded-t-[80px] pt-32 pb-48 min-h-[70vh]"
            : "rounded-t-[48px] pt-24 pb-32"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid md:grid-cols-[300px_1fr] gap-16">

            <div className="space-y-4 text-center md:text-left">
              <div className="text-xs font-bold text-[#5b6f00] uppercase tracking-widest">Questions</div>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1f2d1f] leading-tight">
                Everything you need to know
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-[#1f2d1f]/5 pb-6">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center text-left text-lg font-medium text-[#1f2d1f] hover:text-[#5b6f00] transition-colors gap-8"
                  >
                    <span className="flex-1 text-base md:text-lg">{item.q}</span>
                    <span
                      className={`text-3xl font-light text-[#5b6f00] transition-transform duration-300 ${open === i ? "rotate-180" : ""
                        }`}
                    >
                      {open === i ? "−" : "+"}
                    </span>
                  </button>

                  {open === i && (
                    <p className="mt-4 text-base text-[#4b5563] max-w-2xl leading-relaxed animate-page">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className={`
          relative z-10
          transition-all duration-700 ease-out
          bg-[#1f2d1f] text-[#f3f4ee]
          ${footerHero
            ? "rounded-t-[80px] pt-32 pb-20 -mt-32"
            : "rounded-t-[48px] pt-24 pb-12 -mt-20"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-16 text-sm">

            {/* BRAND */}
            <div className="md:col-span-2 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold tracking-tight text-white">
                  EXPEDITIO
                </h3>
                <div className="w-12 h-[2px] bg-[#5b6f00] mx-auto md:mx-0" />
              </div>
              <p className="text-[#f3f4ee]/60 max-w-xs leading-relaxed text-base mx-auto md:mx-0">
                Experience the world, your way. Smarter, clearer, and more realistic travel planning.
              </p>
            </div>

            {/* SUPPORT */}
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h4 className="font-bold uppercase tracking-wider text-xs text-[#5b6f00]">Support</h4>
              <ul className="space-y-3 text-[#f3f4ee]/70">
                <li>
                  <button
                    onClick={handleFaqClick}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refunds" className="hover:text-white transition-colors">
                    Refunds
                  </Link>
                </li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h4 className="font-bold uppercase tracking-wider text-xs text-[#5b6f00]">Resources</h4>
              <ul className="space-y-3 text-[#f3f4ee]/70">
                <li>
                  <Link to="/cities" className="hover:text-white transition-colors">
                    Explore Cities
                  </Link>
                </li>
                <li>
                  <Link to="/itineraries" className="hover:text-white transition-colors">
                    Travel Itineraries
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMMUNITY */}
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h4 className="font-bold uppercase tracking-wider text-xs text-[#5b6f00]">Community</h4>
              <ul className="space-y-3 text-[#f3f4ee]/70">
                <li>
                  <Link to="/blogs" className="hover:text-white transition-colors">
                    Travel Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://instagram.com/expeditio_world/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <Link to="/become-guide" className="hover:text-white transition-colors">
                    Become a Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#f3f4ee]/40">
            <div>© 2026 Expeditio Travel. All rights reserved.</div>
            <div className="flex gap-8">
              <span>Built with AI</span>
              <span>Made for Explorers</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
