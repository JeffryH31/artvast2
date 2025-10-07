'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLicenseType, setSelectedLicenseType] = useState('All Licenses');
  const [selectedRating, setSelectedRating] = useState('All Ratings');

  const categories = ['All Categories', 'UI/UX Design', 'Graphic Design', 'Branding', 'Illustration', 'Photography', 'Motion Graphics'];
  const licenseTypes = ['All Licenses', 'Commercial Use', 'Personal Use', 'Extended License', 'Royalty Free'];
  const ratings = ['All Ratings', '5 Stars', '4+ Stars', '3+ Stars', '2+ Stars'];

  const artworks = [
    {
      id: 1,
      title: 'Modern Dashboard UI Kit',
      designer: 'Sarah Johnson',
      category: 'UI/UX Design',
      price: 45,
      rating: 4.9,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      licenseType: 'Commercial Use',
      tags: ['Dashboard', 'UI Kit', 'Modern'],
      bestseller: true
    },
    {
      id: 2,
      title: 'Brand Identity Package',
      designer: 'Marcus Chen',
      category: 'Branding',
      price: 89,
      rating: 5.0,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      licenseType: 'Extended License',
      tags: ['Logo', 'Branding', 'Identity'],
      featured: true
    },
    {
      id: 3,
      title: 'Mobile App Wireframes',
      designer: 'Elena Rodriguez',
      category: 'UI/UX Design',
      price: 35,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      licenseType: 'Commercial Use',
      tags: ['Mobile', 'Wireframes', 'UX']
    },
    {
      id: 4,
      title: 'Vintage Poster Collection',
      designer: 'David Kim',
      category: 'Graphic Design',
      price: 25,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      licenseType: 'Royalty Free',
      tags: ['Poster', 'Vintage', 'Collection']
    },
    {
      id: 5,
      title: 'Abstract Illustrations Set',
      designer: 'Anna Kowalski',
      category: 'Illustration',
      price: 55,
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      licenseType: 'Commercial Use',
      tags: ['Abstract', 'Vector', 'Modern'],
      trending: true
    },
    {
      id: 6,
      title: 'Corporate Photography Pack',
      designer: 'James Wilson',
      category: 'Photography',
      price: 75,
      rating: 4.5,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      licenseType: 'Extended License',
      tags: ['Corporate', 'Business', 'Professional']
    },
    {
      id: 7,
      title: 'Animated Logo Templates',
      designer: 'Lisa Park',
      category: 'Motion Graphics',
      price: 65,
      rating: 4.9,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      licenseType: 'Commercial Use',
      tags: ['Animation', 'Logo', 'Motion']
    },
    {
      id: 8,
      title: 'E-commerce UI Components',
      designer: 'Alex Turner',
      category: 'UI/UX Design',
      price: 40,
      rating: 4.7,
      reviews: 176,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      licenseType: 'Commercial Use',
      tags: ['E-commerce', 'Components', 'UI']
    },
    {
      id: 9,
      title: 'Social Media Templates',
      designer: 'Maya Patel',
      category: 'Graphic Design',
      price: 30,
      rating: 4.4,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      licenseType: 'Personal Use',
      tags: ['Social Media', 'Templates', 'Marketing']
    }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || artwork.category === selectedCategory;
    const matchesLicense = selectedLicenseType === 'All Licenses' || artwork.licenseType === selectedLicenseType;
    const matchesRating = selectedRating === 'All Ratings' || 
                         (selectedRating === '5 Stars' && artwork.rating === 5.0) ||
                         (selectedRating === '4+ Stars' && artwork.rating >= 4.0) ||
                         (selectedRating === '3+ Stars' && artwork.rating >= 3.0) ||
                         (selectedRating === '2+ Stars' && artwork.rating >= 2.0);

    return matchesSearch && matchesCategory && matchesLicense && matchesRating;
  });

  const recommendedArtworks = artworks.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#BD9587] via-[#8B5A8C] to-[#5D6BC6] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Creative{" "}
              <span className="text-white/90">
                Marketplace
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Discover and purchase high-quality design assets from talented creators worldwide
            </p>
            
            {/* Featured Stats */}
            <div className="flex justify-center space-x-8 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search artworks, designers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6]"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3 flex-wrap">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-gray-700"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* License Type Filter */}
                <select
                  value={selectedLicenseType}
                  onChange={(e) => setSelectedLicenseType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-gray-700"
                >
                  {licenseTypes.map(license => (
                    <option key={license} value={license}>{license}</option>
                  ))}
                </select>

                {/* Rating Filter */}
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-gray-700"
                >
                  {ratings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredArtworks.length} Artworks Found
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="font-medium text-gray-700">Most Popular</span>
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const colors = ['BD9587', 'A2655F', '8B5A8C', '5D6BC6', '1647A3'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      e.currentTarget.src = `https://via.placeholder.com/400x300/${randomColor}/ffffff?text=${encodeURIComponent(artwork.category)}`;
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {artwork.bestseller && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs font-bold rounded-full">
                        BESTSELLER
                      </span>
                    )}
                    {artwork.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    )}
                    {artwork.trending && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white text-xs font-bold rounded-full">
                        TRENDING
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-full">
                      ${artwork.price}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#5D6BC6] transition-colors duration-200">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-gray-600">by {artwork.designer}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="font-medium text-gray-700">{artwork.rating}</span>
                      <span className="text-gray-500">({artwork.reviews})</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#BD9587]/10 to-[#8B5A8C]/10 text-[#8B5A8C] text-sm font-medium rounded-full border border-[#8B5A8C]/20">
                      {artwork.category}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artwork.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* License */}
                  <div className="text-xs text-gray-500 mb-4">
                    License: {artwork.licenseType}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white px-4 py-2 rounded-xl font-medium hover:from-[#A2655F] hover:to-[#8B5A8C] transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:border-[#5D6BC6] hover:bg-[#5D6BC6]/5 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recommended for{" "}
                <span className="bg-gradient-to-r from-[#A2655F] to-[#5D6BC6] bg-clip-text text-transparent">
                  you
                </span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Curated selections based on your browsing history and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="h-16 bg-white">
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <div className="h-2 bg-gray-300 rounded flex-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 bg-gray-200 rounded w-16"></div>
                          <div className="h-2 bg-gray-300 rounded flex-1"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 bg-gray-300 rounded flex-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-[#8B5A8C] to-[#1647A3] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to sell your designs?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our marketplace and start earning from your creative work today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#8B5A8C] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Start Selling
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

export default MarketplacePage;