import React, { useState } from 'react';

export default function Billing({ selectedTable, closeBill }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI');

  const calculateTotal = () => {
    const itemsToCalc = selectedTable?.items || [];
    return itemsToCalc.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const handleCloseBillClick = () => {
    if (!customerName.trim()) {
      alert("Please enter a valid customer name!");
      return;
    }
    const phoneRegex = /^[789]\d{9}$/;
    if (!phoneRegex.test(customerPhone)) {
      alert("Invalid Phone Number! Must be exactly 10 digits and start with 7, 8, or 9.");
      return;
    }

    const billData = {
      id: 'B00' + Math.floor(Math.random() * 900 + 100),
      date: new Date().toLocaleDateString(),
      customer: customerName,
      phone: customerPhone,
      items: selectedTable?.items || [],
      amount: calculateTotal(),
      mode: paymentMode,
      tableName: selectedTable?.name || 'Table'
    };

    closeBill(billData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(20, 20, 20, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '30px', color: '#fff' }}>
      <h3 style={{ color: '#d4af37', textAlign: 'center', marginTop: 0, marginBottom: '20px', fontFamily: 'Georgia, serif', fontSize: '24px' }}>
        Bill Summary - {selectedTable?.name}
      </h3>
      
      <div style={{ marginBottom: '20px' }}>
        {selectedTable?.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
            <span>{item.name} (x{item.qty})</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginTop: '15px', color: '#d4af37' }}>
          <span>Grand Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Customer Name</label>
          <input 
            type="text" 
            placeholder="Enter Customer Name" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            style={{ width: '100%', padding: '10px', background: 'rgba(13,13,13,0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px', boxSizing: 'box-sizing' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Phone Number (10 digits starting with 7, 8, 9)</label>
          <input 
            type="text" 
            placeholder="Enter Phone Number" 
            value={customerPhone} 
            onChange={(e) => setCustomerPhone(e.target.value)} 
            style={{ width: '100%', padding: '10px', background: 'rgba(13,13,13,0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px', boxSizing: 'box-sizing' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Payment Mode</label>
          <select 
            value={paymentMode} 
            onChange={(e) => setPaymentMode(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'rgba(13,13,13,0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px', boxSizing: 'box-sizing' }}
          >
            <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
            <option value="Cash">Cash</option>
            <option value="Credit/Debit Card">Credit / Debit Card</option>
          </select>
        </div>

        <button 
          onClick={handleCloseBillClick}
          style={{ background: '#d4af37', color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontSize: '15px' }}
        >
          Receive Payment & Close Bill
        </button>
      </div>
    </div>
  );
}