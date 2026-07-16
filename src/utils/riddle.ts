import type { RouteStop } from "./tour";

export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[.,;:!?„"»«'']/g, "")
    .replace(/\s+/g, " ");
}

export function checkAnswer(input: string, answers: string[]): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  return answers.some((a) => normalizeAnswer(a) === normalized);
}

export function isStopUnlocked(
  stopIndex: number,
  routeStops: RouteStop[],
  solvedIds: Set<number>,
  freeTour: boolean,
): boolean {
  if (freeTour) return true;
  if (stopIndex <= 0) return true;

  const prev = routeStops[stopIndex - 1];
  if (!prev?.riddle) return true;
  return solvedIds.has(prev.id);
}

export function getNextUnsolvedStop(
  routeStops: RouteStop[],
  solvedIds: Set<number>,
): RouteStop | null {
  return routeStops.find((s) => !solvedIds.has(s.id)) ?? null;
}
