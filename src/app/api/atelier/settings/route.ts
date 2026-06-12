import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, unauthorized } from "@/lib/api-auth";
import { getSettings, saveSettings } from "@/lib/db";

export async function GET(request: NextRequest) {
  if (!getUserFromRequest(request)) return unauthorized();
  return NextResponse.json(getSettings());
}

export async function PATCH(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) return unauthorized();
  if (user.role === "staff") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const body = await request.json();
  const settings = { ...getSettings(), ...body };
  saveSettings(settings);
  return NextResponse.json(settings);
}
