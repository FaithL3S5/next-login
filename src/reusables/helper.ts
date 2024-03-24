import { getCookie, setCookie } from "cookies-next";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Encode the secret key for JWT encryption
const key = new TextEncoder().encode(process.env.secretKey);

// Function to check if an object has empty values
export function hasEmptyValue(obj: Record<string, any>): [boolean, string] {
  for (const key in obj) {
    if (obj[key] === "") {
      return [true, key]; // Return true if an empty value is found
    }
  }
  return [false, ""]; // Return false if no empty value is found
}

// Function to encrypt payload into JWT
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 min from now")
    .sign(key);
}

// Function to decrypt JWT payload
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// Function to get session data from cookies
export async function getSession() {
  const session = getCookie("session");
  if (!session) return null;
  return await decrypt(session);
}

// Function to update session cookie with refreshed expiration time
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh session expiration time
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

// Function to logout and clear session cookie
export async function logout() {
  setCookie("session", "", { expires: new Date(0) });
}

// Function to check if two objects are equal
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
