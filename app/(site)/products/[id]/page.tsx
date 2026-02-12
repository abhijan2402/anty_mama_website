"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { useCart } from "@/app/providers/CartProvider";
import { useGetProductByIdQuery } from "@/lib/api/productApi";
import { getImageUrl } from "@/lib/utils";
import { useAddToCartMutation } from "@/lib/api/cartApi";
import { toast } from "sonner";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const [expanded, setExpanded] = useState(false);
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: productId }).unwrap();
      toast.success("Added to cart");
    } catch (err: any) {
      if (err?.status === 409) {
        toast.info("Item already in cart");
      } else {
        toast.error("Failed to add item");
      }
    }
  };

  /* Loading */
  if (isLoading) {
    return (
      <div className="h-[80vh] text-amber-900 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
        <p className="text-lg font-semibold">Loading products…</p>
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
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div
            className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-white"
            style={{ border: `1px solid ${theme.border}` }}
          >
            <Image
              src={getImageUrl(product.images?.[0]) ?? "/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-4"
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
            <div className="mt-6">
              <h3
                className="text-sm font-semibold uppercase mb-3 tracking-wide"
                style={{ color: theme.text }}
              >
                Description
              </h3>

              <motion.p
                initial={false}
                animate={{ height: expanded ? "auto" : "4.5rem" }}
                className="text-sm overflow-hidden leading-relaxed"
                style={{ color: theme.muted }}
              >
                {product.description}
              </motion.p>

              {product.description?.length > 120 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 flex items-center gap-1 text-sm font-medium transition-all hover:opacity-80"
                  style={{ color: theme.primary }}
                >
                  {expanded ? "Read Less" : "Read More"}
                  {expanded ? (
                    <FiChevronUp className="transition-transform duration-300" />
                  ) : (
                    <FiChevronDown className="transition-transform duration-300" />
                  )}
                </button>
              )}
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
              disabled={addCartLoading}
              onClick={handleAddToCart}
              className="w-full mt-2 py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60  text-white hover:opacity-90"
              style={{ backgroundColor: theme.primary }}
            >
              {addCartLoading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
