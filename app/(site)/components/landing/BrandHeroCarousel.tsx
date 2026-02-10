"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useGetBannersQuery } from "@/lib/api/bannerApi";
import { getImageUrl } from "@/lib/utils";

type Banner = {
  _id: string;
  image: string;
  url: string;
  order: number;
};

export default function BrandHeroCarousel() {
  const { data: banners = [], isLoading, isError } = useGetBannersQuery();
  const sortedBanners: Banner[] = [...banners].sort(
    (a, b) => a.order - b.order
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!sortedBanners.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sortedBanners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [sortedBanners.length]);

  if (isLoading) return <div className="h-[80vh] bg-gray-100" />;
  if (isError || !sortedBanners.length) return null;

  return (
    <section className="bg-gray-50">
      <div className="h-[50vh] md:h-[80vh] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {sortedBanners.map(
            (banner, i) =>
              i === index && (
                <motion.div
                  key={banner._id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={getImageUrl(banner.image)}
                        alt="Hero Banner"
                        fill
                        sizes="100vw"
                        priority={i === 0}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {sortedBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={clsx(
              "h-2.5 rounded-full transition-all",
              i === index ? "w-8 bg-black" : "w-2.5 bg-gray-300"
            )}
          />
        ))}
      </div>
    </section>
  );
}
