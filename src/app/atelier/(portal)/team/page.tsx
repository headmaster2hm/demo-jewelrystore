"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import StatusBadge from "@/components/atelier/StatusBadge";
import { StaffRole } from "@/types/store";

interface StaffSafe {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  active: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export default function TeamPage() {
  const [staff, setStaff] = useState<StaffSafe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/atelier/staff")
      .then((r) => r.json())
      .then((data) => {
        setStaff(data);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/atelier/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
        role: fd.get("role"),
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to add team member");
      return;
    }
    setShowForm(false);
    load();
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch("/api/atelier/staff", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this team member?")) return;
    const res = await fetch(`/api/atelier/staff?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to remove");
    }
    load();
  }

  if (loading) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading team...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-charcoal-500">Manage staff access to the studio console</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="atelier-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="atelier-card p-6 grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Full name" className="atelier-input" />
          <input name="email" required type="email" placeholder="Email" className="atelier-input" />
          <input name="password" required type="password" placeholder="Password" className="atelier-input" />
          <select name="role" className="atelier-input">
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="owner">Owner</option>
          </select>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="atelier-btn-primary">Add Member</button>
            <button type="button" onClick={() => setShowForm(false)} className="atelier-btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      <div className="atelier-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Last Login</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-charcoal-50/50">
                <td className="px-6 py-4 font-medium text-charcoal-900">{s.name}</td>
                <td className="px-6 py-4 text-charcoal-600">{s.email}</td>
                <td className="px-6 py-4"><StatusBadge status={s.role} /></td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActive(s.id, s.active)}>
                    <StatusBadge status={s.active ? "active" : "inactive"} />
                  </button>
                </td>
                <td className="px-6 py-4 text-charcoal-500">
                  {s.lastLoginAt ? new Date(s.lastLoginAt).toLocaleString() : "Never"}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(s.id)} className="text-charcoal-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
