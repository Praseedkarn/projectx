const andamanItinerary = {
  slug:"andaman-island",
  title: "Andaman Island Getaway",
  duration: "5 days",
  location: "Andaman & Nicobar Islands, India",
  difficulty: "Easy",
  priceRange: "$$$ (Premium)",
  bestTime: "October to May",
  description:
    "A tropical island escape featuring crystal-clear beaches, coral reefs, snorkeling, and peaceful island life.",

  highlights: [
    "Radhanagar Beach",
    "Snorkeling at Elephant Beach",
    "Cellular Jail Light & Sound Show",
    "Island hopping experience",
    "Water sports activities"
  ],
  highlight360Views: [
  { label: "Radhanagar Beach", place: "Radhanagar Beach, Havelock Island" },
  { label: "Elephant Beach", place: "Elephant Beach, Havelock Island" },
  { label: "Cellular Jail", place: "Cellular Jail, Port Blair" },
  { label: "Aberdeen Bazaar", place: "Aberdeen Bazaar, Port Blair" },
  { label: "Havelock Island", place: "Havelock Island, Andaman" }
],


  image:
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",

  days: [
    {
      day: 1,
      title: "Arrival in Port Blair",
      activities: [
        "Arrival at Port Blair airport",
        "Hotel check-in and rest",
        "Visit Cellular Jail",
        "Attend Light & Sound Show"
      ],
      accommodation: "Port Blair hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Port Blair to Havelock Island",
      activities: [
        "Morning ferry to Havelock Island",
        "Hotel check-in",
        "Visit Radhanagar Beach",
        "Sunset photography"
      ],
      accommodation: "Havelock beach resort",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Havelock – Snorkeling & Leisure",
      activities: [
        "Visit Elephant Beach",
        "Snorkeling and coral reef exploration",
        "Optional scuba diving",
        "Relax at beach resort"
      ],
      accommodation: "Havelock beach resort",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Havelock to Port Blair",
      activities: [
        "Morning leisure time",
        "Return ferry to Port Blair",
        "Local shopping at Aberdeen Bazaar"
      ],
      accommodation: "Port Blair hotel",
      meals: "Breakfast included"
    },
    {
      day: 5,
      title: "Departure",
      activities: [
        "Breakfast",
        "Airport transfer",
        "Departure from Andaman"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "4 nights accommodation",
    "Daily breakfast",
    "Ferry transfers",
    "Airport transfers",
    "Snorkeling at Elephant Beach"
  ],

  exclusions: [
    "Flights to Port Blair",
    "Scuba diving charges",
    "Personal expenses",
    "Travel insurance"
  ],

  tips: [
    "Book ferries in advance",
    "Carry sunscreen & swimwear",
    "Follow marine safety guidelines",
    "Avoid plastic usage on islands"
  ],

  budget: {
    flights: "₹12,000–18,000",
    accommodation: "₹4,000–7,000/night",
    food: "₹800–1,200/day",
    activities: "₹2,000–5,000",
    transport: "Included",
    total: "₹35,000–50,000 per person"
  }
};

export default andamanItinerary;
