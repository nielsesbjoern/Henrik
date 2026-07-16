import type { Category } from "../data/types";
import type { Translations } from "../i18n/types";

export const categoryColors: Record<Category, string> = {
  buchszene: "var(--color-marker-buchszene)",
  kulisse: "var(--color-marker-kulisse)",
  stadttour: "var(--color-marker-stadttour)",
  fan: "var(--color-marker-fan)",
  rekonstruiert: "var(--color-marker-rekonstruiert)",
  fiktiv: "var(--color-marker-fiktiv)",
};

export function getCategoryConfig(t: Translations["categories"]) {
  return {
    buchszene: {
      label: t.buchszene,
      color: categoryColors.buchszene,
      badgeText: "text-white",
      dashed: false,
    },
    kulisse: {
      label: t.kulisse,
      color: categoryColors.kulisse,
      badgeText: "text-white",
      dashed: false,
    },
    stadttour: {
      label: t.stadttour,
      color: categoryColors.stadttour,
      badgeText: "text-white",
      dashed: false,
    },
    fan: {
      label: t.fan,
      color: categoryColors.fan,
      badgeText: "text-white",
      dashed: false,
    },
    rekonstruiert: {
      label: t.rekonstruiert,
      color: categoryColors.rekonstruiert,
      badgeText: "text-white",
      dashed: true,
    },
    fiktiv: {
      label: t.fiktiv,
      color: categoryColors.fiktiv,
      badgeText: "text-white",
      dashed: true,
    },
  } satisfies Record<
    Category,
    { label: string; color: string; badgeText: string; dashed: boolean }
  >;
}

export const ALL_CATEGORIES: Category[] = [
  "buchszene",
  "kulisse",
  "stadttour",
  "fan",
  "rekonstruiert",
  "fiktiv",
];

/** Categories that actually appear on the given stops, in legend order. */
export function categoriesPresentIn(
  stops: Iterable<{ category: Category }>,
): Category[] {
  const present = new Set<Category>();
  for (const stop of stops) present.add(stop.category);
  return ALL_CATEGORIES.filter((c) => present.has(c));
}

export function isDashedCategory(category: Category): boolean {
  return category === "rekonstruiert" || category === "fiktiv";
}
