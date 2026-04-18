"use client";

import { AyahBlock } from "@/components/AyahBlock";
import { useSettings } from "@/context/SettingsContext";
import type { Verse } from "@/utils/types";

/** One `useSettings()` for the list avoids hundreds of identical context subscriptions on long surahs. */
export function AyahList({ surahId, verses }: { surahId: number; verses: Verse[] }) {
  const { arabicFont, arabicSize, translationSize } = useSettings();

  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
      {verses.map((v) => (
        <AyahBlock
          key={v.id}
          verse={v}
          surahId={surahId}
          arabicFont={arabicFont}
          arabicSize={arabicSize}
          translationSize={translationSize}
        />
      ))}
    </div>
  );
}
