"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { useState } from "react";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { Brand } from "@/app/providers/BrandProvider";

const FAQS: Record<
  Brand,
  Array<{
    q: string;
    a: string;
  }>
> = {
  ANTY_MAMA: [
    {
      q: "What makes Anty Mama cookware special?",
      a: "Anty Mama features triple-layer PFOA-free non-stick coating, even heat distribution, and oven-safe construction up to 450°F. Cool-touch handles and stackable design make daily cooking effortless.",
    },
    {
      q: "Are Anty Mama products dishwasher safe?",
      a: "Yes, all Anty Mama cookware is dishwasher safe while preserving non-stick performance. Hand washing recommended for longest lifespan, especially for engraved or specialty finishes.",
    },
    {
      q: "What is the warranty on Anty Mama products?",
      a: "Lifetime warranty against manufacturing defects. Covers non-stick coating failure, handle detachment, or warping when used according to care instructions.",
    },
    {
      q: "Can I use metal utensils with Anty Mama pans?",
      a: "Yes, our reinforced triple-layer coating withstands metal utensils. We still recommend silicone or wooden utensils to maximize non-stick lifespan.",
    },
    {
      q: "How soon will my cookware be delivered?",
      a: "Orders ship within 24-48 hours. Standard delivery 2-5 business days. Express shipping available at checkout for urgent kitchen needs.",
    },
    {
      q: "What is your return policy for Anty Mama?",
      a: "30-day satisfaction guarantee. Unused cookware in original packaging can be returned for full refund. Used items eligible for exchange within 14 days.",
    },
  ],
  NURSE_CAM: [
    {
      q: "Is Nurse Cam HIPAA compliant?",
      a: "Yes, fully HIPAA and GDPR compliant. End-to-end encryption, secure cloud storage, and role-based access controls protect patient privacy and training data.",
    },
    {
      q: "What resolution do Nurse Cam systems record?",
      a: "4K Ultra HD at 60fps with night vision capability. Multi-angle coverage captures every clinical detail for comprehensive training documentation.",
    },
    {
      q: "Can multiple users access Nurse Cam simultaneously?",
      a: "Yes, unlimited concurrent streams. Faculty, students, and administrators access live feeds and recordings simultaneously with individual permissions.",
    },
    // {
    //   q: "How is Nurse Cam installed in training facilities?",
    //   a: "White-glove installation included. Professional technicians handle mounting, network configuration, and staff training within 48 hours of delivery.",
    // },
    // {
    //   q: "What cloud storage options are available?",
    //   a: "Unlimited HIPAA-compliant cloud storage. Automatic backups, 99.9% uptime guarantee, and instant access from any authorized device worldwide.",
    // },
    // {
    //   q: "Do you offer institutional discounts?",
    //   a: "Volume pricing and custom contracts available for nursing schools and hospitals. Contact our enterprise team for quotes on 5+ camera deployments.",
    // },
  ],
};

export default function FaqSection() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const faqs = FAQS[brand];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.subtext} 0%, ${theme.primary}02 50%, #f8fafc 100%)`,
      }}
    >
      {/* Subtle background accents */}
      <div
        className="absolute top-32 right-32 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/10 rounded-full blur-3xl"
        style={{
          background: `linear-gradient(to bottom right, ${theme.primary}15, transparent)`,
        }}
      />
      <div
        className="absolute bottom-32 left-32 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-primary/5 rounded-full blur-3xl"
        style={{
          background: `linear-gradient(to top right, ${theme.primary}10, transparent)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-24"
        >
          <div
            className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: `${theme.primary}15` }}
          >
            <FiHelpCircle
              className="w-5 h-5"
              style={{ color: theme.primary }}
            />
            <span
              className="font-semibold text-sm uppercase tracking-wide"
              style={{ color: theme.primary }}
            >
              {brand === "ANTY_MAMA"
                ? "Cookware Support"
                : "Institutional Support"}
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
            Frequently Asked Questions
          </h2>
          <p
            className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.muted }}
          >
            {brand === "ANTY_MAMA"
              ? "Everything you need to know about Anty Mama cookware quality, warranty, and delivery"
              : "Technical specifications, compliance, installation, and institutional deployment details"}
          </p>
        </motion.div>

        {/* Enhanced Glassmorphism FAQ List */}
        <div className="space-y-4 lg:space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                {/* FAQ Card */}
                <div
                  className="bg-white/80 backdrop-blur-xl border rounded-3xl p-1 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border-transparent group-hover:border-primary/30"
                  style={{
                    borderColor: `${theme.primary}20`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.08)`,
                  }}
                >
                  {/* Question Button */}
                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-7 lg:px-8 py-6 lg:py-7 text-left bg-gradient-to-r from-white to-white/60 backdrop-blur-sm hover:bg-white transition-all duration-300 rounded-2.5xl group-hover:rounded-b-none"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl text-lg lg:text-xl font-bold bg-gradient-to-br"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}10)`,
                          color: theme.primary,
                          boxShadow: `0 8px 25px ${theme.primary}30`,
                        }}
                      >
                        Q{index + 1}
                      </div>
                      <span
                        className="font-bold text-lg lg:text-xl leading-tight pr-2"
                        style={{ color: theme.text }}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center text-xl"
                      style={{ color: theme.primary }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </motion.button>

                  {/* Answer Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="px-7 lg:px-8 pb-7 lg:pb-8 pt-1 overflow-hidden"
                      >
                        <div
                          className="text-base lg:text-lg leading-relaxed pt-3 pr-16 lg:pr-20"
                          style={{ color: theme.muted }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
