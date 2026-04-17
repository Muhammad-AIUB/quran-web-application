"use client";

import { useSettingsStore, type ArabicFontId } from "@/store/settingsStore";

export function SettingsPanel() {
  const arabicFont = useSettingsStore((s) => s.arabicFont);
  const arabicSize = useSettingsStore((s) => s.arabicSize);
  const translationSize = useSettingsStore((s) => s.translationSize);
  const setArabicFont = useSettingsStore((s) => s.setArabicFont);
  const setArabicSize = useSettingsStore((s) => s.setArabicSize);
  const setTranslationSize = useSettingsStore((s) => s.setTranslationSize);

  const fonts: { id: ArabicFontId; label: string }[] = [
    { id: "amiri", label: "Amiri" },
    { id: "scheherazade", label: "Scheherazade New" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Arabic font
        </p>
        <div className="flex flex-col gap-2">
          {fonts.map((f) => (
            <label
              key={f.id}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 dark:border-stone-700"
            >
              <input
                type="radio"
                name="arabic-font"
                checked={arabicFont === f.id}
                onChange={() => setArabicFont(f.id)}
                className="accent-emerald-700"
              />
              <span className="text-sm">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Arabic size
          </p>
          <span className="text-xs text-stone-600 dark:text-stone-300">{arabicSize}px</span>
        </div>
        <input
          type="range"
          min={20}
          max={48}
          value={arabicSize}
          onChange={(e) => setArabicSize(Number(e.target.value))}
          className="w-full accent-emerald-700"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Translation size
          </p>
          <span className="text-xs text-stone-600 dark:text-stone-300">{translationSize}px</span>
        </div>
        <input
          type="range"
          min={12}
          max={26}
          value={translationSize}
          onChange={(e) => setTranslationSize(Number(e.target.value))}
          className="w-full accent-emerald-700"
        />
      </div>
    </div>
  );
}
