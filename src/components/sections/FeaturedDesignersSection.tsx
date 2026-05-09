'use client';

import React from 'react';
import Link from 'next/link';
import { useDesigners } from '@/hooks/useDesigners';
import { useLanguage } from '@/lib/i18n';

const FeaturedDesignersSection: React.FC = () => {
  const { designers, loading } = useDesigners();
  const { t } = useLanguage();

  // Take top 4 verified designers
  const featuredDesigners = designers
    .filter(d => d.verified)
    .slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {t.featuredDesigners.featured} <span className="bg-gradient-to-r from-[#234CF9] to-[#234CF9] bg-clip-text text-transparent">{t.featuredDesigners.designers}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">{t.featuredDesigners.loading}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredDesigners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-[#234CF9]/10 dark:bg-[#234CF9]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#DFE7F7]/10 dark:bg-[#DFE7F7]/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {t.featuredDesigners.featured}{" "}
            <span className="bg-gradient-to-r from-[#234CF9] to-[#234CF9] bg-clip-text text-transparent">
              {t.featuredDesigners.designers}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300">
            {t.featuredDesigners.discoverTalented}
          </p>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredDesigners.map((designer) => (
            <Link
              key={designer.id}
              href={`/creator/${designer.id}`}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-[0_8px_32px_rgba(35,76,249,0.2)] transform hover:scale-105 transition-all duration-500 border border-white/10 hover:border-[#234CF9]/30">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${designer.avatar_gradient || 'from-[#DFE7F7] to-[#234CF9]'} rounded-full mx-auto flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {designer.avatar_initials}
                </div>
                {designer.verified && (
                  <div className="absolute bottom-0 right-1/2 translate-x-8 w-6 h-6 bg-gradient-to-r from-[#234CF9] to-[#1C277B] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#234CF9] transition-colors">
                  {designer.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{designer.username}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{designer.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({designer.projects_count} {t.featuredDesigners.projects})</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-1">
                  {designer.specialties?.slice(0, 2).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-0.5 bg-[#234CF9]/10 text-[#234CF9] text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/designers"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#234CF9] to-[#234CF9] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {t.featuredDesigners.viewAllDesigners}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesignersSection;
