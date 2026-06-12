"use client";

import { usePathname } from "next/navigation";
import { Bell, Gem } from "lucide-react";

const titles: Record<string, string> = {
  "/atelier/overview": "Overview",
  "/atelier/orders": "Orders",
  "/atelier/customers": "Customers",
  "/atelier/payments": "Payments",
  "/atelier/inventory": "Inventory",
  "/atelier/team": "Team",
  "/atelier/settings": "Settings",
};

export default function PortalHeader({
  userName,
  userRole,
}: {
  userName: string;
  userRole: string;
}) {
  const pathname = usePathname();
  const title = titles[pathname] || "Studio Console";

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-charcoal-100 px-6 md:px-8 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-gold-600 mb-0.5">
          E. Harrington
        </p>
        <h1 className="font-serif text-2xl text-charcoal-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative p-2 rounded-lg text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-800 transition"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-charcoal-100">
          <div className="w-9 h-9 rounded-full bg-charcoal-900 flex items-center justify-center">
            <Gem className="w-4 h-4 text-gold-400" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-charcoal-900 leading-tight">{userName}</p>
            <p className="text-xs text-charcoal-500 capitalize">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
