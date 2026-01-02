const dolomitesItinerary = {
  
  title: "Dolomites Hiking Tour",
  duration: "6 days",
  location: "Bolzano → Cortina d’Ampezzo → Val Gardena, Italy",
  difficulty: "Moderate",
  priceRange: "$$$ (Comfort Adventure)",
  bestTime: "June to September",
  description:
    "Explore the dramatic limestone peaks, alpine meadows, and scenic mountain trails of the Italian Dolomites, a UNESCO World Heritage region.",
  highlights: [
    "Tre Cime di Lavaredo hike",
    "Alpe di Siusi alpine meadows",
    "Cinque Torri rock formations",
    "Scenic cable cars and mountain refuges",
    "Traditional alpine villages"
  ],
  highlight360Views: [
  { label: "Tre Cime di Lavaredo", place: "Tre Cime di Lavaredo, Italy" },
  { label: "Alpe di Siusi", place: "Alpe di Siusi, Italy" },
  { label: "Cinque Torri", place: "Cinque Torri, Cortina d'Ampezzo" },
  { label: "Passo Falzarego", place: "Passo Falzarego, Italy" },
  { label: "Val Gardena", place: "Val Gardena, Italy" }
],

  image:
    "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5",

  days: [
    {
      day: 1,
      title: "Arrival in Bolzano",
      places: [
        "Bolzano",
        "Bolzano Train Station",
        "Bolzano Old Town",
        "South Tyrol Museum of Archaeology"
      ],
      activities: [
        "Arrival in Bolzano",
        "Hotel check-in",
        "Explore Bolzano Old Town",
        "Optional visit to Ötzi Museum",
        "Welcome dinner"
      ],
      accommodation: "Bolzano hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Bolzano to Val Gardena – Alpe di Siusi",
      places: [
        "Val Gardena",
        "Alpe di Siusi",
        "Ortisei"
      ],
      activities: [
        "Scenic drive to Val Gardena",
        "Cable car to Alpe di Siusi",
        "Hike through alpine meadows",
        "Photography and picnic stops",
        "Return to Ortisei village"
      ],
      accommodation: "Val Gardena hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Val Gardena to Cortina d’Ampezzo",
      places: [
        "Cortina d’Ampezzo",
        "Passo Gardena",
        "Passo Falzarego"
      ],
      activities: [
        "Drive via scenic mountain passes",
        "Short hikes with panoramic views",
        "Arrive in Cortina d’Ampezzo",
        "Evening walk through town"
      ],
      accommodation: "Cortina d’Ampezzo hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Tre Cime di Lavaredo Hike",
      places: [
        "Tre Cime di Lavaredo",
        "Rifugio Auronzo",
        "Rifugio Lavaredo"
      ],
      activities: [
        "Drive to Tre Cime trailhead",
        "Circular hike around Tre Cime peaks",
        "Lunch at mountain rifugio",
        "Photography and rest stops",
        "Return to Cortina"
      ],
      accommodation: "Cortina d’Ampezzo hotel",
      meals: "Breakfast included"
    },
    {
      day: 5,
      title: "Cinque Torri & Lagazuoi",
      places: [
        "Cinque Torri",
        "Lagazuoi Cable Car",
        "Passo Falzarego"
      ],
      activities: [
        "Hike around Cinque Torri rock towers",
        "World War I open-air museum visit",
        "Cable car ride to Mount Lagazuoi",
        "Panoramic Dolomites views"
      ],
      accommodation: "Cortina d’Ampezzo hotel",
      meals: "Breakfast included"
    },
    {
      day: 6,
      title: "Departure",
      places: [
        "Cortina d’Ampezzo",
        "Bolzano",
        "Venice Marco Polo Airport"
      ],
      activities: [
        "Morning leisure time",
        "Drive back to Bolzano or Venice",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "5 nights accommodation (3–4 star hotels)",
    "Daily breakfast",
    "Professional hiking guide",
    "Cable car tickets",
    "All ground transportation",
    "National park access fees"
  ],

  exclusions: [
    "International flights",
    "Travel insurance",
    "Lunches and dinners",
    "Personal hiking gear",
    "Optional activities"
  ],

  tips: [
    "Wear sturdy hiking boots",
    "Carry layers – weather changes quickly",
    "Use trekking poles for descents",
    "Book cable cars early in peak season",
    "Stay hydrated at altitude"
  ],

  budget: {
    flights: "$500–900",
    accommodation: "$120–220/night",
    food: "$30–50/day",
    activities: "$50–100/day",
    transport: "$100–150",
    total: "$1,800–2,800 per person"
  }
};

export default dolomitesItinerary;
