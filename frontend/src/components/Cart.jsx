import React from 'react';
   import axios from 'axios';

   const API_URL = 'http://localhost:8000/api';

   export function Cart({ cartItems, removeFromCart, clearCart }) {
     const handleCheckout = () => {
       const token = localStorage.getItem('token');
       if (!token) {
         alert('Please log in to checkout');
         window.location.href = '/login';
         return;
       }
       axios.post(
         `${API_URL}/orders/`,
         { items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity, price: item.price })) },
         { headers: { Authorization: `Token ${token}` } }
       )
         .then(response => {
           alert('Order placed successfully!');
           clearCart();
           window.location.href = '/order-confirmation';
         })
         .catch(error => alert('Error placing order: ' + error.message));
     };

     const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

     return (
       <div className="container mx-auto p-4 pt-20">
         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
         {cartItems.length === 0 ? (
           <p className="text-gray-600">Your cart is empty.</p>
         ) : (
           <>
             {cartItems.map(item => (
               <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow">
                 <div className="flex items-center">
                   <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                   <div>
                     <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                     <p className="text-gray-600">${item.price} x {item.quantity}</p>
                   </div>
                 </div>
                 <button
                   onClick={() => removeFromCart(item.id)}
                   className="text-red-600 hover:text-red-800"
                 >
                   Remove
                 </button>
               </div>
             ))}
             <div className="text-right">
               <p className="text-xl font-bold text-gray-800 mb-4">Total: ${total.toFixed(2)}</p>
               <button
                 onClick={handleCheckout}
                 className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
               >
                 Checkout
               </button>
             </div>
           </>
         )}
       </div>
     );
   }