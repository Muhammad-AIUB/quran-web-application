"use client";

import { SettingsPanel } from "@/components/SettingsPanel";

export function SettingsSidebarDesktop() {
  return (
    <aside
      className="sticky top-0 hidden h-screen w-[min(20rem,100%)] shrink-0 flex-col overflow-y-auto border-l border-zinc-200/90 bg-white/95 px-5 py-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/95 lg:flex"
      aria-label="Reading settings"
    >
      <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Reading</h2>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        Adjust typeface and sizes. Saved in this browser only.
      </p>
      <div className="mt-8">
        <SettingsPanel />
      </div>
    </aside>
  );
}
