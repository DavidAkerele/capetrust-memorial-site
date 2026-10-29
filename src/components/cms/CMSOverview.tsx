import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  Layers,
  Package,
  PhoneCall,
  Settings,
  TreePine,
} from "lucide-react";
import type { CMSContent } from "@/lib/cms/types";

type EditorKey =
  | "settings"
  | "home"
  | "about"
  | "services"
  | "gardenOfPeace"
  | "memorialProducts"
  | "prePlanning"
  | "investment"
  | "estimator"
  | "faq"
  | "contact"
  | "obituaries"
  | "backup";

interface CMSOverviewProps {
  content: CMSContent;
  obituaryCount: number;
  onNavigate: (key: EditorKey) => void;
  onExport: () => void;
}

export function CMSOverview({ content, obituaryCount, onNavigate, onExport }: CMSOverviewProps) {
  const lastSaved = content.lastUpdated
    ? new Date(content.lastUpdated).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No saved changes yet";

  const metrics = [
    {
      label: "Services",
      value: content.services.servicesList.length,
      icon: Layers,
      key: "services",
    },
    {
      label: "Vault tiers",
      value: content.gardenOfPeace.vaultTiers.length,
      icon: TreePine,
      key: "gardenOfPeace",
    },
    {
      label: "Collections",
      value: content.memorialProducts.collections.length,
      icon: Package,
      key: "memorialProducts",
    },
    { label: "Tributes in this browser", value: obituaryCount, icon: FileText, key: "obituaries" },
  ] as const;

  const editors = [
    {
      key: "home",
      title: "Home page",
      detail: "Hero, highlights and calls to action",
      icon: FileText,
    },
    {
      key: "services",
      title: "Funeral services",
      detail: "Service descriptions and imagery",
      icon: Layers,
    },
    {
      key: "gardenOfPeace",
      title: "Garden of Peace",
      detail: "Park information and vault tiers",
      icon: TreePine,
    },
    {
      key: "investment",
      title: "Family estates",
      detail: "Estate planning introduction",
      icon: TreePine,
    },
    {
      key: "memorialProducts",
      title: "Memorial products",
      detail: "Collections and product copy",
      icon: Package,
    },
    {
      key: "contact",
      title: "Contact details",
      detail: "Branches and emergency information",
      icon: PhoneCall,
    },
    { key: "faq", title: "FAQs", detail: "Answers to common questions", icon: HelpCircle },
  ] as const;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl border border-[#d8c18b]/25 bg-[#10244b] p-6 shadow-[0_18px_45px_rgba(3,12,31,0.25)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 size-64 rounded-full border border-white/10" />
        <div className="relative max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e5c771]">
            Content workspace
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome to Capetrust CMS
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
            Choose a section to review its content, update details, or prepare a backup of the
            changes published to the shared site.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#e0bd65] px-4 py-2.5 text-sm font-bold text-[#102044] transition hover:bg-[#f0d48f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Edit site content <ArrowRight className="size-4" />
            </button>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View website <ExternalLink className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="cms-overview-heading">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d5b96d]">
              At a glance
            </p>
            <h3
              id="cms-overview-heading"
              className="mt-1 font-serif text-2xl font-semibold text-white"
            >
              Content overview
            </h3>
          </div>
          <span className="text-xs text-slate-400">Last content update: {lastSaved}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon, key }) => (
            <button
              key={label}
              type="button"
              onClick={() => onNavigate(key)}
              className="group rounded-xl border border-white/10 bg-[#101d38] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#d8bd75]/50 hover:bg-[#142748] focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">{label}</span>
                <Icon className="size-4 text-[#d7bb75]" />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <strong className="font-serif text-3xl font-semibold tabular-nums text-white">
                  {value}
                </strong>
                <ArrowRight className="size-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#e0bd65]" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section
          aria-labelledby="cms-editors-heading"
          className="rounded-2xl border border-white/10 bg-[#101d38] p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d5b96d]">
                Edit content
              </p>
              <h3
                id="cms-editors-heading"
                className="mt-1 font-serif text-2xl font-semibold text-white"
              >
                Site sections
              </h3>
            </div>
            <span className="text-xs text-slate-400">Select a section</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {editors.map(({ key, title, detail, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate(key)}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#0c172d] p-3.5 text-left transition hover:border-[#d8bd75]/50 hover:bg-[#152a4d] focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#d7bb75]/10 text-[#d7bb75]">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm font-semibold text-white">{title}</strong>
                  <span className="mt-0.5 block text-xs leading-4 text-slate-400">{detail}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#e0bd65]" />
              </button>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#d8bd75]/25 bg-[#1b2c45] p-5">
            <Settings className="size-5 text-[#e0bd65]" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-white">Before you edit</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              This CMS currently saves content in your browser. Changes on one device are not shared
              with other visitors or staff.
            </p>
            <button
              type="button"
              onClick={onExport}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#e0bd65]/50 px-3 py-2 text-xs font-bold text-[#f0d48f] transition hover:bg-[#e0bd65]/10 focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
            >
              <Download className="size-4" />
              Download backup
            </button>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("settings")}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#101d38] p-4 text-left text-sm font-semibold text-white transition hover:border-[#d8bd75]/50 focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
          >
            Site settings <ArrowRight className="size-4 text-[#e0bd65]" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("backup")}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#101d38] p-4 text-left text-sm font-semibold text-white transition hover:border-[#d8bd75]/50 focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
          >
            Backups and reset <ArrowRight className="size-4 text-[#e0bd65]" />
          </button>
        </aside>
      </div>
    </div>
  );
}
