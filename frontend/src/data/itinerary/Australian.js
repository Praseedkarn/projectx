const Australia = {
  id: 4,
  title: 'Australian Road Trip',
  duration: '12 days',
  location: 'Sydney → Jervis Bay → Lakes Entrance → Melbourne → Great Ocean Road',
  difficulty: 'Moderate',
  priceRange: '$$ (Mid-range)',
  bestTime: 'September to April',
  description:
    "Experience Australia's stunning east coast on an epic road trip from Sydney to Melbourne via the iconic Great Ocean Road.",
  highlights: [
    'Sydney Opera House and Harbour Bridge',
    'White sand beaches of Jervis Bay',
    'Koala and kangaroo encounters',
    'Twelve Apostles on Great Ocean Road',
    "Melbourne's laneways and coffee culture"
  ],
  highlight360Views: [
  { label: "Sydney Opera House", place: "Sydney Opera House" },
  { label: "Sydney Harbour Bridge", place: "Sydney Harbour Bridge" },
  { label: "Jervis Bay", place: "Hyams Beach, Jervis Bay" },
  { label: "Twelve Apostles", place: "Twelve Apostles, Great Ocean Road" },
  { label: "Melbourne Laneways", place: "Melbourne CBD Laneways" }
],

  image:
    'https://tse3.mm.bing.net/th/id/OIP.ouD3b4m-r_RtaWXEaGYobQHaHY?rs=1&pid=ImgDetMain&o=7&rm=3',

  days: [
    {
      day: 1,
      title: 'Arrival in Sydney',
      places: [
        'Sydney Kingsford Smith Airport',
        'Sydney CBD, NSW',
        'Circular Quay, Sydney',
        'Sydney Opera House'
      ],
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
      places: [
        'Sydney Harbour Bridge',
        'Sydney Opera House',
        'The Rocks, Sydney',
        'Bondi Beach',
        'Bondi to Coogee Coastal Walk'
      ],
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
      places: [
        'Katoomba, NSW',
        'Three Sisters, Blue Mountains',
        'Scenic World, Katoomba',
        'Leura Village'
      ],
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
      places: [
        'Jervis Bay, NSW',
        'Hyams Beach',
        'Jervis Bay Marine Park'
      ],
      activities: [
        'Drive south to Jervis Bay (3 hours)',
        "Hyams Beach (world's whitest sand)",
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
      places: [
        'Jervis Bay, NSW',
        'Murramarang National Park',
        'Lakes Entrance, VIC',
        'Ninety Mile Beach'
      ],
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
      places: [
        'Lakes Entrance, VIC',
        'Melbourne CBD',
        'Federation Square',
        'Chinatown Melbourne'
      ],
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
      places: [
        'Melbourne CBD',
        'Queen Victoria Market',
        'Southbank Melbourne',
        'National Gallery of Victoria',
        'St Kilda Beach'
      ],
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
      places: [
        'Torquay, VIC',
        'Great Ocean Road',
        'Bells Beach',
        'Lorne, VIC',
        'Kennett River',
        'Apollo Bay'
      ],
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
      places: [
        'Cape Otway Lighthouse',
        'Twelve Apostles',
        'Loch Ard Gorge',
        'London Arch',
        'Port Campbell'
      ],
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
      places: [
        'Bay of Islands Coastal Park',
        'Grampians National Park',
        'Mackenzie Falls',
        'Boroka Lookout',
        'Halls Gap'
      ],
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
      places: [
        'Grampians National Park',
        'The Pinnacle Lookout',
        'Melbourne CBD'
      ],
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
      places: [
        'Queen Victoria Market',
        'Southern Cross Station',
        'Melbourne Airport'
      ],
      activities: [
        'Last minute souvenir shopping',
        'Optional Queen Victoria Market visit',
        'Skybus to airport',
        'Optional extension to Tasmania or Cairns'
      ],
      accommodation: 'N/A',
      meals: 'Breakfast included'
    }
  ]
};

export default Australia;
