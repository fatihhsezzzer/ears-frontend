"use client";

import { useProducts, useProductDetail } from "@/hooks/useProducts";

export default function ProductApiTest() {
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    product: sampleProduct,
    loading: productLoading,
    error: productError,
  } = useProductDetail("1");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Product API Test</h1>

      {/* All Products Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>

        {productsLoading && (
          <p className="text-blue-600">Loading products...</p>
        )}
        {productsError && (
          <p className="text-red-600">Error: {productsError}</p>
        )}

        {!productsLoading && !productsError && (
          <div className="space-y-4">
            <p className="text-gray-600">Found {products.length} products</p>
            {products.slice(0, 3).map((product) => (
              <div key={product.productId} className="border p-4 rounded-lg">
                <h3 className="font-semibold">
                  {product.titleTr || product.titleEn}
                </h3>
                <p className="text-gray-600 mt-1">
                  {product.shortDescriptionTr || product.shortDescriptionEn}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>ID: {product.productId}</span>
                  <span>
                    Price: {product.price} {product.currency}
                  </span>
                  <span>Stock: {product.stock}</span>
                  <span>Active: {product.isActive ? "Yes" : "No"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single Product Test */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Single Product (ID: 1)</h2>

        {productLoading && <p className="text-blue-600">Loading product...</p>}
        {productError && <p className="text-red-600">Error: {productError}</p>}

        {!productLoading && !productError && sampleProduct && (
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">
              {sampleProduct.titleTr || sampleProduct.titleEn}
            </h3>
            <p className="text-gray-600 mt-2">
              {sampleProduct.descriptionTr || sampleProduct.descriptionEn}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <strong>Product ID:</strong> {sampleProduct.productId}
              </div>
              <div>
                <strong>SKU:</strong> {sampleProduct.sku}
              </div>
              <div>
                <strong>Price:</strong> {sampleProduct.price}{" "}
                {sampleProduct.currency}
              </div>
              <div>
                <strong>Stock:</strong> {sampleProduct.stock}
              </div>
              <div>
                <strong>Is Active:</strong>{" "}
                {sampleProduct.isActive ? "Yes" : "No"}
              </div>
              <div>
                <strong>Is Featured:</strong>{" "}
                {sampleProduct.isFeatured ? "Yes" : "No"}
              </div>
              <div>
                <strong>Images:</strong> {sampleProduct.imagePaths?.length || 0}
              </div>
              <div>
                <strong>Specifications:</strong>{" "}
                {sampleProduct.specifications?.length || 0}
              </div>
            </div>

            {sampleProduct.specifications &&
              sampleProduct.specifications.length > 0 && (
                <div className="mt-4">
                  <strong>Specifications:</strong>
                  <ul className="mt-2 space-y-1">
                    {sampleProduct.specifications.map((spec, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{spec.key}:</span>{" "}
                        {spec.valueTr || spec.valueEn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
