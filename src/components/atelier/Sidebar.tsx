"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  CreditCard,
  Gem,
  Settings,
  UserCog,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/atelier/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/atelier/orders", label: "Orders", icon: ShoppingBag },
  { href: "/atelier/customers", label: "Customers", icon: Users },
  { href: "/atelier/payments", label: "Payments", icon: CreditCard },
  { href: "/atelier/inventory", label: "Inventory", icon: Gem },
  { href: "/atelier/team", label: "Team", icon: UserCog },
  { href: "/atelier/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/atelier/auth/logout", { method: "POST" });
    router.push("/atelier");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-charcoal-900 text-charcoal-300 flex flex-col min-h-screen border-r border-charcoal-800 shadow-xl shadow-charcoal-900/20">
      <div className="p-6 border-b border-charcoal-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center">
            <Gem className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <p className="font-serif text-lg text-white leading-tight">Atelier</p>
            <p className="text-[10px] text-gold-400 uppercase tracking-[0.2em]">Studio Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 px-3 mb-3">
          Menu
        </p>
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${
                active
                  ? "bg-gold-600 text-white shadow-lg shadow-gold-600/25"
                  : "text-charcoal-400 hover:bg-charcoal-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-charcoal-800 space-y-1">
        <p className="text-xs text-charcoal-500 px-3 py-2 truncate">{userName}</p>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-charcoal-400 hover:bg-charcoal-800 hover:text-white transition no-underline"
        >
          <ExternalLink className="w-4 h-4" />
          View Store
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-charcoal-400 hover:bg-red-950/50 hover:text-red-400 transition w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
