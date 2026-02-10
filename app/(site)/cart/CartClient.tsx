"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EmptyCartState } from "./components/EmptyCartState";
import { CartItemRow } from "./components/CartItemRow";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/app/providers/CartProvider";
import { useAuth } from "@/app/providers/AuthProvider";
import { RequireLoginModal } from "../components/auth/require-login-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const { user } = useAuth();
  const router = useRouter();
  const { items, groupedItems, removeFromCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const total = items.reduce((sum: number, item: any) => sum + item.price, 0);

  if (items.length === 0) return <EmptyCartState />;

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true); // 🚨 show modal
      return;
    }

    router.push("/checkout"); // ✅ logged in
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 flex items-center gap-2">
            <FiShoppingCart size={28} /> Your Cart
          </h1>
          <p className="mt-1 text-neutral-600">
            Review your items and complete your purchase
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
        >
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-10">
        {/* Products */}
        <div className="space-y-10">
          {Object.entries(groupedItems).map(([key, list]: any) =>
            list.length ? (
              <section key={key}>
                <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider text-neutral-500">
                  {key === "antyMama" ? "Anty Mama" : "Nurse Cam"}
                </h3>

                <AnimatePresence>
                  {list.map((item: any) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      color="red"
                    />
                  ))}
                </AnimatePresence>
              </section>
            ) : null
          )}
        </div>

        {/* Billing summary */}
        <aside className="rounded-2xl border border-neutral-200 p-6 h-fit">
          <h4 className="text-sm font-semibold mb-6 text-neutral-800">
            Order Summary
          </h4>

          <div className="flex justify-between text-sm text-neutral-600 mb-4">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900">${total}</span>
          </div>

          <div className="flex justify-between text-sm text-neutral-600 mb-6">
            <span>Shipping</span>
            <span className="font-semibold text-neutral-900">$0</span>
          </div>

          <div className="flex justify-between text-sm font-semibold text-neutral-900 mb-6">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
      <RequireLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
