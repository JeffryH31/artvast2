'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Pagination } from '@/components/ui/Pagination';
import { PAGINATION, POPULAR_CATEGORIES } from '@/lib/constants';
import { useLanguage, useDatabaseTranslation } from '@/lib/i18n';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { items: portfolioData, loading, error } = usePortfolio();
  const { t } = useLanguage();
  const { translateCategory } = useDatabaseTranslation();

  // Filter options - popular categories only to avoid overflow
  const filterKeys = ['all', ...POPULAR_CATEGORIES];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return portfolioData;
    return portfolioData.filter(item => 
      item.category.toLowerCase().replace(/\s+/g, '-') === activeFilter ||
      item.category.toLowerCase() === activeFilter.replace(/-/g, ' ')
    );
  }, [portfolioData, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / PAGINATION.PORTFOLIO_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION.PORTFOLIO_PER_PAGE;
    const endIndex = startIndex + PAGINATION.PORTFOLIO_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#BD9587]/10 via-[#8B5A8C]/10 to-[#5D6BC6]/10 dark:from-[#BD9587]/20 dark:via-[#8B5A8C]/20 dark:to-[#5D6BC6]/20 py-10 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t.portfolioPage.showcaseYour}{" "}
              <span className="bg-gradient-to-r from-[#A2655F] via-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                {t.portfolioPage.portfolioHighlight}
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-2">
              {t.portfolioPage.discoverDesignWork}
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-900 py-4 sm:py-6 lg:py-8 sticky top-16 sm:top-20 z-30 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {filterKeys.map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => handleFilterChange(filterKey)}
                  className={`flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 border whitespace-nowrap cursor-pointer ${
                    activeFilter === filterKey
                      ? 'bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white border-transparent shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#5D6BC6] hover:bg-[#5D6BC6]/5 dark:hover:bg-[#5D6BC6]/10'
                  }`}
                >
                  {translateCategory(filterKey)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="py-10 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">{t.portfolioPage.loading}</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.portfolioPage.errorOccurred}</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && portfolioData.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t.portfolioPage.noPortfolioYet}</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  {t.portfolioPage.noPortfolioDesc}
                </p>
                <a 
                  href="/become-designer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {t.portfolioPage.becomeDesigner}
                </a>
              </div>
            )}

            {/* Portfolio Items */}
            {!loading && !error && portfolioData.length > 0 && (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
                    {t.portfolioPage.showingWorks} <span className="font-bold text-gray-900 dark:text-white">{paginatedItems.length}</span> {t.portfolioPage.ofWorks}{" "}
                    <span className="font-bold text-gray-900 dark:text-white">{filteredItems.length}</span> {t.portfolioPage.works}
                    {totalPages > 1 && <> • {t.pagination.page} {currentPage} {t.pagination.of} {totalPages}</>}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
                  {paginatedItems.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/portfolio/${item.id}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 block"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20">
                        {/* Check if image_url is a URL */}
                        {item.image_url?.startsWith('http') ? (
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                            <div className="text-white">
                              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                                {translateCategory(item.category)}
                              </span>
                              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-0.5 sm:mb-1">{item.title}</h3>
                              <p className="text-xs sm:text-sm text-white/80 line-clamp-2">{item.description}</p>
                            </div>
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
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#8B5A8C] to-[#1647A3] py-10 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              {t.portfolioPage.readyToShowcase}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t.portfolioPage.joinThousands}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/become-designer" className="bg-white text-[#8B5A8C] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                {t.portfolioPage.registerAsDesigner}
              </a>
              <a href="/designers" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                {t.portfolioPage.exploreDesigners}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;