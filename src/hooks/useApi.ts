"use client";

import { useState, useEffect } from "react";
import { apiServices } from "@/services/apiServices";
import { useLanguage } from "@/contexts/LanguageContext";
import type {
  Banner,
  Blog,
  Faq,
  Galeri,
  GaleriTag,
  Reference,
  ServiceApiResponse,
  Setting,
  Testimonial,
} from "@/types/api";

// Generic hook for API data fetching
function useApiData<T>(
  fetchFunction: () => Promise<{ success: boolean; data: T }>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFunction();
        if (response.success) {
          setData(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: () => setLoading(true) };
}

// Generic hook for direct API data (without ApiResponse wrapper)
function useDirectApiData<T>(
  fetchFunction: () => Promise<T>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFunction();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: () => setLoading(true) };
}

// Banners hook
export function useBanners() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useApiData<Banner[]>(
    () => apiServices.banner.getPublicBanners(),
    [language]
  );

  // Filter banners by current language
  const filteredBanners =
    data?.filter((banner) => banner.language === language) || [];

  return {
    banners: filteredBanners,
    loading,
    error,
    refetch,
  };
}

// Blogs hook
export function useBlogs() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useApiData<Blog[]>(
    () => apiServices.blog.getPublicBlogs(),
    [language]
  );

  // Filter blogs by current language - check if blog has content in the current language
  const filteredBlogs =
    data?.filter((blog) => {
      if (language === "tr") {
        return blog.titleTr && blog.descriptionTr;
      } else {
        return blog.titleEn && blog.descriptionEn;
      }
    }) || [];

  return {
    blogs: filteredBlogs,
    loading,
    error,
    refetch,
  };
}

// Single blog hook
export function useBlog(id: number) {
  const { data, loading, error, refetch } = useApiData<Blog>(
    () => apiServices.blog.getPublicBlogById(id),
    [id]
  );

  return {
    blog: data,
    loading,
    error,
    refetch,
  };
}

// FAQs hook
export function useFaqs() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useDirectApiData<Faq[]>(
    () => apiServices.faq.getPublicFaqs(),
    [language]
  );

  // Filter FAQs by current language - check if FAQ has content in the current language
  const filteredFaqs = data?.filter((faq) => {
    if (language === "tr") {
      return faq.questionTr && faq.answerTr;
    } else {
      return faq.questionEn && faq.answerEn;
    }
  }) || [];

  return {
    faqs: filteredFaqs,
    loading,
    error,
    refetch,
  };
}

// Gallery hook
export function useGallery() {
  const { data, loading, error, refetch } = useApiData<Galeri[]>(
    () => apiServices.galeri.getPublicGaleri(),
    []
  );

  return {
    gallery: data || [],
    loading,
    error,
    refetch,
  };
}

// Gallery Tags hook
export function useGalleryTags() {
  const { data, loading, error, refetch } = useApiData<GaleriTag[]>(
    () => apiServices.galeriTag.getPublicGaleriTags(),
    []
  );

  return {
    tags: data || [],
    loading,
    error,
    refetch,
  };
}

// References hook
export function useReferences() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useApiData<Reference[]>(
    () => apiServices.reference.getPublicReferences(),
    [language]
  );

  // Filter references by current language - check if reference has content in the current language
  const filteredReferences = data?.filter((ref) => {
    if (language === "tr") {
      return ref.testimonialTr;
    } else {
      return ref.testimonialEn;
    }
  }) || [];

  return {
    references: filteredReferences,
    loading,
    error,
    refetch,
  };
}

// Services hook
export function useServices() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useDirectApiData<ServiceApiResponse[]>(
    () => apiServices.service.getPublicServices(),
    [language]
  );

  // Filter services by current language - check if service has content in the current language
  const filteredServices = data?.filter((service) => {
    if (language === "tr") {
      return service.nameTr;
    } else {
      return service.nameEn;
    }
  }) || [];

  return {
    services: filteredServices,
    loading,
    error,
    refetch,
  };
}

// Settings hook
export function useSettings() {
  const { data, loading, error, refetch } = useApiData<Setting[]>(
    () => apiServices.setting.getPublicSettings(),
    []
  );

  // Convert settings array to key-value object for easier access
  const settings =
    data?.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>) || {};

  return {
    settings,
    settingsArray: data || [],
    loading,
    error,
    refetch,
  };
}

// Testimonials hook
export function useTestimonials() {
  const { language } = useLanguage();

  const { data, loading, error, refetch } = useApiData<Testimonial[]>(
    () => apiServices.testimonial.getPublicTestimonials(),
    [language]
  );

  // Filter testimonials by current language
  const filteredTestimonials =
    data?.filter((testimonial) => testimonial.language === language) || [];

  return {
    testimonials: filteredTestimonials,
    loading,
    error,
    refetch,
  };
}
