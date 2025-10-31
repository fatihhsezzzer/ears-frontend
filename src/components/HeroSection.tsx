"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white px-4 sm:px-6 -mt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Images/ears_banner.png')",
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto py-20 pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
          {t.hero.title}
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light mb-8 text-gray-200 tracking-wide">
          {t.hero.subtitle}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <Link
            href="/products"
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-200 transition-colors rounded-sm"
          >
            {t.hero.productsButton}
          </Link>
          <Link
            href="/about-us"
            className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-white hover:text-black transition-colors rounded-sm"
          >
            {t.hero.aboutUsButton}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
