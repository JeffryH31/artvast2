"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const HomeCTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900 dark:from-gray-950 dark:via-[#0d0d1a] dark:to-gray-950 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#5D6BC6]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B5A8C]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#BD9587]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#5D6BC6] to-[#8B5A8C] rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-2xl">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          {t.portfolioPage?.readyToShowcase || "Ready to showcase your work?"}
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10">
          {t.portfolioPage?.joinThousands || "Join thousands of designers sharing their work, finding inspiration, and getting hired."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/become-designer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] text-white font-semibold rounded-xl sm:rounded-2xl hover:from-[#4A5AB3] hover:to-[#7A4979] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base"
          >
            <span>{t.portfolioPage?.registerAsDesigner || "Join as Designer"}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <span>{t.portfolioPage?.exploreDesigners || "Explore Work"}</span>
          </Link>
        </div>

        {/* Scrolling Categories Tags - Like Dribbble bottom */}
        <div className="mt-12 sm:mt-16 overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap opacity-50">
            {[
              "Mobile", "Typography", "Web Design", "Print", "Animation",
              "Illustration", "Branding", "Product Design", "UI/UX", "3D",
              "Logo", "Icons", "Dashboard", "Landing Page", "App Design",
            ].map((tag, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "Mobile", "Typography", "Web Design", "Print", "Animation",
              "Illustration", "Branding", "Product Design", "UI/UX", "3D",
            ].map((tag, index) => (
              <span
                key={`dup-${index}`}
                className="inline-block px-4 py-2 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;
