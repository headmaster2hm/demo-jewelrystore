"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { Product } from "@/types";
import Link from "next/link";

export default function ShopContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
          {activeCategory ? activeCategory.name : "Shop All Jewelry"}
        </h1>
        {activeCategory && (
          <p className="text-charcoal-600 max-w-2xl mx-auto">
            {activeCategory.description}
          </p>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        <Link
          href="/shop"
          className={`px-4 py-2 text-sm uppercase tracking-wider border transition ${
            !category
              ? "bg-charcoal-900 text-white border-charcoal-900"
              : "border-charcoal-200 text-charcoal-700 hover:border-gold-500"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className={`px-4 py-2 text-sm uppercase tracking-wider border transition ${
              category === cat.slug
                ? "bg-charcoal-900 text-white border-charcoal-900"
                : "border-charcoal-200 text-charcoal-700 hover:border-gold-500"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-charcoal-600 py-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
