"use client";

import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiCreditCard,
  FiPackage,
  FiCheck,
} from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider";

const STEPS: Record<
  Brand,
  Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
  }>
> = {
  ANTY_MAMA: [
    {
      icon: <FiSearch />,
      title: "Discover Cookware",
      desc: "Select Anty Mama to explore premium non-stick pans, kadais, and complete cookware sets designed for modern kitchens.",
    },
    {
      icon: <FiShoppingCart />,
      title: "Add to Kitchen Cart",
      desc: "Browse detailed product specs, oven-safe ratings, and customer reviews before adding to your shopping cart.",
    },
    {
      icon: <FiCreditCard />,
      title: "Secure Payment",
      desc: "Complete checkout with multiple payment options including cards, UPI, and EMI for hassle-free purchases.",
    },
    {
      icon: <FiPackage />,
      title: "Kitchen Delivery",
      desc: "Orders carefully packed with protective materials arrive at your doorstep within 2-5 business days.",
    },
  ],
  NURSE_CAM: [
    {
      icon: <FiSearch />,
      title: "Select Training Solution",
      desc: "Choose Nurse Cam systems for your institution - 4K cameras, multi-angle coverage, and clinical training tools.",
    },
    {
      icon: <FiShoppingCart />,
      title: "Configure Your System",
      desc: "Customize camera angles, cloud storage plans, and streaming access based on your training requirements.",
    },
    {
      icon: <FiCreditCard />,
      title: "Institutional Purchase",
      desc: "Enterprise billing, PO processing, and volume discounts available for nursing schools and hospitals.",
    },
    {
      icon: <FiPackage />,
      title: "Professional Installation",
      desc: "Priority deployment with white-glove installation and staff training completed within 48 hours.",
    },
  ],
};

export default function HowItWorksSection() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const steps = STEPS[brand];

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Dynamic background accents */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/1"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.primary}05, transparent 50%, ${theme.primary}02)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-24"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, #111827, #374151, ${theme.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How It Works
          </h2>
          <p
            className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.muted }}
          >
            {brand === "ANTY_MAMA"
              ? "Get premium cookware from discovery to delivery in 4 simple steps"
              : "Deploy professional training solutions for your institution seamlessly"}
          </p>
        </motion.div>

        {/* Enhanced Steps with Progress Line */}
        <div className="relative">
          {/* Progress Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-16 lg:top-20 w-1 h-[calc(100%-5rem)] bg-gradient-to-b from-primary/20 via-primary/40 to-primary"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${theme.primary}20, ${theme.primary}50, ${theme.primary})`,
            }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Step Number Badge */}
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center text-lg lg:text-xl font-black z-10"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}E6)`,
                    boxShadow: `0 12px 40px ${theme.primary}40`,
                    color: theme.subtext,
                  }}
                >
                  {index + 1}
                </div>

                {/* Step Card */}
                <div
                  className="relative bg-white/90 backdrop-blur-sm border rounded-3xl p-6 lg:p-8 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:scale-[1.02] transition-all duration-500 border-transparent hover:border-primary/30 overflow-hidden h-full"
                  style={{
                    borderColor: `${theme.primary}20`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.08)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}15, ${theme.primary}25)`,
                      color: theme.primary,
                      border: `2px solid ${theme.primary}30`,
                    }}
                  >
                    <div className="text-2xl lg:text-3xl">{step.icon}</div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl lg:text-2xl font-bold mb-4 leading-tight text-center"
                    style={{ color: theme.text }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-base lg:text-lg leading-relaxed text-center px-2"
                    style={{ color: theme.muted }}
                  >
                    {step.desc}
                  </p>

                  {/* Step completion tick (for active/past steps) */}
                  {index < 2 && (
                    <div
                      className="absolute -bottom-3 -right-3 w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white"
                      style={{ boxShadow: `0 8px 25px rgba(16,185,129,0.4)` }}
                    >
                      <FiCheck className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  )}

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${theme.primary}10, transparent, ${theme.primary}10)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
