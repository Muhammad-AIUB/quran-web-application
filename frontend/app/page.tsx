import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-8 shadow-sm dark:border-emerald-500/10 dark:from-emerald-950/40 dark:via-stone-950 dark:to-stone-950">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
          Assalamu alaikum
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          A calm place to read the Quran
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
          Browse all 114 surahs, read ayahs with clear Arabic typography, search translations, and tune
          fonts to your preference. Built for speed with a small API and static surah metadata.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/surah"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Open Surah list
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
          >
            Search translations
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Readable typography",
            body: "Amiri and Scheherazade New, with adjustable Arabic and translation sizes.",
          },
          {
            title: "Fast surah list",
            body: "Surah metadata is baked into the build for instant navigation.",
          },
          {
            title: "Translation search",
            body: "Server-side index scans Saheeh International English text quickly.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/40"
          >
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
