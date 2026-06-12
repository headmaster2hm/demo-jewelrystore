import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/data/products";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const description = product.shortDescription || product.description;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | ${siteConfig.shortName}`,
      description,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <nav className="text-sm text-charcoal-500 mb-8">
        <Link href="/" className="hover:text-gold-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-gold-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-4">
          <div className="relative aspect-square bg-charcoal-50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-charcoal-50 overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs text-gold-600 uppercase tracking-widest mb-2">{product.sku}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-charcoal-800 font-medium mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-charcoal-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <dl className="space-y-3 mb-8 text-sm border-t border-b border-charcoal-100 py-6">
            {product.metal && (
              <div className="flex justify-between">
                <dt className="text-charcoal-500">Metal</dt>
                <dd className="text-charcoal-900">{product.metal}</dd>
              </div>
            )}
            {product.gemstone && (
              <div className="flex justify-between">
                <dt className="text-charcoal-500">Gemstone</dt>
                <dd className="text-charcoal-900">{product.gemstone}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-charcoal-500">Availability</dt>
              <dd className={product.inStock ? "text-green-700" : "text-red-600"}>
                {product.inStock ? "In Stock" : "Sold Out"}
              </dd>
            </div>
          </dl>

          <AddToCartButton product={product} />

          <p className="text-sm text-charcoal-500 mt-6 text-center">
            Questions? Call us at{" "}
            <a href="tel:2087021387" className="text-gold-600 hover:underline">208 702 1387</a>
          </p>
        </div>
      </div>
    </div>
  );
}
