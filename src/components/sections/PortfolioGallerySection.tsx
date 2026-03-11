"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePortfolio } from "@/hooks/usePortfolio";
import { POPULAR_CATEGORIES } from "@/lib/constants";
import { useLanguage, useDatabaseTranslation } from "@/lib/i18n";

const PortfolioGallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { items: portfolioData, loading } = usePortfolio();
  const { t } = useLanguage();
  const { translateCategory } = useDatabaseTranslation();

  // Extended categories for Dribbble-like tabs
  const categories = [
    "all",
    "popular",
    ...POPULAR_CATEGORIES,
    "web-design",
    "motion-graphics",
    "3d-design",
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === "all" || activeFilter === "popular") return portfolioData;
    return portfolioData.filter(
      (item) =>
        item.category.toLowerCase().replace(/\s+/g, "-") === activeFilter ||
        item.category.toLowerCase() === activeFilter.replace(/-/g, " ")
    );
  }, [portfolioData, activeFilter]);

  // Show only first 12 items for homepage
  const displayItems = filteredItems.slice(0, 12);

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Category Filter Tabs - Sticky like Dribbble */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-3 sm:py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === category
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {category === "all"
                  ? t.categories?.all || "Discover"
                  : category === "popular"
                  ? "Popular"
                  : translateCategory(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t.portfolioPage?.noPortfolioYet || "No designs yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {t.portfolioPage?.noPortfolioDesc || "Be the first to share your creative work!"}
            </p>
            <Link
              href="/become-designer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {t.portfolioPage?.becomeDesigner || "Become a Designer"}
            </Link>
          </div>
        )}

        {/* Portfolio Items Grid - Dribbble-like layout */}
        {!loading && displayItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {displayItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.id}`}
                  className="group cursor-pointer block"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3">
                    {item.image_url?.startsWith("http") ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20">
                        <svg
                          className="w-12 h-12 text-gray-300 dark:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                      {/* Save Button */}
                      <button className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:scale-110 cursor-pointer">
                        <svg
                          className="w-4 h-4 text-gray-700 dark:text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>

                      {/* Like Button */}
                      <button className="absolute top-3 right-14 w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:scale-110 cursor-pointer delay-75">
                        <svg
                          className="w-4 h-4 text-gray-700 dark:text-gray-300"
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

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                        {translateCategory(item.category)}
                      </span>
                    </div>
                  </div>

                  {/* Designer Info - Dribbble style */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Avatar */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#BD9587] to-[#8B5A8C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {item.title?.charAt(0).toUpperCase() || "D"}
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {translateCategory(item.category)}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs">{50 + (index * 17) % 150}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-xs">{((index * 7) % 5 + 1).toFixed(1)}k</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t.portfolioPage?.seeAll || "View All Designs"}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PortfolioGallerySection;
