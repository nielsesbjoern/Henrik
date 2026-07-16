import { useEffect, useRef, useState } from "react";
import type { RouteStop } from "../utils/tour";
import type { TourType } from "../utils/tour";
import { getCategoryConfig } from "../utils/categories";
import { isStopUnlocked } from "../utils/riddle";
import { useI18n } from "../i18n";
import { StopStamp } from "./StopStamp";

interface StopListProps {
  routeStops: RouteStop[];
  activeStopId: number | null;
  stampedIds: Set<number>;
  solvedIds: Set<number>;
  tourMode: boolean;
  tourType: TourType;
  freeTour: boolean;
  currentIndex: number;
  onStopClick: (stop: RouteStop) => void;
  onToggleVisited?: (stopId: number) => void;
}

export function StopList({
  routeStops,
  activeStopId,
  stampedIds,
  solvedIds,
  tourMode,
  tourType,
  freeTour,
  currentIndex,
  onStopClick,
  onToggleVisited,
}: StopListProps) {
  const { t, format } = useI18n();
  const categoryConfig = getCategoryConfig(t.categories);
  const [listOpen, setListOpen] = useState(true);
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());
  const isRiddleTour = tourType === "riddle";

  useEffect(() => {
    if (tourMode) setListOpen(true);
  }, [tourMode]);

  useEffect(() => {
    if (activeStopId === null) return;
    setListOpen(true);
    const node = itemRefs.current.get(activeStopId);
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeStopId]);

  const stopsToRender = tourMode
    ? routeStops.filter((_, i) => i === currentIndex)
    : routeStops;

  const handleClick = (stop: RouteStop, unlocked: boolean) => {
    if (isRiddleTour && !unlocked) return;
    onStopClick(stop);
  };

  return (
    <div className="flex min-h-0 flex-col">
      <button
        type="button"
        onClick={() => setListOpen((open) => !open)}
        aria-expanded={listOpen}
        className="flex w-full min-h-12 items-center justify-between gap-3 border-b border-[color:var(--color-control-border)] px-4 py-3 text-left transition hover:bg-[color:var(--color-card)]"
      >
        <div className="min-w-0">
          <h2 className="text-base text-ink sm:text-lg">
            {tourMode ? t.stopList.currentStop : t.stopList.allStops}
          </h2>
          <p className="meta-mono text-[10px] text-[color:var(--color-pencil)] sm:text-xs">
            {format(t.stopList.entriesHint, {
              count: String(routeStops.length).padStart(2, "0"),
            })}
          </p>
        </div>
        <span
          className={`stop-list-chevron meta-mono shrink-0 text-[color:var(--color-pencil)] transition-transform duration-200 ${listOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
        <span className="sr-only">
          {listOpen ? t.stopList.collapse : t.stopList.expand}
        </span>
      </button>

      <div
        className={`stop-list-panel flex min-h-0 flex-col overflow-hidden transition-[max-height] duration-300 ease-out ${
          listOpen ? "max-h-[46vh] lg:max-h-none lg:flex-1" : "max-h-0"
        }`}
      >
        <ol className="flex-1 overflow-y-auto px-3 py-1.5 sm:px-4 sm:py-2">
          {stopsToRender.map((stop, index) => {
            const listIndex = tourMode ? currentIndex : index;
            const isActive = stop.id === activeStopId;
            const isStamped = stampedIds.has(stop.id);
            const isSolved = solvedIds.has(stop.id);
            const unlocked = isRiddleTour
              ? isStopUnlocked(listIndex, routeStops, solvedIds, freeTour)
              : true;
            const isLocked = isRiddleTour && !unlocked;

            const markerColor = isLocked
              ? "var(--color-pencil)"
              : categoryConfig[stop.category].color;

            return (
              <li
                key={stop.id}
                ref={(node) => {
                  if (node) itemRefs.current.set(stop.id, node);
                  else itemRefs.current.delete(stop.id);
                }}
                className="relative py-1 pl-10 sm:pl-11"
              >
                {!tourMode && index < routeStops.length - 1 && (
                  <span
                    className="timeline-line"
                    style={{
                      transform: `rotate(${index % 2 === 0 ? 0.6 : -0.5}deg)`,
                    }}
                    aria-hidden
                  />
                )}

                <span
                  className={`stop-marker stop-marker--list${
                    isActive ? " stop-marker--active" : ""
                  }${isStamped ? " stop-marker--visited stop-marker--stamped" : ""}`}
                  style={{
                    backgroundColor: isStamped
                      ? "var(--color-paper)"
                      : markerColor,
                    position: "absolute",
                  }}
                  aria-hidden
                >
                  <span className="stop-marker__label">
                    {isLocked ? (
                      "🔒"
                    ) : isStamped ? (
                      <StopStamp
                        stopId={stop.id}
                        stopNumber={stop.tourNumber}
                        placeName={stop.name}
                        category={stop.category}
                        size="mini"
                      />
                    ) : (
                      String(stop.tourNumber).padStart(2, "0")
                    )}
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleClick(stop, unlocked)}
                    disabled={isLocked}
                    className={`min-w-0 flex-1 px-3 py-2.5 text-left transition ${
                      isLocked
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-[color:var(--color-card)]"
                    } ${
                      isActive
                        ? "border-l-2 border-[color:var(--color-azulejo)] bg-[color:var(--color-card)]"
                        : "border-l-2 border-transparent"
                    } ${isStamped ? "opacity-85" : ""}`}
                  >
                    <h3 className="truncate text-[15px] leading-snug text-ink sm:text-base">
                      {isLocked
                        ? `Fundort ${String(stop.tourNumber).padStart(2, "0")}`
                        : stop.name}
                    </h3>
                    <p className="meta-mono mt-0.5 truncate text-[10px] text-[color:var(--color-pencil)]">
                      {isLocked ? t.riddle.locked : stop.district}
                    </p>
                  </button>

                  {!isLocked && onToggleVisited && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisited(stop.id);
                      }}
                      aria-pressed={isStamped}
                      aria-label={format(t.stopList.markVisited, {
                        number: stop.tourNumber,
                      })}
                      className={`meta-mono shrink-0 min-h-11 min-w-[5.5rem] border px-2.5 py-2 text-[10px] transition sm:min-w-[6.5rem] sm:text-[11px] ${
                        isStamped
                          ? "border-[color:var(--color-azulejo)] bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                          : "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                      }`}
                    >
                      {isStamped ? `✓ ${t.stopList.done}` : t.stopList.done}
                    </button>
                  )}

                  {isRiddleTour && !onToggleVisited && isSolved && (
                    <span className="meta-mono shrink-0 px-2 text-[10px] text-[color:var(--color-azulejo)]">
                      ✓ {t.stopList.done}
                    </span>
                  )}
                </div>

                {tourMode && (
                  <p className="meta-mono mt-0.5 pl-1 text-[10px] text-[color:var(--color-pencil)]">
                    {format(t.stopList.stopOf, {
                      current: listIndex + 1,
                      total: routeStops.length,
                    })}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
