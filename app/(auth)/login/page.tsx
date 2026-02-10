"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "@/lib/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

const BRAND = "#693C36";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const { handleAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);

      handleAuth(res);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT IMAGE SECTION */}
      <div className="relative hidden md:block">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxgPGAU4xNBVBCW2dkOz4XHMC_M3nkbuwHA&s"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#693C36]/70 flex items-center justify-center text-white">
          <div className="text-center px-10 max-w-lg">
            <img
              src="/anty_mama_logo.png"
              alt="AntyMama Logo"
              className="mx-auto mb-6 h-20 w-auto"
            />

            <h1 className="text-3xl font-bold tracking-wide">AntyMama</h1>
            <p className="mt-2 text-sm opacity-90">
              Explore. Experience. Elevate.
            </p>

            <div className="mt-8">
              <h2 className="text-4xl font-semibold">Welcome Back</h2>
              <p className="mt-4 text-base opacity-90">
                Login to access your dashboard and manage your journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 md:hidden text-center">
            <img
              src="/anty_mama_logo.png"
              alt="AntyMama Logo"
              className="mx-auto h-14 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold  text-amber-900">AntyMama</h1>
            <p className="text-sm text-gray-500">Sign in to continue</p>
          </div>

          <div className="mb-4">
            <Link
              href="/"
              className="text-sm font-medium hover:underline"
              style={{ color: BRAND }}
            >
              ← Back to Home
            </Link>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials below
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border text-gray-800 border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg text-gray-800 border border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: BRAND }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg text-white font-medium transition disabled:opacity-70"
              style={{ backgroundColor: BRAND }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="pt-4">
              <Link
                href="/"
                className="block w-full h-11 rounded-lg border text-center leading-[44px] font-medium transition hover:bg-gray-50"
                style={{ borderColor: BRAND, color: BRAND }}
              >
                Continue as Guest
              </Link>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: BRAND }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
