import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CMS_CONTENT } from "./default-content";
import type { CMSContent } from "./types";
import { getSupabaseClient } from "@/lib/supabase";

interface CMSContextType {
  content: CMSContent;
  isLoaded: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  flushSave: () => Promise<boolean>;
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

export async function getStoredCMSContent(): Promise<CMSContent> {
  const client = getSupabaseClient();
  if (!client) return DEFAULT_CMS_CONTENT;

  const { data, error } = await client
    .from("site_content")
    .select("content")
    .eq("id", "main")
    .maybeSingle();
  if (error) throw error;
  const parsed = data?.content as Partial<CMSContent> | undefined;
  if (!parsed) return DEFAULT_CMS_CONTENT;
  return {
    ...DEFAULT_CMS_CONTENT,
    ...parsed,
    settings: { ...DEFAULT_CMS_CONTENT.settings, ...parsed.settings },
    home: { ...DEFAULT_CMS_CONTENT.home, ...parsed.home },
    about: { ...DEFAULT_CMS_CONTENT.about, ...parsed.about },
    services: { ...DEFAULT_CMS_CONTENT.services, ...parsed.services },
    gardenOfPeace: { ...DEFAULT_CMS_CONTENT.gardenOfPeace, ...parsed.gardenOfPeace },
    memorialProducts: { ...DEFAULT_CMS_CONTENT.memorialProducts, ...parsed.memorialProducts },
    prePlanning: { ...DEFAULT_CMS_CONTENT.prePlanning, ...parsed.prePlanning },
    investment: { ...DEFAULT_CMS_CONTENT.investment, ...parsed.investment },
    estimator: { ...DEFAULT_CMS_CONTENT.estimator, ...parsed.estimator },
    faq: { ...DEFAULT_CMS_CONTENT.faq, ...parsed.faq },
    contact: { ...DEFAULT_CMS_CONTENT.contact, ...parsed.contact },
  };
}

export function CMSProvider({
  children,
  initialContent = DEFAULT_CMS_CONTENT,
}: {
  children: ReactNode;
  initialContent?: CMSContent;
}) {
  const [content, setContent] = useState<CMSContent>(initialContent);
  const [isLoaded] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestContent = useRef(initialContent);
  const saveQueue = useRef<Promise<boolean>>(Promise.resolve(true));

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible" || saveStatus === "saving") return;
      void getStoredCMSContent()
        .then((fresh) => {
          latestContent.current = fresh;
          setContent(fresh);
        })
        .catch(console.error);
    };
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, [saveStatus]);

  const flushSave = (): Promise<boolean> => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const snapshot = latestContent.current;
    setSaveStatus("saving");
    saveQueue.current = saveQueue.current
      .catch(() => false)
      .then(async () => {
        const client = getSupabaseClient();
        if (!client) {
          if (snapshot === latestContent.current) setSaveStatus("error");
          return false;
        }
        const { error } = await client
          .from("site_content")
          .upsert({ id: "main", content: snapshot });
        if (snapshot === latestContent.current) setSaveStatus(error ? "error" : "saved");
        if (error) console.error("Failed to save shared site content:", error);
        return !error;
      })
      .catch((error) => {
        if (snapshot === latestContent.current) setSaveStatus("error");
        console.error("Failed to save shared site content:", error);
        return false;
      });
    return saveQueue.current;
  };

  const saveContent = (newContent: CMSContent) => {
    const updated = { ...newContent, lastUpdated: new Date().toISOString() };
    latestContent.current = updated;
    setContent(updated);
    setSaveStatus("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void flushSave();
    }, 350);
  };

  const updateSection = <K extends keyof CMSContent>(sectionKey: K, data: CMSContent[K]) => {
    saveContent({
      ...latestContent.current,
      [sectionKey]: data,
    });
  };

  const updateSettings = (settings: CMSContent["settings"]) => updateSection("settings", settings);
  const updateHome = (home: CMSContent["home"]) => updateSection("home", home);
  const updateAbout = (about: CMSContent["about"]) => updateSection("about", about);
  const updateServices = (services: CMSContent["services"]) => updateSection("services", services);
  const updateGardenOfPeace = (gardenOfPeace: CMSContent["gardenOfPeace"]) =>
    updateSection("gardenOfPeace", gardenOfPeace);
  const updateMemorialProducts = (memorialProducts: CMSContent["memorialProducts"]) =>
    updateSection("memorialProducts", memorialProducts);
  const updatePrePlanning = (prePlanning: CMSContent["prePlanning"]) =>
    updateSection("prePlanning", prePlanning);
  const updateInvestment = (investment: CMSContent["investment"]) =>
    updateSection("investment", investment);
  const updateEstimator = (estimator: CMSContent["estimator"]) =>
    updateSection("estimator", estimator);
  const updateFaq = (faq: CMSContent["faq"]) => updateSection("faq", faq);
  const updateContact = (contact: CMSContent["contact"]) => updateSection("contact", contact);

  const resetSection = (sectionKey: keyof Omit<CMSContent, "version" | "lastUpdated">) => {
    saveContent({
      ...latestContent.current,
      [sectionKey]: DEFAULT_CMS_CONTENT[sectionKey],
    });
  };

  const resetAllToDefault = () => {
    saveContent(DEFAULT_CMS_CONTENT);
  };

  const exportJSON = (): string => {
    return JSON.stringify(latestContent.current, null, 2);
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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to parse JSON file.",
      };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoaded,
        saveStatus,
        flushSave,
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
      saveStatus: "idle",
      flushSave: async () => false,
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
