const goa = {
  
  title: 'Goa Beach Holiday',
  duration: '5 days',
  location: 'North Goa and South Goa, India',
  difficulty: 'Easy',
  priceRange: '$$ (Mid-range)',
  bestTime: 'November to February (peak season)',
  description:
    "Relax on golden sands, savor fresh seafood, and experience the unique blend of Portuguese and Indian cultures in India's beach paradise.",
  highlights: [
    'Baga and Calangute beaches',
    'Anjuna Flea Market',
    'Portuguese architecture in Old Goa',
    'Dudhsagar Waterfalls day trip',
    'Sunset cruise on Mandovi River',
    'Goan seafood and Portuguese-influenced cuisine'
  ],
  highlight360Views: [
  { label: "Baga Beach", place: "Baga Beach, Goa" },
  { label: "Calangute Beach", place: "Calangute Beach, Goa" },
  { label: "Dudhsagar Falls", place: "Dudhsagar Falls, Goa" },
  { label: "Basilica of Bom Jesus", place: "Basilica of Bom Jesus, Goa" },
  { label: "Anjuna Beach", place: "Anjuna Beach, Goa" }
],

  image:
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',

  days: [
    {
      day: 1,
      title: 'Arrival in Goa - North Goa Beaches',
      places: [
        'Goa International Airport',
        'Baga Beach',
        'Tito’s Lane, Baga',
        'North Goa'
      ],
      activities: [
        'Arrive at Goa International Airport (GOI)',
        'Transfer to North Goa beach resort',
        'Check in and relax',
        'Evening at Baga Beach',
        'Dinner at beach shack',
        "Explore Tito's Lane nightlife (optional)"
      ],
      accommodation: 'North Goa beach resort',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'North Goa Exploration',
      places: [
        'Calangute Beach',
        'Anjuna Flea Market',
        'Fort Aguada',
        'Aguada Lighthouse',
        'Chapora Fort'
      ],
      activities: [
        'Morning at Calangute Beach',
        'Visit Anjuna Flea Market (Wednesday only)',
        'Fort Aguada and lighthouse',
        'Lunch with sea view',
        'Afternoon water sports (parasailing, jet ski)',
        'Sunset at Chapora Fort (Dil Chahta Hai point)'
      ],
      accommodation: 'North Goa resort',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Old Goa & Panaji',
      places: [
        'Basilica of Bom Jesus, Old Goa',
        'Sé Cathedral, Old Goa',
        'Fontainhas, Panaji',
        'Our Lady of the Immaculate Conception Church',
        'Mandovi River'
      ],
      activities: [
        'Visit Old Goa churches: Basilica of Bom Jesus (St. Francis Xavier tomb)',
        'Sé Cathedral',
        'Lunch in Fontainhas (Latin Quarter)',
        'Panaji city tour: Our Lady of Immaculate Conception Church',
        'Evening sunset cruise on Mandovi River',
        'Dinner with Fado music'
      ],
      accommodation: 'North Goa resort',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'South Goa Relaxation',
      places: [
        'South Goa',
        'Palolem Beach',
        'Colva Beach'
      ],
      activities: [
        'Transfer to South Goa',
        'Check into Palolem or Colva beach resort',
        'Relax on quieter South Goa beaches',
        'Optional: dolphin watching tour',
        'Beach shack lunch',
        'Evening beach bonfire (seasonal)'
      ],
      accommodation: 'South Goa beach resort',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Departure or Dudhsagar Extension',
      places: [
        'Dudhsagar Waterfalls',
        'Bhagwan Mahavir Wildlife Sanctuary',
        'Goa International Airport'
      ],
      activities: [
        'OPTIONAL: Dudhsagar Waterfalls day trip',
        'Jeep safari through Bhagwan Mahavir Wildlife Sanctuary',
        'Swim in waterfall pools',
        'Return to hotel',
        'Last minute souvenir shopping',
        'Transfer to airport for departure'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '4 nights accommodation (beach resort)',
    'Daily breakfast, 1 dinner',
    'All transfers and transportation',
    'Sunset cruise on Mandovi River',
    'Entrance fees to monuments',
    'Beach chair and umbrella rental'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Water sports activities',
    'Dudhsagar Waterfalls trip',
    'Personal expenses'
  ],
  tips: [
    'Carry swimwear and beach essentials',
    'Try local seafood and Goan fish curry',
    'Bargain at flea markets',
    'Respect local customs - conservative dress away from beaches',
    'Apply strong sunscreen',
    'Check spice level before ordering food'
  ],
  budget: {
    flights: '$300-700',
    accommodation: '$50-150/night',
    food: '$15-40/day',
    activities: '$20-50/day',
    transport: '$10-25/day',
    total: '$500-1200 per person'
  }
};

export default goa;
