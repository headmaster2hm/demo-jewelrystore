import { Product, CategoryInfo } from "@/types";
import { categories as staticCategories, products as staticProducts } from "@/data/products";
import { getCatalog } from "@/lib/db";

export const categories: CategoryInfo[] = staticCategories;

export function getAllProducts(): Product[] {
  try {
    return getCatalog().products;
  } catch {
    return staticProducts;
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getTrendingProducts(): Product[] {
  return getAllProducts().filter((p) => p.trending);
}

export { formatPrice } from "@/data/products";
