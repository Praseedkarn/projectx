const icelandRingRoadItinerary = {
  slug:"iceland-ring-road",
  title: "Iceland Ring Road Adventure",
  duration: "8 days",
  location: "Reykjavík → Golden Circle → South Coast → East Fjords → North Iceland → Reykjavík",
  difficulty: "Moderate",
  priceRange: "$$$$ (Premium Road Trip)",
  bestTime: "June to September (summer) or September to March (Northern Lights)",
  description:
    "A spectacular self-drive journey around Iceland’s Ring Road featuring waterfalls, glaciers, volcanoes, black sand beaches, and geothermal wonders.",
  highlights: [
    "Golden Circle sights",
    "Seljalandsfoss & Skógafoss waterfalls",
    "Vatnajökull Glacier",
    "Jökulsárlón Glacier Lagoon",
    "Myvatn geothermal area",
    "Northern Lights (seasonal)"
  ],
  highlight360Views: [
  { label: "Skogafoss", place: "Skogafoss, Iceland" },
  { label: "Geysir", place: "Geysir, Iceland" },
  { label: "Gullfoss", place: "Gullfoss, Iceland" },
  { label: "Reynisfjara Beach", place: "Reynisfjara Beach, Iceland" },
  { label: "Northern Lights Spot", place: "Thingvellir National Park, Iceland" }
],

  image:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

  days: [
    {
      day: 1,
      title: "Arrival in Reykjavík",
      places: [
        "Keflavík International Airport",
        "Reykjavík City",
        "Hallgrímskirkja",
        "Harpa Concert Hall"
      ],
      activities: [
        "Arrival at Keflavík Airport",
        "Pick up rental car",
        "Check into hotel",
        "Explore Reykjavík city center",
        "Evening walk and dinner"
      ],
      accommodation: "Reykjavík hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Golden Circle",
      places: [
        "Þingvellir National Park",
        "Geysir Geothermal Area",
        "Gullfoss Waterfall"
      ],
      activities: [
        "Drive the Golden Circle route",
        "Visit Þingvellir National Park",
        "Watch erupting geysers",
        "Visit Gullfoss waterfall"
      ],
      accommodation: "South Iceland hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "South Coast Waterfalls",
      places: [
        "Seljalandsfoss",
        "Skógafoss",
        "Reynisfjara Black Sand Beach",
        "Vík"
      ],
      activities: [
        "Walk behind Seljalandsfoss",
        "Visit Skógafoss waterfall",
        "Explore Reynisfjara beach",
        "Evening in Vík village"
      ],
      accommodation: "Vík hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Glaciers & Ice Lagoons",
      places: [
        "Vatnajökull National Park",
        "Jökulsárlón Glacier Lagoon",
        "Diamond Beach"
      ],
      activities: [
        "Drive through Vatnajökull National Park",
        "Visit Jökulsárlón lagoon",
        "Walk along Diamond Beach",
        "Optional glacier hike or boat tour"
      ],
      accommodation: "Southeast Iceland hotel",
      meals: "Breakfast included"
    },
    {
      day: 5,
      title: "East Fjords",
      places: [
        "Eastfjords",
        "Seyðisfjörður"
      ],
      activities: [
        "Scenic drive through East Fjords",
        "Visit fishing villages",
        "Photography stops",
        "Evening in Seyðisfjörður"
      ],
      accommodation: "East Iceland guesthouse",
      meals: "Breakfast included"
    },
    {
      day: 6,
      title: "North Iceland & Myvatn",
      places: [
        "Lake Mývatn",
        "Hverir Geothermal Area",
        "Dettifoss"
      ],
      activities: [
        "Visit Lake Mývatn",
        "Explore geothermal landscapes",
        "Visit Dettifoss waterfall",
        "Optional Myvatn Nature Baths"
      ],
      accommodation: "North Iceland hotel",
      meals: "Breakfast included"
    },
    {
      day: 7,
      title: "Akureyri to Reykjavík",
      places: [
        "Akureyri",
        "Hvítserkur Rock",
        "Reykjavík"
      ],
      activities: [
        "Explore Akureyri town",
        "Visit Hvítserkur rock formation",
        "Drive back to Reykjavík",
        "Optional Northern Lights hunt (seasonal)"
      ],
      accommodation: "Reykjavík hotel",
      meals: "Breakfast included"
    },
    {
      day: 8,
      title: "Departure",
      places: [
        "Reykjavík",
        "Keflavík International Airport"
      ],
      activities: [
        "Return rental car",
        "Airport transfer",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "7 nights accommodation",
    "Daily breakfast",
    "Car rental",
    "Golden Circle & Ring Road access",
    "National park fees"
  ],

  exclusions: [
    "Flights",
    "Travel insurance",
    "Fuel costs",
    "Optional glacier & boat tours",
    "Personal expenses"
  ],

  tips: [
    "Check weather and road conditions daily",
    "Carry windproof & waterproof layers",
    "Fuel up whenever possible",
    "Drive carefully in changing conditions"
  ],

  budget: {
    flights: "$700–1,200",
    accommodation: "$180–300/night",
    food: "$40–60/day",
    transport: "$120–180/day",
    activities: "$150–300",
    total: "$3,500–5,500 per person"
  }
};

export default icelandRingRoadItinerary;
