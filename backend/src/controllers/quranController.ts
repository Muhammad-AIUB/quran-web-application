import type { Context } from "hono";
import { quranService } from "../services/quranService.js";

export function listSurahs(c: Context) {
  return c.json({ data: quranService.getSurahs() });
}

export function getSurahById(c: Context) {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id < 1 || id > 114) {
    return c.json({ error: "Invalid surah id" }, 400);
  }
  const surah = quranService.getSurah(id);
  if (!surah) return c.json({ error: "Surah not found" }, 404);
  return c.json({ data: surah });
}

function parseLimit(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(200, Math.max(1, Math.trunc(n)));
}

const MAX_QUERY_LEN = 4000;

export function searchAyahs(c: Context) {
  let q = c.req.query("q") ?? "";
  if (q.length > MAX_QUERY_LEN) {
    q = q.slice(0, MAX_QUERY_LEN);
  }
  const limit = parseLimit(c.req.query("limit"), 120);
  const hits = quranService.search(q, limit);
  return c.json({ data: hits, query: q.trim() });
}
