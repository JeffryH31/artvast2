"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { products } from "@/data/products";

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLicenseType, setSelectedLicenseType] =
    useState("All Licenses");
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  const categories = [
    "All Categories",
    "Branding",
    "UI/UX Design",
    "Motion Graphics",
  ];
  const ratings = ["All Ratings", "5 Stars", "4+ Stars", "3+ Stars"];

  const artworks = [
    {
      id: 1,
      title: "Modern Dashboard UI Kit",
      designer: "Sarah Johnson",
      category: "UI/UX Design",
      price: 45,
      rating: 4.9,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      licenseType: "Commercial Use",
      tags: ["Dashboard", "UI Kit", "Modern"],
      bestseller: true,
    },
    {
      id: 2,
      title: "Brand Identity Package",
      designer: "Marcus Chen",
      category: "Branding",
      price: 89,
      rating: 5.0,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      licenseType: "Extended License",
      tags: ["Logo", "Branding", "Identity"],
      featured: true,
    },
    {
      id: 3,
      title: "Mobile App Wireframes",
      designer: "Elena Rodriguez",
      category: "UI/UX Design",
      price: 35,
      rating: 4.7,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      licenseType: "Commercial Use",
      tags: ["Mobile", "Wireframes", "UX"],
    },
    {
      id: 4,
      title: "Vintage Poster Collection",
      designer: "David Kim",
      category: "Graphic Design",
      price: 25,
      rating: 4.6,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      licenseType: "Royalty Free",
      tags: ["Poster", "Vintage", "Collection"],
    },
    {
      id: 5,
      title: "Abstract Illustrations Set",
      designer: "Anna Kowalski",
      category: "Illustration",
      price: 55,
      rating: 4.8,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      licenseType: "Commercial Use",
      tags: ["Abstract", "Vector", "Modern"],
      trending: true,
    },
    {
      id: 6,
      title: "Corporate Photography Pack",
      designer: "James Wilson",
      category: "Photography",
      price: 75,
      rating: 4.5,
      reviews: 98,
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      licenseType: "Extended License",
      tags: ["Corporate", "Business", "Professional"],
    },
    {
      id: 7,
      title: "Animated Logo Templates",
      designer: "Lisa Park",
      category: "Motion Graphics",
      price: 65,
      rating: 4.9,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      licenseType: "Commercial Use",
      tags: ["Animation", "Logo", "Motion"],
    },
    {
      id: 8,
      title: "E-commerce UI Components",
      designer: "Alex Turner",
      category: "UI/UX Design",
      price: 40,
      rating: 4.7,
      reviews: 176,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      licenseType: "Commercial Use",
      tags: ["E-commerce", "Components", "UI"],
    },
    {
      id: 9,
      title: "Social Media Templates",
      designer: "Maya Patel",
      category: "Graphic Design",
      price: 30,
      rating: 4.4,
      reviews: 267,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      licenseType: "Personal Use",
      tags: ["Social Media", "Templates", "Marketing"],
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesRating =
      selectedRating === "All Ratings" ||
      (selectedRating === "5 Stars" && product.rating === 5.0) ||
      (selectedRating === "4+ Stars" && product.rating >= 4.0) ||
      (selectedRating === "3+ Stars" && product.rating >= 3.0);

    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

        {/* Colorful blobs */}
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div
          className="absolute top-1/3 left-1/2 w-[450px] h-[450px] bg-gradient-to-br from-[#8B5A8C]/15 to-[#5D6BC6]/15 rounded-full blur-3xl opacity-50 animate-float"
          style={{ animationDelay: "4s", animationDuration: "14s" }}
        ></div>

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"></div>
      </div>

      <Header />

      <div className="relative pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#BD9587] via-[#8B5A8C] to-[#5D6BC6] py-10 sm:py-12 lg:py-16 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Creative <span className="text-white/90">Marketplace</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Discover and purchase high-quality design assets from talented
              creators worldwide
            </p>

            {/* Featured Stats */}
            <div className="flex justify-center gap-6 sm:gap-8 lg:space-x-8 text-white/90">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">1000+</div>
                <div className="text-xs sm:text-sm">Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">500+</div>
                <div className="text-xs sm:text-sm">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">98%</div>
                <div className="text-xs sm:text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 sm:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Search Bar - Full width on mobile */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                </div>
                <input
                  type="text"
                  placeholder="Search artworks, designers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-sm sm:text-base"
                />
              </div>

              {/* Filters - Scrollable on mobile */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-gray-700 text-sm sm:text-base min-w-[140px] sm:min-w-0"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Rating Filter */}
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-gray-700 text-sm sm:text-base min-w-[120px] sm:min-w-0"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {filteredProducts.length} Products Found
            </h2>
            <div className="text-xs sm:text-sm text-gray-500">
              Sorted by:{" "}
              <span className="font-medium text-gray-700">Most Popular</span>
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                  <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <span className="text-4xl sm:text-5xl lg:text-6xl">{product.image}</span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-full">
                      ${product.price}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 transform hover:scale-105 text-center">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1 group-hover:text-[#5D6BC6] transition-colors duration-200 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        by {product.designer.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-medium text-gray-700">
                        {product.rating}
                      </span>
                      <span className="text-gray-500 hidden sm:inline">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#BD9587]/10 to-[#8B5A8C]/10 text-[#8B5A8C] text-xs sm:text-sm font-medium rounded-full border border-[#8B5A8C]/20">
                      {product.category}
                    </span>
                  </div>

                  {/* Features Preview - Hidden on mobile */}
                  <div className="hidden sm:flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {product.features
                      .slice(0, 2)
                      .map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>

                  {/* Delivery Time */}
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4 flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Delivery: {product.deliveryTime}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Added to cart!");
                      }}
                      className="flex-1 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:from-[#A2655F] hover:to-[#8B5A8C] transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Added to wishlist!");
                      }}
                      className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:border-[#5D6BC6] hover:bg-[#5D6BC6]/5 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 py-10 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Recommended for{" "}
                <span className="bg-gradient-to-r from-[#A2655F] to-[#5D6BC6] bg-clip-text text-transparent">
                  you
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Curated selections based on your browsing history and
                preferences
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.slice(0, 3).map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className="h-40 sm:h-44 lg:h-48 overflow-hidden bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
                      {product.image}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">
                      by {product.designer.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="font-medium text-gray-700">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-[#8B5A8C] to-[#1647A3] py-10 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to sell your designs?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our marketplace and start earning from your creative work
              today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-[#8B5A8C] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
                Start Selling
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
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
