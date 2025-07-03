import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Don't protect the login page itself
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Protect all other admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const user = getSessionFromRequest(request)

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
