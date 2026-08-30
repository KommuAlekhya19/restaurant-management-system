import React from 'react';

export default function WaiterOrders({ readyToServeOrders, markAsDelivered, totalOrdersHistory, clearWaiterHistory }) {
  const totalOrdersCount = totalOrdersHistory.length;
  const deliveredCount = totalOrdersHistory.filter(o => o.status === 'delivered').length;

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
        <span style={{ color: '#fff' }}>🔔 Ready to Serve: <strong style={{ color: '#4CAF50' }}>{readyToServeOrders.length}</strong></span>
        <span style={{ color: '#fff' }}>✅ Delivered: <strong style={{ color: '#03a9f4' }}>{deliveredCount}</strong></span>
      </div>

      {/* Header with Clear All Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '22px' }}>Ready to Serve (Waiter Queue)</h2>
        
        {totalOrdersHistory.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all order history and counts?")) {
                if (typeof clearWaiterHistory === 'function') {
                  clearWaiterHistory();
                } else {
                  localStorage.removeItem('allOrdersHistory');
                  localStorage.removeItem('readyToServeOrders');
                  window.location.reload();
                }
              }
            }}
            style={{ 
              background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', 
              padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' 
            }}
          >
            🗑️ Clear All History
          </button>
        )}
      </div>
      
      {readyToServeOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(20,20,20,0.6)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#aaa', fontSize: '15px', margin: 0 }}>No orders waiting for delivery.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {readyToServeOrders.cols ? readyToServeOrders : readyToServeOrders.map((order) => (
            <div key={order.id} style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '5px solid #4CAF50', borderRadius: '8px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                <h4 style={{ margin: 0, color: '#d4af37', fontSize: '18px' }}>{order.tableNo}</h4>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#d4af37', display: 'block' }}>{order.date || new Date().toLocaleDateString()}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{order.time}</span>
                </div>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 15px 0' }}>
                {order.items.map((item, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', color: '#fff' }}>
                    <span>{item.name}</span>
                    <strong style={{ color: '#d4af37' }}>x{item.qty}</strong>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => markAsDelivered(order.id)}
                style={{ width: '100%', background: '#4CAF50', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
              >
                Mark as Delivered
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}