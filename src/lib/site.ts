export const siteConfig = {
  name: "E. Harrington Appraisals Jewelry Studio",
  shortName: "E. Harrington Jewelry",
  tagline: "Delivering quality and service through the years...",
  description:
    "Shop exquisitely crafted engagement rings, necklaces, bracelets, and bespoke custom jewelry at E. Harrington Appraisals Jewelry Studio. Ethically sourced diamonds, timeless designs, and exceptional craftsmanship for life's most meaningful moments.",
  keywords: [
    "jewelry store",
    "engagement rings",
    "necklaces",
    "bracelets",
    "custom jewelry",
    "diamond rings",
    "fine jewelry",
    "E. Harrington",
    "jewelry studio",
    "bespoke jewelry",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eha-jewelry.com",
  email: "info@eha-jewelry.com",
  phone: "208 702 1387",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}
