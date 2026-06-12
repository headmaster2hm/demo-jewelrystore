"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/atelier/StatusBadge";
import { Payment, PaymentStatus } from "@/types/store";
import { formatPrice } from "@/data/products";

const statuses: PaymentStatus[] = ["pending", "paid", "refunded", "failed"];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/atelier/payments")
      .then((r) => r.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: PaymentStatus) {
    await fetch("/api/atelier/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  if (loading) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading payments...</div>;

  return (
    <div className="space-y-6">
      <p className="text-charcoal-500">
        {formatPrice(totalPaid)} collected · {formatPrice(totalPending)} pending
      </p>

      <div className="atelier-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Order</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Amount</th>
              <th className="text-left px-6 py-3">Method</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-charcoal-50/50">
                <td className="px-6 py-4 font-medium">{p.orderNumber}</td>
                <td className="px-6 py-4 text-charcoal-600">{p.customerName}</td>
                <td className="px-6 py-4 font-medium">{formatPrice(p.amount)}</td>
                <td className="px-6 py-4 capitalize">{p.method.replace("_", " ")}</td>
                <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                <td className="px-6 py-4 text-charcoal-500">
                  {p.paidAt
                    ? new Date(p.paidAt).toLocaleDateString()
                    : new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {statuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(p.id, s)}
                        className={`px-2 py-0.5 text-xs rounded border transition ${
                          p.status === s
                            ? "bg-charcoal-900 text-white border-charcoal-900"
                            : "border-charcoal-200 hover:border-gold-500"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="px-6 py-12 text-center text-charcoal-500">No payments recorded yet.</p>
        )}
      </div>
    </div>
  );
}
