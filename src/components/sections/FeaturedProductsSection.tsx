'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProductsSection: React.FC = () => {
  const { products, loading } = useProducts({ featured: true, limit: 6 });

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Featured <span className="bg-gradient-to-r from-[#BD9587] to-[#A2655F] bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">Loading amazing products...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no featured products, use all products
  const displayProducts = products.length > 0 ? products.slice(0, 6) : [];

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BD9587] via-[#8B5A8C] to-[#5D6BC6]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#BD9587] to-[#A2655F] bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300">
            Discover premium design assets from top creators
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 group-hover:scale-110 transition-transform duration-700">
                  {product.image_url && product.image_url.startsWith('http') ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full">
                      FEATURED
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-2 py-1 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs font-bold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-full">
                  ${product.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#5D6BC6] transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 truncate">
                  by {product.designer?.name || 'Designer'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[#8B5A8C]/10 dark:bg-[#8B5A8C]/30 text-[#8B5A8C] dark:text-[#c48bc5] text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#BD9587] to-[#A2655F] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Browse Marketplace
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
