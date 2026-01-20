import API_BASE_URL from "./apiClient";

/* ================= HELPERS ================= */

const getToken = () =>
  sessionStorage.getItem("token") ||
  localStorage.getItem("token");

const throwApiError = async (response) => {
  let message = "Something went wrong";

  try {
    const data = await response.json();
    message = data?.message || message;
  } catch {
    // ignore JSON parse errors
  }

  throw new Error(message); // ✅ always throw Error
};

/* =====================================================
   AI APIs
   ===================================================== */

export const generateTravelItinerary = async (description, detailLevel) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/ai/itinerary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, detailLevel }),
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
};

/* =====================================================
   ITINERARY APIs
   ===================================================== */

export const fetchAllItineraries = async () => {
  const response = await fetch(`${API_BASE_URL}/api/itineraries`);

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
};

export const fetchItineraryBySlug = async (slug) => {
  const response = await fetch(
    `${API_BASE_URL}/api/itineraries/${slug}`
  );

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
};

export const fetchItineraryByMongoId = async (mongoId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/itineraries/mongo/${mongoId}`
  );

  if (!response.ok) {
    await throwApiError(response);
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
    await throwApiError(response);
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
    await throwApiError(response);
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
    await throwApiError(response);
  }

  return response.json();
};

/* =====================================================
   QUIZ APIs
   ===================================================== */

export const fetchQuiz = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/quiz`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
};

export const submitQuiz = async (data) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await throwApiError(response);
  }

  return response.json();
};
