'use client';

import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { Product } from '@/types/database.types';

interface ProductCardProps {
  product: Product & {
    designer?: {
      name: string;
    };
  };
  onAddToCart?: (productId: string) => Promise<boolean>;
  onToggleSave?: (productId: string) => Promise<void>;
  isSaved?: boolean;
  isAuthenticated?: boolean;
  cartLoading?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleSave,
  isSaved = false,
  isAuthenticated = false,
  cartLoading = false,
}: ProductCardProps) {
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (onAddToCart) {
      const success = await onAddToCart(product.id);
      if (success) {
        toast.success('Added to cart!');
      }
    }
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to save products');
      return;
    }

    if (onToggleSave) {
      await onToggleSave(product.id);
    }
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-[#BD9587]/20 to-[#8B5A8C]/20 aspect-square flex items-center justify-center overflow-hidden">
        {/* Badges */}
        {product.featured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full shadow-lg z-10">
            Featured
          </div>
        )}
        {product.bestseller && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs font-bold rounded-full shadow-lg z-10">
            Bestseller
          </div>
        )}

        {/* Image Placeholder */}
        <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
          {product.image_url}
        </span>

        {/* Save Button Overlay */}
        {onToggleSave && (
          <button
            onClick={handleToggleSave}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-20 ${
              isSaved
                ? 'bg-[#5D6BC6] text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save product'}
          >
            <svg
              className="w-4 h-4"
              fill={isSaved ? 'currentColor' : 'none'}
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
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base truncate">
          {product.name}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
          by {product.designer?.name || 'Unknown'}
        </p>

        <div className="flex items-center justify-between mb-3">
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
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className="w-full bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:from-[#A2655F] hover:to-[#8B5A8C] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cartLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        )}
      </div>
    </Link>
  );
}
