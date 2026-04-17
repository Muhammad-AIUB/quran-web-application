import { Hono } from "hono";
import { cors } from "hono/cors";
import { quranRoutes } from "./routes/quranRoutes.js";
import { quranService } from "./services/quranService.js";

export function createApp(): Hono {
  quranService.initialize();

  const app = new Hono();

  const corsOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    "/*",
    cors({
      origin: corsOrigins.length ? corsOrigins : "*",
      allowMethods: ["GET", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    }),
  );

  app.get("/health", (c) =>
    c.json({ status: "ok", service: "quran-api", timestamp: new Date().toISOString() }),
  );

  app.get("/", (c) =>
    c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Quran API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 36rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; color: #18181b; }
    a { color: #047857; }
    code { background: #f4f4f5; padding: 0.1rem 0.35rem; border-radius: 0.25rem; font-size: 0.9em; }
    ul { padding-left: 1.25rem; }
  </style>
</head>
<body>
  <h1>Quran API</h1>
  <p>This deployment is the JSON API only (no web UI here). Use:</p>
  <ul>
    <li><a href="/health"><code>/health</code></a> — liveness</li>
    <li><a href="/surahs"><code>/surahs</code></a> — surah index</li>
    <li><code>/surah/1</code> … <code>/surah/114</code> — full surah</li>
    <li><a href="/search?q=mercy"><code>/search?q=…</code></a> — translation search</li>
  </ul>
</body>
</html>`),
  );

  app.route("/", quranRoutes);

  return app;
}
