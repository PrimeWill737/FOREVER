import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/** Use for admin operations when user is logged in via table credentials (cookie). Server-only. Returns null if key is not set. */
export function createServiceRoleClient(): ReturnType<typeof createSupabaseClient> | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key?.trim()) return null;
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; httpOnly?: boolean; sameSite?: 'lax' | 'strict' | 'none' }) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Ignore in Server Component
          }
        },
        remove(name: string, options: { path?: string }) {
          try {
            cookieStore.set({ name, value: '', ...options, maxAge: 0 });
          } catch {
            // Ignore in Server Component
          }
        },
      },
    }
  );
}
