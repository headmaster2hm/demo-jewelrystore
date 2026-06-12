import { NextRequest, NextResponse } from "next/server";
import { getStaff, saveStaff } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const staff = getStaff();
  const user = staff.find((s) => s.email.toLowerCase() === email.toLowerCase() && s.active);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const updated = staff.map((s) =>
    s.id === user.id ? { ...s, lastLoginAt: new Date().toISOString() } : s
  );
  saveStaff(updated);

  const token = createSessionToken(user.id);
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
