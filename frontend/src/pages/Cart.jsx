import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, checkout } from '../services/api';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        // API returns an array, we take the first incomplete order
        setCart(response.data.length > 0 ? response.data[0] : null);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout();
      alert('Order placed successfully!');
      setCart(null);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error during checkout. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!cart) return <div className="text-center py-8">Your cart is empty</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.orderitem_set.map((item) => (
            <div key={item.id} className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                  {item.product.image && (
                    <img 
                      src={`http://localhost:8000${item.product.image_url}`} 
                      alt={item.product.name}
                      className="h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price} x {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">${item.total}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-xl font-bold">${cart.total}</p>
          </div>
          
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}