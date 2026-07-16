export interface FoodItemBase {
  id: string;
  stopId: number;
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
];
