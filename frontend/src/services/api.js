/* =====================================================
   BASE SETUP
   ===================================================== */

// proxy already set in package.json
// "proxy": "http://localhost:5001"

/* =====================================================
   AI APIs
   ===================================================== */

export const generateTravelItinerary = async (description, detailLevel) => {
  const response = await fetch("/api/ai/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, detailLevel }),
  });

  if (!response.ok) {
    throw new Error("AI itinerary generation failed");
  }

  return response.json();
};

/* =====================================================
   ITINERARY APIs (STATIC + DB HYBRID)
   ===================================================== */

/**
 * Fetch ALL itineraries from DB
 */
export const fetchAllItineraries = async () => {
  const response = await fetch("/api/itineraries");

  if (!response.ok) {
    throw new Error("Failed to fetch itineraries");
  }

  return response.json();
};

/**
 * Fetch itinerary by legacyId
 * 🔥 THIS IS WHAT YOUR UI NEEDS
 */
export const fetchItineraryByLegacyId = async (legacyId) => {
  const response = await fetch(`/api/itineraries/legacy/${legacyId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch itinerary");
  }

  return response.json();
};

/**
 * Fetch itinerary by MongoDB _id
 * (optional / admin)
 */
export const fetchItineraryByMongoId = async (mongoId) => {
  const response = await fetch(`/api/itineraries/mongo/${mongoId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch itinerary");
  }

  return response.json();
};

/**
 * Save itinerary to DB
 */
export const saveItineraryToDB = async (itineraryData) => {
  const response = await fetch("/api/itineraries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itineraryData),
  });

  if (!response.ok) {
    throw new Error("Failed to save itinerary");
  }

  return response.json();
};

/* =====================================================
   AUTH APIs
   ===================================================== */

export const loginUser = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};
