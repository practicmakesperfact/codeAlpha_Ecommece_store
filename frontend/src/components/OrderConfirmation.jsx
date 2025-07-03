import React from 'react';

   export function OrderConfirmation() {
     return (
       <div className="container mx-auto p-4 pt-20 text-center">
         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Confirmed!</h2>
         <p className="text-gray-600 mb-4">Thank you for your purchase. You'll receive a confirmation soon.</p>
         <a href="/" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
           Back to Home
         </a>
       </div>
     );
   }