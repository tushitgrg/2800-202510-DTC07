// app/lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUser() {
  const store = await cookies();
  const token = store.get("access_token")?.value;
  if (!token) return null;

  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}
