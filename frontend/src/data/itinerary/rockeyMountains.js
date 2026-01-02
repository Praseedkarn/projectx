const rockyMountainsItinerary = {
  title: "Rocky Mountains Road & Hike",
  duration: "5 days",
  location: "Denver → Rocky Mountain National Park → Aspen → Vail, Colorado",
  difficulty: "Easy",
  priceRange: "$$$ (Comfort Road Trip)",
  bestTime: "June to September",
  description:
    "A scenic road trip through Colorado’s Rocky Mountains featuring national parks, alpine lakes, wildlife, and charming mountain towns.",
  highlights: [
    "Rocky Mountain National Park",
    "Trail Ridge Road scenic drive",
    "Bear Lake & Emerald Lake hike",
    "Aspen mountain town",
    "Vail alpine village"
  ],
  highlight360Views: [
  { label: "Rocky Mountains", place: "Rocky Mountains National Park, USA" },
  { label: "Trail Ridge Road", place: "Trail Ridge Road, Colorado" },
  { label: "Bear Lake", place: "Bear Lake, Rocky Mountains" },
  { label: "Emerald Lake", place: "Emerald Lake, Colorado" },
  { label: "Moraine Park", place: "Moraine Park, Colorado" }
],

  image:
    "https://images.unsplash.com/photo-1508261305436-74f27b51c6c2",

  days: [
    {
      day: 1,
      title: "Arrival in Denver",
      places: [
        "Denver International Airport",
        "Denver Downtown",
        "Union Station Denver"
      ],
      activities: [
        "Arrive in Denver",
        "Pick up rental car",
        "Explore downtown Denver",
        "Evening at Union Station"
      ],
      accommodation: "Denver hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Denver to Rocky Mountain National Park",
      places: [
        "Rocky Mountain National Park",
        "Trail Ridge Road",
        "Bear Lake"
      ],
      activities: [
        "Drive to Rocky Mountain National Park",
        "Scenic drive on Trail Ridge Road",
        "Short hike around Bear Lake",
        "Wildlife spotting (elk, deer)"
      ],
      accommodation: "Estes Park lodge",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Rocky Mountain NP to Aspen",
      places: [
        "Emerald Lake Trail",
        "Independence Pass",
        "Aspen"
      ],
      activities: [
        "Morning hike to Emerald Lake",
        "Drive via Independence Pass",
        "Arrive in Aspen",
        "Evening town walk"
      ],
      accommodation: "Aspen hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Aspen to Vail",
      places: [
        "Maroon Bells",
        "Vail",
        "Vail Village"
      ],
      activities: [
        "Visit Maroon Bells (iconic peaks)",
        "Scenic drive to Vail",
        "Explore Vail Village",
        "Optional gondola ride"
      ],
      accommodation: "Vail hotel",
      meals: "Breakfast included"
    },
    {
      day: 5,
      title: "Departure",
      places: [
        "Vail",
        "Denver International Airport"
      ],
      activities: [
        "Leisure morning",
        "Drive back to Denver",
        "Return rental car",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "4 nights accommodation",
    "Daily breakfast",
    "Car rental",
    "National park entry fees",
    "Scenic drives"
  ],

  exclusions: [
    "Flights",
    "Travel insurance",
    "Fuel costs",
    "Optional activities",
    "Personal expenses"
  ],

  tips: [
    "Carry light jackets even in summer",
    "Watch for wildlife on roads",
    "Start hikes early to avoid crowds",
    "Keep water and snacks in car"
  ],

  budget: {
    flights: "$400–800",
    accommodation: "$150–250/night",
    food: "$40–60/day",
    transport: "$80–120/day",
    activities: "$30–60/day",
    total: "$1,800–2,800 per person"
  }
};

export default rockyMountainsItinerary;
