const AUTH_STORAGE_KEY = "capetrust_cms_auth_session_v1";
const CONFIG_STORAGE_KEY = "capetrust_cms_auth_config_v1";

export interface AdminAuthConfig {
  passcode: string;
  adminEmail: string;
  adminName: string;
}

const DEFAULT_CONFIG: AdminAuthConfig = {
  passcode: "capetrust2026",
  adminEmail: "admin@capetrustfunerals.com",
  adminName: "Capetrust Administrator",
};

export function getAuthConfig(): AdminAuthConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function updateAuthConfig(config: Partial<AdminAuthConfig>): void {
  if (typeof window === "undefined") return;
  const current = getAuthConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    // Session valid for 7 days
    const isExpired = Date.now() - parsed.timestamp > 7 * 24 * 60 * 60 * 1000;
    if (isExpired) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
    return parsed.authenticated === true;
  } catch {
    return false;
  }
}

export function loginAdmin(passcode: string): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: "Window not defined" };
  const config = getAuthConfig();
  if (passcode.trim() === config.passcode.trim()) {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
      })
    );
    return { success: true };
  }
  return { success: false, error: "Incorrect administrator passcode. Please try again." };
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
