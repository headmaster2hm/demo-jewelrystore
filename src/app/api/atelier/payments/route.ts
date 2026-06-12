import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import {
  getPayments,
  savePayments,
  getOrders,
  saveOrders,
  generateId,
} from "@/lib/db";
import { Payment, PaymentMethod, PaymentStatus } from "@/types/store";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const payments = getPayments().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const now = new Date().toISOString();

  const payment: Payment = {
    id: generateId("pay"),
    orderId: body.orderId,
    orderNumber: body.orderNumber,
    customerName: body.customerName,
    amount: body.amount,
    method: (body.method as PaymentMethod) || "phone",
    status: (body.status as PaymentStatus) || "pending",
    reference: body.reference,
    notes: body.notes,
    paidAt: body.status === "paid" ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const payments = getPayments();
  payments.push(payment);
  savePayments(payments);

  if (body.orderId && body.status === "paid") {
    const orders = getOrders();
    const idx = orders.findIndex((o) => o.id === body.orderId);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], paymentStatus: "paid", updatedAt: now };
      saveOrders(orders);
    }
  }

  return NextResponse.json(payment, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const payments = getPayments();
  const index = payments.findIndex((p) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  payments[index] = {
    ...payments[index],
    ...body,
    id: payments[index].id,
    paidAt: body.status === "paid" ? body.paidAt || now : payments[index].paidAt,
    updatedAt: now,
  };
  savePayments(payments);

  if (body.status && payments[index].orderId) {
    const orders = getOrders();
    const idx = orders.findIndex((o) => o.id === payments[index].orderId);
    if (idx !== -1) {
      orders[idx] = {
        ...orders[idx],
        paymentStatus: body.status as PaymentStatus,
        updatedAt: now,
      };
      saveOrders(orders);
    }
  }

  return NextResponse.json(payments[index]);
}
