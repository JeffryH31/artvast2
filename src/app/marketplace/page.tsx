"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useSavedProducts } from "@/hooks/useSavedProducts";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { Pagination } from "@/components/ui/Pagination";
import { SkeletonProduct } from "@/components/ui/Skeleton";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { debounce, formatPrice } from "@/lib/utils";
import { PAGINATION } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error } = useProducts();
  const { addToCart, loading: cartLoading } = useCart();
  const { toggleSave, isSaved } = useSavedProducts();
  const { user } = useAuth();
  const { isDesigner, designerProfile } = useRole();
  const { t } = useLanguage();

  const categories = [
    "All Categories",
    "Branding",
    "UI/UX Design",
    "Motion Graphics",
    "Illustration",
  ];
  const ratings = ["All Ratings", "5 Stars", "4+ Stars", "3+ Stars"];

  // Debounced search handler
  const debouncedSearchHandler = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearchHandler(value);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.designer?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesRating =
        selectedRating === "All Ratings" ||
        (selectedRating === "5 Stars" && (product.rating || 0) === 5.0) ||
        (selectedRating === "4+ Stars" && (product.rating || 0) >= 4.0) ||
        (selectedRating === "3+ Stars" && (product.rating || 0) >= 3.0);

      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [products, debouncedSearch, selectedCategory, selectedRating]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PAGINATION.PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION.PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  // Loading state with skeletons
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        </div>
        <Header />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonProduct key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.errors.somethingWentWrong}</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white rounded-xl font-medium cursor-pointer"
            >
              {t.common.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

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
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent dark:from-gray-900/50"></div>
      </div>

      <Header />

      <div className="relative pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#BD9587] via-[#8B5A8C] to-[#5D6BC6] py-10 sm:py-12 lg:py-16 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              {t.marketplace.title} <span className="text-white/90">{t.marketplace.titleHighlight}</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              {t.marketplace.description}
            </p>

            {/* Featured Stats */}
            <div className="flex justify-center gap-6 sm:gap-8 lg:space-x-8 text-white/90">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">1000+</div>
                <div className="text-xs sm:text-sm">{t.marketplace.stats.artworks}</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">500+</div>
                <div className="text-xs sm:text-sm">{t.marketplace.stats.artists}</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">98%</div>
                <div className="text-xs sm:text-sm">{t.marketplace.stats.satisfaction}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-16 sm:top-20 z-30 transition-colors duration-300">
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
                  placeholder={t.marketplace.searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#5D6BC6] focus:border-[#5D6BC6] text-sm sm:text-base transition-colors duration-300"
                />
              </div>

              {/* FilterSidebar Component */}
              <FilterSidebar
                categories={categories.map(cat => ({ label: cat, value: cat }))}
                ratings={ratings.map(rat => ({ label: rat, value: rat }))}
                selectedCategory={selectedCategory}
                selectedRating={selectedRating}
                onCategoryChange={handleCategoryChange}
                onRatingChange={handleRatingChange}
                className="p-0 bg-transparent shadow-none border-0"
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {filteredProducts.length} {t.marketplace.productsFound}
            </h2>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t.pagination.page} {currentPage} {t.pagination.of} {totalPages} • {t.marketplace.showing} {paginatedProducts.length} {t.marketplace.products}
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {paginatedProducts.map((product, index) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full">
                        {t.product.featured.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-full">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 transform hover:scale-105 text-center">
                        {t.product.viewDetails}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 group-hover:text-[#5D6BC6] transition-colors duration-200 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                        {t.product.by} {product.designer?.name || t.common.unknown}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {product.rating}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">
                        ({product.review_count})
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
                    {(product.features || [])
                      .slice(0, 2)
                      .map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>

                  {/* Delivery Time */}
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 flex items-center space-x-1">
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
                    <span>{t.product.delivery}: {product.delivery_time}</span>
                  </div>

                  {/* Actions - Show Your Product badge for designer's own products, hide buttons for designers, show buttons for users */}
                  {designerProfile && product.designer_id === designerProfile.id ? (
                    <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-[#5D6BC6]/10 to-[#8B5A8C]/10 text-[#5D6BC6] text-xs sm:text-sm font-medium rounded-lg border border-[#5D6BC6]/20">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Your Product</span>
                    </div>
                  ) : isDesigner ? (
                    /* Designer viewing other products - no action buttons */
                    null
                  ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!user) {
                          toast.error(t.errors.loginRequired);
                          return;
                        }
                        const success = await addToCart(product.id);
                        if (success) {
                          toast.success(t.success.addedToCart);
                        }
                      }}
                      disabled={cartLoading}
                      className="flex-1 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:from-[#A2655F] hover:to-[#8B5A8C] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 cursor-pointer"
                    >
                      {cartLoading ? t.common.loading : t.product.addToCart}
                    </button>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!user) {
                          toast.error(t.errors.loginRequired);
                          return;
                        }
                        await toggleSave(product.id);
                      }}
                      className={`px-3 sm:px-4 py-2 border rounded-lg sm:rounded-xl transition-colors duration-200 cursor-pointer ${
                        isSaved(product.id)
                          ? 'border-[#5D6BC6] bg-[#5D6BC6]/10 text-[#5D6BC6]'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#5D6BC6] hover:bg-[#5D6BC6]/5'
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill={isSaved(product.id) ? 'currentColor' : 'none'}
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
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 dark:from-[#BD9587]/5 dark:via-[#8B5A8C]/5 dark:to-[#5D6BC6]/5 py-10 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                {t.marketplace.recommended}{" "}
                <span className="bg-gradient-to-r from-[#A2655F] to-[#5D6BC6] bg-clip-text text-transparent">
                  {t.marketplace.forYou}
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                {t.marketplace.curatedDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.slice(0, 3).map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-40 sm:h-44 lg:h-48 overflow-hidden bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20">
                    {product.image_url && product.image_url.startsWith('http') ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                      by {product.designer?.name || 'Unknown'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
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
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
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
              <button className="bg-white text-[#8B5A8C] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base cursor-pointer">
                Start Selling
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base cursor-pointer">
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
