const patagoniaItinerary = {
  slug:"patagonia-wildness",
  title: "Patagonia Wilderness Trek",
  duration: "9 days",
  location: "Torres del Paine → El Chaltén → El Calafate, Patagonia",
  difficulty: "Hard",
  priceRange: "$$$$ (Expedition)",
  bestTime: "November to March",
  description:
    "An epic wilderness adventure through Patagonia’s glaciers, granite towers, alpine lakes, and remote national parks in Chile and Argentina.",
  highlights: [
    "Torres del Paine National Park",
    "Base Torres sunrise trek",
    "French Valley viewpoints",
    "Mount Fitz Roy hikes",
    "Perito Moreno Glacier walkways",
    "Untouched Patagonian landscapes"
  ],
  highlight360Views: [
  { label: "Torres del Paine", place: "Torres del Paine National Park, Chile" },
  { label: "Perito Moreno Glacier", place: "Perito Moreno Glacier, Argentina" },
  { label: "Fitz Roy", place: "Mount Fitz Roy, Argentina" },
  { label: "El Chaltén", place: "El Chaltén, Argentina" },
  { label: "Grey Glacier", place: "Grey Glacier, Patagonia" }
],

  image:
    "https://images.unsplash.com/photo-1508264165352-258a6c54b6c1",

  days: [
    {
      day: 1,
      title: "Arrival in Punta Arenas",
      places: [
        "Punta Arenas",
        "Presidente Carlos Ibáñez del Campo International Airport",
        "Plaza Muñoz Gamero"
      ],
      activities: [
        "Arrival in Punta Arenas",
        "Hotel check-in",
        "City walk and rest",
        "Trek briefing and equipment check"
      ],
      accommodation: "Punta Arenas hotel",
      meals: "Dinner included"
    },
    {
      day: 2,
      title: "Punta Arenas to Torres del Paine",
      places: [
        "Torres del Paine National Park",
        "Laguna Amarga",
        "Grey Lake"
      ],
      activities: [
        "Scenic drive to Torres del Paine",
        "Park entry formalities",
        "Short acclimatization hike",
        "Lake and glacier viewpoints"
      ],
      accommodation: "Mountain refugio",
      meals: "All meals included"
    },
    {
      day: 3,
      title: "Base Torres Trek",
      places: [
        "Base Torres",
        "Ascencio Valley",
        "Torres del Paine Peaks"
      ],
      activities: [
        "Early start for Base Torres hike",
        "Steep ascent through Ascencio Valley",
        "Sunrise views at Base Torres",
        "Return trek to refugio"
      ],
      accommodation: "Mountain refugio",
      meals: "All meals included"
    },
    {
      day: 4,
      title: "French Valley Exploration",
      places: [
        "Valle Francés",
        "French Glacier",
        "Nordenskjöld Lake"
      ],
      activities: [
        "Trek into French Valley",
        "Glacier and avalanche viewpoints",
        "Panoramic mountain photography",
        "Return to campsite"
      ],
      accommodation: "Mountain refugio",
      meals: "All meals included"
    },
    {
      day: 5,
      title: "Grey Glacier Trek",
      places: [
        "Grey Glacier",
        "Grey Lake",
        "Torres del Paine National Park"
      ],
      activities: [
        "Trek along Grey Lake",
        "View Grey Glacier",
        "Optional glacier boat excursion",
        "Final night in the park"
      ],
      accommodation: "Mountain refugio",
      meals: "All meals included"
    },
    {
      day: 6,
      title: "Torres del Paine to El Chaltén",
      places: [
        "Torres del Paine",
        "El Chaltén",
        "Los Glaciares National Park"
      ],
      activities: [
        "Drive across Chile–Argentina border",
        "Arrival in El Chaltén",
        "Evening town walk",
        "Rest for next trek"
      ],
      accommodation: "El Chaltén lodge",
      meals: "Breakfast included"
    },
    {
      day: 7,
      title: "Mount Fitz Roy Trek",
      places: [
        "Mount Fitz Roy",
        "Laguna de los Tres",
        "El Chaltén"
      ],
      activities: [
        "Full-day hike to Laguna de los Tres",
        "Close-up views of Mount Fitz Roy",
        "Picnic lunch with mountain views",
        "Return trek to El Chaltén"
      ],
      accommodation: "El Chaltén lodge",
      meals: "Breakfast included"
    },
    {
      day: 8,
      title: "El Chaltén to El Calafate – Perito Moreno Glacier",
      places: [
        "El Calafate",
        "Perito Moreno Glacier",
        "Los Glaciares National Park"
      ],
      activities: [
        "Drive to El Calafate",
        "Visit Perito Moreno Glacier",
        "Walk glacier viewing platforms",
        "Optional boat ride near glacier"
      ],
      accommodation: "El Calafate hotel",
      meals: "Breakfast included"
    },
    {
      day: 9,
      title: "Departure",
      places: [
        "El Calafate City",
        "Comandante Armando Tola International Airport"
      ],
      activities: [
        "Free morning",
        "Airport transfer",
        "Departure"
      ],
      accommodation: "N/A",
      meals: "Breakfast included"
    }
  ],

  inclusions: [
    "8 nights accommodation (hotels + mountain refugios)",
    "Professional trekking guide",
    "National park entrance fees",
    "All ground transportation",
    "Meals during Torres del Paine trek",
    "Trekking permits"
  ],

  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal trekking gear",
    "Optional glacier boat tours",
    "Tips and gratuities"
  ],

  tips: [
    "Expect strong winds and sudden weather changes",
    "Carry waterproof and windproof layers",
    "Use trekking poles for stability",
    "Pack light but warm clothing",
    "Book refugios well in advance"
  ],

  budget: {
    flights: "$800–1,200",
    accommodation: "$150–300/night",
    food: "$30–50/day",
    activities: "$100–200/day",
    transport: "$100–200",
    total: "$3,500–6,000 per person"
  }
};

export default patagoniaItinerary;
