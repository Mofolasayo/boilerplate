import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_TENANT_SESSION, SESSION_COOKIE_NAME } from "@/lib/auth/constants";

const PROTECTED_PATHS = ["/dashboard"];

const isProtected = (pathname: string) => PROTECTED_PATHS.some((path) => pathname.startsWith(path));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    if (process.env.NODE_ENV === "development") {
      const response = NextResponse.next();
      response.cookies.set(SESSION_COOKIE_NAME, JSON.stringify(DEFAULT_TENANT_SESSION), {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        path: "/",
      });
      return response;
    }

    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/sign-in";
    signInUrl.searchParams.set("redirect_url", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
