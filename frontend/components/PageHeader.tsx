import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-8 sm:mb-10", className)}>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
