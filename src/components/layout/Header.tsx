"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../ui/Icons";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/80 backdrop-blur-3xl shadow-2xl shadow-black/5"
            : "bg-white/60 backdrop-blur-2xl"
        }`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none animate-gradient"></div>
        
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section - Enhanced */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  {/* Animated glow */}
                  <div className="absolute inset-0 custom-gradient-bg rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
                  {/* Logo box */}
                  <div className="relative w-12 h-12 custom-gradient-bg rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <span className="text-white font-black text-xl">A</span>
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black custom-gradient-text group-hover:scale-105 transition-transform duration-300">
                    Artvast
                  </span>
                  <span className="text-[10px] text-gray-500 -mt-1 font-medium">Creative Platform</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Premium */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {/* Navigation Links with Glass Effect */}
                <Link
                  href="/"
                  className={`relative px-5 py-2.5 rounded-xl overflow-hidden group ${
                    isActive('/') 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-700 font-medium hover:text-gray-900'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                    isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Home</span>
                    <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full transition-opacity duration-300 ${
                      isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                  </span>
                </Link>
                
                <Link
                  href="/portfolio"
                  className={`relative px-5 py-2.5 rounded-xl overflow-hidden group ${
                    isActive('/portfolio') 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-700 font-medium hover:text-gray-900'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                    isActive('/portfolio') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Portfolio</span>
                    <span className={`w-1.5 h-1.5 bg-purple-500 rounded-full transition-opacity duration-300 ${
                      isActive('/portfolio') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                  </span>
                </Link>
                
                <Link
                  href="/marketplace"
                  className={`relative px-5 py-2.5 rounded-xl overflow-hidden group ${
                    isActive('/marketplace') 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-700 font-medium hover:text-gray-900'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                    isActive('/marketplace') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Marketplace</span>
                    <span className={`w-1.5 h-1.5 bg-pink-500 rounded-full transition-opacity duration-300 ${
                      isActive('/marketplace') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                  </span>
                </Link>
                
                <a
                  href="#services"
                  className="relative px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:text-gray-900 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></span>
                  <span className="relative z-10">Services</span>
                </a>

                {/* Divider */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>

                {/* CTA Buttons */}
                <button className="relative px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:text-gray-900 overflow-hidden group border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Sign In</span>
                </button>

                {/* Premium Get Started Button */}
                <button className="relative ml-2 group overflow-hidden rounded-xl">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 custom-gradient-bg animate-gradient-shift"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 custom-gradient-bg blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative z-10 flex items-center space-x-2 px-8 py-3 text-white font-bold">
                    <span>Get Started</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  
                  {/* Border glow */}
                  <span className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"></span>
                </button>
              </div>
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-3 rounded-2xl bg-white/60 backdrop-blur-xl hover:bg-white/80 text-gray-700 hover:text-gray-900 transition-all duration-300 border border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MenuIcon />
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
      </header>

      {/* Mobile Menu - Premium Glassmorphism */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-24 right-4 left-4 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative p-6 space-y-2">
              <Link 
                href="/" 
                className={`block px-6 py-4 rounded-2xl hover:bg-white/60 transition-all duration-300 ${
                  isActive('/') ? 'text-gray-900 font-semibold bg-white/50' : 'text-gray-700 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/portfolio" 
                className={`block px-6 py-4 rounded-2xl hover:bg-white/60 transition-all duration-300 ${
                  isActive('/portfolio') ? 'text-gray-900 font-semibold bg-white/50' : 'text-gray-700 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="/marketplace" 
                className={`block px-6 py-4 rounded-2xl hover:bg-white/60 transition-all duration-300 ${
                  isActive('/marketplace') ? 'text-gray-900 font-semibold bg-white/50' : 'text-gray-700 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <a 
                href="#services" 
                className="block px-6 py-4 text-gray-700 font-medium rounded-2xl hover:bg-white/60 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
              
              <button className="w-full px-6 py-4 text-gray-700 font-medium rounded-2xl hover:bg-white/60 border border-gray-200 transition-all duration-300">
                Sign In
              </button>
              <button className="w-full custom-gradient-bg text-white font-bold px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
