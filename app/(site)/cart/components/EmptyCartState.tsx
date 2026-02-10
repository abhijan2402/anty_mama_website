"use client";

import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center h-[60vh] justify-center py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4"
      >
        <FiShoppingBag size={36} className="text-neutral-400" />
      </motion.div>

      <h3 className="text-lg font-semibold text-neutral-800">
        Your cart is empty
      </h3>

      <p className="mt-2 text-sm text-neutral-500 max-w-xs">
        Looks like you haven’t added anything yet.
      </p>

      <Link
        href="/products"
        className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:opacity-90"
      >
        Browse Products
      </Link>
    </motion.div>
  );
}
