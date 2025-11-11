"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";

// Dummy data untuk designers
const designersData = [
  {
    id: "1",
    name: "Sarah Anderson",
    username: "@sarahdesigns",
    avatar: "SA",
    specialties: ["Branding", "UI"],
    rating: 4.9,
    projects: 48,
    followers: 2847,
    avatar_bg: "from-[#BD9587] to-[#A2655F]",
    featured_works: [
      { id: 1, image: "🎨", title: "Brand Identity" },
      { id: 2, image: "💼", title: "Logo Design" },
      { id: 3, image: "✨", title: "UI Kit" },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "@mikechen",
    avatar: "MC",
    specialties: ["Illustration", "Modern"],
    rating: 4.8,
    projects: 62,
    followers: 3120,
    avatar_bg: "from-[#8B5A8C] to-[#5D6BC6]",
    featured_works: [
      { id: 1, image: "🎭", title: "Character Design" },
      { id: 2, image: "🌈", title: "Illustrations" },
      { id: 3, image: "🎪", title: "Art Collection" },
    ],
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    username: "@emmarodriguez",
    avatar: "ER",
    specialties: ["UI", "Modern"],
    rating: 5.0,
    projects: 35,
    followers: 1890,
    avatar_bg: "from-[#5D6BC6] to-[#1647A3]",
    featured_works: [
      { id: 1, image: "📱", title: "Mobile App" },
      { id: 2, image: "💻", title: "Web Design" },
      { id: 3, image: "🎨", title: "Dashboard" },
    ],
  },
  {
    id: "4",
    name: "James Wilson",
    username: "@jameswilson",
    avatar: "JW",
    specialties: ["Branding", "Illustration"],
    rating: 4.7,
    projects: 41,
    followers: 2345,
    avatar_bg: "from-[#A2655F] to-[#8B5A8C]",
    featured_works: [
      { id: 1, image: "🏆", title: "Brand Strategy" },
      { id: 2, image: "🎯", title: "Marketing" },
      { id: 3, image: "📊", title: "Infographics" },
    ],
  },
  {
    id: "5",
    name: "Sophia Lee",
    username: "@sophialee",
    avatar: "SL",
    specialties: ["UI", "Branding"],
    rating: 4.9,
    projects: 56,
    followers: 4120,
    avatar_bg: "from-[#BD9587] to-[#5D6BC6]",
    featured_works: [
      { id: 1, image: "🎪", title: "E-commerce" },
      { id: 2, image: "💎", title: "Luxury Brand" },
      { id: 3, image: "🌟", title: "UI System" },
    ],
  },
  {
    id: "6",
    name: "David Kim",
    username: "@davidkim",
    avatar: "DK",
    specialties: ["Modern", "Illustration"],
    rating: 4.8,
    projects: 39,
    followers: 2670,
    avatar_bg: "from-[#5D6BC6] to-[#A2655F]",
    featured_works: [
      { id: 1, image: "🎨", title: "Digital Art" },
      { id: 2, image: "🖼️", title: "Artwork" },
      { id: 3, image: "✨", title: "Creative" },
    ],
  },
];

const categories = [
  { name: "All", value: "all" },
  { name: "Branding", value: "branding" },
  { name: "Illustration", value: "illustration" },
  { name: "Modern", value: "modern" },
  { name: "UI", value: "ui" },
];

const DesignersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Filter designers berdasarkan kategori
  const filteredDesigners = designersData.filter((designer) => {
    if (selectedCategory === "all") return true;
    return designer.specialties.some(
      (specialty) => specialty.toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  // Sort designers
  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "projects") return b.projects - a.projects;
    if (sortBy === "followers") return b.followers - a.followers;
    return 0;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50"></div>
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      </div>

      <Header />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Available{" "}
              <span className="bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] bg-clip-text text-transparent">
                Designers
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover talented designers ready to bring your creative vision to life
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-all duration-200"
                >
                  <option value="rating">Rating</option>
                  <option value="projects">Projects</option>
                  <option value="followers">Followers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{sortedDesigners.length}</span>{" "}
              {sortedDesigners.length === 1 ? "designer" : "designers"}
            </p>
          </div>

          {/* Designers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDesigners.map((designer) => (
              <Link
                href={`/creator/${designer.id}`}
                key={designer.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100"
              >
                {/* Designer Header */}
                <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${designer.avatar_bg} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                    >
                      {designer.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#5D6BC6] transition-colors duration-200">
                        {designer.name}
                      </h3>
                      <p className="text-gray-600">{designer.username}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-900 font-bold">{designer.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {designer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-gradient-to-r from-[#BD9587]/10 to-[#8B5A8C]/10 text-[#8B5A8C] text-xs font-semibold rounded-full border border-[#8B5A8C]/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{designer.projects} projects</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>{designer.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>

                {/* Featured Works */}
                <div className="p-4 bg-gray-50/50">
                  <div className="grid grid-cols-3 gap-3">
                    {designer.featured_works.map((work) => (
                      <div
                        key={work.id}
                        className="relative aspect-square bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center text-3xl border border-gray-200 group-hover:border-[#5D6BC6]/30 transition-all duration-300 overflow-hidden"
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
                <div className="p-4 bg-white border-t border-gray-100">
                  <button className="w-full py-3 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {sortedDesigners.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No designers found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;
