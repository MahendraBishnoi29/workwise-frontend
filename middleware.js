import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // there are some public paths and there are some protected paths
  // the public path should not be visible when the user has the token
  // the private path should not be visible when the user doesn't have the token
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth/login" || path === "/auth/signup";
  const token = request.cookies.get("token")?.value || ""; // check if the token exists
  if (isPublicPath && token.length > 0 && token) {
    // redirect them to their booking page
    return NextResponse.redirect(new URL("/booking", request.nextUrl));
  }
  if (!isPublicPath && !token.length > 0) {
    // redirect them to the login page
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/booking", "/auth/login", "/auth/signup"],
};
