"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { useContactSettings } from "@/hooks/useContactSettings";

export default function ContactButtons() {
  const { contactInfo, loading } = useContactSettings();

  // Don't render if loading or no contact information
  if (
    loading ||
    (!contactInfo.phone && !contactInfo.whatsapp && !contactInfo.email)
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      {contactInfo.whatsapp && (
        <a
          href={contactInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="WhatsApp ile iletişim"
          title="WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
        </a>
      )}

      {/* Phone Button */}
      {contactInfo.phone && (
        <a
          href={`tel:${contactInfo.phone}`}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Telefon ile arama"
          title="Telefon"
        >
          <MdPhone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
        </a>
      )}

      {/* Email Button */}
      {contactInfo.email && (
        <a
          href={`mailto:${contactInfo.email}`}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="E-posta gönder"
          title="E-posta"
        >
          <MdEmail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
        </a>
      )}
    </div>
  );
}
