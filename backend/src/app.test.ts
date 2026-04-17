import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const app = createApp();

describe("HTTP API", () => {
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
});
