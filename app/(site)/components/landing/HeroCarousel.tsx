"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type HeroSlide = {
  title?: string;
  subtitle?: string;
  image: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Welcome to Anty Mama",
    subtitle: "Premium cookware for your kitchen",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Cook Like a Pro",
    subtitle: "High-quality products for every chef",
    image:
      "https://images.unsplash.com/photo-1504128668912-f893e6606db6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Make Every Meal Special",
    subtitle: "Designed for style and performance",
    image:
      "https://images.unsplash.com/photo-1617196031951-99a502b95c3a?auto=format&fit=crop&w=1470&q=80",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  /* Auto-slide every 6s */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        {HERO_SLIDES.map((slide, i) =>
          i === index ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slide.image}
                alt={slide.title || `Slide ${i + 1}`}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay for text */}
              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-6">
                  {slide.title && (
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="text-lg md:text-2xl text-white">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={clsx(
              "h-3 rounded-full transition-all",
              i === index ? "w-8 bg-white" : "w-3 bg-white/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
