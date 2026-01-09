import { useState } from "react";

const faqs = [
  "Why yet another trip planning tool?",
  "What can I do with Project X?",
  "Who is Project X for?",
  "How can I plan my stay with Project X?",
  "How does the trip budgeting work?",
  "Can I book plane tickets or accommodations?",
//   "Can I export my trips to Google Maps?",
//   "How can I trust information shown on Project X?",
//   "Why do I have to pay for some resources?",
//   "What is a local guide?",
//   "How to become a local guide?",
//   "How can I earn money as a digital nomad?",
//   "How can I earn money while traveling?",
  "Why are there so few places listed on Project X?",
  "How can I connect with communities and travelers?",
  "What activities can I experience on Project X?",
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-[#d7f26e]">
      {/* WHITE CARD */}
      <div className="bg-[#fffdf6] rounded-t-[36px] -mt-10 pt-16 pb-20">

        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-[220px_1fr] gap-12">

          {/* LEFT */}
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            Have <br /> questions?
          </h2>

          {/* RIGHT */}
          <div className="space-y-4">
            {faqs.map((q, i) => (
              <div key={i} className=" border-black/20 pb-3">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center text-left text-sm md:text-base font-medium"
                >
                  {q}
                  <span className="text-xl">
                    {open === i ? "−" : "+"}
                  </span>
                </button>

                {open === i && (
                  <p className="mt-3 text-sm text-gray-700 max-w-2xl">
                    Project X provides curated tools, trusted data, and
                    community-driven travel experiences.
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
