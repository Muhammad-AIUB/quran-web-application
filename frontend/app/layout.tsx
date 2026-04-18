import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";
import { SettingsSidebarDesktop } from "@/components/SettingsSidebarDesktop";
import type { Metadata } from "next";
import { Amiri, Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const amiri = Amiri({
  weight: ["400"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

const scheherazade = Scheherazade_New({
  weight: ["400"],
  subsets: ["arabic"],
  variable: "--font-scheherazade",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Quran — Read & search",
    template: "%s · Quran",
  },
  description: "Read the Quran with English translation, search, and customizable typography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} min-h-screen overflow-x-hidden bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="flex min-h-screen min-w-0 flex-col lg:pr-80">
              <AppHeader />
              <AppShell>{children}</AppShell>
            </div>
            <SettingsSidebarDesktop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
