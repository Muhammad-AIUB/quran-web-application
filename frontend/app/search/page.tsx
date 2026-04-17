"use client";

import { HighlightedText } from "@/components/HighlightedText";
import { fetchSearch } from "@/lib/api";
import type { SearchHit } from "@/lib/types";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 320);
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeQuery = useMemo(() => debounced.trim(), [debounced]);

  useEffect(() => {
    if (!activeQuery) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchSearch(activeQuery, ac.signal)
      .then((data) => {
        if (!ac.signal.aborted) setResults(data);
      })
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setError("Could not search. Is the API running?");
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [activeQuery]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">Search</h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          Search Saheeh International English translations (powered by the API index).
        </p>
      </div>

      <div>
        <label htmlFor="q" className="sr-only">
          Search query
        </label>
        <input
          id="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. mercy, prayer, paradise…"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none ring-emerald-800/0 transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-800/15 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 dark:focus:border-emerald-500"
          autoComplete="off"
        />
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-500">
          Debounced ~320ms to keep the API calm while you type.
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-stone-500 dark:text-stone-400">Searching…</p>
      ) : null}

      {!loading && activeQuery && results.length === 0 ? (
        <p className="text-sm text-stone-600 dark:text-stone-400">No matches for that phrase.</p>
      ) : null}

      <ul className="space-y-4">
        {results.map((hit) => (
          <li
            key={`${hit.surahId}-${hit.ayahNumber}`}
            className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/surah/${hit.surahId}#${hit.surahId}-${hit.ayahNumber}`}
                className="text-sm font-semibold text-emerald-900 hover:underline dark:text-emerald-300"
              >
                {hit.surahTransliteration} · {hit.surahTranslation}{" "}
                <span className="text-stone-500 dark:text-stone-400">
                  ({hit.surahId}:{hit.ayahNumber})
                </span>
              </Link>
            </div>
            <p
              dir="rtl"
              lang="ar"
              className="mt-3 text-xl leading-relaxed text-stone-900 dark:text-stone-50"
              style={{ fontFamily: "var(--font-amiri), serif" }}
            >
              {hit.text}
            </p>
            <p
              className="mt-3 text-stone-700 dark:text-stone-300"
              style={{ lineHeight: 1.65 }}
            >
              <HighlightedText text={hit.translation} query={activeQuery} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
