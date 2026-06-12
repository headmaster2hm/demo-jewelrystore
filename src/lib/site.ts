function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://hm-demo-jewelrystore.vercel.app";
}

/** Public CDN image — social crawlers must fetch without auth (Vercel protection blocks self-hosted files). */
export const OG_IMAGE_URL =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=630&fit=crop&q=85";

export const siteConfig = {
  name: "E. Harrington Appraisals Jewelry Studio",
  shortName: "E. Harrington Jewelry",
  tagline: "Delivering quality and service through the years...",
  description:
    "Shop engagement rings, necklaces, bracelets & custom jewelry at E. Harrington. Ethically sourced diamonds and timeless designs for life's special moments.",
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
  get url() {
    return getSiteUrl();
  },
  ogImage: OG_IMAGE_URL,
  email: "info@eha-jewelry.com",
  phone: "208 702 1387",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "") {
  const base = getSiteUrl();
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}
