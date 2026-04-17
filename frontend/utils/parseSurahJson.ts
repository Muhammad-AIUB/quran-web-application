import type { SurahDetail, Verse } from "@/utils/types";

function isVerse(value: unknown): value is Verse {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    typeof o.text === "string" &&
    typeof o.translation === "string" &&
    typeof o.transliteration === "string"
  );
}

export function parseSurahDetailJson(raw: string): SurahDetail {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new Error("Invalid surah JSON: parse error");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid surah JSON: expected object");
  }
  const o = parsed as Record<string, unknown>;
  if (
    typeof o.id !== "number" ||
    typeof o.name !== "string" ||
    typeof o.transliteration !== "string" ||
    typeof o.translation !== "string" ||
    (o.type !== "meccan" && o.type !== "medinan") ||
    typeof o.total_verses !== "number" ||
    !Array.isArray(o.verses) ||
    !o.verses.every(isVerse)
  ) {
    throw new Error("Invalid surah JSON: unexpected shape");
  }
  const detail: SurahDetail = {
    id: o.id,
    name: o.name,
    transliteration: o.transliteration,
    translation: o.translation,
    type: o.type,
    total_verses: o.total_verses,
    verses: o.verses,
  };
  return detail;
}
