"use client";

import { motion } from "framer-motion";
import { FiSearch, FiPackage } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

type Props = {
  search?: string;
};

export function EmptyProducts({ search }: Props) {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  const brandLabel = brand === "ANTY_MAMA" ? "Anty Mama" : "Nurse Cam";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-24 px-4"
    >
      <div
        className="h-16 w-16 flex items-center justify-center rounded-full mb-6"
        style={{ backgroundColor: theme.primary + "20" }}
      >
        {search ? (
          <FiSearch size={28} style={{ color: theme.primary }} />
        ) : (
          <FiPackage size={28} style={{ color: theme.primary }} />
        )}
      </div>

      <h2 className="text-lg font-semibold" style={{ color: theme.text }}>
        No products found
      </h2>

      <p className="mt-2 text-sm max-w-md" style={{ color: theme.muted }}>
        {search ? (
          <>
            We couldn’t find any products matching{" "}
            <span className="font-medium" style={{ color: theme.text }}>
              “{search}”
            </span>{" "}
            for <strong>{brandLabel}</strong>.
          </>
        ) : (
          <>
            Products for <strong>{brandLabel}</strong> will appear here once
            they’re available.
          </>
        )}
      </p>
    </motion.div>
  );
}
