"use client";

import { motion } from "framer-motion";
import { FiShoppingCart, FiTruck, FiStar, FiUsers } from "react-icons/fi";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { useGetCMSPageQuery } from "@/lib/api/cmsApi";

const AboutAntyMama = () => {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  const pageKey = "aboutUs";

  const { data, isLoading, isError } = useGetCMSPageQuery(pageKey, {
    skip: !pageKey,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white ">
      {/* ================= HERO + INTRO ================= */}
      <section className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center px-6 py-3 mb-6 rounded-full text-white shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              <FiShoppingCart className="w-5 h-5 mr-2" />
              <span className="font-semibold tracking-wide">
                About Anty Mama
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-black bg-clip-text text-transparent mb-10"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.text})`,
              }}
            >
              Bringing Quality Home
            </h1>

            {/* ================= CONTENT STATES ================= */}

            {isLoading && (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
              </div>
            )}

            {isError && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
                Failed to load content. Please try again later.
              </div>
            )}

            {!isLoading && !isError && data?.content && (
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}

            {!isLoading && !isError && !data?.content && (
              <div className="text-gray-500 italic">Content coming soon...</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
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
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white shadow-md border border-gray-100 transition-all"
            >
              <div
                className="mb-3 flex justify-center"
                style={{ color: theme.primary }}
              >
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {item.value}
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutAntyMama;
