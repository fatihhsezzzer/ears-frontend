"use client";

import { useState, useEffect } from "react";
import { SettingDirectService } from "@/services/SettingDirectService";

interface Settings {
  email: string;
  phone: string;
  address: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const data = await SettingDirectService.getSettings();

        // API'den gelen veriyi parse et
        if (data && typeof data === "object") {
          setSettings({
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        }
      } catch (err) {
        console.error("Settings fetch error:", err);
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
