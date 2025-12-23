"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useDesigners } from "@/hooks/useDesigners";
import { Pagination } from "@/components/ui/Pagination";
import { PAGINATION } from "@/lib/constants";

const categories = [
  { name: "All", value: "all" },
  { name: "Branding", value: "branding" },
  { name: "Illustration", value: "illustration" },
  { name: "Modern", value: "modern" },
  { name: "UI", value: "ui" },
];

const DesignersPage: React.FC = () => {
  const { designers, loading, error } = useDesigners();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter designers berdasarkan kategori
  const filteredDesigners = useMemo(() => {
    return designers.filter((designer) => {
      if (selectedCategory === "all") return true;
      return designer.specialties?.some(
        (specialty) =>
          specialty.toLowerCase() === selectedCategory.toLowerCase()
      );
    });
  }, [designers, selectedCategory]);

  // Sort designers
  const sortedDesigners = useMemo(() => {
    return [...filteredDesigners].sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "projects")
        return (b.projects_count || 0) - (a.projects_count || 0);
      if (sortBy === "followers")
        return (b.followers_count || 0) - (a.followers_count || 0);
      return 0;
    });
  }, [filteredDesigners, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedDesigners.length / PAGINATION.DESIGNERS_PER_PAGE);
  const paginatedDesigners = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION.DESIGNERS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.DESIGNERS_PER_PAGE;
    return sortedDesigners.slice(startIndex, endIndex);
  }, [sortedDesigners, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading designers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white rounded-xl font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      </div>

      <Header />

      <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Available{" "}
              <span className="bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                Designers
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
              Discover talented designers ready to bring your creative vision to
              life
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-6 sm:mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 dark:border-gray-700 transition-colors duration-300">
            <div className="flex flex-col gap-4">
              {/* Category Filters - Scrollable on mobile */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide sm:flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-sm sm:text-base transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
                <span className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-all duration-200"
                >
                  <option value="rating">Rating</option>
                  <option value="projects">Projects</option>
                  <option value="followers">Followers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Showing{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {paginatedDesigners.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {sortedDesigners.length}
              </span>{" "}
              {sortedDesigners.length === 1 ? "designer" : "designers"}
              {" • "}
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Designers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            {paginatedDesigners.map((designer) => (
              <Link
                href={`/creator/${designer.id}`}
                key={designer.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-700"
              >
                {/* Designer Header */}
                <div className="relative p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
                  {/* Avatar */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${
                        designer.avatar_gradient ||
                        "from-[#BD9587] to-[#A2655F]"
                      } rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-lg`}
                    >
                      {designer.avatar_initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#5D6BC6] transition-colors duration-200 truncate">
                        {designer.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                        {designer.username}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white font-bold">
                          {designer.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {designer.specialties?.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#BD9587]/10 to-[#8B5A8C]/10 text-[#8B5A8C] text-[10px] sm:text-xs font-semibold rounded-full border border-[#8B5A8C]/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{designer.projects_count || 0} projects</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>
                        {(designer.followers_count || 0).toLocaleString()}{" "}
                        followers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Featured Works */}
                <div className="p-3 sm:p-4 bg-gray-50/50 dark:bg-gray-700/50">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {designer.featured_works.map((work) => (
                      <div
                        key={work.id}
                        className="relative aspect-square bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl lg:text-3xl border border-gray-200 dark:border-gray-600 group-hover:border-[#5D6BC6]/30 transition-all duration-300 overflow-hidden"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">
                          {work.image}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Profile Button */}
                <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300">
                    View Profile
                  </button>
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

          {/* Empty State */}
          {sortedDesigners.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No designers found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;
