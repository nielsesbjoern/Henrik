export type CityId = "lisboa" | "cascais";

export type TourId =
  | "lisboa-gross"
  | "lisboa-kurz"
  | "lisboa-raetsel"
  | "cascais";

export type Category =
  | "buchszene"
  | "kulisse"
  | "stadttour"
  | "fan"
  | "rekonstruiert"
  | "fiktiv";

export interface Tour {
  id: TourId;
  stopIds: number[];
}

export interface City {
  id: CityId;
  center: [number, number];
  tours: Tour[];
}

export interface StopBase {
  id: number;
  cityId: CityId;
  lat: number;
  lng: number;
  district: string;
  category: Category;
  inShortTour: boolean;
  /** Suggested arrival time on the tour sheet (optional). */
  time?: string;
}
