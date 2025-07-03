import React from 'react';

   export function Navbar({ user, setUser, cartItems }) {
     const handleLogout = () => {
       localStorage.removeItem('token');
       setUser(null);
       window.location.href = '/';
     };

     return (
       <nav className="bg-indigo-900 text-white p-4 shadow-md fixed w-full top-0 z-10">
         <div className="container mx-auto flex justify-between items-center">
           <h1 className="text-2xl font-bold">CodeAlpha Store</h1>
           <div className="flex space-x-4 items-center">
             <a href="/" className="hover:text-indigo-300">Home</a>
             {user ? (
               <>
                 <a href="/cart" className="hover:text-indigo-300">
                   Cart ({cartItems.length})
                 </a>
                 <button onClick={handleLogout} className="hover:text-indigo-300">
                   Logout
                 </button>
               </>
             ) : (
               <>
                 <a href="/login" className="hover:text-indigo-300">Login</a>
                 <a href="/register" className="hover:text-indigo-300">Register</a>
               </>
             )}
           </div>
         </div>
       </nav>
     );
   }