"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Products", href: "/products" },
  // { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { brand, setBrand } = useBrand();
  const theme = brandTheme[brand];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div
      className={clsx(
        mobile
          ? "flex flex-col items-start gap-6 text-xl"
          : "flex items-center gap-8"
      )}
    >
      {/* Brand Switch */}
      <Link
        href="/"
        onClick={() => setBrand("ANTY_MAMA")}
        className="font-semibold"
        style={{
          color: brand === "ANTY_MAMA" ? theme.primary : theme.text,
        }}
      >
        Anty Mama
      </Link>

      <Link
        href="/nurse-cam"
        onClick={() => setBrand("NURSE_CAM")}
        className="font-semibold"
        style={{
          color: brand === "NURSE_CAM" ? theme.primary : theme.text,
        }}
      >
        Nurse Cam
      </Link>

      {/* Divider (desktop only) */}
      {!mobile && <span className="h-5 w-px bg-gray-300" />}

      {/* Main Links */}
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-medium transition-colors"
          style={{
            color: isActive(item.href) ? theme.primary : theme.text,
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
