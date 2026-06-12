import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getOrders, getCustomers, getPayments, getCatalog } from "@/lib/db";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();

  const orders = getOrders();
  const customers = getCustomers();
  const payments = getPayments();
  const products = getCatalog().products;

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter((p) => p.status === "pending").length;
  const lowStock = products.filter((p) => !p.inStock).length;

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return NextResponse.json({
    totalOrders: orders.length,
    pendingOrders,
    totalCustomers: customers.length,
    totalRevenue,
    pendingPayments,
    totalProducts: products.length,
    lowStock,
    recentOrders,
  });
}
