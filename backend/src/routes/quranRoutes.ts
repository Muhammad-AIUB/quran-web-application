import { Hono } from "hono";
import { getSurahById, listSurahs, searchAyahs } from "../controllers/quranController.js";

export const quranRoutes = new Hono();

quranRoutes.get("/surahs", listSurahs);
quranRoutes.get("/surah/:id", getSurahById);
quranRoutes.get("/search", searchAyahs);
