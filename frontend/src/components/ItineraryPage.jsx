import React, { useState, useEffect } from 'react';
import '../styles/ItineraryPage.css';

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
      tags: ['Beach', 'Culture', 'Adventure']
    },
    {
      id: 2,
      title: 'European Capitals',
      duration: '10 days',
      description: 'Visit Paris, Rome, and Amsterdam in one unforgettable trip',
      location: 'Europe',
      difficulty: 'Easy',
      price: '$$$',
      tags: ['City', 'Culture', 'History']
    },
    {
      id: 3,
      title: 'Japanese Culture',
      duration: '14 days',
      description: 'Traditional temples, modern cities, and authentic cuisine',
      location: 'Japan',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Culture', 'Food', 'History']
    },
    {
      id: 4,
      title: 'Australian Road Trip',
      duration: '12 days',
      description: 'Coastal drives from Sydney to Melbourne with wildlife encounters',
      location: 'Australia',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Nature', 'Road Trip', 'Beach']
    },
    {
      id: 5,
      title: 'Peru Discovery',
      duration: '9 days',
      description: 'Machu Picchu, Sacred Valley, and Peruvian cuisine',
      location: 'Peru',
      difficulty: 'Challenging',
      price: '$$',
      tags: ['Adventure', 'History', 'Mountains']
    },
    {
      id: 6,
      title: 'Thai Islands',
      duration: '8 days',
      description: 'Island hopping in Southern Thailand paradise',
      location: 'Thailand',
      difficulty: 'Easy',
      price: '$',
      tags: ['Beach', 'Island', 'Relaxation']
    },
    {
      id: 7,
      title: 'Safari Experience',
      duration: '6 days',
      description: 'Wildlife safari in the heart of Africa',
      location: 'Kenya',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['Wildlife', 'Adventure', 'Nature']
    },
    {
      id: 8,
      title: 'California Coast',
      duration: '10 days',
      description: 'Highway 1 road trip from San Francisco to Los Angeles',
      location: 'USA',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Road Trip', 'Beach', 'Nature']
    },
    {
      id: 9,
      title: 'Delhi Heritage Tour',
      duration: '3 days',
      description: 'Explore the rich history and culture of Delhi',
      location: 'Delhi, India',
      difficulty: 'Easy',
      price: '$',
      tags: ['History', 'Culture', 'Food']
    },
    {
      id: 10,
      title: 'Goa Beach Holiday',
      duration: '5 days',
      description: 'Relax on beautiful beaches and enjoy seafood',
      location: 'Goa, India',
      difficulty: 'Easy',
      price: '$$',
      tags: ['Beach', 'Relaxation', 'Food']
    },
    {
      id: 11,
      title: 'Kashmir Valley',
      duration: '6 days',
      description: 'Houseboats, gardens, and mountain views',
      location: 'Kashmir, India',
      difficulty: 'Moderate',
      price: '$$',
      tags: ['Mountains', 'Nature', 'Culture']
    },
    {
      id: 12,
      title: 'Rajasthan Royal Tour',
      duration: '8 days',
      description: 'Palaces, forts, and desert safari',
      location: 'Rajasthan, India',
      difficulty: 'Moderate',
      price: '$$$',
      tags: ['History', 'Culture', 'Desert']
    },
    {
    id: 13,
    title: "Kerala Backwater Escape",
    duration: "5 days",
    description: "Houseboats, coconut lagoons, and serene villages",
    location: "Kerala, India",
    difficulty: "Easy",
    price: "$$",
    tags: ["Nature", "Relaxation", "Backwaters"]
  },
  {
    id: 14,
    title: "Himachal Adventure Trail",
    duration: "6 days",
    description: "Mountains, rivers, and thrilling outdoor activities",
    location: "Himachal Pradesh, India",
    difficulty: "Hard",
    price: "$$",
    tags: ["Adventure", "Mountains", "Trekking"]
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
  },
  {
    id: 16,
    title: "Goa Beach Break",
    duration: "3 days",
    description: "Sun, sand, nightlife, and Portuguese heritage",
    location: "Goa, India",
    difficulty: "Easy",
    price: "$$",
    tags: ["Beach", "Nightlife", "Relaxation"]
  },
  {
    id: 17,
    title: "North East Explorer",
    duration: "7 days",
    description: "Waterfalls, hills, and unique tribal culture",
    location: "Meghalaya & Assam, India",
    difficulty: "Moderate",
    price: "$$",
    tags: ["Nature", "Culture", "Offbeat"]
  },
  {
    id: 18,
    title: "Spiritual Varanasi Retreat",
    duration: "3 days",
    description: "Ghats, Ganga aarti, and ancient temples",
    location: "Varanasi, India",
    difficulty: "Easy",
    price: "$",
    tags: ["Spiritual", "Culture", "Heritage"]
  },
  {
    id: 19,
    title: "Kashmir Paradise Tour",
    duration: "6 days",
    description: "Lakes, gardens, snow peaks, and scenic valleys",
    location: "Kashmir, India",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Nature", "Mountains", "Scenic"]
  },
  {
    id: 20,
    title: "Andaman Island Getaway",
    duration: "5 days",
    description: "Crystal clear beaches and water sports",
    location: "Andaman & Nicobar Islands, India",
    difficulty: "Easy",
    price: "$$$",
    tags: ["Beach", "Adventure", "Islands"]
  },
  {
    id: 21,
    title: "Swiss Alps Scenic Escape",
    duration: "6 days",
    description: "Snow-capped peaks, alpine villages, and scenic train rides",
    location: "Switzerland",
    difficulty: "Moderate",
    price: "$$$$",
    tags: ["Mountains", "Scenic", "Luxury"]
  },
  {
    id: 22,
    title: "Everest Base Camp Trek",
    duration: "12 days",
    description: "World-famous trek to the base of Mount Everest",
    location: "Nepal",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "Mountains", "Adventure"]
  },
  {
    id: 23,
    title: "Inca Trail to Machu Picchu",
    duration: "7 days",
    description: "Ancient trails, ruins, and breathtaking Andes views",
    location: "Peru",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "History", "Mountains"]
  },
  {
    id: 24,
    title: "Patagonia Wilderness Trek",
    duration: "9 days",
    description: "Glaciers, dramatic peaks, and untouched wilderness",
    location: "Patagonia, Chile & Argentina",
    difficulty: "Hard",
    price: "$$$$",
    tags: ["Mountains", "Nature", "Adventure"]
  },
  {
    id: 25,
    title: "Mount Fuji Climb",
    duration: "3 days",
    description: "Iconic volcanic peak and cultural experience",
    location: "Japan",
    difficulty: "Moderate",
    price: "$$",
    tags: ["Mountains", "Trekking", "Culture"]
  },
  {
    id: 26,
    title: "Dolomites Hiking Tour",
    duration: "6 days",
    description: "Dramatic limestone peaks and alpine meadows",
    location: "Italy",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Mountains", "Hiking", "Scenic"]
  },
  {
    id: 27,
    title: "Rocky Mountains Road & Hike",
    duration: "5 days",
    description: "National parks, alpine lakes, and wildlife",
    location: "Colorado, USA",
    difficulty: "Easy",
    price: "$$$",
    tags: ["Mountains", "Nature", "Road Trip"]
  },
  {
    id: 28,
    title: "Kilimanjaro Summit Trek",
    duration: "8 days",
    description: "Africa’s highest peak and diverse ecosystems",
    location: "Tanzania",
    difficulty: "Hard",
    price: "$$$$",
    tags: ["Mountains", "Summit", "Adventure"]
  },
  {
    id: 29,
    title: "Annapurna Circuit Trek",
    duration: "10 days",
    description: "Classic Himalayan trek with varied landscapes",
    location: "Nepal",
    difficulty: "Hard",
    price: "$$$",
    tags: ["Trekking", "Mountains", "Himalayas"]
  },
  {
    id: 30,
    title: "Mount Cook Alpine Adventure",
    duration: "4 days",
    description: "New Zealand’s highest peak and glacier views",
    location: "New Zealand",
    difficulty: "Moderate",
    price: "$$$",
    tags: ["Mountains", "Glaciers", "Scenic"]
  },
  {
  id: 31,
  title: "Golden Temple & Amritsar Food Tour",
  duration: "3 days",
  description: "Spiritual experience with iconic Punjabi cuisine",
  location: "Amritsar, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Spiritual", "Food", "Culture"]
},
{
  id: 32,
  title: "Udaipur Romantic Escape",
  duration: "4 days",
  description: "Lakes, palaces, and sunset boat rides",
  location: "Udaipur, India",
  difficulty: "Easy",
  price: "$$",
  tags: ["Romantic", "History", "Luxury"]
},
{
  id: 33,
  title: "Sikkim & Gangtok Explorer",
  duration: "6 days",
  description: "Monasteries, mountain views, and local culture",
  location: "Sikkim, India",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Mountains", "Nature", "Culture"]
},
{
  id: 34,
  title: "Rishikesh Yoga & Adventure",
  duration: "4 days",
  description: "Yoga, river rafting, and Ganga aarti",
  location: "Rishikesh, India",
  difficulty: "Easy",
  price: "$",
  tags: ["Spiritual", "Adventure", "Wellness"]
},
{
  id: 35,
  title: "Ladakh Monastery Trail",
  duration: "7 days",
  description: "High-altitude monasteries and surreal landscapes",
  location: "Ladakh, India",
  difficulty: "Hard",
  price: "$$$",
  tags: ["Mountains", "Culture", "Adventure"]
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
  tags: ["Nature", "Road Trip", "Adventure"]
},
{
  id: 37,
  title: "Santorini Island Romance",
  duration: "4 days",
  description: "White villages, blue domes, and sunsets",
  location: "Santorini, Greece",
  difficulty: "Easy",
  price: "$$$",
  tags: ["Romantic", "Beach", "Luxury"]
},
{
  id: 38,
  title: "London & Edinburgh Highlights",
  duration: "6 days",
  description: "Historic cities, castles, and cultural landmarks",
  location: "UK",
  difficulty: "Easy",
  price: "$$$",
  tags: ["City", "History", "Culture"]
},
{
  id: 39,
  title: "South Africa Scenic Safari",
  duration: "7 days",
  description: "Wildlife safaris and coastal scenery",
  location: "South Africa",
  difficulty: "Moderate",
  price: "$$$",
  tags: ["Wildlife", "Nature", "Adventure"]
},
{
  id: 40,
  title: "Thailand Cultural Circuit",
  duration: "6 days",
  description: "Bangkok, Chiang Mai temples, and night markets",
  location: "Thailand",
  difficulty: "Easy",
  price: "$$",
  tags: ["Culture", "Food", "City"]
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
  tags: ["Trekking", "Mountains", "Weekend"]
},
{
  id: 42,
  title: "Kedarkantha Snow Trek",
  duration: "5 days",
  description: "Winter trek with snow-covered trails",
  location: "Uttarakhand, India",
  difficulty: "Moderate",
  price: "$$",
  tags: ["Snow Trek", "Mountains", "Adventure"]
},
{
  id: 43,
  title: "Torres del Paine Trek",
  duration: "8 days",
  description: "One of the world’s most scenic treks",
  location: "Chile",
  difficulty: "Hard",
  price: "$$$$",
  tags: ["Trekking", "Nature", "Mountains"]
},
{
  id: 44,
  title: "Mount Elbrus Summit",
  duration: "9 days",
  description: "Europe’s highest peak climbing experience",
  location: "Russia",
  difficulty: "Hard",
  price: "$$$$",
  tags: ["Summit", "Mountains", "Extreme"]
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
  tags: ["Beach", "Culture", "Relaxation"]
},
{
  id: 46,
  title: "Phuket Beach & Islands",
  duration: "5 days",
  description: "Island hopping and beach resorts",
  location: "Phuket, Thailand",
  difficulty: "Easy",
  price: "$$",
  tags: ["Beach", "Islands", "Relaxation"]
},
{
  id: 47,
  title: "Hawaii Island Hopping",
  duration: "7 days",
  description: "Volcanoes, beaches, and tropical vibes",
  location: "Hawaii, USA",
  difficulty: "Easy",
  price: "$$$$",
  tags: ["Beach", "Nature", "Luxury"]
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

  return (
    <div className="itinerary-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        
        {savedCount > 0 && onViewSaved && (
          <button 
            className="view-saved-btn"
            onClick={onViewSaved}
          >
            ⭐ View Saved ({savedCount})
          </button>
        )}
      </div>
      
      <div className="hero-section">
        <h1 className="page-title">Popular Travel Itineraries</h1>
        <p className="page-subtitle">
          Click on any itinerary to view detailed trip information. 
          {savedCount > 0 && ` You have ${savedCount} saved ${savedCount === 1 ? 'itinerary' : 'itineraries'}.`}
        </p>
      </div>

   <div className="simple-itinerary-list">
  {popularItineraries.map((itinerary) => (
    <div
      key={itinerary.id}
      className="simple-itinerary-row"
      onClick={() => handleItineraryClick(itinerary)}
    >
      <div className="row-title">
        <span className='row-id'>{itinerary.id}. </span>{itinerary.title}
        </div>

      <div className="row-meta">
        <span>{itinerary.duration}</span>
        <span>•</span>
        <span>{itinerary.location}</span>
        <span>•</span>
        <span>{itinerary.difficulty}</span>
      </div>

      <div className="row-description">
        {itinerary.description}
      </div>
    </div>
  ))}
</div>



      
      <div className="instructions">
        <p>💡 <strong>How to use:</strong> Click on any itinerary button above to see detailed trip information including day-by-day plans, activities, accommodations, and travel tips.</p>
        <p>⭐ <strong>Save feature:</strong> Click the "Save" button on any itinerary to add it to your saved collection for easy access later.</p>
        {savedCount > 0 && onViewSaved && (
          <button 
            className="view-saved-bottom-btn"
            onClick={onViewSaved}
          >
            ⭐ View All Saved Itineraries ({savedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;