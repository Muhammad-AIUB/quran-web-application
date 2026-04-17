/** Join class names; skips falsy values. */
export function cn(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}
