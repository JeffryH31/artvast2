"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get product data
  const productData = getProductById(params.id);
  
  // If product not found, show 404
  if (!productData) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-16 sm:pt-20">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        
        {/* Colorful blobs - responsive sizes */}
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 -left-20 sm:-left-40 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-to-br from-[#8B5A8C]/15 to-[#5D6BC6]/15 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '3s', animationDuration: '12s' }}></div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"></div>
      </div>

      {/* Breadcrumb */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="text-gray-600 hover:text-[#5D6BC6] transition-colors flex-shrink-0"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/marketplace"
            className="text-gray-600 hover:text-[#5D6BC6] transition-colors flex-shrink-0"
          >
            Marketplace
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">Product Detail</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl sm:shadow-2xl border border-[#BD9587]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#BD9587]/5 to-[#5D6BC6]/5"></div>
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-[#5D6BC6]">{productData.images[selectedImage]}</span>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
                Featured
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {productData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 sm:ring-4 ring-[#5D6BC6] scale-105"
                      : "ring-1 sm:ring-2 ring-gray-200 hover:ring-[#BD9587]"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#8B5A8C]/20 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl">{img}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
                {productData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 font-medium">
                  {productData.designer.rating} ({productData.designer.reviews}{" "}
                  reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] bg-clip-text text-transparent">
                ${productData.price}
              </span>
              {productData.originalPrice && (
                <>
                  <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">
                    ${productData.originalPrice}
                  </span>
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs sm:text-sm font-bold rounded-full">
                    {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* Features */}
            <div className="bg-gradient-to-br from-[#BD9587]/10 to-[#5D6BC6]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#BD9587]/20">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                What&apos;s Included:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#5D6BC6] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center space-x-2 text-gray-700">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5A8C] flex-shrink-0"
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
              <span className="text-sm sm:text-base font-semibold">Delivery:</span>
              <span className="text-sm sm:text-base text-[#5D6BC6] font-bold">
                {productData.deliveryTime}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button className="flex-1 relative group overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#BD9587] to-[#A2655F] opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 block px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg text-center">
                  Add to Cart
                </span>
              </button>

              <button className="flex-1 relative group overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg">
                  <span>Buy Now</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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
              </button>
            </div>

            {/* Add to Wishlist */}
            <button className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 border-2 border-[#8B5A8C] text-[#8B5A8C] font-semibold rounded-xl sm:rounded-2xl hover:bg-[#8B5A8C] hover:text-white transition-all duration-300 text-sm sm:text-base">
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
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>

        {/* Designer Section */}
        <div className="mt-10 sm:mt-16 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl border border-[#BD9587]/20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Designer</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#BD9587] to-[#8B5A8C] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-xl">
                {productData.designer.avatar}
              </div>
              {productData.designer.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {productData.designer.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700 font-semibold">
                    {productData.designer.rating}
                  </span>
                </div>
                <span className="text-sm sm:text-base text-gray-600">
                  {productData.designer.reviews} reviews
                </span>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              View Profile
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {productData.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-[#BD9587]/20 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5D6BC6] to-[#1647A3] rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 text-sm sm:text-base">
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {review.author}
                      </h4>
                      <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mb-2 sm:mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
