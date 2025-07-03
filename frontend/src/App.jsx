import React, { useState, useEffect } from 'react';
    import { Navbar } from './components/Navbar';
    import { ProductList } from './components/ProductList';
    import { ProductDetails } from './components/ProductDetails';
    import { Cart } from './components/Cart';
    import { Login } from './components/Login';
    import { Register } from './components/Register';
    import { OrderConfirmation } from './components/OrderConfirmation';
    import axios from 'axios';

    const API_URL = 'http://localhost:8000/api';

    function App() {
      const [user, setUser] = useState(null);
      const [cartItems, setCartItems] = useState([]);

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          axios.get(`${API_URL}/user/`, { headers: { Authorization: `Token ${token}` } })
            .then(response => setUser(response.data))
            .catch(() => localStorage.removeItem('token'));
        }
      }, []);

      const addToCart = (product) => {
        setCartItems(prev => {
          const existing = prev.find(item => item.id === product.id);
          return existing ? prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ) : [...prev, { ...product, quantity: 1 }];
        });
      };

      const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
      };

      const clearCart = () => setCartItems([]);

      const renderPage = () => {
        const path = window.location.pathname;
        if (path === '/login') return <Login setUser={setUser} />;
        if (path === '/register') return <Register setUser={setUser} />;
        if (path === '/cart') return <Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />;
        if (path === '/order-confirmation') return <OrderConfirmation />;
        if (path.startsWith('/product/')) return <ProductDetails addToCart={addToCart} />;
        return <ProductList addToCart={addToCart} />;
      };

      return (
        <div className="min-h-screen bg-gray-100">
          <Navbar user={user} setUser={setUser} cartItems={cartItems} />
          {renderPage()}
        </div>
      );
    }

    export default App;