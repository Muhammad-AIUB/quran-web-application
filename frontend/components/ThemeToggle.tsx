"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white/60 dark:border-zinc-700 dark:bg-zinc-900/40" />
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
