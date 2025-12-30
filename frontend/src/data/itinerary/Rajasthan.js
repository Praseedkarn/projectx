const Rajasthan = {
  id: 12,
  title: 'Rajasthan Royal Tour',
  duration: '8 days',
  location: 'Jaipur → Jodhpur → Udaipur → Pushkar, Rajasthan',
  difficulty: 'Moderate',
  priceRange: '$$$ (Luxury)',
  bestTime: 'October to March (pleasant weather)',
  description:
    "Journey through the Land of Kings, exploring majestic forts, opulent palaces, and experiencing royal hospitality in India's most colorful state.",
  highlights: [
    'Amber Fort elephant ride (optional)',
    'Mehrangarh Fort in Jodhpur',
    'Lake Palace and City Palace in Udaipur',
    'Desert safari in Thar Desert',
    'Pushkar Camel Fair (if timed)',
    'Traditional Rajasthani folk performances'
  ],
  image:
    'https://th.bing.com/th/id/OIP.07U1zvyRX_KBE_gc1oDpiwHaE7?w=177&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3',

  days: [
    {
      day: 1,
      title: 'Arrival in Jaipur - Pink City',
      places: [
        'Jaipur International Airport',
        'Hawa Mahal',
        'Bapu Bazaar, Jaipur',
        'Johari Bazaar, Jaipur'
      ],
      activities: [
        'Arrive at Jaipur International Airport (JAI)',
        'Transfer to heritage hotel/haveli',
        'Evening visit to Hawa Mahal (Palace of Winds)',
        'Explore local markets: Bapu Bazaar, Johari Bazaar',
        'Welcome dinner with Rajasthani cuisine',
        'Traditional puppet show'
      ],
      accommodation: 'Jaipur heritage hotel',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Jaipur City Tour',
      places: [
        'Amber Fort',
        'Sheesh Mahal',
        'Jal Mahal',
        'City Palace, Jaipur',
        'Jantar Mantar, Jaipur'
      ],
      activities: [
        'Morning elephant ride (or jeep) up to Amber Fort',
        'Explore Amber Fort and Sheesh Mahal',
        'Jal Mahal (Water Palace) photo stop',
        'City Palace and Jantar Mantar (astronomical observatory)',
        'Lunch at traditional restaurant',
        'Evening free for shopping'
      ],
      accommodation: 'Jaipur heritage hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Jaipur to Jodhpur - Blue City',
      places: [
        'Jodhpur',
        'Mehrangarh Fort',
        'Jaswant Thada',
        'Clock Tower, Jodhpur',
        'Sardar Market, Jodhpur'
      ],
      activities: [
        'Drive to Jodhpur (5-6 hours)',
        'Check into hotel with fort view',
        'Visit Mehrangarh Fort (one of India’s largest)',
        'Jaswant Thada (marble cenotaphs)',
        'Explore Blue City neighborhoods',
        'Evening at Clock Tower and Sardar Market'
      ],
      accommodation: 'Jodhpur hotel',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Jodhpur to Udaipur',
      places: [
        'Umaid Bhawan Palace',
        'Ranakpur Jain Temple',
        'Udaipur',
        'Lake Pichola'
      ],
      activities: [
        'Morning visit to Umaid Bhawan Palace (museum section)',
        'Drive to Udaipur (5-6 hours)',
        'Stop at Ranakpur Jain Temple (optional)',
        'Arrive in Udaipur - City of Lakes',
        'Check into lake-view hotel',
        'Evening boat ride on Lake Pichola'
      ],
      accommodation: 'Udaipur hotel',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Udaipur City Tour',
      places: [
        'City Palace, Udaipur',
        'Jagdish Temple',
        'Saheliyon Ki Bari',
        'Bagore Ki Haveli'
      ],
      activities: [
        'Visit City Palace complex',
        'Jagdish Temple',
        'Sahelion Ki Bari (Garden of Maidens)',
        'Lunch with lake view',
        'Afternoon free for shopping (miniature paintings, handicrafts)',
        'Evening cultural show at Bagore Ki Haveli'
      ],
      accommodation: 'Udaipur hotel',
      meals: 'Breakfast included'
    },
    {
      day: 6,
      title: 'Udaipur to Pushkar',
      places: [
        'Pushkar',
        'Pushkar Lake',
        'Brahma Temple, Pushkar'
      ],
      activities: [
        'Drive to Pushkar (4-5 hours)',
        'Check into hotel near Pushkar Lake',
        'Visit Brahma Temple (one of few in world)',
        'Pushkar Lake and ghats',
        'Camel ride in desert at sunset',
        'Evening aarti (prayer ceremony) at lake'
      ],
      accommodation: 'Pushkar hotel',
      meals: 'Breakfast included'
    },
    {
      day: 7,
      title: 'Pushkar Desert Experience',
      places: [
        'Pushkar Market',
        'Savitri Temple',
        'Pushkar Desert'
      ],
      activities: [
        'Morning market exploration',
        'Visit Savitri Temple (hilltop view)',
        'Traditional Rajasthani lunch',
        'Afternoon desert safari with camel cart',
        'Traditional folk music and dance performance',
        'Farewell dinner under the stars'
      ],
      accommodation: 'Pushkar hotel',
      meals: 'Breakfast and dinner included'
    },
    {
      day: 8,
      title: 'Return to Jaipur & Departure',
      places: [
        'Jaipur City',
        'Jaipur International Airport'
      ],
      activities: [
        'Morning leisure time in Pushkar',
        'Drive back to Jaipur (3-4 hours)',
        'Last minute souvenir shopping',
        'Transfer to airport for departure',
        'Optional: extend to Ranthambore for tiger safari'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '7 nights accommodation (heritage hotels)',
    'Daily breakfast, 2 dinners',
    'All transfers and transportation (private AC vehicle)',
    'Entrance fees to monuments and forts',
    'Boat ride on Lake Pichola',
    'Camel ride in Pushkar',
    'Cultural show in Udaipur'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Elephant ride at Amber Fort (optional)',
    'Camera/video fees at monuments',
    'Personal shopping expenses'
  ],
  tips: [
    'Dress modestly, especially at religious sites',
    'Carry scarf for temple visits',
    'Bargain at markets (start at 30-40% of asking price)',
    'Stay hydrated in desert climate',
    'Try local specialties: Dal Baati Churma, Gatte ki Sabzi',
    'Book heritage hotels well in advance during peak season'
  ],
  budget: {
    flights: '$400-800',
    accommodation: '$80-250/night',
    food: '$20-50/day',
    activities: '$30-70/day',
    transport: '$25-50/day',
    total: '$1500-3000 per person'
  }
};

export default Rajasthan;
