import { useMemo } from "react";

const TravelQuotes = () => {
  const quotes = [
    {
      text: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      author: "Gustave Flaubert",
    },
    {
      text: "The journey matters more than the destination.",
      author: "Unknown",
    },
    {
      text: "A good trip is measured in moments, not miles.",
      author: "Expeditio",
    },
    {
      text: "Don’t rush through places meant to be felt.",
      author: "Anonymous",
    },
    {
      text: "Smart travel is about flow, not speed.",
      author: "Expeditio",
    },
  ];

  // pick random quote only once per render
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <div className="max-w-3xl mx-auto text-center py-16 px-4">
      <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
        “{randomQuote.text}”
      </p>

      <p className="mt-4 text-sm text-gray-500">
        — {randomQuote.author}
      </p>
    </div>
  );
};

export default TravelQuotes;
