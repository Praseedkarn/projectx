const himachalItinerary = {
  id: 14,
  title: "Himachal Adventure Trail",
  duration: "6 days",
  location: "Himachal Pradesh, India",
  difficulty: "Hard",
  priceRange: "$$ (Mid-range)",
  bestTime: "March to June & September to November",
  description:
    "A thrilling journey through the mountains of Himachal featuring trekking, rivers, forests, and high-altitude adventure.",

  highlights: [
    "Trekking in the Himalayas",
    "River rafting in Kullu",
    "Camping under the stars",
    "Scenic mountain drives",
    "Local Himachali culture"
  ],
  highlight360Views: [
  { label: "Shimla Mall Road", place: "Mall Road, Shimla" },
  { label: "Manali Solang Valley", place: "Solang Valley, Manali" },
  { label: "Rohtang Pass", place: "Rohtang Pass, Himachal Pradesh" },
  { label: "Dharamshala", place: "Dharamshala, Himachal Pradesh" },
  { label: "Kasol Parvati Valley", place: "Kasol, Himachal Pradesh" }
],


  image:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

  days: [
    {
      day: 1,
      title: "Arrival in Manali",
      places: [
            "Manali, Himachal Pradesh",
            "Mall Road Manali"
],
      activities: [
        "Arrival in Manali",
        "Hotel check-in and rest",
        "Evening walk on Mall Road",
        "Acclimatization briefing"
      ],
      accommodation: "Manali mountain hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Solang Valley Adventure",
      places: [
        "manali ,Himachal pradesh",
  "Solang Valley, Himachal Pradesh"
],
      activities: [
        "Visit Solang Valley",
        "Paragliding and ziplining",
        "Snow activities (seasonal)",
        "Return to Manali"
      ],
      accommodation: "Manali mountain hotel",
      meals: "Breakfast & dinner included"
    },
    {
      day: 3,
      title: "Manali to Kasol",
      places:[
        "Manali, Himachal Pradesh",
  "Kasol, Himachal Pradesh",
  "Manikaran Sahib"
      ],
      activities: [
        "Drive to Kasol",
        "Visit Manikaran Sahib",
        "Explore Parvati Valley",
        "Riverside café hopping"
      ],
      accommodation: "Kasol riverside camp",
      meals: "Breakfast & dinner included"
    },
    {
      day: 4,
      title: "Kheerganga Trek",
      places:[
         "Kasol, Himachal Pradesh",
  "Kheerganga Trek Start Point",
  "Kheerganga Top"
      ],
      activities: [
        "Start Kheerganga trek",
        "Forest and waterfall views",
        "Reach top and relax in hot springs"
      ],
      accommodation: "Camping tents",
      meals: "Breakfast & dinner included"
    },
    {
      day: 5,
      title: "Return & River Rafting",
      places:[
"Kheerganga",
  "Kullu River Rafting Point",
  "Manali, Himachal Pradesh"
      ],
      activities: [
        "Descend from trek",
        "River rafting in Kullu",
        "Drive back to Manali"
      ],
      accommodation: "Manali mountain hotel",
      meals: "Breakfast & dinner included"
    },
    {
      day: 6,
      title: "Departure",
      places:[
        "Manali , Himachal Pradesh"
      ],
      activities: [
        "Breakfast",
        "Souvenir shopping",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "5 nights accommodation",
    "Daily breakfast and dinner",
    "Trekking guide",
    "River rafting experience",
    "All transfers"
  ],

  exclusions: [
    "Travel insurance",
    "Personal expenses",
    "Adventure gear rental",
    "Tips"
  ],

  tips: [
    "Carry warm clothing",
    "Good trekking shoes required",
    "Stay hydrated",
    "Avoid alcohol at altitude"
  ],

  budget: {
    transport: "₹6,000–8,000",
    accommodation: "₹2,000–3,500/night",
    food: "Included",
    activities: "₹2,000–4,000",
    total: "₹25,000–35,000 per person"
  }
};

export default himachalItinerary;
