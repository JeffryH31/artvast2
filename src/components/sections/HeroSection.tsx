'use client';

import React from 'react';

const HeroSection: React.FC = () => {

  return (
    <div className="text-white relative overflow-hidden seamless-section">
      <div className="min-h-screen">
        {/* Konten Utama Hero */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex items-center min-h-[90vh] z-20">
          <div className="max-w-2xl">
            <div className="mb-6 animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/20">
                🎨 Trusted Platform for Designers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Empowering Designers, Building a Creative Community
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Showcase portfolios, safely sell your work and connect with local clients in a secure, professional environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="group bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Learn More</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-center"><div className="text-3xl md:text-4xl font-bold mb-2">1000+</div><div className="text-white/70 text-sm">Active Designers</div></div>
              <div className="text-center"><div className="text-3xl md:text-4xl font-bold mb-2">500+</div><div className="text-white/70 text-sm">Projects Completed</div></div>
              <div className="text-center"><div className="text-3xl md:text-4xl font-bold mb-2">98%</div><div className="text-white/70 text-sm">Client Satisfaction</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;