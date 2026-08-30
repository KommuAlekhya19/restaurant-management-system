import React from 'react';

export default function BillingHistoryView({ billingHistory, clearHistory }) {
  
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all billing history reports?")) {
      if (typeof clearHistory === 'function') {
        clearHistory();
      } else {
        localStorage.removeItem('completedBillsHistory');
        window.location.reload();
      }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(20, 20, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '30px', color: '#fff' }}>
      
      {/* Header with Title and Clear Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ color: '#d4af37', margin: 0, fontFamily: 'Georgia, serif', fontSize: '24px' }}>
          Cashier Billing History & Reports
        </h3>

        {billingHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            style={{ 
              background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', 
              padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' 
            }}
          >
            🗑️ Clear History
          </button>
        )}
      </div>

      {billingHistory.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa', padding: '30px' }}>No billing history available yet. Closed bills will appear here automatically.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #444', color: '#d4af37' }}>
                <th style={{ padding: '12px' }}>Bill ID</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Table</th>
                <th style={{ padding: '12px' }}>Customer Name</th>
                <th style={{ padding: '12px' }}>Phone</th>
                <th style={{ padding: '12px' }}>Total Amount</th>
                <th style={{ padding: '12px' }}>Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{bill.id}</td>
                  <td style={{ padding: '12px' }}>{bill.date}</td>
                  <td style={{ padding: '12px' }}>{bill.tableName}</td>
                  <td style={{ padding: '12px' }}>{bill.customer}</td>
                  <td style={{ padding: '12px' }}>{bill.phone}</td>
                  <td style={{ padding: '12px', color: '#4CAF50', fontWeight: 'bold' }}>₹{bill.amount}</td>
                  <td style={{ padding: '12px' }}>{bill.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}