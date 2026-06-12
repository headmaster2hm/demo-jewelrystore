import type { Metadata } from "next";
import { Suspense } from "react";
import ShopContent from "./ShopContent";
import { getAllProducts } from "@/lib/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop All Jewelry",
  description:
    "Browse engagement rings, necklaces, bracelets, and custom jewelry. Handcrafted pieces with ethically sourced gemstones and precious metals.",
  openGraph: {
    title: `Shop All Jewelry | ${siteConfig.shortName}`,
    description:
      "Browse engagement rings, necklaces, bracelets, and bespoke designs at E. Harrington Jewelry.",
    images: [{ url: absoluteUrl(siteConfig.ogImage), width: 1200, height: 630, type: "image/jpeg" }],
  },
};

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading shop...</div>}>
      <ShopContent products={products} />
    </Suspense>
  );
}
