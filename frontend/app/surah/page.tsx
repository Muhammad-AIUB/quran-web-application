import type { SurahSummary } from "@/lib/types";
import Link from "next/link";
import surahs from "@/data/surahs.json";

const list = surahs as SurahSummary[];

export default function SurahIndexPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">Surahs</h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          All 114 chapters. Arabic names with English titles from the dataset.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((s) => (
          <li key={s.id}>
            <Link
              href={`/surah/${s.id}`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-stone-200 bg-white/90 p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-emerald-700/60"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    {s.id}.
                  </span>
                  <span dir="rtl" lang="ar" className="text-lg text-stone-900 dark:text-stone-50">
                    {s.name}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                  {s.transliteration}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">{s.translation}</p>
              </div>
              <span className="mt-1 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] uppercase tracking-wide text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                {s.type}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
