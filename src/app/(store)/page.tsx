import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/data/products";
import { getFeaturedProducts, getTrendingProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80"
          alt="Engagement ring collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="uppercase tracking-[0.4em] text-sm mb-4 text-gold-200">
            Exclusive Collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6">
            Engagement Rings
          </h1>
          <p className="max-w-xl mx-auto text-lg text-white/90 mb-8 font-light">
            Exquisitely crafted pieces featuring ethically sourced diamonds and
            timeless designs that celebrate enduring love.
          </p>
          <Link
            href="/shop?category=engagement-rings"
            className="inline-block px-10 py-4 border-2 border-white text-white uppercase tracking-widest text-sm hover:bg-white hover:text-charcoal-900 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Our Jewelry */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
            Our Jewelry
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto">
            Discover handcrafted pieces across our signature collections — each
            designed with exceptional artistry and refined beauty.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-charcoal-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Featured Pieces
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
            >
              View All Jewelry
            </Link>
          </div>
        </div>
      </section>

      {/* More Categories */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {categories.slice(3).map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Trending Collection */}
      <section className="py-16 md:py-24 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <p className="uppercase tracking-[0.3em] text-gold-400 text-sm mb-2">
              Our new custom made designs
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              New Trending Collection
            </h2>
            <p className="text-charcoal-300 italic font-serif text-xl">
              We Believe That Good Design is Always in Season
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-12">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Crafts */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 text-center mb-12">
          Our Crafts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {trending.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
