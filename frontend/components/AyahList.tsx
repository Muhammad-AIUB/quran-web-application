"use client";

import { memo } from "react";
import type { Verse } from "@/lib/types";
import { useSettingsStore } from "@/store/settingsStore";

const AyahRow = memo(function AyahRow({
  verse,
  surahId,
}: {
  verse: Verse;
  surahId: number;
}) {
  const arabicFont = useSettingsStore((s) => s.arabicFont);
  const arabicSize = useSettingsStore((s) => s.arabicSize);
  const translationSize = useSettingsStore((s) => s.translationSize);

  const arabicFamily =
    arabicFont === "amiri"
      ? "var(--font-amiri), serif"
      : "var(--font-scheherazade), serif";

  return (
    <article
      id={`${surahId}-${verse.id}`}
      className="scroll-mt-28 border-b border-stone-100 py-8 last:border-b-0 dark:border-stone-800/80"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="mt-1 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-emerald-700/10 px-2 text-xs font-semibold text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-200">
          {verse.id}
        </span>
      </div>
      <p
        dir="rtl"
        lang="ar"
        className="leading-[1.9] text-stone-900 dark:text-stone-50"
        style={{ fontFamily: arabicFamily, fontSize: `${arabicSize}px` }}
      >
        {verse.text}
      </p>
      <p
        className="mt-4 text-stone-700 dark:text-stone-300"
        style={{ fontSize: `${translationSize}px`, lineHeight: 1.65 }}
      >
        {verse.translation}
      </p>
      <p
        className="mt-2 text-sm italic text-stone-500 dark:text-stone-500"
        style={{ fontSize: `${Math.max(translationSize - 2, 12)}px` }}
      >
        {verse.transliteration}
      </p>
    </article>
  );
});

export function AyahList({ surahId, verses }: { surahId: number; verses: Verse[] }) {
  return (
    <div>
      {verses.map((v) => (
        <AyahRow key={v.id} verse={v} surahId={surahId} />
      ))}
    </div>
  );
}
