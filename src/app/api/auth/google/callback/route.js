import { NextResponse } from 'next/server';
import * as jose from 'jose';

async function exchangeCodeForTokens(code) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.OAUTH_REDIRECT,
      grant_type: 'authorization_code',
    }),
  });
  if (!res.ok) throw new Error('Failed to exchange code');
  return res.json();
}

async function fetchUserinfo(access_token) {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to get userinfo');
  return res.json();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const next = searchParams.get('state') || '/dashboard';

    if (!code) return NextResponse.redirect(new URL('/login', req.url));

    const tokens = await exchangeCodeForTokens(code);
    const profile = await fetchUserinfo(tokens.access_token);

    // Create our session JWT
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const jwt = await new jose.SignJWT({
      sub: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    // Set secure httpOnly cookie
    const res = NextResponse.redirect(new URL(next || '/dashboard', req.url));
    res.cookies.set({
      name: 'session',
      value: jwt,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
