"use client";

import AuthModal from "@/app/auth/AuthModal";
import { useAuth } from "@/app/providers/AuthProvider";
import { Clock } from "lucide-react";

export default function CheckoutPage() {
  const { user } = useAuth();

  if (!user) {
    return <AuthModal />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#693C36]/10 flex items-center justify-center">
          <Clock className="w-8 h-8 text-[#693C36]" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Checkout Coming Soon
        </h1>

        <p className="text-gray-600 leading-relaxed">
          We’re putting the final touches on our secure checkout experience.
          You’ll be able to place orders very soon.
        </p>

        <p className="mt-6 text-sm text-gray-400">Powered by Anty Mama LLC</p>
      </div>
    </main>
  );
}
