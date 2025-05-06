import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const token = (await cookies()).get('access_token')?.value;
  if (!token) return NextResponse.json({ user: null });

  try {
    const user = jwt.decode(token); // Optional: verify token with jwt.verify
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
