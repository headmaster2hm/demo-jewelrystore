import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import {
  Customer,
  Order,
  Payment,
  ProductCatalog,
  StaffUser,
  StoreSettings,
} from "@/types/store";
import { products as defaultProducts } from "@/data/products";
import { hashPassword } from "@/lib/password";

const STORE_DIR = join(process.cwd(), "data", "store");

function ensureStoreDir() {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function readJson<T>(filename: string, fallback: T): T {
  ensureStoreDir();
  const filepath = join(STORE_DIR, filename);
  if (!existsSync(filepath)) {
    writeJson(filename, fallback);
    return fallback;
  }
  try {
    return JSON.parse(readFileSync(filepath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(filename: string, data: T): void {
  ensureStoreDir();
  writeFileSync(join(STORE_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}

const defaultSettings: StoreSettings = {
  storeName: "E. Harrington Appraisals Jewelry Studio",
  tagline: "Delivering quality and service through the years...",
  email: "info@eha-jewelry.com",
  phonePrimary: "208 702 1387",
  phoneSecondary: "303 622 8862",
  promoBanner: "Exclusive offer — 10% off this week",
  promoEnabled: true,
  currency: "USD",
  taxRate: 0,
  shippingNote: "Shipping calculated after order confirmation.",
  appointmentOnly: true,
};

function getDefaultStaff(): StaffUser[] {
  const password = process.env.ATELIER_PASSWORD || "changeme123";
  return [
    {
      id: "staff-1",
      name: "Studio Owner",
      email: process.env.ATELIER_EMAIL || "owner@eha-jewelry.com",
      passwordHash: hashPassword(password),
      role: "owner",
      active: true,
      createdAt: new Date().toISOString(),
    },
  ];
}

export function getSettings(): StoreSettings {
  return readJson("settings.json", defaultSettings);
}

export function saveSettings(settings: StoreSettings): StoreSettings {
  writeJson("settings.json", settings);
  return settings;
}

export function getStaff(): StaffUser[] {
  return readJson("staff.json", getDefaultStaff());
}

export function saveStaff(staff: StaffUser[]): StaffUser[] {
  writeJson("staff.json", staff);
  return staff;
}

export function getCustomers(): Customer[] {
  return readJson<Customer[]>("customers.json", []);
}

export function saveCustomers(customers: Customer[]): Customer[] {
  writeJson("customers.json", customers);
  return customers;
}

export function getOrders(): Order[] {
  return readJson<Order[]>("orders.json", []);
}

export function saveOrders(orders: Order[]): Order[] {
  writeJson("orders.json", orders);
  return orders;
}

export function getPayments(): Payment[] {
  return readJson<Payment[]>("payments.json", []);
}

export function savePayments(payments: Payment[]): Payment[] {
  writeJson("payments.json", payments);
  return payments;
}

export function getCatalog(): ProductCatalog {
  return readJson<ProductCatalog>("products.json", { products: defaultProducts });
}

export function saveCatalog(catalog: ProductCatalog): ProductCatalog {
  writeJson("products.json", catalog);
  return catalog;
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateOrderNumber(): string {
  const orders = getOrders();
  const num = orders.length + 1001;
  return `EHA-${num}`;
}
