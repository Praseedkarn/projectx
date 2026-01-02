import React, { useState, useEffect } from 'react';
// import '../styles/ItineraryPage.css';

const ItineraryPage = ({ onBack, onItineraryClick, onViewSaved }) => {
  // Sample popular itineraries data
  const [popularItineraries] = useState([
    {
      id: 1,
      title: 'Bali Adventure',
      duration: '7 days',
      description: 'Explore the best of Bali - beaches, temples, and rice terraces',
      location: 'Bali, Indonesia',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Beach', 'Culture', 'Adventure'],
      image:" https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      title: 'European Capitals',
      duration: '10 days',
      description: 'Visit Paris, Rome, and Amsterdam in one unforgettable trip',
      location: 'Europe',
      difficulty: 'Easy',
      price: '$$$',
      tags: ['City', 'Culture', 'History'], 
      image:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXVyb3BlfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      title: 'Japanese Culture',
      duration: '14 days',
      description: 'Traditional temples, modern cities, and authentic cuisine',
      location: 'Japan',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Culture', 'Food', 'History'],
      image:"https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFwYW58ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 4,
      title: 'Australian Road Trip',
      duration: '12 days',
      description: 'Coastal drives from Sydney to Melbourne with wildlife encounters',
      location: 'Australia',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Nature', 'Road Trip', 'Beach'],
      image:'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXVzdHJhbGlhfGVufDB8fDB8fHww'
    },
    {
      id: 5,
      title: 'Peru Discovery',
      duration: '9 days',
      description: 'Machu Picchu, Sacred Valley, and Peruvian cuisine',
      location: 'Peru',
      difficulty: 'Challenging',
      price: '$$',
      tags: ['Adventure', 'History', 'Mountains'],
      image:"https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVydXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 6,
      title: 'Thai Islands',
      duration: '8 days',
      description: 'Island hopping in Southern Thailand paradise',
      location: 'Thailand',
      difficulty: 'Easy',
      price: '$',
      tags: ['Beach', 'Island', 'Relaxation'],
      image:"https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGhhaWxhbmR8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 7,
      title: 'Safari Experience',
      duration: '6 days',
      description: 'Wildlife safari in the heart of Africa',
      location: 'Kenya',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Wildlife', 'Adventure', 'Nature'],
      image:"https://images.unsplash.com/photo-1577971132997-c10be9372519?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FmYXJpfGVufDB8fDB8fHww"
    },
    {
      id: 8,
      title: 'California Coast',
      duration: '10 days',
      description: 'Highway 1 road trip from San Francisco to Los Angeles',
      location: 'USA',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Road Trip', 'Beach', 'Nature'],
      image:"https://images.unsplash.com/photo-1600621894697-9423563eabf3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsaWZvcm5pYSUyMGJlYWNofGVufDB8fDB8fHww"
    },
    {
      id: 9,
      title: 'Delhi Heritage Tour',
      duration: '3 days',
      description: 'Explore the rich history and culture of Delhi',
      location: 'Delhi, India',
      difficulty: 'Easy',
      price: '$',
      tags: ['History', 'Culture', 'Food'],
      image:"https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaGl8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 10,
      title: 'Goa Beach Holiday',
      duration: '5 days',
      description: 'Relax on beautiful beaches and enjoy seafood',
      location: 'Goa, India',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Beach', 'Relaxation', 'Food'],
      image:"https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29hfGVufDB8fDB8fHww"
    },
    {
      id: 11,
      title: 'Kashmir Valley',
      duration: '6 days',
      description: 'Houseboats, gardens, and mountain views',
      location: 'Kashmir, India',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Mountains', 'Nature', 'Culture'],
      image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 12,
      title: 'Rajasthan Royal Tour',
      duration: '8 days',
      description: 'Palaces, forts, and desert safari',
      location: 'Rajasthan, India',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['History', 'Culture', 'Desert'],
      image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqc3RoYW58ZW58MHx8MHx8fDA%3D"
    },
    {
    id: 13,
    title: "Kerala Backwater Escape",
    duration: "5 days",
    description: "Houseboats, coconut lagoons, and serene villages",
    location: "Kerala, India",
    difficulty: "Easy",
    price: "$$",
    tags: ["Nature", "Relaxation", "Backwaters"],
      image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 14,
    title: "Himachal Adventure Trail",
    duration: "6 days",
    description: "Mountains, rivers, and thrilling outdoor activities",
    location: "Himachal Pradesh, India",
    difficulty: "Hard",
    price: "$$",
    tags: ["Adventure", "Mountains", "Trekking"],
      image:"https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      
  
  },
  {
    id: 15,
    title: "Golden Triangle Tour",
    duration: "4 days",
    description: "Explore Delhi, Agra, and Jaipur highlights",
    location: "Delhi – Agra – Jaipur, India",
    difficulty: "Easy",
    price: "$",
    tags: ["History", "Culture", "Architecture"]
    ,
      image:"https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 16,
    title: "Goa Beach Break",
    duration: "3 days",
    description: "Sun, sand, nightlife, and Portuguese heritage",
    location: "Goa, India",
    difficulty: "Easy",
    price: "$$",
    tags: ["Beach", "Nightlife", "Relaxation"],
      image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww"
  },
  {
    id: 17,
    title: "North East Explorer",
    duration: "7 days",
    description: "Waterfalls, hills, and unique tribal culture",
    location: "Meghalaya & Assam, India",
    difficulty: "Moderate",
    price: "$$",
    tags: ["Nature", "Culture", "Offbeat"],
      image:"https://media.istockphoto.com/id/1431484839/photo/adult-indian-rhinoceros-crossing-a-safari-trail.webp?a=1&b=1&s=612x612&w=0&k=20&c=jTftLp9_dCThnoEYiS6pSuRAtVERhB0hAv9t43V4EGk="
  },
  {
    id: 18,
    title: "Spiritual Varanasi Retreat",
    duration: "3 days",
    description: "Ghats, Ganga aarti, and ancient temples",
    location: "Varanasi, India",
    difficulty: "Easy",
    price: "$",
    tags: ["Spiritual", "Culture", "Heritage"],
      image:"https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 19,
    title: "Kashmir Paradise Tour",
    duration: "6 days",
    description: "Lakes, gardens, snow peaks, and scenic valleys",
    location: "Kashmir, India",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Nature", "Mountains", "Scenic"],
      image:"https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 20,
    title: "Andaman Island Getaway",
    duration: "5 days",
    description: "Crystal clear beaches and water sports",
    location: "Andaman & Nicobar Islands, India",
    difficulty: "Easy",
    price: "$$$",
    tags: ["Beach", "Adventure", "Islands"],
      image:"https://images.unsplash.com/photo-1586053226626-febc8817962f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5kYW1hbiUyMGFuZCUyMG5pY29iYXIlMjBpc2xhbmRzfGVufDB8fDB8fHww"
  },
  {
    id: 21,
    title: "Swiss Alps Scenic Escape",
    duration: "6 days",
    description: "Snow-capped peaks, alpine villages, and scenic train rides",
    location: "Switzerland",
    difficulty: "Moderate",
    price: "$$$$",
    tags: ["Mountains", "Scenic", "Luxury"],
      image:"https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpc3MlMjBhbHBzfGVufDB8fDB8fHww"
  },
  {
    id: 22,
    title: "Everest Base Camp Trek",
    duration: "12 days",
    description: "World-famous trek to the base of Mount Everest",
    location: "Nepal",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "Mountains", "Adventure"],
      image:"https://images.unsplash.com/photo-1515245469645-19dbee02403e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlcmVzdCUyMGJhc2UlMjBjYW1wfGVufDB8fDB8fHww"
  },
  {
    id: 23,
    title: "Inca Trail to Machu Picchu",
    duration: "7 days",
    description: "Ancient trails, ruins, and breathtaking Andes views",
    location: "Peru",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "History", "Mountains"],
      image:"https://images.unsplash.com/photo-1725095660831-477ec532dcd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5jYSUyMHRyYWlsfGVufDB8fDB8fHww"
  },
  {
    id: 24,
    title: "Patagonia Wilderness Trek",
    duration: "9 days",
    description: "Glaciers, dramatic peaks, and untouched wilderness",
    location: "Patagonia, Chile & Argentina",
    difficulty: "Hard",
    price: "$$$$",
    tags: ["Mountains", "Nature", "Adventure"],
      image:"https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF0YWdvbmlhfGVufDB8fDB8fHww"
  },
  {
    id: 25,
    title: "Mount Fuji Climb",
    duration: "3 days",
    description: "Iconic volcanic peak and cultural experience",
    location: "Japan",
    difficulty: "Moderate",
    price: "$$",
    tags: ["Mountains", "Trekking", "Culture"],
      image:"https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww"
  },
  {
    id: 26,
    title: "Dolomites Hiking Tour",
    duration: "6 days",
    description: "Dramatic limestone peaks and alpine meadows",
    location: "Italy",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Mountains", "Hiking", "Scenic"],
      image:"https://images.unsplash.com/photo-1534106474077-f9e9c6f5a47c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9sb21pdGVzfGVufDB8fDB8fHww"
  },
  {
    id: 27,
    title: "Rocky Mountains Road & Hike",
    duration: "5 days",
    description: "National parks, alpine lakes, and wildlife",
    location: "Colorado, USA",
    difficulty: "Easy",
    price: "$$$",
    tags: ["Mountains", "Nature", "Road Trip"],
      image:"https://images.unsplash.com/photo-1612485222394-376d81a3e829?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ja3klMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 28,
    title: "Kilimanjaro Summit Trek",
    duration: "8 days",
    description: "Africa’s highest peak and diverse ecosystems",
    location: "Tanzania",
    difficulty: "Hard",
    price: "$$$$",
    tags: ["Mountains", "Summit", "Adventure"],
      image:"https://images.unsplash.com/photo-1720810828649-f638fe218618?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5uYXB1cm5hJTIwY2lyY3VpdCUyMHRyZWt8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 29,
    title: "Annapurna Circuit Trek",
    duration: "10 days",
    description: "Classic Himalayan trek with varied landscapes",
    location: "Nepal",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "Mountains", "Himalayas"],
      image:""
  },
  {
    id: 30,
    title: "Mount Cook Alpine Adventure",
    duration: "4 days",
    description: "New Zealand’s highest peak and glacier views",
    location: "New Zealand",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Mountains", "Glaciers", "Scenic"],
      image:"https://plus.unsplash.com/premium_photo-1661885413762-341e689bd8a3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnQlMjBjb29rfGVufDB8fDB8fHww"
  },
  {
  id: 31,
  title: "Golden Temple & Amritsar Food Tour",
  duration: "3 days",
  description: "Spiritual experience with iconic Punjabi cuisine",
  location: "Amritsar, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Spiritual", "Food", "Culture"],
      image:"https://images.unsplash.com/photo-1623059508779-2542c6e83753?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwdGVtcGxlfGVufDB8fDB8fHww"
},
{
  id: 32,
  title: "Udaipur Romantic Escape",
  duration: "4 days",
  description: "Lakes, palaces, and sunset boat rides",
  location: "Udaipur, India",
  difficulty: "Easy",
  price: "$$",
  tags: ["Romantic", "History", "Luxury"],
      image:"https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 33,
  title: "Sikkim & Gangtok Explorer",
  duration: "6 days",
  description: "Monasteries, mountain views, and local culture",
  location: "Sikkim, India",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Mountains", "Nature", "Culture"],
      image:"https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lra2ltfGVufDB8fDB8fHww"
},
{
  id: 34,
  title: "Rishikesh Yoga & Adventure",
  duration: "4 days",
  description: "Yoga, river rafting, and Ganga aarti",
  location: "Rishikesh, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Spiritual", "Adventure", "Wellness"],
      image:"https://images.unsplash.com/photo-1714892530388-7d0106430647?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmlzaGlrZXNoJTIweW9nYXxlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 35,
  title: "Ladakh Monastery Trail",
  duration: "7 days",
  description: "High-altitude monasteries and surreal landscapes",
  location: "Ladakh, India",
  difficulty: "Hard",
  price: "$$$",
  tags: ["Mountains", "Culture", "Adventure"],
      image:"https://images.unsplash.com/photo-1593118845043-359e5f628214?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFkYWtofGVufDB8fDB8fHww"
},

/* 🌍 INTERNATIONAL ICONS */
{
  id: 36,
  title: "Iceland Ring Road Adventure",
  duration: "8 days",
  description: "Waterfalls, glaciers, volcanoes, and northern lights",
  location: "Iceland",
  difficulty: "Moderate",
  price: "$$$$",
  tags: ["Nature", "Road Trip", "Adventure"],
      image:"https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlbGFuZHxlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 37,
  title: "Santorini Island Romance",
  duration: "4 days",
  description: "White villages, blue domes, and sunsets",
  location: "Santorini, Greece",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Romantic", "Beach", "Luxury"],
      image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FudG9yaW5pfGVufDB8fDB8fHww"
},
{
  id: 38,
  title: "London & Edinburgh Highlights",
  duration: "6 days",
  description: "Historic cities, castles, and cultural landmarks",
  location: "UK",
  difficulty: "Easy",
  price: "$$$",
  tags: ["City", "History", "Culture"],
      image:"https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWRpbmJ1cmdofGVufDB8fDB8fHww"
},
{
  id: 39,
  title: "South Africa Scenic Safari",
  duration: "7 days",
  description: "Wildlife safaris and coastal scenery",
  location: "South Africa",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Wildlife", "Nature", "Adventure"],
      image:"https://images.unsplash.com/photo-1754729919636-45a449bdc808?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291dGglMjBhZnJpY2ElMjB3aWxkbGlmZXxlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 40,
  title: "Thailand Cultural Circuit",
  duration: "6 days",
  description: "Bangkok, Chiang Mai temples, and night markets",
  location: "Thailand",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "Food", "City"],
      image:"https://images.unsplash.com/photo-1625847897300-00f0163fb756?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGhpbGFuZHxlbnwwfHwwfHx8MA%3D%3D"
},

/* 🏔️ TREKKING & ADVENTURE */
{
  id: 41,
  title: "Triund Weekend Trek",
  duration: "2 days",
  description: "Perfect beginner Himalayan trek",
  location: "Himachal Pradesh, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Trekking", "Mountains", "Weekend"],
      image:"https://images.unsplash.com/photo-1521354719423-661a3204204f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJpdW5kJTIwdHJla3xlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 42,
  title: "Kedarkantha Snow Trek",
  duration: "5 days",
  description: "Winter trek with snow-covered trails",
  location: "Uttarakhand, India",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Snow Trek", "Mountains", "Adventure"],
      image:"https://images.unsplash.com/photo-1656501097897-7dcec86f61eb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VkYXJuYXRoJTIwdHJla3xlbnwwfHwwfHx8MA%3D%3D"
},
{
  id: 43,
  title: "Torres del Paine Trek",
  duration: "8 days",
  description: "One of the world’s most scenic treks",
  location: "Chile",
  difficulty: "Hard",
  price: "$$$$",
  tags: ["Trekking", "Nature", "Mountains"],
      image:"https://images.unsplash.com/photo-1558517286-6b7b81953cb5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9ycmVzJTIwZGVsJTIwcGFpbmV8ZW58MHx8MHx8fDA%3D"
},
{
  id: 44,
  title: "Mount Elbrus Summit",
  duration: "9 days",
  description: "Europe’s highest peak climbing experience",
  location: "Russia",
  difficulty: "Hard",
  price: "$$$$",
  tags: ["Summit", "Mountains", "Extreme"],
      image:"https://images.unsplash.com/photo-1627414363144-8982a29a0922?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBlbGJydXN8ZW58MHx8MHx8fDA%3D"
},

/* 🏖️ BEACH & RELAX */
{
  id: 45,
  title: "Pondicherry French Escape",
  duration: "3 days",
  description: "Colonial streets, cafés, and beaches",
  location: "Pondicherry, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Beach", "Culture", "Relaxation"],
      image:"https://images.unsplash.com/photo-1597073642928-48c0971f7ded?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9uZGljaGVycnl8ZW58MHx8MHx8fDA%3D"
},
{
  id: 46,
  title: "Phuket Beach & Islands",
  duration: "5 days",
  description: "Island hopping and beach resorts",
  location: "Phuket, Thailand",
  difficulty: "Easy",
  price: "$$",
  tags: ["Beach", "Islands", "Relaxation"],
      image:"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGh1a2V0fGVufDB8fDB8fHww"
},
{
  id: 47,
  title: "Hawaii Island Hopping",
  duration: "7 days",
  description: "Volcanoes, beaches, and tropical vibes",
  location: "Hawaii, USA",
  difficulty: "Easy",
  price: "$$$$",
  tags: ["Beach", "Nature", "Luxury"],
      image:"https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGF3YWlpfGVufDB8fDB8fHww"
},

/* 🌍 GLOBAL EXPANSION */

{
  id: 48,
  title: "Dubai Luxury Escape",
  duration: "4 days",
  description: "Skyscrapers, desert safari, and luxury shopping",
  location: "Dubai, UAE",
  difficulty: "Easy",
  price: "$$$$",
  tags: ["Luxury", "City", "Desert"],
  image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a"
},
{
  id: 49,
  title: "Petra & Wadi Rum Adventure",
  duration: "5 days",
  description: "Ancient wonders and desert landscapes",
  location: "Jordan",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["History", "Desert", "Adventure"],
  image: "https://images.unsplash.com/photo-1548786817-0f6c7a94a83b"
},
{
  id: 50,
  title: "Marrakech & Atlas Mountains",
  duration: "6 days",
  description: "Souks, riads, and mountain villages",
  location: "Morocco",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Culture", "Mountains", "History"],
  image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e"
},
{
  id: 51,
  title: "Egypt Nile Cruise",
  duration: "7 days",
  description: "Pyramids, temples, and a luxury Nile cruise",
  location: "Egypt",
  difficulty: "Easy",
  price: "$$$",
  tags: ["History", "Culture", "River Cruise"],
  image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020"
},
{
  id: 52,
  title: "Istanbul Cultural Gateway",
  duration: "4 days",
  description: "Mosques, bazaars, and Bosphorus cruise",
  location: "Turkey",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "City", "History"],
  image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200"
},
{
  id: 53,
  title: "Bora Bora Paradise Retreat",
  duration: "5 days",
  description: "Overwater villas and turquoise lagoons",
  location: "French Polynesia",
  difficulty: "Easy",
  price: "$$$$",
  tags: ["Beach", "Luxury", "Islands"],
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
},
{
  id: 54,
  title: "Alaska Wilderness Expedition",
  duration: "8 days",
  description: "Glaciers, wildlife, and remote landscapes",
  location: "Alaska, USA",
  difficulty: "Hard",
  price: "$$$$",
  tags: ["Nature", "Wildlife", "Adventure"],
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  id: 55,
  title: "Amazon Rainforest Discovery",
  duration: "6 days",
  description: "Jungle lodges and wildlife encounters",
  location: "Brazil",
  difficulty: "Hard",
  price: "$$$",
  tags: ["Nature", "Wildlife", "Adventure"],
  image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
},
{
  id: 56,
  title: "Buenos Aires Tango Trail",
  duration: "4 days",
  description: "Tango, architecture, and food culture",
  location: "Argentina",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "Food", "City"],
  image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443"
},
{
  id: 57,
  title: "Galápagos Wildlife Cruise",
  duration: "7 days",
  description: "Unique wildlife and pristine islands",
  location: "Ecuador",
  difficulty: "Moderate",
  price: "$$$$",
  tags: ["Wildlife", "Nature", "Islands"],
  image: "https://images.unsplash.com/photo-1586361139974-00c3a6bce0c7"
},
{
  id: 58,
  title: "Transylvania Castle Route",
  duration: "5 days",
  description: "Medieval towns and Dracula legends",
  location: "Romania",
  difficulty: "Easy",
  price: "$$",
  tags: ["History", "Culture", "Road Trip"],
  image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab"
},
{
  id: 59,
  title: "Norwegian Fjords Scenic Drive",
  duration: "7 days",
  description: "Waterfalls, fjords, and epic viewpoints",
  location: "Norway",
  difficulty: "Moderate",
  price: "$$$$",
  tags: ["Scenic", "Nature", "Road Trip"],
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
},
{
  id: 60,
  title: "Sri Lanka Cultural Loop",
  duration: "6 days",
  description: "Temples, tea gardens, and beaches",
  location: "Sri Lanka",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "Nature", "Food"],
  image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4"
},
{
  id: 61,
  title: "Seoul & Busan Highlights",
  duration: "5 days",
  description: "K-pop culture, street food, and temples",
  location: "South Korea",
  difficulty: "Easy",
  price: "$$$",
  tags: ["City", "Culture", "Food"],
  image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c"
},
{
  id: 62,
  title: "Cape Town Coastal Adventure",
  duration: "6 days",
  description: "Table Mountain, penguins, and scenic drives",
  location: "South Africa",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Nature", "Road Trip", "Wildlife"],
  image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
},
{
  id: 63,
  title: "Bhutan Happiness Trail",
  duration: "5 days",
  description: "Monasteries, mountains, and mindfulness",
  location: "Bhutan",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Spiritual", "Culture", "Mountains"],
  image: "https://images.unsplash.com/photo-1600267185393-e158a98703de"
},
{
  id: 64,
  title: "Uzbekistan Silk Road",
  duration: "7 days",
  description: "Ancient cities and Islamic architecture",
  location: "Uzbekistan",
  difficulty: "Moderate",
  price: "$$",
  tags: ["History", "Culture", "Architecture"],
  image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
},
{
  id: 65,
  title: "Faroe Islands Explorer",
  duration: "6 days",
  description: "Cliffs, waterfalls, and remote beauty",
  location: "Faroe Islands",
  difficulty: "Moderate",
  price: "$$$$",
  tags: ["Nature", "Scenic", "Offbeat"],
  image: "https://images.unsplash.com/photo-1500534314209-a26db0f5bb60"
},
{
  id: 66,
  title: "Antarctica Expedition Cruise",
  duration: "12 days",
  description: "Icebergs, penguins, and polar landscapes",
  location: "Antarctica",
  difficulty: "Hard",
  price: "$$$$$",
  tags: ["Extreme", "Wildlife", "Expedition"],
  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
},
{
  id: 67,
  title: "Mexico Yucatán Circuit",
  duration: "6 days",
  description: "Cenotes, Mayan ruins, and beaches",
  location: "Mexico",
  difficulty: "Easy",
  price: "$$",
  tags: ["History", "Beach", "Culture"],
  image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def"
},
{
  id: 68,
  title: "Vienna Classical Music Trail",
  duration: "4 days",
  description: "Opera houses, palaces, and classical concerts",
  location: "Vienna, Austria",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Culture", "Music", "History"],
  image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443"
},
{
  id: 69,
  title: "Prague Fairytale Walk",
  duration: "3 days",
  description: "Medieval streets, castles, and river views",
  location: "Prague, Czech Republic",
  difficulty: "Easy",
  price: "$$",
  tags: ["History", "Romantic", "City"],
  image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
},
{
  id: 70,
  title: "Budapest Thermal Spa Escape",
  duration: "4 days",
  description: "Thermal baths, nightlife, and architecture",
  location: "Budapest, Hungary",
  difficulty: "Easy",
  price: "$$",
  tags: ["Relaxation", "Culture", "City"],
  image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2"
},
{
  id: 71,
  title: "Scotland Highlands Road Trip",
  duration: "7 days",
  description: "Castles, lochs, and dramatic landscapes",
  location: "Scotland, UK",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Road Trip", "Nature", "History"],
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  id: 72,
  title: "Cinque Terre Coastal Hike",
  duration: "4 days",
  description: "Colorful villages and cliffside trails",
  location: "Italy",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Hiking", "Scenic", "Coastal"],
  image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9"
},
{
  id: 73,
  title: "Croatian Island Hop",
  duration: "6 days",
  description: "Blue waters, historic towns, and beaches",
  location: "Croatia",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Islands", "Beach", "Culture"],
  image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
},
{
  id: 74,
  title: "Montenegro Hidden Gems",
  duration: "5 days",
  description: "Bay of Kotor and mountain villages",
  location: "Montenegro",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Nature", "Road Trip", "Offbeat"],
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
},
{
  id: 75,
  title: "Balkan Capitals Explorer",
  duration: "8 days",
  description: "Belgrade, Sarajevo, and Skopje",
  location: "Serbia – Bosnia – North Macedonia",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Culture", "History", "City"],
  image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
},
{
  id: 76,
  title: "Lapland Northern Lights",
  duration: "5 days",
  description: "Aurora hunting and Arctic adventures",
  location: "Lapland, Finland",
  difficulty: "Moderate",
  price: "$$$$",
  tags: ["Aurora", "Snow", "Nature"],
  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
},
{
  id: 77,
  title: "Baltic Capitals Tour",
  duration: "6 days",
  description: "Tallinn, Riga, and Vilnius old towns",
  location: "Estonia – Latvia – Lithuania",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "History", "City"],
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
},
{
  id: 78,
  title: "Georgia Wine & Mountains",
  duration: "5 days",
  description: "Ancient wine culture and Caucasus views",
  location: "Georgia",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Wine", "Mountains", "Culture"],
  image: "https://images.unsplash.com/photo-1558980664-10e7170a7f49"
},
{
  id: 79,
  title: "Armenia Cultural Trail",
  duration: "4 days",
  description: "Monasteries, history, and landscapes",
  location: "Armenia",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "History", "Mountains"],
  image: "https://images.unsplash.com/photo-1585503418537-88331351ad99"
},
{
  id: 80,
  title: "Kazakhstan Steppe & Canyons",
  duration: "6 days",
  description: "Vast steppes and Charyn Canyon",
  location: "Kazakhstan",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Nature", "Adventure", "Offbeat"],
  image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852"
},
{
  id: 81,
  title: "Mongolia Nomad Experience",
  duration: "7 days",
  description: "Ger camps and wide-open landscapes",
  location: "Mongolia",
  difficulty: "Hard",
  price: "$$$",
  tags: ["Nomadic", "Adventure", "Nature"],
  image: "https://images.unsplash.com/photo-1549366021-9f761d040a94"
},
{
  id: 82,
  title: "Cambodia Angkor Discovery",
  duration: "4 days",
  description: "Ancient temples and Khmer heritage",
  location: "Cambodia",
  difficulty: "Easy",
  price: "$",
  tags: ["History", "Culture", "Architecture"],
  image: "https://images.unsplash.com/photo-1528181304800-259b08848526"
},
{
  id: 83,
  title: "Laos Slow Travel Escape",
  duration: "5 days",
  description: "Waterfalls, monks, and river life",
  location: "Laos",
  difficulty: "Easy",
  price: "$",
  tags: ["Relaxation", "Culture", "Nature"],
  image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
},
{
  id: 84,
  title: "Philippines Island Explorer",
  duration: "7 days",
  description: "Palawan lagoons and island beaches",
  location: "Philippines",
  difficulty: "Easy",
  price: "$$",
  tags: ["Beach", "Islands", "Adventure"],
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
},
{
  id: 85,
  title: "Taiwan Food & Nature Loop",
  duration: "5 days",
  description: "Night markets and scenic landscapes",
  location: "Taiwan",
  difficulty: "Easy",
  price: "$$",
  tags: ["Food", "Nature", "City"],
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  id: 86,
  title: "Namibia Desert Safari",
  duration: "6 days",
  description: "Sand dunes, safaris, and night skies",
  location: "Namibia",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Desert", "Wildlife", "Photography"],
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
},
{
  id: 87,
  title: "Zanzibar Spice Island",
  duration: "4 days",
  description: "White beaches and Swahili culture",
  location: "Zanzibar, Tanzania",
  difficulty: "Easy",
  price: "$$",
  tags: ["Beach", "Culture", "Relaxation"],
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
},
{
  id: 88,
  title: "Perth & Western Australia Coast",
  duration: "6 days",
  description: "Beaches, quokkas, and coastal drives",
  location: "Western Australia",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Beach", "Road Trip", "Nature"],
  image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
},
{
  id: 89,
  title: "Tasmania Wilderness Escape",
  duration: "7 days",
  description: "National parks and rugged coastlines",
  location: "Tasmania, Australia",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Nature", "Adventure", "Scenic"],
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  id: 90,
  title: "Quebec Winter Wonderland",
  duration: "4 days",
  description: "Snow festivals and European charm",
  location: "Quebec City, Canada",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Snow", "City", "Culture"],
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
},
{
  id: 91,
  title: "Panama Canal & Rainforest",
  duration: "5 days",
  description: "Engineering marvel and biodiversity",
  location: "Panama",
  difficulty: "Easy",
  price: "$$",
  tags: ["Nature", "History", "Wildlife"],
  image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
},
{
  id: 92,
  title: "Costa Rica Eco Adventure",
  duration: "6 days",
  description: "Rainforests, volcanoes, and zip-lining",
  location: "Costa Rica",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Eco Travel", "Adventure", "Wildlife"],
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
}




  ]);

  const [savedItineraries, setSavedItineraries] = useState([]);
  const [savedCount, setSavedCount] = useState(0);

  // Load saved itineraries
  useEffect(() => {
    const loadSavedItineraries = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('savedItineraries')) || [];
        setSavedItineraries(saved);
        setSavedCount(saved.length);
      } catch (error) {
        console.error('Error loading saved itineraries:', error);
      }
    };
    
    loadSavedItineraries();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadSavedItineraries();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to handle itinerary click
  const handleItineraryClick = (itinerary) => {
    if (onItineraryClick) {
      onItineraryClick(itinerary.id);
    }
  };

  // Toggle save itinerary
  const toggleSaveItinerary = (itinerary, e) => {
    e.stopPropagation(); // Prevent card click
    
    let updatedSaved;
    const isAlreadySaved = savedItineraries.some(item => item.id === itinerary.id);
    
    if (isAlreadySaved) {
      // Remove from saved
      updatedSaved = savedItineraries.filter(item => item.id !== itinerary.id);
    } else {
      // Add to saved
      updatedSaved = [...savedItineraries, { 
        ...itinerary, 
        savedAt: new Date().toISOString(),
        userNotes: '' 
      }];
    }
    
    setSavedItineraries(updatedSaved);
    setSavedCount(updatedSaved.length);
    localStorage.setItem('savedItineraries', JSON.stringify(updatedSaved));
    
    // Optional: Show a quick notification
    const saveBtn = e.target;
    const originalText = saveBtn.textContent;
    saveBtn.textContent = isAlreadySaved ? '☆ Save' : '⭐ Saved';
    setTimeout(() => {
      saveBtn.textContent = originalText;
    }, 1000);
  };

  // Check if itinerary is saved
  const isItinerarySaved = (id) => {
    return savedItineraries.some(item => item.id === id);
  };

const ITEMS_PER_PAGE = 9; // 3x3 grid
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(popularItineraries.length / ITEMS_PER_PAGE);

const paginatedItineraries = popularItineraries.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


 return (
    <section className="bg-[#f6f8f5] px-4 pt-24 pb-24 overflow-hidden">
      {/* <span className="absolute top-20 right-20 text-6xl opacity-30 rotate-12 z-0">
    ✈️
  </span> */}

      {/* <div className="absolute bottom-32 right-16 w-56 h-56
                bg-[#5b7c67]/80 rounded-full blur-3xl" /> */}
      <div className=" relative x-10 max-w-5xl mx-auto space-y-10">

        {/* ===== HEADER BAR ===== */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-medium text-black hover:underline"
          >
            ← Back to Home
          </button>

          {savedCount > 0 && onViewSaved && (
            <button
              onClick={onViewSaved}
              className="rounded-full bg-[#5b7c67] px-4 py-2
                         text-white text-sm font-medium"
            >
              ⭐ View Saved ({savedCount})
            </button>
          )}
        </div>

        {/* ===== HERO CARD ===== */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Popular Travel Itineraries
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Click any itinerary to view full details
            {savedCount > 0 &&
              ` · You have ${savedCount} saved ${savedCount === 1 ? "itinerary" : "itineraries"}`}
          </p>
        </div>

        {/* ===== ITINERARY LIST ===== */}
       {/* ===== ITINERARY GRID ===== */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {paginatedItineraries.map((itinerary) => (
    <div
      key={itinerary.id}
      onClick={() => handleItineraryClick(itinerary)}
      className="bg-white rounded-2xl overflow-hidden shadow-md
                 hover:shadow-xl transition cursor-pointer"
    >
      {/* IMAGE PLACEHOLDER (add image later) */}
      <img
        src={itinerary.image}
        alt={itinerary.title}
        className="h-40 w-full object-cover"
      />


      {/* CARD CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {itinerary.title} – {itinerary.duration}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          📍 {itinerary.location}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">
          {itinerary.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1 pt-2">
          {itinerary.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-full
                         bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>

{/* ===== PAGINATION (PASTE HERE) ===== */}
<div className="flex justify-center items-center gap-2 mt-10">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
    className={`px-4 py-2 rounded-full text-sm border
      ${currentPage === 1
        ? "opacity-40 cursor-not-allowed"
        : "hover:bg-gray-100"
      }`}
  >
    ← Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`w-9 h-9 rounded-full text-sm font-medium
        ${currentPage === i + 1
          ? "bg-[#5b7c67] text-white"
          : "border hover:bg-gray-100"
        }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(p => p + 1)}
    className={`px-4 py-2 rounded-full text-sm border
      ${currentPage === totalPages
        ? "opacity-40 cursor-not-allowed"
        : "hover:bg-gray-100"
      }`}
  >
    Next →
  </button>
</div>


        {/* ===== INSTRUCTIONS ===== */}
        <div className="bg-[#fafafa] rounded-[32px] p-6 md:p-8 shadow-lg text-sm text-gray-600 space-y-3">
          <p>
            💡 <strong>How to use:</strong> Click any itinerary above to view
            day-by-day plans, activities, and travel tips.
          </p>

          <p>
            ⭐ <strong>Save feature:</strong> Save itineraries to access them
            later quickly.
          </p>

          {savedCount > 0 && onViewSaved && (
            <button
              onClick={onViewSaved}
              className="mt-4 rounded-full border px-6 py-3
                         text-sm font-medium hover:bg-gray-50"
            >
              ⭐ View All Saved Itineraries ({savedCount})
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default ItineraryPage;