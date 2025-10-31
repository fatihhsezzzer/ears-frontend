import { useState, useEffect } from "react";
import { SettingDirectService } from "@/services/apiServices";

export interface SocialMediaSettings {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  telegram?: string;
}

export function useSocialMediaSettings() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useSocialMediaSettings - Hook started, calling fetchSettings");
    const fetchSettings = async () => {
      try {
        console.log("useSocialMediaSettings - fetchSettings called");
        setLoading(true);
        console.log(
          "useSocialMediaSettings - About to call SettingDirectService.getPublicSettings"
        );
        const response = await SettingDirectService.getPublicSettings();
        console.log("useSocialMediaSettings - Service call completed");

        console.log("useSocialMediaSettings - Full API Response:", response);
        console.log("useSocialMediaSettings - Response type:", typeof response);
        console.log(
          "useSocialMediaSettings - Is array:",
          Array.isArray(response)
        );

        // Handle response - appears to be an object with key-value pairs
        if (
          response &&
          typeof response === "object" &&
          !Array.isArray(response)
        ) {
          console.log(
            "useSocialMediaSettings - Object response received:",
            response
          );
          console.log(
            "useSocialMediaSettings - Response keys:",
            Object.keys(response)
          );

          // Extract social media settings from the response object
          const socialSettings: SocialMediaSettings = {};

          // Iterate through the response object keys
          Object.entries(response).forEach(([key, value]) => {
            console.log(
              `useSocialMediaSettings - Processing key: "${key}", value: "${value}"`
            );
            const lowerKey = key.toLowerCase();

            if (typeof value === "string" && value.trim() !== "") {
              if (
                lowerKey.includes("facebook") ||
                lowerKey === "facebook_url" ||
                lowerKey === "social_facebook"
              ) {
                socialSettings.facebook = value as string;
                console.log("useSocialMediaSettings - Found Facebook:", value);
              } else if (
                lowerKey.includes("twitter") ||
                lowerKey === "twitter_url" ||
                lowerKey === "social_twitter"
              ) {
                socialSettings.twitter = value as string;
                console.log("useSocialMediaSettings - Found Twitter:", value);
              } else if (
                lowerKey.includes("instagram") ||
                lowerKey === "instagram_url" ||
                lowerKey === "social_instagram"
              ) {
                socialSettings.instagram = value as string;
                console.log("useSocialMediaSettings - Found Instagram:", value);
              } else if (
                lowerKey.includes("linkedin") ||
                lowerKey === "linkedin_url" ||
                lowerKey === "social_linkedin"
              ) {
                socialSettings.linkedin = value as string;
                console.log("useSocialMediaSettings - Found LinkedIn:", value);
              } else if (
                lowerKey.includes("youtube") ||
                lowerKey === "youtube_url" ||
                lowerKey === "social_youtube"
              ) {
                socialSettings.youtube = value as string;
                console.log("useSocialMediaSettings - Found YouTube:", value);
              } else if (
                lowerKey.includes("tiktok") ||
                lowerKey === "tiktok_url" ||
                lowerKey === "social_tiktok"
              ) {
                socialSettings.tiktok = value as string;
                console.log("useSocialMediaSettings - Found TikTok:", value);
              } else if (
                lowerKey.includes("whatsapp") ||
                lowerKey === "whatsappnumber" ||
                lowerKey === "whatsapp_url" ||
                lowerKey === "social_whatsapp"
              ) {
                // Convert phone number to WhatsApp URL format if needed
                let whatsappUrl = value as string;
                if (
                  whatsappUrl.startsWith("+") &&
                  !whatsappUrl.includes("wa.me")
                ) {
                  // Remove spaces and special characters, keep only digits and +
                  const phoneNumber = whatsappUrl.replace(/[^\d+]/g, "");
                  // Convert +90 to 90 for wa.me format
                  const cleanNumber = phoneNumber.startsWith("+")
                    ? phoneNumber.substring(1)
                    : phoneNumber;
                  whatsappUrl = `https://wa.me/${cleanNumber}`;
                }
                socialSettings.whatsapp = whatsappUrl;
                console.log(
                  "useSocialMediaSettings - Found WhatsApp:",
                  value,
                  "-> URL:",
                  whatsappUrl
                );
              } else if (
                lowerKey.includes("telegram") ||
                lowerKey === "telegram_url" ||
                lowerKey === "social_telegram"
              ) {
                socialSettings.telegram = value as string;
                console.log("useSocialMediaSettings - Found Telegram:", value);
              }
            }
          });

          console.log(
            "useSocialMediaSettings - Final social media settings:",
            socialSettings
          );
          setSocialMedia(socialSettings);
        } else {
          console.log(
            "useSocialMediaSettings - Unexpected response format:",
            response
          );
          setError("Ayarlar yüklenirken beklenmeyen format");
          return;
        }
      } catch (err) {
        console.error(
          "useSocialMediaSettings - Catch block - Error fetching settings:",
          err
        );
        console.error(
          "useSocialMediaSettings - Error details:",
          err instanceof Error ? err.message : err
        );
        setError("Sosyal medya ayarları yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { socialMedia, loading, error };
}
