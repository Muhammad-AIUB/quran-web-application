import { describe, expect, it } from "vitest";
import { createApp } from "./createApp.js";

const app = createApp();

describe("HTTP API", () => {
  it("GET / returns HTML landing page", async () => {
    const res = await app.request("http://test/");
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("Quran API");
    expect(res.headers.get("content-type")).toMatch(/text\/html/);
  });

  it("GET /health", async () => {
    const res = await app.request("http://test/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe("ok");
  });

  it("GET /surahs returns 114", async () => {
    const res = await app.request("http://test/surahs");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: unknown[] };
    expect(body.data).toHaveLength(114);
  });

  it("GET /surah/1 returns verses", async () => {
    const res = await app.request("http://test/surah/1");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { verses: unknown[] } };
    expect(body.data.verses.length).toBeGreaterThan(0);
  });

  it("GET /search finds matches", async () => {
    const res = await app.request("http://test/search?q=mercy");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: unknown[] };
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("GET /search empty q returns empty data", async () => {
    const res = await app.request("http://test/search?q=");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: unknown[] };
    expect(body.data).toEqual([]);
  });

  it("GET /search is case-insensitive", async () => {
    const lower = await app.request("http://test/search?q=mercy&limit=5");
    const upper = await app.request("http://test/search?q=MERCY&limit=5");
    const a = ((await lower.json()) as { data: { translation: string }[] }).data;
    const b = ((await upper.json()) as { data: { translation: string }[] }).data;
    expect(a.length).toBe(b.length);
  });

  it("GET /search invalid limit falls back to default", async () => {
    const res = await app.request("http://test/search?q=god&limit=not-a-number");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: unknown[] };
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("GET /surah/999 returns 400", async () => {
    const res = await app.request("http://test/surah/999");
    expect(res.status).toBe(400);
  });

  it("GET /surah/abc returns 400", async () => {
    const res = await app.request("http://test/surah/abc");
    expect(res.status).toBe(400);
  });
});
