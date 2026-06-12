"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Customer } from "@/types/store";
import { formatPrice } from "@/data/products";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/atelier/customers")
      .then((r) => r.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/atelier/customers", {
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
        newsletter: fd.get("newsletter") === "on",
      }),
    });
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this customer?")) return;
    await fetch(`/api/atelier/customers?id=${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading customers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-charcoal-500">{customers.length} registered customers</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="atelier-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="atelier-card p-6 grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Full name" className="atelier-input" />
          <input name="email" required type="email" placeholder="Email" className="atelier-input" />
          <input name="phone" placeholder="Phone" className="atelier-input" />
          <input name="address" placeholder="Address" className="atelier-input" />
          <input name="city" placeholder="City" className="atelier-input" />
          <input name="zip" placeholder="ZIP" className="atelier-input" />
          <textarea name="notes" placeholder="Notes" rows={2} className="md:col-span-2 atelier-input resize-none" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="newsletter" />
            Newsletter subscriber
          </label>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="atelier-btn-primary">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="atelier-btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      <div className="atelier-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Contact</th>
              <th className="text-left px-6 py-3">Orders</th>
              <th className="text-left px-6 py-3">Spent</th>
              <th className="text-left px-6 py-3">Joined</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-charcoal-50/50">
                <td className="px-6 py-4 font-medium text-charcoal-900">{c.name}</td>
                <td className="px-6 py-4 text-charcoal-600">
                  <div>{c.email}</div>
                  <div className="text-charcoal-400">{c.phone}</div>
                </td>
                <td className="px-6 py-4">{c.orderCount}</td>
                <td className="px-6 py-4">{formatPrice(c.totalSpent)}</td>
                <td className="px-6 py-4 text-charcoal-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(c.id)} className="text-charcoal-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="px-6 py-12 text-center text-charcoal-500">No customers yet.</p>
        )}
      </div>
    </div>
  );
}
