import React from "react";

const TopDesignersSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration - responsive sizes */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight">
              <span className="block">Top</span>
              <span className="block custom-gradient-text">Designers</span>
            </h2>

            {/* Enhanced Cards */}
            {/* Card with gradient background */}
            <div className="hero-gradient text-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 shadow-xl sm:shadow-2xl hover:shadow-blue-500/25 group">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">
                    Premium Portfolio Showcase
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    Body text for whatever you&apos;d like to expand on the main
                    point. Showcase your best work with advanced portfolio
                    features.
                  </p>
                </div>
              </div>
            </div>

            {/* Card with gray background */}
            <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 border border-gray-100 group">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 custom-gradient-light rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 custom-gradient-text"
                    fill="none"
                    stroke="white"
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
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    Community Network
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Body text for whatever you&apos;d like to say. Add main takeaway
                    points, quotes, anecdotes. Connect with fellow designers.
                  </p>
                </div>
              </div>
            </div>

            {/* Simple text card */}
            <div className="custom-gradient-light p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 custom-gradient-bg rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    Quality Guarantee
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Body text for whatever you&apos;d like to add more to the main
                    point. It provides details, explanations, and context about
                    our quality standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8">
              <button className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                <span>Explore Portfolios</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button className="group bg-white text-gray-900 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>Contact Us</span>
              </button>
            </div>
          </div>

          {/* Right Enhanced Image */}
          <div className="order-first lg:order-last">
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center shadow-xl sm:shadow-2xl border border-orange-100 transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 group">
                <div className="text-center">
                  <div className="relative mb-4 sm:mb-6 lg:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl sm:rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg sm:shadow-xl">
                      <svg
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 custom-gradient-bg rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-800 mb-2 sm:mb-3 lg:mb-4">
                    Premium Portfolio Showcase
                  </h4>
                  <p className="text-sm sm:text-base text-orange-700 font-medium px-2">
                    Featuring world-class designer portfolios
                  </p>
                  <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-300 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Floating elements - hide on very small screens */}
              <div className="hidden sm:flex absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 custom-gradient-bg rounded-xl sm:rounded-2xl items-center justify-center shadow-lg sm:shadow-xl animate-bounce">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="hidden sm:flex absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 custom-gradient-bg rounded-xl sm:rounded-2xl items-center justify-center shadow-lg sm:shadow-xl animate-pulse">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDesignersSection;
