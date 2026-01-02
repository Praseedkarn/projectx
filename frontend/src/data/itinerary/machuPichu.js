const incaTrailItinerary = {
  id: 23,
  title: "Inca Trail to Machu Picchu",
  duration: "7 days",
  location: "Cusco → Inca Trail → Machu Picchu, Peru",
  difficulty: "Hard",
  priceRange: "$$$ (Adventure Trek)",
  bestTime: "May to September",
  description:
    "Trek the legendary Inca Trail through ancient ruins, cloud forests, and high mountain passes, culminating at the iconic Machu Picchu.",
  highlights: [
    "Classic Inca Trail trek",
    "Dead Woman’s Pass (Warmiwañusca)",
    "Ancient Inca ruins along the trail",
    "Sun Gate (Inti Punku) sunrise",
    "Machu Picchu guided tour"
  ],
  highlight360Views: [
  { label: "Machu Picchu", place: "Machu Picchu, Peru" },
  { label: "Huayna Picchu", place: "Huayna Picchu, Peru" },
  { label: "Sacred Valley", place: "Sacred Valley, Peru" },
  { label: "Cusco", place: "Cusco, Peru" },
  { label: "Sun Gate", place: "Inti Punku, Peru" }
],

  image:
    "https://images.unsplash.com/photo-1549298916-b41d501d3772",

  days: [
    {
      day: 1,
      title: "Arrival in Cusco",
      places: [
        "Alejandro Velasco Astete International Airport",
        "Cusco City",
        "Plaza de Armas, Cusco",
        "Qorikancha"
      ],
      activities: [
        "Arrive in Cusco",
        "Hotel transfer and rest",
        "Light acclimatization walk",
        "Visit Plaza de Armas and Qorikancha",
        "Trek briefing and gear check"
      ],
      accommodation: "Cusco hotel (3-star)",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Inca Trail Day 1 – Km 82 to Wayllabamba",
      places: [
        "Km 82 Inca Trail",
        "Urubamba River",
        "Wayllabamba Campsite"
      ],
      activities: [
        "Early drive to Km 82 trailhead",
        "Begin Inca Trail trek",
        "Walk along Urubamba River",
        "Set up camp at Wayllabamba"
      ],
      accommodation: "Campsite (tent)",
      meals: "All meals included"
    },
    {
      day: 3,
      title: "Inca Trail Day 2 – Dead Woman’s Pass",
      places: [
        "Dead Woman’s Pass (Warmiwañusca)",
        "Pacaymayo Campsite"
      ],
      activities: [
        "Steep ascent to Dead Woman’s Pass (4,215 m)",
        "Panoramic mountain views",
        "Descent to Pacaymayo Valley",
        "Overnight at campsite"
      ],
      accommodation: "Campsite (tent)",
      meals: "All meals included"
    },
    {
      day: 4,
      title: "Inca Trail Day 3 – Inca Ruins",
      places: [
        "Runkurakay",
        "Sayacmarca",
        "Phuyupatamarca",
        "Wiñay Wayna Campsite"
      ],
      activities: [
        "Visit ancient Inca ruins",
        "Cloud forest trekking",
        "Explore Phuyupatamarca (Town Above the Clouds)",
        "Arrive at Wiñay Wayna campsite"
      ],
      accommodation: "Campsite (tent)",
      meals: "All meals included"
    },
    {
      day: 5,
      title: "Sun Gate & Machu Picchu",
      places: [
        "Inti Punku (Sun Gate)",
        "Machu Picchu",
        "Aguas Calientes"
      ],
      activities: [
        "Early morning hike to Sun Gate",
        "First views of Machu Picchu",
        "Guided tour of Machu Picchu citadel",
        "Bus down to Aguas Calientes"
      ],
      accommodation: "Aguas Calientes hotel",
      meals: "Breakfast included"
    },
    {
      day: 6,
      title: "Machu Picchu Exploration & Return",
      places: [
        "Machu Picchu",
        "Huayna Picchu (optional)",
        "Ollantaytambo",
        "Cusco City"
      ],
      activities: [
        "Optional hike to Huayna Picchu or Machu Picchu Mountain",
        "Free time at Machu Picchu",
        "Train to Ollantaytambo",
        "Transfer back to Cusco"
      ],
      accommodation: "Cusco hotel",
      meals: "Breakfast included"
    },
    {
      day: 7,
      title: "Departure",
      places: [
        "San Pedro Market, Cusco",
        "Cusco City",
        "Alejandro Velasco Astete International Airport"
      ],
      activities: [
        "Last-minute shopping at San Pedro Market",
        "Airport transfer",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "6 nights accommodation (hotel + camping)",
    "Professional trekking guide",
    "Porters and camping equipment",
    "All meals during trek",
    "Inca Trail permits",
    "Machu Picchu entrance ticket",
    "Train ticket from Aguas Calientes",
    "All ground transportation"
  ],

  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal trekking gear",
    "Tips for guides and porters",
    "Huayna Picchu permit (optional)"
  ],

  tips: [
    "Book permits 4–6 months in advance",
    "Train cardio before the trek",
    "Pack layers for changing weather",
    "Carry altitude sickness medication",
    "Use trekking poles for steep descents"
  ],

  budget: {
    flights: "$600–1000",
    accommodation: "$50–100/night",
    food: "Included during trek",
    permits: "$200–300",
    transport: "$100–200",
    total: "$1800–3000 per person"
  }
};

export default incaTrailItinerary;
