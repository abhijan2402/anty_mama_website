"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSendOtpMutation, useSignupMutation } from "@/lib/api/authApi";
import { toast } from "sonner";

const BRAND = "#693C36";

export default function SignupPage() {
  const router = useRouter();
  const { handleAuth } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    otp: "",
  });

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [signup, { isLoading: signingUp }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* STEP 1 → SEND OTP */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendOtp({ email: form.email }).unwrap();
      setStep(2);
    } catch (err: any) {
      toast(err?.data?.message || "Failed to send OTP");
    }
  };

  /* STEP 2 → VERIFY OTP & SIGNUP */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const res = await signup(form).unwrap();
      console.log(res);

      handleAuth(res);
      router.push("/");
    } catch (err: any) {
      // 👇 Handle backend field errors properly
      if (err?.data?.errors?.length) {
        toast.error(err.data.errors[0].msg);
      } else {
        toast.error(err?.data?.message || "Signup failed");
      }
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
            <h1 className="text-3xl font-bold">AntyMama</h1>
            <p className="mt-2 text-sm opacity-90">
              Explore. Experience. Elevate.
            </p>

            <div className="mt-8">
              <h2 className="text-4xl font-semibold">Create Account</h2>
              <p className="mt-4 opacity-90">
                Join AntyMama and start your journey with us today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 md:hidden text-center">
            <img
              src="/anty_mama_logo.png"
              alt="AntyMama Logo"
              className="mx-auto h-14 mb-4"
            />
            <h1 className="text-2xl font-bold text-amber-900">AntyMama</h1>
            <p className="text-sm text-gray-500">Create your account</p>
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

          <h2 className="text-2xl font-semibold text-black">
            {step === 1 ? "Register" : "Verify OTP"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {step === 1
              ? "Fill in your details below"
              : "Enter the OTP sent to your email"}
          </p>

          <form
            onSubmit={step === 1 ? handleSendOtp : handleSignup}
            className="mt-8 space-y-5"
          >
            {/* STEP 1 FIELDS */}
            {step === 1 && (
              <>
                {/* Name */}
                <label className="text-sm font-medium text-amber-800">
                  Full Name
                </label>
                <Input
                  icon={<User />}
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />

                {/* Email */}
                <label className="text-sm font-medium text-amber-800">
                  Email
                </label>

                <Input
                  icon={<Mail />}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />

                {/* Mobile */}
                <div>
                  <label className="text-sm font-medium text-amber-800">
                    Phone No.
                  </label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                    <input
                      type="tel"
                      name="mobile"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={form.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setForm({ ...form, mobile: value });
                        }
                      }}
                      required
                      className="w-full pl-10 py-3 rounded-lg text-gray-800 border border-gray-300 focus:border-[#693C36] focus:ring-2 focus:ring-[#693C36]/20 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-amber-800">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 outline-none text-gray-700"
                      style={{
                        borderColor: BRAND,
                        boxShadow: `0 0 0 1px ${BRAND}20`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-800"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2 OTP */}
            {step === 2 && (
              <Input
                icon={<Lock />}
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
              />
            )}

            <button
              type="submit"
              disabled={sendingOtp || signingUp}
              className="w-full h-11 rounded-lg text-white font-medium"
              style={{ backgroundColor: BRAND }}
            >
              {step === 1
                ? sendingOtp
                  ? "Sending OTP..."
                  : "Send OTP"
                : signingUp
                ? "Creating Account..."
                : "Verify & Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              style={{ color: BRAND }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* SMALL INPUT HELPER */
function Input({ icon, ...props }: any) {
  return (
    <div>
      <div className="relative mt-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          {...props}
          required
          className="w-full pl-10 py-3 ml-2 rounded-lg border border-gray-300 focus:ring-2 outline-none text-gray-700"
        />
      </div>
    </div>
  );
}
