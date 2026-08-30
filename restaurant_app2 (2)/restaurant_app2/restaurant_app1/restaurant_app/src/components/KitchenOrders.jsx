import React, { useState, useEffect } from 'react';

export default function KitchenOrders({ markAsReady, totalOrdersHistory }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('kitchenOrders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleReady = (order) => {
    markAsReady(order);
    const updated = orders.filter(o => o.id !== order.id);
    setOrders(updated);
    localStorage.setItem('kitchenOrders', JSON.stringify(updated));
  };

  // Clear all kitchen pending orders
  const clearKitchenOrders = () => {
    if (window.confirm("Are you sure you want to clear all kitchen orders?")) {
      setOrders([]);
      localStorage.removeItem('kitchenOrders');
    }
  };

  const totalOrdersCount = totalOrdersHistory.length;
  const kitchenPendingCount = totalOrdersHistory.filter(o => o.status === 'pending').length;

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      
      {/* Stats Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px',
        background: 'rgba(20, 20, 20, 0.9)', padding: '12px 20px', 
        borderRadius: '8px', marginBottom: '25px', border: '1px solid #d4af37',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: '#fff' }}>📦 Total Orders: <strong style={{ color: '#d4af37' }}>{totalOrdersCount}</strong></span>
        <span style={{ color: '#fff' }}>🍳 Pending in Kitchen: <strong style={{ color: '#ff9800' }}>{kitchenPendingCount}</strong></span>
      </div>

      {/* Header with Clear All Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '22px' }}>Kitchen Pending Queue</h2>
        
        {orders.length > 0 && (
          <button
            onClick={clearKitchenOrders}
            style={{ 
              background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', 
              padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' 
            }}
          >
            🗑️ Clear All Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(20,20,20,0.6)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#aaa', fontSize: '15px', margin: 0 }}>No pending kitchen orders right now.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ background: '#1a1a1a', border: '2px solid #d4af37', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: '#d4af37', margin: 0 }}>{order.tableNo}</h3>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#d4af37', display: 'block' }}>{order.date || new Date().toLocaleDateString()}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{order.time}</span>
                </div>
              </div>
              <ul style={{ padding: '0 0 0 20px', color: '#fff', marginBottom: '15px' }}>
                {order.items.map((item, i) => <li key={i}>{item.name} x {item.qty}</li>)}
              </ul>
              <button 
                onClick={() => handleReady(order)}
                style={{ width: '100%', background: '#4CAF50', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Ready to Serve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}