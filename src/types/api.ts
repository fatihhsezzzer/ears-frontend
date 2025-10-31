// Common API response structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Base entity interface
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Banner interfaces
export interface Banner extends BaseEntity {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  order: number;
  language: "en" | "tr";
}

// Blog interfaces
export interface Blog {
  blogId: number;
  customerId: string;
  categoryId?: number | null;
  titleTr: string | null;
  titleEn: string | null;
  titleAr?: string | null;
  descriptionTr: string | null;
  descriptionEn: string | null;
  descriptionAr?: string | null;
  imagePath?: string | null;
  date: string;
  author: string;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  tags?: string;
  isActive: boolean;
  readingTime?: number;
}

// Product interfaces
export interface Product {
  productId: number;
  customerId: string;
  categoryId?: number | null;
  titleTr: string | null;
  titleEn: string | null;
  descriptionTr: string | null;
  descriptionEn: string | null;
  shortDescriptionTr?: string | null;
  shortDescriptionEn?: string | null;
  price: number;
  oldPrice?: number | null;
  currency: string;
  sku: string;
  stock: number;
  imagePaths: string[];
  specifications?: ProductSpecification[];
  features?: string[];
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpecification {
  key: string;
  valueTr: string;
  valueEn: string;
}

// FAQ interfaces
export interface Faq {
  faqId: number;
  customerId: string;
  sortOrder: number;
  questionTr: string;
  questionEn: string;
  questionAr: string;
  answerTr: string;
  answerEn: string;
  answerAr: string;
}

// Gallery interfaces
export interface Galeri extends BaseEntity {
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: GaleriTag[];
  isActive: boolean;
  order: number;
}

export interface GaleriTag extends BaseEntity {
  name: string;
  color?: string;
  isActive: boolean;
}

// Reference interfaces
export interface Reference {
  referenceId: number;
  customerId: string;
  customerName: string;
  companyName?: string;
  testimonialTr: string;
  testimonialEn: string;
  testimonialAr?: string;
  imageUrl?: string;
  rating?: number;
  sortOrder: number;
}

// Service interfaces
export interface Service extends BaseEntity {
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  price?: number;
  currency?: string;
  isActive: boolean;
  order: number;
  features?: string[];
  language: "en" | "tr";
}

// Actual Service API Response (matches backend structure)
export interface ServiceApiResponse {
  serviceId: number;
  customerId: string;
  nameTr: string | null;
  nameEn: string | null;
  nameAr: string | null;
  descriptionTr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  imagePath: string | null;
  isActive: boolean;
  metaDescription: string | null;
  seoTitle: string | null;
  slug: string;
  sortOrder: number;
  tags: string | null;
}

// Setting interfaces
export interface Setting {
  settingId: number;
  customerId: string;
  key: string;
  keyTr?: string;
  keyEn?: string;
  value: string;
  valueTr?: string;
  valueEn?: string;
  type?: string;
  description?: string;
  group?: string;
  sortOrder?: number;
}

// Testimonial interfaces
export interface Testimonial extends BaseEntity {
  customerName: string;
  companyName?: string;
  content: string;
  imageUrl?: string;
  rating: number;
  isActive: boolean;
  order: number;
  language: "en" | "tr";
}

// Mail interfaces
export interface MailRequest {
  to: string;
  subject: string;
  message: string;
  senderEmail: string; // API required field
  senderName: string; // API required field
  phone?: string;
  // Legacy fields (keep for backward compatibility)
  from?: string;
  name?: string;
}

export interface MailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}
