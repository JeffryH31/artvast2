"use client";

import React from "react";
import ParticleEffect, { Magnetic } from "../animations/ParticleEffect";

const ValuePropositionsSection: React.FC = () => {
  return (
    // Seamless connection dari HeroSection
    <div className="seamless-section text-white">
      <div className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 xl:pb-32">
        {/* Efek partikel untuk memperkaya visual */}
        <ParticleEffect
          count={80}
          color="#ffffff"
          size={2}
          speed={0.3}
          className="opacity-10"
        />

        {/* Kontainer utama */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating Content Bridge, muncul dengan animasi float */}
          <div className="relative -mt-12 sm:-mt-16 lg:-mt-20 mb-12 sm:mb-16 lg:mb-24 z-30">
            <div
              className="animate-float"
              style={{ transform: "translateX(-50%)", animationDuration: "5s" }}
            >
              <div className="bg-white/10 backdrop-blur-md z-50 rounded-lg sm:rounded-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 w-max mx-auto max-w-[95vw]">
                <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 text-white/90">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-medium">Live Services</span>
                  </div>
                  <div className="w-px h-3 sm:h-4 bg-white/30 hidden sm:block"></div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">Premium Quality</span>
                  </div>
                  <div className="w-px h-3 sm:h-4 bg-white/30 hidden sm:block"></div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 border border-white"></div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border border-white"></div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border border-white"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">1000+ Designers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 border border-white/20 mb-4 sm:mb-6 lg:mb-8">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              <span>Featured Services</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in-up">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Value
              </span>{" "}
              Propositions
            </h2>
            <p
              className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up px-4"
              style={{ animationDelay: "0.2s" }}
            >
              Complete solutions for all your design and branding needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-10">
            {[
              {
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
                title: "Branding",
                description:
                  "The strategic system of visual, verbal, and experiential elements that shape perception, builds trust, and creates emotional connections to the market.",
                badge: "★",
                badgeColor: "from-yellow-400 to-orange-400",
                glowColor: "shadow-yellow-500/20",
              },
              {
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "UI/UX Design",
                description:
                  "The integration of visual identity UI and behavior patterns UX to create digital products that are usable, accessible, and aesthetically engaging.",
                badge: "◆",
                badgeColor: "from-green-400 to-blue-400",
                glowColor: "shadow-blue-500/20",
              },
              {
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M3 3l3.586 3.586M21 21l-3.586-3.586M6.364 6.364L10 10m0 0l3.636 3.636M10 10l3.636-3.636",
                title: "Motion Graphics",
                description:
                  "Visual art combining animated graphic design and visual effects to convey ideas, enhance storytelling, and engage audiences through dynamic movement and transitions.",
                badge: "●",
                badgeColor: "from-purple-400 to-pink-400",
                glowColor: "shadow-purple-500/20",
              },
            ].map((service, index) => (
              <Magnetic key={index} intensity={0.1}>
                <div
                  className={`group bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-xl sm:shadow-2xl hover:${service.glowColor} hover:shadow-3xl transform hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-3 transition-all duration-500 border border-white/10 relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl"></div>
                  <div className="text-center relative z-10">
                    <div className="relative mb-4 sm:mb-6 lg:mb-8">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${service.badgeColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg sm:shadow-xl relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl transform rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        <svg
                          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={service.icon}
                          />
                        </svg>
                      </div>
                      <div
                        className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r ${service.badgeColor} rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md sm:shadow-lg`}
                      >
                        {service.badge}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                      {service.description}
                    </p>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative pt-4 sm:pt-5 lg:pt-6 border-t border-gray-100">
                        <span className="inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                          Learn More
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuePropositionsSection;
