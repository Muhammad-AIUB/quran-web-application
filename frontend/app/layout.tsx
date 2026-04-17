import { AppHeader } from "@/components/AppHeader";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import { Amiri, Scheherazade_New } from "next/font/google";
import "./globals.css";

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
    default: "Quran Web Application",
    template: "%s · Quran Web",
  },
  description: "Read the Quran with English translation, search, and customizable reading settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${amiri.variable} ${scheherazade.variable} min-h-screen bg-stone-50 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-50`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
            <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-500">
              Data:{" "}
              <a
                className="underline decoration-stone-400 underline-offset-2 hover:text-stone-700 dark:hover:text-stone-300"
                href="https://github.com/risan/quran-json"
                target="_blank"
                rel="noreferrer"
              >
                risan/quran-json
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
