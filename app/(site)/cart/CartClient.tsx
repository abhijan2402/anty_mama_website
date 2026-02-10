"use client";

import { AnimatePresence } from "framer-motion";
import { EmptyCartState } from "./components/EmptyCartState";
import { CartItemRow } from "./components/CartItemRow";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { RequireLoginModal } from "../components/auth/require-login-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/lib/api/cartApi";
import { CartPageLoader } from "./components/CartPageLoader";
import { toast } from "sonner";
import CheckoutModal from "./components/CheckoutModal";

export default function CartClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { data: cart, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  if (isLoading) return <CartPageLoader />;
  if (!cart || cart.items.length === 0) return <EmptyCartState />;

  const handleUpdateQty = async (productId: string, qty: number) => {
    try {
      setLoadingItemId(productId);
      await updateCart({ productId, quantity: qty }).unwrap();
      toast.success("Cart updated");
    } catch {
      toast.error("Failed to update quantity");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      setLoadingItemId(productId);
      await removeFromCart(productId).unwrap();
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setCheckoutOpen(true); // Open modal instead of redirect
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl text-amber-950 font-bold flex items-center gap-2">
            <FiShoppingCart size={28} /> Your Cart
          </h1>
          <p className="mt-1 text-neutral-600">
            Review your items and complete your purchase
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-amber-950 text-sm font-semibold"
        >
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-10">
        {/* Cart Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {cart.items.map((item: any) => (
              <CartItemRow
                key={item.productId._id}
                item={item}
                loading={loadingItemId === item.productId._id}
                onRemove={() => handleRemove(item.productId._id)}
                onUpdate={(qty: number) =>
                  handleUpdateQty(item.productId._id, qty)
                }
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border p-6 h-fit">
          <h4 className="text-sm font-semibold mb-6 text-amber-950">
            Order Summary
          </h4>

          <div className="flex justify-between text-sm mb-4 text-gray-900">
            <span>Subtotal</span>
            <span className="font-semibold">${cart.totalAmount}</span>
          </div>

          <div className="flex justify-between text-sm mb-6 text-gray-900">
            <span>Shipping</span>
            <span className="font-semibold">$0</span>
          </div>

          <div className="flex justify-between font-semibold mb-6 text-gray-900">
            <span>Total</span>
            <span>${cart.totalAmount}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 rounded-xl bg-neutral-900 text-white font-semibold"
          >
            Proceed to Checkout ({cart.items.length} items)
          </button>
        </aside>
      </div>

      <RequireLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        cartItems={cart.items}
        totalAmount={cart.totalAmount}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => {
          setCheckoutOpen(false);
          router.refresh(); // Refresh cart/orders
          toast.success("Order placed! Check your orders.");
        }}
      />
    </div>
  );
}
