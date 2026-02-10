"use client";

import { useState } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/lib/api/authApi";

const BRAND = "#693C36";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [forgotPassword, { isLoading: sendingOtp }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();

  /* STEP 1 → SEND OTP */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  /* STEP 2 → RESET PASSWORD */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length < 4) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      await resetPassword({
        email,
        otp,
        newPassword,
      }).unwrap();

      toast.success("Password reset successfully");
      window.location.href = "/login";
    } catch (err: any) {
      toast.error(err?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT IMAGE */}
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
            <h1 className="text-3xl font-bold ">AntyMama</h1>
            <p className="mt-2 text-sm opacity-90">Secure account recovery</p>

            <div className="mt-8">
              <h2 className="text-4xl font-semibold">Forgot Password?</h2>
              <p className="mt-4 text-base opacity-90">
                Reset access in just two steps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <div className="mb-8 md:hidden text-center">
            <img
              src="/anty_mama_logo.png"
              alt="AntyMama Logo"
              className="mx-auto h-14 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-amber-900">AntyMama</h1>
          </div>

          {/* BACK STEP */}
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm mb-4 hover:underline"
              style={{ color: BRAND }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">
                Reset Password
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter your registered email
              </p>

              <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full pl-10 py-3 rounded-lg border text-gray-800 border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full h-11 rounded-lg text-white font-medium transition disabled:opacity-60"
                  style={{ backgroundColor: BRAND }}
                >
                  {sendingOtp ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter OTP & new password
              </p>

              <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full py-3 px-4 rounded-lg border text-gray-800 border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 py-3 rounded-lg border text-gray-800 border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetting}
                  className="w-full h-11 rounded-lg text-white font-medium transition disabled:opacity-60"
                  style={{ backgroundColor: BRAND }}
                >
                  {resetting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              style={{ color: BRAND }}
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
