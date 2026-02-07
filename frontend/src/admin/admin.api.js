const API_URL = process.env.REACT_APP_API_URL;


/* 🔑 SINGLE SOURCE OF TRUTH */
const getToken = () =>
  sessionStorage.getItem("token") ||
  localStorage.getItem("token");

/* ================= STATS ================= */
export const fetchAdminStats = async () => {
  const token = getToken();


  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

 

  if (!res.ok) throw new Error("Admin stats failed");
  return res.json();
};

/* ================= USERS ================= */
export const fetchAdminUsers = async () => {
  const token = getToken();


  const res = await fetch(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });



  if (!res.ok) throw new Error("Admin users failed");
  return res.json();
};

/* ================= SEARCHES ================= */
export const fetchAdminSearches = async () => {
  const token = getToken();
  

  const res = await fetch(`${API_URL}/api/admin/searches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!res.ok) throw new Error("Admin searches failed");
  return res.json();
};
