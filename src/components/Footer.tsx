import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-charcoal-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-xl text-white mb-4">About E. Harrington</h3>
          <p className="text-sm leading-relaxed mb-4">
            E. Harrington Appraisals Jewelry Studio — crafting exceptional pieces
            with timeless elegance and distinguished sophistication.
          </p>
          <div className="space-y-1 text-sm">
            <p>Tel: <a href="tel:2087021387" className="hover:text-gold-400 transition">208 702 1387</a></p>
            <p>Phone: <a href="tel:3036228862" className="hover:text-gold-400 transition">303 622 8862</a></p>
            <p>Email: <a href="mailto:info@eha-jewelry.com" className="hover:text-gold-400 transition">info@eha-jewelry.com</a></p>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-white mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-gold-400 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400 transition">Contact</Link></li>
            <li><Link href="/shop" className="hover:text-gold-400 transition">Shop</Link></li>
            <li><Link href="/shop?category=custom" className="hover:text-gold-400 transition">Custom Designs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-white mb-4">Our Jewelry</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop?category=engagement-rings" className="hover:text-gold-400 transition">Engagement Rings</Link></li>
            <li><Link href="/shop?category=necklaces" className="hover:text-gold-400 transition">Necklaces</Link></li>
            <li><Link href="/shop?category=bracelets" className="hover:text-gold-400 transition">Bracelets</Link></li>
            <li><Link href="/shop?category=brooches" className="hover:text-gold-400 transition">Brooches</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-800 py-6 text-center text-sm text-charcoal-500">
        © {new Date().getFullYear()} E. Harrington Appraisals Jewelry Studio.
      </div>
    </footer>
  );
}
