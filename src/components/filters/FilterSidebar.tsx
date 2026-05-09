'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  ratings?: FilterOption[];
  selectedCategory: string;
  selectedRating?: string;
  onCategoryChange: (category: string) => void;
  onRatingChange?: (rating: string) => void;
  sortOptions?: FilterOption[];
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
  className?: string;
}

export function FilterSidebar({
  categories,
  ratings,
  selectedCategory,
  selectedRating,
  onCategoryChange,
  onRatingChange,
  sortOptions,
  selectedSort,
  onSortChange,
  className = '',
}: FilterSidebarProps) {
  const { t } = useLanguage();

  return (
    <div className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 dark:border-gray-700/50 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Category Filters - Scrollable on mobile */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide sm:flex-wrap">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-[#234CF9] to-[#234CF9] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Rating Filter */}
          {ratings && onRatingChange && selectedRating !== undefined && (
            <div className="flex items-center space-x-2 flex-1 min-w-[140px]">
              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base whitespace-nowrap">
                {t.filter.rating}:
              </span>
              <select
                value={selectedRating}
                onChange={(e) => onRatingChange(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#234CF9] focus:border-transparent transition-all duration-200"
              >
                {ratings.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort Dropdown */}
          {sortOptions && onSortChange && selectedSort !== undefined && (
            <div className="flex items-center space-x-2 flex-1 min-w-[140px]">
              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base whitespace-nowrap">
                {t.filter.sortBy}:
              </span>
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#234CF9] focus:border-transparent transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simplified variant for pill-style filters only
interface FilterPillsProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function FilterPills({
  filters,
  activeFilter,
  onFilterChange,
  className = '',
}: FilterPillsProps) {
  return (
    <div className={`flex justify-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 border whitespace-nowrap cursor-pointer ${
            activeFilter === filter.value
              ? 'bg-gradient-to-r from-[#234CF9] to-[#234CF9] text-white border-transparent shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#234CF9] hover:bg-[#234CF9]/5'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
