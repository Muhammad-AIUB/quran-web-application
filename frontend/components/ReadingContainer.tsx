import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

/** Centers reading column (~832px max) for ayah text — no horizontal overflow. */
export function ReadingContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full min-w-0 max-w-reading", className)}
    >
      {children}
    </div>
  );
}
