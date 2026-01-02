const santoriniItinerary = {
  title: "Santorini Island Romance",
  duration: "4 days",
  location: "Santorini, Greece",
  difficulty: "Easy",
  priceRange: "$$$ (Luxury Romance)",
  bestTime: "May to October",
  description:
    "A romantic escape to Santorini with whitewashed villages, blue-domed churches, stunning sunsets, and crystal-clear Aegean waters.",
  highlights: [
    "Oia sunset views",
    "Blue domes of Fira",
    "Caldera boat cruise",
    "Red & Black Sand Beaches",
    "Luxury cliffside stays"
  ],
  highlight360Views: [
  { label: "Oia Village", place: "Oia, Santorini" },
  { label: "Fira", place: "Fira, Santorini" },
  { label: "Red Beach", place: "Red Beach, Santorini" },
  { label: "Blue Dome Church", place: "Blue Domed Church, Santorini" },
  { label: "Santorini Caldera", place: "Santorini Caldera" }
],

  image:
    "https://images.unsplash.com/photo-1505731132164-cca903c4e9c4",

  days: [
    {
      day: 1,
      title: "Arrival & Fira",
      places: [
        "Santorini Airport",
        "Fira",
        "Santorini Caldera"
      ],
      activities: [
        "Arrival in Santorini",
        "Hotel check-in",
        "Explore Fira town",
        "Dinner with caldera views"
      ],
      accommodation: "Santorini boutique hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Oia & Sunset",
      places: [
        "Oia",
        "Oia Castle",
        "Amoudi Bay"
      ],
      activities: [
        "Explore Oia village",
        "Visit Oia Castle viewpoint",
        "Walk through whitewashed lanes",
        "Watch iconic Santorini sunset",
        "Dinner at Amoudi Bay"
      ],
      accommodation: "Santorini hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Beaches & Caldera Cruise",
      places: [
        "Red Beach, Santorini",
        "Perissa Black Sand Beach",
        "Santorini Caldera"
      ],
      activities: [
        "Visit Red Beach",
        "Relax at Perissa Beach",
        "Caldera boat cruise with swimming",
        "Sunset from the sea"
      ],
      accommodation: "Santorini hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Departure",
      places: [
        "Fira",
        "Santorini Airport"
      ],
      activities: [
        "Leisure morning",
        "Souvenir shopping",
        "Airport transfer",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "3 nights accommodation",
    "Daily breakfast",
    "Caldera cruise",
    "Airport transfers"
  ],

  exclusions: [
    "Flights",
    "Travel insurance",
    "Lunches and dinners",
    "Personal expenses"
  ],

  tips: [
    "Book sunset-view hotels early",
    "Wear comfortable shoes (steep paths)",
    "Avoid peak sunset crowds by arriving early",
    "Carry sun protection"
  ],

  budget: {
    flights: "$500–900",
    accommodation: "$200–400/night",
    food: "$40–70/day",
    activities: "$150–300",
    transport: "$40–60",
    total: "$2,000–3,500 per person"
  }
};

export default santoriniItinerary;
