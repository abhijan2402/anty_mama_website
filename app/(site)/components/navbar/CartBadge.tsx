"use client";

import { AnimatePresence, motion } from "framer-motion";

export function CartBadge({
  count,
  themeColor,
}: {
  count: number;
  themeColor?: string;
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] font-semibold flex items-center justify-center shadow-sm"
          style={{
            backgroundColor: themeColor || "#F87171",
            color: "#fff",
          }}
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
