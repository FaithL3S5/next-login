import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./reusables/helper";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

export default async function middleware(req: NextRequest) {
  const verify = req.cookies.get("session")?.value;

  const protectedRoutesVerify = ["/profile", "/"];
  const protectedRoutesNotVerify = ["/login", "/register", "/"];

  if (!verify && protectedRoutesVerify.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (verify && protectedRoutesNotVerify.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/profile", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return await updateSession(req);
}
