import React, { useState, useEffect } from "react";

const PackingList = ({ onBack, user, tripDetails }) => {
  /* ================= STATE ================= */
  const [items, setItems] = useState([]);
  const [tripDescription, setTripDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomCard, setShowCustomCard] = useState(false);
  const [customItemName, setCustomItemName] = useState("");
  const [customItemCategory, setCustomItemCategory] = useState("other");

  /* ================= DERIVED STATE ================= */
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
    const saved = localStorage.getItem(`packing_${user?.id || "guest"}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setItems(parsed); // 👉 opens SELECT page
      }
    }

    if (tripDetails?.description) {
      setTripDescription(tripDetails.description);
    }
  }, [user, tripDetails]);

  /* ================= PERSIST ================= */
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(
        `packing_${user?.id || "guest"}`,
        JSON.stringify(items)
      );
    }
  }, [items, user]);

  /* ================= AI GENERATION ================= */
  const generatePackingList = (description) => {
    setIsLoading(true);

    setTimeout(() => {
      setItems(generateItems(description));
      setIsLoading(false);
    }, 1500);
  };

  const generateItems = () => {
    let id = 1;
    const base = [
      { id: id++, name: "Passport / ID", category: "documents", essential: true },
      { id: id++, name: "Wallet", category: "documents", essential: true },
      { id: id++, name: "Phone & Charger", category: "electronics", essential: true },
      { id: id++, name: "Toothbrush & Toothpaste", category: "toiletries", essential: true },
      { id: id++, name: "First Aid Kit", category: "medications", essential: true },
      { id: id++, name: "Travel Pillow", category: "essentials", essential: false }
    ];

    return base.map(i => ({
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
      i.id === id
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
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
    localStorage.removeItem(`packing_${user?.id || "guest"}`);
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
        <button onClick={onBack} className="text-gray-600 hover:text-black">
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
        {/* CREATE PAGE */}
        {!hasItems && (
          <div className="bg-white rounded-3xl p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-2">
              Get a smart packing list
            </h2>
            <p className="text-gray-500 mb-4">
              Example: 5 days in Goa, beach trip, summer
            </p>

            <textarea
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-black"
              rows={4}
              value={tripDescription}
              onChange={(e) => setTripDescription(e.target.value)}
              placeholder="Describe your trip..."
            />

            <button
              onClick={() => generatePackingList(tripDescription)}
              disabled={isLoading || !tripDescription.trim()}
              className="mt-4 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900"
            >
              {isLoading ? "Creating..." : "Create My Packing List"}
            </button>

            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-3xl">
                <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full" />
                <p className="mt-3 text-gray-600">Analyzing your trip...</p>
              </div>
            )}
          </div>
        )}

        {/* SELECT / MAIN PAGE */}
        {hasItems && (
          <div id="packing-list-content" className="space-y-6">
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
                  <div className="flex items-center gap-2 mb-4">
                    <span>{cat.icon}</span>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <span className="text-sm text-gray-500">({list.length})</span>
                  </div>

                  <div className="space-y-3">
                    {list.map(item => (
                      <div
                        key={item.id}
                        className={`flex justify-between items-center p-3 rounded-xl border-l-4 ${cat.border}
                        ${item.packed ? "bg-green-50 line-through text-gray-500" : "bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.packed}
                            onChange={() => toggleItem(item.id)}
                            className="accent-black"
                          />
                          <span>{item.name}</span>
                          {item.essential && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Essential
                            </span>
                          )}
                          {item.custom && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                              Custom
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          <button onClick={() => removeItem(item.id)} className="text-red-500">
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* QUICK ADD */}
            <div className="bg-white rounded-2xl p-5 shadow">
              <h3 className="font-semibold mb-3">Forgot something?</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => addQuickItem("Power Bank", "electronics")} className="px-3 py-1 bg-gray-100 rounded-lg">
                  Power Bank
                </button>
                <button onClick={() => addQuickItem("Travel Adapter", "electronics")} className="px-3 py-1 bg-gray-100 rounded-lg">
                  Travel Adapter
                </button>
                <button onClick={() => addQuickItem("Snacks", "food")} className="px-3 py-1 bg-gray-100 rounded-lg">
                  Snacks
                </button>
              </div>

              {!showCustomCard ? (
                <button onClick={() => setShowCustomCard(true)} className="mt-4 text-sm text-blue-600">
                  + Add Custom Item
                </button>
              ) : (
                <form onSubmit={addCustomItem} className="mt-4 space-y-2">
                  <input
                    className="w-full border p-2 rounded-lg"
                    placeholder="Item name"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                  />
                  <select
                    className="w-full border p-2 rounded-lg"
                    value={customItemCategory}
                    onChange={(e) => setCustomItemCategory(e.target.value)}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button className="bg-black text-white px-4 py-2 rounded-lg">
                    Add Item
                  </button>
                </form>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between">
              <button onClick={startNewList} className="text-blue-600">
                Create New List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackingList;
