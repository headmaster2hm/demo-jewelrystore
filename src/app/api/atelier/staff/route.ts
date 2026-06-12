import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getStaff, saveStaff, generateId } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { StaffRole, StaffUser } from "@/types/store";

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) return unauthorized();
  const staff = getStaff().map(({ passwordHash: _, ...s }) => s);
  return NextResponse.json(staff);
}

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || user.role === "staff") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const body = await request.json();
  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 });
  }

  const staff = getStaff();
  if (staff.some((s) => s.email.toLowerCase() === body.email.toLowerCase())) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const newUser: StaffUser = {
    id: generateId("staff"),
    name: body.name,
    email: body.email,
    passwordHash: hashPassword(body.password),
    role: (body.role as StaffRole) || "staff",
    active: true,
    createdAt: new Date().toISOString(),
  };

  staff.push(newUser);
  saveStaff(staff);
  const { passwordHash: _, ...safe } = newUser;
  return NextResponse.json(safe, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || user.role === "staff") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const body = await request.json();
  const staff = getStaff();
  const index = staff.findIndex((s) => s.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updated: StaffUser = {
    ...staff[index],
    name: body.name ?? staff[index].name,
    email: body.email ?? staff[index].email,
    role: body.role ?? staff[index].role,
    active: body.active ?? staff[index].active,
  };

  if (body.password) {
    updated.passwordHash = hashPassword(body.password);
  }

  staff[index] = updated;
  saveStaff(staff);
  const { passwordHash: _, ...safe } = updated;
  return NextResponse.json(safe);
}

export async function DELETE(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || user.role !== "owner") {
    return NextResponse.json({ error: "Only owners can remove team members" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  if (id === user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const staff = getStaff().filter((s) => s.id !== id);
  saveStaff(staff);
  return NextResponse.json({ success: true });
}
