import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

/** Main content column — max width, horizontal clip, responsive padding. */
export function AppShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main
      className={cn(
        "min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </main>
  );
}
