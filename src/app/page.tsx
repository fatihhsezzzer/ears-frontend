import HeroSection from "@/components/HeroSection";
import ProductSections from "@/components/ProductSections";
import ReferenceSection from "@/components/ReferenceSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductSections />
      <ReferenceSection />
      <FAQSection />
    </div>
  );
}
