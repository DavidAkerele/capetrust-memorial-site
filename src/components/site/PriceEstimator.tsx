import React, { useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Copy,
  Building2,
  ShieldCheck,
  FileText,
  Printer,
  Sparkles,
  MessageSquare,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function PriceEstimator() {
  const [vaultType, setVaultType] = useState<"single" | "double" | "triple">("single");
  const [finish, setFinish] = useState<"none" | "granite" | "pebble" | "flower">("none");
  const [headstone, setHeadstone] = useState<"none" | "single" | "double">("none");
  const [includeLgaDoc, setIncludeLgaDoc] = useState<boolean>(true);
  const [includeReopening, setIncludeReopening] = useState<boolean>(false);
  const [includeStreetNaming, setIncludeStreetNaming] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  const vaultPrices = {
    single: 4000000,
    double: 7000000,
    triple: 9800000,
  };

  const finishPrices = {
    none: 0,
    granite: 250000,
    pebble: 600000,
    flower: 500000,
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalAmount = calculateTotal();
  const whatsAppSummary = encodeURIComponent(
    `Hello Capetrust, I generated an estimate for Garden of Peace Memorial Park:\n- Vault: ${vaultType.toUpperCase()} Unit (${formatNaira(vaultPrices[vaultType])})\n- Finish: ${finish} (${formatNaira(finishPrices[finish])})\n- Headstone: ${headstone} (${formatNaira(headstonePrices[headstone])})\n- LGA Documentation: ${includeLgaDoc ? "Yes" : "No"}\n- Reopening Deposit: ${includeReopening ? "Yes" : "No"}\n- Street Naming: ${includeStreetNaming ? "Yes" : "No"}\n*Total Estimated:* ${formatNaira(totalAmount)}\n\nI would like to speak with an advisor.`
  );

  return (
    <div className="w-full space-y-12">
      {/* Package Discount Notice */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold/40 bg-primary p-6 text-primary-foreground shadow-soft sm:flex-row sm:p-8">
        <div className="space-y-1">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold sm:text-sm">
            <Sparkles className="size-4" />
            Flexible Payment &amp; Family Discounts
          </h4>
          <p className="text-xs leading-relaxed text-primary-foreground/80 sm:text-sm">
            Pre-planning vaults qualify for up to 10% multi-plot family discounts and interest-free installment plans.
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
                onClick={() => setVaultType("single")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  vaultType === "single"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Single Unit</span>
                    {vaultType === "single" && <Check className="size-4 text-gold" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Single chamber interment</p>
                </div>
                <span className="mt-4 text-base font-bold text-primary">{formatNaira(vaultPrices.single)}</span>
              </button>

              {/* Double */}
              <button
                type="button"
                onClick={() => setVaultType("double")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  vaultType === "double"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Double Unit</span>
                    {vaultType === "double" && <Check className="size-4 text-gold" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Two tiered chambers (Couples)</p>
                </div>
                <span className="mt-4 text-base font-bold text-primary">{formatNaira(vaultPrices.double)}</span>
              </button>

              {/* Triple */}
              <button
                type="button"
                onClick={() => setVaultType("triple")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  vaultType === "triple"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Triple Unit</span>
                    {vaultType === "triple" && <Check className="size-4 text-gold" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Three tiered chambers (Family)</p>
                </div>
                <span className="mt-4 text-base font-bold text-primary">{formatNaira(vaultPrices.triple)}</span>
              </button>
            </div>
          </div>

          {/* 2. Surface Finishes */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                Surface &amp; Surround Finishes
              </h3>
              <span className="text-xs text-muted-foreground">Optional aesthetic upgrades</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setFinish("none")}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  finish === "none"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Standard Finished Top</span>
                  <p className="text-xs text-muted-foreground">Included in base price</p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">Included</span>
              </button>

              <button
                type="button"
                onClick={() => setFinish("granite")}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  finish === "granite"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Polished Granite Top</span>
                  <p className="text-xs text-muted-foreground">Black / Royal granite slab</p>
                </div>
                <span className="text-sm font-bold text-primary">+{formatNaira(finishPrices.granite)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFinish("pebble")}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  finish === "pebble"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Decorative Pebblestone Finish</span>
                  <p className="text-xs text-muted-foreground">Imported pebble gravel surround</p>
                </div>
                <span className="text-sm font-bold text-primary">+{formatNaira(finishPrices.pebble)}</span>
              </button>

              <button
                type="button"
                onClick={() => setFinish("flower")}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  finish === "flower"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Artificial Flower Bed Finish</span>
                  <p className="text-xs text-muted-foreground">Evergreen decorative floral array</p>
                </div>
                <span className="text-sm font-bold text-primary">+{formatNaira(finishPrices.flower)}</span>
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
                onClick={() => setHeadstone("none")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  headstone === "none"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">No Headstone</span>
                  <p className="mt-1 text-xs text-muted-foreground">Base flat marker only</p>
                </div>
                <span className="mt-4 text-xs font-semibold text-muted-foreground">₦0</span>
              </button>

              <button
                type="button"
                onClick={() => setHeadstone("single")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  headstone === "single"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Single Headstone</span>
                  <p className="mt-1 text-xs text-muted-foreground">Engraved upright monument</p>
                </div>
                <span className="mt-4 text-sm font-bold text-primary">+{formatNaira(headstonePrices.single)}</span>
              </button>

              <button
                type="button"
                onClick={() => setHeadstone("double")}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  headstone === "double"
                    ? "border-gold bg-gold/10 ring-2 ring-gold/40"
                    : "border-border bg-background hover:border-gold/50"
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-foreground">Companion Headstone</span>
                  <p className="mt-1 text-xs text-muted-foreground">Double width memorial marker</p>
                </div>
                <span className="mt-4 text-sm font-bold text-primary">+{formatNaira(headstonePrices.double)}</span>
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
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-gold/50">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeLgaDoc}
                    onChange={(e) => setIncludeLgaDoc(e.target.checked)}
                    className="mt-1 size-4 rounded border-border text-primary accent-primary"
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground">Local Government (LGA) Burial Documentation</span>
                    <p className="text-xs text-muted-foreground">Official registrar documentation &amp; certificate processing</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">+{formatNaira(lgaDocPrice)}</span>
              </label>

              {/* Reopening Deposit */}
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-gold/50">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeReopening}
                    onChange={(e) => setIncludeReopening(e.target.checked)}
                    className="mt-1 size-4 rounded border-border text-primary accent-primary"
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground">Chamber Re-opening Preparation</span>
                    <p className="text-xs text-muted-foreground">Professional mason fee for future 2nd or 3rd interment</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">+{formatNaira(reopeningPrice)}</span>
              </label>

              {/* Street Naming */}
              <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-4 hover:border-gold/50">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeStreetNaming}
                    onChange={(e) => setIncludeStreetNaming(e.target.checked)}
                    className="mt-1 size-4 rounded border-border text-primary accent-primary"
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
            <div className="rounded-2xl border border-gold/40 bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="eyebrow text-gold">Itemized Summary</span>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Estimated Quote</h3>
                </div>
                <Calculator className="size-6 text-gold" />
              </div>

              {/* Line Items */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between py-1 text-foreground/80">
                  <span>Vault ({vaultType.toUpperCase()} Unit)</span>
                  <span className="font-semibold text-foreground">{formatNaira(vaultPrices[vaultType])}</span>
                </div>

                {finish !== "none" && (
                  <div className="flex justify-between py-1 text-foreground/80">
                    <span className="capitalize">Finish ({finish})</span>
                    <span className="font-semibold text-foreground">{formatNaira(finishPrices[finish])}</span>
                  </div>
                )}

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
                    <span className="font-serif text-3xl font-bold text-primary">{formatNaira(totalAmount)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Includes perpetual maintenance &amp; 24/7 security care at Garden of Peace™.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
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

              {/* Direct Banking Info */}
              <div className="mt-6 rounded-xl border border-border/80 bg-secondary/50 p-4 text-xs text-foreground/80 space-y-2">
                <div className="flex items-center justify-between font-bold text-primary">
                  <span>Official Corporate Account</span>
                  <button
                    onClick={() => copyToClipboard("0123456789 - Zenith Bank")}
                    className="text-xs text-gold underline hover:text-primary flex items-center gap-1"
                  >
                    {copiedBank ? <CheckCircle2 className="size-3 text-green-600" /> : <Copy className="size-3" />}
                    {copiedBank ? "Copied" : "Copy Info"}
                  </button>
                </div>
                <p>Account Name: <strong className="text-foreground">Capetrust Global Funeral Services Ltd</strong></p>
                <p>Bank: <strong className="text-foreground">Zenith Bank Plc / Wema Bank</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
