import React, { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, Save, Check } from "lucide-react";

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
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReset && window.confirm(`Reset "${title}" to default site content?`)) {
      onReset();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#1E3D82]/30 bg-[#0A122E]/90 shadow-lg shadow-[#060B1C]/50 transition-all">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between border-b border-[#1E3D82]/25 bg-[#0E1A3D]/80 px-5 py-4 transition-colors hover:bg-[#132352]/90"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-[#D4AF37]">{icon}</div>}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-white">{title}</h3>
              {badge && (
                <span className="inline-flex items-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 text-[10px] font-semibold text-[#D4AF37]">
                  {badge}
                </span>
              )}
            </div>
            {description && <p className="text-xs text-slate-300/80 mt-0.5">{description}</p>}
          </div>
        </div>

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
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold shadow-md transition-all ${
                justSaved
                  ? "bg-emerald-600 text-white"
                  : "bg-[#D4AF37] text-[#0A1128] hover:bg-[#e6bf43] hover:shadow-[#D4AF37]/20"
              }`}
            >
              {justSaved ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  Save Section
                </>
              )}
            </button>
          )}

          <div className="p-1 text-[#D4AF37]">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* Body */}
      {isOpen && <div className="space-y-5 p-5 text-slate-200">{children}</div>}
    </div>
  );
}
