import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const API_URL = 'http://localhost:8000/api';

   export function ProductDetails({ addToCart }) {
     const [product, setProduct] = useState(null);
     const id = window.location.pathname.split('/').pop();

     useEffect(() => {
       axios.get(`${API_URL}/products/${id}/`)
         .then(response => setProduct(response.data))
         .catch(error => console.error('Error fetching product:', error));
     }, [id]);

     if (!product) return <div className="container mx-auto p-4 pt-20">Loading...</div>;

     return (
       <div className="container mx-auto p-4 pt-20">
         <div className="flex flex-col md:flex-row gap-8">
           <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded-md" />
           <div className="flex-1">
             <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h2>
             <p className="text-gray-600 mb-4">{product.description}</p>
             <p className="text-2xl font-bold text-gray-800 mb-4">${product.price}</p>
             <button
               onClick={() => addToCart(product)}
               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
             >
               Add to Cart
             </button>
           </div>
         </div>
       </div>
     );
   }