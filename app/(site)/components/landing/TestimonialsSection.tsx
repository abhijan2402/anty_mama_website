"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider";

const TESTIMONIALS: Record<
  Brand,
  Array<{
    name: string;
    role: string;
    review: string;
  }>
> = {
  ANTY_MAMA: [
    {
      name: "Ritika Sharma",
      role: "Home Chef",
      review:
        "The cookware quality from Anty Mama is outstanding. The finish, weight, and heat distribution feel premium. I've replaced most of my kitchen tools with their products.",
    },
    {
      name: "Meenal Joshi",
      role: "Working Mother",
      review:
        "What I love most is the durability. Anty Mama products feel thoughtfully designed for everyday use and long-term performance. Cleanup is effortless!",
    },
    {
      name: "Amit Patel",
      role: "Food Blogger",
      review:
        "Perfect heat distribution and non-stick performance. My dosas and rotis come out perfect every time. Professional quality for home kitchens.",
    },
    {
      name: "Priya Singh",
      role: "Restaurant Owner",
      review:
        "Bought the complete cookware set for my restaurant. Heavy-duty construction handles high-volume cooking while maintaining perfect non-stick performance.",
    },
  ],
  NURSE_CAM: [
    {
      name: "Dr. Ankit Verma",
      role: "Senior Nurse Educator",
      review:
        "Nurse Cam has been extremely helpful for training and monitoring. The clarity and reliability make it perfect for professional healthcare environments.",
    },
    {
      name: "Rahul Mehta",
      role: "Hospital Administrator",
      review:
        "We deployed Nurse Cam systems across multiple wards. The setup was smooth, and support has been excellent. Highly recommended for healthcare institutions.",
    },
    {
      name: "Dr. Priyanka Rao",
      role: "Nursing Program Director",
      review:
        "4K resolution captures every clinical detail perfectly. Students can review procedures from multiple angles with crystal-clear video quality.",
    },
    {
      name: "Sarah Khan",
      role: "Clinical Supervisor",
      review:
        "HIPAA compliance and reliable cloud storage give us peace of mind. The multi-user access works flawlessly during training sessions.",
    },
  ],
};

export default function TestimonialsSection() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const testimonials = TESTIMONIALS[brand];

  return (
    <section
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.subtext} 0%, white 50%, ${theme.primary}02 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-24"
        >
          <div
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8 max-w-max mx-auto border"
            style={{
              backgroundColor: `${theme.primary}15`,
              borderColor: `${theme.primary}30`,
            }}
          >
            <FiStar className="w-5 h-5" style={{ color: theme.primary }} />
            <span
              className="font-semibold text-sm uppercase tracking-wide"
              style={{ color: theme.primary }}
            >
              {testimonials.length}+ Happy{" "}
              {brand === "ANTY_MAMA" ? "Home Cooks" : "Institutions"}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.text}, ${theme.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {brand === "ANTY_MAMA"
              ? "Loved by Home Cooks"
              : "Trusted by Healthcare Professionals"}
          </h2>
        </motion.div>

        {/* SQUARE Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/85 backdrop-blur-xl border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              style={{
                borderColor: `${theme.primary}20`,
                boxShadow: `0 25px 70px rgba(0,0,0,0.1)`,
                aspectRatio: "1/1", // PERFECT SQUARE!
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Animated star border */}
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary}20, transparent, ${theme.primary}20)`,
                }}
              />

              {/* Compact Stars - Smaller */}
              <div className="flex items-center gap-0.5 p-4 pt-5 pb-2 border-b border-gray-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                  >
                    <FiStar
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      style={{ color: theme.primary }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Compact Review - Truncated */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <blockquote
                  className="text-xs lg:text-sm leading-tight mb-4 line-clamp-3 italic"
                  style={{ color: theme.muted }}
                >
                  "{testimonial.review}"
                </blockquote>

                {/* Compact User Info */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div
                    className="w-8 h-8 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}25, ${theme.primary}15)`,
                    }}
                  >
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: theme.primary }}
                    >
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-xs leading-tight truncate"
                      style={{ color: theme.text }}
                    >
                      {testimonial.name}
                    </p>
                    <p className="text-xs opacity-75 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating brand accent */}
              <div
                className="absolute -top-2 -right-2 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.primary}40, ${theme.primary}10)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
