import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env["VITE_SUPABASE_URL"];
const publishableKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

export const isBackendConfigured = Boolean(url && publishableKey);

let browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isBackendConfigured) return null;

  if (typeof window === "undefined") {
    return createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  browserClient ??= createClient(url, publishableKey);
  return browserClient;
}
