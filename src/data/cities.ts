import type { City, CityId, Tour, TourId } from "./types";
import {
  cascaisTourOrder,
  fullTourOrder,
  riddleTourOrder,
  shortTourOrder,
} from "./stops";

export const cities: City[] = [
  {
    id: "lisboa",
    center: [38.7107, -9.135],
    tours: [
      {
        id: "lisboa-gross",
        stopIds: fullTourOrder,
      },
      {
        id: "lisboa-kurz",
        stopIds: shortTourOrder,
      },
      {
        id: "lisboa-raetsel",
        stopIds: riddleTourOrder,
      },
    ],
  },
  {
    id: "cascais",
    center: [38.697, -9.419],
    tours: [
      {
        id: "cascais",
        stopIds: [...cascaisTourOrder],
      },
    ],
  },
];

export const DEFAULT_CITY_ID: CityId = "lisboa";
export const DEFAULT_TOUR_ID: TourId = "lisboa-gross";

const CITY_BY_ID = new Map(cities.map((c) => [c.id, c]));
const TOUR_BY_ID = new Map(
  cities.flatMap((c) => c.tours.map((t) => [t.id, { city: c, tour: t }] as const)),
);

export function getCity(cityId: CityId): City {
  return CITY_BY_ID.get(cityId) ?? cities[0];
}

export function getTour(
  tourId: string,
): { city: City; tour: Tour } | undefined {
  return TOUR_BY_ID.get(tourId as TourId);
}

export function getDefaultTourId(cityId: CityId): TourId {
  return getCity(cityId).tours[0]?.id ?? DEFAULT_TOUR_ID;
}

export function isValidCityId(value: string): value is CityId {
  return CITY_BY_ID.has(value as CityId);
}

export function isValidTourId(value: string): value is TourId {
  return TOUR_BY_ID.has(value as TourId);
}

/** Legacy TourType ↔ tour id (Lisbon only). */
export type LegacyTourType = "full" | "short" | "riddle";

export function tourIdToLegacyType(tourId: string): LegacyTourType | null {
  if (tourId === "lisboa-gross") return "full";
  if (tourId === "lisboa-kurz") return "short";
  if (tourId === "lisboa-raetsel") return "riddle";
  return null;
}

export function legacyTypeToTourId(type: LegacyTourType): TourId {
  if (type === "full") return "lisboa-gross";
  if (type === "short") return "lisboa-kurz";
  return "lisboa-raetsel";
}
