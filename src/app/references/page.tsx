"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReferences } from "@/hooks/useReferences";
import { Reference } from "@/types/api";

export default function ReferencesPage() {
  const { t, language } = useLanguage();
  const { references, loading, error } = useReferences(); // No limit, show all references
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Helper function to get reference content based on current language
  const getReferenceContent = (reference: Reference) => {
    return {
      customerName: reference.customerName || "Müşteri",
      companyName: reference.companyName || "",
      testimonial:
        language === "en"
          ? reference.testimonialEn ||
            reference.testimonialTr ||
            "Great experience!"
          : reference.testimonialTr ||
            reference.testimonialEn ||
            "Harika bir deneyim yaşadık.",
      rating: reference.rating || 5,
      imageUrl: reference.imageUrl,
    };
  };

  const handleImageError = (referenceId: number) => {
    setImageErrors((prev) => ({ ...prev, [referenceId]: true }));
  };

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15.27L16.18 19 14.54 11.97 20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t.references.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4 max-w-3xl mx-auto">
              {t.references.subtitle}
            </p>
          </div>

          {/* References Content */}
          <div className="space-y-6 sm:space-y-8">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-gray-600 mt-4">Referanslar yükleniyor...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && references.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Henüz referans bulunmuyor.
                </p>
              </div>
            )}

            {!loading && references.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {references.map((reference, index) => {
                  const referenceContent = getReferenceContent(reference);
                  const referenceId = reference.referenceId || index;

                  return (
                    <div
                      key={referenceId}
                      className="bg-white rounded-lg shadow-md p-6 sm:p-8 relative hover:shadow-lg transition-shadow"
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 text-gray-300">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic">
                          &ldquo;{referenceContent.testimonial}&rdquo;
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {renderStars(referenceContent.rating)}
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center">
                        {/* Avatar */}
                        <div className="flex-shrink-0 mr-4">
                          {referenceContent.imageUrl &&
                          !imageErrors[referenceId] ? (
                            <Image
                              src={referenceContent.imageUrl}
                              alt={referenceContent.customerName}
                              width={48}
                              height={48}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                              onError={() => handleImageError(referenceId)}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-700 font-semibold text-xs sm:text-sm">
                                {generateInitials(
                                  referenceContent.customerName
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Name and Company */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {referenceContent.customerName}
                          </h4>
                          {referenceContent.companyName && (
                            <p className="text-gray-600 text-xs sm:text-sm">
                              {referenceContent.companyName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Back to Home */}
          {!loading && references.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/"
                className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
