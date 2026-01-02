const baliItinerary= {
      id: 1,
      title: 'Bali Adventure',
      duration: '7 days',
      location: 'Bali, Indonesia',
      difficulty: 'Moderate',
      priceRange: '$$ (Mid-range)',
      bestTime: 'April to October',
      description: 'Explore the best of Bali - from stunning beaches and ancient temples to lush rice terraces and vibrant culture.',
      highlights: [
        'Visit ancient temples like Uluwatu and Tanah Lot',
        'Explore Ubud\'s rice terraces and art markets',
        'Enjoy water sports in Nusa Dua',
        'Experience Balinese culture and dance',
        'Relax on beautiful beaches'
      ],
      highlight360Views: [
  { label: "Uluwatu Temple", place: "Uluwatu Temple, Bali" },
  { label: "Tanah Lot Temple", place: "Tanah Lot Temple, Bali" },
  { label: "Tegallalang Rice Terraces", place: "Tegallalang Rice Terraces, Bali" },
  { label: "Seminyak Beach", place: "Seminyak Beach, Bali" },
  { label: "Kelingking Beach", place: "Kelingking Beach, Nusa Penida" }
],

      image: 'https://www.pigsflycheap.com/wp-content/uploads/2021/02/Bali-Travel-Guide.jpg', // You can add actual images
      days: [
        {
          day: 1,
          title: 'Arrival in Denpasar - Ubud',
          places:[
            'Ngurah Rai International Airport, Bali',
            'Ubud, Bali',
            'Ubud Market, Bali'
          ],
          activities: [
            'Arrive at Ngurah Rai International Airport (DPS)',
            'Transfer to Ubud (approx. 1.5 hours)',
            'Check into hotel and rest',
            'Evening walk around Ubud Market',
            'Dinner at local warung (traditional eatery)'
          ],
          accommodation: 'Ubud hotel (mid-range)',
          meals: 'Dinner included'
        },
        {
          day: 2,
          title: 'Ubud Cultural Day',
          places: [
            'Sacred Monkey Forest Sanctuary, Ubud',
            'Ubud Palace',
            'Tegallalang Rice Terraces'
          ],
          activities: [
            'Morning visit to Sacred Monkey Forest Sanctuary',
            'Explore Ubud Palace and Art Market',
            'Lunch with view of Tegallalang Rice Terraces',
            'Afternoon traditional Balinese dance performance',
            'Optional spa treatment in the evening'
          ],
          accommodation: 'Ubud hotel',
          meals: 'Breakfast included'
        },
        {
          day: 3,
          title: 'Central Bali Exploration',
          places:[
             "Tirta Empul Water Temple, Bali",
              "Goa Gajah (Elephant Cave), Bali",
              "Kintamani, Mount Batur",
              "Besakih Mother Temple, Bali"
          ],
          activities: [
            'Visit Tirta Empul Water Temple',
            'Explore Goa Gajah (Elephant Cave)',
            'Lunch at Kintamani with Mount Batur view',
            'Visit Besakih Mother Temple',
            'Return to Ubud for dinner'
          ],
          accommodation: 'Ubud hotel',
          meals: 'Breakfast included'
        },
        {
          day: 4,
          title: 'Ubud to Seminyak',
          places:[
            "Ubud, Bali",
        "Tegenungan Waterfall, Bali",
        "Seminyak Beach, Bali"
          ],
          activities: [
            'Check out and drive to Seminyak',
            'Stop at Tegenungan Waterfall',
            'Arrive in Seminyak and check into beach hotel',
            'Afternoon at Seminyak Beach',
            'Sunset dinner at beachfront restaurant'
          ],
          accommodation: 'Seminyak beach resort',
          meals: 'Breakfast included'
        },
        {
          day: 5,
          title: 'South Bali Beaches',
          places:[
              "Kuta Beach, Bali",
        "Uluwatu Temple, Bali",
        "Jimbaran Bay, Bali"
          ],
          activities: [
            'Morning surfing lesson at Kuta Beach',
            'Visit Uluwatu Temple on cliff edge',
            'Watch Kecak Fire Dance at sunset',
            'Seafood dinner at Jimbaran Bay',
            'Optional nightlife in Seminyak'
          ],
          accommodation: 'Seminyak beach resort',
          meals: 'Breakfast included'
        },
        {
          day: 6,
          title: 'Nusa Penida Day Trip',
          places:[
            "Sanur Port, Bali",
        "Nusa Penida Island",
        "Kelingking Beach, Nusa Penida",
        "Angel's Billabong, Nusa Penida",
        "Broken Beach, Nusa Penida"
          ] ,
          activities: [
            'Early boat to Nusa Penida island',
            'Visit Kelingking Beach (T-Rex shaped cliff)',
            'Swim at Angel\'s Billabong and Broken Beach',
            'Lunch with local seafood',
            'Return to mainland in the evening'
          ],
          accommodation: 'Seminyak beach resort',
          meals: 'Breakfast included'
        },
        {
          day: 7,
          title: 'Departure',
          places:[
                   "Seminyak, Bali",
        "Tanah Lot Temple, Bali",
        "Ngurah Rai International Airport, Bali"
          ],
          activities: [
            'Last minute shopping at Seminyak boutiques',
            'Visit Tanah Lot Temple for final photos',
            'Transfer to airport for departure flight',
            'Optional: extend to Gili Islands or Lombok'
          ],
          accommodation: 'N/A',
          meals: 'Breakfast included'
        }
      ],
      inclusions: [
        '6 nights accommodation (3-star hotels)',
        'Daily breakfast',
        'All transfers and transportation',
        'English speaking guide',
        'Entrance fees to mentioned attractions',
        'Boat ticket to Nusa Penida'
      ],
      exclusions: [
        'International flights',
        'Travel insurance',
        'Lunches and dinners (unless specified)',
        'Personal expenses',
        'Tips and gratuities',
        'Optional activities'
      ],
      tips: [
        'Carry light cotton clothes',
        'Respect temple dress codes (sarongs provided)',
        'Bargain at markets (start at 30% of asking price)',
        'Carry mosquito repellent',
        'Learn basic Indonesian phrases'
      ],
      budget: {
        flights: '$500-800',
        accommodation: '$40-80/night',
        food: '$15-30/day',
        activities: '$20-50/day',
        transport: '$10-20/day',
        total: '$800-1500 per person'
      }
    };
    export default baliItinerary;