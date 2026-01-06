"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useSavedProducts } from "@/hooks/useSavedProducts";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { createClient } from "@/lib/supabase/client";
import { trackProductView } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const { product, reviews, loading, error } = useProduct(id);
  const { addToCart, loading: cartLoading } = useCart();
  const { toggleSave, isSaved } = useSavedProducts();
  const { user } = useAuth();

  // Track product view
  useEffect(() => {
    if (product && id) {
      // Track in analytics
      trackProductView(id, product.name);

      // Track in database
      const trackView = async () => {
        const supabase = createClient();
        await supabase.from('product_views').insert({
          product_id: id,
          user_id: user?.id || null,
        } as never);
      };
      trackView();
    }
  }, [product, id, user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !product) {
    return (
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Product not found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error || "The product you're looking for doesn't exist."}</p>
            <Link
              href="/marketplace"
              className="px-6 py-2 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white rounded-xl font-medium"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Product images - use images array or fallback to image_url
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url] 
      : [];

  const hasImages = productImages.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 -left-20 sm:-left-40 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-to-br from-[#8B5A8C]/15 to-[#5D6BC6]/15 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '3s', animationDuration: '12s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-gray-900/50"></div>
      </div>

      <Header />

      {/* Breadcrumb */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pt-20 sm:pt-24">
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-[#5D6BC6] transition-colors flex-shrink-0">
            Home
          </Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <Link href="/marketplace" className="text-gray-600 dark:text-gray-400 hover:text-[#5D6BC6] transition-colors flex-shrink-0">
            Marketplace
          </Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700">
              {hasImages ? (
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {product.featured && (
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
                  Featured
                </div>
              )}
              {product.bestseller && (
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
                  Bestseller
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {hasImages && productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      selectedImage === index
                        ? "ring-2 sm:ring-4 ring-[#5D6BC6] scale-105"
                        : "ring-1 sm:ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-[#BD9587]"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {product.rating} ({product.review_count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <>
                  <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#A2655F] to-[#8B5A8C] text-white text-xs sm:text-sm font-bold rounded-full">
                    {Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Category */}
            <div>
              <span className="px-3 py-1 bg-gradient-to-r from-[#BD9587]/10 to-[#8B5A8C]/10 text-[#8B5A8C] text-sm font-medium rounded-full border border-[#8B5A8C]/20">
                {product.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-gradient-to-br from-[#BD9587]/10 to-[#5D6BC6]/10 dark:from-[#BD9587]/20 dark:to-[#5D6BC6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#BD9587]/20 dark:border-[#BD9587]/30">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What&apos;s Included:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5D6BC6] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Time */}
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5A8C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm sm:text-base font-semibold">Delivery:</span>
              <span className="text-sm sm:text-base text-[#5D6BC6] font-bold">{product.delivery_time}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button 
                onClick={async () => {
                  if (!user) {
                    toast.error('Please login to add items to cart');
                    return;
                  }
                  const success = await addToCart(id);
                  if (success) {
                    toast.success('Added to cart!');
                  }
                }}
                disabled={cartLoading}
                className="flex-1 relative group overflow-hidden rounded-xl sm:rounded-2xl disabled:opacity-50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#BD9587] to-[#A2655F] opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 block px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg text-center">
                  {cartLoading ? 'Adding...' : 'Add to Cart'}
                </span>
              </button>

              <button 
                onClick={async () => {
                  if (!user) {
                    toast.error('Please login to purchase');
                    return;
                  }
                  const success = await addToCart(id);
                  if (success) {
                    router.push('/checkout');
                  }
                }}
                disabled={cartLoading}
                className="flex-1 relative group overflow-hidden rounded-xl sm:rounded-2xl disabled:opacity-50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg">
                  <span>Buy Now</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Add to Wishlist */}
            <button 
              onClick={async () => {
                if (!user) {
                  toast.error('Please login to save products');
                  return;
                }
                await toggleSave(id);
              }}
              className={`w-full flex items-center justify-center space-x-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 border-2 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base cursor-pointer ${
                isSaved(id)
                  ? 'border-[#8B5A8C] bg-[#8B5A8C] text-white'
                  : 'border-[#8B5A8C] text-[#8B5A8C] hover:bg-[#8B5A8C] hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={isSaved(id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{isSaved(id) ? 'Saved' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>

        {/* Designer Section */}
        {product.designer && (
          <div className="mt-10 sm:mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl dark:shadow-gray-900/50 border border-[#BD9587]/20 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Designer</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${product.designer.avatar_gradient || 'from-[#BD9587] to-[#8B5A8C]'} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-xl`}>
                  {product.designer.avatar_initials}
                </div>
                {product.designer.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">{product.designer.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.designer.username}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">{product.designer.rating}</span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{product.designer.projects_count} projects</span>
                </div>
              </div>
              <Link
                href={`/creator/${product.designer.id}`}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
