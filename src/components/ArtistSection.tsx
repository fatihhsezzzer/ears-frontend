"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArtistSection() {
  const { t } = useLanguage();
  const artists = [
    {
      name: "Ayliva",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Jan Delay",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Nina Chuba",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Nico Santos",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Alvaro Soler",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Lena Meyer-Landrut",
      image: "/api/placeholder/300/400",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.artists.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t.artists.subtitle}
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {artists.map((artist, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-200 aspect-square mb-2 sm:mb-3">
                {/* Placeholder for artist image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                  <span className="text-gray-700 font-semibold text-sm sm:text-lg text-center px-2">
                    {artist.name}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base text-center px-2">
                    {t.artists.viewMore}
                  </span>
                </div>
              </div>
              <h3 className="text-center font-semibold text-gray-900 text-sm sm:text-base">
                {artist.name}
              </h3>
            </div>
          ))}
        </div>

        {/* All Artists Link */}
        <div className="text-center">
          <Link
            href="/references/ve-artists-customer-reviews"
            className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors inline-block w-full sm:w-auto"
          >
            {t.artists.allArtists}
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t.artists.aboutCompany.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                {t.artists.aboutCompany.description}
              </p>
              <Link
                href="/about-us"
                className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors inline-block w-full sm:w-auto text-center"
              >
                {t.artists.aboutCompany.button}
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-600 to-gray-900 h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <div className="text-white text-center px-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  {t.artists.aboutCompany.craftsmanship}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {t.artists.aboutCompany.madeIn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
