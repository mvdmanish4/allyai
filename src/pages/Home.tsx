import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Welcome to ShopHub
          </h1>
          <p className="mt-4 text-xl text-indigo-100">
            Discover amazing products at unbeatable prices
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-block bg-white py-3 px-8 rounded-full font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center">
              <ShoppingBag className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Quality Products</h3>
            <p className="mt-2 text-gray-500">Curated selection of premium items</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Truck className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Fast Delivery</h3>
            <p className="mt-2 text-gray-500">Free shipping on orders over $50</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Secure Shopping</h3>
            <p className="mt-2 text-gray-500">100% secure payment</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}