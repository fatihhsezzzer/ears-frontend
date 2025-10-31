import { useState, useEffect } from "react";
import { FaqService } from "@/services/apiServices";
import { Faq } from "@/types/api";

export function useFaqs(limit?: number) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await FaqService.getPublicFaqs();

        let faqData: Faq[] = [];

        // Handle response - should be direct array based on service implementation
        if (response && Array.isArray(response)) {
          faqData = response;
        } else {
          setError("SSS verileri yüklenirken beklenmeyen format");
          return;
        }

        // Since this is the public FAQ endpoint, we assume all returned FAQs are active
        // Apply limit if specified
        const finalFaqs = limit ? faqData.slice(0, limit) : faqData;
        setFaqs(finalFaqs);
      } catch (err) {
        console.error("useFaqs - Error fetching FAQs:", err);
        setError("SSS verileri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [limit]);

  return { faqs, loading, error };
}
