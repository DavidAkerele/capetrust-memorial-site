import React, { useState } from "react";
import {
  Calculator,
  Printer,
  Sparkles,
  MessageSquare,
  Check,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PriceEstimator() {
  const [vaultType, setVaultType] = useState<"single" | "double" | "triple">("single");
  const [finish, setFinish] = useState<"concrete" | "granite" | "pebble" | "flower">("concrete");
  const [headstone, setHeadstone] = useState<"none" | "single" | "double">("none");
  const [includeLgaDoc, setIncludeLgaDoc] = useState<boolean>(true);
  const [includeReopening, setIncludeReopening] = useState<boolean>(false);
  const [includeStreetNaming, setIncludeStreetNaming] = useState<boolean>(false);
  const [highlightCalculated, setHighlightCalculated] = useState<boolean>(false);

  const vaultPrices = {
    single: 4000000,
    double: 7000000,
    triple: 9800000,
  };

  const finishPrices = {
    concrete: 150000,
    granite: 250000,
    pebble: 600000,
    flower: 500000,
  };

  const finishLabels = {
    concrete: "Concrete Sealed Top Slab (Mandatory)",
    granite: "Polished Granite Top Slab",
    pebble: "Decorative Pebblestone Finish",
    flower: "Artificial Flower Bed Finish",
  };

  const headstonePrices = {
    none: 0,
    single: 200000,
    double: 350000,
  };

  const lgaDocPrice = 20000;
  const reopeningPrice = 300000;
  const streetNamingPrice = 600000;

  const calculateTotal = () => {
    let total = vaultPrices[vaultType];
    total += finishPrices[finish];
    total += headstonePrices[headstone];
    if (includeLgaDoc) total += lgaDocPrice;
    if (includeReopening) total += reopeningPrice;
    if (includeStreetNaming) total += streetNamingPrice;
    return total;
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const triggerCalculateHighlight = () => {
    setHighlightCalculated(true);
    setTimeout(() => setHighlightCalculated(false), 1500);
  };

  const totalAmount = calculateTotal();
  const whatsAppSummary = encodeURIComponent(
    `Hello Capetrust, I generated an estimate for Garden of Peace Memorial Park:\n- Vault: ${vaultType.toUpperCase()} Unit (${formatNaira(vaultPrices[vaultType])})\n- Mandatory Finish: ${finishLabels[finish]} (${formatNaira(finishPrices[finish])})\n- Headstone: ${headstone} (${formatNaira(headstonePrices[headstone])})\n- LGA Documentation: ${includeLgaDoc ? "Yes" : "No"}\n- Reopening Deposit: ${includeReopening ? "Yes" : "No"}\n- Street Naming: ${includeStreetNaming ? "Yes" : "No"}\n*Total Estimated:* ${formatNaira(totalAmount)}\n\nI would like to speak with an advisor.`
  );

  return (
    <div className="w-full space-y-10">
      {/* Package Discount Notice & Promo Info */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#D4AF37]/40 bg-primary p-6 text-primary-foreground shadow-soft sm:flex-row sm:p-8">
        <div className="space-y-1">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold sm:text-sm">
            <Sparkles className="size-4" />
            Flexible Payment &amp; Multi-Plot Discounts
          </h4>
          <p className="text-xs leading-relaxed text-primary-foreground/80 sm:text-sm">
            Pre-planning vaults qualify for installment options. Limited promotional Single Units currently available from ₦2,000,000 when reserving in advance.
          </p>
        </div>
        <Button asChild variant="gold" size="lg" className="shrink-0">
          <a
            href={`https://wa.me/2348026666655?text=${whatsAppSummary}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessageSquare className="size-4" />
            WhatsApp Estimate
          </a>
        </Button>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Interactive Selectors */}
        <div className="space-y-10 lg:col-span-7">
          {/* 1. Vault Type */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                Vault Chamber Selection
              </h3>
              <span className="text-xs text-muted-foreground">Permanent concrete construction</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Single */}
              <button
                type="button"
                onClick={() => {
                  setVaultType("single");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  vaultType === "single"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Single Unit</span>
                    {vaultType === "single" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Single chamber interment</p>
                </div>
                <span className={`mt-4 text-base font-bold ${vaultType === "single" ? "text-[#1E3F20]" : "text-primary"}`}>
                  {formatNaira(vaultPrices.single)}
                </span>
              </button>

              {/* Double */}
              <button
                type="button"
                onClick={() => {
                  setVaultType("double");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  vaultType === "double"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Double Unit</span>
                    {vaultType === "double" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Two interment chambers</p>
                </div>
                <span className={`mt-4 text-base font-bold ${vaultType === "double" ? "text-[#1E3F20]" : "text-primary"}`}>
                  {formatNaira(vaultPrices.double)}
                </span>
              </button>

              {/* Triple */}
              <button
                type="button"
                onClick={() => {
                  setVaultType("triple");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  vaultType === "triple"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Triple Unit</span>
                    {vaultType === "triple" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Three tier chambers</p>
                </div>
                <span className={`mt-4 text-base font-bold ${vaultType === "triple" ? "text-[#1E3F20]" : "text-primary"}`}>
                  {formatNaira(vaultPrices.triple)}
                </span>
              </button>
            </div>
          </div>

          {/* 2. Surface Finishes (Mandatory) */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                Surface &amp; Surround Finishes
              </h3>
              <span className="text-xs font-bold text-[#415825] bg-[#415825]/10 px-2.5 py-0.5 rounded-full">
                Mandatory burial surface seal
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              A durable protective surface finish is required following interment to seal and protect the burial chamber grounds.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setFinish("concrete");
                  triggerCalculateHighlight();
                }}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  finish === "concrete"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Concrete Sealed Top</span>
                    {finish === "concrete" && <Check className="size-3.5 text-[#415825]" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Standard required masonry seal</p>
                </div>
                <span className={`text-sm font-bold ${finish === "concrete" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(finishPrices.concrete)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFinish("granite");
                  triggerCalculateHighlight();
                }}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  finish === "granite"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Polished Granite Top</span>
                    {finish === "granite" && <Check className="size-3.5 text-[#415825]" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Black / Royal granite slab</p>
                </div>
                <span className={`text-sm font-bold ${finish === "granite" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(finishPrices.granite)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFinish("pebble");
                  triggerCalculateHighlight();
                }}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  finish === "pebble"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Decorative Pebblestone</span>
                    {finish === "pebble" && <Check className="size-3.5 text-[#415825]" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Gravel stone surround finish</p>
                </div>
                <span className={`text-sm font-bold ${finish === "pebble" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(finishPrices.pebble)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFinish("flower");
                  triggerCalculateHighlight();
                }}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  finish === "flower"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Artificial Flower Bed</span>
                    {finish === "flower" && <Check className="size-3.5 text-[#415825]" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Evergreen floral array</p>
                </div>
                <span className={`text-sm font-bold ${finish === "flower" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(finishPrices.flower)}
                </span>
              </button>
            </div>
          </div>

          {/* 3. Headstones & Inscriptions */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                Memorial Headstones
              </h3>
              <span className="text-xs text-muted-foreground">Engraved permanent memorial</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  setHeadstone("none");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  headstone === "none"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">No Headstone</span>
                    {headstone === "none" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Base marker only</p>
                </div>
                <span className="mt-4 text-xs font-semibold text-muted-foreground">₦0</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHeadstone("single");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  headstone === "single"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Single Headstone</span>
                    {headstone === "single" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Engraved upright monument</p>
                </div>
                <span className={`mt-4 text-sm font-bold ${headstone === "single" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(headstonePrices.single)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHeadstone("double");
                  triggerCalculateHighlight();
                }}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  headstone === "double"
                    ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                    : "border-border bg-background hover:border-[#415825]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Companion Headstone</span>
                    {headstone === "double" && <Check className="size-4 text-[#415825]" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Double width marker</p>
                </div>
                <span className={`mt-4 text-sm font-bold ${headstone === "double" ? "text-[#1E3F20]" : "text-primary"}`}>
                  +{formatNaira(headstonePrices.double)}
                </span>
              </button>
            </div>
          </div>

          {/* 4. Statutory & Premium Add-ons */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  4
                </span>
                Documentation &amp; Park Privileges
              </h3>
              <span className="text-xs text-muted-foreground">Official certifications</span>
            </div>

            <div className="space-y-3">
              {/* LGA Doc */}
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-[#415825]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeLgaDoc}
                    onChange={(e) => {
                      setIncludeLgaDoc(e.target.checked);
                      triggerCalculateHighlight();
                    }}
                    className="mt-1 size-4 rounded border-border text-[#415825] accent-[#415825]"
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground">Local Government (LGA) Burial Documentation</span>
                    <p className="text-xs text-muted-foreground">Official registrar documentation &amp; certificate processing</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">+{formatNaira(lgaDocPrice)}</span>
              </label>

              {/* Reopening Deposit */}
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-[#415825]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeReopening}
                    onChange={(e) => {
                      setIncludeReopening(e.target.checked);
                      triggerCalculateHighlight();
                    }}
                    className="mt-1 size-4 rounded border-border text-[#415825] accent-[#415825]"
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground">Chamber Re-opening Preparation</span>
                    <p className="text-xs text-muted-foreground">Professional mason fee for future 2nd or 3rd interment</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">+{formatNaira(reopeningPrice)}</span>
              </label>

              {/* Street Naming */}
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-[#415825]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeStreetNaming}
                    onChange={(e) => {
                      setIncludeStreetNaming(e.target.checked);
                      triggerCalculateHighlight();
                    }}
                    className="mt-1 size-4 rounded border-border text-[#415825] accent-[#415825]"
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground">Memorial Street Naming Commemoration</span>
                    <p className="text-xs text-muted-foreground">Permanent street signage honouring your loved one inside the park</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">+{formatNaira(streetNamingPrice)}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Itemized Receipt & Actions */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="eyebrow text-gold">Itemized Summary</span>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Estimated Quote</h3>
                </div>
                <button
                  type="button"
                  onClick={triggerCalculateHighlight}
                  className="flex items-center gap-1.5 rounded-full border border-[#415825]/30 bg-[#415825]/10 px-3 py-1 text-xs font-bold text-[#415825] hover:bg-[#415825]/20 transition-all"
                  title="Click to recalculate"
                >
                  <Calculator className="size-3.5 text-[#415825]" />
                  <span>Calculate Cost</span>
                </button>
              </div>

              {/* Line Items */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between py-1 text-foreground/80">
                  <span>Vault ({vaultType.toUpperCase()} Unit)</span>
                  <span className="font-semibold text-foreground">{formatNaira(vaultPrices[vaultType])}</span>
                </div>

                <div className="flex justify-between py-1 text-foreground/80">
                  <span className="capitalize">Finish ({finish})</span>
                  <span className="font-semibold text-foreground">{formatNaira(finishPrices[finish])}</span>
                </div>

                {headstone !== "none" && (
                  <div className="flex justify-between py-1 text-foreground/80">
                    <span className="capitalize">Headstone ({headstone})</span>
                    <span className="font-semibold text-foreground">{formatNaira(headstonePrices[headstone])}</span>
                  </div>
                )}

                {includeLgaDoc && (
                  <div className="flex justify-between py-1 text-foreground/80">
                    <span>LGA Burial Documentation</span>
                    <span className="font-semibold text-foreground">{formatNaira(lgaDocPrice)}</span>
                  </div>
                )}

                {includeReopening && (
                  <div className="flex justify-between py-1 text-foreground/80">
                    <span>Chamber Reopening Fee</span>
                    <span className="font-semibold text-foreground">{formatNaira(reopeningPrice)}</span>
                  </div>
                )}

                {includeStreetNaming && (
                  <div className="flex justify-between py-1 text-foreground/80">
                    <span>Memorial Street Naming</span>
                    <span className="font-semibold text-foreground">{formatNaira(streetNamingPrice)}</span>
                  </div>
                )}

                <div className="border-t border-border pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-foreground">Grand Total</span>
                    <span
                      className={`font-serif text-3xl font-bold transition-all duration-300 ${
                        highlightCalculated ? "text-[#415825] scale-105" : "text-primary"
                      }`}
                    >
                      {formatNaira(totalAmount)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Includes perpetual maintenance &amp; 24/7 security care at Garden of Peace™.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Button
                  type="button"
                  onClick={triggerCalculateHighlight}
                  className="w-full bg-[#1E3F20] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/30"
                >
                  <Calculator className="size-4" />
                  Calculate Live Price
                </Button>

                <Button asChild variant="gold" size="xl" className="w-full">
                  <a
                    href={`https://wa.me/2348026666655?text=${whatsAppSummary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="size-4" />
                    Send Estimate to Advisor
                  </a>
                </Button>

                <Button
                  type="button"
                  variant="outlineDark"
                  size="lg"
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Printer className="size-4" />
                  Print / Save as PDF
                </Button>
              </div>

              {/* Pricing Disclaimer */}
              <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-foreground/90 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <AlertCircle className="size-3.5 text-gold shrink-0" />
                  <span>Important Pricing Disclaimer</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The figures above are estimates subject to final site assessment, plot availability, and tailored family requirements. Mandatory finishes and documentation are itemized clearly with no hidden fees.
                </p>
              </div>

              {/* Secure Payment Policy Notice (No public bank numbers) */}
              <div className="mt-4 rounded-xl border border-border bg-secondary/60 p-4 text-xs text-foreground/80 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <Lock className="size-3.5 text-primary shrink-0" />
                  <span>Secure Account &amp; Billing Policy</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  To protect our clients, official Capetrust corporate banking details are never published on the public website. Payment details are issued exclusively on official invoices and booking confirmations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
