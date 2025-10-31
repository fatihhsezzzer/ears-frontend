import type { Product, ServiceApiResponse } from "@/types/api";

export class ProductDirectService {
  private static readonly BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.softana.com.tr";
  private static readonly CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID;

  // Service'i Product'a dönüştüren yardımcı fonksiyon
  private static mapServiceToProduct(service: ServiceApiResponse): Product {
    // Image path'i düzgün URL'ye çevir
    const getImagePath = (path: string | null): string[] => {
      if (!path) return [];

      // Eğer path zaten tam URL ise olduğu gibi kullan
      if (path.startsWith("http://") || path.startsWith("https://")) {
        return [path];
      }

      // BASE_URL'i güvenli şekilde al
      const baseUrl =
        ProductDirectService.BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.softana.com.tr";

      // Eğer path relative ise, BASE_URL ile birleştir
      // "/" ile başlıyorsa direkt ekle, yoksa "/" ekleyerek
      const fullPath = path.startsWith("/")
        ? `${baseUrl}${path}`
        : `${baseUrl}/${path}`;

      return [fullPath];
    };

    return {
      productId: service.serviceId,
      customerId: service.customerId,
      categoryId: null,
      titleTr: service.nameTr,
      titleEn: service.nameEn,
      descriptionTr: service.descriptionTr,
      descriptionEn: service.descriptionEn,
      shortDescriptionTr: service.descriptionTr, // Kısa açıklama yoksa normal açıklamayı kullan
      shortDescriptionEn: service.descriptionEn,
      price: 0, // Service'lerde fiyat bilgisi yok, varsayılan 0
      oldPrice: null,
      currency: "₺",
      sku: service.serviceId.toString(),
      stock: 99, // Services genellikle sınırsız
      imagePaths: getImagePath(service.imagePath),
      specifications: [],
      features: [],
      isActive: service.isActive,
      isFeatured: false,
      isOnSale: false,
      slug: service.slug,
      seoTitle: service.seoTitle || undefined,
      metaDescription: service.metaDescription || undefined,
      tags: service.tags || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Get all products (using Services endpoint)
  static async getPublicProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/Service/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Customer-Id": this.CUSTOMER_ID || "",
        },
        cache: "no-store", // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Products (Services) API Response:", data);

      // Services API'sini Product formatına dönüştür
      const products: Product[] = Array.isArray(data)
        ? data
            .filter((service) => service.isActive)
            .map((service) => this.mapServiceToProduct(service))
        : [];
      return products;
    } catch (error) {
      console.error("Products service error:", error);
      throw error;
    }
  }

  // Get single product by ID (find from services list)
  static async getProductById(productId: number | string): Promise<Product> {
    try {
      // Tüm servisleri al ve ID'ye göre filtrele
      const allProducts = await this.getPublicProducts();
      const product = allProducts.find(
        (p) => p.productId.toString() === productId.toString()
      );

      if (!product) {
        throw new Error("Product not found");
      }

      console.log("Product Detail (Service) API Response:", product);
      return product;
    } catch (error) {
      console.error("Product detail service error:", error);
      throw error;
    }
  }

  // Get products by category (simulate with services)
  static async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      // Şimdilik tüm ürünleri döndür, kategorileme işlemi daha sonra eklenebilir
      // TODO: Category filtering will be implemented when backend supports it
      console.log("Requested category ID:", categoryId);
      const allProducts = await this.getPublicProducts();
      console.log("Products by Category (All Services):", allProducts);

      return allProducts;
    } catch (error) {
      console.error("Products by category service error:", error);
      throw error;
    }
  }

  // Get featured products (get first 3 services as featured)
  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.getPublicProducts();

      // İlk 3 aktif ürünü öne çıkan olarak döndür
      const featuredProducts = allProducts.slice(0, 3).map((product) => ({
        ...product,
        isFeatured: true,
      }));

      console.log("Featured Products (First 3 Services):", featuredProducts);
      return featuredProducts;
    } catch (error) {
      console.error("Featured products service error:", error);
      throw error;
    }
  }
}
