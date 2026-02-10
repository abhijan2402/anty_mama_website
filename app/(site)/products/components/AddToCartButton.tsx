"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onAdd: () => void;
  color: string;
  textColor: string;
  alreadyAdded?: boolean;
};

export function AddToCartButton({
  onAdd,
  color,
  textColor,
  alreadyAdded,
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
        onClick={handleClick}
        className="w-full mt-1 py-2 text-xs font-semibold rounded-lg transition"
        style={{ backgroundColor: color, color: textColor }}
      >
        {alreadyAdded ? "Added in Cart" : "Add to Cart"}
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
