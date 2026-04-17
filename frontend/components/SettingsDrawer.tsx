"use client";

import { SettingsPanel } from "@/components/SettingsPanel";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

/** Mobile / &lt; lg: bottom sheet with light transition. Desktop uses sidebar instead. */
export function SettingsDrawer({ open, onClose, title = "Reading settings", children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="settings-drawer-title">
      <button
        type="button"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] transition-opacity dark:bg-black/50"
        aria-label="Close settings"
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[min(90dvh,90vh)] flex-col overflow-hidden rounded-t-2xl border border-zinc-200/90 bg-white shadow-2xl",
          "transition-transform duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-950",
          "pt-2",
        )}
      >
        <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" aria-hidden />
        <div className="shrink-0 px-5 pt-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="settings-drawer-title" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 min-w-11 rounded-xl border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Done
            </button>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Preferences are saved in this browser only (localStorage).
          </p>
        </div>
        {/* min-h-0 + flex-1: required for overflow scrolling inside bottom sheets on iOS Safari */}
        <div
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]"
          style={{ touchAction: "pan-y" }}
        >
          {children ?? <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}
