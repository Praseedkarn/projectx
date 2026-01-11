import { motion } from "framer-motion";

const highlights = [
  {
    id: "itineraries",
    icon: "🗺️",
    title: "100+ Ready Itineraries",
    desc: "Carefully crafted itineraries for cities, weekends, and long trips. Start fast without planning from scratch.",
    action: "Explore itineraries",
    image: "https://plus.unsplash.com/premium_vector-1711987817831-55bfbf7200a6?w=352&dpr=2&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
  {
    id: "distance",
    icon: "📏",
    title: "Distance & Transport Aware",
    desc: "Smart travel flow with realistic distances, routes, and transport suggestions that actually make sense.",
    action: "See how it works",
    image: "https://images.unsplash.com/photo-1535745122259-f1e187953c4c?w=1000&auto=format&fit=crop&q=60",
  },
  {
    id: "packing",
    icon: "🎒",
    title: "Smart Packing Lists",
    desc: "Never forget essentials. Packing lists auto-adjust based on destination, duration, and travel style.",
    action: "View packing tools",
    image: "https://images.unsplash.com/photo-1643046322163-cc1eadb6bd6b?w=1000&auto=format&fit=crop&q=60",
  },
  {
    id: "cities",
    icon: "🌍",
    title: "Cities Across the World",
    desc: "Plan trips anywhere — from Indian cities to international destinations, all in one place.",
    action: "Explore cities",
    image: "https://images.unsplash.com/photo-1677987536338-4a83c73b33e5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWRpbmdidXJnaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function FeatureCards({ onNavigate }) {
  return (
    <section className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6 space-y-32">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Going the extra mile for you
          </h2>
        </motion.div>

        {/* Feature rows */}
        {highlights.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-20"
          >
            {/* TEXT */}
            <div className="md:w-1/2 max-w-md space-y-4">
              <h3 className="text-[15px] font-semibold tracking-wide text-[#6b8e23]">
                {h.icon} {h.title}
              </h3>

              <p className="text-[14px] text-gray-600 leading-relaxed">
                {h.desc}
              </p>

              <button
                onClick={() => onNavigate(`/${h.id}`)}
                className="text-sm font-medium text-[#5b7c67] hover:text-[#4a6a58] flex items-center gap-2"
              >
                {h.action} <span>→</span>
              </button>
            </div>

            {/* IMAGE CARD — CLASSIC STYLE */}
            <div className="md:w-1/2 flex justify-center">
              <div
                className="
                  w-[360px] h-[240px]
                  rounded-xl
                  overflow-hidden
                  bg-[#faf8f3]
                  border border-[#e6e2d9]
                "
              >
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
