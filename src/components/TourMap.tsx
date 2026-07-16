import { useCallback, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import type { RouteStop } from "../utils/tour";
import type { TourType } from "../utils/tour";
import {
  buildFullTourLegs,
  buildWalkingDirectionsUrl,
} from "../utils/maps";
import {
  MapController,
  ScrollWheelZoomHandler,
  UserLocationController,
} from "./MapController";
import { useStopIcons, createUserIcon } from "./StopMarker";
import { MinimalBasemap } from "./MinimalBasemap";
import { MapLegendChips } from "./MapLegendChips";
import { useI18n } from "../i18n";
import type { VisitedRecord } from "../hooks/useTourState";

interface TourMapProps {
  routeStops: RouteStop[];
  tourType: TourType;
  activeStopId: number | null;
  visited: VisitedRecord;
  onStopSelect: (stop: RouteStop) => void;
  flyToStop: RouteStop | null;
  resetKey: string;
}

export default function TourMap({
  routeStops,
  tourType,
  activeStopId,
  visited,
  onStopSelect,
  flyToStop,
  resetKey,
}: TourMapProps) {
  const { t } = useI18n();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [geoError, setGeoError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [scrollZoomActive, setScrollZoomActive] = useState(false);

  const icons = useStopIcons(routeStops, activeStopId, visited);
  const userIcon = createUserIcon();

  const polylinePositions = routeStops.map(
    (s) => [s.lat, s.lng] as [number, number],
  );

  const tourLegs =
    tourType === "full"
      ? buildFullTourLegs(routeStops, {
          all: t.map.legAll,
          leg1: t.map.leg1,
          leg2: t.map.leg2,
        })
      : null;

  const shortTourUrl =
    tourType === "short" || tourType === "riddle"
      ? buildWalkingDirectionsUrl(routeStops)
      : null;

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
    <div className="relative h-full w-full">
      <MapContainer
        center={[38.712, -9.136]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
        zoomControl={false}
        maxZoom={20}
      >
        <MinimalBasemap />
        <ZoomControl position="topright" />

        <ScrollWheelZoomHandler onActiveChange={setScrollZoomActive} />

        <MapController
          routeStops={routeStops}
          flyToStop={flyToStop}
          resetKey={resetKey}
        />

        {userPosition && (
          <UserLocationController position={userPosition} />
        )}

        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#FFFFFF",
            weight: 7,
            opacity: 0.96,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#2B2B2B",
            weight: 3,
            opacity: 0.55,
            lineCap: "round",
            lineJoin: "round",
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
          <p className="map-pill-button meta-mono px-3 py-2 text-[11px] text-ink/80">
            {t.map.scrollZoomHint}
          </p>
        </div>
      )}

      <MapLegendChips />

      <div className="map-locate-control absolute z-[1000] flex flex-col gap-2">
        <div className="map-control-stack">
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
        {tourLegs ? (
          <details className="group relative">
            <summary className="map-pill-button meta-mono mx-auto flex min-h-10 cursor-pointer list-none items-center justify-center gap-2 px-3 py-2 text-[11px] text-ink sm:px-4 sm:text-xs">
              <svg className="h-4 w-4 shrink-0 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 2" />
              </svg>
              <span className="truncate">{t.map.fullTourGoogleMaps}</span>
            </summary>
            <div className="absolute bottom-full left-1/2 mb-3 flex w-full min-w-[14rem] -translate-x-1/2 flex-col gap-2 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] p-2">
              {tourLegs.map((leg) => (
                <a
                  key={leg.label}
                  href={leg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-mono border border-[color:var(--color-azulejo)] bg-[color:var(--color-azulejo)] px-3 py-2.5 text-center text-xs text-[color:var(--color-paper)] transition"
                >
                  {leg.label}
                </a>
              ))}
            </div>
          </details>
        ) : shortTourUrl ? (
          <a
            href={shortTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-pill-button meta-mono mx-auto flex min-h-10 items-center justify-center gap-2 px-3 py-2 text-center text-[11px] text-ink transition sm:px-4 sm:text-xs"
          >
            <svg className="h-4 w-4 shrink-0 text-azulejo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 2" />
            </svg>
            <span className="truncate">{t.map.fullTourGoogleMaps}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
