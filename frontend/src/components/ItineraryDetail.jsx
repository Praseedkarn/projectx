import React, { useState, useEffect } from 'react';
import '../styles/ItineraryDetail.css';



  // Detailed data for each itinerary
  const detailedItineraries = {
    1: {
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
      image: 'https://www.pigsflycheap.com/wp-content/uploads/2021/02/Bali-Travel-Guide.jpg', // You can add actual images
      days: [
        {
          day: 1,
          title: 'Arrival in Denpasar - Ubud',
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
    },
    2: {
      id: 2,
      title: 'European Capitals',
      duration: '10 days',
      location: 'Paris, Rome, Amsterdam',
      difficulty: 'Easy',
      priceRange: '$$$ (Luxury)',
      bestTime: 'May-June, September-October',
      description: 'Experience the best of Europe by visiting three iconic capitals - Paris, Rome, and Amsterdam.',
      highlights: [
        'Eiffel Tower and Louvre Museum in Paris',
        'Colosseum and Vatican City in Rome',
        'Canal cruise in Amsterdam',
        'European cuisine and wine tasting',
        'Historic architecture and art'
      ],
      image: 'https://th.bing.com/th/id/OIP.UaeRxMvk3LZjTRNpFuFGwwHaEK?w=335&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  days: [
        {
        day: 1,
        title: 'Arrival in Paris',
        activities: [
            'Arrive at Charles de Gaulle Airport (CDG)',
            'Transfer to hotel in central Paris',
            'Evening Seine River cruise',
            'First view of Eiffel Tower',
            'Welcome dinner in Montmartre'
        ],
        accommodation: 'Paris hotel (4-star)',
        meals: 'Dinner included'
        },
        {
        day: 2,
        title: 'Paris City Highlights',
        activities: [
            'Early visit to Louvre Museum',
            'Notre-Dame Cathedral exterior visit',
            'Lunch in Latin Quarter',
            'Afternoon at Musée d\'Orsay',
            'Evening Eiffel Tower summit visit'
        ],
        accommodation: 'Paris hotel',
        meals: 'Breakfast included'
        },
        {
        day: 3,
        title: 'Paris - Versailles',
        activities: [
            'Morning trip to Palace of Versailles',
            'Gardens and Hall of Mirrors tour',
            'Return to Paris for lunch',
            'Free afternoon for shopping',
            'Optional Moulin Rouge show'
        ],
        accommodation: 'Paris hotel',
        meals: 'Breakfast included'
        },
        {
        day: 4,
        title: 'Paris to Rome',
        activities: [
            'Morning TGV train to airport',
            'Flight to Rome Fiumicino (FCO)',
            'Transfer to Rome hotel',
            'Evening walking tour: Trevi Fountain, Spanish Steps',
            'Dinner in Trastevere'
        ],
        accommodation: 'Rome hotel (4-star)',
        meals: 'Breakfast included'
        },
        {
        day: 5,
        title: 'Ancient Rome',
        activities: [
            'Colosseum guided tour',
            'Roman Forum exploration',
            'Lunch near Capitoline Hill',
            'Afternoon at Pantheon',
            'Evening pizza making class'
        ],
        accommodation: 'Rome hotel',
        meals: 'Breakfast included'
        },
        {
        day: 6,
        title: 'Vatican City',
        activities: [
            'Early Vatican Museums entry',
            'Sistine Chapel visit',
            'St. Peter\'s Basilica climb',
            'Lunch in Vatican area',
            'Free afternoon for shopping',
            'Optional pasta tasting tour'
        ],
        accommodation: 'Rome hotel',
        meals: 'Breakfast included'
        },
        {
        day: 7,
        title: 'Rome to Amsterdam',
        activities: [
            'Morning flight to Amsterdam Schiphol (AMS)',
            'Transfer to canal house hotel',
            'Afternoon Anne Frank House visit',
            'Evening canal cruise',
            'Indonesian rijsttafel dinner'
        ],
        accommodation: 'Amsterdam hotel (4-star)',
        meals: 'Breakfast included'
        },
        {
        day: 8,
        title: 'Amsterdam Exploration',
        activities: [
            'Rijksmuseum visit',
            'Van Gogh Museum',
            'Lunch in Jordaan district',
            'Bike tour of Amsterdam',
            'Evening in Red Light District'
        ],
        accommodation: 'Amsterdam hotel',
        meals: 'Breakfast included'
        },
        {
        day: 9,
        title: 'Dutch Countryside',
        activities: [
            'Morning trip to Zaanse Schans windmills',
            'Cheese tasting and clog demonstration',
            'Lunch in Volendam fishing village',
            'Return to Amsterdam',
            'Farewell dinner'
        ],
        accommodation: 'Amsterdam hotel',
        meals: 'Breakfast and dinner included'
        },
        {
        day: 10,
        title: 'Departure',
        activities: [
            'Last minute shopping at Albert Cuyp Market',
            'Optional Anne Frank House re-visit',
            'Transfer to Schiphol Airport',
            'Optional extension to Brussels or London'
        ],
        accommodation: 'N/A',
        meals: 'Breakfast included'
        }
    ],
    inclusions: [
        '9 nights accommodation (4-star hotels)',
        'Daily breakfast',
        'All inter-city flights and transfers',
        'High-speed train tickets where applicable',
        'Entrance to major attractions',
        'Local guides in each city'
    ],
    exclusions: [
        'International flights to/from Europe',
        'Travel insurance',
        'Most lunches and dinners',
        'Personal expenses',
        'Optional activities',
        'City taxes (paid locally)'
    ],
    tips: [
        'Book major attractions in advance',
        'Comfortable walking shoes essential',
        'Learn basic phrases in each language',
        'Keep passports secure',
        'Validate train tickets before boarding'
    ],
    budget: {
        flights: '$800-1200',
        accommodation: '$150-300/night',
        food: '$40-80/day',
        activities: '$50-100/day',
        transport: '$30-60/day',
        total: '$3000-5000 per person'
    }
    },
      
    
    3: {
      id: 3,
      title: 'Japanese Culture',
      duration: '14 days',
      location: 'Tokyo, Kyoto, Osaka',
      difficulty: 'Moderate',
      priceRange: '$$$',
      bestTime: 'Spring (Cherry blossoms) or Autumn',
      description: 'Immerse yourself in Japanese tradition and modernity.',
      highlights: [
        'Tokyo skyscrapers and temples',
        'Kyoto geisha district',
        'Bullet train experience',
        'Traditional tea ceremony',
        'Osaka street food'
      ],
      // Add detailed days similar to Bali
    },

    3:
    {
  id: 3,
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
  image: 'https://www.postposmo.com/wp-content/uploads/2020/07/CULTURA-JAPONESA-1.jpg',
  days: [
    {
      day: 1,
      title: 'Arrival in Tokyo',
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
}
    ,

    4:
        {
  id: 4,
  title: 'Australian Road Trip',
  duration: '12 days',
  location: 'Sydney → Jervis Bay → Lakes Entrance → Melbourne → Great Ocean Road',
  difficulty: 'Moderate',
  priceRange: '$$ (Mid-range)',
  bestTime: 'September to April',
  description: 'Experience Australia\'s stunning east coast on an epic road trip from Sydney to Melbourne via the iconic Great Ocean Road.',
  highlights: [
    'Sydney Opera House and Harbour Bridge',
    'White sand beaches of Jervis Bay',
    'Koala and kangaroo encounters',
    'Twelve Apostles on Great Ocean Road',
    'Melbourne\'s laneways and coffee culture'
  ],
  image: 'https://tse3.mm.bing.net/th/id/OIP.ouD3b4m-r_RtaWXEaGYobQHaHY?rs=1&pid=ImgDetMain&o=7&rm=3',
  days: [
    {
      day: 1,
      title: 'Arrival in Sydney',
      activities: [
        'Arrive at Sydney Kingsford Smith Airport (SYD)',
        'Pick up rental car or campervan',
        'Check into Sydney CBD hotel',
        'Evening walk around Circular Quay',
        'Dinner with Opera House views'
      ],
      accommodation: 'Sydney hotel (3-star)',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Sydney City',
      activities: [
        'BridgeClimb or Pylon Lookout',
        'Opera House guided tour',
        'Lunch at The Rocks',
        'Afternoon at Bondi Beach',
        'Bondi to Coogee coastal walk (partial)'
      ],
      accommodation: 'Sydney hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Blue Mountains Day Trip',
      activities: [
        'Drive to Katoomba (1.5 hours)',
        'Three Sisters rock formation',
        'Scenic World rides (optional)',
        'Lunch in Leura',
        'Return to Sydney for evening'
      ],
      accommodation: 'Sydney hotel',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Sydney to Jervis Bay',
      activities: [
        'Drive south to Jervis Bay (3 hours)',
        'Hyams Beach (world\'s whitest sand)',
        'Dolphin or whale watching cruise',
        'Check into beachside accommodation',
        'Beach sunset'
      ],
      accommodation: 'Jervis Bay holiday park/cabin',
      meals: 'Breakfast included'
    },
    {
      day: 5,
      title: 'Jervis Bay to Lakes Entrance',
      activities: [
        'Morning beach swim',
        'Drive to Lakes Entrance (6 hours)',
        'Stop at Murramarang National Park (kangaroos on beach)',
        'Check into accommodation',
        'Evening at Ninety Mile Beach'
      ],
      accommodation: 'Lakes Entrance motel',
      meals: 'Breakfast included'
    },
    {
      day: 6,
      title: 'Lakes Entrance to Melbourne',
      activities: [
        'Morning lakes cruise',
        'Drive to Melbourne (4 hours)',
        'Check into Melbourne CBD hotel',
        'Evening explore Federation Square',
        'Dinner in Chinatown'
      ],
      accommodation: 'Melbourne hotel (3-star)',
      meals: 'Breakfast included'
    },
    {
      day: 7,
      title: 'Melbourne City',
      activities: [
        'Coffee tour of laneways',
        'Queen Victoria Market',
        'Lunch at Southbank',
        'National Gallery of Victoria',
        'Evening at St Kilda Beach'
      ],
      accommodation: 'Melbourne hotel',
      meals: 'Breakfast included'
    },
    {
      day: 8,
      title: 'Melbourne to Apollo Bay',
      activities: [
        'Start Great Ocean Road at Torquay',
        'Bells Beach surf spot',
        'Lorne for lunch',
        'Kennett River (koala spotting)',
        'Check into Apollo Bay accommodation'
      ],
      accommodation: 'Apollo Bay holiday park',
      meals: 'Breakfast included'
    },
    {
      day: 9,
      title: 'Great Ocean Road Highlights',
      activities: [
        'Morning at Cape Otway Lighthouse',
        'Twelve Apostles viewing',
        'Loch Ard Gorge',
        'London Arch',
        'Check into Port Campbell accommodation'
      ],
      accommodation: 'Port Campbell motel',
      meals: 'Breakfast included'
    },
    {
      day: 10,
      title: 'Port Campbell to Grampians',
      activities: [
        'Morning at Bay of Islands',
        'Drive to Grampians National Park',
        'Mackenzie Falls hike',
        'Boroka Lookout for sunset',
        'Check into Halls Gap accommodation'
      ],
      accommodation: 'Halls Gap cabin',
      meals: 'Breakfast included'
    },
    {
      day: 11,
      title: 'Grampians to Melbourne',
      activities: [
        'Morning wildlife spotting (kangaroos, emus)',
        'The Pinnacle hike',
        'Drive back to Melbourne (3 hours)',
        'Return rental car',
        'Farewell dinner'
      ],
      accommodation: 'Melbourne hotel',
      meals: 'Breakfast and dinner included'
    },
    {
      day: 12,
      title: 'Departure',
      activities: [
        'Last minute souvenir shopping',
        'Optional Queen Victoria Market visit',
        'Skybus to airport',
        'Optional extension to Tasmania or Cairns'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],
  inclusions: [
    '11 nights accommodation (mix of hotels and cabins)',
    'Daily breakfast, 2 dinners',
    'Rental car or campervan (10 days)',
    'National park entry fees',
    'Jervis Bay dolphin cruise',
    'Sydney Opera House tour'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Petrol for rental vehicle',
    'Optional activities',
    'Parking fees in cities'
  ],
  tips: [
    'Drive on the left side',
    'Book accommodations in advance during peak season',
    'Carry water on hikes',
    'Check fire conditions in summer',
    'Download offline maps',
    'Get comprehensive insurance for rental'
  ],
  budget: {
    flights: '$800-1200',
    accommodation: '$80-150/night',
    food: '$30-60/day',
    activities: '$40-80/day',
    transport: '$50-100/day (car rental + fuel)',
    total: '$2000-3500 per person'
  }
}
    ,

    5:
    {
  id: 5,
  title: 'Peru Discovery',
  duration: '9 days',
  location: 'Lima → Cusco → Sacred Valley → Machu Picchu',
  difficulty: 'Challenging',
  priceRange: '$$ (Mid-range)',
  bestTime: 'May to September (dry season)',
  description: 'Journey through ancient Inca civilization, from Lima\'s culinary scene to the breathtaking wonder of Machu Picchu.',
  highlights: [
    'Machu Picchu sunrise experience',
    'Sacred Valley ruins and markets',
    'Cusco\'s colonial and Inca architecture',
    'Lima\'s world-class cuisine',
    'Andean culture and textiles'
  ],
  image: 'https://th.bing.com/th/id/OIP.mpxO9V6mGlMghTh2RxHmTQHaDt?w=297&h=174&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  days: [
    {
      day: 1,
      title: 'Arrival in Lima',
      activities: [
        'Arrive at Jorge Chávez International Airport (LIM)',
        'Transfer to Miraflores district hotel',
        'Afternoon walk along Malecón cliffs',
        'Visit Parque del Amor',
        'Welcome dinner with pisco sour tasting'
      ],
      accommodation: 'Lima hotel (3-star)',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'Lima Exploration',
      activities: [
        'Morning at Larco Museum (pre-Columbian art)',
        'Historic center: Plaza de Armas, Cathedral',
        'Lunch at traditional cevichería',
        'Barranco district: Bridge of Sighs',
        'Evening food tour in Miraflores'
      ],
      accommodation: 'Lima hotel',
      meals: 'Breakfast included'
    },
    {
      day: 3,
      title: 'Lima to Cusco',
      activities: [
        'Morning flight to Cusco (CUZ)',
        'Rest at hotel to acclimate to altitude',
        'Light walking: Plaza de Armas, Cathedral',
        'Coca tea to help with altitude',
        'Early dinner and rest'
      ],
      accommodation: 'Cusco hotel (3-star)',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Sacred Valley',
      activities: [
        'Full day Sacred Valley tour',
        'Pisac market and ruins',
        'Lunch with valley view',
        'Ollantaytambo fortress',
        'Return to Cusco or stay in Valley'
      ],
      accommodation: 'Sacred Valley hotel',
      meals: 'Breakfast and lunch included'
    },
    {
      day: 5,
      title: 'Machu Picchu Day',
      activities: [
        'Early train from Ollantaytambo to Aguas Calientes',
        'Bus up to Machu Picchu',
        'Guided tour of citadel (2-3 hours)',
        'Optional: climb Huayna Picchu or Machu Picchu Mountain',
        'Return to Aguas Calientes'
      ],
      accommodation: 'Aguas Calientes hotel',
      meals: 'Breakfast included'
    },
    {
      day: 6,
      title: 'Second Machu Picchu Visit',
      activities: [
        'Optional second entry to Machu Picchu (additional fee)',
        'Morning hike to Sun Gate',
        'Explore at own pace',
        'Afternoon train back to Ollantaytambo',
        'Private transfer to Cusco'
      ],
      accommodation: 'Cusco hotel',
      meals: 'Breakfast included'
    },
    {
      day: 7,
      title: 'Cusco Ruins',
      activities: [
        'City tour: Qorikancha (Sun Temple)',
        'Nearby ruins: Sacsayhuamán, Q\'enqo, Puka Pukara',
        'Lunch in San Blas artisan district',
        'Afternoon free for shopping',
        'Farewell dinner with traditional music'
      ],
      accommodation: 'Cusco hotel',
      meals: 'Breakfast and dinner included'
    },
    {
      day: 8,
      title: 'Rainbow Mountain (Optional)',
      activities: [
        'OPTIONAL: Full day Vinicunca Rainbow Mountain hike',
        'Early start (4-5am)',
        'Challenging hike to 5,200m altitude',
        'Return to Cusco late afternoon',
        'OR Free day in Cusco for rest/shopping'
      ],
      accommodation: 'Cusco hotel',
      meals: 'Breakfast included'
    },
    {
      day: 9,
      title: 'Departure',
      activities: [
        'Last minute souvenir shopping',
        'Visit local market for textiles',
        'Transfer to Cusco airport',
        'Flight to Lima for international connection',
        'Optional extension to Lake Titicaca or Amazon'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],
  inclusions: [
    '8 nights accommodation (3-star hotels)',
    'Daily breakfast, 2 lunches, 2 dinners',
    'All domestic flights (Lima-Cusco)',
    'Machu Picchu entrance fee and guided tour',
    'Sacred Valley tour',
    'Expedition train to/from Machu Picchu',
    'All transfers and transportation'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Optional activities (Rainbow Mountain, etc.)',
    'Tips and gratuities',
    'Huayna Picchu mountain permit (additional)'
  ],
  tips: [
    'Acclimatize properly to altitude',
    'Drink coca tea for altitude sickness',
    'Book Machu Picchu tickets months in advance',
    'Carry layers (temperature changes dramatically)',
    'Use sunscreen at high altitude',
    'Drink bottled water only'
  ],
  budget: {
    flights: '$600-1000',
    accommodation: '$50-100/night',
    food: '$20-40/day',
    activities: '$50-100/day',
    transport: '$20-40/day',
    total: '$1500-2500 per person'
  }
},

6:
{
  id: 6,
  title: 'Thai Islands',
  duration: '8 days',
  location: 'Phuket → Phi Phi Islands → Krabi',
  difficulty: 'Easy',
  priceRange: '$ (Budget)',
  bestTime: 'November to April (dry season)',
  description: 'Paradise found! Island hop through Thailand\'s stunning southern islands, featuring turquoise waters, limestone cliffs, and pristine beaches.',
  highlights: [
    'Maya Bay (from "The Beach")',
    'Phi Phi Islands boat tour',
    'Railay Beach rock climbing',
    'Phuket\'s Patong Beach nightlife',
    'Thai massage and street food'
  ],
  image: 'https://tse4.mm.bing.net/th/id/OIP.3rdnjivyuroOrluf1X7I6wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  days: [
    {
      day: 1,
      title: 'Arrival in Phuket',
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
}
,
  
7:
{
  id: 7,
  title: 'Safari Experience',
  duration: '6 days',
  location: 'Masai Mara National Reserve, Kenya',
  difficulty: 'Moderate',
  priceRange: '$$$ (Luxury)',
  bestTime: 'July to October (Great Migration) or January to March (dry season)',
  description: 'Experience the ultimate African safari adventure in the world-famous Masai Mara, home to the Big Five and the spectacular Great Migration.',
  highlights: [
    'Witness the Big Five (lion, leopard, elephant, buffalo, rhino)',
    'See the Great Migration (seasonal)',
    'Masai village cultural experience',
    'Hot air balloon safari over the savanna',
    'Sunset game drives with sundowners'
  ],
  image: 'https://th.bing.com/th/id/OIP.14Uj6lRQtwbzZp0xRFPp1gHaEG?w=284&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  days: [
    {
      day: 1,
      title: 'Arrival in Nairobi - Transfer to Masai Mara',
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
}
,

8:
{
  id: 8,
  title: 'California Coast',
  duration: '10 days',
  location: 'San Francisco → Monterey → Big Sur → Santa Barbara → Los Angeles',
  difficulty: 'Easy',
  priceRange: '$$ (Mid-range)',
  bestTime: 'April to October (avoid June gloom)',
  description: 'The ultimate Pacific Coast Highway road trip, featuring stunning coastal views, charming towns, and iconic California landmarks.',
  highlights: [
    'Golden Gate Bridge and Alcatraz',
    '17-Mile Drive and Pebble Beach',
    'Big Sur coastline and Bixby Bridge',
    'Hearst Castle tour',
    'Santa Barbara mission and wineries',
    'Los Angeles Hollywood landmarks'
  ],
  image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  days: [
    {
      day: 1,
      title: 'Arrival in San Francisco',
      activities: [
        'Arrive at SFO or OAK airport',
        'Pick up rental car',
        'Check into Fisherman\'s Wharf hotel',
        'Evening walk to Pier 39',
        'Dinner with clam chowder in sourdough bowl'
      ],
      accommodation: 'San Francisco hotel (3-star)',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'San Francisco City Tour',
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
      activities: [
        'Last morning at Venice Beach Boardwalk',
        'Optional Warner Bros Studio Tour',
        'Return rental car at LAX',
        'Optional extension to San Diego or Las Vegas'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ],
  inclusions: [
    '9 nights accommodation (3-star hotels/lodges)',
    'Daily breakfast',
    '10-day intermediate car rental',
    'Alcatraz tour tickets',
    'Monterey Bay Aquarium entry',
    'Hearst Castle tour'
  ],
  exclusions: [
    'International flights',
    'Travel insurance',
    'Most lunches and dinners',
    'Parking fees in cities',
    'Gas for rental car',
    'Optional activities'
  ],
  tips: [
    'Book Alcatraz tickets 3+ months in advance',
    'Download offline maps (spotty cell service in Big Sur)',
    'Check road conditions for Highway 1 closures',
    'Make restaurant reservations in advance',
    'Carry layers - coastal temperatures vary',
    'Get EZ-Pass for toll bridges'
  ],
  budget: {
    flights: '$400-800',
    accommodation: '$100-250/night',
    food: '$40-80/day',
    activities: '$30-70/day',
    transport: '$50-100/day (car rental + gas)',
    total: '$2000-3500 per person'
  }
}
,

9:
{
  id: 9,
  title: 'Delhi Heritage Tour',
  duration: '3 days',
  location: 'Delhi, India',
  difficulty: 'Easy',
  priceRange: '$ (Budget)',
  bestTime: 'October to March (pleasant weather)',
  description: 'Discover the rich tapestry of India\'s capital, where ancient monuments stand alongside modern marvels, showcasing 3000 years of history.',
  highlights: [
    'Red Fort and India Gate',
    'Qutub Minar complex',
    'Humayun\'s Tomb (precursor to Taj Mahal)',
    'Old Delhi spice market and street food',
    'Lotus Temple and Akshardham'
  ],
  image: 'https://images.unsplash.com/photo-1585506936724-fa0c19d00a15?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  days: [
    {
      day: 1,
      title: 'Old Delhi Exploration',
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
      activities: [
        'Morning at India Gate and Rajpath',
        'Visit Rashtrapati Bhavan (President\'s House) exterior',
        'Humayun\'s Tomb (UNESCO World Heritage)',
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
      activities: [
        'Morning visit to Lotus Temple (Bahá\'í House of Worship)',
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
}
,
10:
{
  id: 10,
  title: 'Goa Beach Holiday',
  duration: '5 days',
  location: 'North Goa and South Goa, India',
  difficulty: 'Easy',
  priceRange: '$$ (Mid-range)',
  bestTime: 'November to February (peak season)',
  description: 'Relax on golden sands, savor fresh seafood, and experience the unique blend of Portuguese and Indian cultures in India\'s beach paradise.',
  highlights: [
    'Baga and Calangute beaches',
    'Anjuna Flea Market',
    'Portuguese architecture in Old Goa',
    'Dudhsagar Waterfalls day trip',
    'Sunset cruise on Mandovi River',
    'Goan seafood and Portuguese-influenced cuisine'
  ],
  image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  days: [
    {
      day: 1,
      title: 'Arrival in Goa - North Goa Beaches',
      activities: [
        'Arrive at Goa International Airport (GOI)',
        'Transfer to North Goa beach resort',
        'Check in and relax',
        'Evening at Baga Beach',
        'Dinner at beach shack',
        'Explore Tito\'s Lane nightlife (optional)'
      ],
      accommodation: 'North Goa beach resort',
      meals: 'Dinner included'
    },
    {
      day: 2,
      title: 'North Goa Exploration',
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
}
,

11:
{
  id: 11,
  title: 'Kashmir Valley',
  duration: '6 days',
  location: 'Srinagar → Gulmarg → Pahalgam, Kashmir',
  difficulty: 'Moderate',
  priceRange: '$$ (Mid-range)',
  bestTime: 'April to October (summer) or December to February (winter sports)',
  description: 'Experience "Heaven on Earth" - stay on iconic houseboats, explore Mughal gardens, and marvel at the stunning Himalayan landscapes.',
  highlights: [
    'Stay on Dal Lake houseboat',
    'Shikara ride on Dal Lake',
    'Gulmarg Gondola (one of world\'s highest cable cars)',
    'Mughal gardens of Srinagar',
    'Betaab Valley and Lidder River in Pahalgam',
    'Local Kashmiri cuisine and handicrafts'
  ],
  image: 'https://images.unsplash.com/photo-1599731974853-8fe1d8b6c9e7?ixlib=rb-4.0.3&auto=format&fit=crop&w-2000&q=80',
  days: [
    {
      day: 1,
      title: 'Arrival in Srinagar - Dal Lake',
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
      activities: [
        'Drive to Gulmarg (2 hours)',
        'Check into hotel/resort',
        'Gulmarg Gondola Phase 1 to Kongdoori',
        'Optional Phase 2 to Apharwat Peak (weather permitting)',
        'Golf at world\'s highest green (summer)',
        'Evening walk in Gulmarg meadows'
      ],
      accommodation: 'Gulmarg hotel/resort',
      meals: 'Breakfast included'
    },
    {
      day: 4,
      title: 'Gulmarg to Pahalgam',
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
}
,
12:{
  id: 12,
  title: 'Rajasthan Royal Tour',
  duration: '8 days',
  location: 'Jaipur → Jodhpur → Udaipur → Pushkar, Rajasthan',
  difficulty: 'Moderate',
  priceRange: '$$$ (Luxury)',
  bestTime: 'October to March (pleasant weather)',
  description: 'Journey through the Land of Kings, exploring majestic forts, opulent palaces, and experiencing royal hospitality in India\'s most colorful state.',
  highlights: [
    'Amber Fort elephant ride (optional)',
    'Mehrangarh Fort in Jodhpur',
    'Lake Palace and City Palace in Udaipur',
    'Desert safari in Thar Desert',
    'Pushkar Camel Fair (if timed)',
    'Traditional Rajasthani folk performances'
  ],
  image: 'https://th.bing.com/th/id/OIP.07U1zvyRX_KBE_gc1oDpiwHaE7?w=177&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3',
  days: [
    {
      day: 1,
      title: 'Arrival in Jaipur - Pink City',
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
      activities: [
        'Drive to Jodhpur (5-6 hours)',
        'Check into hotel with fort view',
        'Visit Mehrangarh Fort (one of India\'s largest)',
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
}


  };

  const ItineraryDetail = ({ itineraryId, onBack }) => {
  // Detailed itinerary data - you can expand this with more details
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState(1);

  // Load itinerary details when component mounts or itineraryId changes
  useEffect(() => {
    const detail = detailedItineraries[itineraryId] || detailedItineraries[1];
    setItineraryDetails(detail);
    window.scrollTo(0, 0);
  }, [itineraryId]);

  if (!itineraryDetails) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading itinerary details...</p>
        <button className="back-button" onClick={onBack}>
          ← Back to Itineraries
        </button>
      </div>
    );
  }

  return (
    <div className="itinerary-detail">
      {/* Hero Section with Back Button */}
      <div className="detail-hero">
        <button className="back-button" onClick={onBack}>
          ← Back to All Itineraries
        </button>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="detail-title">{itineraryDetails.title}</h1>
            <div className="hero-meta">
              <span className="detail-duration">🕒 {itineraryDetails.duration}</span>
              <span className="detail-location">📍 {itineraryDetails.location}</span>
              <span className="detail-price">💰 {itineraryDetails.priceRange}</span>
              <span className={`detail-difficulty difficulty-${itineraryDetails.difficulty.toLowerCase()}`}>
                {itineraryDetails.difficulty}
              </span>
            </div>
            <p className="detail-description">{itineraryDetails.description}</p>
          </div>
          <div className="hero-image">
  {itineraryDetails.image ? (
    <img 
      src={itineraryDetails.image} 
      alt={itineraryDetails.title}
      className="detail-image"
    />
  ) : (
    <div className="image-placeholder">
      {itineraryDetails.title.charAt(0)}
    </div>
  )}
</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="detail-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          🗓️ Daily Itinerary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'practical' ? 'active' : ''}`}
          onClick={() => setActiveTab('practical')}
        >
          ℹ️ Practical Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          💰 Budget
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="section">
              <h2>✨ Trip Highlights</h2>
              <ul className="highlights-list">
                {itineraryDetails.highlights?.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h2>✅ What's Included</h2>
              <div className="inclusions-grid">
                <div className="inclusions-box">
                  <h3>Included</h3>
                  <ul>
                    {itineraryDetails.inclusions?.map((item, index) => (
                      <li key={index}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="exclusions-box">
                  <h3>Not Included</h3>
                  <ul>
                    {itineraryDetails.exclusions?.map((item, index) => (
                      <li key={index}>✗ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="quick-facts">
              <h2>📊 Quick Facts</h2>
              <div className="facts-grid">
                <div className="fact">
                  <span className="fact-label">Best Time to Visit</span>
                  <span className="fact-value">{itineraryDetails.bestTime}</span>
                </div>
                <div className="fact">
                  <span className="fact-label">Difficulty Level</span>
                  <span className="fact-value">{itineraryDetails.difficulty}</span>
                </div>
                <div className="fact">
                  <span className="fact-label">Price Range</span>
                  <span className="fact-value">{itineraryDetails.priceRange}</span>
                </div>
                <div className="fact">
                  <span className="fact-label">Duration</span>
                  <span className="fact-value">{itineraryDetails.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="itinerary-tab">
            <h2>📅 Daily Schedule</h2>
            <div className="day-selector">
              {itineraryDetails.days?.map((day) => (
                <button
                  key={day.day}
                  className={`day-btn ${selectedDay === day.day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day.day)}
                >
                  Day {day.day}
                </button>
              ))}
            </div>

            {itineraryDetails.days?.map((day) => (
              selectedDay === day.day && (
                <div key={day.day} className="day-detail">
                  <h3>Day {day.day}: {day.title}</h3>
                  
                  <div className="day-section">
                    <h4>📝 Activities</h4>
                    <ul className="activities-list">
                      {day.activities?.map((activity, index) => (
                        <li key={index}>
                          <span className="activity-time">{index + 9}:00 AM</span>
                          <span className="activity-text">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="day-info-grid">
                    <div className="info-box">
                      <h4>🏨 Accommodation</h4>
                      <p>{day.accommodation}</p>
                    </div>
                    <div className="info-box">
                      <h4>🍽️ Meals</h4>
                      <p>{day.meals}</p>
                    </div>
                    <div className="info-box">
                      <h4>🚗 Transport</h4>
                      <p>Private car / Local transport</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="practical-tab">
            <h2>ℹ️ Practical Information</h2>
            
            <div className="tips-section">
              <h3>💡 Travel Tips</h3>
              <ul className="tips-list">
                {itineraryDetails.tips?.map((tip, index) => (
                  <li key={index}>{tip}</li>
                )) || [
                  'Carry local currency for small purchases',
                  'Download offline maps',
                  'Learn basic local phrases',
                  'Check visa requirements',
                  'Purchase travel insurance'
                ].map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="documents-section">
              <h3>📄 Required Documents</h3>
              <ul>
                <li>Valid passport (6+ months validity)</li>
                <li>Visa (if required)</li>
                <li>Travel insurance certificate</li>
                <li>Flight tickets</li>
                <li>Hotel reservations</li>
              </ul>
            </div>

            <div className="packing-section">
              <h3>🎒 Packing List</h3>
              <div className="packing-grid">
                <div className="packing-category">
                  <h4>Essential</h4>
                  <ul>
                    <li>Passport & Documents</li>
                    <li>Money & Cards</li>
                    <li>Medications</li>
                    <li>Phone & Charger</li>
                  </ul>
                </div>
                <div className="packing-category">
                  <h4>Clothing</h4>
                  <ul>
                    <li>Comfortable walking shoes</li>
                    <li>Light layers</li>
                    <li>Rain jacket</li>
                    <li>Swimwear</li>
                  </ul>
                </div>
                <div className="packing-category">
                  <h4>Accessories</h4>
                  <ul>
                    <li>Power adapter</li>
                    <li>Reusable water bottle</li>
                    <li>Sunglasses & Hat</li>
                    <li>Day backpack</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="budget-tab">
            <h2>💰 Budget Breakdown</h2>
            
            {itineraryDetails.budget ? (
              <>
                <div className="budget-summary">
                  <div className="total-budget">
                    <h3>Total Estimated Cost</h3>
                    <p className="total-amount">{itineraryDetails.budget.total}</p>
                    <p className="budget-note">Per person, excluding international flights</p>
                  </div>
                </div>

                <div className="budget-breakdown">
                  <h3>Cost Breakdown</h3>
                  <div className="budget-items">
                    {Object.entries(itineraryDetails.budget).map(([category, amount]) => (
                      category !== 'total' && (
                        <div key={category} className="budget-item">
                          <span className="budget-category">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                          <span className="budget-amount">{amount}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="budget-estimate">
                <h3>Estimated Budget Range</h3>
                <div className="budget-range">
                  <div className="budget-option">
                    <h4>Budget Traveler</h4>
                    <p>$800-1200</p>
                    <ul>
                      <li>Hostels or budget hotels</li>
                      <li>Local transportation</li>
                      <li>Street food & local eateries</li>
                      <li>Free or low-cost activities</li>
                    </ul>
                  </div>
                  <div className="budget-option">
                    <h4>Mid-range Traveler</h4>
                    <p>$1200-2000</p>
                    <ul>
                      <li>3-star hotels or guesthouses</li>
                      <li>Mix of transport options</li>
                      <li>Restaurant meals</li>
                      <li>Paid attractions & tours</li>
                    </ul>
                  </div>
                  <div className="budget-option">
                    <h4>Luxury Traveler</h4>
                    <p>$2000-3500+</p>
                    <ul>
                      <li>4-5 star hotels or resorts</li>
                      <li>Private transfers</li>
                      <li>Fine dining restaurants</li>
                      <li>Private guides & exclusive tours</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="money-tips">
              <h3>💵 Money Saving Tips</h3>
              <ul>
                <li>Travel during shoulder season for lower prices</li>
                <li>Book flights and accommodation in advance</li>
                <li>Use local transportation instead of taxis</li>
                <li>Eat at local markets and street food stalls</li>
                <li>Look for combo tickets for attractions</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="save-itinerary-btn"
          onClick={() => {
            // Save to localStorage
            const saved = JSON.parse(localStorage.getItem('savedItineraries')) || [];
            const isSaved = saved.some(item => item.id === itineraryDetails.id);
            
            if (!isSaved) {
              saved.push({
                ...itineraryDetails,
                savedAt: new Date().toISOString()
              });
              localStorage.setItem('savedItineraries', JSON.stringify(saved));
              alert('✅ Itinerary saved to your collection!');
            } else {
              alert('⭐ This itinerary is already saved!');
            }
          }}
        >
          ⭐ Save This Itinerary
        </button>
        
        <button 
          className="generate-similar-btn"
          onClick={() => {
            alert(`Would you like to generate a similar itinerary for ${itineraryDetails.location}?`);
            // You can implement AI generation here
          }}
        >
          🤖 Generate Similar Trip with AI
        </button>
        
        <button 
          className="share-btn"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }}
        >
          📤 Share Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryDetail;
export {detailedItineraries};