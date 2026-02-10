"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { useGetProductsQuery } from "@/lib/api/productApi";
import { getImageUrl } from "@/lib/utils";

const BRAND_MAP: Record<string, "anty-mama" | "nurse-cam"> = {
  ANTY_MAMA: "anty-mama",
  NURSE_CAM: "nurse-cam",
};

export default function ProductSection() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const apiBrand = BRAND_MAP[brand];

  const { data, isLoading } = useGetProductsQuery({
    brand: apiBrand,
    limit: 4,
    page: 1,
    isActive: true,
    sortBy: "createdAt",
    order: "desc",
  });

  const products = data?.products ?? [];

  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: theme.subtext }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ color: theme.text }}
            >
              {brand === "ANTY_MAMA" ? "Our Products" : "Our Items"}
            </h2>
            <p
              className="mt-1 text-sm lg:text-base"
              style={{ color: theme.muted }}
            >
              {brand === "ANTY_MAMA"
                ? "Carefully crafted products for everyday needs"
                : "Smart monitoring solutions for healthcare"}
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold border-b hover:opacity-80"
            style={{ color: theme.primary, borderColor: theme.primary }}
          >
            View All Products →
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <FiPackage size={36} style={{ color: theme.primary }} />
            <p className="mt-4 text-sm max-w-sm" style={{ color: theme.muted }}>
              Products for{" "}
              <strong>
                {brand === "ANTY_MAMA" ? "Anty Mama" : "Nurse Cam"}
              </strong>{" "}
              will appear here soon.
            </p>
          </motion.div>
        )}

        {/* Products */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group block p-4 rounded-2xl bg-white border hover:shadow-xl hover:-translate-y-1 transition-all"
                style={{ borderColor: theme.border }}
              >
                <div className="relative aspect-[4/5] mb-3 rounded-xl overflow-hidden">
                  <Image
                    src={getImageUrl(product.images?.[0]) ?? "/default.jfif"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3
                  className="text-sm md:text-base font-semibold line-clamp-2"
                  style={{ color: theme.text }}
                >
                  {product.name}
                </h3>

                <p
                  className="mt-1 text-base font-bold"
                  style={{ color: theme.primary }}
                >
                  ₹{product.price}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="flex justify-center mt-8 lg:hidden">
          <Link
            href="/products"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              backgroundColor: theme.primary,
              color: theme.subtext,
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
