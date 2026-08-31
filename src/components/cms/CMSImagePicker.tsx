import React, { useState, useRef } from "react";
import { Sparkles, Check, ExternalLink, Upload, Image as ImageIcon, X } from "lucide-react";
import { CMSField } from "./CMSField";

const PRESET_IMAGES = [
  { label: "Memorial Park Aerial / Lawns", url: "/images/hero-park.jpg" },
  { label: "On-Site Chapel Sanctuary", url: "/images/chapel.jpg" },
  { label: "Executive Hearse Fleet", url: "/images/hearse.jpg" },
  { label: "Memorial Flowers & Wreaths", url: "/images/flowers.jpg" },
  { label: "Private Family Sanctuary", url: "/images/memorial_estate_card_1778053361538.png" },
  { label: "Private Mausoleum Architecture", url: "/images/tranquil_spaces_2_1778053473712.png" },
  { label: "Tranquil Garden Walkways", url: "/images/tranquil_spaces_1_1778053447528.png" },
  { label: "Solar Security & 24/7 Care", url: "/images/visiting_guide_card_1778053407107.png" },
  { label: "Eco Solar Power & Energy", url: "/images/panyawat-auitpol-eq254Cqvmk8-unsplash.jpg" },
  { label: "Family Care & Comfort", url: "/images/family-comfort.jpg" },
  { label: "Memorial Advisor & Team", url: "/images/advisor.jpg" },
  { label: "Granite Vault Chamber", url: "/images/strauss-western-5a3eFHcGl9U-unsplash.jpg" },
];

interface CMSImagePickerProps {
  label: string;
  description?: string | undefined;
  value: string;
  onChange: (url: string) => void;
}

export function CMSImagePicker({ label, description, value, onChange }: CMSImagePickerProps) {
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CMSField label={label} description={description}>
      <div className="space-y-3">
        {/* URL Input & Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL (e.g. /images/... or https://...)"
            className="flex-1 min-w-[200px] rounded border border-[#1E3D82]/50 bg-[#070D1F] px-3.5 py-2 text-xs text-white shadow-inner focus:border-[#D4AF37] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37] placeholder:text-slate-500"
          />

          {/* Hidden File Input for Device Storage Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded border border-emerald-500/50 bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-all cursor-pointer shadow-sm"
            title="Upload image directly from your computer or phone storage"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="inline-flex items-center gap-1.5 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-2 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {showPresets ? "Hide Library" : "Preset Library"}
          </button>
        </div>

        {/* Preset Gallery Accordion */}
        {showPresets && (
          <div className="rounded border border-[#1E3D82]/40 bg-[#0E1A3D]/90 p-3 shadow-md">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#1E3D82]/30">
              <p className="text-xs font-semibold text-[#D4AF37]">
                Capetrust Verified Media Library:
              </p>
              <button
                type="button"
                onClick={() => setShowPresets(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setShowPresets(false);
                  }}
                  className={`group relative flex flex-col overflow-hidden rounded border text-left transition-all cursor-pointer ${
                    value === preset.url
                      ? "border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-sm"
                      : "border-[#1E3D82]/30 bg-[#070D1F] hover:border-[#D4AF37]/60"
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0A122E]">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {value === preset.url && (
                      <span className="absolute top-1 right-1 rounded-full bg-[#D4AF37] p-0.5 text-[#0A1128]">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <span className="p-1 text-[10px] font-medium leading-tight text-slate-200 truncate">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Visual Preview */}
        {value && (
          <div className="relative flex items-center gap-3 rounded border border-[#1E3D82]/40 bg-[#0E1A3D]/40 p-2">
            <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded border border-[#1E3D82]/50 bg-[#070D1F]">
              <img
                src={value}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/og-capetrust.png";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold text-[#D4AF37] uppercase">Active Image Source:</span>
              <p className="truncate text-xs font-mono text-slate-200 mt-0.5">
                {value.startsWith("data:") ? "Uploaded Local Storage Image (Ready to Save)" : value}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded p-1 text-slate-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors"
              title="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </CMSField>
  );
}
