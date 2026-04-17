import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { SearchHit, SearchIndexRow, SurahDetail, SurahSummary } from "../types.js";
import { normalizeTranslation } from "../utils/normalizeTranslation.js";

function defaultDataDir(): string {
  const fromEnv = process.env.DATA_DIR;
  if (fromEnv) return fromEnv;
  return join(process.cwd(), "data");
}

type RawSurahMeta = SurahSummary & { link?: string };

export class QuranService {
  private dataDir = defaultDataDir();
  private surahs: SurahSummary[] = [];
  private surahById = new Map<number, SurahDetail>();
  private searchIndex: SearchIndexRow[] = [];
  private initialized = false;

  initialize(): void {
    if (this.initialized) return;

    const surahsPath = join(this.dataDir, "surahs.json");
    const raw = JSON.parse(readFileSync(surahsPath, "utf-8")) as RawSurahMeta[];
    this.surahs = raw.map(({ link: _l, ...rest }) => rest);

    const rows: SearchIndexRow[] = [];

    for (const meta of this.surahs) {
      const path = join(this.dataDir, "surah", `${meta.id}.json`);
      const detail = JSON.parse(readFileSync(path, "utf-8")) as SurahDetail;
      this.surahById.set(meta.id, detail);

      for (const v of detail.verses) {
        const translationText = typeof v.translation === "string" ? v.translation : "";
        rows.push({
          surahId: meta.id,
          ayahNumber: v.id,
          surahNameArabic: detail.name,
          surahTransliteration: detail.transliteration,
          surahTranslation: detail.translation,
          text: typeof v.text === "string" ? v.text : "",
          translation: translationText,
          transliteration: typeof v.transliteration === "string" ? v.transliteration : "",
          translationNormalized: normalizeTranslation(translationText),
        });
      }
    }

    this.searchIndex = rows;
    this.initialized = true;
  }

  getSurahs(): SurahSummary[] {
    return this.surahs;
  }

  getSurah(id: number): SurahDetail | null {
    return this.surahById.get(id) ?? null;
  }

  search(query: string, limit = 120): SearchHit[] {
    const q = normalizeTranslation(query.trim());
    if (!q) return [];

    const hits: SearchHit[] = [];
    for (const row of this.searchIndex) {
      if (row.translationNormalized.includes(q)) {
        hits.push({
          surahId: row.surahId,
          ayahNumber: row.ayahNumber,
          surahNameArabic: row.surahNameArabic,
          surahTransliteration: row.surahTransliteration,
          surahTranslation: row.surahTranslation,
          text: row.text,
          translation: row.translation,
          transliteration: row.transliteration,
        });
        if (hits.length >= limit) break;
      }
    }
    return hits;
  }
}

export const quranService = new QuranService();
