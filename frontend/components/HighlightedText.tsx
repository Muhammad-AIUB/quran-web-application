"use client";

import { splitHighlight } from "@/utils/highlight";

export function HighlightedText({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  const parts = splitHighlight(text, query);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.match ? (
          <mark
            key={i}
            className="rounded bg-emerald-100/90 px-0.5 font-medium text-inherit dark:bg-emerald-900/50 dark:text-emerald-100"
          >
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </span>
  );
}
