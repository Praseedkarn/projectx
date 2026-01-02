const japan = {
  title: 'Japanese Culture',
  duration: '14 days',
  location: 'Tokyo → Kyoto → Osaka → Hiroshima',
  difficulty: 'Moderate',
  priceRange: '$$$ (Luxury)',
  bestTime: 'March-May (cherry blossoms) or October-November (fall foliage)',
  description: 'Immerse yourself in Japan\'s perfect blend of ancient traditions and cutting-edge modernity.',
  highlights: [
    'Tokyo\'s Shibuya Crossing and Akihabara',
    'Kyoto\'s geisha districts and golden temple',
    'Osaka street food and castle',
    'Hiroshima Peace Memorial',
    'Traditional ryokan and onsen experience'
  ],
  highlight360Views: [
  { label: "Shibuya Crossing", place: "Shibuya Crossing, Tokyo" },
  { label: "Fushimi Inari", place: "Fushimi Inari Shrine, Kyoto" },
  { label: "Arashiyama Bamboo Grove", place: "Arashiyama Bamboo Grove, Kyoto" },
  { label: "Osaka Castle", place: "Osaka Castle, Japan" },
  { label: "Mount Fuji", place: "Mount Fuji, Japan" }
],

  image: 'https://www.postposmo.com/wp-content/uploads/2020/07/CULTURA-JAPONESA-1.jpg',

  days: [
    {
      day: 1,
      title: 'Arrival in Tokyo',
      places: [
        'Narita International Airport',
        'Shinjuku, Tokyo',
        'Golden Gai, Shinjuku'
      ],
      activities: [
        'Arrive at Narita (NRT) or Haneda (HND) Airport',
        'Narita Express or monorail to city',
        'Check into Shinjuku hotel',
        'Evening in Shinjuku\'s Golden Gai',
        'First taste of ramen'
      ],
      accommodation: 'Tokyo hotel (4-star)',
      meals: 'Dinner included'
    },

    {
      day: 2,
      title: 'Tokyo Modern',
      places: [
        'Tsukiji Outer Market',
        'Shibuya Crossing',
        'Hachiko Statue',
        'Harajuku Takeshita Street',
        'Roppongi Hills Sky Deck'
      ],
      activities: [
        'Morning at Tsukiji Outer Market',
        'Shibuya Crossing and Hachiko Statue',
        'Lunch in Shibuya',
        'Afternoon in Harajuku (Takeshita Street)',
        'Evening in Roppongi for city views'
      ],
      accommodation: 'Tokyo hotel',
      meals: 'Breakfast included'
    },

    {
      day: 3,
      title: 'Tokyo Traditional',
      places: [
        'Senso-ji Temple',
        'Nakamise Street',
        'Imperial Palace East Gardens',
        'Ginza, Tokyo'
      ],
      activities: [
        'Senso-ji Temple in Asakusa',
        'Nakamise shopping street',
        'Lunch of tempura',
        'Afternoon at Imperial Palace East Gardens',
        'Evening robot restaurant or kabuki show'
      ],
      accommodation: 'Tokyo hotel',
      meals: 'Breakfast included'
    },

    {
      day: 4,
      title: 'Tokyo to Hakone',
      places: [
        'Odawara Station',
        'Lake Ashi',
        'Owakudani',
        'Hakone'
      ],
      activities: [
        'Shinkansen to Odawara',
        'Hakone Round Course: Lake Ashi cruise',
        'Owakudani volcanic valley',
        'Check into traditional ryokan',
        'Kaiseki dinner and onsen (hot spring)'
      ],
      accommodation: 'Hakone ryokan',
      meals: 'Breakfast and dinner included'
    },

    {
      day: 5,
      title: 'Hakone to Kyoto',
      places: [
        'Hakone',
        'Kyoto Station',
        'Gion District, Kyoto',
        'Hanamikoji Street'
      ],
      activities: [
        'Morning onsen visit',
        'Shinkansen to Kyoto',
        'Check into Gion district hotel',
        'Evening geisha spotting in Hanamikoji',
        'Traditional tea ceremony'
      ],
      accommodation: 'Kyoto hotel (4-star)',
      meals: 'Breakfast included'
    },

    {
      day: 6,
      title: 'Kyoto Temples',
      places: [
        'Fushimi Inari Taisha',
        'Kinkaku-ji',
        'Ryoan-ji',
        'Gion, Kyoto'
      ],
      activities: [
        'Early visit to Fushimi Inari Shrine (thousand gates)',
        'Kinkaku-ji (Golden Pavilion)',
        'Lunch of tofu cuisine',
        'Ryoan-ji rock garden',
        'Evening Gion walking tour'
      ],
      accommodation: 'Kyoto hotel',
      meals: 'Breakfast included'
    },

    {
      day: 7,
      title: 'Kyoto Culture',
      places: [
        'Arashiyama Bamboo Grove',
        'Iwatayama Monkey Park',
        'Tenryu-ji Temple',
        'Arashiyama'
      ],
      activities: [
        'Arashiyama Bamboo Grove',
        'Monkey Park Iwatayama',
        'Lunch in Arashiyama',
        'Tenryu-ji Temple',
        'Kimono wearing experience'
      ],
      accommodation: 'Kyoto hotel',
      meals: 'Breakfast included'
    },

    {
      day: 8,
      title: 'Nara Day Trip',
      places: [
        'Nara Park',
        'Todai-ji Temple',
        'Kasuga Taisha',
        'Nara'
      ],
      activities: [
        'Train to Nara',
        'Todai-ji Temple with Great Buddha',
        'Nara Park with friendly deer',
        'Kasuga Taisha Shrine',
        'Return to Kyoto for dinner'
      ],
      accommodation: 'Kyoto hotel',
      meals: 'Breakfast included'
    },

    {
      day: 9,
      title: 'Kyoto to Osaka',
      places: [
        'Osaka Station',
        'Osaka Castle',
        'Shinsekai',
        'Dotonbori'
      ],
      activities: [
        'Short train to Osaka',
        'Check into Dotonbori area hotel',
        'Osaka Castle visit',
        'Afternoon at Shinsekai district',
        'Evening street food tour in Dotonbori'
      ],
      accommodation: 'Osaka hotel (4-star)',
      meals: 'Breakfast included'
    },

    {
      day: 10,
      title: 'Osaka to Hiroshima',
      places: [
        'Hiroshima Station',
        'Hiroshima Peace Memorial Park',
        'Atomic Bomb Dome'
      ],
      activities: [
        'Shinkansen to Hiroshima',
        'Check into hotel',
        'Peace Memorial Park and Museum',
        'Atomic Bomb Dome',
        'Okonomiyaki dinner (Hiroshima style)'
      ],
      accommodation: 'Hiroshima hotel (4-star)',
      meals: 'Breakfast included'
    },

    {
      day: 11,
      title: 'Miyajima Island',
      places: [
        'Miyajimaguchi Ferry Terminal',
        'Itsukushima Shrine',
        'Mount Misen',
        'Miyajima Island'
      ],
      activities: [
        'Ferry to Miyajima Island',
        'Itsukushima Shrine (floating torii gate)',
        'Mount Misen cable car hike',
        'Friendly deer encounters',
        'Return to Hiroshima'
      ],
      accommodation: 'Hiroshima hotel',
      meals: 'Breakfast included'
    },

    {
      day: 12,
      title: 'Hiroshima to Tokyo',
      places: [
        'Tokyo Station',
        'Akihabara',
        'Ginza'
      ],
      activities: [
        'Shinkansen back to Tokyo',
        'Check into hotel',
        'Afternoon free for last shopping',
        'Akihabara for electronics/anime',
        'Farewell dinner with sushi'
      ],
      accommodation: 'Tokyo hotel',
      meals: 'Breakfast included'
    },

    {
      day: 13,
      title: 'Tokyo Free Day',
      places: [
        'Ginza, Tokyo',
        'Don Quijote, Tokyo',
        'Tokyo'
      ],
      activities: [
        'Optional day trips: Nikko, Kamakura, or DisneySea',
        'Last minute shopping in Ginza',
        'Souvenir buying at Don Quijote',
        'Traditional sento (public bath) experience',
        'Pack for departure'
      ],
      accommodation: 'Tokyo hotel',
      meals: 'Breakfast included'
    },

    {
      day: 14,
      title: 'Departure',
      places: [
        'Narita International Airport',
        'Haneda Airport'
      ],
      activities: [
        'Last visit to convenience store for snacks',
        'Narita Express to airport',
        'Duty-free shopping',
        'Optional: extend to Hokkaido or Okinawa'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],

  inclusions: [
    '13 nights accommodation (4-star hotels + 1 ryokan)',
    'Daily breakfast, 2 dinners',
    '7-day Japan Rail Pass',
    'All local transport and transfers',
    'Entrance to major temples and attractions',
    'Pocket WiFi rental'
  ],

  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Personal expenses',
    'Optional activities',
    'Local bus/subway fares (outside JR)'
  ],

  tips: [
    'Get Japan Rail Pass before arrival',
    'Carry cash (many places cash-only)',
    'Learn basic Japanese phrases',
    'No tipping culture',
    'Remove shoes in traditional places',
    'Buy IC card (Suica/Pasmo) for local transport'
  ],

  budget: {
    flights: '$900-1400',
    accommodation: '$100-250/night',
    food: '$30-70/day',
    activities: '$40-80/day',
    transport: '$40-60/day (with JR Pass)',
    total: '$3500-6000 per person'
  }
};

export default japan;
