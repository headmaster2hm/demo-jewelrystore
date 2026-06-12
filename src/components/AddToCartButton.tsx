"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </>
      )}
    </button>
  );
}
