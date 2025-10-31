import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.softana.com.tr",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: true, // Geliştirme için tüm resimleri optimize etmeden kullan
  },
};

export default nextConfig;
