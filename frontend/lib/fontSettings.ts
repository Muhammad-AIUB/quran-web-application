/** Shared bounds for reading settings (used by store + tests). */
export const ARABIC_SIZE_BOUNDS = { min: 20, max: 48, default: 28 } as const;
export const TRANSLATION_SIZE_BOUNDS = { min: 12, max: 26, default: 17 } as const;

export const ARABIC_FONT_IDS = ["amiri", "scheherazade"] as const;
export type ArabicFontId = (typeof ARABIC_FONT_IDS)[number];

export function clampArabicSize(n: number): number {
  if (!Number.isFinite(n)) return ARABIC_SIZE_BOUNDS.default;
  return Math.min(ARABIC_SIZE_BOUNDS.max, Math.max(ARABIC_SIZE_BOUNDS.min, n));
}

export function clampTranslationSize(n: number): number {
  if (!Number.isFinite(n)) return TRANSLATION_SIZE_BOUNDS.default;
  return Math.min(
    TRANSLATION_SIZE_BOUNDS.max,
    Math.max(TRANSLATION_SIZE_BOUNDS.min, n),
  );
}

export function sanitizeArabicFont(value: unknown): ArabicFontId {
  if (value === "amiri" || value === "scheherazade") return value;
  return "amiri";
}
