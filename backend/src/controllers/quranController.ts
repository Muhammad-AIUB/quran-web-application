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

export function searchAyahs(c: Context) {
  const q = c.req.query("q") ?? "";
  const limitRaw = c.req.query("limit");
  const limit = limitRaw ? Math.min(200, Math.max(1, Number(limitRaw))) : 120;
  const hits = quranService.search(q, Number.isFinite(limit) ? limit : 120);
  return c.json({ data: hits, query: q.trim() });
}
