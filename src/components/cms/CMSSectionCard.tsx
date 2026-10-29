import React, { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, Save } from "lucide-react";

interface CMSSectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  defaultOpen?: boolean;
  onSave?: () => void;
  onReset?: () => void;
  children: React.ReactNode;
}

export function CMSSectionCard({
  title,
  description,
  icon,
  badge,
  defaultOpen = true,
  onSave,
  onReset,
  children,
}: CMSSectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave();
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReset && window.confirm(`Reset "${title}" to default site content?`)) {
      onReset();
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101d38] shadow-[0_18px_40px_rgba(3,12,31,0.16)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#142541] px-5 py-4">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
        >
          {icon && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#d8bd75]/10 text-[#e0bd65]">
              {icon}
            </span>
          )}
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="block font-serif text-lg font-semibold tracking-tight text-white">
                {title}
              </span>
              {badge && (
                <span className="rounded-md border border-[#d8bd75]/30 bg-[#d8bd75]/10 px-2 py-0.5 text-[10px] font-semibold text-[#e0bd65]">
                  {badge}
                </span>
              )}
            </span>
            {description && (
              <span className="mt-0.5 block text-xs leading-5 text-slate-300">{description}</span>
            )}
          </span>
        </button>
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset this section to defaults"
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#1E3D82]/30 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {onSave && (
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0A1128] shadow-md transition-all hover:bg-[#e6bf43] hover:shadow-[#D4AF37]/20"
            >
              <Save className="h-3.5 w-3.5" />
              Save now
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
            aria-expanded={isOpen}
            className="rounded-md p-1 text-[#e0bd65] focus-visible:outline-2 focus-visible:outline-[#e0bd65]"
          >
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isOpen && <div className="space-y-5 p-5 text-slate-200 sm:p-6">{children}</div>}
    </section>
  );
}
