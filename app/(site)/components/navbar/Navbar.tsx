"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import NavLinks from "./NavLinks";
import { CartBadge } from "./CartBadge";
import Image from "next/image";
import { useCartCount } from "@/app/providers/CartProvider";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Navbar() {
  const { brand } = useBrand();
  const { user, logout } = useAuth();
  const theme = brandTheme[brand];
  const cartCount = useCartCount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logo =
    brand === "ANTY_MAMA" ? `/anty_mama_logo.png` : "/nurse_cam_logo.png";

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b"
      style={{ borderColor: theme.border }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Logo" width={60} height={40} priority />
          <span className="text-xl font-bold" style={{ color: theme.primary }}>
            {brand === "ANTY_MAMA" ? "Anty Mama" : "Nurse Cam"}{" "}
            <span
              className="text-sm font-medium"
              style={{ color: theme.muted }}
            >
              LLC
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {/* Auth buttons / Profile (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition"
                  style={{
                    color: theme.primary,
                    border: `1px solid ${theme.primary}`,
                  }}
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition hover:opacity-90"
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.subtext,
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                className="p-2.5 rounded-xl transition"
                style={{ backgroundColor: `${theme.primary}12` }}
                title={user.name}
              >
                <FiUser size={22} style={{ color: theme.primary }} />
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" aria-label="Cart" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl transition"
              style={{
                backgroundColor: `${theme.primary}12`, // subtle brand bg
              }}
            >
              <FiShoppingCart size={22} style={{ color: theme.primary }} />
            </motion.div>

            <CartBadge count={cartCount} themeColor={theme.primary} />
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
            aria-label="Open menu"
          >
            <FiMenu size={24} style={{ color: theme.primary }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <span
                className="text-lg font-semibold"
                style={{ color: theme.text }}
              >
                Menu
              </span>

              <div className="flex items-center gap-4">
                {/* Cart */}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="relative"
                >
                  <FiShoppingCart size={22} style={{ color: theme.primary }} />
                  <CartBadge count={cartCount} themeColor={theme.primary} />
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  style={{ color: theme.primary }}
                >
                  <FiX size={26} />
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 px-6 py-10 flex flex-col justify-between">
              <NavLinks mobile />

              {/* Auth buttons / Profile (mobile) */}
              <div className="mt-10 space-y-4">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium border"
                      style={{
                        color: theme.primary,
                        borderColor: theme.primary,
                      }}
                    >
                      <FiUser size={16} />
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold transition hover:opacity-90"
                      style={{
                        backgroundColor: theme.primary,
                        color: theme.subtext,
                      }}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                      style={{
                        backgroundColor: `${theme.primary}12`,
                        color: theme.primary,
                      }}
                    >
                      <FiUser size={16} />
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="w-full py-3 rounded-xl text-sm font-semibold border"
                      style={{
                        borderColor: theme.primary,
                        color: theme.primary,
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
