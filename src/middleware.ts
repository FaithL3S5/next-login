import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./reusables/helper";

// Middleware function to handle authentication and session management
export default async function middleware(req: NextRequest) {
  // Retrieve session token from cookies
  const verify = req.cookies.get("session")?.value;

  // Define routes that require session verification
  const protectedRoutesVerify = ["/profile", "/"];

  // Define routes that should not be accessible if session is verified
  const protectedRoutesNotVerify = ["/login", "/register", "/"];

  // Redirect to login page if session is not verified and accessing protected routes
  if (!verify && protectedRoutesVerify.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to profile page if session is verified and accessing non-protected routes
  if (verify && protectedRoutesNotVerify.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Update session if necessary
  return await updateSession(req);
}
