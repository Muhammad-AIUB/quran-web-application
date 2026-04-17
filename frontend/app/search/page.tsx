"use client";

import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultCard } from "@/components/SearchResultCard";
import { fetchSearch } from "@/utils/api";
import { isAbortError } from "@/utils/abortError";
import type { SearchHit } from "@/utils/types";
import { useDebouncedValue } from "@/utils/useDebouncedValue";
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
        if (isAbortError(e)) return;
        setError("Could not reach the search service. Check that the API is running.");
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [activeQuery]);

  const showEmpty =
    !loading && !error && activeQuery.length > 0 && results.length === 0;
  const showIdle = !activeQuery && !loading && !error;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Search"
        description="Find verses by English translation (Saheeh International). Results update as you type."
      />

      <div className="mx-auto max-w-2xl">
        <SearchBar id="q" value={query} onChange={setQuery} placeholder="e.g. mercy, prayer, paradise…" />
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Debounced ~320ms · partial matches · case insensitive
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
        >
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-12 text-zinc-500 dark:text-zinc-400">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-emerald-600 dark:border-zinc-700 dark:border-t-emerald-500"
            aria-hidden
          />
          <p className="text-sm font-medium">Searching…</p>
        </div>
      ) : null}

      {showIdle ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/80 px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="font-sans text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Type a word or phrase above to search translations.
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            Try <span className="font-medium text-emerald-800 dark:text-emerald-400">mercy</span>,{" "}
            <span className="font-medium text-emerald-800 dark:text-emerald-400">paradise</span>, or{" "}
            <span className="font-medium text-emerald-800 dark:text-emerald-400">prayer</span>.
          </p>
        </div>
      ) : null}

      {showEmpty ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="font-sans text-sm font-medium text-zinc-800 dark:text-zinc-200">No verses matched</p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            Try a shorter phrase or different wording.
          </p>
        </div>
      ) : null}

      {!loading && results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((hit) => (
            <SearchResultCard key={`${hit.surahId}-${hit.ayahNumber}`} hit={hit} highlightQuery={activeQuery} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
