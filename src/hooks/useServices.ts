import { useState, useEffect } from "react";
import { ServiceService } from "@/services/apiServices";
import { ServiceApiResponse } from "@/types/api";
import { useLanguage } from "@/contexts/LanguageContext";

export function useServices() {
  const [services, setServices] = useState<ServiceApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("useServices - Starting to fetch services...");
        setLoading(true);
        const response = await ServiceService.getPublicServices();
        console.log("useServices - Full API Response:", response);
        console.log("useServices - Response type:", typeof response);
        console.log(
          "useServices - Response keys:",
          Object.keys(response || {})
        );

        // API returns direct array, not wrapped in success/data structure
        if (response && Array.isArray(response)) {
          console.log("useServices - Direct array response:", response);
          setServices(response);
        } else {
          console.log("useServices - Unexpected response format:", response);
          setError("Hizmetler yüklenirken beklenmeyen format");
        }
      } catch (err) {
        console.error("useServices - Catch Error:", err);
        setError("Hizmetler yüklenirken bir hata oluştu");
      } finally {
        console.log("useServices - Fetch completed");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}
