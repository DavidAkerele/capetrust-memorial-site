import React, { useState } from "react";
import {
  Calculator,
  Printer,
  Sparkles,
  MessageSquare,
  Check,
  AlertCircle,
  Lock,
  Car,
  Package,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cms/cms-store";

type EstimatorTab = "all" | "cemetery" | "funeral";

export function PriceEstimator() {
  const { content } = useCMS();
  const estimatorConfig = content.estimator;

  const [activeCategory, setActiveCategory] = useState<EstimatorTab>("all");

  // 1. Cemetery State
  const [includeCemetery, setIncludeCemetery] = useState<boolean>(true);
  const [vaultType, setVaultType] = useState<"single" | "double" | "triple" | "mausoleum">("single");
  const [finish, setFinish] = useState<"concrete" | "granite" | "pebble" | "flower">("concrete");
  const [headstone, setHeadstone] = useState<"none" | "single" | "double">("none");
  const [includeLgaDoc, setIncludeLgaDoc] = useState<boolean>(true);
  const [includeReopening, setIncludeReopening] = useState<boolean>(false);
  const [includeStreetNaming, setIncludeStreetNaming] = useState<boolean>(false);

  // 2. Funeral Transport & Car Rental State
  const [hearseOption, setHearseOption] = useState<"none" | "standard" | "executive" | "motorcade">("standard");

  // 3. Caskets & Memorial Products State
  const [casketOption, setCasketOption] = useState<"none" | "standard" | "executive" | "luxury">("standard");

  // 4. Ceremony & Chapel State
  const [includePallbearers, setIncludePallbearers] = useState<boolean>(true);
  const [includeChapel, setIncludeChapel] = useState<boolean>(false);
  const [includeLivestream, setIncludeLivestream] = useState<boolean>(false);

  const [highlightCalculated, setHighlightCalculated] = useState<boolean>(false);

  // Prices from CMS with sensible fallbacks
  const vaultPrices = {
    single: estimatorConfig?.vaultSingle || 4000000,
    double: estimatorConfig?.vaultDouble || 7000000,
    triple: estimatorConfig?.vaultTriple || 9800000,
    mausoleum: 14500000,
  };

  const finishPrices = {
    concrete: 150000,
    granite: 250000,
    pebble: 600000,
    flower: 500000,
  };

  const finishLabels = {
    concrete: "Concrete Sealed Top Slab",
    granite: "Polished Royal Granite Top",
    pebble: "Decorative Pebblestone Finish",
    flower: "Evergreen Floral Bed Finish",
  };

  const headstonePrices = {
    none: 0,
    single: 200000,
    double: 350000,
  };

  const lgaDocPrice = 20000;
  const reopeningPrice = 300000;
  const streetNamingPrice = 600000;

  // Funeral Transport & Car Rental
  const hearsePrices = {
    none: 0,
    standard: estimatorConfig?.hearseStandard || 450000,
    executive: estimatorConfig?.hearseExecutiveEscort || 850000,
    motorcade: 1350000,
  };

  // Caskets
  const casketPrices = {
    none: 0,
    standard: estimatorConfig?.casketStandard || 600000,
    executive: estimatorConfig?.casketExecutive || 1500000,
    luxury: estimatorConfig?.casketLuxuryBronze || 3500000,
  };

  // Ceremony
  const pallbearersPrice = estimatorConfig?.pallbearersTeam || 250000;
  const chapelRentalPrice = estimatorConfig?.chapelRental || 400000;
  const livestreamPrice = estimatorConfig?.livestreamProduction || 350000;

  const calculateTotal = () => {
    let total = 0;

    // Cemetery calculations
    if (includeCemetery && (activeCategory === "all" || activeCategory === "cemetery")) {
      total += vaultPrices[vaultType];
      total += finishPrices[finish];
      total += headstonePrices[headstone];
      if (includeLgaDoc) total += lgaDocPrice;
      if (includeReopening) total += reopeningPrice;
      if (includeStreetNaming) total += streetNamingPrice;
    }

    // Funeral & Transport calculations
    if (activeCategory === "all" || activeCategory === "funeral") {
      total += hearsePrices[hearseOption];
      total += casketPrices[casketOption];
      if (includePallbearers) total += pallbearersPrice;
      if (includeChapel) total += chapelRentalPrice;
      if (includeLivestream) total += livestreamPrice;
    }

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

  const generateWhatsAppMessage = () => {
    let msg = `Hello Capetrust, I generated an estimate on your website:\n`;
    if (includeCemetery && (activeCategory === "all" || activeCategory === "cemetery")) {
      msg += `\n*CEMETERY (Garden of Peace)*\n- Vault: ${vaultType.toUpperCase()} (${formatNaira(vaultPrices[vaultType])})\n- Finish: ${finishLabels[finish]} (${formatNaira(finishPrices[finish])})\n- Headstone: ${headstone.toUpperCase()} (${formatNaira(headstonePrices[headstone])})\n- LGA Documentation: ${includeLgaDoc ? "Yes" : "No"}`;
    }
    if (activeCategory === "all" || activeCategory === "funeral") {
      msg += `\n\n*FUNERAL & VEHICLE SERVICES*\n- Hearse / Transport: ${hearseOption.toUpperCase()} (${formatNaira(hearsePrices[hearseOption])})\n- Casket: ${casketOption.toUpperCase()} (${formatNaira(casketPrices[casketOption])})\n- Pallbearers Team: ${includePallbearers ? "Yes" : "No"}\n- Chapel Rental: ${includeChapel ? "Yes" : "No"}\n- HD Livestream: ${includeLivestream ? "Yes" : "No"}`;
    }
    msg += `\n\n*ESTIMATED TOTAL:* ${formatNaira(totalAmount)}\n\nI would like to speak with an advisor.`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="w-full space-y-10">
      {/* Category Mode Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-secondary/80 p-2 border border-border">
        <button
          type="button"
          onClick={() => {
            setActiveCategory("all");
            setIncludeCemetery(true);
            triggerCalculateHighlight();
          }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
            activeCategory === "all"
              ? "bg-[#0A122E] text-white shadow-md border border-[#D4AF37]/50"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <Layers className="size-4 text-[#D4AF37]" />
          All-Inclusive (Cemetery + Funeral Services)
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory("cemetery");
            setIncludeCemetery(true);
            triggerCalculateHighlight();
          }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
            activeCategory === "cemetery"
              ? "bg-[#1E3F20] text-white shadow-md border border-[#D4AF37]/50"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <Sparkles className="size-4 text-[#D4AF37]" />
          Cemetery &amp; Vault Grounds Only
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory("funeral");
            setIncludeCemetery(false);
            triggerCalculateHighlight();
          }}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
            activeCategory === "funeral"
              ? "bg-[#1E3D82] text-white shadow-md border border-[#D4AF37]/50"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <Car className="size-4 text-[#D4AF37]" />
          Car Rental, Caskets &amp; Funeral Services
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Interactive Selectors */}
        <div className="space-y-10 lg:col-span-7">
          {/* SECTION A: CEMETERY & VAULT (When Active) */}
          {(activeCategory === "all" || activeCategory === "cemetery") && (
            <div className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#1E3F20] text-xs font-bold text-white">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Cemetery Vault &amp; Plot Selection
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Permanent burial chambers at Garden of Peace™ Memorial Park
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#1E3F20]/10 px-3 py-1 text-[11px] font-bold text-[#1E3F20]">
                  Agbowa, Lagos
                </span>
              </div>

              {/* Vault Tiers */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Vault Configuration
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Single */}
                  <button
                    type="button"
                    onClick={() => {
                      setVaultType("single");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      vaultType === "single"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Single Unit Vault</span>
                      {vaultType === "single" && <Check className="size-4 text-[#415825]" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Single interment chamber</p>
                    <span className="mt-4 text-base font-bold text-[#1E3F20]">
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
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      vaultType === "double"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Double Companion Vault</span>
                      {vaultType === "double" && <Check className="size-4 text-[#415825]" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Two tiered interments</p>
                    <span className="mt-4 text-base font-bold text-[#1E3F20]">
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
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      vaultType === "triple"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Triple Family Vault</span>
                      {vaultType === "triple" && <Check className="size-4 text-[#415825]" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Three tiered chambers</p>
                    <span className="mt-4 text-base font-bold text-[#1E3F20]">
                      {formatNaira(vaultPrices.triple)}
                    </span>
                  </button>

                  {/* Private Mausoleum */}
                  <button
                    type="button"
                    onClick={() => {
                      setVaultType("mausoleum");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      vaultType === "mausoleum"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40"
                        : "border-border bg-background hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">★ Private Family Mausoleum</span>
                      {vaultType === "mausoleum" && <Check className="size-4 text-[#D4AF37]" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Dedicated multi-chamber sanctuary</p>
                    <span className="mt-4 text-base font-bold text-[#D4AF37]">
                      {formatNaira(vaultPrices.mausoleum)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Surface Finishes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Required Surface Surround Seal
                  </label>
                  <span className="text-[11px] font-bold text-[#415825]">Mandatory</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFinish("concrete");
                      triggerCalculateHighlight();
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      finish === "concrete"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-foreground">Concrete Sealed Slab</span>
                      <p className="text-[10px] text-muted-foreground">Standard masonry seal</p>
                    </div>
                    <span className="text-xs font-bold text-[#1E3F20]">+{formatNaira(finishPrices.concrete)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFinish("granite");
                      triggerCalculateHighlight();
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      finish === "granite"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-foreground">Polished Granite Top</span>
                      <p className="text-[10px] text-muted-foreground">Black / Royal granite</p>
                    </div>
                    <span className="text-xs font-bold text-[#1E3F20]">+{formatNaira(finishPrices.granite)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFinish("pebble");
                      triggerCalculateHighlight();
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      finish === "pebble"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-foreground">Decorative Pebbles</span>
                      <p className="text-[10px] text-muted-foreground">Stone surround</p>
                    </div>
                    <span className="text-xs font-bold text-[#1E3F20]">+{formatNaira(finishPrices.pebble)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFinish("flower");
                      triggerCalculateHighlight();
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      finish === "flower"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-foreground">Evergreen Flower Bed</span>
                      <p className="text-[10px] text-muted-foreground">Floral array finish</p>
                    </div>
                    <span className="text-xs font-bold text-[#1E3F20]">+{formatNaira(finishPrices.flower)}</span>
                  </button>
                </div>
              </div>

              {/* Headstones */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Memorial Headstone Marker
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => {
                      setHeadstone("none");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      headstone === "none"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">No Headstone</span>
                    <span className="mt-2 text-xs text-muted-foreground">₦0</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeadstone("single");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      headstone === "single"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">Single Upright</span>
                    <span className="mt-2 text-xs font-bold text-[#1E3F20]">+{formatNaira(headstonePrices.single)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeadstone("double");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      headstone === "double"
                        ? "border-[#415825] bg-[#415825]/10 ring-2 ring-[#415825]/30"
                        : "border-border bg-background hover:border-[#415825]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">Double Companion</span>
                    <span className="mt-2 text-xs font-bold text-[#1E3F20]">+{formatNaira(headstonePrices.double)}</span>
                  </button>
                </div>
              </div>

              {/* Documentation Checkboxes */}
              <div className="space-y-2.5 pt-2">
                <label className="flex cursor-pointer items-start justify-between rounded-xl border border-border bg-background p-3.5 hover:border-[#415825]/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={includeLgaDoc}
                      onChange={(e) => {
                        setIncludeLgaDoc(e.target.checked);
                        triggerCalculateHighlight();
                      }}
                      className="mt-0.5 size-4 rounded border-border text-[#415825] accent-[#415825]"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground">LGA Burial Documentation &amp; Certificate</span>
                      <p className="text-[11px] text-muted-foreground">Official registrar certification</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1E3F20]">+{formatNaira(lgaDocPrice)}</span>
                </label>
              </div>
            </div>
          )}

          {/* SECTION B: FUNERAL TRANSPORT & CAR RENTAL (When Active) */}
          {(activeCategory === "all" || activeCategory === "funeral") && (
            <div className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#1E3D82] text-xs font-bold text-white">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Hearse &amp; Funeral Motorcade Transport Rental
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Chauffeured luxury vehicles for dignified transport across Lagos and inter-state
                    </p>
                  </div>
                </div>
                <Car className="size-5 text-[#D4AF37]" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* None */}
                <button
                  type="button"
                  onClick={() => {
                    setHearseOption("none");
                    triggerCalculateHighlight();
                  }}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    hearseOption === "none"
                      ? "border-[#1E3D82] bg-[#1E3D82]/10 ring-2 ring-[#1E3D82]/30"
                      : "border-border bg-background hover:border-[#1E3D82]/50"
                  }`}
                >
                  <span className="text-xs font-bold text-foreground">No Transport Needed</span>
                  <p className="mt-1 text-[11px] text-muted-foreground">Arranged independently</p>
                  <span className="mt-4 text-xs font-semibold text-muted-foreground">₦0</span>
                </button>

                {/* Standard Hearse */}
                <button
                  type="button"
                  onClick={() => {
                    setHearseOption("standard");
                    triggerCalculateHighlight();
                  }}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    hearseOption === "standard"
                      ? "border-[#1E3D82] bg-[#1E3D82]/10 ring-2 ring-[#1E3D82]/30"
                      : "border-border bg-background hover:border-[#1E3D82]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Standard Hearse</span>
                    {hearseOption === "standard" && <Check className="size-3.5 text-[#1E3D82]" />}
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">Mercedes/Cadillac hearse</p>
                  <span className="mt-4 text-sm font-bold text-[#1E3D82]">
                    +{formatNaira(hearsePrices.standard)}
                  </span>
                </button>

                {/* Executive Escort */}
                <button
                  type="button"
                  onClick={() => {
                    setHearseOption("executive");
                    triggerCalculateHighlight();
                  }}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    hearseOption === "executive"
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40"
                      : "border-border bg-background hover:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Executive Escort</span>
                    {hearseOption === "executive" && <Check className="size-3.5 text-[#D4AF37]" />}
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">Hearse + Police Pilot Escort</p>
                  <span className="mt-4 text-sm font-bold text-[#D4AF37]">
                    +{formatNaira(hearsePrices.executive)}
                  </span>
                </button>
              </div>

              {/* SECTION C: CASKETS & CEREMONY */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="size-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Casket &amp; Keepsake Collection
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCasketOption("standard");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      casketOption === "standard"
                        ? "border-[#1E3D82] bg-[#1E3D82]/10 ring-2 ring-[#1E3D82]/30"
                        : "border-border bg-background hover:border-[#1E3D82]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">Standard Polished</span>
                    <span className="mt-2 text-xs font-bold text-[#1E3D82]">+{formatNaira(casketPrices.standard)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCasketOption("executive");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      casketOption === "executive"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40"
                        : "border-border bg-background hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">Solid Hardwood</span>
                    <span className="mt-2 text-xs font-bold text-[#D4AF37]">+{formatNaira(casketPrices.executive)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCasketOption("luxury");
                      triggerCalculateHighlight();
                    }}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      casketOption === "luxury"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/40"
                        : "border-border bg-background hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">Luxury Imperial Bronze</span>
                    <span className="mt-2 text-xs font-bold text-[#D4AF37]">+{formatNaira(casketPrices.luxury)}</span>
                  </button>
                </div>
              </div>

              {/* Ceremony Services Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Optional Ceremony Coordination
                </label>

                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-3 hover:border-[#1E3D82]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includePallbearers}
                        onChange={(e) => {
                          setIncludePallbearers(e.target.checked);
                          triggerCalculateHighlight();
                        }}
                        className="size-4 rounded border-border text-[#1E3D82] accent-[#1E3D82]"
                      />
                      <span className="text-xs font-bold text-foreground">Ceremonial Pallbearers Uniformed Team</span>
                    </div>
                    <span className="text-xs font-bold text-[#1E3D82]">+{formatNaira(pallbearersPrice)}</span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-3 hover:border-[#1E3D82]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeChapel}
                        onChange={(e) => {
                          setIncludeChapel(e.target.checked);
                          triggerCalculateHighlight();
                        }}
                        className="size-4 rounded border-border text-[#1E3D82] accent-[#1E3D82]"
                      />
                      <span className="text-xs font-bold text-foreground">On-Site Chapel Hall Rental for Service</span>
                    </div>
                    <span className="text-xs font-bold text-[#1E3D82]">+{formatNaira(chapelRentalPrice)}</span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-3 hover:border-[#1E3D82]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeLivestream}
                        onChange={(e) => {
                          setIncludeLivestream(e.target.checked);
                          triggerCalculateHighlight();
                        }}
                        className="size-4 rounded border-border text-[#1E3D82] accent-[#1E3D82]"
                      />
                      <span className="text-xs font-bold text-foreground">HD Multi-Camera Livestreaming &amp; Recording</span>
                    </div>
                    <span className="text-xs font-bold text-[#1E3D82]">+{formatNaira(livestreamPrice)}</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Itemized Receipt & Actions */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="eyebrow text-[#D4AF37]">Live Calculation</span>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Itemized Summary</h3>
                </div>
                <button
                  type="button"
                  onClick={triggerCalculateHighlight}
                  className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                  title="Recalculate total"
                >
                  <Calculator className="size-3.5 text-[#D4AF37]" />
                  <span>Update</span>
                </button>
              </div>

              {/* Line Items */}
              <div className="mt-6 space-y-2.5 text-xs sm:text-sm">
                {includeCemetery && (activeCategory === "all" || activeCategory === "cemetery") && (
                  <>
                    <div className="flex justify-between py-1 text-foreground/80">
                      <span>Vault ({vaultType.toUpperCase()})</span>
                      <span className="font-bold text-foreground">{formatNaira(vaultPrices[vaultType])}</span>
                    </div>
                    <div className="flex justify-between py-1 text-foreground/80">
                      <span>Finish ({finish})</span>
                      <span className="font-semibold text-foreground">{formatNaira(finishPrices[finish])}</span>
                    </div>
                    {headstone !== "none" && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>Headstone ({headstone})</span>
                        <span className="font-semibold text-foreground">{formatNaira(headstonePrices[headstone])}</span>
                      </div>
                    )}
                    {includeLgaDoc && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>LGA Documentation</span>
                        <span className="font-semibold text-foreground">{formatNaira(lgaDocPrice)}</span>
                      </div>
                    )}
                  </>
                )}

                {(activeCategory === "all" || activeCategory === "funeral") && (
                  <>
                    {hearseOption !== "none" && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>Hearse / Transport ({hearseOption})</span>
                        <span className="font-semibold text-foreground">{formatNaira(hearsePrices[hearseOption])}</span>
                      </div>
                    )}
                    {casketOption !== "none" && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>Casket ({casketOption})</span>
                        <span className="font-semibold text-foreground">{formatNaira(casketPrices[casketOption])}</span>
                      </div>
                    )}
                    {includePallbearers && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>Pallbearers Team</span>
                        <span className="font-semibold text-foreground">{formatNaira(pallbearersPrice)}</span>
                      </div>
                    )}
                    {includeChapel && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>Chapel Rental</span>
                        <span className="font-semibold text-foreground">{formatNaira(chapelRentalPrice)}</span>
                      </div>
                    )}
                    {includeLivestream && (
                      <div className="flex justify-between py-1 text-foreground/80">
                        <span>HD Livestream Production</span>
                        <span className="font-semibold text-foreground">{formatNaira(livestreamPrice)}</span>
                      </div>
                    )}
                  </>
                )}

                <div className="border-t border-border pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-foreground">Grand Total</span>
                    <span
                      className={`font-serif text-3xl font-bold transition-all duration-300 ${
                        highlightCalculated ? "text-[#D4AF37] scale-105" : "text-primary"
                      }`}
                    >
                      {formatNaira(totalAmount)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Itemized with total transparency. Guaranteed no hidden fees.
                  </p>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="mt-8 space-y-3">
                <Button asChild variant="gold" size="xl" className="w-full">
                  <a
                    href={`https://wa.me/2348026666655?text=${generateWhatsAppMessage()}`}
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
                  Print / Save Itemized PDF
                </Button>
              </div>

              {/* Pricing Disclaimer */}
              <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <AlertCircle className="size-3.5 text-[#D4AF37] shrink-0" />
                  <span>Custom Packages &amp; Installments</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Our family counselors are available 24/7 to tailor memorial packages, schedule vault viewings, and arrange structured payment schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
