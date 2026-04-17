import { AyahList } from "@/components/AyahList";
import { ReadingContainer } from "@/components/ReadingContainer";
import { loadSurahFromDisk } from "@/utils/loadSurah";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1 || n > 114) return { title: "Surah" };
  try {
    const s = loadSurahFromDisk(n);
    return {
      title: `${s.transliteration} (${s.translation})`,
      description: `Read ${s.name} — ${s.total_verses} verses`,
    };
  } catch {
    return { title: "Surah" };
  }
}

export default async function SurahPage(props: Props) {
  const { id } = await props.params;
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1 || n > 114) notFound();

  let surah;
  try {
    surah = loadSurahFromDisk(n);
  } catch {
    notFound();
  }

  return (
    <div>
      <header className="mb-10 border-b border-zinc-200/90 pb-8 dark:border-zinc-800">
        <nav className="font-sans text-sm text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/surah"
                className="font-medium text-emerald-800 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Surahs
              </Link>
            </li>
            <li aria-hidden className="text-zinc-300 dark:text-zinc-600">
              /
            </li>
            <li className="text-zinc-600 dark:text-zinc-500">Surah {surah.id}</li>
          </ol>
        </nav>

        <h1
          dir="rtl"
          lang="ar"
          className="mt-6 text-center text-4xl font-normal leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-50"
          style={{ fontFamily: "var(--font-amiri), serif" }}
        >
          {surah.name}
        </h1>
        <p className="mt-4 text-center font-sans text-lg font-medium text-zinc-800 dark:text-zinc-200">
          {surah.transliteration}
        </p>
        <p className="mt-1 text-center font-sans text-base text-zinc-600 dark:text-zinc-400">
          {surah.translation}
        </p>
        <p className="mt-4 text-center font-sans text-sm text-zinc-500 dark:text-zinc-500">
          {surah.type === "meccan" ? "Meccan" : "Medinan"} · {surah.total_verses} verses
        </p>
      </header>

      <ReadingContainer>
        <AyahList surahId={surah.id} verses={surah.verses} />
      </ReadingContainer>
    </div>
  );
}
