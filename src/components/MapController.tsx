import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { latLngBounds, type Map as LeafletMap } from "leaflet";
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

/**
 * Padding as a share of the live map size so dense tours still fit on short
 * mobile viewports (desktop keeps the higher / slightly-right framing).
 * Leaflet Point = [x, y].
 */
function fitPadding(
  map: LeafletMap,
  stopCount: number,
): {
  paddingTopLeft: [number, number];
  paddingBottomRight: [number, number];
} {
  const { x: w, y: h } = map.getSize();
  const isMobile = w < 720 || window.matchMedia("(max-width: 768px)").matches;
  // Dense Lisboa (16) can sit closer; Cascais/short keep a bit more air.
  const dense = stopCount >= 12;

  if (isMobile) {
    if (dense) {
      return {
        paddingTopLeft: [16, 12],
        paddingBottomRight: [16, 48],
      };
    }
    const top = Math.max(12, Math.round(h * 0.05));
    const bottom = Math.min(96, Math.max(56, Math.round(h * 0.2)));
    const left = Math.max(20, Math.round(w * 0.07));
    const right = Math.max(16, Math.round(w * 0.05));
    return {
      paddingTopLeft: [left, top],
      paddingBottomRight: [right, bottom],
    };
  }

  // Desktop: dense Lisboa — slight ease out from the last step.
  return dense
    ? { paddingTopLeft: [40, 16], paddingBottomRight: [28, 74] }
    : { paddingTopLeft: [72, 12], paddingBottomRight: [28, 168] };
}

function fitRouteToMap(
  map: LeafletMap,
  routeStops: RouteStop[],
  options: { animate: boolean; duration?: number },
) {
  if (routeStops.length === 0) return;
  map.invalidateSize();
  let bounds = latLngBounds(routeStops.map((s) => [s.lat, s.lng]));
  // Neutral bounds — one notch out from the last pull-in.
  if (routeStops.length >= 12) {
    bounds = bounds.pad(0.02);
  }
  const padding = fitPadding(map, routeStops.length);
  const base = {
    ...padding,
    maxZoom: denseMaxZoom(routeStops.length),
    animate: options.animate,
  };

  if (options.duration != null && options.animate) {
    map.flyToBounds(bounds, { ...base, duration: options.duration });
  } else {
    map.fitBounds(bounds, base);
  }
}

function denseMaxZoom(stopCount: number): number {
  return stopCount >= 12 ? 35 : 16;
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
  const routeStopsRef = useRef(routeStops);
  routeStopsRef.current = routeStops;

  useEffect(() => {
    if (routeStops.length === 0) return;

    const citySwitched = prevCityIdRef.current !== cityId;
    prevCityIdRef.current = cityId;

    const fitRequested = prevFitNonceRef.current !== fitNonce;
    prevFitNonceRef.current = fitNonce;

    const reduced = prefersReducedMotion();
    skipFlyAfterFitRef.current = true;

    const runFit = () => {
      fitRouteToMap(map, routeStops, {
        animate: !reduced && (citySwitched || fitRequested),
        duration: reduced ? 0 : fitRequested ? 0.8 : citySwitched ? 1.2 : undefined,
      });
    };

    // Mobile layout often settles one frame after mount / tour switch.
    runFit();
    const raf = requestAnimationFrame(() => {
      runFit();
    });

    return () => cancelAnimationFrame(raf);
  }, [map, resetKey, routeStops, cityId, fitNonce]);

  // Re-fit when the map pane is resized (orientation / accordion / keyboard).
  useEffect(() => {
    const onResize = () => {
      fitRouteToMap(map, routeStopsRef.current, { animate: false });
      skipFlyAfterFitRef.current = true;
    };
    map.on("resize", onResize);
    return () => {
      map.off("resize", onResize);
    };
  }, [map]);

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
