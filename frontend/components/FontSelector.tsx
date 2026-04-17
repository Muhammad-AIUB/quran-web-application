"use client";

import { useSettings, type ArabicFontId } from "@/context/SettingsContext";
import { cn } from "@/utils/cn";

const OPTIONS: { id: ArabicFontId; label: string; sample: string }[] = [
  { id: "amiri", label: "Amiri", sample: "بِسْمِ اللَّهِ" },
  { id: "scheherazade", label: "Scheherazade New", sample: "بِسْمِ اللَّهِ" },
];

export function FontSelector() {
  const { arabicFont, setArabicFont } = useSettings();

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Arabic typeface
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const selected = arabicFont === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setArabicFont(opt.id)}
              className={cn(
                "flex min-h-[3rem] flex-col items-start rounded-xl border px-3 py-2.5 text-left transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                selected
                  ? "border-emerald-300 bg-emerald-50/90 shadow-sm dark:border-emerald-700 dark:bg-emerald-950/40"
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:border-zinc-600",
              )}
            >
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{opt.label}</span>
              <span
                dir="rtl"
                lang="ar"
                className="mt-1 text-lg text-zinc-900 dark:text-zinc-100"
                style={{
                  fontFamily:
                    opt.id === "amiri"
                      ? "var(--font-amiri), serif"
                      : "var(--font-scheherazade), serif",
                }}
              >
                {opt.sample}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
