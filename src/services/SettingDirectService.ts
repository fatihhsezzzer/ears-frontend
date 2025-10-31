export interface SettingResponse {
  email: string;
  phone: string;
  address: string;
  // Diğer ayarlar varsa buraya eklenebilir
}

export class SettingDirectService {
  private static readonly BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.softana.com.tr";
  private static readonly CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID;

  static async getSettings(): Promise<SettingResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/Setting/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Customer-Id": this.CUSTOMER_ID || "",
        },
        cache: "no-store", // Her zaman fresh data al
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Settings API Response:", data);

      // Settings API'sinden gelen veriyi SettingResponse formatına dönüştür
      return this.mapSettingsResponse(data);
    } catch (error) {
      console.error("Setting service error:", error);
      throw error;
    }
  }

  // Settings API'sinden gelen veriyi SettingResponse formatına dönüştür
  private static mapSettingsResponse(data: unknown): SettingResponse {
    // API'den gelen veri format örneği kontrol edilmeli
    // Şimdilik varsayılan değerler döndürelim
    const settings = Array.isArray(data) ? data : [];

    // Settings'leri key-value olarak bulalım
    const findSetting = (key: string) => {
      const setting = settings.find(
        (s: {
          key?: string;
          keyTr?: string;
          keyEn?: string;
          value?: string;
          valueTr?: string;
          valueEn?: string;
        }) => s.key === key || s.keyTr === key || s.keyEn === key
      );
      return setting?.value || setting?.valueTr || setting?.valueEn || "";
    };

    return {
      email:
        findSetting("email") || findSetting("Email") || "info@atuneears.com",
      phone:
        findSetting("phone") || findSetting("Phone") || "+90 532 123 45 67",
      address:
        findSetting("address") ||
        findSetting("Address") ||
        "ŞİRİNEVLER MAHALLESİ SAKARYA ÇIKMAZI NO:1/21 GÜL İŞ MERKEZİ, 34188 Bahçelievler/İstanbul",
    };
  }
}
