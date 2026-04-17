import { AyahList } from "@/components/AyahList";
import { fetchSurah } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1 || n > 114) return { title: "Surah" };
  try {
    const s = await fetchSurah(n);
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
    surah = await fetchSurah(n);
  } catch {
    notFound();
  }

  return (
    <div>
      <div className="mb-8 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <Link href="/surah" className="hover:text-emerald-800 dark:hover:text-emerald-300">
            Surahs
          </Link>
          <span>/</span>
          <span>Surah {surah.id}</span>
        </div>
        <h1
          dir="rtl"
          lang="ar"
          className="mt-4 text-4xl font-semibold text-stone-900 dark:text-stone-50"
        >
          {surah.name}
        </h1>
        <p className="mt-2 text-xl font-medium text-stone-800 dark:text-stone-200">
          {surah.transliteration}{" "}
          <span className="text-stone-500 dark:text-stone-400">· {surah.translation}</span>
        </p>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          {surah.type === "meccan" ? "Meccan" : "Medinan"} · {surah.total_verses} verses
        </p>
      </div>

      <AyahList surahId={surah.id} verses={surah.verses} />
    </div>
  );
}
