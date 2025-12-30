import React, { useState, useEffect } from 'react';
import '../styles/PackingList.css';

const PackingList = ({ 
  onBack, 
  user,
  tripDetails
}) => {
  const [items, setItems] = useState([]);
  const [tripDescription, setTripDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTripForm, setShowTripForm] = useState(true);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemCategory, setCustomItemCategory] = useState('other');
  const [showCustomCard, setShowCustomCard] = useState(false);

  // Predefined categories for organization
  const categories = [
    { id: 'clothing', name: 'Clothing', icon: '👕', color: '#4CAF50' },
    { id: 'toiletries', name: 'Toiletries', icon: '🧴', color: '#2196F3' },
    { id: 'electronics', name: 'Electronics', icon: '📱', color: '#FF9800' },
    { id: 'documents', name: 'Documents', icon: '📄', color: '#9C27B0' },
    { id: 'medications', name: 'Medications', icon: '💊', color: '#F44336' },
    { id: 'essentials', name: 'Essentials', icon: '🎒', color: '#795548' },
    { id: 'food', name: 'Food & Snacks', icon: '🍎', color: '#FF5722' },
    { id: 'other', name: 'Other', icon: '📦', color: '#607D8B' }
  ];

  // Initialize with trip details if available
  useEffect(() => {
    if (tripDetails?.description) {
      setTripDescription(tripDetails.description);
      setIsCreating(true);
      generatePackingList(tripDetails.description);
    }
    
    // Load saved items from localStorage
    const savedItems = localStorage.getItem(`packingItems_${user?.id || 'guest'}`);
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      if (parsedItems.length > 0) {
        setItems(parsedItems);
        setShowTripForm(false);
      }
    }
  }, [tripDetails, user]);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(`packingItems_${user?.id || 'guest'}`, JSON.stringify(items));
    }
  }, [items, user]);

  // Generate packing list based on trip description
  const generatePackingList = (description) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const generatedItems = generateItemsFromDescription(description);
      setItems(generatedItems);
      setIsLoading(false);
      setShowTripForm(false);
    }, 1500);
  };

  // Generate items based on trip description
  const generateItemsFromDescription = (description) => {
    const desc = description.toLowerCase();
    const items = [];
    let itemId = 1;

    // Common items for all trips
    const commonItems = [
      { id: itemId++, name: 'Passport/ID', category: 'documents', essential: true },
      { id: itemId++, name: 'Wallet', category: 'documents', essential: true },
      { id: itemId++, name: 'Phone & Charger', category: 'electronics', essential: true },
      { id: itemId++, name: 'Toothbrush & Toothpaste', category: 'toiletries', essential: true },
      { id: itemId++, name: 'Basic First Aid Kit', category: 'medications', essential: true },
      { id: itemId++, name: 'Travel Pillow', category: 'essentials', essential: false },
    ];

    items.push(...commonItems);

    // Beach-specific items
    if (desc.includes('beach') || desc.includes('miami') || desc.includes('coast')) {
      items.push(
        { id: itemId++, name: 'Swimwear', category: 'clothing', essential: true },
        { id: itemId++, name: 'Sunscreen SPF 50+', category: 'toiletries', essential: true },
        { id: itemId++, name: 'Sunglasses', category: 'essentials', essential: true },
        { id: itemId++, name: 'Beach Towel', category: 'essentials', essential: true },
        { id: itemId++, name: 'Flip Flops', category: 'clothing', essential: true },
        { id: itemId++, name: 'Beach Bag', category: 'essentials', essential: false },
        { id: itemId++, name: 'Water Bottle', category: 'food', essential: false },
      );
    }

    // Summer items
    if (desc.includes('august') || desc.includes('summer') || desc.includes('hot')) {
      items.push(
        { id: itemId++, name: 'Light Clothing', category: 'clothing', essential: true },
        { id: itemId++, name: 'Hat/Cap', category: 'clothing', essential: true },
        { id: itemId++, name: 'Insect Repellent', category: 'toiletries', essential: false },
        { id: itemId++, name: 'Aloe Vera Gel', category: 'toiletries', essential: false },
      );
    }

    // Formal dinner items
    if (desc.includes('formal') || desc.includes('dinner') || desc.includes('saturday')) {
      items.push(
        { id: itemId++, name: 'Formal Attire', category: 'clothing', essential: true },
        { id: itemId++, name: 'Dress Shoes', category: 'clothing', essential: true },
        { id: itemId++, name: 'Accessories', category: 'clothing', essential: false },
      );
    }

    // Multi-day trip items
    if (desc.includes('5 days') || desc.includes('multiple') || desc.includes('week')) {
      items.push(
        { id: itemId++, name: 'Enough Underwear', category: 'clothing', essential: true },
        { id: itemId++, name: 'Travel-sized Toiletries', category: 'toiletries', essential: true },
        { id: itemId++, name: 'Laundry Bag', category: 'essentials', essential: false },
        { id: itemId++, name: 'Extra Bags for Souvenirs', category: 'essentials', essential: false },
      );
    }

    // Add quantity to each item
    return items.map(item => ({
      ...item,
      quantity: 1,
      packed: false,
      custom: false
    }));
  };

  // Handle trip form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tripDescription.trim()) {
      alert('Please tell us about your trip!');
      return;
    }
    
    setIsCreating(true);
    generatePackingList(tripDescription);
  };

  // Handle custom item submission - FIXED
  const handleAddCustomItem = (e) => {
    if (e) {
      e.preventDefault(); // Only call preventDefault if event exists
    }
    
    if (!customItemName.trim()) {
      alert('Please enter item name!');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: customItemName,
      category: customItemCategory,
      quantity: 1,
      packed: false,
      essential: false,
      custom: true
    };

    setItems([...items, newItem]);
    setCustomItemName('');
    setCustomItemCategory('other');
    setShowCustomCard(false);
  };

  // Toggle item packed status
  const toggleItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    ));
  };

  // Update quantity
  const updateQuantity = (itemId, delta) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Remove item
  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  // Add quick item (without form)
  const addQuickItem = (itemName, category = 'other') => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      category: category,
      quantity: 1,
      packed: false,
      essential: false,
      custom: true
    };
    setItems([...items, newItem]);
  };

  // Clear all items
  const clearAll = () => {
    if (window.confirm('Clear all items from your packing list?')) {
      setItems([]);
      localStorage.removeItem(`packingItems_${user?.id || 'guest'}`);
    }
  };

  // Print list
  const printList = () => {
    const printContent = document.getElementById('packing-list-content').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <div class="print-packing-list">
        <h1>🧳 Personalized Packing List</h1>
        <div class="print-trip-info">
          <h3>Trip Details:</h3>
          <p>${tripDescription || 'My Trip'}</p>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        ${printContent}
        <div class="print-footer">
          <p>Total Items: ${items.length} | Packed: ${items.filter(i => i.packed).length}</p>
          <p>Happy Travels! ✈️</p>
        </div>
      </div>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .print-packing-list { max-width: 800px; margin: 0 auto; }
        .print-trip-info { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .category-section { margin-bottom: 20px; break-inside: avoid; }
        .category-header { border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 10px; }
        .packing-item { padding: 8px 0; border-bottom: 1px solid #eee; }
        .packed .item-name { text-decoration: line-through; color: #888; }
        .print-footer { margin-top: 30px; padding-top: 15px; border-top: 2px solid #333; text-align: center; }
        @media print {
          .packing-item { page-break-inside: avoid; }
        }
      </style>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Export as text
  const exportList = () => {
    const listText = `🧳 PACKING LIST\n\n`;
    const tripInfo = `Trip: ${tripDescription || 'My Trip'}\n`;
    const dateInfo = `Generated: ${new Date().toLocaleDateString()}\n`;
    const progressInfo = `Progress: ${calculateProgress()}% (${items.filter(i => i.packed).length}/${items.length} items)\n\n`;
    
    const itemsText = items.map(item => 
      `${item.packed ? '✅' : '⬜'} ${item.name} x${item.quantity}`
    ).join('\n');
    
    const summary = `\n\n=== SUMMARY ===\nTotal Items: ${items.length}\nPacked: ${items.filter(i => i.packed).length}\nRemaining: ${items.filter(i => !i.packed).length}\nProgress: ${calculateProgress()}%\n\nHappy Travels! ✈️`;
    
    const fullText = listText + tripInfo + dateInfo + progressInfo + itemsText + summary;
    
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `packing-list-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    alert('Packing list exported as text file!');
  };

  // Calculate progress
  const calculateProgress = () => {
    if (items.length === 0) return 0;
    const packedItems = items.filter(item => item.packed).length;
    return Math.round((packedItems / items.length) * 100);
  };

  // Get items by category
  const getItemsByCategory = (categoryId) => {
    return items.filter(item => item.category === categoryId);
  };

  // Get category color
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#607D8B';
  };

  const progress = calculateProgress();

  return (
    <div className="packing-list-page">
      {/* Header */}
      <div className="packing-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1> Personalized Packing List</h1>
        <div className="header-actions">
          {!showTripForm && items.length > 0 && (
            <>
              <button className="print-button" onClick={printList}>
                🖨️ Print
              </button>
              <button className="export-button" onClick={exportList}>
                📥 Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="packing-content">
        {/* Trip Description Form */}
        {showTripForm && (
          <div className="trip-description-section">
            <div className="description-card">
              <h2>Get a smart packing list personalized to your trip details.</h2>
              <p className="subtitle">
                Check items off and print it when you're ready to go
              </p>
              
              <div className="description-info">
                <p className="info-text">
                  Tell us about your trip... the more details you provide, the more 
                  personalized your packing list will be
                </p>
                <p className="example-text">
                  E.g., 5 days in Miami in August, beach and dining, formal dinner on Saturday
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="trip-form">
                <textarea
                  className="trip-input"
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  placeholder="Describe your trip in detail..."
                  rows={4}
                  disabled={isLoading}
                />
                
                <button 
                  type="submit" 
                  className="create-button"
                  disabled={isLoading || !tripDescription.trim()}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating Your List...
                    </>
                  ) : (
                    'Create My Packing List'
                  )}
                </button>
                
                {tripDetails?.description && (
                  <button
                    type="button"
                    className="use-current-trip"
                    onClick={() => {
                      setTripDescription(tripDetails.description);
                    }}
                  >
                    Use Current Trip Details
                  </button>
                )}
              </form>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <div className="loading-spinner-large"></div>
                  <p>Analyzing your trip details...</p>
                  <p className="loading-subtext">Generating personalized packing list</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Packing List Display */}
        {!showTripForm && (
          <div id="packing-list-content" className="packing-list-display">
            {/* Trip Info Banner */}
            <div className="trip-info-banner">
              <div className="trip-info-content">
                <h3>Your Trip</h3>
                <p>{tripDescription || 'My Trip'}</p>
                <button 
                  className="edit-trip-btn"
                  onClick={() => setShowTripForm(true)}
                >
                  Edit Trip Details
                </button>
              </div>
            </div>

            {/* Progress Section */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-title">Packing Progress</span>
                <span className="progress-stats">
                  {items.filter(i => i.packed).length} of {items.length} items packed
                </span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{progress}% Complete</div>
            </div>

            {/* Packing List Items */}
            {categories.map(category => {
              const categoryItems = getItemsByCategory(category.id);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category.id} className="category-section">
                  <div className="category-header">
                    <span className="category-icon" style={{ color: category.color }}>
                      {category.icon}
                    </span>
                    <h3 className="category-title">{category.name}</h3>
                    <span className="category-count">({categoryItems.length})</span>
                  </div>
                  
                  <div className="items-list">
                    {categoryItems.map(item => (
                      <div 
                        key={item.id} 
                        className={`packing-item ${item.packed ? 'packed' : ''} ${item.custom ? 'custom-item' : ''}`}
                        style={{ 
                          borderLeft: item.custom ? `4px solid ${getCategoryColor(item.category)}` : 'none' 
                        }}
                      >
                        <div className="item-left">
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              checked={item.packed}
                              onChange={() => toggleItem(item.id)}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <span className="item-name">{item.name}</span>
                          {item.essential && <span className="essential-badge">Essential</span>}
                          {item.custom && <span className="custom-badge">Custom</span>}
                        </div>
                        
                        <div className="item-right">
                          <button
                              className={`tick-btn ${item.packed ? 'ticked' : ''}`}
                              onClick={() => toggleItem(item.id)}
                              title={item.packed ? 'Mark as unpacked' : 'Mark as packed'}
                            >
                              {item.packed ? '✅' : '❌'}
                            </button>

                          <div className="quantity-control">
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              −
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                            title="Remove item"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Custom Item Card */}
            {!showCustomCard ? (
              <div className="custom-item-card-alt">
                <div className="card-alt-icon">✨</div>
                <h3>Forgot Something?</h3>
                <p>Add custom items that are specific to your trip</p>
                
                <div className="quick-add-buttons">
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Travel Adapter', 'electronics')}
                  >
                    Travel Adapter
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Portable Charger', 'electronics')}
                  >
                    Power Bank
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Travel Pillow', 'essentials')}
                  >
                    Travel Pillow
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Snacks', 'food')}
                  >
                    Books
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Snacks', 'food')}
                  >
                    charger
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Snacks', 'food')}
                  >
                    laptop
                  </button>
                  {/* <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Snacks', 'food')}
                  >
                    
                  </button>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addQuickItem('Snacks', 'food')}
                  >
                    Snacks
                  </button> */}
                </div>
                
                <button 
                  className="custom-toggle-btn"
                  onClick={() => setShowCustomCard(true)}
                >
                  + Add Custom Item
                </button>
              </div>
            ) : (
              <div className="add-custom-card">
                <div className="card-header">
                  <div className="card-icon">📝</div>
                  <h3 className="card-title">Add Custom Item</h3>
                </div>
                <p className="card-description">
                  Forgot something? Add your own custom items to make sure you don't miss anything important.
                </p>
                
                <form onSubmit={handleAddCustomItem} className="custom-item-form">
                  <input
                    type="text"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    className="custom-input"
                    placeholder="What do you need to pack?"
                    required
                    autoFocus
                  />
                  
                  <select 
                    value={customItemCategory}
                    onChange={(e) => setCustomItemCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="form-button-group">
                    <button 
                      type="submit" 
                      className="add-custom-item-btn"
                    >
                      <span>+</span> Add Item
                    </button>
                    <button 
                      type="button" 
                      className="cancel-custom-btn"
                      onClick={() => {
                        setShowCustomCard(false);
                        setCustomItemName('');
                        setCustomItemCategory('other');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Empty State */}
            {items.length === 0 && !showCustomCard && (
              <div className="empty-list">
                <div className="empty-icon">📦</div>
                <h3>No items in your packing list</h3>
                <p>Add items to get started</p>
                <button 
                  className="add-item-btn" 
                  onClick={() => setShowCustomCard(true)}
                >
                  + Add First Item
                </button>
              </div>
            )}

            {/* Actions */}
            {items.length > 0 && (
              <>
                <div className="packing-actions">
                  <button 
                    className="action-btn add-custom-btn" 
                    onClick={() => setShowCustomCard(true)}
                  >
                    + Add More Items
                  </button>
                  <button className="action-btn clear-btn" onClick={clearAll}>
                    Clear All
                  </button>
                  <button className="action-btn new-list-btn" onClick={() => setShowTripForm(true)}>
                    Create New List
                  </button>
                </div>

                {/* Stats Footer */}
                <div className="list-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Items:</span>
                    <span className="stat-value">{items.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">To Pack:</span>
                    <span className="stat-value">{items.filter(i => !i.packed).length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Packed:</span>
                    <span className="stat-value">{items.filter(i => i.packed).length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Progress:</span>
                    <span className="stat-value">{progress}%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackingList;