const California = {
citySlug:"california-coast",
  title: 'California Coast',
  duration: '10 days',
  location: 'San Francisco → Monterey → Big Sur → Santa Barbara → Los Angeles',
  difficulty: 'Easy',
  priceRange: '$$ (Mid-range)',
  bestTime: 'April to October (avoid June gloom)',
  description:
    'The ultimate Pacific Coast Highway road trip, featuring stunning coastal views, charming towns, and iconic California landmarks.',
  highlights: [
    'Golden Gate Bridge and Alcatraz',
    '17-Mile Drive and Pebble Beach',
    'Big Sur coastline and Bixby Bridge',
    'Hearst Castle tour',
    'Santa Barbara mission and wineries',
    'Los Angeles Hollywood landmarks'
  ],
  highlight360Views: [
  { label: "Golden Gate Bridge", place: "Golden Gate Bridge, San Francisco" },
  { label: "17-Mile Drive", place: "17-Mile Drive, Pebble Beach" },
  { label: "Bixby Creek Bridge", place: "Bixby Creek Bridge, Big Sur" },
  { label: "Hearst Castle", place: "Hearst Castle, San Simeon" },
  { label: "Santa Monica Pier", place: "Santa Monica Pier, Los Angeles" }
],

  image:
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',

  days: [
    {
      day: 1,
      title: 'Arrival in San Francisco',
      places: [
        'San Francisco International Airport',
        'Oakland International Airport',
        'Fisherman’s Wharf, San Francisco',
        'Pier 39, San Francisco'
      ],
      activities: [
        'Arrive at SFO or OAK airport',
        'Pick up rental car',
        "Check into Fisherman's Wharf hotel",
        'Evening walk to Pier 39',
        'Dinner with clam chowder in sourdough bowl'
      ],
      accommodation: 'San Francisco hotel (3-star)',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'San Francisco City Tour',
      places: [
        'Golden Gate Bridge',
        'Alcatraz Island',
        'Chinatown, San Francisco',
        'Lombard Street',
        'Haight-Ashbury'
      ],
      activities: [
        'Golden Gate Bridge walk or bike ride',
        'Alcatraz Island tour (book in advance)',
        'Lunch in Chinatown',
        'Cable car ride to Lombard Street',
        'Evening in Haight-Ashbury'
      ],
      accommodation: 'San Francisco hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'San Francisco to Monterey',
      places: [
        'Monterey, California',
        'Monterey Bay Aquarium',
        'Cannery Row',
        '17-Mile Drive',
        'Pebble Beach',
        'Carmel-by-the-Sea'
      ],
      activities: [
        'Drive to Monterey (2 hours)',
        'Visit Monterey Bay Aquarium',
        'Cannery Row exploration',
        '17-Mile Drive through Pebble Beach',
        'Check into Carmel-by-the-Sea hotel'
      ],
      accommodation: 'Carmel/Monterey hotel',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Monterey to Big Sur',
      places: [
        'Point Lobos State Natural Reserve',
        'Big Sur Coastline',
        'Bixby Creek Bridge',
        'McWay Falls',
        'Julia Pfeiffer Burns State Park'
      ],
      activities: [
        'Morning at Point Lobos State Reserve',
        'Drive along Big Sur coastline',
        'Stop at Bixby Creek Bridge for photos',
        'McWay Falls at Julia Pfeiffer Burns Park',
        'Check into Big Sur lodge/cabin'
      ],
      accommodation: 'Big Sur lodge',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Big Sur to San Luis Obispo',
      places: [
        'Pfeiffer Big Sur State Park',
        'Nepenthe Restaurant',
        'Hearst Castle',
        'Piedras Blancas Elephant Seal Rookery',
        'San Luis Obispo'
      ],
      activities: [
        'Morning hike in Pfeiffer Big Sur State Park',
        'Visit Nepenthe for lunch with view',
        'Continue south to Hearst Castle tour',
        'Elephant seal viewing at Piedras Blancas',
        'Check into San Luis Obispo hotel'
      ],
      accommodation: 'San Luis Obispo hotel',
      meals: 'Breakfast included'
    },
    {
      day: 6,
      title: 'San Luis Obispo to Santa Barbara',
      places: [
        'San Luis Obispo Downtown',
        'Solvang, California',
        'Santa Ynez Valley',
        'Santa Barbara',
        'Stearns Wharf'
      ],
      activities: [
        'Morning in SLO farmers market (Thursday evening)',
        'Visit Solvang Danish village',
        'Wine tasting in Santa Ynez Valley',
        'Arrive in Santa Barbara',
        'Evening walk on Stearns Wharf'
      ],
      accommodation: 'Santa Barbara hotel',
      meals: 'Breakfast included'
    },
    {
      day: 7,
      title: 'Santa Barbara Day',
      places: [
        'Old Mission Santa Barbara',
        'State Street, Santa Barbara',
        'Butterfly Beach',
        'Funk Zone, Santa Barbara',
        'Santa Barbara County Courthouse'
      ],
      activities: [
        'Morning at Santa Barbara Mission',
        'State Street shopping and lunch',
        'Butterfly Beach relaxation',
        'Wine tasting in Funk Zone',
        'Sunset from Santa Barbara Courthouse'
      ],
      accommodation: 'Santa Barbara hotel',
      meals: 'Breakfast included'
    },
    {
      day: 8,
      title: 'Santa Barbara to Los Angeles',
      places: [
        'Malibu, California',
        'Malibu Pier',
        'Getty Villa',
        'Santa Monica',
        'Santa Monica Pier'
      ],
      activities: [
        'Drive to Malibu (1.5 hours)',
        'Lunch at Malibu Pier',
        'Getty Villa visit (advance reservation)',
        'Check into Santa Monica hotel',
        'Evening at Santa Monica Pier'
      ],
      accommodation: 'Santa Monica hotel',
      meals: 'Breakfast included'
    },
    {
      day: 9,
      title: 'Los Angeles Highlights',
      places: [
        'Griffith Observatory',
        'Hollywood Walk of Fame',
        'TCL Chinese Theatre',
        'Grand Central Market',
        'Beverly Hills',
        'Rodeo Drive',
        'Venice Beach'
      ],
      activities: [
        'Morning at Griffith Observatory',
        'Hollywood Walk of Fame and Chinese Theatre',
        'Lunch at Grand Central Market',
        'Afternoon in Beverly Hills/Rodeo Drive',
        'Farewell dinner in Venice Beach'
      ],
      accommodation: 'Santa Monica hotel',
      meals: 'Breakfast included'
    },
    {
      day: 10,
      title: 'Departure',
      places: [
        'Venice Beach Boardwalk',
        'Warner Bros. Studio Tour Hollywood',
        'Los Angeles International Airport'
      ],
      activities: [
        'Last morning at Venice Beach Boardwalk',
        'Optional Warner Bros Studio Tour',
        'Return rental car at LAX',
        'Optional extension to San Diego or Las Vegas'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ]
};

export default California;
