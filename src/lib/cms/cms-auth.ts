import { getSupabaseClient } from "@/lib/supabase";

export async function isAuthenticated(): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client || typeof window === "undefined") return false;

  const { data: userResult, error: userError } = await client.auth.getUser();
  if (userError || !userResult.user) return false;

  const { data, error } = await client
    .from("site_admins")
    .select("user_id")
    .eq("user_id", userResult.user.id)
    .maybeSingle();

  return !error && Boolean(data);
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: "The shared database is not configured yet." };
  }

  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };

  if (!(await isAuthenticated())) {
    await client.auth.signOut();
    return { success: false, error: "This account is not authorized to manage CapeTrust." };
  }

  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  await getSupabaseClient()?.auth.signOut();
}

export async function updateAdminPassword(
  password: string,
): Promise<{ success: boolean; error?: string }> {
  if (!(await isAuthenticated())) {
    return { success: false, error: "Please sign in as a CapeTrust administrator." };
  }
  const { error } = await getSupabaseClient()!.auth.updateUser({ password });
  return error ? { success: false, error: error.message } : { success: true };
}
