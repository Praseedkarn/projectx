import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  /* ================= USER ================= */
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
  });

  /* ================= INIT ================= */
  useEffect(() => {
    if (!userData) {
      navigate("/"); // 🔐 not logged in
      return;
    }

    const saved = localStorage.getItem(
      `userProfile_${userData.id || userData.email}`
    );

    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData(parsed);
      setEditForm({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        location: parsed.location || "",
      });
    }
  }, [navigate]);

  /* ================= SAVE PROFILE ================= */
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...userData,
      ...editForm,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `userProfile_${userData.id || userData.email}`,
      JSON.stringify(updatedUser)
    );
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUserData(updatedUser);
    setIsEditing(false);

    alert("Profile updated successfully ✨");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  /* ================= STATS ================= */
  const getUserStats = () => {
    const trips = JSON.parse(localStorage.getItem("userTrips") || "[]");
    const packing = JSON.parse(
      localStorage.getItem(`packing_guest`) || "[]"
    );

    return {
      totalTrips: trips.length,
      packingLists: packing.length,
      joinedDate: new Date(
        userData?.createdAt || Date.now()
      ).toDateString(),
    };
  };

  const stats = getUserStats();

  if (!userData) return null;

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>👤 My Profile</h1>
      </div>

      <div className="profile-content-container">
        <div className="profile-main-card">
          {/* BASIC INFO */}
          <div className="profile-header-section">
            <div className="profile-avatar-large">
              {userData.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="profile-basic-info">
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
              <p>Member since: {stats.joinedDate}</p>
            </div>
          </div>

          {/* STATS */}
          <div className="quick-stats">
            <div className="stat-box">
              <h4>Trips Planned</h4>
              <p>{stats.totalTrips}</p>
            </div>
            <div className="stat-box">
              <h4>Packing Lists</h4>
              <p>{stats.packingLists}</p>
            </div>
          </div>

          {/* EDIT / VIEW */}
          {isEditing ? (
            <form className="edit-form" onSubmit={handleEditSubmit}>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Name"
                required
              />
              <input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                required
              />
              <input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                placeholder="Phone"
              />
              <input
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                placeholder="Location"
              />

              <button type="submit">💾 Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <div className="profile-details">
              <p>Phone: {userData.phone || "—"}</p>
              <p>Location: {userData.location || "—"}</p>
            </div>
          )}

          {/* ACTIONS */}
          <div className="profile-actions">
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "View Profile" : "Edit Profile"}
            </button>

            <button onClick={() => navigate("/packing")}>
              🧳 Packing List
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
