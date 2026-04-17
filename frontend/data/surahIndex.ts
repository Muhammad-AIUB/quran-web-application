import type { SurahSummary } from "@/utils/types";
import raw from "./surahs.json";

function assertSurahType(value: string): SurahSummary["type"] {
  if (value === "meccan" || value === "medinan") return value;
  throw new Error(`Invalid surah type in surahs.json: ${value}`);
}

/** Surah list from `surahs.json` with validated `type` field. */
export const surahList: SurahSummary[] = raw.map((row) => ({
  id: row.id,
  name: row.name,
  transliteration: row.transliteration,
  translation: row.translation,
  type: assertSurahType(row.type),
  total_verses: row.total_verses,
}));
