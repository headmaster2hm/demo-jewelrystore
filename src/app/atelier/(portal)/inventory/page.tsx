"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/data/products";
import StatusBadge from "@/components/atelier/StatusBadge";

const categories = [
  "engagement-rings",
  "necklaces",
  "bracelets",
  "brooches",
  "custom",
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/atelier/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      id: editing?.id,
      sku: fd.get("sku"),
      name: fd.get("name"),
      slug: (fd.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      category: fd.get("category"),
      price: Number(fd.get("price")),
      description: fd.get("description"),
      shortDescription: (fd.get("description") as string)?.slice(0, 120),
      image: fd.get("image"),
      images: [fd.get("image")],
      metal: fd.get("metal"),
      gemstone: fd.get("gemstone"),
      featured: fd.get("featured") === "on",
      trending: fd.get("trending") === "on",
      inStock: fd.get("inStock") === "on",
    };

    await fetch("/api/atelier/products", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setShowForm(false);
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/atelier/products?id=${id}`, { method: "DELETE" });
    load();
  }

  function startEdit(product: Product) {
    setEditing(product);
    setShowForm(true);
  }

  if (loading) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-charcoal-500">{products.length} products in catalog</p>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="atelier-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="atelier-card p-6 grid md:grid-cols-2 gap-4">
          <input name="sku" required defaultValue={editing?.sku} placeholder="SKU (e.g. AGJS-RG-00412)" className="atelier-input" />
          <input name="name" required defaultValue={editing?.name} placeholder="Product name" className="atelier-input" />
          <select name="category" required defaultValue={editing?.category} className="atelier-input">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input name="price" required type="number" defaultValue={editing?.price} placeholder="Price" className="atelier-input" />
          <input name="image" required defaultValue={editing?.image} placeholder="Image URL" className="md:col-span-2 atelier-input" />
          <input name="metal" defaultValue={editing?.metal} placeholder="Metal" className="atelier-input" />
          <input name="gemstone" defaultValue={editing?.gemstone} placeholder="Gemstone" className="atelier-input" />
          <textarea name="description" required defaultValue={editing?.description} placeholder="Description" rows={3} className="md:col-span-2 atelier-input resize-none" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={editing?.featured} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="trending" defaultChecked={editing?.trending} /> Trending</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="inStock" defaultChecked={editing?.inStock ?? true} /> In Stock</label>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="atelier-btn-primary">{editing ? "Update" : "Add"} Product</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="atelier-btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      <div className="atelier-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">SKU</th>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Stock</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-charcoal-50/50">
                <td className="px-6 py-4 text-gold-600">{p.sku}</td>
                <td className="px-6 py-4 font-medium text-charcoal-900">{p.name}</td>
                <td className="px-6 py-4 capitalize">{p.category.replace("-", " ")}</td>
                <td className="px-6 py-4">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={p.inStock ? "active" : "inactive"} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => startEdit(p)} className="text-charcoal-400 hover:text-gold-600"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-charcoal-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
