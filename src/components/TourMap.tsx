import { useCallback, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import type { RouteStop } from "../utils/route";
import type { TourType } from "../utils/route";
import { buildTourDirectionLegs } from "../utils/maps";
import {
  MapController,
  ScrollWheelZoomHandler,
  UserLocationController,
} from "./MapController";
import { useStopIcons, createUserIcon } from "./StopMarker";
import { MinimalBasemap } from "./MinimalBasemap";
import { MapLegendChips } from "./MapLegendChips";
import { useI18n } from "../i18n";
import { useDebugFlag } from "../hooks/useDebugFlag";
import type { VisitedRecord } from "../hooks/useTourState";
import type { CityId } from "../data/types";

interface TourMapProps {
  routeStops: RouteStop[];
  tourType: TourType;
  activeStopId: number | null;
  visited: VisitedRecord;
  onStopSelect: (stop: RouteStop) => void;
  flyToStop: RouteStop | null;
  resetKey: string;
  cityId: CityId;
  mapCenter: [number, number];
}

const POLYLINE_OPTIONS = {
  /** Keep every tour vertex — default simplification dropped short Cascais legs. */
  smoothFactor: 0,
  noClip: false,
  lineCap: "round" as const,
  lineJoin: "round" as const,
};

export default function TourMap({
  routeStops,
  tourType: _tourType,
  activeStopId,
  visited,
  onStopSelect,
  flyToStop,
  resetKey,
  cityId,
  mapCenter,
}: TourMapProps) {
  const { t, format } = useI18n();
  const showDebugLegend = useDebugFlag();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [geoError, setGeoError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [scrollZoomActive, setScrollZoomActive] = useState(false);
  const [fitNonce, setFitNonce] = useState(0);

  const icons = useStopIcons(routeStops, activeStopId, visited);
  const userIcon = createUserIcon();

  // Exact stopIds order — length must match the active tour.
  const polylinePositions = routeStops.map(
    (s) => [s.lat, s.lng] as [number, number],
  );

  const directionLegs = useMemo(
    () =>
      buildTourDirectionLegs(routeStops, {
        single: t.map.fullTourGoogleMaps,
        part: (index, from, to) =>
          format(t.map.legPart, {
            index: String(index),
            from: String(from),
            to: String(to),
          }),
      }),
    [routeStops, t.map.fullTourGoogleMaps, t.map.legPart, format],
  );

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError(t.map.geoUnsupported);
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      (err) => {
        setGeoError(
          err.code === 1 ? t.map.geoDenied : t.map.geoFailed,
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [t]);

  return (
    <div className="tour-map-frame relative h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
        zoomControl={false}
        maxZoom={35}
      >
        <MinimalBasemap />
        <ZoomControl position="topright" />

        <ScrollWheelZoomHandler onActiveChange={setScrollZoomActive} />

        <MapController
          routeStops={routeStops}
          flyToStop={flyToStop}
          resetKey={resetKey}
          cityId={cityId}
          fitNonce={fitNonce}
        />

        {userPosition && (
          <UserLocationController position={userPosition} />
        )}

        <Polyline
          key={`route-halo-${resetKey}`}
          positions={polylinePositions}
          pathOptions={{
            ...POLYLINE_OPTIONS,
            className: "tour-route-halo",
            color: "#FAF8F3",
            weight: 8,
            opacity: 0.9,
          }}
        />
        <Polyline
          key={`route-line-${resetKey}`}
          positions={polylinePositions}
          pathOptions={{
            ...POLYLINE_OPTIONS,
            className: "tour-route-line",
            color: "#0A4D5A",
            weight: 3,
            opacity: 0.85,
            dashArray: "7 10",
          }}
        />

        {routeStops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={icons.get(stop.id)}
            eventHandlers={{
              click: () => onStopSelect(stop),
            }}
          />
        ))}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon} />
        )}
      </MapContainer>

      {!scrollZoomActive && (
        <div
          className="pointer-events-none absolute left-3 top-3 z-[1000] hidden max-w-[min(calc(100%-6rem),16rem)] [@media(pointer:fine)]:block"
          aria-hidden
        >
          <p className="map-scroll-hint meta-mono px-3 py-2 text-[11px] tracking-[0.04em]">
            {t.map.scrollZoomHint}
          </p>
        </div>
      )}

      {showDebugLegend && <MapLegendChips cityId={cityId} />}

      <div className="map-locate-control absolute z-[1000] flex flex-col gap-2">
        <div className="map-control-stack">
          <button
            type="button"
            onClick={() => setFitNonce((n) => n + 1)}
            className="map-floating-button"
            aria-label={t.map.fitRoute}
            title={t.map.fitRoute}
          >
            <svg className="h-5 w-5 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2M9 12h6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className="map-floating-button disabled:opacity-60"
            aria-label={t.map.locateMe}
            title={t.map.locateMe}
          >
            <svg className="h-5 w-5 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          </button>
        </div>
        {geoError && (
          <p className="meta-mono max-w-[220px] border border-[color:var(--color-marker-buchszene)] bg-[color:var(--color-paper)] px-3 py-2 text-[11px] text-[color:var(--color-marker-buchszene)]">
            {geoError}
          </p>
        )}
      </div>

      <div className="absolute bottom-3 left-1/2 z-[1000] w-[min(calc(100%-7.5rem),18rem)] -translate-x-1/2 sm:bottom-4 sm:w-[min(calc(100%-2rem),22rem)]">
        {directionLegs.length > 1 ? (
          <details className="group relative">
            <summary className="map-pill-button meta-mono mx-auto flex min-h-10 cursor-pointer list-none items-center justify-center gap-2 px-3 py-2 text-[11px] text-ink sm:px-4 sm:text-xs">
              <svg className="h-4 w-4 shrink-0 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 2" />
              </svg>
              <span className="truncate">{t.map.fullTourGoogleMaps}</span>
            </summary>
            <div className="absolute bottom-full left-1/2 mb-3 flex w-full min-w-[14rem] -translate-x-1/2 flex-col gap-2 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] p-2">
              {directionLegs.map((leg) => (
                <a
                  key={leg.label}
                  href={leg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-stamp meta-mono border px-3 py-2.5 text-center text-xs transition"
                >
                  {leg.label}
                </a>
              ))}
            </div>
          </details>
        ) : directionLegs[0] ? (
          <a
            href={directionLegs[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="map-pill-button meta-mono mx-auto flex min-h-10 items-center justify-center gap-2 px-3 py-2 text-center text-[11px] text-ink transition sm:px-4 sm:text-xs"
          >
            <svg className="h-4 w-4 shrink-0 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 2" />
            </svg>
            <span className="truncate">{directionLegs[0].label}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
