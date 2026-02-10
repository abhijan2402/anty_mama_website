"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export default function ContactPage() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="pt-28 pb-16 bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Contact Anty Mama
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a requirement, feedback, or need a quotation? Reach out to us
            and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow border"
          >
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: theme.text }}
            >
              Send us a message
            </h2>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[${theme.primary}]`}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[${theme.primary}]`}
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[${theme.primary}]`}
              />

              <textarea
                rows={5}
                placeholder="Tell us about your requirement"
                className={`w-full px-4 py-3 border border-gray-300 text-gray-800 outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[${theme.primary}] resize-none`}
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold transition"
                style={{ backgroundColor: theme.primary, color: theme.subtext }}
              >
                Submit Enquiry
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: theme.text }}
              >
                Anty Mama
              </h2>
              <p className="text-gray-600">
                Premium kitchen & home appliances designed for convenience,
                safety, and durability.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border">
                <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600 text-sm">
                    Industrial Area, Jaipur, Rajasthan – 302001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border">
                <Phone className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600 text-sm">+91 98765 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border">
                <Mail className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600 text-sm">hello@antymama.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
