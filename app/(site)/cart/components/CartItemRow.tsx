"use client";

import { motion } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export function CartItemRow({ item, onRemove, onUpdate, loading }: any) {
  const product = item.productId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between py-4 border-b"
    >
      {/* Image */}
      <div className="w-16 h-16 relative rounded-lg overflow-hidden border">
        <Image
          src={getImageUrl(product.images?.[0])}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 px-4">
        <p className="font-semibold text-amber-950">{product.name}</p>
        <p className="text-sm text-gray-700">
          ${product.price} × {item.quantity}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdate(item.quantity - 1)}
          disabled={item.quantity === 1}
          className="p-1 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          <FiMinus />
        </button>

        <span className="w-5 text-center font-semibold text-amber-900 flex items-center justify-center h-5">
          {loading ? (
            <svg
              className="animate-spin -ml-1 h-4 w-4 text-amber-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            item.quantity
          )}
        </span>

        <button
          onClick={() => onUpdate(item.quantity + 1)}
          className="p-1 rounded text-gray-700 hover:bg-gray-100"
        >
          <FiPlus />
        </button>

        <button
          onClick={onRemove}
          className="p-2 rounded hover:bg-red-100 ml-2 text-red-700"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
}
