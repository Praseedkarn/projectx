import { motion } from "framer-motion";

const highlights = [
  {
    id: "itineraries",
    icon: "🗺️",
    title: "100+ Ready Itineraries",
    desc: "Carefully crafted itineraries for cities, weekends, and long trips.",
    action: "Explore itineraries",
    image:
      "https://plus.unsplash.com/premium_vector-1711987817831-55bfbf7200a6?w=352&auto=format&fit=crop&q=60",
  },
  {
    id: "distance",
    icon: "📏",
    title: "Distance & Transport Aware",
    desc: "Realistic routes and transport suggestions that actually make sense.",
    action: "See how it works",
    image:
      "https://images.unsplash.com/photo-1535745122259-f1e187953c4c?w=1000&auto=format&fit=crop&q=60",
  },
  {
    id: "packing",
    icon: "🎒",
    title: "Smart Packing Lists",
    desc: "Packing lists that auto-adjust based on destination and duration.",
    action: "View packing tools",
    image:
      "https://images.unsplash.com/photo-1643046322163-cc1eadb6bd6b?w=1000&auto=format&fit=crop&q=60",
  },
  {
    id: "cities",
    icon: "🌍",
    title: "Cities Across the World",
    desc: "Plan trips anywhere — from India to international destinations.",
    action: "Explore cities",
    image:
      "https://images.unsplash.com/photo-1677987536338-4a83c73b33e5?w=1000&auto=format&fit=crop&q=60",
  },
];

export default function FeatureCards({ onNavigate }) {
  return (
    <section className="bg-white py-20 md:py-28 rounded-[48px]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12 md:space-y-24">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
            Thoughtfully built for smarter travel
          </h2>

          {/* small center divider */}
          <div className="mx-auto w-14 h-[2px] rounded-full bg-[#5b7c67]" />

          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Tools designed to make every trip simpler, realistic, and stress-free.
          </p>
        </div>

        {/* FEATURES */}
        {highlights.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="
              flex flex-col
              min-[700px]:flex-row
              items-center
              gap-5 min-[700px]:gap-16
              border min-[700px]:border-0
              rounded-2xl min-[700px]:rounded-none
              p-4 min-[700px]:p-0
            "
          >
            {/* IMAGE */}
            <div className="w-full min-[700px]:w-1/2 flex justify-center">
              <div
                className="
                  w-full
                  aspect-[16/9]
                  min-[700px]:w-[360px]
                  min-[700px]:h-[240px]
                  rounded-xl
                  overflow-hidden
                  bg-gray-100
                "
              >
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="min-[700px]:w-1/2 max-w-md space-y-2 text-center min-[700px]:text-left">
              <h3 className="text-sm md:text-base font-semibold text-gray-800">
                {h.icon} {h.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {h.desc}
              </p>

              <button
                onClick={() => onNavigate(`/${h.id}`)}
                className="text-sm font-medium text-[#5b7c67] hover:underline"
              >
                {h.action} →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
