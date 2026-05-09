"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/portfolio?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Trending searches for Dribbble-like chips
  const trendingSearches = [
    "landing page", "logo design", "mobile app", "illustration", "branding", "UI/UX"
  ];
  
  return (
    <div className="text-white dark:text-gray-100 relative overflow-hidden min-h-screen pt-16 sm:pt-20">
      {/* Decorative animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#234CF9]/10 rounded-full blur-[120px] animate-gentle-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1C277B]/20 rounded-full blur-[100px] animate-gentle-pulse delay-700 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#234CF9]/5 rounded-full blur-[150px] pointer-events-none" />
      {/* Konten Utama Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 flex items-center justify-center min-h-[85vh] sm:min-h-[90vh] z-20">
        <div className="max-w-3xl w-full text-center">
          {/* Eyebrow badge */}
          <div className="animate-fade-in-up mb-4 sm:mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#234CF9]/20 border border-[#234CF9]/40 text-[#DFE7F7] text-xs sm:text-sm font-medium backdrop-blur-sm animate-glow-pulse">
              <span className="w-2 h-2 rounded-full bg-[#234CF9] animate-pulse" />
              Creative Platform
            </span>
          </div>
          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-in-up">
            <span className="block text-white">{t.hero.title.split(' ').slice(0, -2).join(' ')}</span>
            <span className="block bg-gradient-to-r from-[#234CF9] via-[#DFE7F7] to-[#234CF9] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">{t.hero.title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          
          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/75 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.description}
          </p>
          
          {/* Search Bar - Dribbble style */}
          <div className="animate-fade-in-up mb-6 sm:mb-8" style={{ animationDelay: "0.4s" }}>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 sm:left-5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.common.search + " " + (t.portfolioPage?.discoverDesignWork ? "designs..." : "designs...")}
                  className="w-full pl-12 sm:pl-14 pr-28 sm:pr-36 py-4 sm:py-5 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base shadow-2xl border border-white/20 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-[#234CF9] focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 sm:px-7 py-2.5 sm:py-3 btn-primary text-white font-semibold rounded-full text-sm sm:text-base cursor-pointer"
                >
                  {t.common.search}
                </button>
              </div>
            </form>
          </div>

          {/* Trending Searches - Dribbble-like chips */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="text-[#DFE7F7]/60 text-xs sm:text-sm font-medium">Trending:</span>
              {trendingSearches.map((term, i) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    router.push(`/portfolio?q=${encodeURIComponent(term)}`);
                  }}
                  className="px-3 sm:px-4 py-1.5 bg-[#234CF9]/15 hover:bg-[#234CF9]/30 backdrop-blur-sm rounded-full text-xs sm:text-sm text-[#DFE7F7]/80 hover:text-white border border-[#234CF9]/25 hover:border-[#234CF9]/60 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(35,76,249,0.4)]"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
