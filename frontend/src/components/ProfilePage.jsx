import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState(user);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    setEditForm({
      name: user.name || "",
      phone: user.phone || "",
      location: user.location || "",
    });
  }, [user, navigate]);

  /* ===== SAVE PROFILE ===== */
  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...localUser,
      ...editForm,
    };

    // ✅ single source of truth
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setLocalUser(updatedUser); // local re-render

    setIsEditing(false);
  };

  if (!localUser) return null;

  return (
    <div className="pt-28 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button onClick={() => navigate(-1)} className="text-sm text-gray-500">
            ← Back
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#5b6f00]/10 flex items-center justify-center text-2xl font-bold">
            {localUser.name?.[0]?.toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-lg">{localUser.name}</p>
            <p className="text-sm text-gray-500">{localUser.email}</p>
            <p className="text-sm mt-1">
              🪙 Tokens: <strong>{localUser.tokens}</strong>
            </p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2"
              required
            />

            <input
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2"
            />

            <input
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#5b7c67] text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-full border"
              >
                Cancel
              </button>


            </div>
          </form>
        ) : (
          <div className="space-y-2 text-sm">
            <p>📞 Phone: {localUser.phone || "—"}</p>
            <p>📍 Location: {localUser.location || "—"}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={() => setIsEditing((p) => !p)}
            className="px-5 py-2 rounded-full border"
          >
            {isEditing ? "View Profile" : "Edit Profile"}
          </button>

          <button
            onClick={() => navigate("/tokens")}
            className="px-5 py-2 rounded-full border flex items-center gap-2"
          >
            🪙 Token History
          </button>

          <button
            onClick={onLogout}
            className="px-5 py-2 rounded-full bg-red-50 text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
