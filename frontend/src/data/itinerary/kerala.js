const Kerala = {
  title: 'Kerala Backwater Escape',
  duration: '5 days',
  location: 'Kochi → Alleppey → Kumarakom, Kerala',
  difficulty: 'Easy',
  priceRange: '$$ (Comfort)',
  bestTime: 'September to March',
  description:
    'A peaceful journey through Kerala’s lush backwaters, palm-lined canals, and serene villages with houseboat stays and Ayurvedic relaxation.',
  highlights: [
    'Overnight houseboat in Alleppey',
    'Sunset cruise on Vembanad Lake',
    'Traditional Kathakali dance show',
    'Ayurvedic spa experience',
    'Village canoe ride',
    'Seafood and coconut-based cuisine'
  ],
  highlight360Views: [
  { label: "Alleppey Backwaters", place: "Alappuzha Backwaters, Kerala" },
  { label: "Munnar Tea Gardens", place: "Munnar Tea Gardens, Kerala" },
  { label: "Varkala Beach", place: "Varkala Beach, Kerala" },
  { label: "Athirappilly Falls", place: "Athirappilly Falls, Kerala" },
  { label: "Kovalam Beach", place: "Kovalam Beach, Kerala" }
],

  image:
    'https://th.bing.com/th/id/OIP.qo6WJ1xZzNnY6Kz7m9aX5AHaE7?w=177&h=150&c=6&o=7&pid=1.7',

  days: [
    {
      day: 1,
      title: 'Arrival in Kochi',
      places: [
        'Cochin International Airport',
        'Fort Kochi',
        'Chinese Fishing Nets, Kochi',
        'St. Francis Church, Kochi',
        'Mattancherry Palace',
        'Kerala Kathakali Centre'
      ],
      activities: [
        'Arrive at Kochi International Airport',
        'Check into hotel',
        'Visit Fort Kochi and Chinese fishing nets',
        'St. Francis Church and Mattancherry Palace',
        'Evening Kathakali performance'
      ],
      accommodation: 'Kochi hotel',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Kochi to Alleppey',
      places: [
        'Alappuzha',
        'Alleppey Backwaters',
        'Vembanad Lake'
      ],
      activities: [
        'Drive to Alleppey',
        'Board traditional houseboat',
        'Backwater cruise through canals',
        'Lunch on houseboat',
        'Village life experience',
        'Overnight stay on houseboat'
      ],
      accommodation: 'Houseboat',
      meals: 'All meals included'
    },
    {
      day: 3,
      title: 'Alleppey to Kumarakom',
      places: [
        'Kumarakom',
        'Kumarakom Bird Sanctuary',
        'Vembanad Lake'
      ],
      activities: [
        'Morning backwater views',
        'Drive to Kumarakom',
        'Check into lake resort',
        'Bird sanctuary visit',
        'Sunset lake cruise'
      ],
      accommodation: 'Kumarakom resort',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Relaxation Day',
      places: [
        'Kumarakom Backwaters',
        'Vembanad Lake'
      ],
      activities: [
        'Ayurvedic massage session',
        'Leisure time by the lake',
        'Optional canoe ride',
        'Cultural cooking demo'
      ],
      accommodation: 'Kumarakom resort',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Departure',
      places: [
        'Kumarakom',
        'Kochi City',
        'Cochin International Airport'
      ],
      activities: [
        'Morning leisure',
        'Drive back to Kochi',
        'Departure transfer'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '4 nights accommodation',
    'Houseboat stay with meals',
    'All transfers (private AC car)',
    'Cultural performance',
    'Ayurvedic session'
  ],
  exclusions: [
    'Flights',
    'Travel insurance',
    'Personal expenses',
    'Optional activities'
  ],
  tips: [
    'Carry mosquito repellent',
    'Light cotton clothing recommended',
    'Avoid plastic near backwaters',
    'Respect local customs'
  ],
  budget: {
    flights: '$300-600',
    accommodation: '$70-150/night',
    food: '$15-30/day',
    activities: '$20-40/day',
    transport: '$20-40/day',
    total: '$900-1500 per person'
  }
};

export default Kerala;
