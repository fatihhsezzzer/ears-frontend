"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Page Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.aboutUs.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t.aboutUs.subtitle}
          </p>
        </div>

        {/* About Content */}
        <div className="space-y-16 lg:space-y-20">
          {/* Vision Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t.aboutUs.vision.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                {t.aboutUs.vision.description}
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.aboutUs.vision.additional}
              </p>
            </div>
            <div className="order-first lg:order-last">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t.aboutUs.vision.imageText}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quality Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t.aboutUs.quality.imageText}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t.aboutUs.quality.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                {t.aboutUs.quality.description}
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.aboutUs.quality.additional}
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.aboutUs.values.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t.aboutUs.values.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Precision */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t.aboutUs.values.precision.title}
                </h3>
                <p className="text-gray-600">
                  {t.aboutUs.values.precision.description}
                </p>
              </div>

              {/* Innovation */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t.aboutUs.values.innovation.title}
                </h3>
                <p className="text-gray-600">
                  {t.aboutUs.values.innovation.description}
                </p>
              </div>

              {/* Craftsmanship */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t.aboutUs.values.craftsmanship.title}
                </h3>
                <p className="text-gray-600">
                  {t.aboutUs.values.craftsmanship.description}
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.aboutUs.team.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t.aboutUs.team.subtitle}
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 lg:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                  {t.aboutUs.team.message.title}
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed mb-8">
                  {t.aboutUs.team.message.content}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">A</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">A TUNE EARS</div>
                    <div className="text-sm text-gray-300">
                      {t.aboutUs.team.message.signature}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t.aboutUs.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.aboutUs.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <a
                href="/products"
                className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors rounded-lg"
              >
                {t.aboutUs.cta.productsButton}
              </a>
              <a
                href="/contact"
                className="border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-black hover:text-white transition-colors rounded-lg"
              >
                {t.aboutUs.cta.contactButton}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
