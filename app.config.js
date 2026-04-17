const path = require('path');

// Load .env before reading EXPO_PUBLIC_* (same folder as this file).
require('dotenv').config({ path: path.join(__dirname, '.env') });

const appJson = require('./app.json');

/** Matches the Supabase project used by WhatToEat-Backend `DATABASE_URL` (pooler host ref). */
const DEFAULT_SUPABASE_URL = 'https://sckvjvcywdlthsztsuau.supabase.co';

/** Optional: 10-character Apple Developer Team ID (Xcode → Signing, or developer.apple.com). */
const appleTeamId = process.env.APPLE_TEAM_ID?.trim();

module.exports = {
  expo: {
    ...appJson.expo,
    ios: {
      ...appJson.expo.ios,
      ...(appleTeamId ? { appleTeamId } : {}),
    },
    extra: {
      ...(appJson.expo.extra || {}),
      supabaseUrl:
        process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL,
      supabaseAnonKey:
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
        process.env.SUPABASE_ANON_KEY?.trim() ||
        '',
    },
  },
};
