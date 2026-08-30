import React from 'react';

export default function Navbar({ viewMode, setViewMode, setIsLoggedIn }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#111', color: '#fff' }}>
      
      {/* Logo */}
      <div 
        onClick={() => setViewMode('welcome')}
        style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px', color: '#d4af37', border: '2px solid #d4af37', padding: '5px 10px', cursor: 'pointer' }}
      >
        SPICY HUT
      </div>

      {/* Menu Links */}
      <div style={{ display: 'flex', gap: '30px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', alignItems: 'center' }}>
        <span 
          onClick={() => setViewMode('welcome')} 
          style={{ color: viewMode === 'welcome' ? '#d4af37' : '#f4f4f4', transition: 'color 0.3s' }}
        >
          Home
        </span>
        
        <span 
          onClick={() => setViewMode('about')} 
          style={{ color: viewMode === 'about' ? '#d4af37' : '#f4f4f4', transition: 'color 0.3s' }}
        >
          About
        </span>
        
        <span 
          onClick={() => setViewMode('contact')} 
          style={{ color: viewMode === 'contact' ? '#d4af37' : '#f4f4f4', transition: 'color 0.3s' }}
        >
          Contact
        </span>

        {/* Logout / Back to Login Option */}
        <span 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (setIsLoggedIn) setIsLoggedIn(false);
          }} 
          style={{ 
            color: '#ff6b6b', 
            border: '1px solid #ff6b6b', 
            padding: '6px 15px', 
            borderRadius: '4px',
            transition: 'all 0.3s',
            fontWeight: 'bold'
          }}
        >
          Logout
        </span>
      </div>

      {/* Phone Number */}
      <div style={{ fontSize: '16px', letterSpacing: '1px', color: '#d4af37', fontWeight: 'bold' }}>
        +91 1000 000 333
      </div>
      
    </div>
  );
}