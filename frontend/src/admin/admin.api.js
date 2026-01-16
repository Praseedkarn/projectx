const API_URL = process.env.REACT_APP_API_URL;
console.log("ADMIN API_URL:", API_URL);

export const fetchAdminStats = async () => {
  const token = sessionStorage.getItem("token");
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

export const fetchAdminUsers = async () => {
  const token = sessionStorage.getItem("token");
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
