import React, { useState } from 'react';

export default function Home({ viewMode, setViewMode }) {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = () => {
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      alert("Please fill in all contact fields!");
      return;
    }
    alert("Message Sent Successfully!");
    setContactName('');
    setContactPhone('');
    setContactMessage('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      justifyContent: 'space-between',
      backgroundImage: `linear-gradient(rgba(13, 13, 13, 0.45), rgba(13, 13, 13, 0.45)), url('/restaurant-bg.jpg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {viewMode === 'welcome' && (
        <div style={{ display: 'flex', flex: 1, padding: '60px 80px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'center', maxWidth: '500px' }}>
            <h1 style={{ 
              fontSize: '28px', 
              lineHeight: '1.3', 
              fontWeight: 'bold', 
              color: '#f5c518', 
              margin: '0 0 12px 0', 
              fontFamily: 'Georgia, serif', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.9)' 
            }}>
              GOOD TIMES WITH <br />GREAT FRIENDS AND FAMILY
            </h1>

            <p style={{ 
              fontSize: '13px',
              textAlign:'center', 
              color: '#ffffff', 
              lineHeight: '1.5', 
              marginBottom: '8px', 
              textShadow: '1px 1px 4px rgba(0,0,0,0.9)' 
            }}>
              📍 #12/4, MG Road, Paradise Circle, Secunderabad, TS<br />
              Located in Gourmet Food Hub
            </p>

            <p style={{ 
              fontSize: '12px', 
              textAlign:'left',
              color: '#ffffff', 
              marginBottom: '20px', 
              textShadow: '1px 1px 4px rgba(0,0,0,0.9)' 
            }}>
              🕒 Mon-Sun: Noon to Midnight
            </p>

            <div>
              <button
                onClick={() => setViewMode('tables')}
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#f5c518',
                  border: '1.5px solid #f5c518',
                  padding: '8px 20px',
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                }}
              >
                Unlock The Magic! 🎉→
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'about' && (
        <div style={{ flex: 1, padding: '50px 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center', background: 'rgba(0, 0, 0, 0.75)', borderRadius: '8px', marginBlock: 'auto' }}>
          <h2 style={{ color: '#d4af37', fontSize: '38px', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>About Spicy Hut</h2>
          <p style={{ fontSize: '16px', color: '#ddd', lineHeight: '1.8', marginBottom: '20px' }}>
            Founded in 2019 right in the heart of Secunderabad's Gourmet Food Hub, Spicy Hut has been a premier destination for food lovers seeking rich flavors, warm ambiance, and extraordinary hospitality.
          </p>
          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.7', marginBottom: '30px' }}>
            Whether you're looking for a cozy family dinner in our indoor AC hall, a breezy evening out on our balconies, or vibrant conversations under the open sky on our rooftop, we craft experiences that linger long after the last bite.
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', color: '#d4af37', letterSpacing: '2px', fontSize: '14px', textTransform: 'uppercase' }}>
            Taste the Tradition • Live the Experience
          </div>
        </div>
      )}

      {viewMode === 'contact' && (
        <div style={{ flex: 1, padding: '50px 100px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ color: '#d4af37', fontSize: '38px', textAlign: 'center', marginBottom: '10px', fontFamily: 'Georgia, serif', textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>Get in Touch</h2>
          <p style={{ textAlign: 'center', color: '#ddd', marginBottom: '40px', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>We would love to hear from you. Reach out for reservations or feedback!</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div style={{ background: 'rgba(20, 20, 20, 0.9)', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', backdropFilter: 'blur(5px)' }}>
              <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '15px' }}>Contact Details</h3>
              <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}>
                📍 <strong>Address:</strong><br />
                #12/4, MG Road, Paradise Circle, Secunderabad, TS<br />
                (Located in Gourmet Food Hub)
              </p>
              <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}>
                📞 <strong>Phone:</strong> +91 98765 43210
              </p>
              <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>
                🕒 <strong>Hours:</strong> Mon-Sun: Noon to Midnight
              </p>
            </div>

            <div style={{ background: 'rgba(20, 20, 20, 0.9)', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '15px', backdropFilter: 'blur(5px)' }}>
              <h3 style={{ color: '#d4af37', marginTop: 0, marginBottom: '5px' }}>Send a Message</h3>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)} 
                style={{ padding: '10px', background: 'rgba(13, 13, 13, 0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} 
              />
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={contactPhone} 
                onChange={(e) => setContactPhone(e.target.value)} 
                style={{ padding: '10px', background: 'rgba(13, 13, 13, 0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} 
              />
              <textarea 
                placeholder="Your Message" 
                rows="3" 
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)} 
                style={{ padding: '10px', background: 'rgba(13, 13, 13, 0.8)', border: '1px solid #333', color: '#fff', borderRadius: '4px', resize: 'none' }}
              ></textarea>
              <button 
                onClick={handleContactSubmit} 
                style={{ background: '#d4af37', color: '#000', border: 'none', padding: '10px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
              >
                Submit Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '20px 50px', background: 'rgba(0, 0, 0, 0.8)', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '12px', color: '#aaa', letterSpacing: '1px' }}>
        © 2026 Spicy Hut Restaurant Management System. All Rights Reserved.
      </div>
    </div>
  );
}