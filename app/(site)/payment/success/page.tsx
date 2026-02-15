"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetSessionQuery } from "@/lib/api/paymentApi";
import { CheckCircle, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const sessionId = searchParams.get("session_id");

  const { data: session, isLoading, error } = useGetSessionQuery(sessionId!, {
    skip: !sessionId,
  });

  useEffect(() => {
    if (!sessionId) {
      router.push("/cart");
    }
  }, [sessionId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to verify payment
          </h1>
          <p className="text-gray-600 mb-6">
            Please check your order history or contact support.
          </p>
          <Link
            href="/profile"
            className="inline-block px-6 py-3 rounded-xl text-white font-semibold"
            style={{ background: theme.primary }}
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${theme.primary}15` }}
          >
            <CheckCircle
              className="w-12 h-12"
              style={{ color: theme.primary }}
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your payment.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Order Details
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium text-gray-900">
                  #{session.order?._id?.slice(-8) || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className="font-medium text-green-600 capitalize">
                  {session.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-medium text-gray-900">
                  ${(session.amountTotal / 100).toFixed(2)}
                </span>
              </div>

              {session.customerEmail && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">
                    {session.customerEmail}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
              style={{ background: theme.primary }}
            >
              <Package className="w-4 h-4" />
              View Orders
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold"
              style={{ borderColor: theme.primary, color: theme.primary }}
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}
