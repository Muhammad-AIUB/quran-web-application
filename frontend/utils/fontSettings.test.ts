import { describe, expect, it } from "vitest";
import {
  clampArabicSize,
  clampTranslationSize,
  sanitizeArabicFont,
} from "./fontSettings";

describe("fontSettings", () => {
  it("clamps Arabic size to bounds", () => {
    expect(clampArabicSize(10)).toBe(20);
    expect(clampArabicSize(999)).toBe(48);
    expect(clampArabicSize(28)).toBe(28);
  });

  it("uses default when size is NaN", () => {
    expect(clampArabicSize(Number.NaN)).toBe(28);
    expect(clampTranslationSize(Number.NaN)).toBe(17);
  });

  it("clamps translation size", () => {
    expect(clampTranslationSize(1)).toBe(12);
    expect(clampTranslationSize(100)).toBe(26);
  });

  it("sanitizes font id", () => {
    expect(sanitizeArabicFont("amiri")).toBe("amiri");
    expect(sanitizeArabicFont("scheherazade")).toBe("scheherazade");
    expect(sanitizeArabicFont("hacker")).toBe("amiri");
    expect(sanitizeArabicFont(undefined)).toBe("amiri");
  });
});
