export type Category = "buchszene" | "kulisse" | "stadttour" | "fan";

export interface StopBase {
  id: number;
  lat: number;
  lng: number;
  district: string;
  category: Category;
  inShortTour: boolean;
}

import type { StopQuote, StopRiddle } from "../i18n/types";

export interface Stop extends StopBase {
  name: string;
  bookRef: string;
  description: string;
  quote?: StopQuote;
  riddle?: StopRiddle;
}

export const stopBases: StopBase[] = [
  { id: 1, lat: 38.71008, lng: -9.14665, district: "Bica", category: "fan", inShortTour: true },
  { id: 2, lat: 38.71100, lng: -9.14590, district: "Bica", category: "buchszene", inShortTour: false },
  { id: 3, lat: 38.71070, lng: -9.14203, district: "Chiado", category: "stadttour", inShortTour: true },
  { id: 4, lat: 38.71204, lng: -9.14061, district: "Chiado", category: "stadttour", inShortTour: false },
  { id: 5, lat: 38.71240, lng: -9.13930, district: "Baixa", category: "stadttour", inShortTour: false },
  { id: 6, lat: 38.71450, lng: -9.13870, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 7, lat: 38.70844, lng: -9.13682, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 8, lat: 38.70728, lng: -9.13636, district: "Baixa", category: "buchszene", inShortTour: true },
  { id: 9, lat: 38.71150, lng: -9.12750, district: "Alfama", category: "stadttour", inShortTour: false },
  { id: 10, lat: 38.71221, lng: -9.12796, district: "Alfama", category: "kulisse", inShortTour: false },
  { id: 11, lat: 38.71193, lng: -9.12996, district: "Alfama", category: "kulisse", inShortTour: true },
  { id: 12, lat: 38.71391, lng: -9.13348, district: "Castelo", category: "kulisse", inShortTour: false },
  { id: 13, lat: 38.71680, lng: -9.13150, district: "Graça", category: "stadttour", inShortTour: false },
  { id: 14, lat: 38.71470, lng: -9.12740, district: "São Vicente", category: "buchszene", inShortTour: false },
  { id: 15, lat: 38.71570, lng: -9.12490, district: "São Vicente", category: "buchszene", inShortTour: false },
  /** Band 10 Ort: Endhaltestelle Eléctrico 28 – Ort, nicht die Fahrt */
  { id: 16, lat: 38.71655, lng: -9.13572, district: "Martim Moniz", category: "buchszene", inShortTour: false },
];

/** Walking order for the full tour (Martim Moniz / Band 10 after Rossio) */
export const fullTourOrder = [1, 2, 3, 4, 5, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const shortTourOrder = [1, 3, 6, 7, 8, 11];

/** 9-stop scavenger hunt: Castelo → Alfama → Baixa → Chiado → Antiquariat */
export const riddleTourOrder = [12, 11, 10, 9, 8, 7, 3, 4, 1];
