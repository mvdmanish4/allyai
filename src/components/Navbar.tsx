import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isChatView: boolean;
}

export default function Navbar({ searchQuery, setSearchQuery, onSearch, isChatView }: NavbarProps) {
  const [showTrending, setShowTrending] = useState(false);
  const [filteredSearches, setFilteredSearches] = useState<string[]>([]);

  const defaultSearches = [
    "Vintage denim jackets",
    "Distressed jeans",
    "Classic straight leg",
    "Dark wash denim",
    "Black jeans",
    "All products"
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = defaultSearches.filter(search =>
        search.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSearches([searchQuery, ...filtered.filter(s => s.toLowerCase() !== searchQuery.toLowerCase())]);
    } else {
      setFilteredSearches(defaultSearches);
    }
  }, [searchQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Form submitted:', searchQuery);
      onSearch(searchQuery);
      setShowTrending(false);
    }
  };

  const handleSearchClick = (query: string) => {
    console.log('Row clicked with query:', query);
    onSearch(query);
    setSearchQuery(query);
    setShowTrending(false);
  };

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ShopHub
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowTrending(true)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                />
              </div>
            </form>

            {/* Search Dropdown */}
            {showTrending && (
              <div
                className="absolute mt-1 w-full bg-white rounded-md shadow-lg py-2 border border-gray-200"
                onMouseDown={(e) => e.preventDefault()}
              >
                {filteredSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSearchClick(search)} // Log when the row is clicked
                  >
                    <div className="flex items-center space-x-3 text-left flex-grow">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent `onClick`
                        console.log('Browse for Me clicked with query:', search);
                        handleSearchClick(search); // Log when "Browse for Me" is clicked
                      }}
                      className="ml-2 px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                    >
                      Browse for Me
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isChatView && (
              <Link to="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
            )}
            <button className="text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close trending searches when clicking outside */}
      {showTrending && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowTrending(false)}
        />
      )}
    </nav>
  );
}
