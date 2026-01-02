const rishikeshItinerary = {
  title: "Rishikesh Yoga & Adventure",
  duration: "4 days",
  location: "Rishikesh, Uttarakhand, India",
  difficulty: "Easy",
  priceRange: "$ (Budget)",
  bestTime: "September to April",
  description:
    "A rejuvenating escape combining yoga, spirituality, river rafting, and adventure activities along the sacred Ganges.",
  highlights: [
    "Yoga & meditation sessions",
    "Ganga Aarti at Triveni Ghat",
    "River rafting on Ganges",
    "Laxman Jhula & Ram Jhula",
    "Spiritual ashrams"
  ],
  highlight360Views: [
  { label: "Laxman Jhula", place: "Laxman Jhula, Rishikesh" },
  { label: "Ram Jhula", place: "Ram Jhula, Rishikesh" },
  { label: "Ganga Aarti", place: "Triveni Ghat, Rishikesh" },
  { label: "Beatles Ashram", place: "Beatles Ashram, Rishikesh" },
  { label: "Neer Garh Waterfall", place: "Neer Garh Waterfall, Rishikesh" }
],

  image:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5",

  days: [
    {
      day: 1,
      title: "Arrival & Ganga Aarti",
      places: [
        "Haridwar Railway Station",
        "Rishikesh",
        "Triveni Ghat"
      ],
      activities: [
        "Arrival in Rishikesh",
        "Hotel or ashram check-in",
        "Evening Ganga Aarti at Triveni Ghat"
      ],
      accommodation: "Rishikesh hotel / ashram",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Yoga & Spiritual Exploration",
      places: [
        "Parmarth Niketan Ashram",
        "Ram Jhula",
        "Laxman Jhula"
      ],
      activities: [
        "Morning yoga and meditation",
        "Visit Parmarth Niketan Ashram",
        "Walk across Ram Jhula & Laxman Jhula",
        "Evening meditation session"
      ],
      accommodation: "Rishikesh hotel / ashram",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Adventure Day",
      places: [
        "Ganges River",
        "Shivpuri"
      ],
      activities: [
        "White-water river rafting",
        "Optional cliff jumping",
        "Nature walk by the river",
        "Evening leisure time"
      ],
      accommodation: "Rishikesh hotel / ashram",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Departure",
      places: [
        "Rishikesh",
        "Haridwar"
      ],
      activities: [
        "Morning yoga session",
        "Hotel check-out",
        "Transfer to Haridwar",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "3 nights accommodation",
    "Daily breakfast",
    "Yoga & meditation sessions",
    "River rafting experience",
    "Local transfers"
  ],

  exclusions: [
    "Travel tickets",
    "Travel insurance",
    "Personal expenses",
    "Optional adventure activities"
  ],

  tips: [
    "Carry comfortable yoga clothing",
    "Avoid alcohol and non-veg food",
    "Follow rafting safety instructions",
    "Respect ashram discipline"
  ],

  budget: {
    flights: "$100–200 (domestic)",
    accommodation: "$25–60/night",
    food: "$10–20/day",
    activities: "$20–40",
    total: "$300–600 per person"
  }
};

export default rishikeshItinerary;
