"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductDetail } from "@/hooks/useProducts";
// Custom SVG Icons
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
    />
  </svg>
);

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { t, language } = useLanguage();
  const { product, loading, error } = useProductDetail(productId);

  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.productDetail.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t.productDetail.notFound}
          </h1>
          <p className="text-gray-600 mb-6">{error || t.productDetail.error}</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </div>
    );
  }

  // Get localized content
  const title = language === "tr" ? product.titleTr : product.titleEn;
  const description =
    language === "tr" ? product.descriptionTr : product.descriptionEn;
  const shortDescription =
    language === "tr" ? product.shortDescriptionTr : product.shortDescriptionEn;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || "Product",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product.imagePaths && product.imagePaths.length > 0 ? (
                  <Image
                    src={product.imagePaths[selectedImage]}
                    alt={title || t.productDetail.imageAlt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-lg">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.imagePaths && product.imagePaths.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.imagePaths.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${title} - ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Actions */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {language === "tr"
                      ? "Ürün Bilgileri"
                      : "Product Information"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-gray-300 hover:border-blue-300 transition-colors"
                  >
                    <ShareIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Short Description */}
              {shortDescription && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {shortDescription}
                </p>
              )}

              {/* Contact for Details */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  {language === "tr"
                    ? "Detaylı Bilgi İçin"
                    : "For More Information"}
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  {language === "tr"
                    ? "Bu ürün hakkında detaylı bilgi almak veya sipariş vermek için bizimle iletişime geçin."
                    : "Contact us for detailed information about this product or to place an order."}
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {t.nav.contact}
                </a>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t.productDetail.features}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="p-6 lg:p-8">
              {/* Description */}
              {description && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t.productDetail.description}
                  </h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>{description}</p>
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t.productDetail.specifications}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 pb-2"
                        >
                          <dt className="font-medium text-gray-900">
                            {spec.key}
                          </dt>
                          <dd className="text-gray-700">
                            {language === "tr" ? spec.valueTr : spec.valueEn}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
