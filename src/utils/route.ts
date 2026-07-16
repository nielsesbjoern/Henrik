import type { Stop } from "../data/stops";
import { getTour } from "../data/cities";

export type TourType = "full" | "short" | "riddle" | "cascais";

export interface RouteStop extends Stop {
  tourNumber: number;
}

function mapTourOrder(stops: Stop[], order: number[]): RouteStop[] {
  const byId = new Map(stops.map((s) => [s.id, s]));
  const route: RouteStop[] = [];

  for (let index = 0; index < order.length; index++) {
    const stop = byId.get(order[index]);
    if (!stop) {
      if (import.meta.env.DEV) {
        console.warn(`[route] Missing stop id ${order[index]} in tour order`);
      }
      continue;
    }
    route.push({ ...stop, tourNumber: route.length + 1 });
  }

  if (import.meta.env.DEV && route.length !== order.length) {
    console.warn(
      `[route] Polyline point count ${route.length} ≠ stopIds.length ${order.length}`,
    );
  }

  return route;
}

export function getRouteStops(
  stops: Stop[],
  tourId: string,
  reversed = false,
): RouteStop[] {
  const found = getTour(tourId);
  if (!found) return [];
  const directed = reversed
    ? [...found.tour.stopIds].reverse()
    : found.tour.stopIds;
  return mapTourOrder(stops, directed);
}

/** Map tour id to CSS/layout variant used by Laufzettel & map export. */
export function tourIdToType(tourId: string): TourType {
  if (tourId === "lisboa-kurz") return "short";
  if (tourId === "lisboa-raetsel") return "riddle";
  if (tourId === "cascais") return "cascais";
  return "full";
}
