/** Normalizes translation text for case- and diacritic-insensitive substring search. */
export function normalizeTranslation(s: string): string {
  if (typeof s !== "string") return "";
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "");
}
