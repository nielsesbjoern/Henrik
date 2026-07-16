import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DivIcon } from "leaflet";
import { foodItemBases } from "../data/food";
import type { Category } from "../data/stops";
import type { RouteStop } from "../utils/route";
import { isDashedCategory } from "../utils/categories";
import { StopStamp } from "./StopStamp";

const CATEGORY_COLORS: Record<Category, string> = {
  buchszene: "var(--color-marker-buchszene)",
  kulisse: "var(--color-marker-kulisse)",
  stadttour: "var(--color-marker-stadttour)",
  fan: "var(--color-marker-fan)",
  rekonstruiert: "var(--color-marker-rekonstruiert)",
  fiktiv: "var(--color-marker-fiktiv)",
};

const FOOD_STOP_IDS = new Set(
  foodItemBases
    .map((f) => f.stopId)
    .filter((id): id is number => typeof id === "number"),
);

const CUTLERY_GLYPH = `<span class="stop-marker__cutlery" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.2v5.2M2.2 1.2c.4 0 .7.3.7.7v1.6c0 .4-.3.7-.7.7" stroke="currentColor" stroke-width=".85" stroke-linecap="round"/><path d="M5.2 1.2v7.4M5.2 1.2c.35 0 .65.28.65.62v2.1c0 .34-.3.62-.65.62" stroke="currentColor" stroke-width=".85" stroke-linecap="round"/><path d="M7.6 1.2v7.4M7.6 1.2c.35 0 .65.28.65.62v2.1c0 .34-.3.62-.65.62" stroke="currentColor" stroke-width=".85" stroke-linecap="round"/></svg></span>`;

function dashedMarkerClass(category: Category, isVisited: boolean): string {
  if (isVisited || !isDashedCategory(category)) return "";
  if (category === "fiktiv") return " stop-marker--fictional";
  return " stop-marker--reconstructed";
}

export function createStopIcon(
  stop: RouteStop,
  isActive: boolean,
  isVisited: boolean,
  visitedDate?: string,
  hasFood = false,
): DivIcon {
  const color = CATEGORY_COLORS[stop.category];
  const activeClass = isActive ? " stop-marker--active stop-marker--pulse" : "";
  const visitedClass = isVisited ? " stop-marker--visited stop-marker--stamped" : "";
  const foodClass = hasFood ? " stop-marker--has-food" : "";
  const dashedClass = dashedMarkerClass(stop.category, isVisited);

  const markerLabel = isVisited
    ? renderToStaticMarkup(
        <StopStamp
          stopId={stop.id}
          stopNumber={stop.tourNumber}
          placeName={stop.name}
          category={stop.category}
          date={visitedDate}
          size="mini"
        />,
      )
    : String(stop.tourNumber);

  const background = isVisited ? "var(--color-paper)" : color;
  const cutlery = hasFood ? CUTLERY_GLYPH : "";

  return new DivIcon({
    className: "",
    html: `<div class="stop-marker${activeClass}${visitedClass}${foodClass}${dashedClass}" style="background-color:${background};position:relative">${cutlery}<span class="stop-marker__label">${markerLabel}</span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -28],
  });
}

export function createUserIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: `<div class="user-marker-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export function useStopIcons(
  routeStops: RouteStop[],
  activeStopId: number | null,
  visited: Record<number, { date?: string }>,
) {
  return useMemo(() => {
    const icons = new Map<number, DivIcon>();
    for (const stop of routeStops) {
      const entry = visited[stop.id];
      icons.set(
        stop.id,
        createStopIcon(
          stop,
          stop.id === activeStopId,
          Boolean(entry),
          entry?.date,
          FOOD_STOP_IDS.has(stop.id),
        ),
      );
    }
    return icons;
  }, [routeStops, activeStopId, visited]);
}
