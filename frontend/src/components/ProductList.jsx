import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { API_URL } from './config';

  export function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchProducts = async () => {
        const url = `${API_URL}/products/`.replace(/\/+$/, ''); // Remove trailing slashes
        console.log('Constructed URL:', url); // Debug the URL
        try {
          const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('API Response:', response.data);
          setProducts(response.data);
          setError(null);
        } catch (error) {
          console.error('Fetch Error Details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config?.url,
          });
          setError(`Failed to fetch products: ${error.message}`);
        }
      };
      fetchProducts();
    }, []);

    if (error) return <div className="container mx-auto p-4 pt-20 text-red-600">{error}</div>;

    return (
      <div className="container mx-auto p-4 pt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              <a href={`/product/${product.id}`} className="mt-2 block text-center text-blue-600 hover:underline">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }