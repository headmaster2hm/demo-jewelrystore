"use client";

import { FormEvent, useEffect, useState } from "react";
import { StoreSettings } from "@/types/store";

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/atelier/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!settings) return;

    const res = await fetch("/api/atelier/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (loading || !settings) return <div className="atelier-card p-12 text-center text-charcoal-500">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <p className="text-charcoal-500">Configure your store details and preferences</p>

      <form onSubmit={handleSubmit} className="atelier-card p-6 md:p-8 space-y-6 max-w-2xl">
        {saved && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">Settings saved successfully.</div>
        )}

        <div>
          <label className="block text-sm text-charcoal-600 mb-1">Store Name</label>
          <input
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="atelier-input"
          />
        </div>

        <div>
          <label className="block text-sm text-charcoal-600 mb-1">Tagline</label>
          <input
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="atelier-input"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="atelier-input"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Currency</label>
            <input
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="atelier-input"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Primary Phone</label>
            <input
              value={settings.phonePrimary}
              onChange={(e) => setSettings({ ...settings, phonePrimary: e.target.value })}
              className="atelier-input"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-600 mb-1">Secondary Phone</label>
            <input
              value={settings.phoneSecondary}
              onChange={(e) => setSettings({ ...settings, phoneSecondary: e.target.value })}
              className="atelier-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-charcoal-600 mb-1">Promo Banner Text</label>
          <input
            value={settings.promoBanner}
            onChange={(e) => setSettings({ ...settings, promoBanner: e.target.value })}
            className="atelier-input"
          />
        </div>

        <div>
          <label className="block text-sm text-charcoal-600 mb-1">Shipping Note</label>
          <textarea
            value={settings.shippingNote}
            onChange={(e) => setSettings({ ...settings, shippingNote: e.target.value })}
            rows={2}
            className="atelier-input resize-none"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.promoEnabled}
              onChange={(e) => setSettings({ ...settings, promoEnabled: e.target.checked })}
            />
            Show promo banner
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.appointmentOnly}
              onChange={(e) => setSettings({ ...settings, appointmentOnly: e.target.checked })}
            />
            Appointment-only studio
          </label>
        </div>

        <button
          type="submit"
          className="atelier-btn-primary uppercase tracking-widest"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
