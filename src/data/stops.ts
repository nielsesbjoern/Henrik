import type { StopQuote, StopRiddle } from "../i18n/types";
import type { CityId, StopBase } from "./types";

export type { Category, CityId, StopBase } from "./types";

export interface Stop extends StopBase {
  name: string;
  bookRef: string;
  description: string;
  quote?: StopQuote;
  riddle?: StopRiddle;
}

export const stopBases: StopBase[] = [
  // —— Lissabon (1–16) ——
  { id: 1, cityId: "lisboa", lat: 38.71008, lng: -9.14665, district: "Bica", category: "fan", inShortTour: true },
  { id: 2, cityId: "lisboa", lat: 38.71100, lng: -9.14590, district: "Bica", category: "buchszene", inShortTour: false },
  { id: 3, cityId: "lisboa", lat: 38.71070, lng: -9.14203, district: "Chiado", category: "stadttour", inShortTour: true },
  { id: 4, cityId: "lisboa", lat: 38.71204, lng: -9.14061, district: "Chiado", category: "stadttour", inShortTour: false },
  { id: 5, cityId: "lisboa", lat: 38.71240, lng: -9.13930, district: "Baixa", category: "stadttour", inShortTour: false },
  { id: 6, cityId: "lisboa", lat: 38.71450, lng: -9.13870, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 7, cityId: "lisboa", lat: 38.70844, lng: -9.13682, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 8, cityId: "lisboa", lat: 38.70728, lng: -9.13636, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 9, cityId: "lisboa", lat: 38.71150, lng: -9.12750, district: "Alfama", category: "stadttour", inShortTour: false },
  { id: 10, cityId: "lisboa", lat: 38.71221, lng: -9.12796, district: "Alfama", category: "kulisse", inShortTour: false },
  { id: 11, cityId: "lisboa", lat: 38.71193, lng: -9.12996, district: "Alfama", category: "kulisse", inShortTour: true },
  { id: 12, cityId: "lisboa", lat: 38.71391, lng: -9.13348, district: "Castelo", category: "kulisse", inShortTour: false },
  { id: 13, cityId: "lisboa", lat: 38.71680, lng: -9.13150, district: "Graça", category: "stadttour", inShortTour: false },
  { id: 14, cityId: "lisboa", lat: 38.71470, lng: -9.12740, district: "São Vicente", category: "buchszene", inShortTour: false },
  { id: 15, cityId: "lisboa", lat: 38.71570, lng: -9.12490, district: "São Vicente", category: "buchszene", inShortTour: false },
  /** Band 10 Ort: Endhaltestelle Eléctrico 28 – Ort, nicht die Fahrt */
  { id: 16, cityId: "lisboa", lat: 38.71655, lng: -9.13572, district: "Martim Moniz", category: "buchszene", inShortTour: false },

  // —— Cascais (101–109) · Band 8 · Romankarte ——
  // Tour order: Bahnhof → Tatort → Rachel → PSP → Hotel → Pub → Marina → Küste
  { id: 101, cityId: "cascais", lat: 38.70075, lng: -9.41859, district: "Centro", category: "buchszene", inShortTour: false, time: "10:00" },
  { id: 102, cityId: "cascais", lat: 38.70080, lng: -9.41496, district: "Centro", category: "buchszene", inShortTour: false, time: "10:20" },
  { id: 103, cityId: "cascais", lat: 38.69750, lng: -9.41950, district: "Centro", category: "fiktiv", inShortTour: false, time: "11:35" },
  { id: 104, cityId: "cascais", lat: 38.69720, lng: -9.42076, district: "Praça 5 de Outubro", category: "fiktiv", inShortTour: false, time: "12:00" },
  { id: 105, cityId: "cascais", lat: 38.69980, lng: -9.42100, district: "Centro", category: "fiktiv", inShortTour: false, time: "10:45" },
  { id: 106, cityId: "cascais", lat: 38.69917, lng: -9.42330, district: "Rua Afonso Sanches", category: "buchszene", inShortTour: false, time: "11:10" },
  { id: 107, cityId: "cascais", lat: 38.69208, lng: -9.41918, district: "Marina", category: "buchszene", inShortTour: false, time: "12:30" },
  { id: 108, cityId: "cascais", lat: 38.69047, lng: -9.42098, district: "Costa", category: "kulisse", inShortTour: false, time: "13:00" },
  { id: 109, cityId: "cascais", lat: 38.69131, lng: -9.43069, district: "Boca do Inferno", category: "kulisse", inShortTour: false, time: "13:30" },
];

/** @deprecated Prefer cities[].tours — kept for maps leg helpers */
export const fullTourOrder = [1, 2, 3, 4, 5, 6, 16, 12, 13, 14, 15, 11, 10, 9, 7, 8];
export const shortTourOrder = [1, 3, 6, 11, 7, 8];
export const riddleTourOrder = [12, 11, 10, 9, 8, 7, 3, 4, 1];
/** Gehende Reihenfolge: Ankunft → Tatort → Wohnviertel/Polizei → Altstadt → Marina → Epilog */
export const cascaisTourOrder = [101, 102, 105, 106, 103, 104, 107, 108, 109];

export function getStopIdsForCity(cityId: CityId): number[] {
  return stopBases.filter((s) => s.cityId === cityId).map((s) => s.id);
}

export function getCityIdForStop(stopId: number): CityId | undefined {
  return stopBases.find((s) => s.id === stopId)?.cityId;
}
