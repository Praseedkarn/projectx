const API_URL = process.env.REACT_APP_API_URL;
console.log("ADMIN API_URL:", API_URL);

/* 🔑 SINGLE SOURCE OF TRUTH */
const getToken = () =>
  sessionStorage.getItem("token") ||
  localStorage.getItem("token");

/* ================= STATS ================= */
export const fetchAdminStats = async () => {
  const token = getToken();
  console.log("ADMIN stats → token exists:", !!token);

  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("ADMIN stats → status:", res.status);

  if (!res.ok) throw new Error("Admin stats failed");
  return res.json();
};

/* ================= USERS ================= */
export const fetchAdminUsers = async () => {
  const token = getToken();
  console.log("ADMIN users → token exists:", !!token);

  const res = await fetch(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("ADMIN users → status:", res.status);

  if (!res.ok) throw new Error("Admin users failed");
  return res.json();
};

/* ================= SEARCHES ================= */
export const fetchAdminSearches = async () => {
  const token = getToken();
  console.log("ADMIN searches → token exists:", !!token);

  const res = await fetch(`${API_URL}/api/admin/searches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("ADMIN searches → status:", res.status);

  if (!res.ok) throw new Error("Admin searches failed");
  return res.json();
};
