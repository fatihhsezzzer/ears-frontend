const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID!;

export async function fetchFromApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error(
      "API Base URL tanımlanmamış. Lütfen .env dosyasını kontrol edin."
    );
  }

  const apiUrl = BASE_URL.endsWith("/api") ? BASE_URL : `${BASE_URL}/api`;

  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
        ...(options.headers || {}),
      },
      credentials: "include",
      cache: "no-store", // SSR'da güncel veri için
    });

    if (!res.ok) {
      throw new Error(`API hatası: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API isteği başarısız oldu (${endpoint}):`, error);
    throw error;
  }
}
