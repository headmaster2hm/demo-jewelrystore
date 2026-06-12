import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getCustomers, saveCustomers, generateId } from "@/lib/db";
import { Customer } from "@/types/store";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const customers = getCustomers().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const customers = getCustomers();
  const now = new Date().toISOString();

  const customer: Customer = {
    id: generateId("cust"),
    name: body.name,
    email: body.email,
    phone: body.phone || "",
    address: body.address,
    city: body.city,
    zip: body.zip,
    notes: body.notes,
    newsletter: body.newsletter ?? false,
    orderCount: 0,
    totalSpent: 0,
    createdAt: now,
    updatedAt: now,
  };

  customers.push(customer);
  saveCustomers(customers);
  return NextResponse.json(customer, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const body = await request.json();
  const customers = getCustomers();
  const index = customers.findIndex((c) => c.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  customers[index] = {
    ...customers[index],
    ...body,
    id: customers[index].id,
    updatedAt: new Date().toISOString(),
  };
  saveCustomers(customers);
  return NextResponse.json(customers[index]);
}

export async function DELETE(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const customers = getCustomers().filter((c) => c.id !== id);
  saveCustomers(customers);
  return NextResponse.json({ success: true });
}
