"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider"; // Adjust path if needed

const BRANDS: Array<{
  id: Brand;
  title: string;
  category: string;
  description: string;
  features: string[];
  ctaText: string;
  href: string;
}> = [
  {
    id: "ANTY_MAMA",
    title: "Anty Mama",
    category: "Cookware & Lifestyle",
    description:
      "Anty Mama offers thoughtfully designed cookware and lifestyle essentials for modern homes — blending functionality, durability, and everyday comfort.",
    features: [
      "Premium cookware & kitchen tools",
      "Home & lifestyle essentials",
      "Built for daily use & long life",
    ],
    ctaText: "Shop Anty Mama",
    href: "/anty-mama",
  },
  {
    id: "NURSE_CAM",
    title: "Nurse Cam",
    category: "Nursing Education",
    description:
      "Nurse Cam provides professional-grade nursing education tools designed to support students, educators, and healthcare institutions worldwide.",
    features: [
      "Clinical training & simulation products",
      "Educational tools for nursing programs",
      "Trusted by institutions & professionals",
    ],
    ctaText: "Explore Nurse Cam",
    href: "/nurse-cam",
  },
];

export default function BrandSelectorSection() {
  const { brand } = useBrand(); // Current selected brand
  const theme = brandTheme[brand]; // Dynamic theme

  console.log(brand)

  return (
    <section
      id="brands"
      className="py-16 lg:py-20 bg-white border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Theme-aware */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, #111827, #374151, ${theme.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Choose Your Brand
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our specialized brands — each designed with a clear purpose,
            unique identity, and premium-quality products.
          </p>
        </motion.div>

        {/* Dynamic Brand Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {BRANDS.map((brandData, index) => {
            const brandThemeData = brandTheme[brandData.id as Brand];
            return (
              <motion.div
                key={brandData.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border hover:border-transparent cursor-pointer hover:-translate-y-2"
                style={{
                  borderColor: brandThemeData.border,
                  background: `linear-gradient(135deg, ${brandThemeData.subtext} 0%, ${brandThemeData.primary}08 100%)`,
                }}
              >
                {/* Category Badge */}
                <span
                  className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{
                    backgroundColor: brandThemeData.primary + "20",
                    color: brandThemeData.primary,
                  }}
                >
                  {brandData.category}
                </span>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight"
                  style={{ color: theme.text }}
                >
                  {brandData.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base lg:text-lg"
                  style={{ color: brandThemeData.muted }}
                >
                  {brandData.description}
                </p>

                {/* Features */}
                <ul className="text-gray-600 text-sm md:text-base space-y-2 mb-8 lg:mb-10">
                  {brandData.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: brandThemeData.primary }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={brandData.href}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 group-hover:gap-3 hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    backgroundColor: brandThemeData.primary,
                    color: brandThemeData.subtext,
                    boxShadow: `0 4px 14px ${brandThemeData.primary}20`,
                  }}
                >
                  {brandData.ctaText}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Subtle Accent Blob */}
                <div
                  className="absolute top-4 right-4 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full blur-xl opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"
                  style={{
                    backgroundColor: brandThemeData.primary,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
