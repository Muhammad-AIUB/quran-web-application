"use client";

import {
  clampArabicSize,
  clampTranslationSize,
  sanitizeArabicFont,
  type ArabicFontId,
} from "@/utils/fontSettings";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "quran-web-settings";

export type { ArabicFontId };

type Settings = {
  arabicFont: ArabicFontId;
  arabicSize: number;
  translationSize: number;
};

const defaults: Settings = {
  arabicFont: "amiri",
  arabicSize: 28,
  translationSize: 17,
};

function loadFromStorage(): Settings {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const p = JSON.parse(raw) as Partial<Settings>;
    return {
      arabicFont: sanitizeArabicFont(p.arabicFont),
      arabicSize: clampArabicSize(Number(p.arabicSize)),
      translationSize: clampTranslationSize(Number(p.translationSize)),
    };
  } catch {
    return defaults;
  }
}

type SettingsContextValue = Settings & {
  setArabicFont: (f: ArabicFontId) => void;
  setArabicSize: (n: number) => void;
  setTranslationSize: (n: number) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  const setArabicFont = useCallback((arabicFont: ArabicFontId) => {
    setSettings((s) => ({ ...s, arabicFont: sanitizeArabicFont(arabicFont) }));
  }, []);

  const setArabicSize = useCallback((n: number) => {
    setSettings((s) => ({ ...s, arabicSize: clampArabicSize(n) }));
  }, []);

  const setTranslationSize = useCallback((n: number) => {
    setSettings((s) => ({ ...s, translationSize: clampTranslationSize(n) }));
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...settings,
      setArabicFont,
      setArabicSize,
      setTranslationSize,
    }),
    [settings, setArabicFont, setArabicSize, setTranslationSize],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
