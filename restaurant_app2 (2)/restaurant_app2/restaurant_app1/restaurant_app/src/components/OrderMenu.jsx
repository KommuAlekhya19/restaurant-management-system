import React, { useState, useEffect } from 'react';
import API from '../services/api'; 
import { menuItems as staticMenuItems } from '../components/restaurantData';

export default function OrderMenu({ cart, addToCart, removeFromCart, placeOrder, selectedTable }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    API.get('/api/menu-items')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.warn("Backend fetch failed, loading local static menu items:", error);
        setMenuItems(staticMenuItems);
      });
  }, []);

  // Safe category generation with filter for valid values
  const categories = ['All', ...new Set(menuItems.map(item => item.category).filter(Boolean))];

  // Robust case-insensitive and trimmed filtering
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => 
        item.category && item.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#d4af37' : 'rgba(20, 20, 20, 0.8)',
              color: activeCategory === cat ? '#000' : '#fff',
              border: '1px solid #d4af37',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Menu Items Grid */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          <h3 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', fontSize: '20px', marginBottom: '20px' }}>
            {activeCategory === 'All' ? 'All Menu Items' : `${activeCategory}`}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {filteredItems.map((item) => {
              // Special fix for Laccha Paratha file name mismatch in public folder
              const formattedName = item.name === "Laccha Paratha" ? "LacchaParata" : item.name.replace(/\s+/g, '');
              const dynamicImagePath = `/Images/${formattedName}.png`;

              return (
                <div key={item.id} style={{ background: 'rgba(20, 20, 20, 0.85)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', textAlign: 'center' }}>
                  
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#111', overflow: 'hidden' }}>
                    <img 
                      src={dynamicImagePath} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/Images/${item.name.replace(/\s+/g, '').toLowerCase()}.png`;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>

                  <div style={{ padding: '15px', color: '#fff' }}>
                    <h4 style={{ fontSize: '15px', margin: '0 0 5px 0' }}>{item.name}</h4>
                    <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '12px' }}>₹{item.price}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ background: '#d4af37', color: '#000', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Current Cart Summary */}
        <div style={{ flex: 1, minWidth: '280px', background: 'rgba(20, 20, 20, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', height: 'fit-content' }}>
          <h3 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', fontSize: '18px', marginTop: 0, marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Current Cart ({selectedTable?.name || 'Select Table'})
          </h3>

          {cart.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '13px', textAlign: 'center' }}>Cart is empty. Add items from the menu.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '13px', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                  <div>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</span>
                    <div style={{ color: '#aaa', fontSize: '11px' }}>₹{item.price} x {item.qty}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>₹{item.price * item.qty}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'transparent', color: '#F44336', border: '1px solid #F44336', padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '10px' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginTop: '15px', color: '#d4af37' }}>
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>

              <button 
                onClick={placeOrder}
                style={{ width: '100%', background: '#4CAF50', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', fontSize: '14px' }}
              >
                Place Order / Send to Kitchen
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}