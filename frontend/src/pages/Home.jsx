import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our E-Commerce Store</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover amazing products at great prices. Shop now and enjoy a seamless shopping experience.
      </p>
      <Link
        to="/products"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}