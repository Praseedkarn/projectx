 const Everest={
  id: 14,
  title: 'Everest Base Camp Trek',
  duration: '12 days',
  location: 'Lukla → Namche Bazaar → Everest Base Camp, Nepal',
  difficulty: 'Hard',
  priceRange: '$$$ (Adventure)',
  bestTime: 'March–May & September–November',
  description: 'A legendary Himalayan trek offering breathtaking mountain views, Sherpa culture, and the ultimate Everest Base Camp experience.',
  highlights: [
    'Flight to Lukla',
    'Namche Bazaar acclimatization',
    'Tengboche Monastery',
    'Kala Patthar sunrise view',
    'Everest Base Camp hike',
    'Sherpa villages and culture'
  ],
  image: 'https://th.bing.com/th/id/OIP.5U_1A4n3u5g6B8A3gEbc7AHaE8?w=177&h=150&c=6&o=7&pid=1.7',
  days: [
    {
      day: 1,
      title: 'Arrival in Kathmandu',
      activities: [
        'Arrival and hotel transfer',
        'Trek briefing',
        'Gear check'
      ],
      accommodation: 'Kathmandu hotel',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Fly to Lukla & Trek to Phakding',
      activities: [
        'Scenic flight to Lukla',
        'Short trek to Phakding',
        'River valley walk'
      ],
      accommodation: 'Tea house',
      meals: 'All meals included'
    },
    {
      day: 3,
      title: 'Phakding to Namche Bazaar',
      activities: [
        'Cross suspension bridges',
        'Enter Sagarmatha National Park',
        'First Everest views'
      ],
      accommodation: 'Tea house',
      meals: 'All meals included'
    }
  ],
  inclusions: [
    'Domestic flights (Kathmandu–Lukla)',
    'Experienced trekking guide',
    'Accommodation in tea houses',
    'All meals during trek',
    'Permits and park fees'
  ],
  exclusions: [
    'International flights',
    'Personal trekking gear',
    'Travel insurance',
    'Tips for guides/porters'
  ],
  tips: [
    'Acclimatize properly',
    'Stay hydrated',
    'Train cardio beforehand',
    'Carry altitude medication'
  ],
  budget: {
    flights: '$800-1200',
    accommodation: '$15-40/night',
    food: '$25-40/day',
    activities: '$50-80/day',
    permits: '$60-100',
    total: '$1800-3000 per person'
  }
}
export default Everest;