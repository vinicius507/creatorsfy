import { type NextRequest, NextResponse } from "next/server";
import { getAuthCookie } from "./lib/auth";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getAuthCookie("auth_token");
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.toString()));
  }
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.toString()));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
