const thai = {
  id: 6,
  title: 'Thai Islands',
  duration: '8 days',
  location: 'Phuket → Phi Phi Islands → Krabi',
  difficulty: 'Easy',
  priceRange: '$ (Budget)',
  bestTime: 'November to April (dry season)',
  description:
    "Paradise found! Island hop through Thailand's stunning southern islands, featuring turquoise waters, limestone cliffs, and pristine beaches.",
  highlights: [
    'Maya Bay (from "The Beach")',
    'Phi Phi Islands boat tour',
    'Railay Beach rock climbing',
    "Phuket's Patong Beach nightlife",
    'Thai massage and street food'
  ],
  highlight360Views: [
  { label: "Phi Phi Islands", place: "Phi Phi Islands, Thailand" },
  { label: "Patong Beach", place: "Patong Beach, Phuket" },
  { label: "Grand Palace", place: "Grand Palace, Bangkok" },
  { label: "Railay Beach", place: "Railay Beach, Krabi" },
  { label: "Ayutthaya", place: "Ayutthaya Historical Park, Thailand" }
],

  image:
    'https://tse4.mm.bing.net/th/id/OIP.3rdnjivyuroOrluf1X7I6wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',

  days: [
    {
      day: 1,
      title: 'Arrival in Phuket',
      places: [
        'Phuket International Airport',
        'Patong Beach',
        'Bangla Road'
      ],
      activities: [
        'Arrive at Phuket International Airport (HKT)',
        'Transfer to Patong Beach hotel',
        'Evening walk along Patong Beach',
        'Bangla Road nightlife introduction',
        'Street food dinner'
      ],
      accommodation: 'Phuket hotel (3-star)',
      meals: 'None'
    },
    {
      day: 2,
      title: 'Phuket Exploration',
      places: [
        'Big Buddha Phuket',
        'Wat Chalong',
        'Karon Beach',
        'Kata Beach',
        'Simon Cabaret Phuket'
      ],
      activities: [
        'Morning at Big Buddha',
        'Wat Chalong temple visit',
        'Lunch at local restaurant',
        'Afternoon at Karon or Kata Beach',
        'Simon Cabaret show (optional)'
      ],
      accommodation: 'Phuket hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Phi Phi Islands Day Trip',
      places: [
        'Phi Phi Islands',
        'Maya Bay',
        'Monkey Beach',
        'Pileh Lagoon'
      ],
      activities: [
        'Early speedboat to Phi Phi Islands',
        'Maya Bay (view from boat - may be closed for rehabilitation)',
        'Monkey Beach',
        'Pileh Lagoon swimming',
        'Return to Phuket in evening'
      ],
      accommodation: 'Phuket hotel',
      meals: 'Breakfast and lunch included'
    },
    {
      day: 4,
      title: 'Phuket to Phi Phi Island',
      places: [
        'Phi Phi Don',
        'Phi Phi Viewpoint',
        'Loh Dalum Bay'
      ],
      activities: [
        'Ferry to Phi Phi Don (main island)',
        'Check into beachfront bungalow',
        'Viewpoint hike for sunset',
        'Evening fire show on Loh Dalum Bay',
        'Beachfront dinner'
      ],
      accommodation: 'Phi Phi Island bungalow',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Phi Phi Leh & Bamboo Island',
      places: [
        'Phi Phi Leh',
        'Viking Cave',
        'Bamboo Island'
      ],
      activities: [
        'Longtail boat tour to Phi Phi Leh',
        'Viking Cave',
        'Snorkeling at Bamboo Island',
        'Lunch on boat',
        'Free afternoon for beach time'
      ],
      accommodation: 'Phi Phi Island bungalow',
      meals: 'Breakfast and lunch included'
    },
    {
      day: 6,
      title: 'Phi Phi to Krabi/Railay',
      places: [
        'Krabi',
        'Railay Beach',
        'Railay West Beach',
        'Phra Nang Cave Beach'
      ],
      activities: [
        'Ferry to Krabi',
        'Transfer to Railay Beach',
        'Check into resort',
        'Afternoon at Railay West Beach',
        'Sunset at Phra Nang Cave Beach'
      ],
      accommodation: 'Railay Beach resort',
      meals: 'Breakfast included'
    },
    {
      day: 7,
      title: 'Krabi Highlights',
      places: [
        'Railay Beach',
        'Tiger Cave Temple',
        'Hong Islands',
        'Ao Thalane Mangrove Forest'
      ],
      activities: [
        'Morning rock climbing (beginner friendly)',
        'Visit Tiger Cave Temple (optional)',
        'Hong Islands tour (optional)',
        'Kayaking in mangrove forests',
        'Farewell beach dinner'
      ],
      accommodation: 'Railay Beach resort',
      meals: 'Breakfast included'
    },
    {
      day: 8,
      title: 'Departure',
      places: [
        'Krabi Town',
        'Krabi International Airport'
      ],
      activities: [
        'Last morning swim',
        'Transfer to Krabi Airport (KBV)',
        'Optional: extend to Koh Lanta or Koh Samui',
        'Last minute souvenir shopping'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '7 nights accommodation (mix of hotel, bungalow, resort)',
    'Daily breakfast',
    'Phi Phi Islands day tour with lunch',
    'All ferry transfers between islands',
    'Airport transfers on arrival and departure',
    'Snorkeling equipment on tours'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Optional activities (rock climbing, etc.)',
    'Alcoholic beverages',
    'National park fees (paid locally)'
  ],
  tips: [
    'Use reef-safe sunscreen',
    'Bargain politely for souvenirs',
    'Carry cash (many places cash-only)',
    'Respect local customs and temples',
    'Stay hydrated in heat',
    'Book ferries in advance during peak season'
  ],
  budget: {
    flights: '$400-800',
    accommodation: '$30-80/night',
    food: '$15-30/day',
    activities: '$30-60/day',
    transport: '$10-25/day',
    total: '$800-1500 per person'
  }
};

export default thai;
