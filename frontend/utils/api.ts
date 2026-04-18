import type { SearchHit } from "@/utils/types";
import { parseSearchApiResponse } from "@/utils/parseSearchResponse";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:8787";
}

/**
 * True in the browser when the page is served from a real host (e.g. Vercel) but the
 * bundle still uses the local API fallback — almost always means `NEXT_PUBLIC_API_URL`
 * was not set when `next build` ran.
 */
export function isDeployedSiteUsingLocalApiFallback(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  if (h === "localhost" || h === "127.0.0.1" || h === "[::1]") return false;
  try {
    const { hostname } = new URL(getApiBaseUrl());
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
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
