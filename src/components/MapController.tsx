import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import type { RouteStop } from "../utils/route";
import type { CityId } from "../data/types";

interface ScrollWheelZoomHandlerProps {
  onActiveChange?: (active: boolean) => void;
}

/** Scroll zoom only after the map is focused — avoids accidental zoom while scrolling the page. */
export function ScrollWheelZoomHandler({
  onActiveChange,
}: ScrollWheelZoomHandlerProps) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.setAttribute("tabindex", "0");

    map.scrollWheelZoom.disable();

    const enable = () => {
      map.scrollWheelZoom.enable();
      container.classList.add("leaflet-scroll-zoom-active");
      onActiveChange?.(true);
    };

    const disable = () => {
      map.scrollWheelZoom.disable();
      container.classList.remove("leaflet-scroll-zoom-active");
      onActiveChange?.(false);
    };

    const handleFocus = () => enable();
    const handleBlur = () => disable();
    const handleClick = () => container.focus();

    const handleWindowPointerDown = (event: PointerEvent) => {
      if (!container.contains(event.target as Node)) {
        container.blur();
      }
    };

    map.on("focus", handleFocus);
    map.on("blur", handleBlur);
    container.addEventListener("click", handleClick);
    window.addEventListener("pointerdown", handleWindowPointerDown);

    return () => {
      map.off("focus", handleFocus);
      map.off("blur", handleBlur);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("pointerdown", handleWindowPointerDown);
      disable();
    };
  }, [map, onActiveChange]);

  return null;
}

interface MapControllerProps {
  routeStops: RouteStop[];
  flyToStop: RouteStop | null;
  resetKey: string;
  cityId: CityId;
  /** Increment to re-fit the map to all route stops (e.g. "Zurück zur Route"). */
  fitNonce?: number;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function fitPadding(): {
  paddingTopLeft: [number, number];
  paddingBottomRight: [number, number];
} {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  // Marker radius ~22px + zoom controls / Google Maps chip / safe edge
  if (isMobile) {
    return {
      paddingTopLeft: [64, 56],
      paddingBottomRight: [120, 56],
    };
  }
  return {
    paddingTopLeft: [80, 72],
    paddingBottomRight: [96, 72],
  };
}

export function MapController({
  routeStops,
  flyToStop,
  resetKey,
  cityId,
  fitNonce = 0,
}: MapControllerProps) {
  const map = useMap();
  const prevCityIdRef = useRef(cityId);
  const prevFitNonceRef = useRef(fitNonce);
  const skipFlyAfterFitRef = useRef(false);

  useEffect(() => {
    if (routeStops.length === 0) return;

    map.invalidateSize();

    const bounds = latLngBounds(routeStops.map((s) => [s.lat, s.lng]));
    const padding = fitPadding();
    const citySwitched = prevCityIdRef.current !== cityId;
    prevCityIdRef.current = cityId;

    const fitRequested = prevFitNonceRef.current !== fitNonce;
    prevFitNonceRef.current = fitNonce;

    const reduced = prefersReducedMotion();
    const base = {
      ...padding,
      maxZoom: 16,
      animate: !reduced,
    };

    skipFlyAfterFitRef.current = true;

    if (citySwitched || fitRequested) {
      map.flyToBounds(bounds, {
        ...base,
        duration: reduced ? 0 : fitRequested ? 0.8 : 1.2,
      });
      return;
    }

    map.fitBounds(bounds, base);
  }, [map, resetKey, routeStops, cityId, fitNonce]);

  useEffect(() => {
    if (!flyToStop) return;
    if (skipFlyAfterFitRef.current) {
      skipFlyAfterFitRef.current = false;
      return;
    }
    map.flyTo([flyToStop.lat, flyToStop.lng], 15, { duration: 0.9 });
  }, [map, flyToStop]);

  return null;
}

interface UserLocationControllerProps {
  position: [number, number] | null;
}

export function UserLocationController({ position }: UserLocationControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;
    map.flyTo(position, Math.max(map.getZoom(), 15), { duration: 0.7 });
  }, [map, position]);

  return null;
}
