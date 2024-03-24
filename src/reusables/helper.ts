import { getCookie, setCookie } from "cookies-next";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.secretKey);

export function hasEmptyValue(obj: Record<string, any>): [boolean, string] {
  for (const key in obj) {
    if (obj[key] === "") {
      return [true, key]; // If an empty value is found, return true
    }
  }
  return [false, ""]; // If no empty value is found, return false
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 min from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = getCookie("session");
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // refresh session so it won't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: false,
    expires: parsed.expires,
  });
  return res;
}

export async function logout() {
  setCookie("session", "", { expires: new Date(0) });
}

export function areObjectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
