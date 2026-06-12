"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal-900 mb-4">Your Cart</h1>
        <p className="text-charcoal-600 mb-8">Your cart is empty.</p>
        <Link
          href="/shop"
          className="inline-block px-10 py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-charcoal-900 mb-10">Your Cart</h1>

      <div className="space-y-6 mb-10">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex gap-4 md:gap-6 border-b border-charcoal-100 pb-6"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-charcoal-50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${product.slug}`}
                className="font-serif text-lg text-charcoal-900 hover:text-gold-700 transition"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gold-600 mt-0.5">{product.sku}</p>
              <p className="text-charcoal-800 font-medium mt-1">
                {formatPrice(product.price)}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-1 border border-charcoal-200 hover:border-gold-500 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-1 border border-charcoal-200 hover:border-gold-500"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeItem(product.id)}
                  className="ml-auto p-1 text-charcoal-400 hover:text-red-600 transition"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="hidden md:block font-medium text-charcoal-900">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-charcoal-200 pt-6">
        <div className="flex justify-between text-lg mb-6">
          <span className="text-charcoal-600">Subtotal</span>
          <span className="font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-sm text-charcoal-500 mb-6">
          Shipping and taxes calculated at checkout. This is a private store — orders are confirmed by phone or email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/checkout"
            className="flex-1 text-center py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="flex-1 text-center py-4 border border-charcoal-900 text-charcoal-900 uppercase tracking-widest text-sm hover:bg-charcoal-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
