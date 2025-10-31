"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFaqs } from "@/hooks/useFaqs";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, language } = useLanguage();
  const { faqs, loading, error } = useFaqs(); // No limit, show all FAQs

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Helper function to get FAQ content based on current language
  const getFaqContent = (faq: {
    questionTr: string;
    questionEn: string;
    answerTr: string;
    answerEn: string;
  }) => {
    return {
      question: language === "en" ? faq.questionEn : faq.questionTr,
      answer: language === "en" ? faq.answerEn : faq.answerTr,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t.faq.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4 max-w-3xl mx-auto">
              {t.faq.subtitle}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-gray-600 mt-4">SSS yükleniyor...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && faqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Henüz SSS bulunmuyor.</p>
              </div>
            )}

            {!loading &&
              faqs.map((faq, index) => {
                const faqContent = getFaqContent(faq);
                return (
                  <div
                    key={faq.faqId || index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-3 sm:pr-4">
                        {faqContent.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transform transition-transform ${
                            openIndex === index ? "rotate-180" : ""
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
                      </div>
                    </button>

                    {openIndex === index && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                        <div className="border-t border-gray-200 pt-4 sm:pt-5">
                          <div
                            className="text-gray-700 leading-relaxed text-sm sm:text-base prose max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: faqContent.answer,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Back to Home */}
          {!loading && faqs.length > 0 && (
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
