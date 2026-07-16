import type { RouteStop } from "../utils/tour";
import { useI18n } from "../i18n";

interface TourModeProps {
  enabled: boolean;
  onToggle: () => void;
  currentIndex: number;
  totalStops: number;
  visitedCount: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function TourModeBar({
  enabled,
  onToggle,
  currentIndex,
  totalStops,
  visitedCount,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: TourModeProps) {
  const { t, format } = useI18n();
  const progress = totalStops > 0 ? ((currentIndex + 1) / totalStops) * 100 : 0;

  return (
    <div className="border-b border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm text-ink">{t.tourMode.title}</h2>
          <p className="meta-mono text-xs text-[color:var(--color-pencil)]">
            {format(t.tourMode.visited, { visited: visitedCount, total: totalStops })}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`meta-mono border px-4 py-2 text-xs transition ${
            enabled
              ? "border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
              : "border-[color:var(--color-control-border)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
          }`}
        >
          {enabled ? t.tourMode.endTour : t.tourMode.startTour}
        </button>
      </div>

      {enabled && (
        <div className="mt-3 space-y-2">
          <div className="h-1.5 overflow-hidden bg-[color:var(--color-card)]">
            <div
              className="h-full bg-[color:var(--color-azulejo)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              className="meta-mono border border-[color:var(--color-control-border)] px-4 py-2 text-xs text-ink transition hover:bg-[color:var(--color-card)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.tourMode.back}
            </button>
            <span className="meta-mono text-xs text-[color:var(--color-pencil)]">
              {currentIndex + 1} / {totalStops}
            </span>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className="meta-mono border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 text-xs text-[color:var(--color-paper)] transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.tourMode.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function getFlyToStop(
  routeStops: RouteStop[],
  selectedId: number | null,
  tourMode: boolean,
  currentIndex: number,
): RouteStop | null {
  if (selectedId !== null) {
    return routeStops.find((s) => s.id === selectedId) ?? null;
  }
  if (tourMode && routeStops[currentIndex]) {
    return routeStops[currentIndex];
  }
  return null;
}
