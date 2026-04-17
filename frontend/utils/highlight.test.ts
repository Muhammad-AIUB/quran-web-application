import { describe, expect, it } from "vitest";
import { escapeRegExp, splitHighlight } from "./highlight";

describe("highlight", () => {
  it("escapeRegExp handles regex specials", () => {
    expect(escapeRegExp("a+b")).toBe("a\\+b");
    expect(escapeRegExp("what?")).toBe("what\\?");
  });

  it("splitHighlight empty query returns whole text as non-match", () => {
    expect(splitHighlight("Hello world", "   ")).toEqual([{ text: "Hello world", match: false }]);
  });

  it("splitHighlight marks case-insensitive matches", () => {
    const parts = splitHighlight("In the name of Allah", "name");
    const matched = parts.filter((p) => p.match).map((p) => p.text.toLowerCase());
    expect(matched.some((m) => m.includes("name"))).toBe(true);
  });

  it("splitHighlight survives odd queries", () => {
    const parts = splitHighlight("test !@# text", "!@#");
    expect(parts.length).toBeGreaterThan(0);
  });
});
