"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFaqs } from "@/hooks/useFaqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, language } = useLanguage();
  const { faqs, loading, error } = useFaqs(4); // Limit to 4 FAQs for homepage

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
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.faq.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">SSS yükleniyor...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && faqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">Henüz SSS bulunmuyor.</p>
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
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
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
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <div className="border-t border-gray-200 pt-3 sm:pt-4">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {faqContent.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* All FAQs Link */}
        {!loading && faqs.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/faq"
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors inline-block w-full sm:w-auto"
            >
              Tüm SSS&apos;leri Görüntüle
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
