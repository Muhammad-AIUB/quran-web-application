"use client";

import { SettingsPanel } from "@/components/SettingsPanel";

/** Persistent settings column on large screens (submission: “Settings Panel / Sidebar”). */
export function SettingsSidebarDesktop() {
  return (
    <aside
      className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col overflow-y-auto border-l border-stone-200 bg-white/95 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950/95 lg:flex"
      aria-label="Settings sidebar"
    >
      <h2 className="mb-4 text-lg font-semibold text-stone-900 dark:text-stone-50">Settings</h2>
      <p className="mb-6 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        Arabic font, sizes, and translation size are saved in this browser (localStorage).
      </p>
      <SettingsPanel />
    </aside>
  );
}
