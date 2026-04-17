"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ArabicFontId = "amiri" | "scheherazade";

export interface SettingsState {
  arabicFont: ArabicFontId;
  arabicSize: number;
  translationSize: number;
  setArabicFont: (f: ArabicFontId) => void;
  setArabicSize: (n: number) => void;
  setTranslationSize: (n: number) => void;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFont: "amiri" as ArabicFontId,
      arabicSize: 28,
      translationSize: 17,
      setArabicFont: (arabicFont) => set({ arabicFont }),
      setArabicSize: (n) => set({ arabicSize: clamp(n, 20, 48) }),
      setTranslationSize: (n) => set({ translationSize: clamp(n, 12, 26) }),
    }),
    {
      name: "quran-web-settings",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
