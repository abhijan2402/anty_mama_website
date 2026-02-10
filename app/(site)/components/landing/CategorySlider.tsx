"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider";

const CATEGORIES: Record<Brand, string[]> = {
  ANTY_MAMA: [
    "Frying Pans",
    "Kadai & Woks",
    "Cookware Sets",
    "Pressure Cookers",
    "Saucepans",
    "Non-Stick Utensils",
    "Kitchen Tools",
    "Bakeware",
  ],
  NURSE_CAM: [
    "4K Cameras",
    "Multi-Angle Systems",
    "Cloud Storage Plans",
    "Night Vision Cams",
    "Wireless Units",
    "Training Kits",
    "Installation Services",
    "Enterprise Solutions",
  ],
};

export default function CategorySlider() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [...CATEGORIES[brand], ...CATEGORIES[brand]];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 1;
      slider.scrollLeft += 1;

      if (scrollAmount >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [brand]);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          style={{ color: theme.text }}
        >
          Shop by Category
        </h3>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-hidden whitespace-nowrap"
        >
          {categories.map((category, index) => (
            <motion.div
              key={`${category}-${index}`}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 px-6 py-4 rounded-xl border bg-white shadow-sm cursor-pointer text-sm md:text-base font-semibold"
              style={{
                borderColor: `${theme.primary}30`,
                color: theme.text,
              }}
            >
              {category}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
