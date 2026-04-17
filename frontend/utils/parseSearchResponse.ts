import type { SearchHit } from "@/utils/types";

export type SearchApiResponse = { data: SearchHit[] };

function isSearchHit(value: unknown): value is SearchHit {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.surahId === "number" &&
    typeof o.ayahNumber === "number" &&
    typeof o.surahNameArabic === "string" &&
    typeof o.surahTransliteration === "string" &&
    typeof o.surahTranslation === "string" &&
    typeof o.text === "string" &&
    typeof o.translation === "string" &&
    typeof o.transliteration === "string"
  );
}

export function parseSearchApiResponse(json: unknown): SearchApiResponse {
  if (!json || typeof json !== "object") {
    throw new Error("Invalid search response: expected object");
  }
  const o = json as Record<string, unknown>;
  if (!Array.isArray(o.data)) {
    throw new Error("Invalid search response: expected data array");
  }
  if (!o.data.every(isSearchHit)) {
    throw new Error("Invalid search response: malformed hit");
  }
  return { data: o.data };
}
