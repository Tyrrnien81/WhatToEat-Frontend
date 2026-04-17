import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { getSupabase } from './supabase';

/**
 * Redirect target for Supabase email actions (confirm signup, magic link, recovery).
 * Must be listed under Supabase → Authentication → URL Configuration → Redirect URLs, e.g.
 * `whattoeat://auth/callback` and `exp://**` (Expo Go).
 */
export function getAuthRedirectUrl(): string {
  return Linking.createURL('auth/callback');
}

/**
 * Handles deep link / cold-start URL from Supabase auth (tokens in query or hash, or PKCE code).
 * Returns true if a session was established or exchange succeeded.
 */
export async function handleSupabaseAuthUrl(url: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb || !url) return false;

  // Only handle likely Supabase auth redirects (fragment or query tokens / PKCE code).
  if (!/access_token|refresh_token|(^|[?&#])code=/.test(url)) {
    return false;
  }

  try {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) {
      return false;
    }

    const code = typeof params.code === 'string' ? params.code : undefined;
    if (code) {
      const { error } = await sb.auth.exchangeCodeForSession(code);
      return !error;
    }

    const access_token =
      typeof params.access_token === 'string' ? params.access_token : undefined;
    const refresh_token =
      typeof params.refresh_token === 'string' ? params.refresh_token : undefined;

    if (access_token && refresh_token) {
      const { error } = await sb.auth.setSession({ access_token, refresh_token });
      return !error;
    }

    return false;
  } catch {
    return false;
  }
}
