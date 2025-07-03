import React, { useState } from 'react';
   import axios from 'axios';

   const API_URL = 'http://localhost:8000/api';

   export function Login({ setUser }) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState(null);

     const handleSubmit = (e) => {
       e.preventDefault();
       axios.post(`${API_URL}/login/`, { email, password })
         .then(response => {
           localStorage.setItem('token', response.data.token);
           setUser(response.data.user);
           window.location.href = '/';
         })
         .catch(error => setError('Invalid credentials'));
     };

     return (
       <div className="container mx-auto p-4 pt-20 max-w-md">
         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
         {error && <p className="text-red-600 mb-4">{error}</p>}
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-gray-700">Email</label>
             <input
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
               required
             />
           </div>
           <div>
             <label className="block text-gray-700">Password</label>
             <input
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
               required
             />
           </div>
           <button
             type="submit"
             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
           >
             Login
           </button>
         </form>
         <p className="mt-4 text-center">
           Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
         </p>
       </div>
     );
   }