import { PageHeader } from "@/components/PageHeader";
import { SurahCard } from "@/components/SurahCard";
import type { SurahSummary } from "@/utils/types";
import surahs from "@/data/surahs.json";

const list = surahs as SurahSummary[];

export default function SurahIndexPage() {
  return (
    <div>
      <PageHeader
        title="Surahs"
        description="All 114 chapters. Tap a surah to read — Arabic title with English name."
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-6">
        {list.map((s) => (
          <li key={s.id} className="min-w-0" suppressHydrationWarning>
            <SurahCard surah={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
