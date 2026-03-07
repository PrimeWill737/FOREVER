'use server';

import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

/** Use in admin server components and actions when the user may be cookie- or Supabase-authenticated. Throws if table-login is used but SUPABASE_SERVICE_ROLE_KEY is missing (required to bypass RLS). */
export async function getAdminSupabase() {
  const session = await getAdminSession();
  if (session) {
    const serviceClient = createServiceRoleClient();
    if (serviceClient) return serviceClient;
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required for admin uploads and edits when using table login. Add it in .env.local (Supabase Dashboard → Project Settings → API → service_role secret).'
    );
  }
  return await createClient();
}

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret?.length) return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'fallback-dev-secret';
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export async function loginWithCredentials(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_check_credentials', {
    p_email: email.trim(),
    p_password: password,
  });
  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'Invalid email or password' };

  const payload = JSON.stringify({ email: email.trim(), exp: Date.now() + MAX_AGE * 1000 });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const token = `${payloadB64}.${sign(payloadB64)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    path: '/',
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return { ok: true };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig || sig !== sign(payloadB64)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
