import { Product } from "@/types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export type PaymentMethod = "phone" | "bank_transfer" | "card" | "cash" | "other";

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  notes?: string;
  newsletter: boolean;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  notes?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = "owner" | "manager" | "staff";

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: StaffRole;
  active: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phonePrimary: string;
  phoneSecondary: string;
  promoBanner: string;
  promoEnabled: boolean;
  currency: string;
  taxRate: number;
  shippingNote: string;
  appointmentOnly: boolean;
}

export interface ProductCatalog {
  products: Product[];
}
