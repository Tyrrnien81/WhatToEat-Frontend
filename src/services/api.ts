/**
 * API base URL.
 *
 * - Production / EAS: set EXPO_PUBLIC_API_BASE_URL at build time.
 * - Dev: if EXPO_PUBLIC_API_BASE_URL is unset, uses Metro's host (expo-constants) + :8000 so LAN IP
 *   tracks the QR code / bundler — no manual IP edits when Wi‑Fi changes.
 */
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getRuntimeAccessToken } from './authToken';

function normalizeBase(url: string): string {
  return url.replace(/\/$/, '');
}

/** Same machine IP Expo prints for Metro (e.g. 10.x.x.x from debuggerHost) + backend port. */
function inferDevApiBaseUrl(): string {
  if (Platform.OS === 'web') {
    return 'http://127.0.0.1:8000';
  }
  const debuggerHost =
    Constants.expoGoConfig?.debuggerHost ??
    (Constants.expoConfig && 'hostUri' in Constants.expoConfig
      ? (Constants.expoConfig as { hostUri?: string }).hostUri
      : undefined);
  if (debuggerHost && typeof debuggerHost === 'string') {
    const host = debuggerHost.split(':')[0];
    if (host) return `http://${host}:8000`;
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';
}

const envUrl =
  typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE_URL
    ? normalizeBase(process.env.EXPO_PUBLIC_API_BASE_URL)
    : '';

const isDev = typeof __DEV__ !== 'undefined' && __DEV__;

export const BASE_URL = normalizeBase(
  envUrl ||
    (isDev ? inferDevApiBaseUrl() : '') ||
    'http://127.0.0.1:8000'
);

/** Dev-only: used when backend has ALLOW_QUERY_USER_ID=true and no JWT is configured. */
export const DEFAULT_USER_ID =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_DEV_USER_ID) ||
  '2a63f492-8875-4d3c-9b72-e262c3293219';

/**
 * Access token for the API: Supabase session (runtime) first, then optional
 * `EXPO_PUBLIC_API_ACCESS_TOKEN` for static/dev overrides.
 * When set, `withAuthQuery` does not append `?user_id=`.
 */
export function getAccessToken(): string | undefined {
  const runtime = getRuntimeAccessToken();
  if (runtime) return runtime;
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
