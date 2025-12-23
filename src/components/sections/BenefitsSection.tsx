import React from 'react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="value-gradient dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-900 py-16 sm:py-20 lg:py-24 xl:py-32 relative overflow-hidden transition-colors duration-300">
      {/* Enhanced Background decoration - responsive sizes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white/5 dark:bg-white/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white/5 dark:bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-white/3 dark:bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 dark:bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 dark:text-white/95 border border-white/20 dark:border-white/30 mb-4 sm:mb-6">
            💎 Exclusive Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              The Benefits
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
            Enjoy the best experience both as a client and designer with our premium features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* For Clients Card */}
          <div className="group bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-xl sm:shadow-2xl hover:shadow-white/10 transform hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 border border-white/10">
            {/* Enhanced Image placeholder */}
            <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl mb-5 sm:mb-8 h-40 sm:h-48 lg:h-56 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-yellow-200/20"></div>
              <div className="relative text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg sm:shadow-xl">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm sm:text-base text-orange-700 font-semibold">
                  Client Premium Experience
                </p>
                {/* Floating elements - hidden on very small screens */}
                <div className="hidden sm:block absolute top-4 right-4 w-3 h-3 sm:w-4 sm:h-4 bg-orange-300 rounded-full animate-bounce"></div>
                <div className="hidden sm:block absolute bottom-4 left-4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-1 sm:-left-2 top-0 bottom-0 w-0.5 sm:w-1 custom-gradient-bg rounded-full"></div>
              <div className="pl-4 sm:pl-6 lg:pl-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold custom-gradient-text mb-4 sm:mb-6 lg:mb-8">
                  For Clients
                </h3>
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                    <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                      AI powered matchmaking
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                    <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                      Transparent pricing
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                      <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium decoration-blue-500 decoration-2 group-hover/item:text-blue-700 transition-colors duration-300">
                        Escrow payments
                      </span>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          🔒 Secure
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* For Designers Card */}
          <div className="group bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-xl sm:shadow-2xl hover:shadow-white/10 transform hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 border border-white/10">
            {/* Enhanced Image placeholder */}
            <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 rounded-xl sm:rounded-2xl mb-5 sm:mb-8 h-40 sm:h-48 lg:h-56 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 to-blue-200/20"></div>
              <div className="relative text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg sm:shadow-xl">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-semibold">
                  Designer Growth Platform
                </p>
                {/* Floating elements - hidden on very small screens */}
                <div className="hidden sm:block absolute top-4 right-4 w-3 h-3 sm:w-4 sm:h-4 bg-blue-300 rounded-full animate-bounce delay-200"></div>
                <div className="hidden sm:block absolute bottom-4 left-4 w-2 h-2 sm:w-3 sm:h-3 bg-purple-300 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold custom-gradient-text mb-4 sm:mb-6 lg:mb-8">
                For Designers
              </h3>
              <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                    Gain exposures
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                    Self-fair prices
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                    Protect your IP
                  </span>
                </li>
                <li className="group/item flex items-start space-x-2 sm:space-x-3 lg:space-x-4 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 custom-gradient-bg rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
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
                  <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover/item:text-blue-700 transition-colors duration-300">
                    Grow your career
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