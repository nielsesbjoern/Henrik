import type { TourType } from "../utils/tour";
import { useI18n } from "../i18n";

interface TourControlsProps {
  tourType: TourType;
  onTourTypeChange: (type: TourType) => void;
  routeReversed: boolean;
  onRouteReversedChange: (reversed: boolean) => void;
  currentStartName: string;
  isRiddleTour: boolean;
  freeTour: boolean;
  onFreeTourToggle: () => void;
  tourMode: boolean;
  onTourModeToggle: () => void;
  visitedCount: number;
  totalStops: number;
}

export function TourControls({
  tourType,
  onTourTypeChange,
  routeReversed,
  onRouteReversedChange,
  currentStartName,
  isRiddleTour,
  freeTour,
  onFreeTourToggle,
  tourMode,
  onTourModeToggle,
  visitedCount,
  totalStops,
}: TourControlsProps) {
  const { t, format } = useI18n();

  const tabs: { type: TourType; title: string; stops: string }[] = [
    {
      type: "full",
      title: t.routeToggle.fullTitle,
      stops: t.routeToggle.fullStops,
    },
    {
      type: "short",
      title: t.routeToggle.shortTitle,
      stops: t.routeToggle.shortStops,
    },
    {
      type: "riddle",
      title: t.routeToggle.riddleTitle,
      stops: t.routeToggle.riddleStops,
    },
  ];

  return (
    <div className="border-b border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5">
        <div className="flex items-stretch gap-2">
          <div
            className="grid min-w-0 flex-1 grid-cols-3 border border-[color:var(--color-control-border)]"
            role="tablist"
            aria-label={t.routeToggle.ariaLabel}
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.type}
                type="button"
                role="tab"
                aria-selected={tourType === tab.type}
                onClick={() => onTourTypeChange(tab.type)}
                className={`meta-mono min-h-11 px-1.5 py-2 text-center transition sm:px-3 sm:text-left ${
                  index > 0
                    ? "border-l border-[color:var(--color-control-border)]"
                    : ""
                } ${
                  tourType === tab.type
                    ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                    : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                }`}
              >
                <span className="block text-[10px] leading-tight sm:text-xs">
                  {tab.title}
                </span>
                <span className="mt-0.5 block text-[9px] leading-tight opacity-80 sm:text-[10px]">
                  {tab.stops}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onRouteReversedChange(!routeReversed)}
            aria-pressed={routeReversed}
            aria-label={t.direction.toggle}
            title={t.direction.toggle}
            className={`meta-mono flex h-auto min-h-11 w-11 shrink-0 flex-col items-center justify-center border transition ${
              routeReversed
                ? "border-[color:var(--color-azulejo)] bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                : "border-[color:var(--color-control-border)] text-ink hover:bg-[color:var(--color-card)]"
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 7h11l-3-3" />
              <path d="M17 17H6l3 3" />
            </svg>
          </button>
        </div>

        <p className="meta-mono truncate text-[10px] text-[color:var(--color-pencil)]">
          {format(t.direction.startAt, { name: currentStartName })}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {isRiddleTour && (
              <div
                className="grid flex-1 grid-cols-2 border border-[color:var(--color-control-border)] sm:flex-none sm:min-w-[15rem]"
                role="group"
                aria-label={t.playMode.ariaLabel}
              >
                <button
                  type="button"
                  onClick={() => freeTour && onFreeTourToggle()}
                  className={`meta-mono min-h-11 px-3 py-2 text-xs transition ${
                    !freeTour
                      ? "bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                  }`}
                >
                  {t.playMode.riddle}
                </button>
                <button
                  type="button"
                  onClick={() => !freeTour && onFreeTourToggle()}
                  className={`meta-mono min-h-11 border-l border-[color:var(--color-control-border)] px-3 py-2 text-xs transition ${
                    freeTour
                      ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                  }`}
                >
                  {t.playMode.free}
                </button>
              </div>
            )}

            <p className="meta-mono text-[10px] text-[color:var(--color-pencil)] sm:hidden">
              {format(t.tourMode.visited, {
                visited: visitedCount,
                total: totalStops,
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="meta-mono hidden text-[10px] text-[color:var(--color-pencil)] sm:block">
              {format(t.tourMode.visited, {
                visited: visitedCount,
                total: totalStops,
              })}
            </p>
            <button
              type="button"
              onClick={onTourModeToggle}
              className={`meta-mono min-h-11 flex-1 border px-4 py-2.5 text-xs transition sm:flex-none ${
                tourMode
                  ? "border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
                  : "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:opacity-90"
              }`}
            >
              {tourMode ? t.tourMode.endTour : t.tourMode.startTour}
            </button>
          </div>
        </div>

        {tourMode && (
          <div
            className="h-1 overflow-hidden bg-[color:var(--color-card)]"
            role="progressbar"
            aria-valuenow={visitedCount}
            aria-valuemin={0}
            aria-valuemax={totalStops}
          >
            <div
              className="h-full bg-[color:var(--color-azulejo)] transition-all duration-500"
              style={{
                width: `${totalStops > 0 ? (visitedCount / totalStops) * 100 : 0}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
