import { useState } from "react";
import { Link } from "react-router-dom";
const faqs = [
  {
    q: "Why yet another trip planning tool?",
    a: "Most travel tools focus on bookings. Project X focuses on planning, clarity, and real-world travel logic before you spend money."
  },
  {
    q: "What can I do with Project X?",
    a: "You can plan trips day-by-day, estimate budgets, discover destinations, and organize travel details in one place."
  },
  {
    q: "Who is Project X for?",
    a: "Project X is for solo travelers, families, students, and anyone who wants stress-free and realistic trip planning."
  },
  {
    q: "How can I plan my stay with Project X?",
    a: "You can explore destinations, choose activities, estimate stay duration, and build a structured itinerary based on your travel style."
  },
  {
    q: "How does the trip budgeting work?",
    a: "Project X provides rough cost estimates for transport, stay, food, and activities to help you plan within your budget."
  },
  {
    q: "Can I book plane tickets or accommodations?",
    a: "Currently, Project X focuses on planning. Booking integrations may be added in the future."
  },
  {
    q: "Why are there so few places listed on Project X?",
    a: "Project X is growing gradually to ensure accurate and meaningful data rather than overwhelming users with unreliable information."
  },
  {
    q: "How can I connect with communities and travelers?",
    a: "Future updates will allow you to connect with travelers, local guides, and communities for shared experiences and tips."
  },
  {
    q: "What activities can I experience on Project X?",
    a: "You can explore sightseeing spots, local experiences, nature activities, cultural visits, and travel-friendly adventures."
  }
];


export default function FaqFooterSection() {
  const [open, setOpen] = useState(null);

  return (
    <>
      {/* ================= FAQ SECTION ================= */}
      <section className="bg-white rounded-t-[80px] pt-24 pb-32 ">
        <div className="max-w-7xl mx-auto px-10 md:px-20">
          <div className="grid md:grid-cols-[260px_1fr] gap-14">

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Have <br /> questions?
            </h2>

            <div className="space-y-5">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center text-left text-base font-medium"
                  >
                    {item.q}
                    <span className="text-xl">
                      {open === i ? "−" : "+"}
                    </span>
                  </button>

                  {open === i && (
                    <p className="mt-3 text-sm text-gray-700 max-w-2xl">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER SECTION ================= */}
      <footer className="bg-[#d7f26e] rounded-t-[80px] pt-20 pb-10 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-10 md:px-20">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">

            {/* BRAND */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-2xl font-semibold tracking-wide">
                PROJECT X
              </h3>
              <p className="text-gray-700 max-w-xs">
                Experience the world, your way.
              </p>
            </div>

            {/* SUPPORT */}
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-700">
                <li>FAQ</li>
               <li><Link to="/terms">Terms & Conditions</Link></li>
               <li> <Link to="/privacy">Privacy Policy</Link></li>
                <li>Refunds</li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Travel Guides</li>
                <li>Destination Guides</li>
              </ul>
            </div>

            {/* COMMUNITY */}
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Blog</li>
                <li>Instagram</li>
                <li>Local Guides</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-black/10 text-xs text-gray-700">
            © 2026 Project X. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
