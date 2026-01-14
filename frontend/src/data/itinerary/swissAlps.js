const swissAlpsItinerary = {
  slug:"swiss-alps",
  title: "Swiss Alps Scenic Escape",
  duration: "6 days",
  location: "Switzerland",
  difficulty: "Moderate",
  priceRange: "$$$$ (Luxury)",
  bestTime: "May to September",
  description:
    "A breathtaking European journey through alpine villages, snow-capped peaks, crystal lakes, and iconic scenic train routes.",

  highlights: [
    "Jungfraujoch – Top of Europe",
    "Lucerne Lake Cruise",
    "Interlaken & alpine villages",
    "Scenic Swiss train journeys",
    "Snow activities & cable cars"
  ],
  highlight360Views: [
  { label: "Jungfraujoch", place: "Jungfraujoch, Switzerland" },
  { label: "Matterhorn", place: "Matterhorn, Zermatt" },
  { label: "Lauterbrunnen Valley", place: "Lauterbrunnen Valley, Switzerland" },
  { label: "Grindelwald", place: "Grindelwald, Switzerland" },
  { label: "Interlaken", place: "Interlaken, Switzerland" }
],


  image:
    "https://images.unsplash.com/photo-1508264165352-258a6c54b6c1",

  days: [
    {
      day: 1,
      title: "Arrival in Zurich – Lucerne",
      places: [
        "Zurich Airport",
        "Zurich Hauptbahnhof",
        "Lucerne",
        "Chapel Bridge",
        "Lake Lucerne"
      ],
      activities: [
        "Arrival at Zurich airport",
        "Train transfer to Lucerne",
        "Visit Chapel Bridge",
        "Evening lake-side walk"
      ],
      accommodation: "Lucerne hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Lucerne – Mt. Titlis",
      places: [
        "Lucerne",
        "Engelberg",
        "Mount Titlis",
        "Titlis Rotair",
        "Titlis Glacier Cave"
      ],
      activities: [
        "Excursion to Mount Titlis",
        "Cable car & Rotair experience",
        "Snow activities and glacier cave",
        "Return to Lucerne"
      ],
      accommodation: "Lucerne hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Lucerne to Interlaken",
      places: [
        "Lucerne",
        "Interlaken",
        "Höhematte Park",
        "Interlaken West"
      ],
      activities: [
        "Scenic train ride to Interlaken",
        "Explore Interlaken town",
        "Optional paragliding experience"
      ],
      accommodation: "Interlaken hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Jungfraujoch – Top of Europe",
      places: [
        "Interlaken",
        "Grindelwald",
        "Kleine Scheidegg",
        "Jungfraujoch",
        "Sphinx Observatory"
      ],
      activities: [
        "Train journey to Jungfraujoch",
        "Snow Plateau & Ice Palace",
        "Alpine sightseeing"
      ],
      accommodation: "Interlaken hotel",
      meals: "Breakfast included"
    },
    {
      day: 5,
      title: "Lake Thun & Lake Brienz",
      places: [
        "Lake Thun",
        "Lake Brienz",
        "Iseltwald",
        "Brienz Village"
      ],
      activities: [
        "Boat cruise on Lake Thun",
        "Visit alpine villages",
        "Free time for shopping"
      ],
      accommodation: "Interlaken hotel",
      meals: "Breakfast included"
    },
    {
      day: 6,
      title: "Departure – Zurich",
      places: [
        "Interlaken",
        "Zurich Hauptbahnhof",
        "Zurich Airport"
      ],
      activities: [
        "Train transfer to Zurich",
        "Airport drop",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "5 nights accommodation",
    "Daily breakfast",
    "Swiss rail pass",
    "Mountain excursions",
    "Cable car tickets"
  ],

  exclusions: [
    "International flights",
    "Visa charges",
    "Personal expenses",
    "Optional adventure sports"
  ],

  tips: [
    "Carry warm clothing even in summer",
    "Buy Swiss rail pass early",
    "Wear comfortable walking shoes",
    "Follow mountain safety guidelines"
  ],

  budget: {
    flights: "$800–1,200",
    accommodation: "$200–350/night",
    food: "$40–60/day",
    transport: "Included (rail pass)",
    activities: "$200–400",
    total: "$3,500–5,000 per person"
  }
};

export default swissAlpsItinerary;
