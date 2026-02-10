"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FiLoader, FiAlertCircle } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  image: string;
  categoryId: string;
  categoryName: string;
  price: number | null;
}

interface Category {
  id: string;
  name: string;
  image: string;
  status: boolean;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch categories and products on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setCategories([]);
        setProducts([]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openCategory = (category: Category) => {
    setActiveCategory(category);
    setSearchTerm(""); // reset search when opening a category
  };

  const closeCategory = () => {
    setActiveCategory(null);
    setSearchTerm("");
  };

  // Filter products for active category
  const filteredProducts = activeCategory
    ? products
        .filter((p) => p.categoryId === activeCategory.id)
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // --- Loading / Empty states ---
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4">
        <FiLoader className="animate-spin text-5xl text-amber-600" />
        <p className="text-lg text-gray-700">
          Loading categories & products...
        </p>
      </div>
    );

  if (!loading && categories.length === 0)
    return (
      <div>
        <section className="py-10 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-gray-900 to-amber-900 bg-clip-text text-transparent mb-6"
            >
              Shop by Category
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto"
            >
              Discover premium textiles with custom printing options
            </motion.p>
          </div>
        </section>
        <div className="flex flex-col items-center justify-center py-10 h-[40vh] space-y-4">
          <FiAlertCircle className="text-5xl text-red-500" />
          <p className="text-lg text-gray-700">
            No categories available at the moment.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-gray-900 to-amber-900 bg-clip-text text-transparent mb-6"
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto"
          >
            Discover premium textiles with custom printing options
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer"
                onClick={() => openCategory(category)}
              >
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={category.image || "/p1.jpg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-amber-400 font-semibold">
                      Explore Collection
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Products Modal */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={closeCategory}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-3xl max-w-6xl max-h-[90vh] w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header + Search */}
              <div className="p-8 border-b border-gray-100 bg-linear-to-r from-slate-50 to-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#552C1F]">
                      {activeCategory.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {filteredProducts.length} Products
                    </p>
                  </div>
                  <button
                    onClick={closeCategory}
                    className="p-3 rounded-2xl hover:bg-gray-800 bg-[#552C1F] transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Internal Search */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none text-gray-700"
                />
              </div>

              {/* Products Grid */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <FiAlertCircle className="text-5xl text-red-500" />
                    <p className="text-lg text-gray-700">No products found.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <Link href={`/products/${product.id}`} key={product.id}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="group bg-gray-50/50 rounded-2xl p-6 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 overflow-hidden"
                        >
                          <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                            <Image
                              src={product.image || "/p1.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h4 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-2xl font-bold text-amber-600 mb-3">
                            ${product.price}
                          </p>
                          <div className="flex items-center text-sm text-amber-600 font-semibold">
                            View Product
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
