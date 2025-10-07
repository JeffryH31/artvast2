'use client';

import React, { useState } from 'react';

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'UI/UX', 'Graphic Design', 'Branding', 'Motion Graphics'];

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern E-commerce Platform',
      category: 'UI/UX',
      image: 'https://via.placeholder.com/400x300/5D6BC6/ffffff?text=UI/UX+Project',
      description: 'Sleek and user-friendly e-commerce interface with seamless navigation',
      tags: ['React', 'Figma', 'User Research'],
    },
    {
      id: 2,
      title: 'Brand Identity System',
      category: 'Branding',
      image: 'https://via.placeholder.com/400x300/8B5A8C/ffffff?text=Branding+Project',
      description: 'Complete brand identity including logo, colors, and guidelines',
      tags: ['Logo Design', 'Brand Guidelines', 'Typography'],
    },
    {
      id: 3,
      title: 'Mobile App Design',
      category: 'UI/UX',
      image: 'https://via.placeholder.com/400x300/A2655F/ffffff?text=Mobile+App',
      description: 'Intuitive mobile application with modern design principles',
      tags: ['Mobile UI', 'Prototyping', 'User Testing'],
    },
    {
      id: 4,
      title: 'Poster Campaign Series',
      category: 'Graphic Design',
      image: 'https://via.placeholder.com/400x300/BD9587/ffffff?text=Poster+Design',
      description: 'Creative poster series for marketing campaign',
      tags: ['Print Design', 'Typography', 'Visual Impact'],
    },
    {
      id: 5,
      title: 'Animated Logo Reveal',
      category: 'Motion Graphics',
      image: 'https://via.placeholder.com/400x300/1647A3/ffffff?text=Motion+Graphics',
      description: 'Dynamic logo animation for brand introduction',
      tags: ['After Effects', 'Animation', 'Branding'],
    },
    {
      id: 6,
      title: 'Website Landing Page',
      category: 'UI/UX',
      image: 'https://via.placeholder.com/400x300/5D6BC6/ffffff?text=Landing+Page',
      description: 'High-converting landing page with modern aesthetics',
      tags: ['Web Design', 'Conversion', 'Responsive'],
    },
    {
      id: 7,
      title: 'Corporate Brochure',
      category: 'Graphic Design',
      image: 'https://via.placeholder.com/400x300/8B5A8C/ffffff?text=Brochure+Design',
      description: 'Professional corporate brochure with elegant layout',
      tags: ['Print Design', 'Layout', 'Corporate'],
    },
    {
      id: 8,
      title: 'Product Promo Video',
      category: 'Motion Graphics',
      image: 'https://via.placeholder.com/400x300/A2655F/ffffff?text=Promo+Video',
      description: 'Engaging product promotional video with smooth animations',
      tags: ['Video Editing', 'Motion Design', 'Marketing'],
    },
    {
      id: 9,
      title: 'Dashboard Interface',
      category: 'UI/UX',
      image: 'https://via.placeholder.com/400x300/BD9587/ffffff?text=Dashboard+UI',
      description: 'Clean and functional dashboard for data visualization',
      tags: ['Data Viz', 'Interface', 'Analytics'],
    },
  ];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const recommendedItems = portfolioItems.slice(0, 3);

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(93, 107, 198, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700">Portfolio Showcase</span>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Showcase Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of exceptional design work from talented creators
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors duration-200 transform hover:scale-105">
                    View Project
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recommended for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                You
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated projects based on your interests and browsing history
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="h-16 bg-white border-t-2 border-gray-100">
                    <div className="space-y-2 pt-2">
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-300 rounded flex-1"></div>
                        <div className="h-1 bg-gray-300 rounded w-20"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-200 rounded w-16"></div>
                        <div className="h-1 bg-gray-300 rounded flex-1"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-300 rounded flex-1"></div>
                        <div className="h-1 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
            <span className="flex items-center space-x-2">
              <span>View All Projects</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;