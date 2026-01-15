import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PackingList = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [items, setItems] = useState([]);
  const [tripDescription, setTripDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomCard, setShowCustomCard] = useState(false);
  const [customItemName, setCustomItemName] = useState("");
  const [customItemCategory, setCustomItemCategory] = useState("other");

  const STORAGE_KEY = "packing_guest";

  const hasItems = items.length > 0;

  /* ================= CATEGORIES ================= */
  const categories = [
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "toiletries", name: "Toiletries", icon: "🧴" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "documents", name: "Documents", icon: "📄" },
    { id: "medications", name: "Medications", icon: "💊" },
    { id: "essentials", name: "Essentials", icon: "🎒" },
    { id: "food", name: "Food & Snacks", icon: "🍎" },
    { id: "other", name: "Other", icon: "📦" }
  ];

  /* ================= INIT ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  /* ================= PERSIST ================= */
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  /* ================= GENERATE ================= */
  const generatePackingList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems(generateItems());
      setIsLoading(false);
    }, 1200);
  };

  const generateItems = () => {
    let id = 1;
    return [
      { id: id++, name: "Passport / ID", category: "documents", essential: true },
      { id: id++, name: "Wallet", category: "documents", essential: true },
      { id: id++, name: "Phone & Charger", category: "electronics", essential: true },
      { id: id++, name: "Toothbrush & Toothpaste", category: "toiletries", essential: true },
      { id: id++, name: "First Aid Kit", category: "medications", essential: true },
      { id: id++, name: "Travel Pillow", category: "essentials", essential: false }
    ].map(i => ({
      ...i,
      quantity: 1,
      packed: false,
      custom: false
    }));
  };

  /* ================= ACTIONS ================= */
  const toggleItem = (id) =>
    setItems(items.map(i => i.id === id ? { ...i, packed: !i.packed } : i));

  const removeItem = (id) =>
    setItems(items.filter(i => i.id !== id));

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name: customItemName,
        category: customItemCategory,
        quantity: 1,
        packed: false,
        essential: false,
        custom: true
      }
    ]);

    setCustomItemName("");
    setCustomItemCategory("other");
    setShowCustomCard(false);
  };

  const progress = hasItems
    ? Math.round((items.filter(i => i.packed).length / items.length) * 100)
    : 0;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white shadow-sm flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">🧳 Packing List</h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        {!hasItems && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <textarea
              className="w-full border rounded-xl p-4"
              rows={4}
              value={tripDescription}
              onChange={(e) => setTripDescription(e.target.value)}
              placeholder="Describe your trip..."
            />
            <button
              onClick={generatePackingList}
              className="mt-4 bg-black text-white px-6 py-3 rounded-xl"
            >
              {isLoading ? "Generating..." : "Create My Packing List"}
            </button>
          </div>
        )}

        {hasItems && (
          <div className="space-y-6">
            {/* PROGRESS */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <div className="flex justify-between text-sm mb-2">
                <span>Packing Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-black rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* CATEGORIES */}
            {categories.map(cat => {
              const list = items.filter(i => i.category === cat.id);
              if (!list.length) return null;

              return (
                <div key={cat.id} className="bg-white rounded-2xl shadow p-5">
                  <h3 className="font-semibold mb-3">
                    {cat.icon} {cat.name}
                  </h3>
                  {list.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <label className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={item.packed}
                          onChange={() => toggleItem(item.id)}
                        />
                        {item.name}
                      </label>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ADD MORE ITEM */}
            <button
              onClick={() => setShowCustomCard(true)}
              className="w-full bg-white border-2 border-dashed border-gray-300 py-4 rounded-2xl text-gray-600 hover:border-black hover:text-black"
            >
              ➕ Add more items
            </button>

            {showCustomCard && (
              <form
                onSubmit={addCustomItem}
                className="bg-white p-6 rounded-2xl shadow space-y-4"
              >
                <h3 className="font-semibold text-lg">Add Custom Item</h3>

                <input
                  type="text"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  placeholder="Item name"
                  className="w-full border rounded-xl p-3"
                />

                <select
                  value={customItemCategory}
                  onChange={(e) => setCustomItemCategory(e.target.value)}
                  className="w-full border rounded-xl p-3"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-black text-white px-5 py-2 rounded-xl"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomCard(false)}
                    className="border px-5 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackingList;
