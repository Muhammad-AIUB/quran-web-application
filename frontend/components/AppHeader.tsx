"use client";

import { SettingsDrawer } from "@/components/SettingsDrawer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/surah", label: "Surahs" },
  { href: "/search", label: "Search" },
];

export function AppHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-h-11 min-w-0 flex-col justify-center rounded-lg py-1 pr-2 leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span className="text-base font-semibold tracking-tight text-emerald-800 dark:text-emerald-400">
              Quran
            </span>
            <span className="hidden text-[11px] font-normal text-zinc-500 dark:text-zinc-400 sm:block">
              Read with clarity
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "min-h-11 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
              aria-label="Open reading settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.125 1.125 0 1 1-2.25 0m2.25 0a1.125 1.125 0 1 1-2.25 0M3.75 6h5.25m0 0a1.125 1.125 0 1 1-2.25 0m2.25 0a1.125 1.125 0 1 1-2.25 0m0 4.5h12.75m0 0a1.125 1.125 0 0 1-2.25 0m2.25 0a1.125 1.125 0 0 1-2.25 0M3.75 12h7.5m0 0a1.125 1.125 0 0 1-2.25 0m2.25 0a1.125 1.125 0 0 1-2.25 0m0 4.5h15.75m0 0a1.125 1.125 0 0 1-2.25 0m2.25 0a1.125 1.125 0 0 1-2.25 0M3.75 18h9.75m0 0a1.125 1.125 0 0 1-2.25 0m2.25 0a1.125 1.125 0 0 1-2.25 0"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-100 px-4 pb-3 pt-2 dark:border-zinc-900 md:hidden">
          <nav className="grid grid-cols-3 gap-2" aria-label="Mobile">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center justify-center rounded-xl px-2 py-2.5 text-center text-xs font-semibold transition",
                    active
                      ? "bg-emerald-600 text-white dark:bg-emerald-700"
                      : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
