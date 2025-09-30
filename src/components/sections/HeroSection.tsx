import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-gradient text-white relative overflow-hidden min-h-screen">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex items-start min-h-screen">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/20">
              🎨 Platform Terpercaya untuk Designer
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Empowering Designers,
            <br />
            Building a Creative
            <br />
            Community
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-delay">
            Showcase portfolios, safely sell your work and connect with local
            clients in a secure, professional environment
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2 mb-12">
            <button className="group bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center justify-center space-x-2">
              <span>Get Started</span>
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
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M3 3l3.586 3.586M21 21l-3.586-3.586"
                />
              </svg>
              <span>Learn More</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/70 text-sm">Active Designers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-white/70 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-white/70 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;