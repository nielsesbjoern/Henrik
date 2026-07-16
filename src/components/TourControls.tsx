import { useEffect, useState } from "react";
import { cities } from "../data/cities";
import { getStopIdsForCity } from "../data/stops";
import type { CityId, Tour } from "../data/types";
import { useI18n } from "../i18n";

interface TourControlsProps {
  cityId: CityId;
  onCityChange: (cityId: CityId) => void;
  stampedIds: Set<number>;
  tours: Tour[];
  tourId: string;
  onTourIdChange: (tourId: string) => void;
  routeReversed: boolean;
  onRouteReversedChange: (reversed: boolean) => void;
  currentStartName: string;
  tourStats: string;
  isRiddleTour: boolean;
  freeTour: boolean;
  onFreeTourToggle: () => void;
  tourMode: boolean;
  onTourModeToggle: () => void;
  visitedCount: number;
  totalStops: number;
  hideTourTabs?: boolean;
}

function ReverseButton({
  routeReversed,
  onRouteReversedChange,
}: {
  routeReversed: boolean;
  onRouteReversedChange: (reversed: boolean) => void;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onRouteReversedChange(!routeReversed)}
      aria-pressed={routeReversed}
      aria-label={t.direction.toggle}
      title={t.direction.toggle}
      className={`flex h-auto min-h-11 w-11 shrink-0 flex-col items-center justify-center border transition ${
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
  );
}

export function TourControls({
  cityId,
  onCityChange,
  stampedIds,
  tours,
  tourId,
  onTourIdChange,
  routeReversed,
  onRouteReversedChange,
  currentStartName,
  tourStats,
  isRiddleTour,
  freeTour,
  onFreeTourToggle,
  tourMode,
  onTourModeToggle,
  visitedCount,
  totalStops,
  hideTourTabs = false,
}: TourControlsProps) {
  const { t, format } = useI18n();
  const [expandedId, setExpandedId] = useState<CityId | null>(cityId);

  useEffect(() => {
    setExpandedId(cityId);
  }, [cityId]);

  const labels: Record<CityId, string> = {
    lisboa: t.cities.lisboaTab,
    cascais: t.cities.cascaisTab,
  };

  const handleHeaderClick = (id: CityId) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    if (id !== cityId) onCityChange(id);
    setExpandedId(id);
  };

  return (
    <div className="akte-dossier">
      <div
        className="akte-accordion mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6"
        role="region"
        aria-label={t.cities.ariaLabel}
      >
        {cities.map((city, index) => {
          const open = expandedId === city.id;
          const active = cityId === city.id;
          const stopIds = active
            ? (tours.find((tab) => tab.id === tourId)?.stopIds ??
              city.tours[0]?.stopIds ??
              [])
            : (city.tours[0]?.stopIds ?? getStopIdsForCity(city.id));
          const sighted = stopIds.filter((id) => stampedIds.has(id)).length;
          const total = stopIds.length;
          const complete = sighted === total && total > 0;
          const indexLabel = String(index + 1).padStart(2, "0");
          const panelId = `akte-panel-${city.id}`;

          return (
            <section
              key={city.id}
              className={`akte-panel${open ? " akte-panel--open" : ""}${
                active ? " akte-panel--active" : ""
              }${complete ? " akte-panel--complete" : ""}`}
            >
              <button
                type="button"
                className="akte-panel__header"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => handleHeaderClick(city.id)}
              >
                <span className="akte-panel__title">
                  <span className="akte-panel__index meta-mono">
                    {indexLabel}
                  </span>
                  <span className="akte-panel__dot" aria-hidden>
                    ·
                  </span>
                  <span className="akte-panel__name brand-label">
                    {labels[city.id]}
                  </span>
                </span>
                <span className="akte-panel__aside">
                  <span className="akte-panel__meta meta-mono">
                    {format(t.cities.progress, {
                      count: String(sighted).padStart(2, "0"),
                      total: String(total).padStart(2, "0"),
                    })}
                    {complete ? ` · ${t.cities.sealed}` : ""}
                  </span>
                  <span
                    className={`akte-panel__chevron meta-mono${
                      open ? " akte-panel__chevron--open" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                  <span className="sr-only">
                    {open ? t.cities.collapseAkte : t.cities.expandAkte}
                  </span>
                </span>
              </button>

              {open && active && (
                <div
                  id={panelId}
                  className="akte-panel__body"
                  role="region"
                >
                  {city.id === "cascais" && (
                    <aside className="akte-vermerk font-mono" role="note">
                      {t.cities.antiquaryNote}
                    </aside>
                  )}

                  {hideTourTabs ? (
                    <div className="akte-dossier__tour-row">
                      <p className="brand-label min-w-0 flex-1 text-[11px] tracking-[0.1em] text-[color:var(--color-ink)]">
                        {tours[0]
                          ? `${t.tours[tours[0].id].title} — ${t.tours[tours[0].id].stops}`
                          : ""}
                        <span className="mt-0.5 block text-[10px] font-normal tracking-[0.08em] text-[color:var(--color-pencil)]">
                          {tourStats}
                        </span>
                      </p>
                      <ReverseButton
                        routeReversed={routeReversed}
                        onRouteReversedChange={onRouteReversedChange}
                      />
                    </div>
                  ) : (
                    <div className="akte-dossier__tour-row">
                      <div
                        className="grid min-w-0 flex-1 border border-[color:var(--color-control-border)]"
                        style={{
                          gridTemplateColumns: `repeat(${Math.max(tours.length, 1)}, minmax(0, 1fr))`,
                        }}
                        role="tablist"
                        aria-label={t.routeToggle.ariaLabel}
                      >
                        {tours.map((tab, tourIndex) => {
                          const copy = t.tours[tab.id];
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              role="tab"
                              aria-selected={tourId === tab.id}
                              onClick={() => onTourIdChange(tab.id)}
                              className={`brand-label min-h-11 px-1.5 py-2 text-center tracking-[0.1em] transition sm:px-3 sm:text-left ${
                                tourIndex > 0
                                  ? "border-l border-[color:var(--color-control-border)]"
                                  : ""
                              } ${
                                tourId === tab.id
                                  ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                                  : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                              }`}
                            >
                              <span className="block text-[10px] leading-tight sm:text-[11px]">
                                {copy.title}
                              </span>
                              <span className="mt-0.5 block text-[9px] font-normal leading-tight tracking-[0.08em] opacity-80 sm:text-[10px]">
                                {copy.stops}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <ReverseButton
                        routeReversed={routeReversed}
                        onRouteReversedChange={onRouteReversedChange}
                      />
                    </div>
                  )}

                  <p className="akte-dossier__start meta-mono text-[11px] tracking-normal text-[color:var(--color-pencil)]">
                    {format(t.direction.startAt, { name: currentStartName })}
                    {tourStats ? ` · ${tourStats}` : ""}
                  </p>

                  <div className="akte-dossier__status">
                    <div className="flex flex-wrap items-center gap-2">
                      {isRiddleTour && (
                        <div
                          className="grid grid-cols-2 border border-[color:var(--color-control-border)] sm:min-w-[15rem]"
                          role="group"
                          aria-label={t.playMode.ariaLabel}
                        >
                          <button
                            type="button"
                            onClick={() => freeTour && onFreeTourToggle()}
                            className={`brand-label min-h-11 px-3 py-2 text-[11px] tracking-[0.1em] transition ${
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
                            className={`brand-label min-h-11 border-l border-[color:var(--color-control-border)] px-3 py-2 text-[11px] tracking-[0.1em] transition ${
                              freeTour
                                ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                                : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                            }`}
                          >
                            {t.playMode.free}
                          </button>
                        </div>
                      )}
                      <p className="brand-label text-[10px] tracking-[0.1em] text-[color:var(--color-pencil)]">
                        {format(t.tourMode.visited, {
                          visited: visitedCount,
                          total: totalStops,
                        })}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onTourModeToggle}
                      className={`brand-label min-h-11 border px-4 py-2.5 text-[11px] tracking-[0.12em] transition ${
                        tourMode
                          ? "border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
                          : "btn-stamp hover:opacity-90"
                      }`}
                    >
                      {tourMode ? t.tourMode.endTour : t.tourMode.startTour}
                    </button>
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
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
