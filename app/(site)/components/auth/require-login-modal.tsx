"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogIn } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RequireLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequireLoginModal({ isOpen, onClose }: RequireLoginModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full p-8 z-50 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              onClick={onClose}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Lock className="w-12 h-12 text-white" />
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Login Required
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  This feature is available for registered users only. Please
                  sign in to continue.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleLogin}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 h-14 font-semibold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center"
                >
                  <LogIn className="mr-3 h-6 w-6" />
                  <span>Sign in to your account</span>
                </button>
                <button
                  className="w-full border border-gray-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm text-gray-700 hover:text-gray-900 hover:bg-white shadow-lg h-14 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center"
                  onClick={onClose}
                >
                  <User className="mr-3 h-6 w-6" />
                  <span>Continue as Guest</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
