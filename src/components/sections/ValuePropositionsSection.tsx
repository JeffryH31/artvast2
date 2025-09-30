import React from 'react';

const ValuePropositionsSection: React.FC = () => {
  return (
    <section className="py-20 value-gradient relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
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
  );
};

export default ValuePropositionsSection;