"use client";

import React, { use } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useDesigner } from "@/hooks/useDesigners";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";

interface CreatorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CreatorPage: React.FC<CreatorPageProps> = ({ params }) => {
  const { id } = use(params);
  const { designer, loading, error } = useDesigner(id);
  const { products: designerProducts, loading: productsLoading } = useProducts();

  // Filter products by this designer
  const filteredProducts = designerProducts.filter(p => p.designer_id === id);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading designer profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !designer) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Designer not found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error || "The designer you're looking for doesn't exist."}</p>
            <Link
              href="/designers"
              className="px-6 py-2 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white rounded-xl font-medium"
            >
              Browse Designers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <div className="relative pt-20 sm:pt-24">
        <div className="bg-gradient-to-r from-[#BD9587] via-[#8B5A8C] to-[#5D6BC6] py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-gradient-to-br ${designer.avatar_gradient || 'from-white/20 to-white/10'} rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold shadow-2xl border-4 border-white/30`}>
                  {designer.avatar_initials}
                </div>
                {designer.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {designer.name}
                </h1>
                <p className="text-white/80 text-base sm:text-lg mb-4">{designer.username}</p>
                
                {/* Specialties */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {designer.specialties?.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <svg className="w-5 h-5 text-yellow-300 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-xl sm:text-2xl font-bold text-white">{designer.rating}</span>
                    </div>
                    <p className="text-white/70 text-sm">Rating</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">{designer.projects_count}</span>
                    <p className="text-white/70 text-sm">Projects</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">{(designer.followers_count || 0).toLocaleString()}</span>
                    <p className="text-white/70 text-sm">Followers</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="px-6 sm:px-8 py-3 bg-white text-[#8B5A8C] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg cursor-pointer">
                  Follow
                </button>
                <button className="px-6 sm:px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {designer.bio && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{designer.bio}</p>
          </div>
        </div>
      )}

      {/* Featured Works */}
      {designer.featured_works && designer.featured_works.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {designer.featured_works.map((work) => (
              <div
                key={work.id}
                className="group relative aspect-square bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {work.image}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm sm:text-base">{work.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products by Designer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Products by {designer.name}
        </h2>
        
        {productsLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-700">
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#BD9587]/20 to-[#5D6BC6]/20 group-hover:scale-110 transition-transform duration-700">
                    {product.image_url && product.image_url.startsWith('http') ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {product.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white text-xs font-bold rounded-full">
                      FEATURED
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white font-bold rounded-full text-sm">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#5D6BC6] transition-colors truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#8B5A8C]/10 dark:bg-[#8B5A8C]/20 text-[#8B5A8C] text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products yet</h3>
            <p className="text-gray-600 dark:text-gray-400">This designer hasn&apos;t published any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorPage;
