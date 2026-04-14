/**
 * API base URL — override with EXPO_PUBLIC_API_BASE_URL for your machine or deployed API.
 */
export const BASE_URL =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE_URL) ||
  'http://10.141.57.125:8000';

/** Dev-only: used when backend has ALLOW_QUERY_USER_ID=true and no JWT is configured. */
export const DEFAULT_USER_ID =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_DEV_USER_ID) ||
  '2a63f492-8875-4d3c-9b72-e262c3293219';

/** Optional Supabase access JWT (EXPO_PUBLIC_API_ACCESS_TOKEN). When set, ?user_id= is not appended. */
export function getAccessToken(): string | undefined {
  const t =
    typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_API_ACCESS_TOKEN : undefined;
  return t && t.length > 0 ? t : undefined;
}

/** Append dev user_id query when no Bearer token (local integration servers). */
export function withAuthQuery(path: string): string {
  if (getAccessToken()) return path;
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}user_id=${encodeURIComponent(DEFAULT_USER_ID)}`;
}

export function authHeaders(json = true): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json) headers['Content-Type'] = 'application/json';
  return headers;
}
