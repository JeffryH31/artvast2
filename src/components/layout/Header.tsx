"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../ui/Icons";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useRole } from "@/hooks/useRole";
import AuthModal from "../auth/AuthModal";
import { ThemeToggle } from "../ui/ThemeToggle";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const pathname = usePathname();
  
  const { user, loading, signOut } = useAuth();
  const { role, isDesigner, isAdmin } = useRole();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-3xl shadow-2xl shadow-black/5 dark:shadow-black/20"
            : "bg-white/60 dark:bg-gray-900/70 backdrop-blur-2xl"
        }`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none animate-gradient"></div>
        
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo Section - Enhanced */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                <div className="relative">
                  {/* Animated glow */}
                  <div className="absolute inset-0 custom-gradient-bg rounded-xl sm:rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
                  {/* Logo box */}
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 custom-gradient-bg rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg sm:shadow-xl">
                    <span className="text-white font-black text-base sm:text-lg lg:text-xl">A</span>
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl lg:text-2xl font-black custom-gradient-text group-hover:scale-105 transition-transform duration-300">
                    Artvast
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5 sm:-mt-1 font-medium hidden sm:block">Creative Platform</span>
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
                      ? 'text-gray-900 dark:text-white font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
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
                      ? 'text-gray-900 dark:text-white font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
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
                      ? 'text-gray-900 dark:text-white font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className={`absolute inset-0 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                    isActive('/marketplace') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Marketplace</span>
                    <span className={`w-1.5 h-1.5 bg-pink-500 rounded-full transition-opacity duration-300 ${
                      isActive('/marketplace') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                  </span>
                </Link>

                {/* Designer Menu - Only for designers */}
                {isDesigner && (
                  <Link
                    href="/designer/products"
                    className={`relative px-5 py-2.5 rounded-xl overflow-hidden group ${
                      pathname?.startsWith('/designer') 
                        ? 'text-gray-900 dark:text-white font-semibold' 
                        : 'text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className={`absolute inset-0 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-xl transition-all duration-300 ${
                      pathname?.startsWith('/designer') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                    <span className="relative z-10 flex items-center space-x-1">
                      <span>My Products</span>
                      <span className={`w-1.5 h-1.5 bg-green-500 rounded-full transition-opacity duration-300 ${
                        pathname?.startsWith('/designer') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}></span>
                    </span>
                  </Link>
                )}
                
                <a
                  href="#services"
                  className="relative px-5 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:text-gray-900 dark:hover:text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="absolute inset-0 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></span>
                  <span className="relative z-10">Services</span>
                </a>

                {/* Divider */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-2"></div>

                {/* Auth Section */}
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                ) : user ? (
                  /* Logged in user */
                  <div className="flex items-center space-x-3">
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    
                    {/* Cart Icon with Badge */}
                    <Link 
                      href="/cart"
                      className="relative p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 group"
                    >
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#5D6BC6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>

                    {/* User Menu */}
                    <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5D6BC6] to-[#1647A3] flex items-center justify-center text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium max-w-[120px] truncate">
                        {user.email?.split('@')[0]}
                      </span>
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="relative px-4 py-2 text-gray-600 dark:text-gray-400 font-medium rounded-xl hover:text-gray-900 dark:hover:text-white overflow-hidden group border border-gray-200/50 dark:border-gray-700/50 hover:border-red-300/50 dark:hover:border-red-500/50 hover:bg-red-50/50 dark:hover:bg-red-900/30 transition-all duration-300"
                    >
                      <span className="relative z-10">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  /* Not logged in */
                  <>
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="relative px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:text-gray-900 dark:hover:text-white overflow-hidden group border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Sign In</span>
                    </button>

                    {/* Premium Get Started Button */}
                    <button 
                      onClick={() => openAuthModal('signup')}
                      className="relative ml-2 group overflow-hidden rounded-xl"
                    >
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
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 shadow-lg sm:shadow-xl hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MenuIcon />
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent"></div>
      </header>

      {/* Mobile Menu - Premium Glassmorphism */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-20 sm:top-24 right-3 left-3 sm:right-4 sm:left-4 bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative p-4 sm:p-6 space-y-1 sm:space-y-2">
              <Link 
                href="/" 
                className={`block px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm sm:text-base ${
                  isActive('/') ? 'text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/portfolio" 
                className={`block px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm sm:text-base ${
                  isActive('/portfolio') ? 'text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="/marketplace" 
                className={`block px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm sm:text-base ${
                  isActive('/marketplace') ? 'text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300 font-medium'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <a 
                href="#services" 
                className="block px-4 sm:px-6 py-3 sm:py-4 text-gray-700 dark:text-gray-300 font-medium rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm sm:text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>

              {/* Designer Menu - Mobile */}
              {isDesigner && (
                <Link 
                  href="/designer/products" 
                  className={`block px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm sm:text-base ${
                    pathname?.startsWith('/designer') ? 'text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300 font-medium'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>My Products</span>
                  </span>
                </Link>
              )}
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-3 sm:my-4"></div>
              
              {/* Mobile Auth Section */}
              {loading ? (
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              ) : user ? (
                <>  
                  <div className="flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/50 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5D6BC6] to-[#1647A3] flex items-center justify-center text-white font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-red-600 dark:text-red-400 font-medium rounded-xl sm:rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all duration-300 text-sm sm:text-base"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>  
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-gray-700 dark:text-gray-300 font-medium rounded-xl sm:rounded-2xl hover:bg-white/60 dark:hover:bg-gray-700/60 border border-gray-200 dark:border-gray-700 transition-all duration-300 text-sm sm:text-base"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signup');
                    }}
                    className="w-full custom-gradient-bg text-white font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
