import { cpSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "data");
const dest = join(root, "dist", "data");

if (!existsSync(src)) {
  console.warn("copy-data: backend/data missing, skipping");
  process.exit(0);
}
mkdirSync(dirname(dest), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("copy-data: data -> dist/data");
