import type { SurahSummary } from "@/utils/types";
import Link from "next/link";

export function SurahCard({ surah }: { surah: SurahSummary }) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="group flex min-h-[4.5rem] w-full min-w-0 items-start justify-between gap-3 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm transition duration-200 hover:border-emerald-200 hover:shadow-md active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-800/60 md:min-h-0"
      suppressHydrationWarning
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span
            className="inline-flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-semibold tabular-nums text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            aria-hidden
          >
            {surah.id}
          </span>
          <span dir="rtl" lang="ar" className="text-lg font-medium leading-snug text-zinc-900 dark:text-zinc-50">
            {surah.name}
          </span>
        </div>
        <p
          className="mt-2 font-sans text-sm font-medium text-zinc-800 dark:text-zinc-200"
          suppressHydrationWarning
        >
          {surah.transliteration}
        </p>
        <p
          className="mt-0.5 font-sans text-sm text-zinc-600 dark:text-zinc-400"
          suppressHydrationWarning
        >
          {surah.translation}
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400">
        {surah.type === "meccan" ? "Meccan" : "Medinan"}
      </span>
    </Link>
  );
}
