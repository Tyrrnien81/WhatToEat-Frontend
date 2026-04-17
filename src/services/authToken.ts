/**
 * Sync access token for {@link ./api} `getAccessToken` / `authHeaders`.
 * Updated from AuthContext when Supabase session changes.
 */
let runtimeAccessToken: string | undefined;

export function setRuntimeAccessToken(token: string | undefined): void {
  runtimeAccessToken = token && token.length > 0 ? token : undefined;
}

export function getRuntimeAccessToken(): string | undefined {
  return runtimeAccessToken;
}
