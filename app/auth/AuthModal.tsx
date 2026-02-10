"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/app/providers/AuthProvider";

export default function AuthModal() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold">Login Required</h2>
        <button className="mt-4 w-full bg-black text-white py-2 rounded">
          Login (Dummy)
        </button>
      </div>
    </motion.div>
  );
}
