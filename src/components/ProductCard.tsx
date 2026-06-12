import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal-50 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-charcoal-900 text-white text-xs px-2 py-1 uppercase tracking-wider">
            Sold Out
          </span>
        )}
      </div>
      <p className="text-xs text-gold-600 uppercase tracking-widest mb-1">{product.sku}</p>
      <h3 className="font-serif text-lg text-charcoal-900 group-hover:text-gold-700 transition mb-1">
        {product.name}
      </h3>
      <p className="text-charcoal-600 font-medium">{formatPrice(product.price)}</p>
    </Link>
  );
}
