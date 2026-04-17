import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import { handleSupabaseAuthUrl } from '../lib/authLinking';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { setRuntimeAccessToken } from '../services/authToken';

interface AuthContextType {
  isGuest: boolean;
  setIsGuest: (val: boolean) => void;
  session: Session | null;
  user: User | null;
  initializing: boolean;
  supabaseReady: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isGuest: false,
  setIsGuest: () => {},
  session: null,
  user: null,
  initializing: true,
  supabaseReady: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  const supabaseReady = isSupabaseConfigured && getSupabase() !== null;

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setRuntimeAccessToken(undefined);
      setInitializing(false);
      return;
    }

    const subUrl = Linking.addEventListener('url', ({ url }) => {
      void handleSupabaseAuthUrl(url);
    });

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setRuntimeAccessToken(s?.access_token ?? undefined);
      if (s) setIsGuest(false);
    });

    void (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) await handleSupabaseAuthUrl(initialUrl);
      const {
        data: { session: s },
      } = await sb.auth.getSession();
      setSession(s);
      setRuntimeAccessToken(s?.access_token);
      setInitializing(false);
    })();

    return () => {
      subUrl.remove();
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    setIsGuest(false);
    setRuntimeAccessToken(undefined);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      isGuest,
      setIsGuest,
      session,
      user: session?.user ?? null,
      initializing,
      supabaseReady,
      signOut,
    }),
    [isGuest, session, initializing, supabaseReady, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
