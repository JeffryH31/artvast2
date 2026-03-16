'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Pagination } from '@/components/ui/Pagination';
import { PAGINATION, POPULAR_CATEGORIES } from '@/lib/constants';
import { useLanguage, useDatabaseTranslation } from '@/lib/i18n';

const MEGA_FILTER_GROUPS = [
  {
    title: 'Popular',
    items: [
      { label: 'All', value: 'all' },
      { label: 'Branding Services', value: 'branding' },
      { label: 'Social Media Design', value: 'graphic-design' },
      { label: 'Website Design', value: 'web-design' },
      { label: 'Illustrations', value: 'illustration' },
      { label: 'Packaging Design', value: 'branding' },
      { label: 'Landing Page Design', value: 'ui-ux-design' },
      { label: 'UI/UX Design', value: 'ui-ux-design' },
      { label: 'Architecture & Interior Design', value: '3d-design' },
    ],
  },
  {
    title: 'Graphic Design',
    items: [
      { label: 'Logo Design', value: 'branding' },
      { label: 'Fonts & Typography', value: 'graphic-design' },
      { label: 'Poster Design', value: 'graphic-design' },
      { label: 'Brand Guidelines', value: 'branding' },
      { label: 'Packaging Design', value: 'branding' },
      { label: 'T-Shirt & Merchandise', value: 'graphic-design' },
    ],
  },
  {
    title: 'Marketing Design',
    items: [
      { label: 'Social Media Design', value: 'graphic-design' },
      { label: 'Presentation Design', value: 'graphic-design' },
      { label: 'Infographic Design', value: 'graphic-design' },
      { label: 'Copywriting', value: 'branding' },
    ],
  },
  {
    title: 'Web & App Design',
    items: [
      { label: 'Website Design', value: 'web-design' },
      { label: 'App Design', value: 'ui-ux-design' },
      { label: 'UI/UX Design', value: 'ui-ux-design' },
      { label: 'Landing Page Design', value: 'ui-ux-design' },
      { label: 'Icon Design', value: 'graphic-design' },
    ],
  },
  {
    title: 'Photography & Editing',
    items: [
      { label: 'Product Photography', value: 'photography' },
      { label: 'Landscape Photography', value: 'photography' },
      { label: 'Image Editing & Retouching', value: 'photography' },
      { label: 'Portrait Photography', value: 'photography' },
    ],
  },
  {
    title: 'Drawing & Illustration',
    items: [
      { label: 'Illustrations', value: 'illustration' },
      { label: 'Portraits', value: 'illustration' },
      { label: 'Comics & Character Design', value: 'illustration' },
      { label: 'Pattern Design', value: 'illustration' },
      { label: '3D Illustration', value: '3d-design' },
      { label: "Children's Illustration", value: 'illustration' },
    ],
  },
  {
    title: 'Product & Game Design',
    items: [
      { label: 'Industrial Design', value: '3d-design' },
      { label: 'Graphics for Streamers', value: 'graphic-design' },
      { label: 'Game Design', value: '3d-design' },
    ],
  },
  {
    title: 'Architecture & Interior',
    items: [
      { label: 'Architecture & Interior Design', value: '3d-design' },
      { label: 'Landscape Design', value: '3d-design' },
      { label: 'Architecture Renderings', value: '3d-design' },
    ],
  },
  {
    title: 'Animation & Motion',
    items: [
      { label: 'Animated GIFs', value: 'motion-graphics' },
      { label: 'Logo Animation', value: 'motion-graphics' },
      { label: 'Motion Graphics', value: 'motion-graphics' },
      { label: 'Explainer Videos', value: 'motion-graphics' },
    ],
  },
] as const;

const PortfolioPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMegaFilterOpen, setIsMegaFilterOpen] = useState(false);
  const [selectedMegaFilterLabels, setSelectedMegaFilterLabels] = useState<Record<string, string[]>>({});
  const { items: portfolioData, loading, error } = usePortfolio();
  const { t } = useLanguage();
  const { translateCategory } = useDatabaseTranslation();
  const megaFilterRef = useRef<HTMLDivElement | null>(null);

  const filterKeys = ['all', 'popular', ...POPULAR_CATEGORIES, 'web-design', 'motion-graphics', '3d-design'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!megaFilterRef.current?.contains(event.target as Node)) {
        setIsMegaFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCategoryActive = (value: string) => activeFilters.includes(value);

  const getFilterButtonLabel = () => {
    const labels = Object.values(selectedMegaFilterLabels).flat();

    if (labels.length === 0) {
      return t.filter.category || 'Categories';
    }

    if (labels.length === 1) {
      return labels[0];
    }

    return `${labels[0]} +${labels.length - 1}`;
  };

  const filteredItems = useMemo(() => {
    if (
      activeFilters.length === 0 ||
      activeFilters.includes('all') ||
      activeFilters.includes('popular')
    ) {
      return portfolioData;
    }

    return portfolioData.filter((item) => {
      const normalizedCategory = item.category.toLowerCase().replace(/\s+/g, '-');

      return activeFilters.some(
        (filter) =>
          normalizedCategory === filter ||
          item.category.toLowerCase() === filter.replace(/-/g, ' ')
      );
    });
  }, [portfolioData, activeFilters]);

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

  const handleCategoryTabClick = (category: string) => {
    if (category === 'all' || category === 'popular') {
      setActiveFilters([category]);
      setSelectedMegaFilterLabels({});
      setCurrentPage(1);
      return;
    }

    setActiveFilters((prev) => {
      const baseFilters = prev.filter((value) => value !== 'all' && value !== 'popular');
      const isRemoving = baseFilters.includes(category);
      const nextFilters = baseFilters.includes(category)
        ? baseFilters.filter((value) => value !== category)
        : [...baseFilters, category];

      if (isRemoving) {
        setSelectedMegaFilterLabels((prevLabels) => {
          const nextLabels = { ...prevLabels };
          delete nextLabels[category];
          return nextLabels;
        });
      }

      return nextFilters.length > 0 ? nextFilters : ['all'];
    });
    setCurrentPage(1);
  };

  const handleMegaFilterSelect = (label: string, value: string) => {
    if (value === 'all') {
      setActiveFilters(['all']);
      setSelectedMegaFilterLabels({});
      setIsMegaFilterOpen(false);
      setCurrentPage(1);
      return;
    }

    const labelsForValue = selectedMegaFilterLabels[value] || [];
    const isSameLabelSelected = labelsForValue.includes(label);

    setActiveFilters((prev) => {
      const baseFilters = prev.filter((item) => item !== 'all' && item !== 'popular');
      const nextFilters = isSameLabelSelected
        ? baseFilters.filter((item) => item !== value)
        : baseFilters.includes(value)
        ? baseFilters
        : [...baseFilters, value];

      return nextFilters.length > 0 ? nextFilters : ['all'];
    });

    setSelectedMegaFilterLabels((prev) => {
      const next = { ...prev };

      if (isSameLabelSelected) {
        const remainingLabels = (next[value] || []).filter((item) => item !== label);

        if (remainingLabels.length === 0) {
          delete next[value];
        } else {
          next[value] = remainingLabels;
        }
      } else {
        next[value] = [...(next[value] || []), label];
      }

      return next;
    });
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
        <div className="sticky top-16 sm:top-20 z-30 border-b border-gray-100 bg-white/95 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={megaFilterRef} className="relative">
              <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-4">
                <div className="min-w-0 overflow-x-auto scrollbar-hide">
                  <div className="flex items-center justify-center gap-2 min-w-max lg:min-w-0 lg:justify-center">
                    {filterKeys.map((filterKey) => (
                      <button
                        key={filterKey}
                        onClick={() => handleCategoryTabClick(filterKey)}
                        className={`flex-shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 font-medium text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                          isCategoryActive(filterKey)
                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {filterKey === 'all'
                          ? t.categories?.all || 'Discover'
                          : filterKey === 'popular'
                          ? 'Popular'
                          : translateCategory(filterKey)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end lg:justify-self-end">
                  <button
                    type="button"
                    onClick={() => setIsMegaFilterOpen((prev) => !prev)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 cursor-pointer ${
                      isMegaFilterOpen || Object.values(selectedMegaFilterLabels).flat().length > 0
                        ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M6 12h12M10 19h4" />
                    </svg>
                    <span className="max-w-[150px] truncate">{getFilterButtonLabel()}</span>
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${isMegaFilterOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {isMegaFilterOpen && (
                <div className="absolute right-0 top-full z-40 mt-3 w-full rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:border-gray-700 dark:bg-gray-900 md:w-[720px] lg:w-[900px]">
                  <div className="mb-4 flex items-center justify-between gap-4 border-b border-gray-100 pb-4 dark:border-gray-800">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {t.filter.category || 'Categories'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Explore detailed creative categories from the portfolio gallery.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMegaFilterSelect('All', 'all')}
                      className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {t.filter.allCategories || 'All Categories'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {MEGA_FILTER_GROUPS.map((group) => (
                      <div key={group.title} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                          {group.title}
                        </p>
                        <div className="space-y-2">
                          {group.items.map((item) => {
                            const isSelected = (selectedMegaFilterLabels[item.value] || []).includes(item.label);

                            return (
                              <button
                                key={`${group.title}-${item.label}`}
                                type="button"
                                onClick={() => handleMegaFilterSelect(item.label, item.value)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                    : 'text-gray-600 hover:bg-white hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                                }`}
                              >
                                <span className={`h-4 w-4 rounded-full border ${isSelected ? 'border-current bg-current/20' : 'border-gray-300 dark:border-gray-600'}`}>
                                  <span className={`m-[3px] block h-2 w-2 rounded-full ${isSelected ? 'bg-current' : 'bg-transparent'}`}></span>
                                </span>
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {paginatedItems.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/portfolio/${item.id}`}
                      className="group cursor-pointer block"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3">
                        {item.image_url?.startsWith('http') ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20">
                            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                          <button className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:scale-110 cursor-pointer">
                            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>

                          <button className="absolute top-3 right-14 w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:scale-110 cursor-pointer delay-75">
                            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>

                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                              {translateCategory(item.category)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#BD9587] to-[#8B5A8C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {item.title?.charAt(0).toUpperCase() || 'D'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {translateCategory(item.category)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">{50 + (index * 17) % 150}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-xs">{((index * 7) % 5 + 1).toFixed(1)}k</span>
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