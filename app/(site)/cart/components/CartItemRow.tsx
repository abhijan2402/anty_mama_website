"use client";

import { motion } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";
import { useCart } from "@/app/providers/CartProvider";

export function CartItemRow({ item, color }: any) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between py-4 border-b"
    >
      {/* Left: Image */}
      <div className="w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-200">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Middle: Name & Price */}
      <div className="flex-1 px-4">
        <p className="text-md font-semibold text-gray-700">{item.name}</p>
        <p className="text-sm text-gray-800 font-semibold">
          ₹{item.price} × {item.quantity}
        </p>
      </div>

      {/* Right: Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity === 1}
          className="p-1 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
        >
          <FiMinus size={16} style={{ color }} />
        </button>

        <span className="text-sm text-gray-700 font-semibold w-5 text-center">
          {item.quantity || 0}
        </span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <FiPlus size={16} style={{ color }} />
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 rounded-lg hover:bg-red-100 transition ml-2"
        >
          <FiTrash2 size={16} style={{ color }} />
        </button>
      </div>
    </motion.div>
  );
}
