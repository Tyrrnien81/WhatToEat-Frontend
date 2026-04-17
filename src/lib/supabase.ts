import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type Extra = { supabaseUrl?: string; supabaseAnonKey?: string };

function readExtra(): Extra {
  const raw =
    Constants.expoConfig?.extra ??
    (Constants.manifest2 as { extra?: Extra } | null)?.extra ??
    (Constants.manifest as { extra?: Extra } | null)?.extra;
  return (raw ?? {}) as Extra;
}

const extra = readExtra();

const envUrl =
  typeof process !== 'undefined' ? process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() : '';
const envAnon =
  typeof process !== 'undefined' ? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() : '';

/** Prefer Metro-inlined env, then `app.config.js` `extra` (dotenv at config time). */
const url = envUrl || extra.supabaseUrl?.trim() || '';
const anonKey = envAnon || extra.supabaseAnonKey?.trim() || '';

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Short message for auth screens when the client cannot be created. */
export function supabaseSetupMessage(): string {
  if (isSupabaseConfigured) return '';
  if (!url) {
    return 'Missing Supabase URL. Set EXPO_PUBLIC_SUPABASE_URL in .env or fix app.config.js.';
  }
  return (
    'Set EXPO_PUBLIC_SUPABASE_ANON_KEY in .env (Supabase → Settings → API → anon public). Restart Expo with: npx expo start -c'
  );
}

/** Returns null if URL or anon key is missing. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
