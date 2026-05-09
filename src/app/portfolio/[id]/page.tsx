"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/client";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useLanguage, useDatabaseTranslation } from "@/lib/i18n";
import type { PortfolioItem, Designer } from "@/types/database.types";

interface PortfolioItemWithDesigner extends PortfolioItem {
  designer?: Designer;
}

const PortfolioDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { translateCategory } = useDatabaseTranslation();
  const [portfolio, setPortfolio] = useState<PortfolioItemWithDesigner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch related portfolios
  const { items: allPortfolios } = usePortfolio();
  
  // Filter related items (same category, different id)
  const relatedItems = useMemo(() => {
    if (!portfolio) return [];
    return allPortfolios
      .filter((item) => item.id !== portfolio.id && item.category === portfolio.category)
      .slice(0, 4);
  }, [allPortfolios, portfolio]);

  // More from designer
  const moreFromDesigner = useMemo(() => {
    if (!portfolio) return [];
    return allPortfolios
      .filter((item) => item.id !== portfolio.id && item.designer_id === portfolio.designer_id)
      .slice(0, 4);
  }, [allPortfolios, portfolio]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!params.id) return;
      
      const supabase = createClient();
      setLoading(true);

      try {
        // Fetch portfolio item
        const { data, error: portfolioError } = await supabase
          .from("portfolio_items")
          .select("*")
          .eq("id", params.id as string)
          .single();

        if (portfolioError) throw portfolioError;
        if (!data) throw new Error("Portfolio not found");

        const portfolioData = data as PortfolioItem;

        // Fetch designer info
        if (portfolioData.designer_id) {
          const { data: designerData } = await supabase
            .from("designers")
            .select("*")
            .eq("id", portfolioData.designer_id)
            .single();

          setPortfolio({ 
            ...portfolioData, 
            designer: designerData ? (designerData as unknown as Designer) : undefined 
          });
        } else {
          setPortfolio(portfolioData);
        }

        // Generate initial like count based on id
        const hash = portfolioData.id.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) || 0;
        setLikeCount(50 + (hash % 200));
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [params.id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: portfolio?.title,
          text: portfolio?.description || "",
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div>
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-16 text-center">
            <div className="text-6xl mb-6">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.portfolioPage?.portfolioNotFound || "Portfolio not found"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error || "The portfolio item you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#234CF9] to-[#234CF9] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t.portfolioPage?.backToPortfolio || "Back to Portfolio"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {/* Back Button & Actions Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-16 sm:top-20 z-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium hidden sm:inline">
                  {t.common?.back || "Back"}
                </span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    liked
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={liked ? "currentColor" : "none"}
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
                  <span>{likeCount}</span>
                </button>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    saved
                      ? "bg-[#234CF9] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={saved ? "currentColor" : "none"}
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
                  <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {/* Main Image */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm mb-6 sm:mb-8">
            <div className="relative">
              {portfolio.image_url?.startsWith("http") ? (
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "80vh" }}
                />
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-[#DFE7F7]/20 to-[#234CF9]/20">
                  <svg
                    className="w-24 h-24 text-gray-300 dark:text-gray-600"
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
            </div>
          </div>

          {/* Info Section - Dribbble style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Designer & Title */}
            <div className="lg:col-span-2">
              {/* Designer Info */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  href={portfolio.designer ? `/creator/${portfolio.designer.id}` : "#"}
                  className="flex items-center gap-3 sm:gap-4 group"
                >
                  {/* Avatar */}
                  {portfolio.designer?.avatar_url ? (
                    <img
                      src={portfolio.designer.avatar_url}
                      alt={portfolio.designer.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#234CF9] transition-all duration-300"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ring-2 ring-transparent group-hover:ring-[#234CF9] transition-all duration-300"
                      style={{
                        background: portfolio.designer?.avatar_gradient || "linear-gradient(135deg, #DFE7F7, #234CF9)",
                      }}
                    >
                      {portfolio.designer?.avatar_initials || portfolio.title?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#234CF9] transition-colors">
                      {portfolio.designer?.name || "Anonymous Designer"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.designer?.username ? `@${portfolio.designer.username}` : "Creative Designer"}
                    </p>
                  </div>
                </Link>

                {/* Follow Button */}
                <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  Follow
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {portfolio.title}
              </h1>

              {/* Description */}
              {portfolio.description && (
                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                  {portfolio.description}
                </p>
              )}

              {/* Tags/Category */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                  {translateCategory(portfolio.category)}
                </span>
                {portfolio.featured && (
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#234CF9] to-[#234CF9] text-white rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Right Column - Stats & Info */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t.portfolioPage?.projectInfo || "Project Information"}
                </h3>

                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Appreciation</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{likeCount}</span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Category</span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {translateCategory(portfolio.category)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Published</span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {new Date(portfolio.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Designer Info */}
                  {portfolio.designer && (
                    <>
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Designer Rating</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {portfolio.designer.rating?.toFixed(1) || "5.0"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Projects</span>
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {portfolio.designer.projects_count || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More From Designer Section */}
        {moreFromDesigner.length > 0 && (
          <section className="bg-white dark:bg-gray-800 py-10 sm:py-12 border-t border-gray-100 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.portfolioPage?.moreFromDesigner || "More from"} {portfolio.designer?.name || "this designer"}
                </h2>
                {portfolio.designer && (
                  <Link
                    href={`/creator/${portfolio.designer.id}`}
                    className="text-[#234CF9] hover:text-[#234CF9] font-medium text-sm transition-colors"
                  >
                    {t.portfolioPage?.viewProfile || "View Profile"} →
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {moreFromDesigner.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                      {item.image_url?.startsWith("http") ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#DFE7F7]/20 to-[#234CF9]/20">
                          <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-[#234CF9] transition-colors">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Projects Section */}
        {relatedItems.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 py-10 sm:py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.portfolioPage?.similarProjects || "You might also like"}
                </h2>
                <Link
                  href="/portfolio"
                  className="text-[#234CF9] hover:text-[#234CF9] font-medium text-sm transition-colors"
                >
                  {t.portfolioPage?.seeAll || "View all"} →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {relatedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                      {item.image_url?.startsWith("http") ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#DFE7F7]/20 to-[#234CF9]/20">
                          <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-[#234CF9] transition-colors">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-[#234CF9] to-[#234CF9] py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t.portfolioPage?.inspiredCTA || "Inspired by this design?"}
            </h2>
            <p className="text-white/80 mb-6 sm:mb-8">
              {t.portfolioPage?.shareCTA || "Share your own creative work with the community"}
            </p>
            <Link
              href="/become-designer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t.portfolioPage?.becomeDesigner || "Become a Designer"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioDetailPage;
