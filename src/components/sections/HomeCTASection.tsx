"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const HomeCTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-[#050B1A] via-[#1C277B] to-[#050B1A] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#234CF9]/25 rounded-full blur-[120px] animate-gentle-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1C277B]/30 rounded-full blur-[140px] animate-gentle-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#234CF9]/10 rounded-full blur-[100px] animate-gentle-pulse delay-300"></div>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 40V0H40%22 stroke=%22white%22 stroke-opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 btn-primary rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 animate-glow-pulse">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6">
          <span className="block">{(t.portfolioPage?.readyToShowcase || "Ready to showcase your work?").split(' ').slice(0, -2).join(' ')}</span>
          <span className="block bg-gradient-to-r from-[#234CF9] via-[#DFE7F7] to-[#234CF9] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">{(t.portfolioPage?.readyToShowcase || "your work?").split(' ').slice(-2).join(' ')}</span>
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg lg:text-xl text-white/65 max-w-2xl mx-auto mb-8 sm:mb-10">
          {t.portfolioPage?.joinThousands || "Join thousands of designers sharing their work, finding inspiration, and getting hired."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/become-designer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base"
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

        {/* Scrolling Categories Tags */}
        <div className="mt-12 sm:mt-16 overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[
              "Mobile", "Typography", "Web Design", "Print", "Animation",
              "Illustration", "Branding", "Product Design", "UI/UX", "3D",
              "Logo", "Icons", "Dashboard", "Landing Page", "App Design",
            ].map((tag, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-[#234CF9]/15 rounded-full text-sm text-[#DFE7F7]/70 border border-[#234CF9]/25 hover:bg-[#234CF9]/25 hover:text-white transition-colors duration-300"
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
                className="inline-block px-4 py-2 bg-[#234CF9]/15 rounded-full text-sm text-[#DFE7F7]/70 border border-[#234CF9]/25"
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
