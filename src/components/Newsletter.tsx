"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="bg-gold-50 py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-3">
          Our Newsletter
        </h2>
        <p className="text-charcoal-600 mb-8">
          Get email updates about our latest shop and special offers.
        </p>
        {submitted ? (
          <p className="text-gold-700 font-medium">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-charcoal-200 bg-white text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
