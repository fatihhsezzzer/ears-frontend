"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServices } from "@/hooks/useServices";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const { t, language } = useLanguage();
  const { services, loading } = useServices();

  // Helper function to get service name based on current language
  const getServiceName = (service: {
    nameTr: string | null;
    nameEn: string | null;
  }) => {
    if (language === "tr") {
      return service.nameTr || service.nameEn || "İsimsiz Hizmet";
    } else {
      return service.nameEn || service.nameTr || "Unnamed Service";
    }
  };

  // Handle dropdown hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductsOpen(false);
    }, 300); // 300ms delay before closing
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/Images/Logo_Whıte_Big.png"
                alt="A TUNE EARS"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  {t.nav.products}
                  <svg
                    className={`ml-1 w-4 h-4 transform transition-transform ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* All Products Link */}
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 font-semibold border-b border-gray-200"
                    >
                      {t.footer?.allProducts || "Tüm Ürünler"}
                    </Link>

                    {/* Services Links */}
                    {!loading &&
                      services.map((service) => (
                        <Link
                          key={service.serviceId}
                          href={`/products/category/${service.serviceId}`}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                        >
                          {getServiceName(service)}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
              <Link
                href="/how-to-order"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.howToOrder}
              </Link>
              <Link
                href="/support"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.support}
              </Link>
              <Link
                href="/references"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.references}
              </Link>
              <Link
                href="/about-us"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.aboutUs}
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.blog}
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
              {/* Mobile Products Section */}
              <div>
                <div className="text-gray-300 px-3 py-2 text-base font-medium border-b border-gray-700">
                  {t.nav.products}
                </div>

                {/* All Products Link */}
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white block px-6 py-2 text-sm font-semibold"
                >
                  • {t.footer?.allProducts || "Tüm Ürünler"}
                </Link>

                {/* Services Links */}
                {!loading &&
                  services.map((service) => (
                    <Link
                      key={service.serviceId}
                      href={`/products/category/${service.serviceId}`}
                      className="text-gray-400 hover:text-white block px-6 py-2 text-sm"
                    >
                      • {getServiceName(service)}
                    </Link>
                  ))}
              </div>
              <Link
                href="/how-to-order"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.howToOrder}
              </Link>
              <Link
                href="/support"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.support}
              </Link>
              <Link
                href="/references"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.references}
              </Link>
              <Link
                href="/about-us"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.aboutUs}
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.blog}
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                {t.nav.contact}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-800">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
