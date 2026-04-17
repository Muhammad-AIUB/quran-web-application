"use client";

import {
  clampArabicSize,
  clampTranslationSize,
  sanitizeArabicFont,
  type ArabicFontId,
} from "@/lib/fontSettings";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type { ArabicFontId };

export interface SettingsState {
  arabicFont: ArabicFontId;
  arabicSize: number;
  translationSize: number;
  setArabicFont: (f: ArabicFontId) => void;
  setArabicSize: (n: number) => void;
  setTranslationSize: (n: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFont: "amiri" as ArabicFontId,
      arabicSize: 28,
      translationSize: 17,
      setArabicFont: (arabicFont) => set({ arabicFont: sanitizeArabicFont(arabicFont) }),
      setArabicSize: (n) => set({ arabicSize: clampArabicSize(n) }),
      setTranslationSize: (n) => set({ translationSize: clampTranslationSize(n) }),
    }),
    {
      name: "quran-web-settings",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) return;
        state.arabicFont = sanitizeArabicFont(state.arabicFont);
        state.arabicSize = clampArabicSize(state.arabicSize);
        state.translationSize = clampTranslationSize(state.translationSize);
      },
    },
  ),
);
