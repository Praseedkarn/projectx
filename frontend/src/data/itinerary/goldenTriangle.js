const goldenTriangleItinerary = {
  title: "Golden Triangle Tour",
slug:"golden-triangle",
  duration: "4 days",
  location: "Delhi – Agra – Jaipur, India",
  difficulty: "Easy",
  priceRange: "$ (Budget)",
  bestTime: "October to March",
  description:
    "A classic Indian journey covering historical monuments, royal palaces, and vibrant culture.",

  highlights: [
    "Taj Mahal sunrise visit",
    "Red Fort & India Gate",
    "Amber Fort in Jaipur",
    "Local bazaars and cuisine"
  ],
  highlight360Views: [
  { label: "Taj Mahal", place: "Taj Mahal, Agra" },
  { label: "Amber Fort", place: "Amber Fort, Jaipur" },
  { label: "Hawa Mahal", place: "Hawa Mahal, Jaipur" },
  { label: "India Gate", place: "India Gate, Delhi" },
  { label: "Qutub Minar", place: "Qutub Minar, Delhi" }
],


  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada",

  days: [
    {
      day: 1,
      title: "Delhi Sightseeing",
      places:[
        "India Gate, Delhi",
  "Red Fort, Delhi",
  "Qutub Minar, Delhi",
  "Chandni Chowk, Delhi"
      ],
      activities: [
        "Visit India Gate",
        "Red Fort tour",
        "Qutub Minar",
        "Chandni Chowk walk"
      ],
      accommodation: "Delhi city hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Delhi to Agra",
      places:[
        "Delhi",
  "Taj Mahal, Agra",
  "Agra Fort"
      ],
      activities: [
        "Drive to Agra",
        "Visit Taj Mahal",
        "Explore Agra Fort"
      ],
      accommodation: "Agra hotel",
      meals: "Breakfast included"
    },
    {
      day: 3,
      title: "Agra to Jaipur",
      places:[
        "Agra",
  "Fatehpur Sikri",
  "Jaipur, Rajasthan"
      ],
      activities: [
        "Drive to Jaipur",
        "Visit Fatehpur Sikri",
        "Local market exploration"
      ],
      accommodation: "Jaipur hotel",
      meals: "Breakfast included"
    },
    {
      day: 4,
      title: "Jaipur & Departure",
      places:[
          "Amber Fort, Jaipur",
  "City Palace, Jaipur",
  "Hawa Mahal, Jaipur"
      ],
      activities: [
        "Amber Fort visit",
        "City Palace",
        "Hawa Mahal",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "3 nights accommodation",
    "Daily breakfast",
    "All transfers",
    "Monument entry tickets"
  ],

  exclusions: [
    "Flights/train tickets",
    "Lunch & dinner",
    "Personal expenses"
  ],

  tips: [
    "Start Taj Mahal early",
    "Carry sunscreen",
    "Stay hydrated"
  ],

  budget: {
    transport: "₹4,000–6,000",
    accommodation: "₹1,500–2,500/night",
    food: "₹500–800/day",
    total: "₹15,000–20,000 per person"
  }
};

export default goldenTriangleItinerary;
