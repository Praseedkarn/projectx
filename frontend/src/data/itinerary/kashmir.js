const Kashmir = {
  title: 'Kashmir Valley',
  duration: '6 days',
  location: 'Srinagar → Gulmarg → Pahalgam, Kashmir',
  difficulty: 'Moderate',
  priceRange: '$$ (Mid-range)',
  bestTime: 'April to October (summer) or December to February (winter sports)',
  description:
    'Experience "Heaven on Earth" - stay on iconic houseboats, explore Mughal gardens, and marvel at the stunning Himalayan landscapes.',
  highlights: [
    'Stay on Dal Lake houseboat',
    'Shikara ride on Dal Lake',
    "Gulmarg Gondola (one of world's highest cable cars)",
    'Mughal gardens of Srinagar',
    'Betaab Valley and Lidder River in Pahalgam',
    'Local Kashmiri cuisine and handicrafts'
  ],
  highlight360Views: [
  { label: "Dal Lake", place: "Dal Lake, Srinagar" },
  { label: "Gulmarg", place: "Gulmarg, Kashmir" },
  { label: "Pahalgam", place: "Pahalgam, Kashmir" },
  { label: "Sonamarg", place: "Sonamarg, Kashmir" },
  { label: "Shankaracharya Temple", place: "Shankaracharya Temple, Srinagar" }
],

  image:
    'https://images.unsplash.com/photo-1599731974853-8fe1d8b6c9e7?ixlib=rb-4.0.3&auto=format&fit=crop&w-2000&q=80',

  days: [
    {
      day: 1,
      title: 'Arrival in Srinagar - Dal Lake',
      places: [
        'Srinagar International Airport',
        'Dal Lake',
        'Nigeen Lake'
      ],
      activities: [
        'Arrive at Srinagar International Airport (SXR)',
        'Transfer to Dal Lake',
        'Check into traditional houseboat',
        'Shikara ride on Dal Lake',
        'Visit floating vegetable market (early morning next day)',
        'Evening Kashmiri Kahwa tea welcome'
      ],
      accommodation: 'Dal Lake houseboat',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Srinagar Mughal Gardens',
      places: [
        'Shalimar Bagh',
        'Nishat Bagh',
        'Chashme Shahi',
        'Hazratbal Shrine',
        'Lal Chowk, Srinagar'
      ],
      activities: [
        'Early morning floating market visit',
        'Shikara ride to Mughal Gardens',
        'Visit Shalimar Bagh, Nishat Bagh, Chashme Shahi',
        'Lunch with traditional Wazwan cuisine',
        'Afternoon at Hazratbal Shrine',
        'Evening shopping for pashmina and carpets'
      ],
      accommodation: 'Dal Lake houseboat',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Srinagar to Gulmarg',
      places: [
        'Gulmarg',
        'Gulmarg Gondola',
        'Kongdoori Phase',
        'Apharwat Peak'
      ],
      activities: [
        'Drive to Gulmarg (2 hours)',
        'Check into hotel/resort',
        'Gulmarg Gondola Phase 1 to Kongdoori',
        'Optional Phase 2 to Apharwat Peak (weather permitting)',
        "Golf at world's highest green (summer)",
        'Evening walk in Gulmarg meadows'
      ],
      accommodation: 'Gulmarg hotel/resort',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Gulmarg to Pahalgam',
      places: [
        'Pahalgam',
        'Lidder River',
        'Pahalgam Market'
      ],
      activities: [
        'Morning for optional activities: skiing (winter) or hiking (summer)',
        'Drive to Pahalgam (4-5 hours via scenic route)',
        'Check into riverside hotel',
        'Evening walk along Lidder River',
        'Visit local market',
        'Bonfire with folk music (seasonal)'
      ],
      accommodation: 'Pahalgam hotel',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Pahalgam Exploration',
      places: [
        'Betaab Valley',
        'Aru Valley',
        'Chandanwari',
        'Baisaran Meadows'
      ],
      activities: [
        'Visit Betaab Valley (named after Bollywood film)',
        'Aru Valley for Himalayan views',
        'Chandanwari (start of Amarnath Yatra)',
        'Lunch with river view',
        'Optional pony ride to Baisaran meadows',
        'Evening leisure time'
      ],
      accommodation: 'Pahalgam hotel',
      meals: 'Breakfast included'
    },
    {
      day: 6,
      title: 'Return to Srinagar & Departure',
      places: [
        'Srinagar City',
        'Jamia Masjid Srinagar',
        'Srinagar International Airport'
      ],
      activities: [
        'Drive back to Srinagar (3 hours)',
        'Last minute souvenir shopping: saffron, dry fruits, handicrafts',
        'Optional visit to Jamia Masjid',
        'Transfer to airport for departure',
        'Optional: extend to Sonamarg or Ladakh'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '5 nights accommodation (houseboat + hotels)',
    'Daily breakfast, 1 dinner',
    'All transfers and transportation',
    'Shikara ride on Dal Lake',
    'Gulmarg Gondola Phase 1 ticket',
    'Entrance fees to gardens and sites'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Gulmarg Gondola Phase 2 ticket',
    'Pony rides and additional activities',
    'Personal shopping'
  ],
  tips: [
    'Carry warm clothing even in summer (cool evenings)',
    'Book houseboats through reputable agents',
    'Respect local customs and dress modestly',
    'Carry cash (limited ATMs in remote areas)',
    'Check political situation and travel advisories',
    'Try authentic Kashmiri Kahwa tea and Rogan Josh'
  ],
  budget: {
    flights: '$200-500 (domestic)',
    accommodation: '$60-150/night',
    food: '$15-30/day',
    activities: '$20-50/day',
    transport: '$15-30/day',
    total: '$600-1500 per person'
  }
};

export default Kashmir;
