import { cn } from "@/utils/cn";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function SearchBar({
  id,
  value,
  onChange,
  placeholder = "Search translation…",
  className,
  disabled,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Search translations
      </label>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        id={id}
        type="search"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className={cn(
          "min-h-12 w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-12 pr-4 font-sans text-base text-zinc-900 shadow-sm outline-none transition",
          "placeholder:text-zinc-400",
          "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-500",
        )}
      />
    </div>
  );
}
