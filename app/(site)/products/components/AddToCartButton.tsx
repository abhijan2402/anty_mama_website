"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onAdd: () => void;
  color: string;
  textColor: string;
  alreadyAdded?: boolean;
  loading?: boolean;
};

export function AddToCartButton({
  onAdd,
  color,
  textColor,
  alreadyAdded,
  loading,
}: Props) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleClick = () => {
    if (alreadyAdded) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
      return;
    }
    onAdd();
  };

  return (
    <div className="relative">
      <button
        disabled={loading}
        onClick={onAdd}
        className="w-full mt-2 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ backgroundColor: color, color: textColor }}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          "Add to Cart"
        )}
      </button>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded shadow-md"
          >
            Item already in cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
