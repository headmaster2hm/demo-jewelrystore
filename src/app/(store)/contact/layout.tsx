import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact E. Harrington Appraisals Jewelry Studio for custom jewelry consultations, appointments, and inquiries. Call 208 702 1387 or email info@eha-jewelry.com.",
  openGraph: {
    title: `Contact Us | ${siteConfig.shortName}`,
    description:
      "Schedule a private viewing or ask about custom jewelry designs at E. Harrington Jewelry Studio.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
