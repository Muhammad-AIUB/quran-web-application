import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-950/30"
          aria-hidden
        />
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400">
          Assalamu alaikum
        </p>
        <h1 className="mt-4 max-w-2xl font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Read the Quran with clarity
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Elegant Arabic typography, faithful translation, and fast search — tuned for focus, on any device.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/surah"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.99] dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Browse surahs
          </Link>
          <Link
            href="/search"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Search translation
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {[
          {
            title: "Reading-first",
            body: "Adjust Arabic and translation sizes in the sidebar — saved locally in your browser.",
          },
          {
            title: "Static surah pages",
            body: "Open any chapter instantly with layouts optimized for long reading sessions.",
          },
          {
            title: "Translation search",
            body: "Find phrases across the English text with highlighted matches.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <h2 className="font-sans text-base font-semibold text-zinc-900 dark:text-zinc-50">{card.title}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
