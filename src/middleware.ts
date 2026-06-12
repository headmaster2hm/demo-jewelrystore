import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "atelier_session";

const PUBLIC_ATELIER_PATHS = ["/atelier", "/api/atelier/auth/login"];

function isPublicAtelierPath(pathname: string): boolean {
  return PUBLIC_ATELIER_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isProtectedAtelierPath(pathname: string): boolean {
  return (
    (pathname.startsWith("/atelier") && pathname !== "/atelier") ||
    (pathname.startsWith("/api/atelier") && !pathname.startsWith("/api/atelier/auth/login"))
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/atelier") && !pathname.startsWith("/api/atelier")) {
    return NextResponse.next();
  }

  if (isPublicAtelierPath(pathname) && !isProtectedAtelierPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/atelier", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/atelier/:path*", "/api/atelier/:path*"],
};
