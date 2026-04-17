import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Page not found</h1>
      <p className="mt-3 text-stone-600 dark:text-stone-400">
        That surah or route does not exist.
      </p>
      <Link
        href="/surah"
        className="mt-8 inline-flex rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white dark:bg-emerald-600"
      >
        Back to Surahs
      </Link>
    </div>
  );
}
