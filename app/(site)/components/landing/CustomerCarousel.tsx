"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import clsx from "clsx";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

const TESTIMONIALS: Record<"ANTY_MAMA" | "NURSE_CAM", Testimonial[]> = {
  ANTY_MAMA: [
    {
      name: "Priya Sharma",
      role: "Home Chef",
      message:
        "Anty Mama cookware completely changed the way I cook. Durable, elegant, and truly premium.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Mehta",
      role: "Food Blogger",
      message:
        "The quality is outstanding. Perfect heat distribution and beautiful design.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ],
  NURSE_CAM: [
    {
      name: "Dr. Emily Watson",
      role: "ICU Specialist",
      message:
        "Nurse Cam gives us peace of mind. Crystal-clear visuals and reliable performance.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Mark Johnson",
      role: "Hospital Admin",
      message:
        "A game changer for patient monitoring. Easy setup and excellent quality.",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  ],
};

export default function CustomerCarousel() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const testimonials = TESTIMONIALS[brand];

  const [index, setIndex] = useState(0);

  /* Auto-slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-600">Trusted by customers worldwide</p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white border rounded-2xl p-8 md:p-10 shadow-sm"
              style={{ borderColor: theme.border }}
            >
              {/* Content */}
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
                “{testimonials[index].message}”
              </p>

              {/* User */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-left">
                  <p className="font-semibold text-black">
                    {testimonials[index].name}
                  </p>
                  <p className="text-sm" style={{ color: theme.primary }}>
                    {testimonials[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-8" : "w-2.5"
                )}
                style={{
                  backgroundColor: i === index ? theme.primary : "#e5e7eb",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
