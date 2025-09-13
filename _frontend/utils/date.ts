export function toLocalDateTime(
  input: string | null | undefined
): string | null {
  if (!input) return null;

  const date = new Date(input);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
