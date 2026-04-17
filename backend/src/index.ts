import { createApp } from "./app.js";
import type { Hono } from "hono";

let app: Hono | undefined;

/** Lazy init so missing `data/` does not crash module load on Vercel; first request builds the app. */
export default {
  fetch(request: Request, ...rest: [unknown?, unknown?]) {
    try {
      if (!app) {
        app = createApp();
      }
      return app.fetch(request, rest[0] as never, rest[1] as never);
    } catch (err) {
      console.error("Quran API init failed:", err);
      const message = err instanceof Error ? err.message : String(err);
      return new Response(
        JSON.stringify({ error: "server_init_failed", message }),
        { status: 500, headers: { "content-type": "application/json; charset=utf-8" } },
      );
    }
  },
};
