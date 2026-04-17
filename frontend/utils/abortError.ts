/** True when `fetch` or `AbortController` aborted the request. */
export function isAbortError(error: unknown): boolean {
  if (
    typeof DOMException !== "undefined" &&
    error instanceof DOMException &&
    error.name === "AbortError"
  ) {
    return true;
  }
  if (error instanceof Error && error.name === "AbortError") return true;
  return false;
}
