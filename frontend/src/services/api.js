/* =====================================================
   BASE SETUP
   ===================================================== */

// proxy already set in package.json
// "proxy": "http://localhost:5001"

/* =====================================================
   AI APIs
   ===================================================== */

export const generateTravelItinerary = async (description, detailLevel) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token"); // JWT

  const response = await fetch("/api/ai/itinerary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, detailLevel }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw err; // pass backend error to frontend
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
export const fetchItineraryBySlug = async (slug) => {
  const res = await fetch(
    `http://localhost:5001/api/itineraries/${slug}`
  );

  if (!res.ok) {
    throw new Error("Itinerary not found");
  }

  return res.json();
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

/* =====================================================
   QUIZ APIs
===================================================== */

export const fetchQuiz = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/quiz", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
};

export const submitQuiz = async (answers) => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/quiz/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
};

