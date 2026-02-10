"use client";

import { motion } from "framer-motion";

export default function ProductLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner Ring */}
        <motion.div
          className="relative w-10 h-10"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-amber-200" />
          <div className="absolute inset-0 rounded-full border-4 border-amber-600 border-t-transparent" />
        </motion.div>

        {/* Brand Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-amber-700 uppercase">
            Loading
          </p>
          <p className="text-xs text-gray-500">
            Crafting premium textile details
          </p>
        </div>
      </div>
    </div>
  );
}
