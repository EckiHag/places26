// middleware.ts

import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // const userRole = req.auth?.user?.role; // Rolle des Benutzers aus der Session extrahieren
  // Geschützte Admin-Pfade
  // const adminRoutes = ["/subjects", "/places", "/pics", "/conv"];
  // const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Admin-Check für "/subjects"
  // if (isAdminRoute && userRole !== "ADMIN26") {
  //   return NextResponse.redirect(new URL("/forbidden", nextUrl)); // Auf eine Fehlerseite umleiten
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
