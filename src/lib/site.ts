function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://eha-jewelry.com";
}

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
  ogImage: "/og-image.jpg",
  email: "info@eha-jewelry.com",
  phone: "208 702 1387",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "") {
  const base = getSiteUrl();
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}
