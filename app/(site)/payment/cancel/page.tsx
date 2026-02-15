"use client";

import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export default function PaymentCancelPage() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment was not completed. Your cart items are still saved.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> No charges were made to your account. You
              can try again or continue shopping.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
              style={{ background: theme.primary }}
            >
              <ShoppingCart className="w-4 h-4" />
              Return to Cart
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
