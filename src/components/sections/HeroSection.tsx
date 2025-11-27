"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="text-white relative overflow-hidden min-h-screen pt-16 sm:pt-20">
      {/* Konten Utama Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 flex items-center min-h-[85vh] sm:min-h-[90vh] z-20">
        <div className="max-w-2xl w-full">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 animate-fade-in-up">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 border border-white/20">
              🎨 Trusted Platform for Designers
            </span>
          </div>
          
          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Empowering Designers, Building a Creative Community
          </h1>
          
          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Showcase portfolios, safely sell your work and connect with local
            clients in a secure, professional environment
          </p>
          
          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button className="group bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center justify-center space-x-2 text-sm sm:text-base">
              <span>Get Started</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
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
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
              <span>Learn More</span>
            </button>
          </div>
          
          {/* Stats Section */}
          <div
            className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">1000+</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">Active Designers</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">98%</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
