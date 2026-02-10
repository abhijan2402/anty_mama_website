"use client";

import { motion } from "framer-motion";
import {
  FiShield,
  FiTruck,
  FiStar,
  FiUsers,
  FiLayers,
  FiThumbsUp,
} from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider";

const FEATURES: Record<
  Brand,
  Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
  }>
> = {
  ANTY_MAMA: [
    {
      icon: <FiStar />,
      title: "Premium Cookware Craftsmanship",
      desc: "Every Anty Mama piece features triple-layer non-stick coating, even heat distribution, and oven-safe construction up to 450°F for professional results at home.",
    },
    {
      icon: <FiLayers />,
      title: "Everyday Kitchen Essential",
      desc: "From frying pans and kadais to complete cookware sets, designed for daily cooking with ergonomic handles and stackable storage convenience.",
    },
    {
      icon: <FiUsers />,
      title: "Home Chef Approved",
      desc: "Trusted by thousands of home cooks who demand durability, easy cleaning, and consistent performance for family meals and special occasions.",
    },
    {
      icon: <FiShield />,
      title: "Lifetime Durability Guarantee",
      desc: "PFOA-free materials with lifetime warranty ensure your investment lasts through years of daily use without compromising safety or performance.",
    },
    {
      icon: <FiTruck />,
      title: "Fast Home Delivery",
      desc: "Secure packaging and efficient logistics get your cookware to your kitchen within 2-5 days across all regions with hassle-free returns.",
    },
    {
      icon: <FiThumbsUp />,
      title: "Easy Maintenance",
      desc: "Dishwasher-safe design with effortless food release makes cleanup effortless while preserving the non-stick performance for years.",
    },
  ],
  NURSE_CAM: [
    {
      icon: <FiStar />,
      title: "Clinical Grade Precision",
      desc: "4K Ultra HD cameras with 60fps recording capture every clinical detail with crystal-clear resolution trusted by nursing institutions worldwide.",
    },
    {
      icon: <FiLayers />,
      title: "Complete Training Ecosystem",
      desc: "Multi-angle coverage, AI movement detection, and HIPAA-compliant cloud storage create comprehensive training solutions for modern nursing programs.",
    },
    {
      icon: <FiUsers />,
      title: "Trusted by 250+ Institutions",
      desc: "Nursing schools, hospitals, and healthcare providers rely on Nurse Cam for consistent quality, reliable uptime, and professional support.",
    },
    {
      icon: <FiShield />,
      title: "HIPAA & GDPR Compliant",
      desc: "Enterprise-grade security with end-to-end encryption ensures patient privacy and regulatory compliance across all recording and streaming functions.",
    },
    {
      icon: <FiTruck />,
      title: "Rapid Institutional Deployment",
      desc: "Priority shipping and white-glove installation services ensure your training systems are operational within 48 hours of order placement.",
    },
    {
      icon: <FiThumbsUp />,
      title: "99.9% Platform Reliability",
      desc: "Cloud infrastructure with redundant servers guarantees uninterrupted streaming and 24/7 access to training content from any authorized device.",
    },
  ],
};

export default function WhyChooseUsSection() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const features = FEATURES[brand];

  return (
    <section
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.subtext} 0%, ${theme.primary}05 50%, #f8fafc 100%)`,
      }}
    >
      {/* Dynamic accent blobs */}
      <div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 rounded-full blur-3xl -z-10"
        style={{
          background: `linear-gradient(to bottom right, ${theme.primary}20, ${theme.primary}05)`,
        }}
      />
      <div
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-primary/5 rounded-full blur-2xl -z-10"
        style={{
          background: `linear-gradient(to top right, ${theme.primary}10, transparent)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.text}, ${theme.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose {brand === "ANTY_MAMA" ? "Anty Mama" : "Nurse Cam"}
          </h2>
          <p
            className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.muted }}
          >
            {brand === "ANTY_MAMA"
              ? "Premium cookware crafted for modern kitchens with professional performance and everyday reliability."
              : "Professional-grade nursing education tools trusted by institutions worldwide with enterprise reliability."}
          </p>
        </motion.div>

        {/* Dynamic Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-white/80 backdrop-blur-sm border rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-transparent transition-all duration-500 overflow-hidden"
              style={{
                borderColor: `${theme.border}40`,
                boxShadow: `0 10px 40px ${theme.primary}10`,
              }}
            >
              {/* Icon with dynamic background */}
              <div
                className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl mb-5 text-xl lg:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}10)`,
                  color: theme.primary,
                  boxShadow: `0 8px 25px ${theme.primary}30`,
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3
                className="text-lg lg:text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors"
                style={{ color: theme.text }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm lg:text-base leading-relaxed group-hover:text-gray-700"
                style={{ color: theme.muted }}
              >
                {item.desc}
              </p>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, ${theme.primary}80, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
