import type { Stop } from "../data/stops";

/**
 * Soft cap for a single path-style Maps URL (under the 2 048-character limit).
 * Used for the “complete tour” option.
 */
export const GOOGLE_MAPS_MAX_STOPS = 25;

/**
 * Google Maps product UI reliably shows about 10 destinations per route.
 * Longer tours also get stage links sized to this limit.
 */
export const GOOGLE_MAPS_RELIABLE_STOPS = 10;

export interface TourLeg {
  label: string;
  url: string;
}

/** Split a route into chunks that each fit a single Google Maps directions URL. */
export function chunkStopsForDirections(
  stops: Stop[],
  maxStops = GOOGLE_MAPS_RELIABLE_STOPS,
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
    /** Offered first when the tour needs multiple reliable stages. */
    complete: string;
    part: (index: number, from: number, to: number) => string;
  },
): TourLeg[] {
  if (ordered.length === 0) return [];

  const completeUrl = buildWalkingDirectionsUrl(ordered);
  const chunks = chunkStopsForDirections(ordered, GOOGLE_MAPS_RELIABLE_STOPS);

  if (chunks.length === 1) {
    return [
      {
        label: labels.single,
        url: completeUrl,
      },
    ];
  }

  return [
    {
      label: labels.complete,
      url: completeUrl,
    },
    ...chunks.map((chunk, index) => {
      const from = indexInTour(ordered, chunk[0]) + 1;
      const to = indexInTour(ordered, chunk[chunk.length - 1]) + 1;
      return {
        label: labels.part(index + 1, from, to),
        url: buildWalkingDirectionsUrl(chunk),
      };
    }),
  ];
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
    complete: labels.all,
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

/**
 * Walking directions with every stop as a real destination.
 *
 * Uses the path form (`/maps/dir/a/b/c/...`) instead of `api=1&waypoints=…`.
 * The waypoints parameter silently drops stops above 9 intermediates.
 */
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

  // data=!4m2!4m1!3e2 → travel mode walking (3e2)
  const path = routeStops.map((s) => `${s.lat},${s.lng}`).join("/");
  return `https://www.google.com/maps/dir/${path}/data=!4m2!4m1!3e2`;
}
