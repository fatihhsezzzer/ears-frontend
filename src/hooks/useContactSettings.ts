import { useState, useEffect } from "react";
import { SettingDirectService } from "@/services/apiServices";

export interface ContactSettings {
  phone?: string;
  email?: string;
  whatsapp?: string;
  location?: string;
}

interface SettingsApiResponse {
  phoneNumber?: string;
  whatsappNumber?: string;
  mailTo?: string;
  location?: string;
  [key: string]: unknown;
}

export function useContactSettings() {
  const [contactInfo, setContactInfo] = useState<ContactSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactSettings() {
      try {
        setLoading(true);
        const settingsData = await SettingDirectService.getPublicSettings();

        // Debug log
        console.log("ContactSettings - Full API response:", settingsData);

        // Extract contact information from settings
        const extractedContactInfo: ContactSettings = {};

        if (settingsData && typeof settingsData === "object") {
          const data = settingsData as SettingsApiResponse;

          // Direct field mapping based on actual API structure
          if (data.phoneNumber && String(data.phoneNumber).trim()) {
            extractedContactInfo.phone = String(data.phoneNumber).trim();
            console.log(
              `ContactSettings - Found phone: ${extractedContactInfo.phone}`
            );
          }

          if (data.mailTo && String(data.mailTo).trim()) {
            extractedContactInfo.email = String(data.mailTo).trim();
            console.log(
              `ContactSettings - Found email: ${extractedContactInfo.email}`
            );
          }

          if (data.whatsappNumber && String(data.whatsappNumber).trim()) {
            const phoneNumber = String(data.whatsappNumber).replace(/\D/g, "");
            if (phoneNumber) {
              extractedContactInfo.whatsapp = `https://wa.me/${phoneNumber}`;
              console.log(
                `ContactSettings - Found WhatsApp: ${extractedContactInfo.whatsapp}`
              );
            }
          }

          if (data.location && String(data.location).trim()) {
            extractedContactInfo.location = String(data.location).trim();
            console.log(
              `ContactSettings - Found location: ${extractedContactInfo.location}`
            );
          }
        }

        console.log(
          "ContactSettings - Extracted contact info:",
          extractedContactInfo
        );
        setContactInfo(extractedContactInfo);
        setError(null);
      } catch (err) {
        console.error(
          "ContactSettings - Error fetching contact settings:",
          err
        );
        setError(
          err instanceof Error ? err.message : "Failed to load contact settings"
        );
        setContactInfo({});
      } finally {
        setLoading(false);
      }
    }

    fetchContactSettings();
  }, []);

  return { contactInfo, loading, error };
}
