"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';

const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="value-gradient py-12 sm:py-16 lg:py-20 relative overflow-hidden transition-colors duration-300">
      {/* Enhanced Background decoration - responsive sizes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white/5 dark:bg-white/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white/5 dark:bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-white/3 dark:bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 dark:text-white/95 border border-white/20 dark:border-white/30 mb-4 sm:mb-6">
            💎 {t.benefits.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {t.benefits.title}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
            {t.benefits.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* For Clients Card */}
          <div className="group bg-white/8 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-[0_8px_32px_rgba(27,110,243,0.15)] transform hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 border border-white/10">
            {/* For Clients — UI Mockup */}
            <div className="relative bg-gradient-to-br from-[#EEF2FF] via-[#E8EDFF] to-[#DDE5FF] rounded-xl mb-4 sm:mb-5 h-36 sm:h-40 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-[#1B6EF3]/5"></div>
              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                <div className="w-full max-w-[220px]">
                  {/* Search bar */}
                  <div className="bg-white rounded-xl shadow-lg px-2.5 py-2 mb-2.5 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#1B6EF3] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full"></div>
                    <div className="h-5 w-10 rounded-md bg-gradient-to-r from-[#1B6EF3] to-[#1755E0] flex-shrink-0"></div>
                  </div>
                  {/* Designer cards grid */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { gradient: "from-[#1B6EF3] to-[#1755E0]", star: "4.9" },
                      { gradient: "from-violet-500 to-purple-600", star: "5.0" },
                      { gradient: "from-teal-500 to-emerald-600", star: "4.8" },
                    ].map((d, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm p-1.5">
                        <div className={`w-full h-9 rounded-lg mb-1 bg-gradient-to-br ${d.gradient}`}></div>
                        <div className="h-1.5 bg-gray-200 rounded-full mb-1"></div>
                        <div className="text-[8px] font-bold text-amber-500">★ {d.star}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-2.5 right-2.5 bg-[#1B6EF3] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                500+ Designers
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-1 sm:-left-2 top-0 bottom-0 w-0.5 sm:w-1 custom-gradient-bg rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold custom-gradient-text mb-3 sm:mb-4">
                  {t.benefits.forClients.title}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                      {t.benefits.forClients.features.aiMatchmaking}
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                      {t.benefits.forClients.features.transparentPricing}
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm sm:text-base text-white/90 font-medium decoration-[#DFE7F7] decoration-2 group-hover/item:text-white transition-colors duration-300">
                        {t.benefits.forClients.features.escrowPayments}
                      </span>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-[#1B6EF3]/20 text-[#DFE7F7] border border-[#1B6EF3]/30">
                          🔒 {t.benefits.forClients.features.secure}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* For Designers Card */}
          <div className="group bg-white/8 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-[0_8px_32px_rgba(27,110,243,0.15)] transform hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 border border-white/10">
            {/* For Designers — Portfolio Mockup */}
            <div className="relative bg-gradient-to-br from-[#EEF2FF] via-[#E8EDFF] to-[#DDE5FF] rounded-xl mb-4 sm:mb-5 h-36 sm:h-40 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-[#1755E0]/5"></div>
              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                <div className="w-full max-w-[220px]">
                  {/* Profile & stats card */}
                  <div className="bg-white rounded-xl shadow-lg p-2.5 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1B6EF3] to-[#1755E0] flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-1.5 w-16 bg-gray-200 rounded-full mb-0.5"></div>
                        <div className="h-1 w-10 bg-gray-100 rounded-full"></div>
                      </div>
                      <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold">PRO</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="bg-[#1B6EF3]/10 rounded-lg p-1.5 text-center">
                        <div className="text-[9px] font-extrabold text-[#1B6EF3]">148</div>
                        <div className="text-[7px] text-gray-400">Jobs</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-1.5 text-center">
                        <div className="text-[9px] font-extrabold text-amber-600">4.9★</div>
                        <div className="text-[7px] text-gray-400">Rating</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-1.5 text-center">
                        <div className="text-[9px] font-extrabold text-emerald-600">$8k</div>
                        <div className="text-[7px] text-gray-400">Earned</div>
                      </div>
                    </div>
                  </div>
                  {/* Portfolio thumbnails */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {["from-[#1B6EF3] to-[#1755E0]", "from-violet-400 to-purple-500", "from-[#1755E0] to-[#1B6EF3]"].map((g, i) => (
                      <div key={i} className={`h-10 rounded-lg bg-gradient-to-br ${g}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md">
                +$2.4k / month
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold custom-gradient-text mb-3 sm:mb-4">
                {t.benefits.forDesigners.title}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                    {t.benefits.forDesigners.features.gainExposure}
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                    {t.benefits.forDesigners.features.fairPricing}
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                    {t.benefits.forDesigners.features.protectIP}
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/90 font-medium group-hover/item:text-white transition-colors duration-300">
                    {t.benefits.forDesigners.features.growCareer}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;