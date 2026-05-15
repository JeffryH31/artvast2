'use client';

import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { Product } from '@/types/database.types';
import { useLanguage } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

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
  isDesigner?: boolean; // True if current user is a designer (seller mode - cannot buy)
  isOwner?: boolean; // True if current user is the product owner
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleSave,
  isSaved = false,
  isAuthenticated = false,
  cartLoading = false,
  isDesigner = false,
  isOwner = false,
}: ProductCardProps) {
  const { t } = useLanguage();
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error(t.errors.loginRequired);
      return;
    }

    if (onAddToCart) {
      const success = await onAddToCart(product.id);
      if (success) {
        toast.success(t.success.addedToCart);
      }
    }
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error(t.errors.loginRequired);
      return;
    }

    if (onToggleSave) {
      await onToggleSave(product.id);
    }
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-[0_8px_32px_rgba(27,110,243,0.2)] transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-[#1B6EF3]/30 overflow-hidden">
      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-[#DFE7F7]/20 to-[#1B6EF3]/20 aspect-square overflow-hidden">
        {/* Badges */}
        {product.featured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-[#1B6EF3] to-[#1755E0] text-white text-xs font-bold rounded-full shadow-lg z-10">
            {t.product.featured}
          </div>
        )}
        {product.bestseller && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-[#1B6EF3] to-[#1B6EF3] text-white text-xs font-bold rounded-full shadow-lg z-10">
            {t.product.bestseller}
          </div>
        )}

        {/* Product Image */}
        {product.image_url && product.image_url.startsWith('http') ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Save Button Overlay - Hide for designers (sellers) */}
        {onToggleSave && !isDesigner && (
          <button
            onClick={handleToggleSave}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer ${
              isSaved
                ? 'bg-[#1B6EF3] text-white'
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
          {t.product.by} {product.designer?.name || t.common.unknown}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#1B6EF3] to-[#1B6EF3] bg-clip-text text-transparent">
            {formatPrice(product.price)}
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

        {/* Add to Cart Button hidden - transaction features disabled
        {onAddToCart && !isDesigner && !isOwner && (
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className="w-full bg-gradient-to-r from-[#1B6EF3] to-[#1B6EF3] text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:from-[#1B6EF3] hover:to-[#1B6EF3] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {cartLoading ? t.common.loading : t.product.addToCart}
          </button>
        )}
        */}

        {/* Show "Your Product" badge for product owner */}
        {isOwner && (
          <div className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-[#1B6EF3]/10 to-[#1B6EF3]/10 text-[#1B6EF3] text-xs sm:text-sm font-medium rounded-lg border border-[#1B6EF3]/20">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{t.productDetail.yourProduct}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
