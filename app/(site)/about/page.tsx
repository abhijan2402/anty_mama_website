"use client";

import { motion } from "framer-motion";
import { FiShoppingCart, FiTruck, FiStar, FiUsers } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

const AboutAntyMama = () => {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-amber-100/40">
      {/* Hero + About Intro */}
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`inline-flex items-center px-6 py-3 mb-6 rounded-full text-white shadow-lg`}
              style={{ backgroundColor: theme.primary }}
            >
              <FiShoppingCart className="w-5 h-5 mr-2" />
              <span className="font-semibold tracking-wide">
                About Anty Mama
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-black bg-clip-text text-transparent mb-6"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.text})`,
              }}
            >
              Bringing Quality Home
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Anty Mama is a trusted Indian home and kitchen appliances brand,
              delivering premium-quality products designed to make your life
              easier and more efficient. From innovative kitchen tools to
              essential home solutions, we bring comfort, durability, and style
              into your home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core About Content */}
      {/* <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-1 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Who We Are
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At Anty Mama, we specialize in household and kitchen appliances
              built for durability and ease of use. Our products are designed
              with attention to detail and high-quality materials to ensure
              maximum performance for your daily needs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every product goes through strict quality control to ensure
              long-lasting reliability, helping you cook, clean, and organize
              with confidence.
            </p>
          </motion.div>

          
        </div>
      </section> */}

      {/* Simple CTA */}
      {/* <section
        className="py-16 text-white"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bring Anty Mama Home Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether you need premium kitchen tools or essential household
            products, Anty Mama has the perfect solution for your home.
          </p>
          <button className="px-10 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition">
            Explore Products
          </button>
        </div>
      </section> */}

      {/* Compact Stats */}
      <section className="py-14 bg-white/60">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <FiStar />, label: "Years Experience", value: "10+" },
            { icon: <FiUsers />, label: "Happy Customers", value: "50K+" },
            { icon: <FiTruck />, label: "Products Shipped", value: "200K+" },
            {
              icon: <FiShoppingCart />,
              label: "Products Available",
              value: "500+",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white shadow-md border">
              <div className="text-amber-600 mb-3 flex justify-center">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {item.value}
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutAntyMama;
