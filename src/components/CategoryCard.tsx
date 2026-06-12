import Image from "next/image";
import Link from "next/link";
import { CategoryInfo } from "@/types";

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden mb-4">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />
        <h3 className="absolute bottom-6 left-6 right-6 font-serif text-2xl text-white">
          {category.name}
        </h3>
      </div>
      <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-3">
        {category.description}
      </p>
      <span className="inline-block mt-3 text-sm uppercase tracking-widest text-gold-600 group-hover:text-gold-700 transition">
        Shop Collection →
      </span>
    </Link>
  );
}
