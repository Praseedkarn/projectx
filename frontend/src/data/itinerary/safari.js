const safari = {
  id: 7,
  title: 'Safari Experience',
  duration: '6 days',
  location: 'Masai Mara National Reserve, Kenya',
  difficulty: 'Moderate',
  priceRange: '$$$ (Luxury)',
  bestTime: 'July to October (Great Migration) or January to March (dry season)',
  description:
    'Experience the ultimate African safari adventure in the world-famous Masai Mara, home to the Big Five and the spectacular Great Migration.',
  highlights: [
    'Witness the Big Five (lion, leopard, elephant, buffalo, rhino)',
    'See the Great Migration (seasonal)',
    'Masai village cultural experience',
    'Hot air balloon safari over the savanna',
    'Sunset game drives with sundowners'
  ],
  highlight360Views: [
  { label: "Serengeti", place: "Serengeti National Park, Tanzania" },
  { label: "Ngorongoro Crater", place: "Ngorongoro Crater, Tanzania" },
  { label: "Maasai Mara", place: "Maasai Mara National Reserve, Kenya" },
  { label: "Amboseli", place: "Amboseli National Park, Kenya" },
  { label: "Tarangire", place: "Tarangire National Park, Tanzania" }
],

  image:
    'https://th.bing.com/th/id/OIP.14Uj6lRQtwbzZp0xRFPp1gHaEG?w=284&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',

  days: [
    {
      day: 1,
      title: 'Arrival in Nairobi - Transfer to Masai Mara',
      places: [
        'Jomo Kenyatta International Airport',
        'Nairobi City',
        'Masai Mara National Reserve'
      ],
      activities: [
        'Arrive at Jomo Kenyatta International Airport (NBO)',
        'Meet safari guide and brief orientation',
        'Scenic drive to Masai Mara (5-6 hours)',
        'En route game viewing',
        'Check into safari lodge/tented camp',
        'Evening orientation and welcome drink'
      ],
      accommodation: 'Masai Mara safari lodge',
      meals: 'Lunch and dinner included'
    },
    {
      day: 2,
      title: 'Full Day Masai Mara Game Drive',
      places: [
        'Masai Mara National Reserve',
        'Talek River',
        'Mara Plains'
      ],
      activities: [
        'Early morning game drive (6:30 AM)',
        'Search for predators and wildlife',
        'Bush breakfast in the savanna',
        'Return to lodge for midday rest',
        'Afternoon game drive (4:00 PM)',
        'Sundowner drinks at sunset point'
      ],
      accommodation: 'Masai Mara safari lodge',
      meals: 'Breakfast, lunch, and dinner included'
    },
    {
      day: 3,
      title: 'Masai Mara Exploration & Cultural Visit',
      places: [
        'Masai Mara National Reserve',
        'Maasai Village',
        'Talek Village'
      ],
      activities: [
        'Morning game drive focusing on birdlife',
        'Visit to Masai village (cultural experience)',
        'Traditional dance and village tour',
        'Learn about Masai traditions and crafts',
        'Afternoon optional nature walk with guide',
        'Evening campfire and storytelling'
      ],
      accommodation: 'Masai Mara safari lodge',
      meals: 'Breakfast, lunch, and dinner included'
    },
    {
      day: 4,
      title: 'Hot Air Balloon Safari & Mara River',
      places: [
        'Masai Mara National Reserve',
        'Mara River'
      ],
      activities: [
        'OPTIONAL: Pre-dawn hot air balloon safari',
        'Aerial views of wildlife and landscape',
        'Champagne breakfast in the bush',
        'Game drive to Mara River (migration crossing point)',
        'Picnic lunch by the river',
        'Evening photographic safari'
      ],
      accommodation: 'Masai Mara safari lodge',
      meals: 'Breakfast, lunch, and dinner included'
    },
    {
      day: 5,
      title: 'Full Day Migration Tracking',
      places: [
        'Masai Mara National Reserve',
        'Mara Triangle'
      ],
      activities: [
        'Full day with packed lunch in reserve',
        'Track wildebeest and zebra herds',
        'Visit different ecosystems within Mara',
        'Photography session with professional tips',
        'Last evening game drive',
        'Farewell bush dinner'
      ],
      accommodation: 'Masai Mara safari lodge',
      meals: 'Breakfast, lunch, and dinner included'
    },
    {
      day: 6,
      title: 'Final Game Drive & Departure',
      places: [
        'Masai Mara National Reserve',
        'Nairobi City',
        'Jomo Kenyatta International Airport'
      ],
      activities: [
        'Final early morning game drive',
        'Last chance for wildlife photography',
        'Return to lodge for breakfast',
        'Check out and drive back to Nairobi',
        'Drop off at airport or Nairobi hotel',
        'Optional: extend to Amboseli or Lake Nakuru'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '5 nights accommodation in safari lodge/tented camp',
    'All meals (breakfast, lunch, dinner)',
    'Daily game drives in 4x4 safari vehicle',
    'Professional English-speaking safari guide',
    'Park entry fees and conservation charges',
    'All transfers Nairobi-Masai Mara-Nairobi',
    'Bottled water during game drives'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Hot air balloon safari ($450-550 per person)',
    'Masai village visit fee ($20-30 per person)',
    'Alcoholic beverages',
    'Tips and gratuities',
    'Visa fees for Kenya'
  ],
  tips: [
    'Pack neutral-colored clothing (khaki, green, brown)',
    'Bring binoculars and good camera with zoom lens',
    'Morning and evening are cold - pack layers',
    'Respect wildlife - always stay in vehicle',
    'Carry USD cash for optional activities',
    'Get travel insurance with medical evacuation'
  ],
  budget: {
    flights: '$800-1500',
    accommodation: '$200-500/night',
    food: 'All included',
    activities: '$100-300/day (optional extras)',
    transport: 'Included in package',
    total: '$2500-5000 per person'
  }
};

export default safari;
