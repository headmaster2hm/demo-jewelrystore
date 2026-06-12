import { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getStaff } from "@/lib/db";
import { StaffUser } from "@/types/store";

const SESSION_COOKIE = "atelier_session";

function getSecret(): string {
  return process.env.ATELIER_SECRET || "dev-secret-change-in-production";
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function parseSessionToken(token: string): { userId: string } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiresStr, signature] = parts;
  const payload = `${userId}.${expiresStr}`;
  const expected = sign(payload);
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
  } catch {
    return null;
  }
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return null;
  return { userId };
}

export function getUserFromRequest(request: NextRequest): StaffUser | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const parsed = parseSessionToken(token);
  if (!parsed) return null;
  const staff = getStaff();
  return staff.find((s) => s.id === parsed.userId && s.active) ?? null;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
