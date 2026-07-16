import type { CityId } from "./types";

export interface FoodItemBase {
  id: string;
  /**
   * Linked tour stop for map navigation / cutlery marker.
   * Omit for menu-only entries (e.g. Mercado da Vila).
   */
  stopId?: number;
  /** Required when `stopId` is absent — used for city filtering. */
  cityId?: CityId;
}

export interface FoodItem extends FoodItemBase {
  name: string;
  where: string;
  source: string;
}

export const foodItemBases: FoodItemBase[] = [
  { id: "bica-nata", stopId: 3 },
  { id: "limonade", stopId: 4 },
  { id: "ginjinha", stopId: 6 },
  { id: "tintenfisch", stopId: 9 },
  { id: "mazagran", stopId: 13 },
  /** Cascais market — Speisekarte only, no tour pin */
  { id: "mercado", cityId: "cascais" },
];
