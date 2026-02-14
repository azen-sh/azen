import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/login"];
const protectedRoutes = [
  "/dashboard",
  "/keys",
  "/billing",
  "/settings",
  "/welcome",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const sessionCookie = getSessionCookie(req);

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  };

  return NextResponse.next();
};

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
    ],
  };
  