import { Hono } from "hono";
import { cors } from "hono/cors";
import { quranRoutes } from "./routes/quranRoutes.js";
import { quranService } from "./services/quranService.js";

export function createApp() {
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

  app.route("/", quranRoutes);

  return app;
}
