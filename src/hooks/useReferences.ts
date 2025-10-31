import { useState, useEffect } from "react";
import { ReferenceDirectService } from "@/services/apiServices";
import { Reference } from "@/types/api";

export function useReferences(limit?: number) {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        setLoading(true);
        const response = await ReferenceDirectService.getPublicReferences();

        let referenceData: Reference[] = [];

        // Handle response - should be direct array based on service implementation
        if (response && Array.isArray(response)) {
          referenceData = response;
        } else {
          setError("Referans verileri yüklenirken beklenmeyen format");
          return;
        }

        // Since this is the public Reference endpoint, we assume all returned references are active
        // Apply limit if specified
        const finalReferences = limit
          ? referenceData.slice(0, limit)
          : referenceData;
        setReferences(finalReferences);
      } catch (err) {
        console.error("useReferences - Error fetching References:", err);
        setError("Referans verileri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, [limit]);

  return { references, loading, error };
}
