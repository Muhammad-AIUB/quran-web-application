"use client";

import { cn } from "@/utils/cn";

type Props = {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  suffix?: string;
};

export function FontSizeSlider({ label, value, onChange, min, max, suffix = "px" }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="tabular-nums text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700",
          "accent-emerald-600",
          "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:shadow",
        )}
        aria-label={label}
      />
    </div>
  );
}
