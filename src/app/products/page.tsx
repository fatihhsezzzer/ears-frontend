"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ürünler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ürünler yüklenemedi
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.nav.products}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Yüksek kaliteli kulakiçi monitörlerimizi keşfedin
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Henüz ürün bulunmamaktadır
            </h2>
            <p className="text-gray-600">
              Yakında yeni ürünlerimizi burada görebileceksiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const title =
                language === "tr" ? product.titleTr : product.titleEn;
              const shortDescription =
                language === "tr"
                  ? product.shortDescriptionTr
                  : product.shortDescriptionEn;

              return (
                <Link
                  key={product.productId}
                  href={`/products/${product.productId}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.imagePaths && product.imagePaths.length > 0 ? (
                      <Image
                        src={product.imagePaths[0]}
                        alt={title || "Product"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>No Image</span>
                      </div>
                    )}

                    {/* Sale Badge */}
                    {product.isOnSale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {t.productDetail.onSale}
                      </div>
                    )}

                    {/* Featured Badge */}
                    {product.isFeatured && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Öne Çıkan
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                      {title}
                    </h3>

                    {shortDescription && (
                      <p className="text-sm text-gray-600 line-clamp-3 min-h-[4rem]">
                        {shortDescription}
                      </p>
                    )}

                    {/* View Details Button */}
                    <div className="pt-2">
                      <span className="inline-flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                        {language === "tr" ? "Detayları Gör" : "View Details"}
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
