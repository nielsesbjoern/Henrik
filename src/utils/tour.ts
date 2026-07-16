import { fullTourOrder, riddleTourOrder, shortTourOrder, type Stop } from "../data/stops";

export type TourType = "full" | "short" | "riddle";

export interface RouteStop extends Stop {
  tourNumber: number;
}

function mapTourOrder(stops: Stop[], order: number[]): RouteStop[] {
  return order.flatMap((id, index) => {
    const stop = stops.find((s) => s.id === id);
    if (!stop) return [];
    return [{ ...stop, tourNumber: index + 1 }];
  });
}

export function getRouteStops(
  stops: Stop[],
  tourType: TourType,
  reversed = false,
): RouteStop[] {
  const order =
    tourType === "full"
      ? fullTourOrder
      : tourType === "riddle"
        ? riddleTourOrder
        : shortTourOrder;

  const directed = reversed ? [...order].reverse() : order;
  return mapTourOrder(stops, directed);
}
