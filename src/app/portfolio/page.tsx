'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import { usePortfolio } from '@/hooks/usePortfolio';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { items: portfolioData, loading, error } = usePortfolio();

  const filters = ['All', 'UI/UX', 'Branding', 'Illustration', 'Graphic Design'];

  // Sample fallback data if database is empty
  const sampleItems = [
    {
      id: 'sample-1',
      title: 'Modern E-commerce Platform',
      category: 'UI/UX',
      image_url: '🛒',
      description: 'Sleek and user-friendly e-commerce interface',
    },
    {
      id: 'sample-2',
      title: 'Brand Identity System',
      category: 'Branding',
      image_url: '🎨',
      description: 'Complete brand identity and visual system',
    },
    {
      id: 'sample-3',
      title: 'Mobile Banking App',
      category: 'UI/UX',
      image_url: '📱',
      description: 'Secure and intuitive banking application',
    },
    {
      id: 'sample-4',
      title: 'Marketing Campaign Posters',
      category: 'Graphic Design',
      image_url: '🖼️',
      description: 'Eye-catching poster series for marketing',
    },
    {
      id: 'sample-5',
      title: 'Dashboard Analytics',
      category: 'UI/UX',
      image_url: '📊',
      description: 'Data visualization dashboard interface',
    },
    {
      id: 'sample-6',
      title: 'Logo Collection',
      category: 'Branding',
      image_url: '✨',
      description: 'Professional logo designs for brands',
    },
    {
      id: 'sample-7',
      title: 'Character Illustrations',
      category: 'Illustration',
      image_url: '🎭',
      description: 'Creative character design illustrations',
    },
    {
      id: 'sample-8',
      title: 'Package Design Series',
      category: 'Graphic Design',
      image_url: '📦',
      description: 'Creative packaging design concepts',
    },
    {
      id: 'sample-9',
      title: 'Travel Booking Platform',
      category: 'UI/UX',
      image_url: '✈️',
      description: 'Comprehensive travel booking system',
    },
  ];

  // Use database data if available, otherwise use sample
  const portfolioItems = portfolioData.length > 0 ? portfolioData : sampleItems;

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return portfolioItems;
    return portfolioItems.filter(item => 
      item.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [portfolioItems, activeFilter]);

  const recommendedItems = portfolioItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 py-10 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Showcase Your{" "}
              <span className="bg-gradient-to-r from-[#A2655F] via-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Discover exceptional design work from our talented community of creators
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white py-4 sm:py-6 lg:py-8 sticky top-16 sm:top-20 z-40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 border whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#5D6BC6] hover:bg-[#5D6BC6]/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="py-10 sm:py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20">
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <span className="text-5xl sm:text-6xl lg:text-7xl">{item.image_url}</span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <div className="text-white">
                          <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-0.5 sm:mb-1">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-white/80 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-white py-10 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 text-center">
              Recommended for{" "}
              <span className="bg-gradient-to-r from-[#A2655F] to-[#5D6BC6] bg-clip-text text-transparent">
                you
              </span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  {/* Image */}
                  <div className="h-36 sm:h-40 lg:h-48 bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 overflow-hidden flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
                      {item.image_url}
                    </span>
                  </div>
                  
                  {/* Content Lines */}
                  <div className="p-4 sm:p-5 lg:p-6 bg-white">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex space-x-2 sm:space-x-3">
                        <div className="h-1.5 sm:h-2 bg-gray-300 rounded flex-1"></div>
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-16 sm:w-20"></div>
                      </div>
                      <div className="flex space-x-2 sm:space-x-3">
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-12 sm:w-16"></div>
                        <div className="h-1.5 sm:h-2 bg-gray-300 rounded flex-1"></div>
                      </div>
                      <div className="flex space-x-2 sm:space-x-3">
                        <div className="h-1.5 sm:h-2 bg-gray-300 rounded flex-1"></div>
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-10 sm:w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#8B5A8C] to-[#1647A3] py-10 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to showcase your work?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of designers who trust our platform to showcase their best work
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-[#8B5A8C] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Upload Your Work
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;