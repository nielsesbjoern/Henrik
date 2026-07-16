import type { Stop } from "../data/stops";

export function buildFullTourLegs(
  ordered: Stop[],
  labels: { all: string; leg1: string; leg2: string },
) {
  if (ordered.length === 0) return [];

  const mid = Math.ceil(ordered.length / 2);
  const leg1 = ordered.slice(0, mid);
  const leg2 = ordered.slice(mid - 1); // overlap one stop for continuity

  return [
    { label: labels.all, url: buildWalkingDirectionsUrl(ordered) },
    { label: labels.leg1, url: buildWalkingDirectionsUrl(leg1) },
    { label: labels.leg2, url: buildWalkingDirectionsUrl(leg2) },
  ];
}

export function googleMapsSearchUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
}

export function buildWalkingDirectionsUrl(routeStops: Stop[]): string {
  if (routeStops.length === 0) return "";
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

export interface TourLeg {
  label: string;
  url: string;
}
