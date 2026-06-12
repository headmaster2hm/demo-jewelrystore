"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=engagement-rings", label: "Engagement Rings" },
  { href: "/shop?category=necklaces", label: "Necklaces" },
  { href: "/shop?category=bracelets", label: "Bracelets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <div className="bg-charcoal-900 text-white text-center py-2 text-sm tracking-widest uppercase">
        Exclusive offer — 10% off this week
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-charcoal-100">
        <div className="hidden md:flex justify-between items-center px-6 py-2 text-sm text-charcoal-600 border-b border-charcoal-50">
          <p className="italic font-serif text-charcoal-800">
            Delivering quality and service through the years...
          </p>
          <div className="flex items-center gap-6">
            <a href="tel:2087021387" className="flex items-center gap-1.5 hover:text-gold-600 transition">
              <Phone className="w-3.5 h-3.5" />
              208 702 1387
            </a>
            <a href="tel:3036228862" className="flex items-center gap-1.5 hover:text-gold-600 transition">
              <Phone className="w-3.5 h-3.5" />
              303 622 8862
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-serif text-2xl md:text-3xl text-charcoal-900 tracking-wide">
            E. Harrington
            <span className="block text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-gold-600 -mt-1">
              Jewelry Studio
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider text-charcoal-700 hover:text-gold-600 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-charcoal-800 hover:text-gold-600 transition"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 text-charcoal-800"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-charcoal-100 bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm uppercase tracking-wider text-charcoal-700 hover:text-gold-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
