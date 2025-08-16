import { NextResponse } from 'next/server';

export async function POST(req) {
  const res = NextResponse.json({ ok: true });
  // clear cookie
  res.cookies.set('session', '', { path: '/', httpOnly: true, sameSite: 'lax', secure: true, maxAge: 0 });
  return res;
}
