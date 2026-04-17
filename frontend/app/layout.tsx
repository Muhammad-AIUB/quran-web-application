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
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-scheherazade",
  display: "swap",
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
              <footer className="border-t border-zinc-200/90 py-8 text-center dark:border-zinc-800">
                <p className="mx-auto max-w-6xl px-4 text-xs text-zinc-500 dark:text-zinc-500">
                  Text &amp; translations:{" "}
                  <a
                    className="font-medium text-emerald-800 underline decoration-zinc-300 underline-offset-2 hover:text-emerald-900 dark:text-emerald-400 dark:decoration-zinc-600"
                    href="https://github.com/risan/quran-json"
                    target="_blank"
                    rel="noreferrer"
                  >
                    risan/quran-json
                  </a>
                </p>
              </footer>
            </div>
            <SettingsSidebarDesktop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
