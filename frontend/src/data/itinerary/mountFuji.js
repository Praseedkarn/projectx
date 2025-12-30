const mountFujiItinerary = {
  id: 25,
  title: "Mount Fuji Climb",
  duration: "3 days",
  location: "Tokyo → Mount Fuji, Japan",
  difficulty: "Moderate",
  priceRange: "$$ (Adventure)",
  bestTime: "July to September",
  description:
    "Climb Japan’s iconic Mount Fuji via official trails, experience mountain huts, and witness a spectacular sunrise from the summit.",
  highlights: [
    "Mount Fuji summit climb",
    "Sunrise from crater (Goraiko)",
    "Yoshida Trail experience",
    "Mountain hut overnight stay",
    "Japanese alpine culture"
  ],
  image:
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",

  days: [
    {
      day: 1,
      title: "Arrival in Tokyo & Preparation",
      places: [
        "Tokyo",
        "Shinjuku",
        "Shibuya"
      ],
      activities: [
        "Arrival in Tokyo",
        "Hotel check-in",
        "Purchase or rent trekking gear",
        "Evening briefing and rest"
      ],
      accommodation: "Tokyo hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Tokyo to Mount Fuji – 5th Station",
      places: [
        "Mount Fuji 5th Station",
        "Yoshida Trail",
        "Mount Fuji Mountain Hut"
      ],
      activities: [
        "Early morning transfer to Mount Fuji",
        "Begin climb from 5th Station",
        "Gradual ascent along Yoshida Trail",
        "Reach mountain hut for overnight stay",
        "Early rest for summit push"
      ],
      accommodation: "Mountain hut",
      meals: "Dinner included"
    },
    {
      day: 3,
      title: "Summit Sunrise & Descent",
      places: [
        "Mount Fuji Summit",
        "Mount Fuji Crater",
        "Mount Fuji 5th Station",
        "Tokyo"
      ],
      activities: [
        "Pre-dawn summit climb",
        "Watch sunrise (Goraiko) from summit",
        "Walk around the volcanic crater",
        "Descend to 5th Station",
        "Return transfer to Tokyo"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "Mountain hut accommodation",
    "Local trekking guide",
    "Transportation to/from Mount Fuji",
    "Climbing permits and trail access",
    "Safety briefing"
  ],

  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal trekking gear",
    "Optional gear rental",
    "Tips and gratuities"
  ],

  tips: [
    "Climb slowly to avoid altitude sickness",
    "Carry warm layers (temperatures drop fast)",
    "Wear proper hiking boots",
    "Book mountain huts early",
    "Stay hydrated throughout the climb"
  ],

  budget: {
    flights: "$600–1,000",
    accommodation: "$100–150/night",
    food: "$20–40/day",
    transport: "$50–100",
    activities: "$100–200",
    total: "$900–1,500 per person"
  }
};

export default mountFujiItinerary;
