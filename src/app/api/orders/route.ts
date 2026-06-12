import { NextRequest, NextResponse } from "next/server";
import {
  getCustomers,
  saveCustomers,
  getOrders,
  saveOrders,
  getPayments,
  savePayments,
  generateId,
  generateOrderNumber,
} from "@/lib/db";
import { Customer, Order, OrderItem, Payment } from "@/types/store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    address,
    city,
    zip,
    notes,
    items,
    subtotal,
  } = body;

  if (!name || !email || !items?.length) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  const now = new Date().toISOString();
  let customers = getCustomers();
  let customer = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());

  if (!customer) {
    customer = {
      id: generateId("cust"),
      name,
      email,
      phone: phone || "",
      address,
      city,
      zip,
      newsletter: false,
      orderCount: 0,
      totalSpent: 0,
      createdAt: now,
      updatedAt: now,
    };
    customers.push(customer);
  } else {
    customer = {
      ...customer,
      name,
      phone: phone || customer.phone,
      address: address || customer.address,
      city: city || customer.city,
      zip: zip || customer.zip,
      updatedAt: now,
    };
    customers = customers.map((c) => (c.id === customer!.id ? customer! : c));
  }

  const orderItems: OrderItem[] = items.map(
    (item: { product: { id: string; sku: string; name: string; price: number; image: string }; quantity: number }) => ({
      productId: item.product.id,
      sku: item.product.sku,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    })
  );

  const order: Order = {
    id: generateId("ord"),
    orderNumber: generateOrderNumber(),
    customerId: customer.id,
    customerName: name,
    customerEmail: email,
    customerPhone: phone || "",
    shippingAddress: address,
    shippingCity: city,
    shippingZip: zip,
    notes,
    items: orderItems,
    subtotal,
    status: "pending",
    paymentStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };

  customer.orderCount += 1;
  customer.totalSpent += subtotal;
  customers = customers.map((c) => (c.id === customer!.id ? customer! : c));
  saveCustomers(customers);

  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);

  const payment: Payment = {
    id: generateId("pay"),
    orderId: order.id,
    orderNumber: order.orderNumber,
    customerName: name,
    amount: subtotal,
    method: "phone",
    status: "pending",
    notes: "Awaiting payment confirmation",
    createdAt: now,
    updatedAt: now,
  };

  const payments = getPayments();
  payments.push(payment);
  savePayments(payments);

  return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id });
}
