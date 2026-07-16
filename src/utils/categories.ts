import type { Category } from "../data/stops";
import type { Translations } from "../i18n/types";

export const categoryColors: Record<Category, string> = {
  buchszene: "var(--color-marker-buchszene)",
  kulisse: "var(--color-marker-kulisse)",
  stadttour: "var(--color-marker-stadttour)",
  fan: "var(--color-marker-fan)",
};

export function getCategoryConfig(t: Translations["categories"]) {
  return {
    buchszene: {
      label: t.buchszene,
      color: categoryColors.buchszene,
      badgeText: "text-white",
    },
    kulisse: {
      label: t.kulisse,
      color: categoryColors.kulisse,
      badgeText: "text-white",
    },
    stadttour: {
      label: t.stadttour,
      color: categoryColors.stadttour,
      badgeText: "text-white",
    },
    fan: {
      label: t.fan,
      color: categoryColors.fan,
      badgeText: "text-white",
    },
  } satisfies Record<
    Category,
    { label: string; color: string; badgeText: string }
  >;
}
