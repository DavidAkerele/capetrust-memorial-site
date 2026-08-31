import React from "react";
import { Link as LinkIcon, Lock, Code2, ExternalLink } from "lucide-react";

interface CMSFieldProps {
  label: string;
  description?: string | undefined;
  badge?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}

export function CMSField({ label, description, badge, children, className = "" }: CMSFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-sans">
          {label}
        </label>
        {badge && (
          <span className="rounded bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
            {badge}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-slate-400">{description}</p>}
      <div className="pt-0.5">{children}</div>
    </div>
  );
}

interface CMSTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string | undefined;
  badge?: string | undefined;
  leftIcon?: React.ReactNode;
}

export function CMSTextInput({
  label,
  description,
  badge,
  leftIcon,
  className = "",
  ...props
}: CMSTextInputProps) {
  return (
    <CMSField label={label} description={description} badge={badge}>
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          {...props}
          className={`w-full rounded-lg border border-[#1E3D82]/50 bg-[#070D1F] px-4 py-2.5 text-sm text-white shadow-inner transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37] ${
            leftIcon ? "pl-9" : ""
          } ${className}`}
        />
      </div>
    </CMSField>
  );
}

interface CMSTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string | undefined;
  badge?: string | undefined;
  showCharCount?: boolean;
}

export function CMSTextArea({
  label,
  description,
  badge,
  rows = 4,
  showCharCount = true,
  className = "",
  value,
  ...props
}: CMSTextAreaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <CMSField label={label} description={description} badge={badge}>
      <div className="relative">
        <textarea
          rows={rows}
          value={value}
          {...props}
          className={`w-full rounded-lg border border-[#1E3D82]/50 bg-[#070D1F] p-4 text-sm leading-relaxed text-white shadow-inner transition-all placeholder:text-slate-500 focus:border-[#D4AF37] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37] ${className}`}
        />
        {showCharCount && (
          <div className="mt-1 flex justify-end">
            <span className="text-[11px] text-slate-300">
              {currentLength} characters
            </span>
          </div>
        )}
      </div>
    </CMSField>
  );
}

interface CMSLinkFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDevMode: boolean;
  description?: string;
  placeholder?: string;
}

export function CMSLinkField({
  label,
  value,
  onChange,
  isDevMode,
  description = "Target destination URL / Route path",
  placeholder = "/services",
}: CMSLinkFieldProps) {
  if (!isDevMode) {
    return (
      <div className="space-y-1.5 rounded-lg border border-[#1E3D82]/30 bg-[#0A122E]/80 p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <LinkIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
            {label}
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-[#1E3D82]/30 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            <Lock className="h-3 w-3" />
            Dev Mode Locked
          </span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <code className="text-xs font-mono text-[#D4AF37] truncate">{value || "(No link set)"}</code>
          <span className="text-[10px] text-slate-300">Enable Dev Mode in top bar to edit</span>
        </div>
      </div>
    );
  }

  return (
    <CMSField
      label={label}
      description={description}
      badge="Dev Mode Active"
    >
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 text-[#D4AF37]">
          <Code2 className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#D4AF37]/50 bg-[#070D1F] py-2.5 pl-9 pr-8 font-mono text-xs text-white shadow-inner focus:border-[#D4AF37] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37]"
        />
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-2.5 text-slate-400 hover:text-[#D4AF37]"
            title="Open test link"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </CMSField>
  );
}

interface CMSSwitchProps {
  label: string;
  description?: string | undefined;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CMSSwitch({ label, description, checked, onChange }: CMSSwitchProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#1E3D82]/40 bg-[#070D1F]/90 p-3.5 transition-all hover:border-[#1E3D82]/70">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
          {label}
        </span>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#0A122E] ${
          checked ? "bg-[#D4AF37]" : "bg-slate-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#0A122E] shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
