import React from 'react';
import { MenuIcon } from '../ui/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-black/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ArtVast
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-gray-900 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
              >
                <span className="relative z-10">About Us</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
              >
                <span className="relative z-10">Categories</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;