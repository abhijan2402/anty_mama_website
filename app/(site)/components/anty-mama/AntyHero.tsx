"use-client";
import BrandHeroCarousel from "../landing/BrandHeroCarousel";
import BrandSelectorSection from "../landing/BrandSelectorSection";
import CategorySlider from "../landing/CategorySlider";
import CustomerCarousel from "../landing/CustomerCarousel";
import FaqSection from "../landing/FaqSection";
import HeroCarousel from "../landing/HeroCarousel";
import HowItWorksSection from "../landing/HowItWorksSection";
import ProductSection from "../landing/ProductSection";
import TestimonialsSection from "../landing/TestimonialsSection";
import WhyChooseUsSection from "../landing/WhyChooseUsSection";

export default function AntyHero() {
  return (
    <main>
      <BrandHeroCarousel />
      {/* <CategorySlider /> */}
      <ProductSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <FaqSection />
      <TestimonialsSection />
      <BrandSelectorSection />
    </main>
  );
}
