import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import type { RouteStop } from "../utils/tour";

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
}

export function MapController({
  routeStops,
  flyToStop,
  resetKey,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (routeStops.length === 0) return;
    const bounds = latLngBounds(routeStops.map((s) => [s.lat, s.lng]));
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const padding: [number, number] = isMobile ? [24, 24] : [48, 48];
    map.fitBounds(bounds, { padding, animate: true });
  }, [map, resetKey, routeStops]);

  useEffect(() => {
    if (!flyToStop) return;
    map.flyTo([flyToStop.lat, flyToStop.lng], 13.5, { duration: 0.9 });
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
    map.flyTo(position, Math.max(map.getZoom(), 13.5), { duration: 0.7 });
  }, [map, position]);

  return null;
}
