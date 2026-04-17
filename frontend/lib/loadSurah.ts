import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { SurahDetail } from "@/lib/types";

/** Load surah JSON shipped with the Next app (build-time / SSG). */
export function loadSurahFromDisk(id: number): SurahDetail {
  const filePath = join(process.cwd(), "data", "surah", `${id}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SurahDetail;
}
