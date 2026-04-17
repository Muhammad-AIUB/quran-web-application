"use client";

import { HighlightedText } from "@/components/HighlightedText";
import type { SearchHit } from "@/utils/types";
import Link from "next/link";

type Props = {
  hit: SearchHit;
  highlightQuery: string;
};

export function SearchResultCard({ hit, highlightQuery }: Props) {
  return (
    <li className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:border-emerald-200/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-emerald-900/50">
      <Link
        href={`/surah/${hit.surahId}#${hit.surahId}-${hit.ayahNumber}`}
        className="group block font-sans text-sm font-semibold text-emerald-800 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200"
      >
        <span>{hit.surahTransliteration}</span>
        <span className="font-normal text-zinc-500 dark:text-zinc-400"> · {hit.surahTranslation}</span>
        <span className="ml-1.5 tabular-nums text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {hit.surahId}:{hit.ayahNumber}
        </span>
      </Link>
      <p
        dir="rtl"
        lang="ar"
        className="mt-4 text-center text-xl leading-relaxed text-zinc-900 dark:text-zinc-50"
        style={{ fontFamily: "var(--font-amiri), serif" }}
      >
        {hit.text}
      </p>
      <p className="mx-auto mt-4 max-w-2xl font-sans text-zinc-700 dark:text-zinc-300" style={{ lineHeight: 1.7 }}>
        <HighlightedText text={hit.translation} query={highlightQuery} />
      </p>
    </li>
  );
}
