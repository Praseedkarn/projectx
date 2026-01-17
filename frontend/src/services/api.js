import API_BASE_URL from "./apiClient";

/* =====================================================
   AI APIs
   ===================================================== */

export const generateTravelItinerary = async (description, detailLevel) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/ai/itinerary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, detailLevel }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  return response.json();
};

/* =====================================================
   ITINERARY APIs
   ===================================================== */

export const fetchAllItineraries = async () => {
  const response = await fetch(`${API_BASE_URL}/api/itineraries`);

  if (!response.ok) {
    throw new Error("Failed to fetch itineraries");
  }

  return response.json();
};

export const fetchItineraryBySlug = async (slug) => {
  const res = await fetch(
    `${API_BASE_URL}/api/itineraries/${slug}`
  );

  if (!res.ok) {
    throw new Error("Itinerary not found");
  }

  return res.json();
};

export const fetchItineraryByMongoId = async (mongoId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/itineraries/mongo/${mongoId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch itinerary");
  }

  return response.json();
};

export const saveItineraryToDB = async (itineraryData) => {
  const response = await fetch(`${API_BASE_URL}/api/itineraries`, {
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
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/api/quiz`, {
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

export const submitQuiz = async (data) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
};
