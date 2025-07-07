import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {product.external_image_url ? (
              <img 
                src={product.external_image_url} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/placeholder.jpg';
                }}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No image</span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2">${product.price}</p>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <Link 
                to={`/products/${product.id}`} 
                className="text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </Link>
              <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}