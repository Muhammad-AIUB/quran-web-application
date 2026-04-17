import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center sm:py-24">
      <p className="font-sans text-sm font-medium uppercase tracking-wider text-zinc-500">404</p>
      <h1 className="mt-2 font-sans text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md font-sans text-sm text-zinc-600 dark:text-zinc-400">
        That surah or address does not exist.
      </p>
      <Link
        href="/surah"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-600"
      >
        Back to Surahs
      </Link>
    </div>
  );
}
