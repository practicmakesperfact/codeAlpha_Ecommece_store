import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">E-Shop</Link>
        <div className="flex items-center space-x-4">
          <Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 flex items-center">
            <ShoppingCartIcon className="h-5 w-5 mr-1" />
            Cart
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600 flex items-center">
            <UserIcon className="h-5 w-5 mr-1" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}