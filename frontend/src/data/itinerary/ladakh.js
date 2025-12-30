const ladakhItinerary = {
  id: 35,
  title: "Ladakh Monastery Trail",
  duration: "7 days",
  location: "Leh → Nubra Valley → Pangong Lake, Ladakh",
  difficulty: "Hard",
  priceRange: "$$$ (High Altitude Adventure)",
  bestTime: "June to September",
  description:
    "A high-altitude journey through Ladakh’s dramatic landscapes, ancient Buddhist monasteries, mountain passes, and remote Himalayan valleys.",
  highlights: [
    "Leh Palace & Shanti Stupa",
    "Hemis & Thiksey Monasteries",
    "Khardung La Pass",
    "Nubra Valley sand dunes",
    "Pangong Lake sunrise",
    "Himalayan desert landscapes"
  ],
  image:
    "https://images.unsplash.com/photo-1623914324573-4c0c14b7d98d",

  days: [
    {
      day: 1,
      title: "Arrival in Leh & Acclimatization",
      places: [
        "Kushok Bakula Rimpochee Airport",
        "Leh City",
        "Leh Market"
      ],
      activities: [
        "Arrival at Leh airport",
        "Hotel transfer and rest",
        "Acclimatization day",
        "Evening walk in Leh Market"
      ],
      accommodation: "Leh hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Leh Monastery Tour",
      places: [
        "Shanti Stupa",
        "Leh Palace",
        "Thiksey Monastery",
        "Hemis Monastery"
      ],
      activities: [
        "Visit Shanti Stupa for panoramic views",
        "Explore Leh Palace",
        "Visit Thiksey Monastery",
        "Explore Hemis Monastery"
      ],
      accommodation: "Leh hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Leh to Nubra Valley via Khardung La",
      places: [
        "Khardung La Pass",
        "Nubra Valley",
        "Diskit Monastery",
        "Hunder Sand Dunes"
      ],
      activities: [
        "Drive over Khardung La (one of the highest motorable roads)",
        "Descend into Nubra Valley",
        "Visit Diskit Monastery",
        "Camel ride at Hunder sand dunes"
      ],
      accommodation: "Nubra Valley guesthouse",
      meals: "Breakfast & dinner included"
    },
    {
      day: 4,
      title: "Nubra Valley Exploration",
      places: [
        "Sumur Village",
        "Samstanling Monastery",
        "Nubra Valley"
      ],
      activities: [
        "Visit Samstanling Monastery",
        "Explore Nubra villages",
        "Interact with local communities",
        "Evening leisure in valley"
      ],
      accommodation: "Nubra Valley guesthouse",
      meals: "Breakfast & dinner included"
    },
    {
      day: 5,
      title: "Nubra Valley to Pangong Lake",
      places: [
        "Shyok River Route",
        "Pangong Lake"
      ],
      activities: [
        "Scenic drive along Shyok River",
        "Arrive at Pangong Lake",
        "Photography and lakeside walk",
        "Sunset over Pangong Lake"
      ],
      accommodation: "Pangong Lake camp",
      meals: "Breakfast & dinner included"
    },
    {
      day: 6,
      title: "Pangong Lake to Leh",
      places: [
        "Pangong Lake",
        "Chang La Pass",
        "Leh City"
      ],
      activities: [
        "Sunrise at Pangong Lake",
        "Drive via Chang La Pass",
        "Return to Leh",
        "Free evening for shopping"
      ],
      accommodation: "Leh hotel",
      meals: "Breakfast included"
    },
    {
      day: 7,
      title: "Departure",
      places: [
        "Leh Market",
        "Kushok Bakula Rimpochee Airport"
      ],
      activities: [
        "Morning leisure time",
        "Hotel check-out",
        "Airport transfer",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "6 nights accommodation (hotels + camps)",
    "Daily breakfast and selected dinners",
    "All transfers and sightseeing by SUV",
    "Inner-line permits",
    "Experienced local driver"
  ],

  exclusions: [
    "Flights",
    "Travel insurance",
    "Personal expenses",
    "Camel ride charges",
    "Tips and gratuities"
  ],

  tips: [
    "Acclimatize properly to avoid AMS",
    "Carry warm clothing even in summer",
    "Drink plenty of water",
    "Avoid alcohol at high altitude",
    "Carry cash (limited ATMs)"
  ],

  budget: {
    flights: "$200–400 (domestic)",
    accommodation: "$60–120/night",
    food: "$15–25/day",
    transport: "$40–60/day",
    permits: "$10–20",
    total: "$900–1,500 per person"
  }
};

export default ladakhItinerary;
