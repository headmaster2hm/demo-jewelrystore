import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about E. Harrington Appraisals Jewelry Studio — exceptional craftsmanship, ethically sourced gemstones, and timeless jewelry designs trusted for generations.",
  openGraph: {
    title: `About Us | ${siteConfig.shortName}`,
    description:
      "Exceptional artistry, ethically sourced gemstones, and distinguished sophistication from E. Harrington Jewelry Studio.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-8 text-center">
        About Us
      </h1>

      <div className="relative aspect-[16/9] mb-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80"
          alt="Jewelry craftsmanship"
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="prose prose-lg max-w-none text-charcoal-600 space-y-6">
        <p className="text-xl font-serif text-charcoal-800 italic text-center">
          {siteConfig.tagline}
        </p>
        <p>
          E. Harrington Appraisals Jewelry Studio is a private jewelry atelier
          specializing in engagement rings, necklaces, bracelets, brooches, and
          bespoke custom designs. Each piece is crafted with exceptional artistry,
          ethically sourced gemstones, and precious metals.
        </p>
        <p>
          We believe that good design is always in season. From timeless solitaires
          to one-of-a-kind custom creations, our collection celebrates enduring
          love, refined beauty, and distinguished sophistication.
        </p>
        <p>
          Whether you are searching for the perfect engagement ring or a statement
          piece to treasure for generations, we invite you to explore our private
          online collection or contact us for a personal consultation.
        </p>
      </div>
    </div>
  );
}
