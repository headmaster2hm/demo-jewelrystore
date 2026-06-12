import { Suspense } from "react";
import ShopContent from "./ShopContent";
import { getAllProducts } from "@/lib/products";

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading shop...</div>}>
      <ShopContent products={products} />
    </Suspense>
  );
}
