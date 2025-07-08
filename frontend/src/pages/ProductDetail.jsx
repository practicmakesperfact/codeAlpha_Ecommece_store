import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Please login to add items to cart');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-gray-100 rounded-lg flex items-center justify-center p-8">
          {product.image ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="max-h-96 object-contain"
            />
          ) : (
            <span className="text-gray-500">No image available</span>
          )}
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-indigo-600 mt-2">${product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          
          <div className="mt-6">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 w-20"
            />
          </div>
          
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}