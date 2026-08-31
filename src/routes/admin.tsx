import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  Home,
  Info,
  Layers,
  TreePine,
  Package,
  CalendarDays,
  Coins,
  Calculator,
  HelpCircle,
  PhoneCall,
  Flame,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  Eye,
  KeyRound,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Activity,
  FileText,
  Zap,
  Lock,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Save,
  Clock,
  User,
  HeartHandshake,
  Image as ImageIcon,
  Code2,
  Car,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useCMS } from "@/lib/cms/cms-store";
import { isAuthenticated, loginAdmin, logoutAdmin, getAuthConfig, updateAuthConfig } from "@/lib/cms/cms-auth";
import { getStoredObituaries, saveObituary, INITIAL_OBITUARIES, type Obituary } from "@/lib/obituaries-data";
import { CMSTextInput, CMSTextArea, CMSSwitch, CMSField, CMSLinkField } from "@/components/cms/CMSField";
import { CMSImagePicker } from "@/components/cms/CMSImagePicker";
import { CMSSectionCard } from "@/components/cms/CMSSectionCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: AdminCMSPage,
  head: () => ({
    meta: [
      { title: "Admin Portal & CMS | Capetrust Funeral Services" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type TabKey =
  | "dashboard"
  | "settings"
  | "home"
  | "about"
  | "services"
  | "gardenOfPeace"
  | "memorialProducts"
  | "prePlanning"
  | "estimator"
  | "faq"
  | "contact"
  | "obituaries"
  | "backup";

export function AdminCMSPage() {
  const cms = useCMS();
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [globalSavedToast, setGlobalSavedToast] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPasscode, setNewPasscode] = useState("");
  const [isDevMode, setIsDevMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("capetrust_dev_mode_v1") === "true";
  });

  const toggleDevMode = () => {
    const next = !isDevMode;
    setIsDevMode(next);
    localStorage.setItem("capetrust_dev_mode_v1", String(next));
    triggerGlobalToast();
  };

  // Obituaries local state
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [selectedObituary, setSelectedObituary] = useState<Obituary | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
    if (typeof window !== "undefined") {
      setObituaries(getStoredObituaries());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginAdmin(passcode);
    if (res.success) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError(res.error || "Invalid passcode");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
    setPasscode("");
  };

  const triggerGlobalToast = () => {
    setGlobalSavedToast(true);
    setTimeout(() => setGlobalSavedToast(false), 2500);
  };

  const handleExport = () => {
    const json = cms.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `capetrust_cms_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = cms.importJSON(content);
      if (res.success) {
        alert("CMS content successfully imported and restored!");
        triggerGlobalToast();
      } else {
        alert(`Failed to import backup: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  // ==========================================
  // 1. LOGIN SCREEN
  // ==========================================
  if (!authed) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#070D1F] px-4 py-16 text-slate-100">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#1E3D82]/40 bg-[#0A122E] p-8 shadow-2xl shadow-[#040711]/80">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/logo.png"
                alt="Capetrust Logo"
                className="h-16 w-auto object-contain drop-shadow-md"
              />
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white">
              Capetrust Admin Portal
            </h1>
            <p className="mt-2 text-xs text-slate-300">
              Content Management System &amp; Website Administration
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-sans">
                Administrator Passcode
              </label>
              <div className="relative mt-1.5">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full rounded-lg border border-[#1E3D82]/50 bg-[#070D1F] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#D4AF37] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37]"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 rounded-md bg-rose-950/60 p-3 text-xs text-rose-300 border border-rose-900/60">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#D4AF37] py-3 text-sm font-bold text-[#0A1128] shadow-lg hover:bg-[#e6bf43] transition-all hover:shadow-[#D4AF37]/20 cursor-pointer"
            >
              Sign In to CMS
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-[#1E3D82]/30 bg-[#070D1F]/80 p-3 text-center text-xs text-slate-300">
            <p>
              Default Passcode: <code className="font-mono font-bold text-[#D4AF37]">capetrust2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ADMIN DASHBOARD & MAIN CMS
  // ==========================================
  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "settings", label: "Site & Brand Settings", icon: <Settings className="h-4 w-4" /> },
    { key: "home", label: "Home Page", icon: <Home className="h-4 w-4" /> },
    { key: "about", label: "About Page", icon: <Info className="h-4 w-4" /> },
    { key: "services", label: "Services Page", icon: <Layers className="h-4 w-4" /> },
    { key: "gardenOfPeace", label: "Garden of Peace™", icon: <TreePine className="h-4 w-4" /> },
    { key: "memorialProducts", label: "Memorial Products", icon: <Package className="h-4 w-4" /> },
    { key: "prePlanning", label: "Pre-Planning", icon: <CalendarDays className="h-4 w-4" /> },
    { key: "estimator", label: "Price Estimator Matrix", icon: <Calculator className="h-4 w-4" /> },
    { key: "faq", label: "FAQ Manager", icon: <HelpCircle className="h-4 w-4" /> },
    { key: "contact", label: "Contact & Branches", icon: <PhoneCall className="h-4 w-4" /> },
    {
      key: "obituaries",
      label: "Obituaries & Tributes",
      icon: <Flame className="h-4 w-4" />,
      badge: `${obituaries.length}`,
    },
    { key: "backup", label: "Backup, Export & Reset", icon: <Download className="h-4 w-4" /> },
  ];

  const currentTabObj = navItems.find((n) => n.key === activeTab) || navItems[0]!;

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-[#1E3D82]/40 bg-[#0A122E]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Left: Hamburger (Mobile) + Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D4AF37]/40 bg-[#0E1A3D] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1128] transition-all cursor-pointer shadow-xs lg:hidden"
              title="Toggle CMS Navigation Menu"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Capetrust Logo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-white">
                  Capetrust CMS
                </span>
                <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-800/50 hidden sm:inline">
                  Live
                </span>
                {isDevMode && (
                  <span className="rounded bg-[#D4AF37]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#D4AF37] border border-[#D4AF37]/40 animate-pulse hidden md:inline">
                    Dev Mode
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Right: Actions & Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Current Section Chip on Mobile */}
            <div className="flex items-center gap-1 rounded border border-[#1E3D82]/60 bg-[#070D1F] px-2 py-1 text-[11px] font-semibold text-[#D4AF37] lg:hidden max-w-[130px] sm:max-w-[200px]">
              <span className="shrink-0">{currentTabObj.icon}</span>
              <span className="truncate">{currentTabObj.label}</span>
            </div>

            {/* Desktop Dev Mode Toggle */}
            <button
              type="button"
              onClick={toggleDevMode}
              className={`hidden lg:inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isDevMode
                  ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] ring-1 ring-[#D4AF37]"
                  : "border-[#1E3D82]/50 bg-[#0E1A3D] text-slate-400 hover:text-slate-200 hover:border-[#1E3D82]"
              }`}
              title="Toggle Developer Mode"
            >
              <Code2 className={`h-3.5 w-3.5 ${isDevMode ? "text-[#D4AF37]" : "text-slate-400"}`} />
              <span>Dev Mode: {isDevMode ? "ON" : "OFF"}</span>
            </button>

            {/* Live Preview Button */}
            <Link
              to="/"
              target="_blank"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded border border-[#1E3D82]/50 bg-[#0E1A3D] px-2.5 text-xs font-semibold text-slate-200 hover:bg-[#162659] hover:text-[#D4AF37] transition-colors"
              title="Preview Live Site"
            >
              <Eye className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Preview</span>
            </Link>

            {/* Passcode Button (Desktop) */}
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="hidden lg:inline-flex h-9 items-center justify-center gap-1.5 rounded border border-[#1E3D82]/50 bg-[#0E1A3D] px-2.5 text-xs font-medium text-slate-300 hover:bg-[#162659] hover:text-white transition-colors cursor-pointer"
              title="Change Admin Passcode"
            >
              <KeyRound className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Passcode</span>
            </button>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded border border-rose-900/50 bg-rose-950/40 px-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-900/60 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Pop-up Drawer (Mobile only) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-start bg-black/80 p-3 sm:p-5 backdrop-blur-sm animate-in fade-in duration-200 lg:hidden">
          <div className="w-full max-w-lg rounded-xl border border-[#D4AF37]/50 bg-[#0A122E] p-4 sm:p-5 shadow-2xl shadow-black max-h-[94vh] flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#1E3D82]/40 pb-3">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-7 w-auto" />
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white">CMS Navigation</h3>
                  <p className="text-[10px] text-slate-400">Select an editor section to view or update</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-[#1E3D82]/50 bg-[#070D1F] p-1.5 text-slate-300 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="mt-3 flex-1 overflow-y-auto space-y-1.5 pr-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    setMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === item.key
                      ? "border border-[#D4AF37] bg-[#1E3D82] text-white shadow-sm"
                      : "border border-[#1E3D82]/30 bg-[#070D1F] text-slate-200 hover:border-[#D4AF37]/50 hover:bg-[#0E1A3D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={activeTab === item.key ? "text-[#D4AF37]" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-[#0A122E] px-2 py-0.5 text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Quick Controls */}
            <div className="mt-3 pt-3 border-t border-[#1E3D82]/40 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleDevMode}
                className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-bold transition-all ${
                  isDevMode
                    ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                    : "border-[#1E3D82]/50 bg-[#070D1F] text-slate-400"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Dev: {isDevMode ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setShowPasswordModal(true);
                }}
                className="inline-flex items-center gap-1 rounded border border-[#1E3D82]/40 bg-[#070D1F] px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
              >
                <KeyRound className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Passcode</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 rounded border border-rose-900/50 bg-rose-950/40 px-2.5 py-1.5 text-xs font-semibold text-rose-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Confirmation Toast */}
      {globalSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <Check className="h-4 w-4" />
          <span>All Changes Saved Successfully &amp; Published Live!</span>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded border border-[#1E3D82]/40 bg-[#0A122E] p-5 shadow-2xl">
            <h3 className="font-serif text-base font-bold text-white">Change Admin Passcode</h3>
            <p className="mt-1 text-xs text-slate-300">
              Set a new passcode for accessing this Content Management System.
            </p>
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-200">New Passcode</label>
              <input
                type="text"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                placeholder="Enter new passcode"
                className="mt-1.5 w-full rounded border border-[#1E3D82]/50 bg-[#070D1F] px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-hidden"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="rounded px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-[#0E1A3D] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newPasscode.trim().length < 4) {
                    alert("Passcode must be at least 4 characters long.");
                    return;
                  }
                  updateAuthConfig({ passcode: newPasscode.trim() });
                  setShowPasswordModal(false);
                  setNewPasscode("");
                  alert("Passcode successfully updated!");
                }}
                className="rounded bg-[#D4AF37] px-4 py-1.5 text-xs font-bold text-[#0A1128] hover:bg-[#e6bf43]"
              >
                Save Passcode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Container: Desktop Sidebar + Editor Body */}
      <div className="mx-auto w-full max-w-[1680px] px-4 py-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-16 z-30 flex flex-col gap-1.5 rounded-xl border border-[#1E3D82]/30 bg-[#0A122E]/95 p-2.5 backdrop-blur-md shadow-lg">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Navigation &amp; Editors
              </div>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                    activeTab === item.key
                      ? "bg-[#1E3D82] text-white font-semibold border-l-4 border-[#D4AF37] shadow-md shadow-[#040711]/50"
                      : "text-slate-300 hover:bg-[#12204D] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={activeTab === item.key ? "text-[#D4AF37]" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        activeTab === item.key
                          ? "bg-[#070D1F] text-[#D4AF37] border border-[#D4AF37]/30"
                          : "bg-[#070D1F] text-slate-400 border border-[#1E3D82]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Editor Body */}
          <main className="space-y-5 lg:col-span-9">
          {/* ========================================================================= */}
          {/* TAB: DASHBOARD (Compact & Dense Layout) */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-5">
              {/* 1. Compact Quick Operations Toolbar */}
              <div className="rounded border border-[#D4AF37]/30 bg-gradient-to-r from-[#0A122E] via-[#0E1A3D] to-[#0A122E] p-4 shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h3 className="font-serif text-sm font-bold text-white">
                        Capetrust Executive Command Center
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Real-time site synchronization, instant content propagation, and live price matrix engine.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/obituaries/create"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded border border-[#D4AF37] bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#070D1F] hover:bg-[#b5952f] transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      New Tribute Page
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveTab("estimator")}
                      className="inline-flex items-center gap-1.5 rounded border border-[#1E3D82]/60 bg-[#070D1F] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Calculator className="h-3.5 w-3.5 text-[#D4AF37]" />
                      Price Matrix
                    </button>
                    <button
                      type="button"
                      onClick={handleExport}
                      className="inline-flex items-center gap-1.5 rounded border border-[#1E3D82]/60 bg-[#070D1F] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-sky-400" />
                      Backup JSON
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Key Metric Cards (Compact) */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                  onClick={() => setActiveTab("obituaries")}
                  className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3.5 shadow-sm transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 font-medium">Published Obituaries</span>
                    <Flame className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <p className="mt-1 font-serif text-2xl font-bold text-[#D4AF37]">
                    {obituaries.length}
                  </p>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#D4AF37] transition-colors">
                    Manage Tributes →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("services")}
                  className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3.5 shadow-sm transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 font-medium">Core Services</span>
                    <Layers className="h-4 w-4 text-sky-400" />
                  </div>
                  <p className="mt-1 font-serif text-2xl font-bold text-white">
                    {cms.content.services.servicesList.length}
                  </p>
                  <span className="text-[10px] text-slate-400 group-hover:text-sky-300 transition-colors">
                    Funeral &amp; Care →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("gardenOfPeace")}
                  className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3.5 shadow-sm transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 font-medium">Vault Packages</span>
                    <TreePine className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="mt-1 font-serif text-2xl font-bold text-white">
                    {cms.content.gardenOfPeace.vaultTiers.length}
                  </p>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-300 transition-colors">
                    Garden of Peace™ →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("memorialProducts")}
                  className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3.5 shadow-sm transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300 font-medium">Product Collections</span>
                    <Package className="h-4 w-4 text-amber-400" />
                  </div>
                  <p className="mt-1 font-serif text-2xl font-bold text-white">
                    {cms.content.memorialProducts.collections.length}
                  </p>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-300 transition-colors">
                    Caskets &amp; Vaults →
                  </span>
                </div>
              </div>

              {/* 3. Security & System Diagnostics Panel (Compact) */}
              <div className="rounded border border-[#1E3D82]/40 bg-[#070D1F] p-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1E3D82]/30 pb-2.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      System Security &amp; Infrastructure Health
                    </h4>
                  </div>
                  <span className="rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    All Systems Secure &amp; Active
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-start gap-2.5 rounded border border-[#1E3D82]/20 bg-[#0A122E] p-2.5">
                    <Lock className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-[11px]">Portal Auth Gate</p>
                      <p className="text-[10px] text-slate-400">Session passcode active</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded border border-[#1E3D82]/20 bg-[#0A122E] p-2.5">
                    <Activity className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-[11px]">Live Storage Sync</p>
                      <p className="text-[10px] text-slate-400">Reactive state enabled</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded border border-[#1E3D82]/20 bg-[#0A122E] p-2.5">
                    <ImageIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-[11px]">Verified Assets</p>
                      <p className="text-[10px] text-slate-400">Local fallback media</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded border border-[#1E3D82]/20 bg-[#0A122E] p-2.5">
                    <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-[11px]">Client Protection</p>
                      <p className="text-[10px] text-slate-400">Zero exposed keys</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Quick Navigation & Site Editors (Compact 3x3 Grid) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-semibold tracking-tight text-white">
                    Quick Navigation &amp; Site Editors
                  </h3>
                  <span className="text-[11px] text-slate-400">Click any tile to edit that module</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  <div
                    onClick={() => setActiveTab("settings")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Site &amp; Emergency Settings
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Helplines, WhatsApp &amp; emergency badge
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("home")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Home className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Home Page
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Hero banner, stats counters &amp; CTA
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("about")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Info className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          About &amp; Leadership
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Founding story, values &amp; team
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("services")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Funeral &amp; Repatriation
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Burials, motorcades &amp; chapel
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("gardenOfPeace")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#415825]/30 p-2 text-[#86ab4d] group-hover:bg-[#415825] group-hover:text-white transition-colors">
                        <TreePine className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#86ab4d] transition-colors">
                          Garden of Peace™ Park
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Agbowa grounds, vault tiers &amp; park
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("memorialProducts")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Memorial Products
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Caskets, headstones &amp; urns
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("estimator")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Price Estimator Matrix
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Vault pricing, casket rates &amp; hearse
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("obituaries")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <Flame className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          Obituaries &amp; Tributes
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Tribute biographies, photos &amp; tributes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("faq")}
                    className="group cursor-pointer rounded border border-[#1E3D82]/30 bg-[#0A122E] p-3 transition-all hover:border-[#D4AF37]/60 hover:bg-[#0E1A3D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded bg-[#D4AF37]/15 p-2 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          FAQ Manager
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          Answers to client inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

            {/* ========================================================================= */}
            {/* TAB: SITE SETTINGS & BRANDING */}
            {/* ========================================================================= */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="General Business & Contact Information"
                  description="Phone numbers, email addresses, and official locations displayed across header, footer, and contact buttons."
                  icon={<Settings className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateSettings(cms.content.settings);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("settings")}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <CMSTextInput
                      label="Company Full Name"
                      value={cms.content.settings.name}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, name: e.target.value })
                      }
                    />
                    <CMSTextInput
                      label="Short Brand Name"
                      value={cms.content.settings.shortName}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, shortName: e.target.value })
                      }
                    />
                    <CMSTextInput
                      label="Tagline / Slogan"
                      value={cms.content.settings.tagline}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, tagline: e.target.value })
                      }
                      className="sm:col-span-2"
                    />
                    <CMSTextInput
                      label="Primary Phone Number"
                      value={cms.content.settings.phone}
                      onChange={(e) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          phone: e.target.value,
                          phoneHref: `tel:${e.target.value.replace(/\s+/g, "")}`,
                        })
                      }
                    />
                    <CMSTextInput
                      label="Official Email Address"
                      value={cms.content.settings.email}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, email: e.target.value })
                      }
                    />
                    <CMSTextInput
                      label="WhatsApp Direct Link / Number"
                      value={cms.content.settings.whatsapp}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, whatsapp: e.target.value })
                      }
                      className="sm:col-span-2"
                      placeholder="https://wa.me/2348026666655"
                    />
                    <CMSTextArea
                      label="Head Office Address"
                      value={cms.content.settings.headOffice}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, headOffice: e.target.value })
                      }
                      rows={2}
                    />
                    <CMSTextArea
                      label="Garden of Peace™ Park Address"
                      value={cms.content.settings.park}
                      onChange={(e) =>
                        cms.updateSettings({ ...cms.content.settings, park: e.target.value })
                      }
                      rows={2}
                    />
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="24/7 Emergency Header Announcement Banner"
                  description="A top announcement banner for emergency assistance and 24-hour response."
                  icon={<AlertCircle className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateSettings(cms.content.settings);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <CMSSwitch
                      label="Enable Emergency Announcement Banner"
                      description="Display the prominent emergency assistance bar at the very top of all pages."
                      checked={cms.content.settings.emergencyBanner.enabled}
                      onChange={(checked) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          emergencyBanner: {
                            ...cms.content.settings.emergencyBanner,
                            enabled: checked,
                          },
                        })
                      }
                    />

                    {cms.content.settings.emergencyBanner.enabled && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                        <CMSTextInput
                          label="Badge Tag"
                          value={cms.content.settings.emergencyBanner.badge}
                          onChange={(e) =>
                            cms.updateSettings({
                              ...cms.content.settings,
                              emergencyBanner: {
                                ...cms.content.settings.emergencyBanner,
                                badge: e.target.value,
                              },
                            })
                          }
                        />
                        <CMSTextInput
                          label="Emergency Helpline Phone"
                          value={cms.content.settings.emergencyBanner.phone}
                          onChange={(e) =>
                            cms.updateSettings({
                              ...cms.content.settings,
                              emergencyBanner: {
                                ...cms.content.settings.emergencyBanner,
                                phone: e.target.value,
                                linkHref: `tel:${e.target.value.replace(/\s+/g, "")}`,
                              },
                            })
                          }
                        />
                        <CMSTextInput
                          label="Banner Message"
                          value={cms.content.settings.emergencyBanner.text}
                          onChange={(e) =>
                            cms.updateSettings({
                              ...cms.content.settings,
                              emergencyBanner: {
                                ...cms.content.settings.emergencyBanner,
                                text: e.target.value,
                              },
                            })
                          }
                          className="sm:col-span-2"
                        />
                      </div>
                    )}
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="Social Media Links"
                  description="Social media profile URLs for Facebook, Instagram, LinkedIn, YouTube, and X (Twitter)."
                  icon={<Sparkles className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateSettings(cms.content.settings);
                    triggerGlobalToast();
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <CMSTextInput
                      label="Facebook URL"
                      value={cms.content.settings.socials.facebook || ""}
                      onChange={(e) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          socials: { ...cms.content.settings.socials, facebook: e.target.value },
                        })
                      }
                    />
                    <CMSTextInput
                      label="Instagram URL"
                      value={cms.content.settings.socials.instagram || ""}
                      onChange={(e) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          socials: { ...cms.content.settings.socials, instagram: e.target.value },
                        })
                      }
                    />
                    <CMSTextInput
                      label="LinkedIn URL"
                      value={cms.content.settings.socials.linkedin || ""}
                      onChange={(e) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          socials: { ...cms.content.settings.socials, linkedin: e.target.value },
                        })
                      }
                    />
                    <CMSTextInput
                      label="YouTube URL"
                      value={cms.content.settings.socials.youtube || ""}
                      onChange={(e) =>
                        cms.updateSettings({
                          ...cms.content.settings,
                          socials: { ...cms.content.settings.socials, youtube: e.target.value },
                        })
                      }
                    />
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: HOME PAGE */}
            {/* ========================================================================= */}
            {activeTab === "home" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Hero Banner Section"
                  description="Primary headline, subtitle, hero image, and CTA action buttons."
                  icon={<Home className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateHome(cms.content.home);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("home")}
                >
                  <div className="space-y-5">
                    <CMSTextInput
                      label="Hero Top Eyebrow / Tag"
                      value={cms.content.home.heroTag}
                      onChange={(e) =>
                        cms.updateHome({ ...cms.content.home, heroTag: e.target.value })
                      }
                    />
                    <CMSTextInput
                      label="Hero Main Headline (H1)"
                      value={cms.content.home.heroTitle}
                      onChange={(e) =>
                        cms.updateHome({ ...cms.content.home, heroTitle: e.target.value })
                      }
                    />
                    <CMSTextArea
                      label="Hero Subtitle Description"
                      value={cms.content.home.heroSubtitle}
                      onChange={(e) =>
                        cms.updateHome({ ...cms.content.home, heroSubtitle: e.target.value })
                      }
                      rows={4}
                      showCharCount={true}
                    />
                    <CMSImagePicker
                      label="Hero Background Image"
                      value={cms.content.home.heroImage}
                      onChange={(url) => cms.updateHome({ ...cms.content.home, heroImage: url })}
                    />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <CMSTextInput
                        label="Primary CTA Button Text"
                        value={cms.content.home.heroPrimaryCtaText}
                        onChange={(e) =>
                          cms.updateHome({
                            ...cms.content.home,
                            heroPrimaryCtaText: e.target.value,
                          })
                        }
                      />
                      <CMSLinkField
                        label="Primary CTA Button Link / Route"
                        value={cms.content.home.heroPrimaryCtaLink}
                        onChange={(val) =>
                          cms.updateHome({
                            ...cms.content.home,
                            heroPrimaryCtaLink: val,
                          })
                        }
                        isDevMode={isDevMode}
                        placeholder="/garden-of-peace or /contact"
                      />
                      <CMSTextInput
                        label="Secondary CTA Button Text"
                        value={cms.content.home.heroSecondaryCtaText}
                        onChange={(e) =>
                          cms.updateHome({
                            ...cms.content.home,
                            heroSecondaryCtaText: e.target.value,
                          })
                        }
                      />
                      <CMSLinkField
                        label="Secondary CTA Button Link / Route"
                        value={cms.content.home.heroSecondaryCtaLink}
                        onChange={(val) =>
                          cms.updateHome({
                            ...cms.content.home,
                            heroSecondaryCtaLink: val,
                          })
                        }
                        isDevMode={isDevMode}
                        placeholder="/estimator or /services"
                      />
                    </div>
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="Key Stat Metrics"
                  description="Four highlight statistic cards under the hero banner."
                  icon={<Sparkles className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateHome(cms.content.home);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {cms.content.home.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase text-[#D4AF37]">
                              Metric #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = cms.content.home.stats.filter((_, i) => i !== idx);
                                cms.updateHome({ ...cms.content.home, stats: copy });
                              }}
                              className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                              title="Delete Metric"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-2 space-y-2">
                            <CMSTextInput
                              label="Big Number / Value"
                              value={stat.value}
                              onChange={(e) => {
                                const copy = [...cms.content.home.stats];
                                copy[idx] = { ...copy[idx]!, value: e.target.value };
                                cms.updateHome({ ...cms.content.home, stats: copy });
                              }}
                            />
                            <CMSTextInput
                              label="Metric Title"
                              value={stat.label}
                              onChange={(e) => {
                                const copy = [...cms.content.home.stats];
                                copy[idx] = { ...copy[idx]!, label: e.target.value };
                                cms.updateHome({ ...cms.content.home, stats: copy });
                              }}
                            />
                            <CMSTextInput
                              label="Short Description"
                              value={stat.description}
                              onChange={(e) => {
                                const copy = [...cms.content.home.stats];
                                copy[idx] = { ...copy[idx]!, description: e.target.value };
                                cms.updateHome({ ...cms.content.home, stats: copy });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newStat = {
                          value: "100%",
                          label: "New Metric",
                          description: "Quality and dignity assured across all services.",
                        };
                        cms.updateHome({
                          ...cms.content.home,
                          stats: [...cms.content.home.stats, newStat],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Metric Card Option
                    </button>
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="Why Choose Capetrust Features"
                  description="Highlight pillars that distinguish Capetrust Memorial Park & Services."
                  icon={<Shield className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateHome(cms.content.home);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {cms.content.home.whyUsItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-[#D4AF37]">
                              Feature #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = cms.content.home.whyUsItems.filter((_, i) => i !== idx);
                                cms.updateHome({ ...cms.content.home, whyUsItems: copy });
                              }}
                              className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                              title="Delete Feature"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 space-y-2">
                            <CMSTextInput
                              label="Tag / Number"
                              value={item.tag}
                              onChange={(e) => {
                                const copy = [...cms.content.home.whyUsItems];
                                copy[idx] = { ...copy[idx]!, tag: e.target.value };
                                cms.updateHome({ ...cms.content.home, whyUsItems: copy });
                              }}
                            />
                            <CMSTextInput
                              label="Feature Title"
                              value={item.title}
                              onChange={(e) => {
                                const copy = [...cms.content.home.whyUsItems];
                                copy[idx] = { ...copy[idx]!, title: e.target.value };
                                cms.updateHome({ ...cms.content.home, whyUsItems: copy });
                              }}
                            />
                            <CMSTextArea
                              label="Description"
                              value={item.description}
                              onChange={(e) => {
                                const copy = [...cms.content.home.whyUsItems];
                                copy[idx] = { ...copy[idx]!, description: e.target.value };
                                cms.updateHome({ ...cms.content.home, whyUsItems: copy });
                              }}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newItem = {
                          tag: `0${cms.content.home.whyUsItems.length + 1}`,
                          title: "New Distinction Pillar",
                          description: "Unmatched attention to detail, comfort, and professional family care.",
                        };
                        cms.updateHome({
                          ...cms.content.home,
                          whyUsItems: [...cms.content.home.whyUsItems, newItem],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Why Choose Us Feature Option
                    </button>
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="Family Testimonials Manager"
                  description="Manage family quotes, authors, relationships, and reviews on the home page."
                  icon={<HeartHandshake className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateHome(cms.content.home);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    {cms.content.home.testimonials.map((t, idx) => (
                      <div
                        key={t.id || idx}
                        className="relative rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-[#D4AF37]">
                            Testimonial #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.home.testimonials.filter((_, i) => i !== idx);
                              cms.updateHome({ ...cms.content.home, testimonials: copy });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <CMSTextArea
                            label="Family Quote"
                            value={t.quote}
                            onChange={(e) => {
                              const copy = [...cms.content.home.testimonials];
                              copy[idx] = { ...copy[idx]!, quote: e.target.value };
                              cms.updateHome({ ...cms.content.home, testimonials: copy });
                            }}
                            className="sm:col-span-2"
                            rows={3}
                            showCharCount={true}
                          />
                          <CMSTextInput
                            label="Author Name"
                            value={t.author}
                            onChange={(e) => {
                              const copy = [...cms.content.home.testimonials];
                              copy[idx] = { ...copy[idx]!, author: e.target.value };
                              cms.updateHome({ ...cms.content.home, testimonials: copy });
                            }}
                          />
                          <CMSTextInput
                            label="Relationship / Role"
                            value={t.relationship}
                            onChange={(e) => {
                              const copy = [...cms.content.home.testimonials];
                              copy[idx] = { ...copy[idx]!, relationship: e.target.value };
                              cms.updateHome({ ...cms.content.home, testimonials: copy });
                            }}
                          />
                          <CMSTextInput
                            label="Location"
                            value={t.location}
                            onChange={(e) => {
                              const copy = [...cms.content.home.testimonials];
                              copy[idx] = { ...copy[idx]!, location: e.target.value };
                              cms.updateHome({ ...cms.content.home, testimonials: copy });
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newT = {
                          id: `t_${Date.now()}`,
                          quote: "Capetrust provided an exceptional, dignified service for our family.",
                          author: "Family Representative",
                          relationship: "Family Member",
                          location: "Lagos, Nigeria",
                          stars: 5,
                        };
                        cms.updateHome({
                          ...cms.content.home,
                          testimonials: [...cms.content.home.testimonials, newT],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Testimonial
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: ABOUT PAGE */}
            {/* ========================================================================= */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="About Page Story & Mission"
                  description="Headline, story paragraphs, mission, and vision statements."
                  icon={<Info className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateAbout(cms.content.about);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("about")}
                >
                  <div className="space-y-5">
                    <CMSTextInput
                      label="Hero Title"
                      value={cms.content.about.hero.title}
                      onChange={(e) =>
                        cms.updateAbout({
                          ...cms.content.about,
                          hero: { ...cms.content.about.hero, title: e.target.value },
                        })
                      }
                    />
                    <CMSTextArea
                      label="Hero Intro Text"
                      value={cms.content.about.hero.intro}
                      onChange={(e) =>
                        cms.updateAbout({
                          ...cms.content.about,
                          hero: { ...cms.content.about.hero, intro: e.target.value },
                        })
                      }
                      rows={4}
                      showCharCount={true}
                    />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <CMSTextArea
                        label="Mission Statement"
                        value={cms.content.about.mission.body}
                        onChange={(e) =>
                          cms.updateAbout({
                            ...cms.content.about,
                            mission: { ...cms.content.about.mission, body: e.target.value },
                          })
                        }
                        rows={4}
                        showCharCount={true}
                      />
                      <CMSTextArea
                        label="Vision Statement"
                        value={cms.content.about.vision.body}
                        onChange={(e) =>
                          cms.updateAbout({
                            ...cms.content.about,
                            vision: { ...cms.content.about.vision, body: e.target.value },
                          })
                        }
                        rows={4}
                        showCharCount={true}
                      />
                    </div>
                  </div>
                </CMSSectionCard>

                {/* Core Values Manager */}
                <CMSSectionCard
                  title="Core Values & Principles"
                  description="Manage the ethical pillars that guide Capetrust services."
                  icon={<Sparkles className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateAbout(cms.content.about);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {cms.content.about.values.map((v, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-[#D4AF37]">
                              Value #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = cms.content.about.values.filter((_, i) => i !== idx);
                                cms.updateAbout({ ...cms.content.about, values: copy });
                              }}
                              className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                              title="Delete Value"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 space-y-2">
                            <CMSTextInput
                              label="Value Name"
                              value={v.title}
                              onChange={(e) => {
                                const copy = [...cms.content.about.values];
                                copy[idx] = { ...copy[idx]!, title: e.target.value };
                                cms.updateAbout({ ...cms.content.about, values: copy });
                              }}
                            />
                            <CMSTextArea
                              label="Description"
                              value={v.description}
                              onChange={(e) => {
                                const copy = [...cms.content.about.values];
                                copy[idx] = { ...copy[idx]!, description: e.target.value };
                                cms.updateAbout({ ...cms.content.about, values: copy });
                              }}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newVal = {
                          title: "New Core Value",
                          description: "Steadfast commitment to compassion, dignity, and family support.",
                        };
                        cms.updateAbout({
                          ...cms.content.about,
                          values: [...cms.content.about.values, newVal],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Core Value Option
                    </button>
                  </div>
                </CMSSectionCard>

                {/* Milestones Manager */}
                <CMSSectionCard
                  title="Historical Milestones & Heritage"
                  description="Showcase key foundation years and development steps."
                  icon={<Clock className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateAbout(cms.content.about);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {cms.content.about.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-[#D4AF37]">
                              Milestone #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = cms.content.about.milestones.filter((_, i) => i !== idx);
                                cms.updateAbout({ ...cms.content.about, milestones: copy });
                              }}
                              className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                              title="Delete Milestone"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 space-y-2">
                            <CMSTextInput
                              label="Year / Period"
                              value={m.year}
                              onChange={(e) => {
                                const copy = [...cms.content.about.milestones];
                                copy[idx] = { ...copy[idx]!, year: e.target.value };
                                cms.updateAbout({ ...cms.content.about, milestones: copy });
                              }}
                            />
                            <CMSTextInput
                              label="Milestone Headline"
                              value={m.title}
                              onChange={(e) => {
                                const copy = [...cms.content.about.milestones];
                                copy[idx] = { ...copy[idx]!, title: e.target.value };
                                cms.updateAbout({ ...cms.content.about, milestones: copy });
                              }}
                            />
                            <CMSTextArea
                              label="Description"
                              value={m.description}
                              onChange={(e) => {
                                const copy = [...cms.content.about.milestones];
                                copy[idx] = { ...copy[idx]!, description: e.target.value };
                                cms.updateAbout({ ...cms.content.about, milestones: copy });
                              }}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newM = {
                          year: `${new Date().getFullYear()}`,
                          title: "New Expansion Milestone",
                          description: "Continued enhancement of memorial infrastructure and park grounds.",
                        };
                        cms.updateAbout({
                          ...cms.content.about,
                          milestones: [...cms.content.about.milestones, newM],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Milestone Option
                    </button>
                  </div>
                </CMSSectionCard>

                <CMSSectionCard
                  title="Leadership & Advisory Team Manager"
                  description="Add, edit, or remove executive leadership profiles with photos and bios."
                  icon={<User className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateAbout(cms.content.about);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    {cms.content.about.team.map((member, idx) => (
                      <div
                        key={member.id || idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-[#D4AF37]">
                            Team Member #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.about.team.filter((_, i) => i !== idx);
                              cms.updateAbout({ ...cms.content.about, team: copy });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <CMSTextInput
                            label="Full Name"
                            value={member.name}
                            onChange={(e) => {
                              const copy = [...cms.content.about.team];
                              copy[idx] = { ...copy[idx]!, name: e.target.value };
                              cms.updateAbout({ ...cms.content.about, team: copy });
                            }}
                          />
                          <CMSTextInput
                            label="Executive Role / Title"
                            value={member.role}
                            onChange={(e) => {
                              const copy = [...cms.content.about.team];
                              copy[idx] = { ...copy[idx]!, role: e.target.value };
                              cms.updateAbout({ ...cms.content.about, team: copy });
                            }}
                          />
                          <CMSImagePicker
                            label="Profile Photo URL"
                            value={member.image}
                            onChange={(url) => {
                              const copy = [...cms.content.about.team];
                              copy[idx] = { ...copy[idx]!, image: url };
                              cms.updateAbout({ ...cms.content.about, team: copy });
                            }}
                          />
                          <CMSTextArea
                            label="Short Biography"
                            value={member.bio}
                            onChange={(e) => {
                              const copy = [...cms.content.about.team];
                              copy[idx] = { ...copy[idx]!, bio: e.target.value };
                              cms.updateAbout({ ...cms.content.about, team: copy });
                            }}
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newM = {
                          id: `m_${Date.now()}`,
                          name: "New Team Member",
                          role: "Advisor",
                          bio: "Experienced funeral and bereavement care specialist.",
                          image: "/images/noah-silliman-EBB45rCSjrU-unsplash.jpg",
                        };
                        cms.updateAbout({
                          ...cms.content.about,
                          team: [...cms.content.about.team, newM],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Team Member Option
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: SERVICES PAGE */}
            {/* ========================================================================= */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Funeral Services Catalog"
                  description="Edit core funeral services, descriptions, cover images, and CTA links."
                  icon={<Layers className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateServices(cms.content.services);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("services")}
                >
                  <div className="space-y-4">
                    {cms.content.services.servicesList.map((service, idx) => (
                      <div
                        key={service.id || idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-[#D4AF37]">
                            Service #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.services.servicesList.filter(
                                (_, i) => i !== idx
                              );
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <CMSTextInput
                            label="Service Title"
                            value={service.title}
                            onChange={(e) => {
                              const copy = [...cms.content.services.servicesList];
                              copy[idx] = { ...copy[idx]!, title: e.target.value };
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                          />
                          <CMSTextInput
                            label="CTA Button Label"
                            value={service.cta}
                            onChange={(e) => {
                              const copy = [...cms.content.services.servicesList];
                              copy[idx] = { ...copy[idx]!, cta: e.target.value };
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                          />
                          <CMSLinkField
                            label="CTA Destination Link / Route"
                            value={service.href || "/contact"}
                            onChange={(val) => {
                              const copy = [...cms.content.services.servicesList];
                              copy[idx] = { ...copy[idx]!, href: val };
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                            isDevMode={isDevMode}
                            placeholder="/services or /contact"
                          />
                          <CMSImagePicker
                            label="Service Cover Photo"
                            value={service.image}
                            onChange={(url) => {
                              const copy = [...cms.content.services.servicesList];
                              copy[idx] = { ...copy[idx]!, image: url };
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                          />
                          <CMSTextArea
                            label="Service Description"
                            value={service.body}
                            onChange={(e) => {
                              const copy = [...cms.content.services.servicesList];
                              copy[idx] = { ...copy[idx]!, body: e.target.value };
                              cms.updateServices({ ...cms.content.services, servicesList: copy });
                            }}
                            rows={4}
                            className="sm:col-span-2"
                            showCharCount={true}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newS = {
                          id: `s_${Date.now()}`,
                          title: "New Funeral Offering",
                          body: "Comprehensive coordination designed for family comfort and dignity.",
                          image: "/images/diego-lozano-wuCHIyWheSo-unsplash.jpg",
                          cta: "Speak with an Advisor",
                          href: "/contact",
                        };
                        cms.updateServices({
                          ...cms.content.services,
                          servicesList: [...cms.content.services.servicesList, newS],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Service Offering Option
                    </button>
                  </div>
                </CMSSectionCard>

                {/* Additional Services Options */}
                <CMSSectionCard
                  title="Additional Services &amp; Specialized Care"
                  description="List supplementary offerings like repatriation, flower arrangements, and keepsakes."
                  icon={<Sparkles className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateServices(cms.content.services);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-3">
                    {cms.content.services.additionalServices.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const copy = [...cms.content.services.additionalServices];
                            copy[idx] = e.target.value;
                            cms.updateServices({ ...cms.content.services, additionalServices: copy });
                          }}
                          className="w-full rounded-md border border-[#1E3D82]/50 bg-[#070D1F] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-hidden"
                          placeholder="Service name..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = cms.content.services.additionalServices.filter((_, i) => i !== idx);
                            cms.updateServices({ ...cms.content.services, additionalServices: copy });
                          }}
                          className="rounded p-2 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        cms.updateServices({
                          ...cms.content.services,
                          additionalServices: [
                            ...cms.content.services.additionalServices,
                            "New Customized Bereavement Offering",
                          ],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Additional Service Option
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: GARDEN OF PEACE */}
            {/* ========================================================================= */}
            {activeTab === "gardenOfPeace" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Vault Packages &amp; Tiers"
                  description="Single, Double Companion, Triple Unit Vaults, and Family Mausoleums."
                  icon={<TreePine className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateGardenOfPeace(cms.content.gardenOfPeace);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("gardenOfPeace")}
                >
                  <div className="space-y-4">
                    {cms.content.gardenOfPeace.vaultTiers.map((tier, idx) => (
                      <div
                        key={tier.id || idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase text-[#D4AF37]">
                              Vault Package #{idx + 1}
                            </span>
                            {tier.isPopular && (
                              <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.gardenOfPeace.vaultTiers.filter((_, i) => i !== idx);
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Delete Vault Tier"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <CMSTextInput
                            label="Tier Title"
                            value={tier.title}
                            onChange={(e) => {
                              const copy = [...cms.content.gardenOfPeace.vaultTiers];
                              copy[idx] = { ...copy[idx]!, title: e.target.value };
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                          />
                          <CMSTextInput
                            label="Starting Price Note"
                            value={tier.priceNote}
                            onChange={(e) => {
                              const copy = [...cms.content.gardenOfPeace.vaultTiers];
                              copy[idx] = { ...copy[idx]!, priceNote: e.target.value };
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                          />
                          <CMSTextInput
                            label="Capacity Description"
                            value={tier.capacity}
                            onChange={(e) => {
                              const copy = [...cms.content.gardenOfPeace.vaultTiers];
                              copy[idx] = { ...copy[idx]!, capacity: e.target.value };
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                          />
                          <CMSTextInput
                            label="Subtitle / Category"
                            value={tier.subtitle}
                            onChange={(e) => {
                              const copy = [...cms.content.gardenOfPeace.vaultTiers];
                              copy[idx] = { ...copy[idx]!, subtitle: e.target.value };
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                          />
                          <CMSTextArea
                            label="Vault Overview Description"
                            value={tier.description}
                            onChange={(e) => {
                              const copy = [...cms.content.gardenOfPeace.vaultTiers];
                              copy[idx] = { ...copy[idx]!, description: e.target.value };
                              cms.updateGardenOfPeace({
                                ...cms.content.gardenOfPeace,
                                vaultTiers: copy,
                              });
                            }}
                            className="sm:col-span-2"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newTier = {
                          id: `tier_${Date.now()}`,
                          title: "New Vault Chamber Option",
                          subtitle: "Standard Resting Ground",
                          capacity: "1-2 Units",
                          description: "Reinforced concrete chamber with perpetual maintenance.",
                          priceNote: "Inquire with Counselor",
                          features: ["Reinforced Concrete Structure", "Perpetual Care Guarantee"],
                          isPopular: false,
                        };
                        cms.updateGardenOfPeace({
                          ...cms.content.gardenOfPeace,
                          vaultTiers: [...cms.content.gardenOfPeace.vaultTiers, newTier],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Vault Tier Option
                    </button>
                  </div>
                </CMSSectionCard>

                {/* Park Amenities Manager */}
                <CMSSectionCard
                  title="Park Amenities &amp; Infrastructure"
                  description="Security, water supply, landscaping, and chapel features within Garden of Peace."
                  icon={<TreePine className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateGardenOfPeace(cms.content.gardenOfPeace);
                    triggerGlobalToast();
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {cms.content.gardenOfPeace.amenities.map((am, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-[#D4AF37]">
                              Amenity #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = cms.content.gardenOfPeace.amenities.filter((_, i) => i !== idx);
                                cms.updateGardenOfPeace({
                                  ...cms.content.gardenOfPeace,
                                  amenities: copy,
                                });
                              }}
                              className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                              title="Delete Amenity"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 space-y-2">
                            <CMSTextInput
                              label="Amenity Title"
                              value={am.title}
                              onChange={(e) => {
                                const copy = [...cms.content.gardenOfPeace.amenities];
                                copy[idx] = { ...copy[idx]!, title: e.target.value };
                                cms.updateGardenOfPeace({
                                  ...cms.content.gardenOfPeace,
                                  amenities: copy,
                                });
                              }}
                            />
                            <CMSTextArea
                              label="Description"
                              value={am.description}
                              onChange={(e) => {
                                const copy = [...cms.content.gardenOfPeace.amenities];
                                copy[idx] = { ...copy[idx]!, description: e.target.value };
                                cms.updateGardenOfPeace({
                                  ...cms.content.gardenOfPeace,
                                  amenities: copy,
                                });
                              }}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newAmenity = {
                          title: "New Park Infrastructure",
                          description: "High-grade continuous maintenance, 24/7 security, and accessible pathways.",
                        };
                        cms.updateGardenOfPeace({
                          ...cms.content.gardenOfPeace,
                          amenities: [...cms.content.gardenOfPeace.amenities, newAmenity],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Park Amenity Option
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: MEMORIAL PRODUCTS */}
            {/* ========================================================================= */}
            {activeTab === "memorialProducts" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Product Collections (Caskets, Flowers, Keepsakes, Headstones)"
                  description="Manage the featured categories, product titles, descriptions, and included items."
                  icon={<Package className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateMemorialProducts(cms.content.memorialProducts);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("memorialProducts")}
                >
                  <div className="space-y-4">
                    {cms.content.memorialProducts.collections.map((coll, idx) => (
                      <div
                        key={coll.id || idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-[#D4AF37]">
                            Collection #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.memorialProducts.collections.filter(
                                (_, i) => i !== idx
                              );
                              cms.updateMemorialProducts({
                                ...cms.content.memorialProducts,
                                collections: copy,
                              });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Delete Collection"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <CMSTextInput
                            label="Collection Title"
                            value={coll.title}
                            onChange={(e) => {
                              const copy = [...cms.content.memorialProducts.collections];
                              copy[idx] = { ...copy[idx]!, title: e.target.value };
                              cms.updateMemorialProducts({
                                ...cms.content.memorialProducts,
                                collections: copy,
                              });
                            }}
                          />
                          <CMSImagePicker
                            label="Collection Image"
                            value={coll.image}
                            onChange={(url) => {
                              const copy = [...cms.content.memorialProducts.collections];
                              copy[idx] = { ...copy[idx]!, image: url };
                              cms.updateMemorialProducts({
                                ...cms.content.memorialProducts,
                                collections: copy,
                              });
                            }}
                          />
                          <CMSTextArea
                            label="Collection Description"
                            value={coll.body}
                            onChange={(e) => {
                              const copy = [...cms.content.memorialProducts.collections];
                              copy[idx] = { ...copy[idx]!, body: e.target.value };
                              cms.updateMemorialProducts({
                                ...cms.content.memorialProducts,
                                collections: copy,
                              });
                            }}
                            className="sm:col-span-2"
                            rows={2}
                          />
                          <CMSTextArea
                            label="Featured Items List (One per line)"
                            value={coll.items.join("\n")}
                            onChange={(e) => {
                              const copy = [...cms.content.memorialProducts.collections];
                              copy[idx] = {
                                ...copy[idx]!,
                                items: e.target.value
                                  .split("\n")
                                  .filter((s) => s.trim().length > 0),
                              };
                              cms.updateMemorialProducts({
                                ...cms.content.memorialProducts,
                                collections: copy,
                              });
                            }}
                            className="sm:col-span-2"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newColl = {
                          id: `coll_${Date.now()}`,
                          title: "New Product Collection",
                          image: "/images/diego-lozano-wuCHIyWheSo-unsplash.jpg",
                          body: "Curated collection of bespoke memorial items and accessories.",
                          items: ["Custom Finish Option", "Engraved Memorial Plaque"],
                        };
                        cms.updateMemorialProducts({
                          ...cms.content.memorialProducts,
                          collections: [...cms.content.memorialProducts.collections, newColl],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add Product Collection Option
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: PRE-PLANNING */}
            {/* ========================================================================= */}
            {activeTab === "prePlanning" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Pre-Planning Guide &amp; Roadmap"
                  description="Edit pre-planning roadmap steps, benefits, and checklist items."
                  icon={<CalendarDays className="h-5 w-5" />}
                  onSave={() => {
                    cms.updatePrePlanning(cms.content.prePlanning);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("prePlanning")}
                >
                  <div className="space-y-4">
                    <CMSTextInput
                      label="Pre-Planning Guide Headline"
                      value={cms.content.prePlanning.hero.title}
                      onChange={(e) =>
                        cms.updatePrePlanning({
                          ...cms.content.prePlanning,
                          hero: { ...cms.content.prePlanning.hero, title: e.target.value },
                        })
                      }
                    />
                    <CMSTextArea
                      label="Pre-Planning Introduction"
                      value={cms.content.prePlanning.hero.intro}
                      onChange={(e) =>
                        cms.updatePrePlanning({
                          ...cms.content.prePlanning,
                          hero: { ...cms.content.prePlanning.hero, intro: e.target.value },
                        })
                      }
                      rows={3}
                      showCharCount={true}
                    />
                    <div className="pt-2 space-y-4">
                      <span className="text-xs font-bold uppercase text-slate-200">
                        Pre-Planning Steps Roadmap
                      </span>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {cms.content.prePlanning.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-3.5 text-slate-200"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-[#D4AF37]">
                                Step {step.step}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = cms.content.prePlanning.steps.filter((_, i) => i !== idx);
                                  cms.updatePrePlanning({
                                    ...cms.content.prePlanning,
                                    steps: copy,
                                  });
                                }}
                                className="rounded p-1 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                                title="Delete Step"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="mt-2 space-y-1.5">
                              <CMSTextInput
                                label="Step Title"
                                value={step.title}
                                onChange={(e) => {
                                  const copy = [...cms.content.prePlanning.steps];
                                  copy[idx] = { ...copy[idx]!, title: e.target.value };
                                  cms.updatePrePlanning({
                                    ...cms.content.prePlanning,
                                    steps: copy,
                                  });
                                }}
                              />
                              <CMSTextArea
                                label="Step Description"
                                value={step.description}
                                onChange={(e) => {
                                  const copy = [...cms.content.prePlanning.steps];
                                  copy[idx] = { ...copy[idx]!, description: e.target.value };
                                  cms.updatePrePlanning({
                                    ...cms.content.prePlanning,
                                    steps: copy,
                                  });
                                }}
                                rows={2}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newStep = {
                            step: `${cms.content.prePlanning.steps.length + 1}`,
                            title: "New Planning Step",
                            description: "Review and lock in your memorial preferences and arrangements.",
                          };
                          cms.updatePrePlanning({
                            ...cms.content.prePlanning,
                            steps: [...cms.content.prePlanning.steps, newStep],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Add Planning Step Option
                      </button>
                    </div>

                    {/* Checklist Items Manager */}
                    <div className="pt-4 space-y-3 border-t border-[#1E3D82]/30">
                      <span className="text-xs font-bold uppercase text-slate-200">
                        Pre-Planning Checklist Points
                      </span>
                      {cms.content.prePlanning.checklistItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const copy = [...cms.content.prePlanning.checklistItems];
                              copy[idx] = e.target.value;
                              cms.updatePrePlanning({ ...cms.content.prePlanning, checklistItems: copy });
                            }}
                            className="w-full rounded-md border border-[#1E3D82]/50 bg-[#070D1F] px-3.5 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-hidden"
                            placeholder="Checklist point..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.prePlanning.checklistItems.filter((_, i) => i !== idx);
                              cms.updatePrePlanning({ ...cms.content.prePlanning, checklistItems: copy });
                            }}
                            className="rounded p-2 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          cms.updatePrePlanning({
                            ...cms.content.prePlanning,
                            checklistItems: [
                              ...cms.content.prePlanning.checklistItems,
                              "Specify personalized family memorial preferences",
                            ],
                          });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Add Checklist Item Option
                      </button>
                    </div>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: PRICE ESTIMATOR MATRIX */}
            {/* ========================================================================= */}
            {activeTab === "estimator" && (
              <div className="space-y-6">
                {/* Intro notice banner */}
                <div className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 text-xs text-[#D4AF37] shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Calculator className="h-4 w-4 text-[#D4AF37]" />
                    <span>Real-Time Public Estimator Pricing Engine</span>
                  </div>
                  <p className="mt-1 text-slate-300">
                    Modifying any number below will instantly update the interactive calculations, receipts, and WhatsApp estimate dispatches on the public calculator at{" "}
                    <Link to="/estimator" target="_blank" className="font-mono underline text-[#D4AF37] hover:text-white">
                      /estimator
                    </Link>.
                  </p>
                </div>

                {/* 1. Cemetery Vault Spaces */}
                <CMSSectionCard
                  title="1. Cemetery Vault Chamber Rates"
                  description="Standard vault spaces, companion vaults, and multi-tier plots in Garden of Peace."
                  icon={<TreePine className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateEstimator(cms.content.estimator);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("estimator")}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <CMSTextInput
                      label="Single Vault Space (₦)"
                      type="number"
                      value={cms.content.estimator.vaultSingle}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          vaultSingle: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Double Companion Vault (₦)"
                      type="number"
                      value={cms.content.estimator.vaultDouble}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          vaultDouble: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Triple Family Vault (₦)"
                      type="number"
                      value={cms.content.estimator.vaultTriple}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          vaultTriple: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </CMSSectionCard>

                {/* 2. Funeral Hearse & Car Rental */}
                <CMSSectionCard
                  title="2. Hearse & Motorcade Transport Rental"
                  description="Chauffeured luxury funeral coaches and police escort fleet services."
                  icon={<Car className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateEstimator(cms.content.estimator);
                    triggerGlobalToast();
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <CMSTextInput
                      label="Standard Hearse Transport Rental (₦)"
                      type="number"
                      value={cms.content.estimator.hearseStandard}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          hearseStandard: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Executive Hearse + Police Escort Motorcade (₦)"
                      type="number"
                      value={cms.content.estimator.hearseExecutiveEscort}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          hearseExecutiveEscort: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </CMSSectionCard>

                {/* 3. Caskets & Keepsakes */}
                <CMSSectionCard
                  title="3. Caskets & Memorial Crafts"
                  description="Polished hardwoods, executive caskets, and luxury bronze selections."
                  icon={<Package className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateEstimator(cms.content.estimator);
                    triggerGlobalToast();
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <CMSTextInput
                      label="Standard Polished Casket (₦)"
                      type="number"
                      value={cms.content.estimator.casketStandard}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          casketStandard: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Executive Hardwood Casket (₦)"
                      type="number"
                      value={cms.content.estimator.casketExecutive}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          casketExecutive: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Luxury Imperial Bronze Casket (₦)"
                      type="number"
                      value={cms.content.estimator.casketLuxuryBronze}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          casketLuxuryBronze: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </CMSSectionCard>

                {/* 4. Ceremony & Chapel Add-ons */}
                <CMSSectionCard
                  title="4. Ceremony Coordination, Chapel & Perpetual Care"
                  description="Pallbearers, memorial hall rental, HD livestreaming, and endowment maintenance."
                  icon={<Calculator className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateEstimator(cms.content.estimator);
                    triggerGlobalToast();
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <CMSTextInput
                      label="Pallbearers Uniformed Team (₦)"
                      type="number"
                      value={cms.content.estimator.pallbearersTeam}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          pallbearersTeam: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Chapel Hall Service Rental (₦)"
                      type="number"
                      value={cms.content.estimator.chapelRental}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          chapelRental: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="HD Multi-Camera Livestream (₦)"
                      type="number"
                      value={cms.content.estimator.livestreamProduction}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          livestreamProduction: Number(e.target.value),
                        })
                      }
                    />
                    <CMSTextInput
                      label="Perpetual Care Maintenance (₦)"
                      type="number"
                      value={cms.content.estimator.perpetualCareMaintenanceFee}
                      onChange={(e) =>
                        cms.updateEstimator({
                          ...cms.content.estimator,
                          perpetualCareMaintenanceFee: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: FAQ MANAGER */}
            {/* ========================================================================= */}
            {activeTab === "faq" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Frequently Asked Questions (FAQ) Manager"
                  description="Add, edit, or remove FAQs organized by category."
                  icon={<HelpCircle className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateFaq(cms.content.faq);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("faq")}
                >
                  <div className="space-y-4">
                    {cms.content.faq.faqs.map((f, idx) => (
                      <div
                        key={f.id || idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                            {f.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copy = cms.content.faq.faqs.filter((_, i) => i !== idx);
                              cms.updateFaq({ ...cms.content.faq, faqs: copy });
                            }}
                            className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 space-y-3">
                          <CMSTextInput
                            label="Question"
                            value={f.question}
                            onChange={(e) => {
                              const copy = [...cms.content.faq.faqs];
                              copy[idx] = { ...copy[idx]!, question: e.target.value };
                              cms.updateFaq({ ...cms.content.faq, faqs: copy });
                            }}
                          />
                          <CMSTextArea
                            label="Answer"
                            value={f.answer}
                            onChange={(e) => {
                              const copy = [...cms.content.faq.faqs];
                              copy[idx] = { ...copy[idx]!, answer: e.target.value };
                              cms.updateFaq({ ...cms.content.faq, faqs: copy });
                            }}
                            rows={3}
                            showCharCount={true}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newF = {
                          id: `f_${Date.now()}`,
                          category: "General" as const,
                          question: "What is the procedure for securing a memorial vault?",
                          answer:
                            "Our advisors assist with plot selection, documentation, and payment scheduling.",
                        };
                        cms.updateFaq({
                          ...cms.content.faq,
                          faqs: [...cms.content.faq.faqs, newF],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3D82]/50 bg-[#0E1A3D] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-[#162557] hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add New FAQ Item
                    </button>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: CONTACT & BRANCHES */}
            {/* ========================================================================= */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Branch Office Locations & Contact Cards"
                  description="Head office and park location details displayed on the Contact page."
                  icon={<PhoneCall className="h-5 w-5" />}
                  onSave={() => {
                    cms.updateContact(cms.content.contact);
                    triggerGlobalToast();
                  }}
                  onReset={() => cms.resetSection("contact")}
                >
                  <div className="space-y-4">
                    {cms.content.contact.branches.map((branch, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-4 text-slate-200"
                      >
                        <span className="text-xs font-bold uppercase text-[#D4AF37]">
                          Branch #{idx + 1}
                        </span>
                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <CMSTextInput
                            label="Branch Name"
                            value={branch.title}
                            onChange={(e) => {
                              const copy = [...cms.content.contact.branches];
                              copy[idx] = { ...copy[idx]!, title: e.target.value };
                              cms.updateContact({ ...cms.content.contact, branches: copy });
                            }}
                          />
                          <CMSTextInput
                            label="Phone Number"
                            value={branch.phone}
                            onChange={(e) => {
                              const copy = [...cms.content.contact.branches];
                              copy[idx] = { ...copy[idx]!, phone: e.target.value };
                              cms.updateContact({ ...cms.content.contact, branches: copy });
                            }}
                          />
                          <CMSTextInput
                            label="Operating Hours"
                            value={branch.hours}
                            onChange={(e) => {
                              const copy = [...cms.content.contact.branches];
                              copy[idx] = { ...copy[idx]!, hours: e.target.value };
                              cms.updateContact({ ...cms.content.contact, branches: copy });
                            }}
                          />
                          <CMSLinkField
                            label="Google Maps Direction Link"
                            value={branch.mapLink}
                            onChange={(val) => {
                              const copy = [...cms.content.contact.branches];
                              copy[idx] = { ...copy[idx]!, mapLink: val };
                              cms.updateContact({ ...cms.content.contact, branches: copy });
                            }}
                            isDevMode={isDevMode}
                            placeholder="https://maps.google.com/..."
                          />
                          <CMSTextArea
                            label="Physical Address"
                            value={branch.address}
                            onChange={(e) => {
                              const copy = [...cms.content.contact.branches];
                              copy[idx] = { ...copy[idx]!, address: e.target.value };
                              cms.updateContact({ ...cms.content.contact, branches: copy });
                            }}
                            className="sm:col-span-2"
                            rows={3}
                            showCharCount={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: OBITUARIES & TRIBUTES */}
            {/* ========================================================================= */}
            {activeTab === "obituaries" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Memorial Tributes & Obituaries Directory"
                  description="Publish new memorial profiles, edit existing biographies, manage condolence messages, and view memorial candle counts."
                  icon={<Flame className="h-5 w-5" />}
                  badge={`${obituaries.length} Profiles`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3D82]/30 pb-3">
                      <p className="text-xs text-slate-300">
                        Select a profile below to edit full life story, service times, and condolences.
                      </p>
                      <Link
                        to="/obituaries/create"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#D4AF37] px-3.5 py-1.5 text-xs font-bold text-[#0A1128] hover:bg-[#e6bf43] transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Create New Tribute Page
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {obituaries.map((obit) => (
                        <div
                          key={obit.id}
                          className="flex items-center gap-3 rounded-lg border border-[#1E3D82]/30 bg-[#070D1F] p-3 text-slate-200"
                        >
                          <img
                            src={obit.featuredImage}
                            alt={obit.fullName}
                            className="h-14 w-14 rounded-lg object-cover border border-[#1E3D82]/40"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-bold text-white">
                              {obit.fullName}
                            </h4>
                            <p className="text-xs text-slate-400">
                              Age {obit.age} • {obit.dateOfDeath}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-[11px] text-[#D4AF37]">
                              <Flame className="h-3 w-3" />
                              <span>{obit.candlesCount || 0} Candles</span>
                              <span>•</span>
                              <span>{obit.condolences?.length || 0} Condolences</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Link
                              to="/obituaries/$slug"
                              params={{ slug: obit.slug }}
                              target="_blank"
                              className="rounded p-1.5 text-slate-400 hover:bg-[#1E3D82]/30 hover:text-[#D4AF37] transition-colors"
                              title="View Tribute"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete tribute for "${obit.fullName}"?`
                                  )
                                ) {
                                  const updated = obituaries.filter((o) => o.id !== obit.id);
                                  setObituaries(updated);
                                  localStorage.setItem(
                                    "capetrust_obituaries_v1",
                                    JSON.stringify(updated)
                                  );
                                  triggerGlobalToast();
                                }
                              }}
                              className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                              title="Delete Tribute"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Restore default sample obituaries?")) {
                            setObituaries(INITIAL_OBITUARIES);
                            localStorage.setItem(
                              "capetrust_obituaries_v1",
                              JSON.stringify(INITIAL_OBITUARIES)
                            );
                            triggerGlobalToast();
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset Obituaries to Default Sample
                      </button>
                    </div>
                  </div>
                </CMSSectionCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: BACKUP, EXPORT & RESTORE */}
            {/* ========================================================================= */}
            {activeTab === "backup" && (
              <div className="space-y-6">
                <CMSSectionCard
                  title="Content Backup & Data Portability"
                  description="Export your complete website database to JSON format or restore from a backup file."
                  icon={<Download className="h-5 w-5" />}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Export Box */}
                      <div className="rounded-xl border border-[#1E3D82]/30 bg-[#070D1F] p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-[#D4AF37]/15 p-2 text-[#D4AF37]">
                            <Download className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">Export JSON Backup</h4>
                            <p className="text-xs text-slate-400">
                              Download full site content as a standalone .json file
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-400">
                          Contains all settings, home copy, about story, services, products,
                          estimator matrix, and FAQs.
                        </p>
                        <button
                          type="button"
                          onClick={handleExport}
                          className="mt-4 w-full justify-center rounded-lg bg-[#D4AF37] py-2 text-xs font-bold text-[#0A1128] hover:bg-[#e6bf43] shadow-md transition-colors cursor-pointer"
                        >
                          Download Backup (.json)
                        </button>
                      </div>

                      {/* Import Box */}
                      <div className="rounded-xl border border-[#1E3D82]/30 bg-[#070D1F] p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400">
                            <Upload className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">Restore from Backup</h4>
                            <p className="text-xs text-slate-400">
                              Import a previously downloaded Capetrust backup
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-400">
                          Select a valid Capetrust JSON file to restore all website content.
                        </p>
                        <label className="mt-4 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#1E3D82]/60 bg-[#0A122E] px-4 py-2 text-xs font-semibold text-slate-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                          <Upload className="mr-2 h-4 w-4" />
                          Select .json File to Restore
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImportFile}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Reset Entire Site Box */}
                    <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-rose-500/20 p-2 text-rose-400">
                          <RotateCcw className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-rose-200">
                            Reset Entire Website to Factory Defaults
                          </h4>
                          <p className="text-xs text-rose-300/70">
                            Revert all pages, services, products, and prices back to original state.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "WARNING: This will reset ALL website pages, pricing, and settings back to default. Continue?"
                              )
                            ) {
                              cms.resetAllToDefault();
                              triggerGlobalToast();
                            }
                          }}
                          className="rounded-lg bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-600 shadow-md cursor-pointer"
                        >
                          Reset All Content to Default
                        </button>
                      </div>
                    </div>
                  </div>
                </CMSSectionCard>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
