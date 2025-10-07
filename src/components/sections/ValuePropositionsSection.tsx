'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionTransition from '../animations/SectionTransition';
import ParticleEffect, { Magnetic } from '../animations/ParticleEffect';
import { RevealText } from '../animations/SectionEffects';

const ValuePropositionsSection: React.FC = () => {
  return (
    <div className="relative value-gradient overflow-visible value-section-start seamless-section">
      {/* Perfect Seamless Blend */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900 via-blue-900/80 to-transparent z-5" />
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-900 to-transparent z-5" />
      
      <div className="pt-20">
      {/* Floating Content Bridge - Clean & Simple */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30 animate-float">
        <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Services</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 border border-white"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border border-white"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border border-white"></div>
              </div>
              <span className="text-sm font-medium">1000+ Designers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>      <div className="py-20 relative">
        <ParticleEffect 
          count={80} 
          color="#ffffff" 
          size={2} 
          speed={0.3}
          className="opacity-10"
        />

        {/* Simple ambient backgrounds */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/3 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/20 mb-8">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              <span>Featured Services</span>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Value</span> Propositions
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Complete solutions for all your design and branding needs
            </p>
            
            {/* Enhanced Visual Separator with Animation */}
            <div className="flex items-center justify-center space-x-6 mb-16 animate-fade-in-up">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-white/30 animate-pulse"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg animate-bounce-slow"></div>
              <div className="h-px w-32 bg-gradient-to-r from-white/30 via-white/50 to-white/30 animate-gradient"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg animate-bounce-slow" style={{animationDelay: '0.5s'}}></div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/50 to-white/30 animate-pulse"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-float" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
              <div className="particle absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-float" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
              <div className="particle absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-float" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
              <div className="particle absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-float" style={{animationDelay: '3s', animationDuration: '7s'}}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
                title: "Branding",
                description: "The strategic system of visual, verbal, and experiential elements that shape perception, builds trust, and creates emotional connections to the market.",
                badge: "★",
                badgeColor: "from-yellow-400 to-orange-400",
                glowColor: "shadow-yellow-500/20"
              },
              {
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "UI/UX Design",
                description: "The integration of visual identity UI and behavior patterns UX to create digital products that are usable, accessible, and aesthetically engaging.",
                badge: "◆",
                badgeColor: "from-green-400 to-blue-400",
                glowColor: "shadow-blue-500/20"
              },
              {
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M3 3l3.586 3.586M21 21l-3.586-3.586M6.364 6.364L10 10m0 0l3.636 3.636M10 10l3.636-3.636",
                title: "Motion Graphics",
                description: "Visual art animated graphic design and visual effects to convey ideas, enhance storytelling, and engage audiences through movement.",
                badge: "●",
                badgeColor: "from-purple-400 to-pink-400",
                glowColor: "shadow-purple-500/20"
              }
            ].map((service, index) => (
              <Magnetic key={index} intensity={0.1}>
                <div className={`group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:${service.glowColor} hover:shadow-3xl transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 border border-white/10 relative overflow-hidden`}>
                  {/* Premium Card Overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${service.badgeColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl transform rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        <svg
                          className="w-10 h-10 text-white relative z-10"
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
                      <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${service.badgeColor} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {service.badge}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                      {service.description}
                    </p>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative pt-6 border-t border-gray-100">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  );
};

export default ValuePropositionsSection;
