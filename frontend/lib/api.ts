export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:8787";
}

export async function fetchSurah(id: number): Promise<import("./types").SurahDetail> {
  const res = await fetch(`${getApiBaseUrl()}/surah/${id}`, {
    next: { revalidate: 86_400 },
  });
  if (!res.ok) throw new Error(`Failed to load surah ${id}`);
  const json = (await res.json()) as { data: import("./types").SurahDetail };
  return json.data;
}

export async function fetchSearch(
  q: string,
  signal?: AbortSignal,
): Promise<import("./types").SearchHit[]> {
  const params = new URLSearchParams({ q });
  const res = await fetch(`${getApiBaseUrl()}/search?${params.toString()}`, {
    signal,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Search failed");
  const json = (await res.json()) as { data: import("./types").SearchHit[] };
  return json.data;
}
