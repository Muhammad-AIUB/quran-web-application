import { describe, expect, it, beforeAll } from "vitest";
import { QuranService } from "./quranService.js";

describe("QuranService", () => {
  const svc = new QuranService();

  beforeAll(() => {
    svc.initialize();
  });

  it("loads 114 surahs", () => {
    expect(svc.getSurahs()).toHaveLength(114);
  });

  it("returns Al-Fatihah with 7 verses", () => {
    const s = svc.getSurah(1);
    expect(s).not.toBeNull();
    expect(s!.verses).toHaveLength(7);
    expect(s!.verses[0].text.length).toBeGreaterThan(0);
  });

  it("finds translation matches", () => {
    const hits = svc.search("merciful", 20);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some((h) => h.translation.toLowerCase().includes("merciful"))).toBe(true);
  });

  it("returns empty for blank query", () => {
    expect(svc.search("   ")).toEqual([]);
  });
});
