import { motion } from "framer-motion";
import { ProductFilters } from "./ProductFilters";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export function MobileFilters({
  open,
  onClose,
  categories,
  active,
  onChange,
}: any) {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  if (!open) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="fixed inset-0 z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl p-6"
        style={{ backgroundColor: theme.subtext }}
      >
        <h3
          className="text-sm font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Filter Products
        </h3>

        <ProductFilters
          categories={categories}
          active={active}
          onChange={(v: any) => {
            onChange(v);
            onClose();
          }}
        />
      </div>
    </motion.div>
  );
}
