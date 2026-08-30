import React, { useState, useEffect } from 'react';
import { initialTables } from './components/restaurantData';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TableDashboard from './components/TableDashboard';
import OrderMenu from './components/OrderMenu';
import Billing from './components/Billing';
import BillingHistoryView from './components/BillingHistoryView';
import KitchenOrders from './components/KitchenOrders';
import WaiterOrders from './components/WaiterOrders';
import Login from './components/Login';
import './App.css';

function App() {
  // Check if token exists in localStorage to manage login state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const [viewMode, setViewMode] = useState('welcome');
  
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('restaurant_tables');
    return saved ? JSON.parse(saved) : initialTables;
  });

  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  
  const [readyToServeOrders, setReadyToServeOrders] = useState(() => {
    const saved = localStorage.getItem('readyToServeOrders');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalOrdersHistory, setTotalOrdersHistory] = useState(() => {
    const saved = localStorage.getItem('allOrdersHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedBills, setCompletedBills] = useState(() => {
    const saved = localStorage.getItem('completedBillsHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurant_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('readyToServeOrders', JSON.stringify(readyToServeOrders));
  }, [readyToServeOrders]);

  useEffect(() => {
    localStorage.setItem('allOrdersHistory', JSON.stringify(totalOrdersHistory));
  }, [totalOrdersHistory]);

  useEffect(() => {
    localStorage.setItem('completedBillsHistory', JSON.stringify(completedBills));
  }, [completedBills]);

  // Strict Role-Based Access Control Function
  const handleViewChange = (targetView) => {
    const userRole = (localStorage.getItem('userRole') || '').trim().toLowerCase();

    console.log("Current Logged-in Role:", userRole);

    if (userRole === 'chef1' || userRole.includes('chef')) {
      if (targetView !== 'kitchen') {
        alert("Access Denied! Chef can only access Kitchen Orders.");
        return;
      }
    }
    else if (userRole === 'cashier1' || userRole.includes('cashier')) {
      if (targetView !== 'billing-history') {
        alert("Access Denied! Cashier can only access Billing & History.");
        return;
      }
    }
    else if (userRole === 'waiter1' || userRole.includes('waiter')) {
      if (targetView === 'kitchen' || targetView === 'billing-history') {
        alert("Access Denied! Waiter cannot access Kitchen or Billing History.");
        return;
      }
    }
    else if (userRole === 'customer1' || userRole.includes('customer')) {
      if (targetView === 'kitchen' || targetView === 'waiter-orders' || targetView === 'billing-history') {
        alert("Access Denied! Customers cannot access internal staff screens.");
        return;
      }
    }

    setViewMode(targetView);
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    if (table.status === 'Billing') {
      setViewMode('billing');
    } else {
      setViewMode('table-menu');
      setCart(table.items || []);
    }
  };

  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add items before placing order.");
      return;
    }
    
    const newOrder = {
      id: Date.now(),
      tableNo: selectedTable ? selectedTable.name : "Table",
      location: selectedTable ? selectedTable.location : "",
      items: cart,
      total: cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
      time: new Date().toLocaleTimeString(),
      status: 'pending'
    };

    const existingKitchen = JSON.parse(localStorage.getItem('kitchenOrders')) || [];
    const updatedKitchen = [newOrder, ...existingKitchen];
    localStorage.setItem('kitchenOrders', JSON.stringify(updatedKitchen));

    const updatedHistory = [newOrder, ...totalOrdersHistory];
    setTotalOrdersHistory(updatedHistory);

    setTables(
      tables.map((t) => (t.id === selectedTable.id ? { ...t, status: 'Occupied', items: cart } : t))
    );

    alert(`Order Placed Successfully for ${selectedTable.name}! Sent to Kitchen.`);
    
    setSelectedTable(null);
    setViewMode('tables');
  };

  const markAsReady = (order) => {
    setReadyToServeOrders([...readyToServeOrders, order]);
    const updatedHistory = totalOrdersHistory.map(o => o.id === order.id ? { ...o, status: 'ready' } : o);
    setTotalOrdersHistory(updatedHistory);
  };

  const markAsDelivered = (orderId) => {
    setReadyToServeOrders(readyToServeOrders.filter(o => o.id !== orderId));
    const updatedHistory = totalOrdersHistory.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o);
    setTotalOrdersHistory(updatedHistory);
    alert("Order Marked as Delivered to Table!");
  };

  const moveToBilling = (tableId) => {
    const targetTable = tables.find((t) => t.id === tableId);
    setTables(
      tables.map((t) => (t.id === tableId ? { ...t, status: 'Billing' } : t))
    );
    setSelectedTable(targetTable);
    setViewMode('billing');
  };

  const closeBill = (billData) => {
    setCompletedBills([billData, ...completedBills]);
    alert(`Payment Received via ${billData.mode}! Bill closed for ${selectedTable.name}. Table reset to Vacant.`);
    setTables(
      tables.map((t) => (t.id === selectedTable.id ? { ...t, status: 'Vacant', items: [] } : t))
    );
    setSelectedTable(null);
    setViewMode('tables');
  };

  const kitchenPendingCount = totalOrdersHistory.filter(o => o.status === 'pending').length;

  // Token లేకపోతే direct ga Login page chupistundi (QR code screen remove cheseyadamaindi)
  if (!isLoggedIn) {
    return (
      <Login 
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setViewMode('welcome'); 
        }} 
      />
    );
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', minHeight: '100vh', backgroundColor: '#0d0d0d', color: '#f4f4f4' }}>
      
      <Navbar viewMode={viewMode} setViewMode={setViewMode} setIsLoggedIn={setIsLoggedIn} />

      {['welcome', 'about', 'contact'].includes(viewMode) ? (
        <Home viewMode={viewMode} setViewMode={setViewMode} />
      ) : (
        <div style={{ 
          padding: '30px 50px', 
          minHeight: '100vh', 
          backgroundImage: `linear-gradient(rgba(13, 13, 13, 0.92), rgba(13, 13, 13, 0.92)), url('https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: '#f4f4f4'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h2 style={{ margin: 0, color: '#d4af37', fontSize: '24px' }}>
                  {viewMode === 'kitchen' 
                    ? 'Kitchen Live Orders (KDS)' 
                    : viewMode === 'waiter-orders'
                    ? 'Waiter Service Dashboard'
                    : viewMode === 'billing-history'
                    ? 'Cashier Billing Reports'
                    : viewMode === 'table-menu'
                    ? `Menu Items: ${selectedTable?.name} (${selectedTable?.location})`
                    : viewMode === 'billing'
                    ? `Billing - ${selectedTable?.name}`
                    : 'Interior Management'}
                </h2>
              </div>

              {/* Navigation Actions with Strict Role Check */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => handleViewChange('tables')}
                  style={{ 
                    background: viewMode === 'tables' ? '#fff' : '#d4af37', 
                    color: '#000', 
                    border: viewMode === 'tables' ? '2px solid #d4af37' : 'none', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '13px' 
                  }}
                >
                  🪑 Tables
                </button>

                <button
                  onClick={() => handleViewChange('kitchen')}
                  style={{ 
                    background: viewMode === 'kitchen' ? '#fff' : 'transparent', 
                    color: viewMode === 'kitchen' ? '#000' : '#d4af37', 
                    border: '1px solid #d4af37', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '13px' 
                  }}
                >
                  🍳 Kitchen ({kitchenPendingCount})
                </button>

                <button
                  onClick={() => handleViewChange('waiter-orders')}
                  style={{ 
                    background: viewMode === 'waiter-orders' ? '#fff' : '#4CAF50', 
                    color: viewMode === 'waiter-orders' ? '#000' : '#fff', 
                    border: viewMode === 'waiter-orders' ? '2px solid #4CAF50' : 'none', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '13px' 
                  }}
                >
                  🔔 Waiter ({readyToServeOrders.length})
                </button>

                <button
                  onClick={() => handleViewChange('billing-history')}
                  style={{ 
                    background: viewMode === 'billing-history' ? '#fff' : '#2196F3', 
                    color: viewMode === 'billing-history' ? '#000' : '#fff', 
                    border: viewMode === 'billing-history' ? '2px solid #2196F3' : 'none', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontSize: '13px' 
                  }}
                >
                  📊 History ({completedBills.length})
                </button>

                {/* Switch to Login / Change Role Option */}
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userRole');
                    setIsLoggedIn(false);
                  }}
                  style={{ background: 'transparent', color: '#ffb703', border: '1px solid #ffb703', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  🔄 Switch to Login
                </button>
              </div>
            </div>

            {viewMode === 'tables' && (
              <TableDashboard 
                tables={tables} 
                handleTableClick={handleTableClick} 
                moveToBilling={moveToBilling} 
              />
            )}

            {viewMode === 'table-menu' && (
              <OrderMenu 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
                placeOrder={placeOrder} 
                selectedTable={selectedTable}
              />
            )}

            {viewMode === 'billing' && (
              <Billing 
                selectedTable={selectedTable} 
                closeBill={closeBill} 
              />
            )}

            {viewMode === 'billing-history' && (
              <BillingHistoryView billingHistory={completedBills} />
            )}

            {viewMode === 'kitchen' && (
              <KitchenOrders markAsReady={markAsReady} totalOrdersHistory={totalOrdersHistory} />
            )}

            {viewMode === 'waiter-orders' && (
              <WaiterOrders 
                readyToServeOrders={readyToServeOrders} 
                markAsDelivered={markAsDelivered} 
                totalOrdersHistory={totalOrdersHistory}
              />
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;