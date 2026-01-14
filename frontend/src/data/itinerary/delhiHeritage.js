const Delhi = {
  slug:"delhi",
  title: 'Delhi Heritage Tour',
  duration: '3 days',
  location: 'Delhi, India',
  difficulty: 'Easy',
  priceRange: '$ (Budget)',
  bestTime: 'October to March (pleasant weather)',
  description:
    "Discover the rich tapestry of India's capital, where ancient monuments stand alongside modern marvels, showcasing 3000 years of history.",
  highlights: [
    'Red Fort and India Gate',
    'Qutub Minar complex',
    "Humayun's Tomb (precursor to Taj Mahal)",
    'Old Delhi spice market and street food',
    'Lotus Temple and Akshardham'
  ],
   highlight360Views: [
    { label: "Red Fort", place: "Red Fort, Delhi" },
    { label: "India Gate", place: "India Gate, Delhi" },
    { label: "Qutub Minar", place: "Qutub Minar, Delhi" },
    { label: "Humayun’s Tomb", place: "Humayun's Tomb, Delhi" },
    { label: "Old Delhi Market", place: "Chandni Chowk, Delhi" },
    { label: "Lotus Temple", place: "Lotus Temple, Delhi" },
    { label: "Akshardham", place: "Akshardham Temple, Delhi" }
  ],
  image:
    'https://images.unsplash.com/photo-1585506936724-fa0c19d00a15?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',

  days: [
    {
      day: 1,
      title: 'Old Delhi Exploration',
      places: [
        'Indira Gandhi International Airport',
        'Red Fort, Delhi',
        'Chandni Chowk',
        'Jama Masjid, Delhi',
        'Khari Baoli Spice Market'
      ],
      activities: [
        'Arrive at Delhi Airport (DEL/IGI)',
        'Transfer to hotel in central Delhi',
        'Visit Red Fort (Lal Qila)',
        'Cycle rickshaw ride through Chandni Chowk',
        'Jama Masjid (largest mosque in India)',
        'Street food tour in Old Delhi'
      ],
      accommodation: 'Delhi hotel (3-star)',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'New Delhi Monuments',
      places: [
        'India Gate',
        'Rajpath (Kartavya Path)',
        'Rashtrapati Bhavan',
        "Humayun's Tomb",
        'Qutub Minar'
      ],
      activities: [
        'Morning at India Gate and Rajpath',
        "Visit Rashtrapati Bhavan (President's House) exterior",
        "Humayun's Tomb (UNESCO World Heritage)",
        'Lunch at local restaurant',
        'Afternoon at Qutub Minar complex',
        'Evening light and sound show (optional)'
      ],
      accommodation: 'Delhi hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Modern Delhi & Departure',
      places: [
        'Lotus Temple',
        'Dilli Haat, INA',
        'Khan Market',
        'Akshardham Temple',
        'Indira Gandhi International Airport'
      ],
      activities: [
        "Morning visit to Lotus Temple (Bahá'í House of Worship)",
        'Shopping at Dilli Haat or Khan Market',
        'Akshardham Temple (optional, no electronics allowed)',
        'Last minute souvenir shopping',
        'Transfer to airport for departure',
        'Optional: extend to Agra for Taj Mahal'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '2 nights accommodation (3-star hotel)',
    'Daily breakfast, 1 dinner',
    'All transfers and transportation',
    'Entrance fees to monuments',
    'Cycle rickshaw ride in Chandni Chowk',
    'English-speaking guide'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Camera/video fees at monuments',
    'Personal expenses',
    'Tips and gratuities'
  ],
  tips: [
    'Dress modestly for religious sites',
    'Bargain at markets (start at 50% of asking price)',
    'Drink bottled water only',
    'Carry scarf for covering head at religious sites',
    'Be cautious with street food if sensitive stomach',
    'Keep small change for tips and vendors'
  ],
  budget: {
    flights: '$300-700',
    accommodation: '$40-80/night',
    food: '$10-25/day',
    activities: '$10-20/day',
    transport: '$5-15/day',
    total: '$300-600 per person'
  }
};

export default Delhi;
