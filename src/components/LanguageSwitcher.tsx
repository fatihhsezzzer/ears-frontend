"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/locales";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
          language === "en"
            ? "bg-white text-black"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-gray-600"></div>
      <button
        onClick={() => handleLanguageChange("tr")}
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
          language === "tr"
            ? "bg-white text-black"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
      >
        TR
      </button>
    </div>
  );
}
