"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal-900 mb-4">Checkout</h1>
        <p className="text-charcoal-600 mb-8">Your cart is empty.</p>
        <Link
          href="/shop"
          className="inline-block px-10 py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
        >
          Shop Jewelry
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          address: fd.get("address"),
          city: fd.get("city"),
          zip: fd.get("zip"),
          notes: fd.get("notes"),
          items,
          subtotal,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      setOrderNumber(data.orderNumber);
      setSubmitted(true);
      clearCart();
    } catch {
      setError("Could not place order. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal-900 mb-4">Thank You</h1>
        {orderNumber && (
          <p className="text-gold-600 font-medium mb-2">Order {orderNumber}</p>
        )}
        <p className="text-charcoal-600 mb-4">
          Your order request has been received. We will contact you shortly to confirm
          details and arrange payment.
        </p>
        <p className="text-sm text-charcoal-500 mb-8">
          For immediate assistance, call{" "}
          <a href="tel:2087021387" className="text-gold-600">208 702 1387</a>
        </p>
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
      <h1 className="font-serif text-4xl text-charcoal-900 mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-serif text-xl text-charcoal-900 mb-4">Contact Information</h2>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Full Name</label>
            <input
              required
              name="name"
              className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Phone</label>
            <input
              required
              type="tel"
              name="phone"
              className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
            />
          </div>

          <h2 className="font-serif text-xl text-charcoal-900 mb-4 pt-4">Shipping Address</h2>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Address</label>
            <input
              required
              name="address"
              className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-charcoal-600 mb-1">City</label>
              <input
                required
                name="city"
                className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-charcoal-600 mb-1">ZIP Code</label>
              <input
                required
                name="zip"
                className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Order Notes (optional)</label>
            <textarea
              name="notes"
              rows={3}
              className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500 resize-none"
              placeholder="Ring size, engraving, special requests..."
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition mt-4 disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : "Place Order Request"}
          </button>
          <p className="text-xs text-charcoal-500 text-center">
            Payment will be arranged after we confirm your order by phone or email.
          </p>
        </form>

        <div className="bg-charcoal-50 p-6 md:p-8 h-fit">
          <h2 className="font-serif text-xl text-charcoal-900 mb-6">Order Summary</h2>
          <ul className="space-y-4 mb-6">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between text-sm">
                <span className="text-charcoal-700">
                  {product.name} × {quantity}
                </span>
                <span className="text-charcoal-900 font-medium">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-charcoal-200 pt-4 flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
