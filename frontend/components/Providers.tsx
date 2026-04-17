"use client";

import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );
}
