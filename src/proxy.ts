import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ??
      payload.role ??
      null
    );
  } catch {
    return null;
  }
}

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const role = getRole(token);

    if (pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/teacher") && role !== "Teacher") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/student") && role !== "Student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};