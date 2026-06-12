"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Gem,
  Clock,
  TrendingUp,
} from "lucide-react";
import StatCard from "@/components/atelier/StatCard";
import StatusBadge from "@/components/atelier/StatusBadge";
import DashboardSkeleton from "@/components/atelier/DashboardSkeleton";
import { Order } from "@/types/store";
import { formatPrice } from "@/data/products";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingPayments: number;
  totalProducts: number;
  lowStock: number;
  recentOrders: Order[];
}

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/atelier/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gold-400 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="uppercase tracking-widest">Dashboard</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-2">Welcome back</h2>
          <p className="text-charcoal-300 max-w-xl">
            Here is a snapshot of your jewelry store — orders, customers, revenue, and inventory at a glance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={stats.totalOrders} icon={ShoppingBag} sub={`${stats.pendingOrders} pending`} />
        <StatCard label="Customers" value={stats.totalCustomers} icon={Users} />
        <StatCard label="Revenue" value={formatPrice(stats.totalRevenue)} icon={DollarSign} sub={`${stats.pendingPayments} unpaid`} />
        <StatCard label="Products" value={stats.totalProducts} icon={Gem} sub={`${stats.lowStock} out of stock`} />
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100 bg-charcoal-50/50">
          <h2 className="font-serif text-xl text-charcoal-900">Recent Orders</h2>
          <Link
            href="/atelier/orders"
            className="text-sm font-medium text-gold-600 hover:text-gold-700 no-underline"
          >
            View all →
          </Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ShoppingBag className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
            <p className="text-charcoal-500">No orders yet. They will appear here when customers checkout.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white text-charcoal-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Order</th>
                  <th className="text-left px-6 py-3 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 font-medium">Total</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gold-50/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-charcoal-900">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-charcoal-600">{order.customerName}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(order.subtotal)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-charcoal-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
