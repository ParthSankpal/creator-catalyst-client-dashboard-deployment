import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function GET(req) {
  try {
    const cookie = req.cookies.get('session')?.value;
    if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jose.jwtVerify(cookie, secret);
    return NextResponse.json({ user: {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    }});
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
