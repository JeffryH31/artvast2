"use client";

import React from "react";
import Link from "next/link";
import { useDesigners } from "@/hooks/useDesigners";
import { useLanguage } from "@/lib/i18n";

const FeaturedDesignersRow: React.FC = () => {
  const { designers, loading } = useDesigners();
  const { t } = useLanguage();

  // Get top 8 designers
  const topDesigners = designers.slice(0, 8);

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-800/50 py-8 sm:py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 animate-pulse">
                <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (topDesigners.length === 0) return null;

  return (
    <section className="bg-gray-50 dark:bg-gray-800/50 py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t.nav?.designers || "Top Designers"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Discover talented creators ready to bring your vision to life
            </p>
          </div>
          <Link
            href="/designers"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#5D6BC6] hover:text-[#8B5A8C] transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Designers Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {topDesigners.map((designer) => (
            <Link
              key={designer.id}
              href={`/creator/${designer.id}`}
              className="flex-shrink-0 w-44 sm:w-48 group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700">
                {/* Avatar */}
                <div className="relative inline-block mb-3">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${
                      designer.avatar_gradient || "from-[#BD9587] to-[#8B5A8C]"
                    } flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {designer.avatar_initials || designer.name?.charAt(0).toUpperCase()}
                  </div>
                  {designer.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate mb-1">
                  {designer.name}
                </h3>

                {/* Specialty */}
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
                  {designer.specialties?.[0] || "Designer"}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{designer.rating?.toFixed(1) || "5.0"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span>{designer.projects_count || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden text-center mt-4">
          <Link
            href="/designers"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5D6BC6] hover:text-[#8B5A8C] transition-colors"
          >
            View all designers
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesignersRow;
