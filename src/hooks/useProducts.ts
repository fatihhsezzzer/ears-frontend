import { useState, useEffect } from "react";
import { ProductDirectService } from "@/services/ProductDirectService";
import type { Product } from "@/types/api";

interface UseProductDetailResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProductDetail(
  productId: number | string | null
): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await ProductDirectService.getProductById(productId);

      // Only show active products
      if (data && data.isActive) {
        setProduct(data);
      } else {
        setError("Product not found or not available");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch product");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await ProductDirectService.getProductById(productId);

        // Only show active products
        if (data && data.isActive) {
          setProduct(data);
        } else {
          setError("Product not found or not available");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const refetch = () => {
    fetchProduct();
  };

  return { product, loading, error, refetch };
}

// Hook for multiple products
interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductDirectService.getPublicProducts();

      // Only show active products
      const activeProducts = data.filter((product) => product.isActive);
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return { products, loading, error, refetch };
}

// Hook for featured products
export function useFeaturedProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductDirectService.getFeaturedProducts();

      // Only show active featured products
      const activeFeaturedProducts = data.filter(
        (product) => product.isActive && product.isFeatured
      );
      setProducts(activeFeaturedProducts);
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch featured products"
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const refetch = () => {
    fetchFeaturedProducts();
  };

  return { products, loading, error, refetch };
}
