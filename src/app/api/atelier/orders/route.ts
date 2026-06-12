import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getOrders, saveOrders } from "@/lib/db";
import { Order, OrderStatus } from "@/types/store";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const orders = getOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(orders);
}

export async function PATCH(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const { id, status, paymentStatus } = body as {
    id: string;
    status?: OrderStatus;
    paymentStatus?: Order["paymentStatus"];
  };

  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  orders[index] = {
    ...orders[index],
    ...(status && { status }),
    ...(paymentStatus && { paymentStatus }),
    updatedAt: new Date().toISOString(),
  };
  saveOrders(orders);
  return NextResponse.json(orders[index]);
}
