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

  /* ================= DERIVED ================= */
  const hasItems = items.length > 0;

  /* ================= CATEGORIES ================= */
  const categories = [
    { id: "clothing", name: "Clothing", icon: "👕", border: "border-green-500" },
    { id: "toiletries", name: "Toiletries", icon: "🧴", border: "border-blue-500" },
    { id: "electronics", name: "Electronics", icon: "📱", border: "border-orange-500" },
    { id: "documents", name: "Documents", icon: "📄", border: "border-purple-500" },
    { id: "medications", name: "Medications", icon: "💊", border: "border-red-500" },
    { id: "essentials", name: "Essentials", icon: "🎒", border: "border-amber-500" },
    { id: "food", name: "Food & Snacks", icon: "🍎", border: "border-pink-500" },
    { id: "other", name: "Other", icon: "📦", border: "border-gray-500" }
  ];

  /* ================= INIT ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) setItems(parsed);
    }
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
    }, 1500);
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

  const updateQuantity = (id, delta) =>
    setItems(items.map(i =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));

  const removeItem = (id) =>
    setItems(items.filter(i => i.id !== id));

  const addQuickItem = (name, category) =>
    setItems([...items, {
      id: Date.now(),
      name,
      category,
      quantity: 1,
      packed: false,
      essential: false,
      custom: true
    }]);

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    addQuickItem(customItemName, customItemCategory);
    setCustomItemName("");
    setCustomItemCategory("other");
    setShowCustomCard(false);
  };

  const startNewList = () => {
    setItems([]);
    setTripDescription("");
    setShowCustomCard(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  /* ================= PRINT ================= */
  const printList = () => {
    const content = document.getElementById("packing-list-content").innerHTML;
    const original = document.body.innerHTML;

    document.body.innerHTML = `
      <div style="font-family:Arial;padding:20px">
        <h1>🧳 Personalized Packing List</h1>
        <p>${tripDescription || "My Trip"}</p>
        ${content}
      </div>
    `;

    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  /* ================= EXPORT ================= */
  const exportList = () => {
    const text = items
      .map(i => `${i.packed ? "✅" : "⬜"} ${i.name} x${i.quantity}`)
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "packing-list.txt";
    a.click();
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
        {hasItems && (
          <div className="flex gap-2">
            <button onClick={printList} className="border px-3 py-1.5 rounded-lg text-sm">
              🖨️ Print
            </button>
            <button onClick={exportList} className="border px-3 py-1.5 rounded-lg text-sm">
              📥 Export
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-6">
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
              Create My Packing List
            </button>
          </div>
        )}

        {hasItems && (
          <div id="packing-list-content" className="space-y-6">
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
                  <h3 className="font-semibold mb-3">{cat.icon} {cat.name}</h3>
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
                      <button onClick={() => removeItem(item.id)} className="text-red-500">×</button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackingList;
