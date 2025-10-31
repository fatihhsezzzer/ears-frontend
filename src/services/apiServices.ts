import { httpClient } from "@/utils/httpClient";

// Environment variables for direct fetch services
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.softana.com.tr";
const CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID;
import {
  ApiResponse,
  Banner,
  Blog,
  Faq,
  Galeri,
  GaleriTag,
  Reference,
  ServiceApiResponse,
  Setting,
  Testimonial,
  MailRequest,
  MailResponse,
} from "@/types/api";

// Banner Service - Public endpoints only
class BannerService {
  /**
   * Get all public banners
   * GET /api/Banner/public
   */
  static async getPublicBanners(): Promise<ApiResponse<Banner[]>> {
    return httpClient.get<Banner[]>("/api/Banner/public");
  }
}

// Blog Service - Public endpoints only
class BlogService {
  /**
   * Get all public blogs
   * GET /api/Blog/public
   */
  static async getPublicBlogs(): Promise<ApiResponse<Blog[]>> {
    return httpClient.get<Blog[]>("/api/Blog/public");
  }

  /**
   * Get a specific public blog by id
   * GET /api/Blog/public/{id}
   */
  static async getPublicBlogById(id: number): Promise<ApiResponse<Blog>> {
    return httpClient.get<Blog>(`/api/Blog/public/${id}`);
  }
}

// FAQ Service - Public endpoints only
class FaqService {
  /**
   * Get all public FAQs
   * GET /api/Faq/public
   */
  static async getPublicFaqs(): Promise<Faq[]> {
    // This endpoint might return direct array like Services, so we'll use direct fetch
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID;

    const response = await fetch(`${API_BASE_URL}/api/Faq/public`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: Faq[] = await response.json();
    return result;
  }
}

// Reference Service - Direct fetch implementation
class ReferenceDirectService {
  /**
   * Get all public references with direct fetch
   * GET /api/Reference/public
   */
  static async getPublicReferences(): Promise<Reference[]> {
    const response = await fetch(`${API_BASE_URL}/api/Reference/public`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: Reference[] = await response.json();
    return result;
  }
}

// Blog Direct Service - Direct fetch implementation
class BlogDirectService {
  /**
   * Get all public blogs with direct fetch
   * GET /api/Blog/public
   */
  static async getPublicBlogs(): Promise<Blog[]> {
    console.log("BlogDirectService - getPublicBlogs called");
    console.log("BlogDirectService - API_BASE_URL:", API_BASE_URL);
    console.log("BlogDirectService - CUSTOMER_ID:", CUSTOMER_ID);

    const response = await fetch(`${API_BASE_URL}/api/Blog/public`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    console.log("BlogDirectService - Response status:", response.status);
    console.log("BlogDirectService - Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("BlogDirectService - Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: Blog[] = await response.json();
    console.log("BlogDirectService - Raw result:", result);
    console.log("BlogDirectService - Result length:", result.length);
    return result;
  }

  /**
   * Get a specific public blog by id with direct fetch
   * GET /api/Blog/public/{id}
   */
  static async getPublicBlogById(id: number): Promise<Blog> {
    console.log("BlogDirectService - getPublicBlogById called with id:", id);

    const response = await fetch(`${API_BASE_URL}/api/Blog/public/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: Blog = await response.json();
    console.log("BlogDirectService - Blog result:", result);
    return result;
  }
}

// Setting Service - Direct fetch implementation
class SettingDirectService {
  /**
   * Get all public settings with direct fetch
   * GET /api/Setting/public
   */
  static async getPublicSettings(): Promise<object> {
    const response = await fetch(`${API_BASE_URL}/api/Setting/public`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: object = await response.json();
    return result;
  }
}

// Mail Direct Service - Direct fetch implementation
class MailDirectService {
  /**
   * Send email with direct fetch
   * POST /api/Mail/send
   */
  static async sendMail(mailData: MailRequest): Promise<MailResponse> {
    // Map to API expected field names (PascalCase)
    const apiPayload = {
      To: mailData.to,
      Subject: mailData.subject,
      Message: mailData.message,
      SenderEmail: mailData.senderEmail,
      SenderName: mailData.senderName,
      Phone: mailData.phone,
    };

    const response = await fetch(`${API_BASE_URL}/api/Mail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: MailResponse = await response.json();
    return result;
  }
}

// Gallery Service - Public endpoints only
class GaleriService {
  /**
   * Get all public gallery items
   * GET /api/Galeri/public
   */
  static async getPublicGaleri(): Promise<ApiResponse<Galeri[]>> {
    return httpClient.get<Galeri[]>("/api/Galeri/public");
  }
}

// Gallery Tag Service - Public endpoints only
class GaleriTagService {
  /**
   * Get all public gallery tags
   * GET /api/GaleriTag/public
   */
  static async getPublicGaleriTags(): Promise<ApiResponse<GaleriTag[]>> {
    return httpClient.get<GaleriTag[]>("/api/GaleriTag/public");
  }
}

// Mail Service
class MailService {
  /**
   * Send email
   * POST /api/Mail/send
   */
  static async sendMail(
    mailData: MailRequest
  ): Promise<ApiResponse<MailResponse>> {
    return httpClient.post<MailResponse>("/api/Mail/send", mailData);
  }
}

// Reference Service - Public endpoints only
class ReferenceService {
  /**
   * Get all public references
   * GET /api/Reference/public
   */
  static async getPublicReferences(): Promise<ApiResponse<Reference[]>> {
    return httpClient.get<Reference[]>("/api/Reference/public");
  }
}

// Service Service - Public endpoints only
class ServiceService {
  /**
   * Get all public services
   * GET /api/Service/public
   */
  static async getPublicServices(): Promise<ServiceApiResponse[]> {
    console.log("ServiceService - getPublicServices called");

    // This endpoint returns direct array, so we'll use direct fetch
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const CUSTOMER_ID = process.env.NEXT_PUBLIC_CUSTOMER_ID;

    const response = await fetch(`${API_BASE_URL}/api/Service/public`, {
      headers: {
        "Content-Type": "application/json",
        "X-Customer-Id": CUSTOMER_ID || "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ServiceApiResponse[] = await response.json();
    console.log("ServiceService - Direct fetch result:", result);
    return result;
  }
}

// Setting Service - Public endpoints only
class SettingService {
  /**
   * Get all public settings
   * GET /api/Setting/public
   */
  static async getPublicSettings(): Promise<ApiResponse<Setting[]>> {
    return httpClient.get<Setting[]>("/api/Setting/public");
  }
}

// Testimonial Service - Public endpoints only
class TestimonialService {
  /**
   * Get all public testimonials
   * GET /api/Testimonial/public
   */
  static async getPublicTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    return httpClient.get<Testimonial[]>("/api/Testimonial/public");
  }
}

// Export all services for easy access
export const apiServices = {
  banner: BannerService,
  blog: BlogService,
  faq: FaqService,
  galeri: GaleriService,
  galeriTag: GaleriTagService,
  mail: MailService,
  reference: ReferenceService,
  service: ServiceService,
  setting: SettingService,
  testimonial: TestimonialService,
};

// Export individual services as well
export {
  BannerService,
  BlogService,
  BlogDirectService,
  FaqService,
  GaleriService,
  GaleriTagService,
  MailService,
  MailDirectService,
  ReferenceService,
  ReferenceDirectService,
  ServiceService,
  SettingService,
  SettingDirectService,
  TestimonialService,
};
