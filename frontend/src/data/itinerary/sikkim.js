const sikkimItinerary = {
  slug:"sikkim-gangtok",
  title: "Sikkim & Gangtok Explorer",
  duration: "6 days",
  location: "Gangtok → Tsomgo Lake → Lachung → Yumthang Valley, Sikkim",
  difficulty: "Moderate",
  priceRange: "$$ (Mid-range)",
  bestTime: "March to June & September to November",
  description:
    "Explore the tranquil Himalayas of Sikkim with monasteries, alpine valleys, snow-capped peaks, and rich Buddhist culture.",
  highlights: [
    "Gangtok city and monasteries",
    "Tsomgo (Changu) Lake",
    "Yumthang Valley – Valley of Flowers",
    "Lachung mountain village",
    "Buddhist culture and scenic drives"
  ],
  highlight360Views: [
  { label: "Nathula Pass", place: "Nathula Pass, Sikkim" },
  { label: "Tsomgo Lake", place: "Tsomgo Lake, Sikkim" },
  { label: "Gangtok", place: "Gangtok, Sikkim" },
  { label: "Yumthang Valley", place: "Yumthang Valley, Sikkim" },
  { label: "Rumtek Monastery", place: "Rumtek Monastery, Sikkim" }
],

  image:
    "https://images.unsplash.com/photo-1613921568536-4d5a8b1b0b1a",

  days: [
    {
      day: 1,
      title: "Arrival in Gangtok",
      places: [
        "Bagdogra Airport",
        "Gangtok",
        "MG Marg, Gangtok"
      ],
      activities: [
        "Arrival at Bagdogra Airport",
        "Scenic drive to Gangtok",
        "Hotel check-in",
        "Evening walk at MG Marg"
      ],
      accommodation: "Gangtok hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Gangtok Local Sightseeing",
      places: [
        "Rumtek Monastery",
        "Enchey Monastery",
        "Namgyal Institute of Tibetology",
        "Tashi View Point"
      ],
      activities: [
        "Visit Rumtek Monastery",
        "Explore Enchey Monastery",
        "Learn Tibetan culture at Tibetology Institute",
        "Sunset view at Tashi View Point"
      ],
      accommodation: "Gangtok hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Gangtok to Lachung",
      places: [
        "Lachung",
        "Seven Sisters Waterfall",
        "Chungthang"
      ],
      activities: [
        "Drive to Lachung",
        "Stop at waterfalls and scenic points",
        "Lunch at Chungthang",
        "Arrive and relax in Lachung village"
      ],
      accommodation: "Lachung hotel",
      meals: "Breakfast & dinner included"
    },
    {
      day: 4,
      title: "Yumthang Valley Excursion",
      places: [
        "Yumthang Valley",
        "Hot Springs Yumthang",
        "Lachung"
      ],
      activities: [
        "Visit Yumthang Valley (Valley of Flowers)",
        "Optional hot spring visit",
        "Return to Lachung",
        "Evening leisure"
      ],
      accommodation: "Lachung hotel",
      meals: "Breakfast & dinner included"
    },
    {
      day: 5,
      title: "Lachung to Gangtok",
      places: [
        "Lachung",
        "Gangtok"
      ],
      activities: [
        "Return drive to Gangtok",
        "Free time for shopping",
        "Optional local café hopping"
      ],
      accommodation: "Gangtok hotel",
      meals: "Breakfast included"
    },
    {
      day: 6,
      title: "Tsomgo Lake & Departure",
      places: [
        "Tsomgo Lake",
        "Baba Harbhajan Singh Temple",
        "Bagdogra Airport"
      ],
      activities: [
        "Visit Tsomgo (Changu) Lake",
        "Visit Baba Mandir",
        "Transfer to airport",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "5 nights accommodation",
    "Daily breakfast",
    "Inner-line permits",
    "All transfers and sightseeing",
    "Experienced local driver"
  ],

  exclusions: [
    "Flights or train tickets",
    "Travel insurance",
    "Personal expenses",
    "Optional activities"
  ],

  tips: [
    "Carry warm clothes year-round",
    "Keep permits handy",
    "Respect monastery rules",
    "Roads may be slow due to terrain"
  ],

  budget: {
    flights: "$150–300 (domestic)",
    accommodation: "$50–100/night",
    food: "$15–25/day",
    transport: "$20–30/day",
    total: "$600–1,000 per person"
  }
};

export default sikkimItinerary;
