import type { Locale } from "../i18n/types";

const WALK_KMH = 4.8;
const EARTH_RADIUS_M = 6_371_000;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function bearingDeg(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function walkMinutes(distanceM: number): number {
  if (distanceM <= 0) return 0;
  return Math.max(1, Math.round((distanceM / 1000 / WALK_KMH) * 60));
}

export function formatDistance(m: number, locale: Locale): string {
  if (m >= 1000) {
    const km = m / 1000;
    const formatted =
      locale === "de"
        ? km.toFixed(1).replace(".", ",")
        : km.toFixed(1);
    return `${formatted} km`;
  }
  return `${Math.round(m)} m`;
}
