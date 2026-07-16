import type { Stop } from "../data/stops";

/**
 * Google Maps Directions URL (`maps/dir/?api=1`) allows origin + destination
 * plus at most 10 waypoints — i.e. 12 stops total per link.
 */
export const GOOGLE_MAPS_MAX_STOPS = 12;

export interface TourLeg {
  label: string;
  url: string;
}

/** Split a route into chunks that each fit Google Maps' waypoint limit. */
export function chunkStopsForDirections(
  stops: Stop[],
  maxStops = GOOGLE_MAPS_MAX_STOPS,
): Stop[][] {
  if (stops.length === 0) return [];
  if (maxStops < 2) return stops.map((s) => [s]);
  if (stops.length <= maxStops) return [stops];

  const chunks: Stop[][] = [];
  let start = 0;

  while (start < stops.length) {
    const remaining = stops.length - start;
    if (remaining <= maxStops) {
      chunks.push(stops.slice(start));
      break;
    }
    const end = start + maxStops;
    chunks.push(stops.slice(start, end));
    // Overlap last stop so legs chain continuously
    start = end - 1;
  }

  return chunks;
}

export function buildTourDirectionLegs(
  ordered: Stop[],
  labels: {
    single: string;
    part: (index: number, from: number, to: number) => string;
  },
): TourLeg[] {
  const chunks = chunkStopsForDirections(ordered);
  if (chunks.length === 0) return [];

  if (chunks.length === 1) {
    return [
      {
        label: labels.single,
        url: buildWalkingDirectionsUrl(chunks[0]),
      },
    ];
  }

  return chunks.map((chunk, index) => {
    const from = indexInTour(ordered, chunk[0]) + 1;
    const to = indexInTour(ordered, chunk[chunk.length - 1]) + 1;
    return {
      label: labels.part(index + 1, from, to),
      url: buildWalkingDirectionsUrl(chunk),
    };
  });
}

function indexInTour(ordered: Stop[], stop: Stop): number {
  return Math.max(
    0,
    ordered.findIndex((s) => s.id === stop.id),
  );
}

/** @deprecated Prefer buildTourDirectionLegs — kept for call-site migration. */
export function buildFullTourLegs(
  ordered: Stop[],
  labels: { all: string; leg1: string; leg2: string },
): TourLeg[] {
  return buildTourDirectionLegs(ordered, {
    single: labels.all,
    part: (index) =>
      index === 1 ? labels.leg1 : index === 2 ? labels.leg2 : labels.leg1,
  });
}

export function googleMapsSearchUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
}

export function buildWalkingDirectionsUrl(routeStops: Stop[]): string {
  if (routeStops.length === 0) return "";
  if (routeStops.length > GOOGLE_MAPS_MAX_STOPS) {
    if (import.meta.env.DEV) {
      console.warn(
        `[maps] Refusing Google Maps URL with ${routeStops.length} stops (max ${GOOGLE_MAPS_MAX_STOPS}). Chunk the route first.`,
      );
    }
    return buildWalkingDirectionsUrl(routeStops.slice(0, GOOGLE_MAPS_MAX_STOPS));
  }
  if (routeStops.length === 1) {
    return googleMapsDirectionsUrl(routeStops[0].lat, routeStops[0].lng);
  }

  const origin = `${routeStops[0].lat},${routeStops[0].lng}`;
  const destination = `${routeStops[routeStops.length - 1].lat},${routeStops[routeStops.length - 1].lng}`;
  const waypoints = routeStops
    .slice(1, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join("|");

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "walking",
  });
  if (waypoints) params.set("waypoints", waypoints);

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
