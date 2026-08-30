import React, { useState } from 'react';


export default function TableDashboard({ tables, handleTableClick, moveToBilling, setViewMode }) {
  const [selectedFloor, setSelectedFloor] = useState('All');

  const filteredTables = selectedFloor === 'All' 
    ? tables 
    : tables.filter(t => t.floor === selectedFloor);

  const categoryOrder = [
    'Ground Floor (Main Dining)',
    'Balcony (Street View)',
    'Indoor AC Hall',
    'Rooftop Open Air'
  ];

  const tableCategories = [...new Set(filteredTables.map(t => t.category))].sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  const categoryTitles = {
    'Ground Floor (Main Dining)': '📜 Vintage Ground Floor (Main Dining)',
    'Balcony (Street View)': '✨ Special Balcony (Street View)',
    'Indoor AC Hall': '❄️ First Floor (Indoor AC Hall)',
    'Rooftop Open Air': '🌅 First Floor (Rooftop Open Air)'
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '15px', margin: '20px 0', alignItems: 'center', flexWrap: 'wrap' }}>
        
        

        <span style={{ fontWeight: 'bold', color: '#aaa', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' }}>Filter Floor:</span>
        {['All', 'Ground Floor', 'First Floor'].map((floor) => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            style={{
              padding: '8px 16px',
              background: selectedFloor === floor ? '#d4af37' : 'rgba(20, 20, 20, 0.8)',
              color: selectedFloor === floor ? '#000' : '#f4f4f4',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            {floor}
          </button>
        ))}
      </div>

      {tableCategories.map((cat) => {
        const categoryTables = filteredTables.filter(t => t.category === cat);
        return (
          <div key={cat} style={{ marginTop: '35px' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', color: '#d4af37', fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '20px' }}>
              {categoryTitles[cat] || cat}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {categoryTables.map((table) => {
                let statusColor = '#4CAF50';
                let statusText = 'Available';
                if (table.status === 'Occupied') {
                  statusColor = '#F44336';
                  statusText = 'Occupied';
                }
                if (table.status === 'Billing') {
                  statusColor = '#FF9800';
                  statusText = 'Billing';
                }

                return (
                  <div
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    style={{
                      backgroundColor: 'rgba(20, 20, 20, 0.85)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(5px)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }}></div>
                      <span style={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}>{statusText}</span>
                    </div>

                    <div style={{
                      width: '85px',
                      height: '85px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(15,15,15,0.95) 85%)',
                      border: `3px solid ${statusColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                      color: '#f4f4f4',
                      boxShadow: `0 0 12px rgba(0,0,0,0.8), inset 0 0 6px ${statusColor}`
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d4af37', lineHeight: '1.1' }}>
                        {table.name.replace('Table ', 'T-').replace('Balcony ', 'B-').replace('Rooftop ', 'R-').replace('AC Hall ', 'AC-')}
                      </span>
                      <span style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>
                        👥 {table.capacity} Seats
                      </span>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '2px' }}>
                      {table.name}
                    </div>

                    <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      📍 {table.location}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleTableClick(table); }}
                        style={{ background: '#d4af37', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', flex: 1 }}
                      >
                        Order
                      </button>

                      {table.status === 'Occupied' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); moveToBilling(table.id); }}
                          style={{ background: 'transparent', color: '#d4af37', border: '1px solid #d4af37', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', flex: 1 }}
                        >
                          Bill
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}