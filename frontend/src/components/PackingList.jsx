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

  /* ================= SMART HELPERS ================= */
  const keywords = {
    cold: ["cold", "winter", "snow", "hill", "mountain"],
    beach: ["beach", "sea", "ocean", "island", "coast"],
    business: ["business", "office", "meeting", "conference"],
    trekking: ["trek", "hike", "trekking", "camp", "adventure"]
  };

  const extractDays = (text) => {
    const match = text.match(/(\d+)\s*(day|days)/);
    return match ? parseInt(match[1]) : 3;
  };

  const addItem = (list, name, category, essential = false) => {
    if (!list.some(i => i.name === name)) {
      list.push({ name, category, essential });
    }
  };

  /* ================= BASE ITEMS ================= */
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

  const tripTips = [
  "5 days beach trip to Goa",
  "Cold hill trip to Manali",
  "3 days business trip",
  "Trekking adventure in mountains",
  "Weekend family vacation"
];


  /* ================= SMART GENERATOR ================= */
  const smartGenerateItems = () => {
    const desc = tripDescription.toLowerCase();
    let list = generateItems();
    const days = extractDays(desc);

    if (keywords.cold.some(w => desc.includes(w))) {
      addItem(list, "Winter Jacket", "clothing", true);
      addItem(list, "Thermal Wear", "clothing");
      addItem(list, "Gloves", "clothing");
      addItem(list, "Woolen Cap", "clothing");
    }

    if (keywords.beach.some(w => desc.includes(w))) {
      addItem(list, "Swimwear", "clothing", true);
      addItem(list, "Sunscreen", "toiletries", true);
      addItem(list, "Flip Flops", "clothing");
      addItem(list, "Beach Towel", "essentials");
    }

    if (keywords.business.some(w => desc.includes(w))) {
      addItem(list, "Formal Clothes", "clothing", true);
      addItem(list, "Laptop", "electronics", true);
      addItem(list, "Notebook & Pen", "documents");
    }

    if (keywords.trekking.some(w => desc.includes(w))) {
      addItem(list, "Trekking Shoes", "clothing", true);
      addItem(list, "Backpack", "essentials", true);
      addItem(list, "Torch / Headlamp", "electronics");
      addItem(list, "Power Bank", "electronics", true);
    }

    if (days >= 5) {
      addItem(list, "Extra Clothes", "clothing");
      addItem(list, "Laundry Bag", "essentials");
    }

    addItem(list, "Reusable Water Bottle", "essentials");
    addItem(list, "Emergency Cash", "documents", true);

    return list.map((item, index) => ({
      id: Date.now() + index,
      quantity: 1,
      packed: false,
      custom: false,
      essential: item.essential || false,
      ...item
    }));
  };

  const resetPackingList = () => {
  const confirmReset = window.confirm(
    "Are you sure you want to start a new packing list?"
  );

  if (!confirmReset) return;

  setItems([]);
  setTripDescription("");
  setShowCustomCard(false);
  localStorage.removeItem(STORAGE_KEY);
};

  /* ================= GENERATE ACTION ================= */
  const generatePackingList = () => {
    if (!tripDescription.trim()) {
      alert("Please describe your trip first 🙂");
      return;
    }

    setIsLoading(true);
    localStorage.removeItem(STORAGE_KEY);

    setTimeout(() => {
      setItems(smartGenerateItems());
      setIsLoading(false);
    }, 1200);
  };

  /* ================= STORAGE ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

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

  const downloadPackingList = () => {
    let content = "🧳 Packing List\n\n";

    categories.forEach(cat => {
      const list = items.filter(i => i.category === cat.id);
      if (!list.length) return;

      content += `${cat.icon} ${cat.name}\n`;
      list.forEach(item => {
        content += `- [${item.packed ? "x" : " "}] ${item.name}\n`;
      });
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "packing-list.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="sticky top-0 z-20 bg-white shadow-sm flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">🧳 Packing List</h1>
      </div>

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

            {/* TIPS SECTION */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                💡 Try searching like this:
              </p>

              <div className="flex flex-wrap gap-2">
                {tripTips.map((tip, index) => (
                  <button
                    key={index}
                    onClick={() => setTripDescription(tip)}
                    className="text-sm px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {hasItems && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow">
              <div className="flex justify-between text-sm mb-2">
                <span>Packing Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-black rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

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
                      <button onClick={() => removeItem(item.id)} className="text-red-500">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}

            <button
              onClick={() => setShowCustomCard(true)}
              className="w-full bg-white border-2 border-dashed py-4 rounded-2xl"
            >
              ➕ Add more items
            </button>

            {showCustomCard && (
              <form onSubmit={addCustomItem} className="bg-white p-6 rounded-2xl shadow space-y-4">
                <input
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
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button className="bg-black text-white py-2 rounded-xl">Add Item</button>
              </form>
            )}

            <button
              onClick={downloadPackingList}
              className="w-full bg-black text-white py-3 rounded-2xl"
            >
              ⬇️ Download Packing List
            </button>
            <button
  onClick={resetPackingList}
  className="w-full border border-red-300 text-red-600 py-3 rounded-2xl hover:bg-red-50"
>
  🔄 Start New Packing List
</button>

          </div>
        )}
      </div>
    </div>
  );
};

export default PackingList;
