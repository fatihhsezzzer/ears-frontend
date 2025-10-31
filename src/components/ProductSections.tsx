"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductSections() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t.products.sectionTitle}
          </h2>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Visionary Sound */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-800 to-black h-60 sm:h-72 lg:h-80 mb-6 flex items-center justify-center rounded-lg">
              <div className="text-white text-center px-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                  {t.products.visionarySound.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-md mx-auto">
                  {t.products.visionarySound.subtitle}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {t.products.visionarySound.description}
            </p>
          </div>

          {/* Stage Quality */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-600 to-gray-800 h-60 sm:h-72 lg:h-80 mb-6 flex items-center justify-center rounded-lg">
              <div className="text-white text-center px-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                  {t.products.stageQuality.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-md mx-auto">
                  {t.products.stageQuality.subtitle}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {t.products.stageQuality.description}
            </p>
          </div>
        </div>

        {/* Product Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Custom Line */}
          <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">
                  C
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">
                {t.products.customLine.title}
              </h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
              {t.products.customLine.description}
            </p>
            <Link
              href="/products/custom-line"
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold hover:bg-gray-800 transition-colors inline-block rounded text-sm sm:text-base w-full sm:w-auto text-center"
            >
              {t.products.customLine.button}
            </Link>
          </div>

          {/* Premium Line */}
          <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">
                  P
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">
                {t.products.premiumLine.title}
              </h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
              {t.products.premiumLine.description}
            </p>
            <Link
              href="/products/premium-line"
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 font-semibold hover:bg-gray-800 transition-colors inline-block rounded text-sm sm:text-base w-full sm:w-auto text-center"
            >
              {t.products.premiumLine.button}
            </Link>
          </div>
        </div>

        {/* Configurator CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8 lg:p-12 text-center text-white rounded-lg">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
            {t.products.configurator.title}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-300">
            {t.products.configurator.description}
          </p>
          <Link
            href="/products/configurator"
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base lg:text-lg hover:bg-gray-200 transition-colors inline-block rounded"
          >
            {t.products.configurator.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
