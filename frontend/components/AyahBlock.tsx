"use client";

import type { ArabicFontId } from "@/context/SettingsContext";
import type { Verse } from "@/utils/types";
import { cn } from "@/utils/cn";
import { memo } from "react";

export const AyahBlock = memo(function AyahBlock({
  verse,
  surahId,
  arabicFont,
  arabicSize,
  translationSize,
}: {
  verse: Verse;
  surahId: number;
  arabicFont: ArabicFontId;
  arabicSize: number;
  translationSize: number;
}) {
  const arabicFamily =
    arabicFont === "amiri"
      ? "var(--font-amiri), serif"
      : "var(--font-scheherazade), serif";

  return (
    <article
      id={`${surahId}-${verse.id}`}
      className={cn(
        "group scroll-mt-28 rounded-2xl border border-transparent px-3 py-6 transition-colors sm:px-4",
        "hover:border-zinc-200/90 hover:bg-white hover:shadow-sm dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50",
        "[content-visibility:auto] [contain-intrinsic-size:auto_14rem]",
      )}
    >
      <div className="mb-4 flex justify-end sm:mb-5">
        <span
          className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border border-emerald-100 bg-emerald-50/90 px-2.5 text-xs font-semibold tabular-nums text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/60 dark:text-emerald-200"
          aria-label={`Verse ${verse.id}`}
        >
          {verse.id}
        </span>
      </div>

      <p
        dir="rtl"
        lang="ar"
        className="text-center leading-[2] text-zinc-900 dark:text-zinc-50"
        style={{
          fontFamily: arabicFamily,
          fontSize: `${arabicSize}px`,
          fontWeight: 400,
        }}
      >
        {verse.text}
      </p>

      <p
        className="mx-auto mt-6 max-w-2xl font-sans text-zinc-700 dark:text-zinc-300"
        style={{ fontSize: `${translationSize}px`, lineHeight: 1.7 }}
      >
        {verse.translation}
      </p>

      <p
        className="mx-auto mt-3 max-w-2xl font-sans text-zinc-500 dark:text-zinc-500"
        style={{ fontSize: `${Math.max(translationSize - 2, 12)}px`, lineHeight: 1.6 }}
      >
        {verse.transliteration}
      </p>
    </article>
  );
});
