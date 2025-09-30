export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-black/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ArtVast
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-gray-900 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">Home</span>
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">About Us</span>
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  <span className="relative z-10">Categories</span>
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
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

      {/* Value Propositions Section */}
      <section className="value-gradient py-24 lg:py-32 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-32 right-32 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/20 mb-6">
              💼 Layanan Unggulan
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Our Value Propositions
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Solusi lengkap untuk semua kebutuhan desain dan branding Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Branding Card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/10 animate-fade-in-up">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ★
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-6 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  Branding
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The strategic system of visual, verbal, and experiential
                  elements that shape perception, builds trust, and creates
                  emotional connections to the market.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
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

            {/* UI/UX Design Card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/10 animate-fade-in-up delay-200">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✦
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-6 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  UI/UX Design
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The integration of visual identity UI and behavior patterns UX
                  to create digital products that are usable, accessible, and
                  aesthetically engaging.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
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

            {/* Motion Graphics Card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/10 animate-fade-in-up delay-400">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M3 3l3.586 3.586M21 21l-3.586-3.586M6.364 6.364L10 10m0 0l3.636 3.636M10 10l3.636-3.636"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ◆
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-6 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  Motion Graphics
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Visual art animated graphic design and visual effects to
                  convey ideas, enhance storytelling, and engage audiences
                  through movement.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
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
        </div>
      </section>

      {/* Top Designers Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 border border-blue-200 mb-6">
                  🏆 Designer Terbaik
                </span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  <span className="block">Top</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Designers
                  </span>
                </h2>
              </div>

              {/* Enhanced Cards */}
              {/* Card with gradient background */}
              <div className="hero-gradient text-white p-8 rounded-3xl transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      Premium Portfolio Showcase
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Body text for whatever you'd like to expand on the main
                      point. Showcase your best work with advanced portfolio
                      features.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card with gray background */}
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Community Network
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Body text for whatever you'd like to say. Add main
                      takeaway points, quotes, anecdotes. Connect with fellow
                      designers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Simple text card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-100 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Quality Guarantee
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Body text for whatever you'd like to add more to the main
                      point. It provides details, explanations, and context
                      about our quality standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button className="group bg-gradient-to-r from-gray-900 to-gray-800 text-white px-10 py-4 rounded-2xl font-semibold hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3">
                  <span>Explore Portfolios</span>
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                <button className="group bg-white text-gray-900 px-10 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
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
                <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 rounded-3xl p-12 h-[500px] flex items-center justify-center shadow-2xl border border-orange-100 transform hover:scale-105 transition-all duration-500 group">
                  <div className="text-center">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                        <svg
                          className="w-16 h-16 text-white"
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
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
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
                    <h4 className="text-2xl font-bold text-orange-800 mb-4">
                      Premium Portfolio Showcase
                    </h4>
                    <p className="text-orange-700 font-medium">
                      Featuring world-class designer portfolios
                    </p>
                    <div className="flex justify-center space-x-2 mt-6">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                      <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                  <svg
                    className="w-8 h-8 text-white"
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
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <svg
                    className="w-10 h-10 text-white"
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

      {/* The Benefits Section */}
      <section className="value-gradient py-24 lg:py-32 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/20 mb-6">
              💎 Keuntungan Eksklusif
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="block">The</span>
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Nikmati pengalaman terbaik baik sebagai client maupun designer
              dengan fitur-fitur premium kami
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Clients Card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/10">
              {/* Enhanced Image placeholder */}
              <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 rounded-2xl mb-8 h-56 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-yellow-200/20"></div>
                <div className="relative text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <p className="text-orange-700 font-semibold">
                    Client Premium Experience
                  </p>
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-orange-300 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <div className="pl-8">
                  <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8">
                    For Clients
                  </h3>
                  <ul className="space-y-6">
                    <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 text-white"
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
                      <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                        AI powered matchmaking
                      </span>
                    </li>
                    <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 text-white"
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
                      <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                        Transparent pricing
                      </span>
                    </li>
                    <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 text-white"
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
                        <span className="text-gray-700 font-medium text-lg underline decoration-blue-500 decoration-2 group-hover/item:text-blue-700 transition-colors duration-300">
                          Escrow payments
                        </span>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
            <div className="group bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-white/10">
              {/* Enhanced Image placeholder */}
              <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 rounded-2xl mb-8 h-56 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 to-blue-200/20"></div>
                <div className="relative text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <p className="text-gray-700 font-semibold">
                    Designer Growth Platform
                  </p>
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-blue-300 rounded-full animate-bounce delay-200"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8">
                  For Designers
                </h3>
                <ul className="space-y-6">
                  <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                      Gain exposures
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                      Self-fair prices
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                      Protect your IP
                    </span>
                  </li>
                  <li className="group/item flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <span className="text-gray-700 font-medium text-lg group-hover/item:text-blue-700 transition-colors duration-300">
                      Grow your career
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
