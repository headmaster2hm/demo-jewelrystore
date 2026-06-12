import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/shop?category=engagement-rings"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/shop?category=necklaces"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/shop?category=bracelets"), changeFrequency: "weekly", priority: 0.8 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/product/${product.slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
