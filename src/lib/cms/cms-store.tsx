import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_CMS_CONTENT } from "./default-content";
import type { CMSContent } from "./types";

const CMS_STORAGE_KEY = "capetrust_cms_data_v1";

interface CMSContextType {
  content: CMSContent;
  isLoaded: boolean;
  updateSection: <K extends keyof CMSContent>(sectionKey: K, data: CMSContent[K]) => void;
  updateSettings: (settings: CMSContent["settings"]) => void;
  updateHome: (home: CMSContent["home"]) => void;
  updateAbout: (about: CMSContent["about"]) => void;
  updateServices: (services: CMSContent["services"]) => void;
  updateGardenOfPeace: (gardenOfPeace: CMSContent["gardenOfPeace"]) => void;
  updateMemorialProducts: (products: CMSContent["memorialProducts"]) => void;
  updatePrePlanning: (prePlanning: CMSContent["prePlanning"]) => void;
  updateInvestment: (investment: CMSContent["investment"]) => void;
  updateEstimator: (estimator: CMSContent["estimator"]) => void;
  updateFaq: (faq: CMSContent["faq"]) => void;
  updateContact: (contact: CMSContent["contact"]) => void;
  resetSection: (sectionKey: keyof Omit<CMSContent, "version" | "lastUpdated">) => void;
  resetAllToDefault: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => { success: boolean; error?: string };
}

const CMSContext = createContext<CMSContextType | null>(null);

export function getStoredCMSContent(): CMSContent {
  if (typeof window === "undefined") {
    return DEFAULT_CMS_CONTENT;
  }
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(DEFAULT_CMS_CONTENT));
      return DEFAULT_CMS_CONTENT;
    }
    const parsed = JSON.parse(raw);
    // Merge shallowly with DEFAULT_CMS_CONTENT to ensure new fields in schema exist
    return {
      ...DEFAULT_CMS_CONTENT,
      ...parsed,
      settings: { ...DEFAULT_CMS_CONTENT.settings, ...(parsed.settings || {}) },
      home: { ...DEFAULT_CMS_CONTENT.home, ...(parsed.home || {}) },
      about: { ...DEFAULT_CMS_CONTENT.about, ...(parsed.about || {}) },
      services: { ...DEFAULT_CMS_CONTENT.services, ...(parsed.services || {}) },
      gardenOfPeace: { ...DEFAULT_CMS_CONTENT.gardenOfPeace, ...(parsed.gardenOfPeace || {}) },
      memorialProducts: { ...DEFAULT_CMS_CONTENT.memorialProducts, ...(parsed.memorialProducts || {}) },
      prePlanning: { ...DEFAULT_CMS_CONTENT.prePlanning, ...(parsed.prePlanning || {}) },
      investment: { ...DEFAULT_CMS_CONTENT.investment, ...(parsed.investment || {}) },
      estimator: { ...DEFAULT_CMS_CONTENT.estimator, ...(parsed.estimator || {}) },
      faq: { ...DEFAULT_CMS_CONTENT.faq, ...(parsed.faq || {}) },
      contact: { ...DEFAULT_CMS_CONTENT.contact, ...(parsed.contact || {}) },
    };
  } catch (err) {
    console.error("Error reading stored CMS content:", err);
    return DEFAULT_CMS_CONTENT;
  }
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CMSContent>(DEFAULT_CMS_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = getStoredCMSContent();
    setContent(loaded);
    setIsLoaded(true);

    // Listen to storage events for multi-tab sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CMS_STORAGE_KEY && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveContent = (newContent: CMSContent) => {
    const updated: CMSContent = {
      ...newContent,
      lastUpdated: new Date().toISOString(),
    };
    setContent(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save CMS content to localStorage:", err);
      }
    }
  };

  const updateSection = <K extends keyof CMSContent>(sectionKey: K, data: CMSContent[K]) => {
    saveContent({
      ...content,
      [sectionKey]: data,
    });
  };

  const updateSettings = (settings: CMSContent["settings"]) => updateSection("settings", settings);
  const updateHome = (home: CMSContent["home"]) => updateSection("home", home);
  const updateAbout = (about: CMSContent["about"]) => updateSection("about", about);
  const updateServices = (services: CMSContent["services"]) => updateSection("services", services);
  const updateGardenOfPeace = (gardenOfPeace: CMSContent["gardenOfPeace"]) => updateSection("gardenOfPeace", gardenOfPeace);
  const updateMemorialProducts = (memorialProducts: CMSContent["memorialProducts"]) =>
    updateSection("memorialProducts", memorialProducts);
  const updatePrePlanning = (prePlanning: CMSContent["prePlanning"]) => updateSection("prePlanning", prePlanning);
  const updateInvestment = (investment: CMSContent["investment"]) => updateSection("investment", investment);
  const updateEstimator = (estimator: CMSContent["estimator"]) => updateSection("estimator", estimator);
  const updateFaq = (faq: CMSContent["faq"]) => updateSection("faq", faq);
  const updateContact = (contact: CMSContent["contact"]) => updateSection("contact", contact);

  const resetSection = (sectionKey: keyof Omit<CMSContent, "version" | "lastUpdated">) => {
    saveContent({
      ...content,
      [sectionKey]: DEFAULT_CMS_CONTENT[sectionKey],
    });
  };

  const resetAllToDefault = () => {
    saveContent(DEFAULT_CMS_CONTENT);
  };

  const exportJSON = (): string => {
    return JSON.stringify(content, null, 2);
  };

  const importJSON = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object" || !parsed.settings || !parsed.home) {
        return { success: false, error: "Invalid Capetrust CMS backup format." };
      }
      saveContent({
        ...DEFAULT_CMS_CONTENT,
        ...parsed,
        version: DEFAULT_CMS_CONTENT.version,
        lastUpdated: new Date().toISOString(),
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to parse JSON file." };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoaded,
        updateSection,
        updateSettings,
        updateHome,
        updateAbout,
        updateServices,
        updateGardenOfPeace,
        updateMemorialProducts,
        updatePrePlanning,
        updateInvestment,
        updateEstimator,
        updateFaq,
        updateContact,
        resetSection,
        resetAllToDefault,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS(): CMSContextType {
  const context = useContext(CMSContext);
  if (!context) {
    // Return a safe fallback if accessed outside Provider
    return {
      content: DEFAULT_CMS_CONTENT,
      isLoaded: true,
      updateSection: () => {},
      updateSettings: () => {},
      updateHome: () => {},
      updateAbout: () => {},
      updateServices: () => {},
      updateGardenOfPeace: () => {},
      updateMemorialProducts: () => {},
      updatePrePlanning: () => {},
      updateInvestment: () => {},
      updateEstimator: () => {},
      updateFaq: () => {},
      updateContact: () => {},
      resetSection: () => {},
      resetAllToDefault: () => {},
      exportJSON: () => JSON.stringify(DEFAULT_CMS_CONTENT),
      importJSON: () => ({ success: false }),
    };
  }
  return context;
}
