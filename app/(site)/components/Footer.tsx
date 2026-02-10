"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export default function Footer() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  return (
    <footer
      className="w-full text-white"
      style={{ backgroundColor: theme.primary }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/anty_logo.png"
              alt="Anty Mama Logo"
              width={48}
              height={56}
              priority
            />
            <h3 className="text-2xl font-semibold">
              {brand === "ANTY_MAMA" ? "Anty Mama" : "Nurse Cam"}
            </h3>
          </div>

          <p className="text-sm leading-7 text-white/80">
            Anty Mama LLC delivers trusted healthcare and lifestyle products
            globally with a focus on quality, safety, and care.
          </p>

          <div className="flex gap-4 mt-8">
            <SocialIcon>
              <Facebook size={18} />
            </SocialIcon>
            <SocialIcon>
              <Twitter size={18} />
            </SocialIcon>
            <SocialIcon>
              <Instagram size={18} />
            </SocialIcon>
            <SocialIcon>
              <Youtube size={18} />
            </SocialIcon>
          </div>
        </div>

        {/* Company */}
        <FooterColumn title="Company">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          {/* <FooterLink href="/careers">Careers</FooterLink> */}
          {/* <FooterLink href="/blog">Blog</FooterLink> */}
        </FooterColumn>

        {/* Products */}
        <FooterColumn title="Products">
          <FooterLink href="/products">All Products</FooterLink>
          {/* <FooterLink href="/categories">Categories</FooterLink> */}
          <FooterLink href="/best-sellers">Best Sellers</FooterLink>
          <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
        </FooterColumn>

        {/* Legal */}
        <FooterColumn title="Legal">
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-conditions">Terms & Conditions</FooterLink>
          {/* <FooterLink href="/refund-policy">Refund Policy</FooterLink> */}
          {/* <FooterLink href="/shipping-policy">Shipping Policy</FooterLink> */}
        </FooterColumn>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <span>
            © {new Date().getFullYear()} Anty Mama LLC. All rights reserved.
          </span>
          <span>Designed for global customers 🌍</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Small Components ---------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-6">{title}</h4>
      <ul className="space-y-4 text-sm text-white/80">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition cursor-pointer">
      {children}
    </div>
  );
}
