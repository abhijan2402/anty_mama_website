"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { useCart } from "@/app/providers/CartProvider";
import { useGetProductByIdQuery } from "@/lib/api/productApi";
import { getImageUrl } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  /* Loading */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-sm text-gray-500">
          Loading product…
        </div>
      </div>
    );
  }

  /* Not Found */
  if (isError || !product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <FiAlertCircle size={40} style={{ color: theme.primary }} />
        <p className="mt-4 text-sm" style={{ color: theme.muted }}>
          This product does not exist or is no longer available.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Heading */}
        <div className="space-y-2">
          <h1
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: theme.text }}
          >
            Product Details
          </h1>
          <p
            className="text-sm md:text-base max-w-2xl"
            style={{ color: theme.muted }}
          >
            Explore detailed information, specifications, and pricing for this
            product.
          </p>
        </div>

        {/* Product */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div
            className="relative aspect-[3/4] rounded-xl overflow-hidden"
            style={{ border: `1px solid ${theme.border}` }}
          >
            <Image
              src={getImageUrl(product.images?.[0]) ?? "/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: theme.text }}
              >
                {product.name}
              </h2>

              <p
                className="mt-2 text-sm uppercase tracking-wide"
                style={{ color: theme.muted }}
              >
                {product.deliveryMode}
              </p>
            </div>

            <p
              className="text-xl font-semibold"
              style={{ color: theme.primary }}
            >
              {product.currency} {product.price}
            </p>

            {/* Description */}
            <div>
              <h3
                className="text-sm font-semibold uppercase mb-1"
                style={{ color: theme.text }}
              >
                Description
              </h3>
              <p className="text-sm" style={{ color: theme.muted }}>
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <div className="space-y-2">
                <h3
                  className="text-sm font-semibold uppercase"
                  style={{ color: theme.text }}
                >
                  Specifications
                </h3>
                <ul className="text-sm space-y-1">
                  {product.specifications.map((spec: any, i: number) => (
                    <li
                      key={i}
                      className="flex justify-between"
                      style={{ color: theme.muted }}
                    >
                      <span>{spec.key}</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <button
              disabled={!product.isStock}
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  brand,
                })
              }
              className="w-full md:w-auto px-10 py-3 rounded-xl text-sm font-semibold transition"
              style={{
                backgroundColor: theme.primary,
                color: theme.subtext,
                opacity: product.isStock ? 1 : 0.6,
              }}
            >
              {product.isStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
