import { useMemo } from "react";
import type { RouteStop } from "../utils/tour";
import type { GeoPosition } from "../hooks/useGeolocation";
import {
  bearingDeg,
  formatDistance,
  haversineMeters,
  walkMinutes,
} from "../utils/geo";
import { googleMapsDirectionsUrl } from "../utils/maps";
import { useI18n } from "../i18n";

interface NextStopNavigatorProps {
  nextStop: RouteStop | null;
  position: GeoPosition | null;
  geoError: string | null;
}

export function NextStopNavigator({
  nextStop,
  position,
  geoError,
}: NextStopNavigatorProps) {
  const { t, format, locale } = useI18n();

  const metrics = useMemo(() => {
    if (!nextStop || !position) return null;
    const distanceM = haversineMeters(
      position.lat,
      position.lng,
      nextStop.lat,
      nextStop.lng,
    );
    return {
      distanceM,
      distance: formatDistance(distanceM, locale),
      minutes: walkMinutes(distanceM),
      bearing: bearingDeg(
        position.lat,
        position.lng,
        nextStop.lat,
        nextStop.lng,
      ),
    };
  }, [nextStop, position, locale]);

  if (!nextStop) return null;

  const errorMessage =
    geoError === "denied"
      ? t.navigator.geoDenied
      : geoError === "unsupported"
        ? t.navigator.geoUnsupported
        : geoError === "failed"
          ? t.navigator.geoFailed
          : null;

  return (
    <div className="next-stop-nav border-b border-[color:var(--color-control-border)] bg-[color:var(--color-card)] px-4 py-3">
      <p className="meta-mono text-[10px] tracking-[0.12em] text-[color:var(--color-pencil)]">
        {t.navigator.title}
      </p>

      <div className="mt-2 flex items-center gap-3">
        {metrics && (
          <div
            className="next-stop-nav__arrow flex h-10 w-10 shrink-0 items-center justify-center text-[color:var(--color-azulejo)]"
            style={{ transform: `rotate(${metrics.bearing}deg)` }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 2 L12 22 M12 2 L6 10 M12 2 L18 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{nextStop.name}</p>
          {metrics ? (
            <p className="meta-mono mt-0.5 text-xs text-[color:var(--color-pencil)]">
              {format(t.navigator.toStop, {
                number: String(nextStop.tourNumber).padStart(2, "0"),
                distance: metrics.distance,
                minutes: metrics.minutes,
              })}
            </p>
          ) : (
            <p className="meta-mono mt-0.5 text-xs text-[color:var(--color-pencil)]">
              {errorMessage ?? t.navigator.waiting}
            </p>
          )}
        </div>
      </div>

      <a
        href={googleMapsDirectionsUrl(nextStop.lat, nextStop.lng)}
        target="_blank"
        rel="noopener noreferrer"
        className="meta-mono mt-2 inline-block text-[11px] text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-2"
      >
        {t.navigator.openMaps}
      </a>
    </div>
  );
}
