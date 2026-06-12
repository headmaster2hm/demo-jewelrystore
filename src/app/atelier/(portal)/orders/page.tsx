"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/atelier/StatusBadge";
import { Order, OrderStatus } from "@/types/store";
import { formatPrice } from "@/data/products";

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/atelier/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    await fetch("/api/atelier/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  if (loading) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <p className="text-charcoal-500">{orders.length} total orders</p>

      <div className="atelier-card overflow-hidden">
        {orders.length === 0 ? (
          <p className="px-6 py-12 text-center text-charcoal-500">No orders yet.</p>
        ) : (
          <div className="divide-y divide-charcoal-100">
            {orders.map((order) => (
              <div key={order.id}>
                <button
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  className="w-full flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-charcoal-50/50 text-left"
                >
                  <span className="font-medium text-charcoal-900 w-28">{order.orderNumber}</span>
                  <span className="text-charcoal-600 flex-1 min-w-[120px]">{order.customerName}</span>
                  <span className="font-medium">{formatPrice(order.subtotal)}</span>
                  <StatusBadge status={order.status} />
                  <StatusBadge status={order.paymentStatus} />
                  <span className="text-charcoal-400 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </button>

                {expanded === order.id && (
                  <div className="px-6 pb-6 bg-charcoal-50/50">
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div className="text-sm space-y-1">
                        <p><strong>Email:</strong> {order.customerEmail}</p>
                        <p><strong>Phone:</strong> {order.customerPhone}</p>
                        <p><strong>Address:</strong> {order.shippingAddress}, {order.shippingCity} {order.shippingZip}</p>
                        {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Update Status</p>
                        <div className="flex flex-wrap gap-2">
                          {statuses.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(order.id, s)}
                              className={`px-3 py-1 text-xs rounded-full border transition ${
                                order.status === s
                                  ? "bg-charcoal-900 text-white border-charcoal-900"
                                  : "border-charcoal-200 hover:border-gold-500"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-charcoal-500 text-xs uppercase">
                          <th className="text-left py-2">Item</th>
                          <th className="text-left py-2">SKU</th>
                          <th className="text-right py-2">Qty</th>
                          <th className="text-right py-2">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={i} className="border-t border-charcoal-100">
                            <td className="py-2">{item.name}</td>
                            <td className="py-2 text-charcoal-500">{item.sku}</td>
                            <td className="py-2 text-right">{item.quantity}</td>
                            <td className="py-2 text-right">{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
