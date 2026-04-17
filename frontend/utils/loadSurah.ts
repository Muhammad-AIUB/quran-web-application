import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { SurahDetail } from "@/utils/types";

/** SSG: load `data/surah/{id}.json` at build time. */
export function loadSurahFromDisk(id: number): SurahDetail {
  const filePath = join(process.cwd(), "data", "surah", `${id}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SurahDetail;
}
