"use client";

import React from "react";
import { useBanners, useFaqs, useTestimonials } from "@/hooks/useApi";

// Example component showing how to use the API hooks
export default function ApiTestComponent() {
  const {
    banners,
    loading: bannersLoading,
    error: bannersError,
  } = useBanners();
  const { faqs, loading: faqsLoading, error: faqsError } = useFaqs();
  const {
    testimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
  } = useTestimonials();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>

      {/* Banners Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Banners</h2>
        {bannersLoading && <p>Loading banners...</p>}
        {bannersError && <p className="text-red-500">Error: {bannersError}</p>}
        {banners && banners.length > 0 ? (
          <div className="grid gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{banner.title}</h3>
                {banner.description && (
                  <p className="text-gray-600">{banner.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Language: {banner.language}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !bannersLoading && <p>No banners found</p>
        )}
      </section>

      {/* FAQs Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        {faqsLoading && <p>Loading FAQs...</p>}
        {faqsError && <p className="text-red-500">Error: {faqsError}</p>}
        {faqs && faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.faqId} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{faq.questionTr || faq.questionEn}</h3>
                <p className="text-gray-600 mt-2">{faq.answerTr || faq.answerEn}</p>
                <p className="text-sm text-gray-500">
                  Order: {faq.sortOrder}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !faqsLoading && <p>No FAQs found</p>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
        {testimonialsLoading && <p>Loading testimonials...</p>}
        {testimonialsError && (
          <p className="text-red-500">Error: {testimonialsError}</p>
        )}
        {testimonials && testimonials.length > 0 ? (
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{testimonial.customerName}</h3>
                {testimonial.companyName && (
                  <p className="text-sm text-gray-500">
                    {testimonial.companyName}
                  </p>
                )}
                <p className="text-gray-600 mt-2">{testimonial.content}</p>
                <p className="text-sm text-gray-500">
                  Rating: {testimonial.rating}/5
                </p>
                <p className="text-sm text-gray-500">
                  Language: {testimonial.language}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !testimonialsLoading && <p>No testimonials found</p>
        )}
      </section>
    </div>
  );
}
