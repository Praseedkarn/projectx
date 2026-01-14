const mountCookItinerary = {
  slug:"mount-cook",
  title: "Mount Cook Alpine Adventure",
  duration: "4 days",
  location: "Aoraki / Mount Cook National Park, New Zealand",
  difficulty: "Moderate",
  priceRange: "$$$ (Scenic Adventure)",
  bestTime: "November to March",
  description:
    "Explore New Zealand’s highest peak with glacier views, alpine hikes, and breathtaking Southern Alps landscapes.",
  highlights: [
    "Aoraki / Mount Cook",
    "Hooker Valley Track",
    "Tasman Glacier views",
    "Alpine stargazing",
    "Scenic alpine walks"
  ],
  highlight360Views: [
  { label: "Mount Cook", place: "Aoraki Mount Cook, New Zealand" },
  { label: "Hooker Valley", place: "Hooker Valley Track, New Zealand" },
  { label: "Tasman Glacier", place: "Tasman Glacier, New Zealand" },
  { label: "Lake Pukaki", place: "Lake Pukaki, New Zealand" },
  { label: "Mueller Hut", place: "Mueller Hut Route, New Zealand" }
],

  image:
    "https://images.unsplash.com/photo-1502784444185-480c19d4f7b9",

  days: [
    {
      day: 1,
      title: "Arrival in Christchurch – Transfer to Mount Cook",
      places: [
        "Christchurch",
        "Aoraki / Mount Cook National Park"
      ],
      activities: [
        "Arrival in Christchurch",
        "Scenic drive to Mount Cook",
        "Check into alpine lodge",
        "Evening mountain views"
      ],
      accommodation: "Mount Cook lodge",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Hooker Valley Track",
      places: [
        "Hooker Valley Track",
        "Hooker Lake",
        "Mount Cook Village"
      ],
      activities: [
        "Hike the Hooker Valley Track",
        "Suspension bridges and glacier views",
        "Picnic at Hooker Lake",
        "Free afternoon"
      ],
      accommodation: "Mount Cook lodge",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Tasman Glacier & Alpine Activities",
      places: [
        "Tasman Glacier",
        "Tasman Lake",
        "Aoraki National Park"
      ],
      activities: [
        "Visit Tasman Glacier viewpoint",
        "Optional glacier boat tour",
        "Stargazing (Dark Sky Reserve)"
      ],
      accommodation: "Mount Cook lodge",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Departure",
      places: [
        "Mount Cook Village",
        "Christchurch"
      ],
      activities: [
        "Leisure morning",
        "Drive back to Christchurch",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "3 nights accommodation",
    "Daily breakfast",
    "Scenic transfers",
    "National park access"
  ],

  exclusions: [
    "Flights",
    "Travel insurance",
    "Optional glacier activities",
    "Personal expenses"
  ],

  tips: [
    "Carry windproof layers",
    "Weather can change rapidly",
    "Wear proper hiking shoes",
    "Book glacier tours early"
  ],

  budget: {
    flights: "$800–1,200",
    accommodation: "$150–250/night",
    food: "$30–50/day",
    activities: "$100–200",
    transport: "$150–250",
    total: "$2,000–3,200 per person"
  }
};

export default mountCookItinerary;
