'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { key: 'All', label: t.portfolioSection.filters.all },
    { key: 'UI/UX', label: t.portfolioSection.filters.uiux },
    { key: 'Graphic Design', label: t.portfolioSection.filters.graphicDesign },
    { key: 'Branding', label: t.portfolioSection.filters.branding },
    { key: 'Motion Graphics', label: t.portfolioSection.filters.motionGraphics },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: t.portfolioSection.items.ecommerce.title,
      category: 'UI/UX',
      categoryDisplay: t.portfolioSection.filters.uiux,
      image: 'https://via.placeholder.com/400x300/5D6BC6/ffffff?text=UI/UX+Project',
      description: t.portfolioSection.items.ecommerce.description,
      tags: [t.portfolioSection.tags.react, t.portfolioSection.tags.figma, t.portfolioSection.tags.userResearch],
    },
    {
      id: 2,
      title: t.portfolioSection.items.brandIdentity.title,
      category: 'Branding',
      categoryDisplay: t.portfolioSection.filters.branding,
      image: 'https://via.placeholder.com/400x300/8B5A8C/ffffff?text=Branding+Project',
      description: t.portfolioSection.items.brandIdentity.description,
      tags: [t.portfolioSection.tags.logoDesign, t.portfolioSection.tags.brandGuidelines, t.portfolioSection.tags.typography],
    },
    {
      id: 3,
      title: t.portfolioSection.items.mobileApp.title,
      category: 'UI/UX',
      categoryDisplay: t.portfolioSection.filters.uiux,
      image: 'https://via.placeholder.com/400x300/A2655F/ffffff?text=Mobile+App',
      description: t.portfolioSection.items.mobileApp.description,
      tags: [t.portfolioSection.tags.mobileUI, t.portfolioSection.tags.prototyping, t.portfolioSection.tags.userTesting],
    },
    {
      id: 4,
      title: t.portfolioSection.items.poster.title,
      category: 'Graphic Design',
      categoryDisplay: t.portfolioSection.filters.graphicDesign,
      image: 'https://via.placeholder.com/400x300/BD9587/ffffff?text=Poster+Design',
      description: t.portfolioSection.items.poster.description,
      tags: [t.portfolioSection.tags.printDesign, t.portfolioSection.tags.typography, t.portfolioSection.tags.visualImpact],
    },
    {
      id: 5,
      title: t.portfolioSection.items.animatedLogo.title,
      category: 'Motion Graphics',
      categoryDisplay: t.portfolioSection.filters.motionGraphics,
      image: 'https://via.placeholder.com/400x300/1647A3/ffffff?text=Motion+Graphics',
      description: t.portfolioSection.items.animatedLogo.description,
      tags: [t.portfolioSection.tags.afterEffects, t.portfolioSection.tags.animation, t.portfolioSection.tags.branding],
    },
    {
      id: 6,
      title: t.portfolioSection.items.landingPage.title,
      category: 'UI/UX',
      categoryDisplay: t.portfolioSection.filters.uiux,
      image: 'https://via.placeholder.com/400x300/5D6BC6/ffffff?text=Landing+Page',
      description: t.portfolioSection.items.landingPage.description,
      tags: [t.portfolioSection.tags.webDesign, t.portfolioSection.tags.conversion, t.portfolioSection.tags.responsive],
    },
    {
      id: 7,
      title: t.portfolioSection.items.brochure.title,
      category: 'Graphic Design',
      categoryDisplay: t.portfolioSection.filters.graphicDesign,
      image: 'https://via.placeholder.com/400x300/8B5A8C/ffffff?text=Brochure+Design',
      description: t.portfolioSection.items.brochure.description,
      tags: [t.portfolioSection.tags.printDesign, t.portfolioSection.tags.layout, t.portfolioSection.tags.corporate],
    },
    {
      id: 8,
      title: t.portfolioSection.items.promoVideo.title,
      category: 'Motion Graphics',
      categoryDisplay: t.portfolioSection.filters.motionGraphics,
      image: 'https://via.placeholder.com/400x300/A2655F/ffffff?text=Promo+Video',
      description: t.portfolioSection.items.promoVideo.description,
      tags: [t.portfolioSection.tags.videoEditing, t.portfolioSection.tags.motionDesign, t.portfolioSection.tags.marketing],
    },
    {
      id: 9,
      title: t.portfolioSection.items.dashboard.title,
      category: 'UI/UX',
      categoryDisplay: t.portfolioSection.filters.uiux,
      image: 'https://via.placeholder.com/400x300/BD9587/ffffff?text=Dashboard+UI',
      description: t.portfolioSection.items.dashboard.description,
      tags: [t.portfolioSection.tags.dataViz, t.portfolioSection.tags.interface, t.portfolioSection.tags.analytics],
    },
  ];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const recommendedItems = portfolioItems.slice(0, 3);

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(93, 107, 198, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">{t.portfolioSection.portfolioShowcase}</span>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            {t.portfolioPage.showcaseYour}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.portfolioPage.portfolioHighlight}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            {t.portfolioSection.discoverExceptional}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    {item.categoryDisplay}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors duration-200 transform hover:scale-105 cursor-pointer">
                    {t.portfolioSection.viewProject}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full border border-blue-100 dark:border-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.portfolioSection.recommended}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="h-16 bg-white dark:bg-gray-800 border-t-2 border-gray-100 dark:border-gray-700">
                    <div className="space-y-2 pt-2">
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 cursor-pointer">
            <span className="flex items-center space-x-2">
              <span>{t.portfolioSection.viewAll}</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;