import { motion } from "framer-motion";

import HeroIllustration from "../assets/illustrations/undraw_everywhere-together_c4di.svg";
// import DayDreaming from "../assets/illustrations/undraw_day-dreaming_2mlz.svg";
// import Adventure from "../assets/illustrations/undraw_adventure_9my9.svg";
import Nature from "../assets/illustrations/undraw_nature_yf30.svg";
// import SocialFriends from "../assets/illustrations/undraw_social-friends_mt6k.svg";
import img2 from "../assets/illustrations/undraw_map_cuix.svg"
import img3 from "../assets/illustrations/undraw_photo-viewer_opso.svg"
import img4 from "../assets/illustrations/undraw_selfie-fun_0qzh.svg"
// const highlights = [
//   {
//     id: "itineraries",

//     title: "100+ Ready Itineraries",
//     desc: "Carefully crafted itineraries for cities, weekends, and long trips.",
//     action: "Explore itineraries",
//     image:
//       "https://images.unsplash.com/photo-1640179840059-ffb51b831e06?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXRpbmVyYXJ5fGVufDB8fDB8fHww",
//   },
//   {
//     id: "distance",

//     title: "Distance & Transport Aware",
//     desc: "Realistic routes and transport suggestions that actually make sense.",
//     action: "See how it works",
//     image:
//       "https://images.unsplash.com/photo-1535745122259-f1e187953c4c?w=1000&auto=format&fit=crop&q=60",
//   },
//   {
//     id: "packing",

//     title: "Smart Packing Lists",
//     desc: "Packing lists that auto-adjust based on destination and duration.",
//     action: "View packing tools",
//     image:
//       "https://images.unsplash.com/photo-1643046322163-cc1eadb6bd6b?w=1000&auto=format&fit=crop&q=60",
//   },
//   {
//     id: "cities",

//     title: "Cities Across the World",
//     desc: "Plan trips anywhere — from India to international destinations.",
//     action: "Explore cities",
//     image:
//       "https://images.unsplash.com/photo-1677987536338-4a83c73b33e5?w=1000&auto=format&fit=crop&q=60",
//   },
// ];


export default function FeatureCards({ onNavigate }) {
  return (
    <section className="bg-[#f3f4ee]/50 pt-28 pb-32 rounded-t-[48px]">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {/* ===================== */}
        {/* OVERVIEW GRID (TOP) */}
        {/* ===================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* ================= HERO CARD ================= */}
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="
    relative
    md:col-span-2 lg:col-span-2
    bg-white text-[#1f2d1f]
    rounded-[32px] md:rounded-[48px]
    p-6 sm:p-10 md:p-14
    shadow-[0_15px_40px_rgba(0,0,0,0.06)]
    md:hover:scale-[1.01] md:hover:-translate-y-1
    transition-all duration-500
    flex flex-col md:flex-row justify-between items-start md:items-center gap-10
    border border-[#5b6f00]/5
  "
>

  {/* TEXT */}
  <div className="w-full md:w-2/3">
    <div className="inline-block px-4 py-1.5 rounded-full bg-[#5b6f00]/10 text-[#5b6f00] text-xs font-bold uppercase tracking-wider mb-6">
      Smart Algorithm
    </div>

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight text-[#1f2d1f]">
      Plan smarter journeys
    </h2>

    <p className="text-[#4b5563] text-base md:text-lg mb-8 leading-relaxed">
      AI-powered travel planning that builds structured itineraries in seconds.
    </p>

    <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-[#6b7280] text-sm font-medium">
      <li className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b6f00]" /> Hourly trips
      </li>
      <li className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b6f00]" /> One-day plans
      </li>
      <li className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b6f00]" /> Multi-day journeys
      </li>
      <li className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b6f00]" /> Budget aware
      </li>
      <li className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b6f00]" /> Distance optimized
      </li>
    </ul>
  </div>

  {/* IMAGE - DESKTOP ONLY */}
  <div className="hidden md:flex md:w-1/3 justify-end">
    <img
      src={HeroIllustration}
      alt="Travel illustration"
      className="w-48 h-auto opacity-80"
    />
  </div>

</motion.div>


          {/* ================= SMALL CARD 1 ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
    bg-white text-[#1f2d1f]
    rounded-[32px]
    p-6 md:p-10
    shadow-[0_15px_40px_rgba(0,0,0,0.06)]
    md:hover:scale-[1.02] md:hover:-translate-y-1
    transition-all duration-500
    flex flex-row md:flex-col
    items-center
    justify-between
    gap-6
    border border-[#5b6f00]/5
  "
          >

            {/* TEXT */}
            <div className="flex-1 text-left md:text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#1f2d1f]">
                AI Itinerary Engine
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Structured, realistic routes based on time and preferences.
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-end md:justify-center">
              <img
                src={img3}
                alt="Adventure"
                className="w-24 sm:w-28 md:w-40 object-contain"
              />
            </div>

          </motion.div>
          {/* ================= SMALL CARD 2 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="
      bg-white text-[#1f2d1f]
      rounded-[32px]
      p-6 md:p-8
      shadow-[0_15px_40px_rgba(0,0,0,0.06)]
      md:hover:scale-[1.02] md:hover:-translate-y-1
      transition-all duration-500
      flex justify-between items-center
      border border-[#5b6f00]/5
    "
          >
            <div className="w-2/3">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#1f2d1f]">
                Smart Budget Split
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Clear spending estimates before your trip even starts.
              </p>
            </div>

            <img
              src={img4}
              alt="Budget"
              className="w-24 sm:w-28 md:w-32 object-contain"
            />
          </motion.div>


          {/* ================= MEDIUM CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="
      bg-white text-[#1f2d1f]
      rounded-[32px]
      p-6 md:p-8
      shadow-[0_15px_40px_rgba(0,0,0,0.06)]
      md:hover:scale-[1.02] md:hover:-translate-y-1
      transition-all duration-500
      flex justify-between items-center
      border border-[#5b6f00]/5
    "
          >
            <div className="w-2/3">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#1f2d1f]">
                Discover Beyond Lists
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Hidden gems and smarter experiences.
              </p>
            </div>

            <img
              src={Nature}
              alt="Discover"
              className="w-28 sm:w-32 md:w-40 object-contain"
            />
          </motion.div>


          {/* ================= TALL CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="
      md:row-span-2 lg:col-span-1
      bg-white text-[#1f2d1f]
      rounded-[32px] md:rounded-[48px]
      p-6 sm:p-10
      shadow-[0_15px_40px_rgba(0,0,0,0.06)]
      md:hover:scale-[1.02] md:hover:-translate-y-1
      transition-all duration-500
      flex justify-between items-center md:flex-col md:justify-center md:text-center
      border border-[#5b6f00]/5
    "
          >
            <div className="w-2/3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-[#1f2d1f]">
                Travel on your terms
              </h2>

              <p className="text-[#6b7280] text-base leading-relaxed">
                No chaos. No spreadsheet planning.
                <br />
                Just clarity.
              </p>
            </div>

            <img
              src={img2}
              alt="Travel together"
              className="w-32 sm:w-40 md:w-52 object-contain"
            />
          </motion.div>

        </div>
        {/* ===================== */}
        {/* ORIGINAL HEADER */}
        {/* ===================== */}

        {/* ================= HEADER ================= */}
        {/* <div className="text-center space-y-4 mb-16">
  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
    Thoughtfully built for smarter travel
  </h2>

  <div className="mx-auto w-16 h-[2px] rounded-full bg-[#5b7c67]" />

  <p className="text-sm text-gray-500 max-w-lg mx-auto">
    Tools designed to make every trip simpler, realistic, and stress-free.
  </p>
</div>


<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {highlights.map((h) => (
    <motion.div
      key={h.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
    >
 
      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-4">
        <img
          src={h.image}
          alt={h.title}
          className="w-full h-full object-cover"
        />
      </div>

   \
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {h.icon} {h.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
        {h.desc}
      </p>

      <button
        onClick={() => onNavigate(`/${h.id}`)}
        className="mt-4 text-sm font-medium text-[#5b7c67] hover:underline"
      >
        {h.action} →
      </button>
    </motion.div>
  ))}
</div>
 */}
      </div>
    </section>
  );
}
