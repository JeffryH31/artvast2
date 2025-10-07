'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'UI/UX', 'GRAPHIC DESIGN'];

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern E-commerce Platform',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
      description: 'Sleek and user-friendly e-commerce interface',
    },
    {
      id: 2,
      title: 'Brand Identity System',
      category: 'GRAPHIC DESIGN',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center',
      description: 'Complete brand identity and visual system',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
      description: 'Secure and intuitive banking application',
    },
    {
      id: 4,
      title: 'Marketing Campaign Posters',
      category: 'GRAPHIC DESIGN',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop&crop=center',
      description: 'Eye-catching poster series for marketing',
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      description: 'Data visualization dashboard interface',
    },
    {
      id: 6,
      title: 'Logo Collection',
      category: 'GRAPHIC DESIGN',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop&crop=center',
      description: 'Professional logo designs for brands',
    },
    {
      id: 7,
      title: 'Social Media App',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center',
      description: 'Modern social networking platform',
    },
    {
      id: 8,
      title: 'Package Design Series',
      category: 'GRAPHIC DESIGN',
      image: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop&crop=center',
      description: 'Creative packaging design concepts',
    },
    {
      id: 9,
      title: 'Travel Booking Platform',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop&crop=center',
      description: 'Comprehensive travel booking system',
    },
  ];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const recommendedItems = [
    {
      id: 101,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center',
      title: 'Web Development Project',
    },
    {
      id: 102,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop&crop=center',
      title: 'Brand Identity Design',
    },
    {
      id: 103,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
      title: 'Mobile App Interface',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Showcase Your{" "}
              <span className="bg-gradient-to-r from-[#A2655F] via-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional design work from our talented community of creators
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white py-8 sticky top-20 z-40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border ${
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
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-64 bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const colors = ['BD9587', 'A2655F', '8B5A8C', '5D6BC6', '1647A3'];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        e.currentTarget.src = `https://via.placeholder.com/400x300/${randomColor}/ffffff?text=${encodeURIComponent(item.category)}`;
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-white/80">{item.description}</p>
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
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Recommended for{" "}
              <span className="bg-gradient-to-r from-[#A2655F] to-[#5D6BC6] bg-clip-text text-transparent">
                you
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/400x200/BD9587/ffffff?text=Project`;
                      }}
                    />
                  </div>
                  
                  {/* Content Lines */}
                  <div className="p-6 bg-white">
                    <div className="space-y-3">
                      <div className="flex space-x-3">
                        <div className="h-2 bg-gray-300 rounded flex-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-2 bg-gray-200 rounded w-16"></div>
                        <div className="h-2 bg-gray-300 rounded flex-1"></div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-2 bg-gray-300 rounded flex-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-12"></div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="h-2 bg-gray-200 rounded w-24"></div>
                        <div className="h-2 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#8B5A8C] to-[#1647A3] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to showcase your work?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of designers who trust our platform to showcase their best work
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#8B5A8C] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Upload Your Work
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
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