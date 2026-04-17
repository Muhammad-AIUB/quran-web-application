"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/surah", label: "Surahs" },
  { href: "/search", label: "Search" },
];

export function AppHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-emerald-900 dark:text-emerald-200">
              Quran
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">Read &amp; reflect</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800 lg:hidden"
              aria-label="Open settings"
            >
              Settings
            </button>
          </div>
        </div>

        <div className="border-t border-stone-100 px-4 py-2 sm:hidden dark:border-stone-900">
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-800 dark:bg-stone-900 dark:text-stone-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {settingsOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 p-4 sm:p-6">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close settings"
            onClick={() => setSettingsOpen(false)}
          />
          <aside className="relative z-10 w-full max-w-sm overflow-y-auto rounded-2xl border border-stone-200 bg-white p-5 shadow-2xl dark:border-stone-800 dark:bg-stone-950">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">Settings</h2>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-900"
              >
                Close
              </button>
            </div>
            <SettingsPanel />
          </aside>
        </div>
      ) : null}
    </>
  );
}
