// src/admin/admin.api.js

export const fetchAdminStats = async () => {
  const token = sessionStorage.getItem("token");

  const res = await fetch("/api/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Admin stats failed");
  }

  return res.json();
};

export const fetchAdminUsers = async () => {
  const token = sessionStorage.getItem("token");

  const res = await fetch("/api/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Admin users failed");
  }

  return res.json();
};
