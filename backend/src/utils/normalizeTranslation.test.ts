import { describe, expect, it } from "vitest";
import { normalizeTranslation } from "./normalizeTranslation.js";

describe("normalizeTranslation", () => {
  it("lowercases ASCII", () => {
    expect(normalizeTranslation("Mercy")).toBe("mercy");
  });

  it("returns empty for non-strings", () => {
    expect(normalizeTranslation(null as unknown as string)).toBe("");
    expect(normalizeTranslation(undefined as unknown as string)).toBe("");
  });

  it("strips combining marks for loose matching", () => {
    expect(normalizeTranslation("café")).toBe("cafe");
  });
});
