"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const TopDesignersSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "500+", label: "Verified Designers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "text-[#1B6EF3]", bg: "bg-[#1B6EF3]/10" },
    { value: "1,200+", label: "Projects Completed", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { value: "4.9★", label: "Average Rating", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { value: "15+", label: "Design Categories", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-500/10" },
  ];

  const categories = [
    { label: "Branding", count: "142" },
    { label: "UI/UX Design", count: "98" },
    { label: "Motion Graphics", count: "67" },
    { label: "Illustration", count: "114" },
    { label: "Web Design", count: "85" },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#F4F7FF] dark:bg-[#050B1A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B6EF3]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1755E0]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-5 sm:space-y-6">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B6EF3]/10 border border-[#1B6EF3]/25 text-[#1B6EF3] text-xs sm:text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#1B6EF3] animate-pulse" />
                Top Creators
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                <span className="block">{t.topDesigners.title}</span>
                <span className="block bg-gradient-to-r from-[#1B6EF3] via-[#1755E0] to-[#1B6EF3] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                  {t.topDesigners.titleHighlight}
                </span>
              </h2>
            </div>

            {/* Card 1 */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-5 sm:p-6 group border border-gray-100 dark:border-white/10 hover:border-[#1B6EF3]/30 hover:shadow-[0_8px_32px_rgba(27,110,243,0.10)] transition-all duration-300 shadow-sm backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 btn-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_16px_rgba(27,110,243,0.3)]">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {t.topDesigners.cards.portfolioShowcase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-white/60 leading-relaxed">
                    {t.topDesigners.cards.portfolioShowcase.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-5 sm:p-6 group border border-gray-100 dark:border-white/10 hover:border-[#1B6EF3]/30 hover:shadow-[0_8px_32px_rgba(27,110,243,0.10)] transition-all duration-300 shadow-sm backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-[#1B6EF3]/10 dark:bg-[#1755E0]/60 border border-[#1B6EF3]/20 dark:border-[#1B6EF3]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B6EF3] dark:text-[#DFE7F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {t.topDesigners.cards.communityNetwork.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-white/60 leading-relaxed">
                    {t.topDesigners.cards.communityNetwork.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-5 sm:p-6 group border border-gray-100 dark:border-white/10 hover:border-[#1B6EF3]/30 hover:shadow-[0_8px_32px_rgba(27,110,243,0.10)] transition-all duration-300 shadow-sm backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-[#1B6EF3]/10 dark:bg-[#1755E0]/60 border border-[#1B6EF3]/20 dark:border-[#1B6EF3]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B6EF3] dark:text-[#DFE7F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {t.topDesigners.cards.qualityGuarantee.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-white/60 leading-relaxed">
                    {t.topDesigners.cards.qualityGuarantee.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link
                href="/designers"
                className="group btn-primary text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>{t.topDesigners.explorePortfolios}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                onClick={scrollToContact}
                className="group bg-gray-100 dark:bg-white/8 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold border border-gray-200 dark:border-white/15 hover:border-[#1B6EF3]/40 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{t.topDesigners.contactUs}</span>
              </button>
            </div>
          </div>

          {/* RIGHT — Platform Dashboard Mockup */}
          <div className="order-first lg:order-last flex items-center justify-center">
            <div className="relative w-full max-w-md">

              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#1B6EF3]/10 rounded-3xl blur-[60px] scale-90 pointer-events-none" />

              {/* Main dashboard card */}
              <div className="relative bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-[#1B6EF3]/20 shadow-[0_20px_60px_rgba(27,110,243,0.12)] dark:shadow-[0_0_60px_rgba(27,110,243,0.15)]">

                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-0.5">Platform Overview</p>
                    <h4 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg">Artvast Marketplace</h4>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl p-4 border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-white/4 hover:border-[#1B6EF3]/25 transition-colors duration-300"
                    >
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2.5`}>
                        <svg className={`w-4 h-4 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                        </svg>
                      </div>
                      <p className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-white/40 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Browse Categories */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-3">Browse Categories</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.label} className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 dark:bg-white/4 hover:bg-[#1B6EF3]/6 dark:hover:bg-white/8 border border-transparent hover:border-[#1B6EF3]/20 transition-all duration-200 cursor-pointer group/cat">
                        <span className="text-sm font-medium text-gray-700 dark:text-white/75 group-hover/cat:text-[#1B6EF3] transition-colors">{cat.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 dark:text-white/35">{cat.count} designers</span>
                          <svg className="w-3.5 h-3.5 text-gray-300 dark:text-white/20 group-hover/cat:text-[#1B6EF3] group-hover/cat:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/marketplace"
                  className="flex items-center justify-center gap-2 w-full btn-primary text-white font-semibold py-3 rounded-xl text-sm cursor-pointer group/cta"
                >
                  <span>Explore All Designers</span>
                  <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white dark:bg-[#1B6EF3] border border-gray-100 dark:border-transparent rounded-2xl px-3 py-2 shadow-[0_4px_20px_rgba(27,110,243,0.20)] dark:shadow-[0_0_20px_rgba(27,110,243,0.5)] animate-bounce-slow flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#1B6EF3] dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[#1B6EF3] dark:text-white text-xs font-bold">Top Rated</span>
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white dark:bg-[#0D1B3E] rounded-2xl px-3 py-2.5 border border-gray-100 dark:border-[#1B6EF3]/25 shadow-[0_4px_20px_rgba(27,110,243,0.12)] animate-float flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#1B6EF3", "#10B981", "#F59E0B"].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#050B1A]" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-gray-700 dark:text-white/80 text-xs font-semibold">+1.2k Clients</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopDesignersSection;
