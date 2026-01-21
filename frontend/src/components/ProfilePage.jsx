import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [previewImage, setPreviewImage] = useState(user?.avatar || "");

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

  /* ===== IMAGE UPLOAD (LOCAL PREVIEW) ===== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ===== SAVE PROFILE ===== */
  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...localUser,
      ...editForm,
      avatar: previewImage,
    };

    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setLocalUser(updatedUser);
    setIsEditing(false);
  };

  if (!localUser) return null;

  return (
    <div className="min-h-screen bg-[#f7f9f8] pt-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-8">

          {/* AVATAR */}
          <div className="flex flex-col items-center text-center relative">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-semibold">
                    {localUser.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* EDIT IMAGE */}
              {isEditing && (
                <label className="absolute bottom-1 right-1 bg-black text-white text-xs px-3 py-1 rounded-full cursor-pointer shadow">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              )}
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              {localUser.name}
            </h2>

            <p className="text-sm text-gray-500">
              {localUser.email}
            </p>
          </div>

          {/* INFO GRID */}
          {!isEditing ? (
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <Info label="Contact Number" value={localUser.phone || "—"} />
              <Info label="Location" value={localUser.location || "—"} />
              <Info label="Tokens" value={`${localUser.tokens ?? 0}`} />
              <Info label="Account" value="Active" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <Input
                label="Phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
              <Input
                label="Location"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />

              <div className="flex gap-3 col-span-full">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#5b7c67] text-white"
                >
                  Save Changes
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
          )}

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <button
              onClick={() => setIsEditing((p) => !p)}
              className="px-5 py-2 rounded-full border"
            >
              {isEditing ? "View Profile" : "Edit Profile"}
            </button>

            <button
              onClick={() => navigate("/tokens")}
              className="px-5 py-2 rounded-full border"
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
    </div>
  );
};

export default ProfilePage;

/* ===== SMALL UI HELPERS ===== */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full mt-1 border rounded-xl px-4 py-2"
    />
  </div>
);
