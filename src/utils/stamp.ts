import type { Category } from "../data/stops";

export interface StampImperfections {
  rotation: number;
  opacity: number;
}

function hashFromId(id: number): number {
  return ((id * 2654435761) >>> 0) % 100000;
}

export function getStampImperfections(stopId: number): StampImperfections {
  const h = hashFromId(stopId);
  const rotation = -8 + (h % 17);
  const opacity = 0.75 + ((h >> 4) % 16) * (0.15 / 15);

  return {
    rotation,
    opacity,
  };
}

export function getStampColor(category: Category): string {
  if (category === "buchszene" || category === "fiktiv") return "var(--stamp)";
  if (category === "rekonstruiert") return "var(--pencil)";
  return "var(--azulejo)";
}

export function shortenPlaceName(name: string, maxLen = 22): string {
  const upper = name.toUpperCase();
  if (upper.length <= maxLen) return upper;

  const truncated = upper.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLen * 0.45) {
    return truncated.slice(0, lastSpace);
  }
  return `${truncated.trim()}…`;
}

export function formatStampDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.`;
}
