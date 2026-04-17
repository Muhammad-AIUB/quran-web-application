export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function splitHighlight(text: string, query: string): { text: string; match: boolean }[] {
  const q = query.trim();
  if (!q) return [{ text, match: false }];
  try {
    const re = new RegExp(`(${escapeRegExp(q)})`, "gi");
    const parts = text.split(re);
    return parts.map((part) => ({
      text: part,
      match: part.toLowerCase() === q.toLowerCase(),
    }));
  } catch {
    return [{ text, match: false }];
  }
}
