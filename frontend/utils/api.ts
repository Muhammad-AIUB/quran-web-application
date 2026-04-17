import type { SearchHit } from "@/utils/types";
import { parseSearchApiResponse } from "@/utils/parseSearchResponse";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:8787";
}

export async function fetchSearch(
  q: string,
  signal?: AbortSignal,
): Promise<SearchHit[]> {
  const params = new URLSearchParams({ q });
  const res = await fetch(`${getApiBaseUrl()}/search?${params.toString()}`, {
    signal,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Search failed");
  const json: unknown = await res.json();
  return parseSearchApiResponse(json).data;
}
