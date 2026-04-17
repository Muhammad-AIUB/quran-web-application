"use client";

import { AyahBlock } from "@/components/AyahBlock";
import type { Verse } from "@/utils/types";

export function AyahList({ surahId, verses }: { surahId: number; verses: Verse[] }) {
  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
      {verses.map((v) => (
        <AyahBlock key={v.id} verse={v} surahId={surahId} />
      ))}
    </div>
  );
}
