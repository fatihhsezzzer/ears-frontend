# API Integration Documentation

This document explains how to use the API integration in the Vision Ears project.

## Environment Configuration

The API base URL is configured in the `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.vision-ears.com
```

## API Structure

### Available Public Endpoints

All API services only use public endpoints from the provided list:

#### Banner

- `GET /api/Banner/public` - Get all public banners

#### Blog

- `GET /api/Blog/public` - Get all public blogs
- `GET /api/Blog/public/{id}` - Get specific public blog

#### FAQ

- `GET /api/Faq/public` - Get all public FAQs

#### Gallery

- `GET /api/Galeri/public` - Get all public gallery items

#### Gallery Tags

- `GET /api/GaleriTag/public` - Get all public gallery tags

#### Mail

- `POST /api/Mail/send` - Send email

#### Reference

- `GET /api/Reference/public` - Get all public references

#### Service

- `GET /api/Service/public` - Get all public services

#### Setting

- `GET /api/Setting/public` - Get all public settings

#### Testimonial

- `GET /api/Testimonial/public` - Get all public testimonials

## Usage Examples

### Using API Services Directly

```typescript
import { apiServices } from "@/services/apiServices";

// Get all public banners
const bannersResponse = await apiServices.banner.getPublicBanners();
if (bannersResponse.success) {
  console.log(bannersResponse.data);
}

// Get a specific blog
const blogResponse = await apiServices.blog.getPublicBlogById(1);
if (blogResponse.success) {
  console.log(blogResponse.data);
}

// Send email
const mailData = {
  to: "contact@vision-ears.com",
  subject: "Contact Form",
  message: "Hello from the website",
  name: "John Doe",
  from: "john@example.com",
};
const mailResponse = await apiServices.mail.sendMail(mailData);
```

### Using React Hooks (Recommended)

```typescript
import { useBanners, useFaqs, useTestimonials } from "@/hooks/useApi";

function MyComponent() {
  const { banners, loading, error } = useBanners();
  const { faqs } = useFaqs();
  const { testimonials } = useTestimonials();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {banners.map((banner) => (
        <div key={banner.id}>{banner.title}</div>
      ))}
    </div>
  );
}
```

## Language Support

All hooks automatically filter data by the current language from the language context:

- Banners are filtered by `banner.language`
- Blogs are filtered by `blog.language`
- FAQs are filtered by `faq.language`
- References are filtered by `reference.language`
- Services are filtered by `service.language`
- Testimonials are filtered by `testimonial.language`

## Error Handling

All API calls include proper error handling:

```typescript
const { data, loading, error, refetch } = useBanners();

if (error) {
  // Handle error (show message, retry, etc.)
  console.error("API Error:", error);
}
```

## Available Hooks

- `useBanners()` - Get banners for current language
- `useBlogs()` - Get blogs for current language
- `useBlog(id)` - Get specific blog by ID
- `useFaqs()` - Get FAQs for current language
- `useGallery()` - Get all gallery items
- `useGalleryTags()` - Get all gallery tags
- `useReferences()` - Get references for current language
- `useServices()` - Get services for current language
- `useSettings()` - Get all settings (returns both array and key-value object)
- `useTestimonials()` - Get testimonials for current language

## Data Types

All TypeScript interfaces are defined in `/src/types/api.ts`. Key interfaces include:

- `Banner` - Banner data structure
- `Blog` - Blog post data structure
- `Faq` - FAQ item data structure
- `Galeri` - Gallery item data structure
- `Reference` - Customer reference data structure
- `Service` - Service data structure
- `Testimonial` - Customer testimonial data structure
- `MailRequest` - Email sending request structure

## Testing

Use the `ApiTestComponent` to test API integration:

```typescript
import ApiTestComponent from "@/components/ApiTestComponent";

// Add to your page to test API connections
<ApiTestComponent />;
```

This component will show data from banners, FAQs, and testimonials to verify the API is working correctly.
