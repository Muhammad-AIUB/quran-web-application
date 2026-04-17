"use client";

import { FontSelector } from "@/components/FontSelector";
import { FontSizeSlider } from "@/components/FontSizeSlider";
import { useSettings } from "@/context/SettingsContext";
import { ARABIC_SIZE_BOUNDS, TRANSLATION_SIZE_BOUNDS } from "@/utils/fontSettings";

export function SettingsPanel() {
  const { arabicSize, translationSize, setArabicSize, setTranslationSize } = useSettings();

  return (
    <div className="space-y-8">
      <FontSelector />

      <FontSizeSlider
        label="Arabic size"
        value={arabicSize}
        onChange={setArabicSize}
        min={ARABIC_SIZE_BOUNDS.min}
        max={ARABIC_SIZE_BOUNDS.max}
      />

      <FontSizeSlider
        label="Translation size"
        value={translationSize}
        onChange={setTranslationSize}
        min={TRANSLATION_SIZE_BOUNDS.min}
        max={TRANSLATION_SIZE_BOUNDS.max}
      />
    </div>
  );
}
