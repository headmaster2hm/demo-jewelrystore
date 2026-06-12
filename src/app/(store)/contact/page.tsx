"use client";

import { FormEvent, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-charcoal-600 text-center mb-12 max-w-xl mx-auto">
        Have questions about a piece or interested in a custom design? We would love
        to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-gold-600 mt-1" />
            <div>
              <h3 className="font-medium text-charcoal-900 mb-1">Phone</h3>
              <a href="tel:2087021387" className="block text-charcoal-600 hover:text-gold-600">208 702 1387</a>
              <a href="tel:3036228862" className="block text-charcoal-600 hover:text-gold-600">303 622 8862</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-gold-600 mt-1" />
            <div>
              <h3 className="font-medium text-charcoal-900 mb-1">Email</h3>
              <a href="mailto:info@eha-jewelry.com" className="text-charcoal-600 hover:text-gold-600">
                info@eha-jewelry.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-gold-600 mt-1" />
            <div>
              <h3 className="font-medium text-charcoal-900 mb-1">Private Studio</h3>
              <p className="text-charcoal-600">
                By appointment only. Contact us to schedule a private viewing.
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-gold-50 p-8 text-center">
            <p className="text-gold-800 font-medium">
              Thank you for your message. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-charcoal-600 mb-1">Name</label>
              <input
                required
                className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-charcoal-600 mb-1">Email</label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-charcoal-600 mb-1">Message</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 border border-charcoal-200 focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-charcoal-900 text-white uppercase tracking-widest text-sm hover:bg-gold-600 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
