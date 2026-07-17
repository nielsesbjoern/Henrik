import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getRouteStops, tourIdToType, type TourType } from "./utils/route";
import { TourControls } from "./components/TourControls";
import { ActiveTourBar } from "./components/ActiveTourBar";
import { WorkspaceTabs } from "./components/WorkspaceTabs";
import { NextStopNavigator } from "./components/NextStopNavigator";
import { StopList } from "./components/StopList";
import { StopDetail } from "./components/StopDetail";
import { Laufzettel } from "./components/Laufzettel";
import { HenriksSpeisekarte } from "./components/HenriksSpeisekarte";
import { GastroGuide } from "./components/GastroGuide";
import { InvestigatorNotes } from "./components/InvestigatorNotes";
import { useGeolocation } from "./hooks/useGeolocation";
import { useEvidencePhotos } from "./hooks/useEvidencePhotos";
import { isStopUnlocked, getNextUnsolvedStop } from "./utils/riddle";
import type { RouteStop } from "./utils/route";
import type { TourState, VisitedRecord } from "./hooks/useTourState";
import type { CityId } from "./data/types";
import { useI18n } from "./i18n";

const TourMap = lazy(() => import("./components/TourMap"));

function MapLoading() {
  const { t } = useI18n();
  return (
    <div className="flex h-full w-full items-center justify-center bg-[color:var(--color-card)]">
      <p className="meta-mono text-xs text-[color:var(--color-pencil)]">{t.map.loading}</p>
    </div>
  );
}

function mergeStampedRecord(solved: VisitedRecord, visited: VisitedRecord): VisitedRecord {
  return { ...visited, ...solved };
}

interface MapSectionProps {
  tourState: TourState;
  onTourModeChange?: (active: boolean) => void;
}

export function MapSection({ tourState, onTourModeChange }: MapSectionProps) {
  const { t, format, stops } = useI18n();
  const [routeReversed, setRouteReversed] = useState(false);
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);
  const [tourMode, setTourMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    cityId,
    setCityId,
    tourId,
    setTourId,
    city,
    activeTour,
    solved,
    solvedIds,
    visited,
    stampedIds,
    foodChecked,
    allFoodComplete,
    globalSightedCount,
    totalStopCount,
    allCitiesComplete,
    freeTour,
    toggleVisited,
    submitAnswer,
    toggleFood,
    toggleFreeTour,
    shareProgress,
    resetProgress,
    notes,
    setNotes,
    animatingId,
    completionAnimating,
    triggerCompletionAnimation,
  } = tourState;
  const {
    photos,
    busyStopId,
    attachPhoto,
    removePhoto,
    clearPhotos,
  } = useEvidencePhotos();
  const [mapReady, setMapReady] = useState(false);
  const [protocolRevealSignal, setProtocolRevealSignal] = useState(0);
  const wasRouteCompleteRef = useRef(false);
  const pendingStopIdRef = useRef<number | null>(null);

  const tourType: TourType = tourIdToType(tourId);
  const isRiddleTour = tourType === "riddle";
  const geoEnabled = isRiddleTour && tourMode;
  const { position, error: geoError } = useGeolocation({ enabled: geoEnabled });

  const routeStops = useMemo(
    () => getRouteStops(stops, tourId, routeReversed),
    [stops, tourId, routeReversed],
  );

  const resetKey = `${cityId}-${tourId}-${routeReversed}-${routeStops.map((s) => s.id).join("-")}`;
  const currentStartName = routeStops[0]?.name ?? "";
  const stampedRecord = useMemo(
    () => mergeStampedRecord(solved, visited),
    [solved, visited],
  );

  const nextUnsolvedStop = useMemo(
    () => (isRiddleTour ? getNextUnsolvedStop(routeStops, solvedIds) : null),
    [isRiddleTour, routeStops, solvedIds],
  );

  const stampedInRoute = useMemo(
    () => routeStops.filter((s) => stampedIds.has(s.id)).length,
    [routeStops, stampedIds],
  );

  const isRouteComplete =
    routeStops.length > 0 && stampedInRoute === routeStops.length;

  useEffect(() => {
    onTourModeChange?.(tourMode);
  }, [tourMode, onTourModeChange]);

  useEffect(() => {
    wasRouteCompleteRef.current = false;
  }, [tourId, routeReversed]);

  useEffect(() => {
    if (isRouteComplete && tourMode && !wasRouteCompleteRef.current) {
      wasRouteCompleteRef.current = true;
      setSelectedStop(null);
      setProtocolRevealSignal((n) => n + 1);
    }
    if (!isRouteComplete) {
      wasRouteCompleteRef.current = false;
    }
  }, [isRouteComplete, tourMode]);

  const activeStopId = tourMode
    ? routeStops[currentIndex]?.id ?? null
    : selectedStop?.id ?? null;

  const flyToStop = useMemo(() => {
    if (selectedStop) return selectedStop;
    if (tourMode && routeStops[currentIndex]) return routeStops[currentIndex];
    return null;
  }, [selectedStop, tourMode, routeStops, currentIndex]);

  useEffect(() => {
    const target = document.getElementById("tour");
    if (!target || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setMapReady(true), 100);
      return () => window.clearTimeout(timer);
    }

    let fallbackId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMapReady(true);
          observer.disconnect();
          window.clearTimeout(fallbackId);
        }
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(target);
    fallbackId = window.setTimeout(() => {
      setMapReady(true);
      observer.disconnect();
    }, 2_500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackId);
    };
  }, []);

  useEffect(() => {
    setSelectedStop(null);
    setCurrentIndex(0);
    setTourMode(false);
    setRouteReversed(false);
  }, [cityId]);

  useEffect(() => {
    const pendingId = pendingStopIdRef.current;
    if (pendingId === null) return;
    const stop = routeStops.find((s) => s.id === pendingId);
    if (!stop) return;
    pendingStopIdRef.current = null;
    setSelectedStop(stop);
    if (!tourMode) {
      setTourMode(true);
      const idx = routeStops.findIndex((s) => s.id === stop.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [routeStops, cityId, tourMode]);

  useEffect(() => {
    setSelectedStop(null);
    setCurrentIndex(0);
    setTourMode(false);
  }, [stops]);

  const handleCityChange = useCallback(
    (next: CityId) => {
      pendingStopIdRef.current = null;
      setCityId(next);
    },
    [setCityId],
  );

  const handleTourIdChange = useCallback(
    (next: string) => {
      setTourId(next);
      setSelectedStop(null);
      setCurrentIndex(0);
      setTourMode(false);
    },
    [setTourId],
  );

  const handleRouteReversedChange = useCallback((reversed: boolean) => {
    setRouteReversed(reversed);
    setSelectedStop(null);
    setCurrentIndex(0);
    setTourMode(false);
  }, []);

  const handleStopSelect = useCallback((stop: RouteStop) => {
    setSelectedStop(stop);
    if (tourMode) {
      const idx = routeStops.findIndex((s) => s.id === stop.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
    if (!tourMode) return;
    requestAnimationFrame(() => {
      document.getElementById("stop-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [tourMode, routeStops]);

  const handleCloseDetail = useCallback(() => {
    setSelectedStop(null);
  }, []);

  const handleStopClick = useCallback((stop: RouteStop) => {
    handleStopSelect(stop);
  }, [handleStopSelect]);

  const handleNavigateToStop = useCallback(
    (stopId: number) => {
      const base = stops.find((s) => s.id === stopId);
      if (!base) return;

      document.getElementById("tour")?.scrollIntoView({ behavior: "smooth" });

      if (base.cityId !== cityId) {
        pendingStopIdRef.current = stopId;
        setCityId(base.cityId);
        return;
      }

      const routeStop =
        routeStops.find((s) => s.id === stopId) ?? {
          ...base,
          tourNumber: routeStops.findIndex((s) => s.id === stopId) + 1 || 1,
        };

      if (!tourMode) {
        setTourMode(true);
        const idx = routeStops.findIndex((s) => s.id === stopId);
        setCurrentIndex(idx >= 0 ? idx : 0);
      }
      handleStopSelect(routeStop);
    },
    [stops, routeStops, handleStopSelect, cityId, setCityId, tourMode],
  );

  const handleStartTour = useCallback(() => {
    setCurrentIndex(0);
    setSelectedStop(routeStops[0] ?? null);
    setTourMode(true);
    requestAnimationFrame(() => {
      document.getElementById("tour")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [routeStops]);

  const handleEndTour = useCallback(() => {
    setTourMode(false);
    setSelectedStop(null);
    setCurrentIndex(0);
    requestAnimationFrame(() => {
      document.getElementById("tour")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  const selectedIndex = selectedStop
    ? routeStops.findIndex((s) => s.id === selectedStop.id)
    : -1;

  const selectedUnlocked = selectedIndex >= 0
    ? isStopUnlocked(selectedIndex, routeStops, solvedIds, freeTour || !isRiddleTour)
    : true;

  const handleDetailNext = useCallback(() => {
    if (selectedIndex < 0 || selectedIndex >= routeStops.length - 1) return;
    const nextIndex = selectedIndex + 1;
    setSelectedStop(routeStops[nextIndex] ?? null);
    if (tourMode) setCurrentIndex(nextIndex);
  }, [routeStops, selectedIndex, tourMode]);

  const handleResetProgress = useCallback(() => {
    resetProgress();
    void clearPhotos();
    setSelectedStop(null);
    setCurrentIndex(0);
    setTourMode(false);
  }, [resetProgress, clearPhotos]);

  const cityLabel =
    cityId === "cascais" ? t.cities.cascaisShort : t.cities.lisboaShort;
  const tourTitle = t.tours[activeTour.id]?.title ?? t.tourMode.title;

  const mapBlock = (
    <div
      className={
        tourMode
          ? "relative h-[48vh] min-h-[280px] sm:h-[50vh] sm:min-h-[300px] lg:col-span-7 lg:h-auto lg:min-h-[640px]"
          : "relative h-[52vh] min-h-[300px] sm:h-[56vh] sm:min-h-[340px] lg:h-[70vh] lg:min-h-[520px]"
      }
    >
      {mapReady ? (
        <Suspense fallback={<MapLoading />}>
          <TourMap
            routeStops={routeStops}
            tourType={tourType}
            activeStopId={activeStopId}
            visited={stampedRecord}
            onStopSelect={handleStopSelect}
            flyToStop={flyToStop}
            resetKey={resetKey}
            cityId={cityId}
            mapCenter={city.center}
          />
        </Suspense>
      ) : (
        <MapLoading />
      )}
    </div>
  );

  return (
    <section id="tour" className="border-b border-[color:var(--color-control-border)]">
      {!tourMode ? (
        <>
          <TourControls
            cityId={cityId}
            onCityChange={handleCityChange}
            stampedIds={stampedIds}
            tours={city.tours}
            tourId={tourId}
            onTourIdChange={handleTourIdChange}
            routeReversed={routeReversed}
            onRouteReversedChange={handleRouteReversedChange}
            currentStartName={currentStartName}
            tourStats={t.tours[activeTour.id]?.stats ?? ""}
            isRiddleTour={isRiddleTour}
            freeTour={freeTour}
            onFreeTourToggle={toggleFreeTour}
            onTourModeToggle={handleStartTour}
            hideTourTabs={city.tours.length <= 1}
          />

          {mapBlock}

          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <p className="meta-mono text-[11px] tracking-normal text-[color:var(--color-pencil)]">
              {format(t.direction.startAt, { name: currentStartName })}
              {" · "}
              {format(t.stopList.entriesHint, {
                count: String(routeStops.length).padStart(2, "0"),
              })}
            </p>
          </div>
        </>
      ) : (
        <>
          <ActiveTourBar
            tourTitle={tourTitle}
            cityLabel={cityLabel}
            visitedCount={stampedInRoute}
            totalStops={routeStops.length}
            currentIndex={currentIndex}
            isRiddleTour={isRiddleTour}
            freeTour={freeTour}
            onFreeTourToggle={toggleFreeTour}
            onEndTour={handleEndTour}
          />

          <div className="grid grid-cols-1 lg:min-h-[640px] lg:grid-cols-12">
            {mapBlock}

            <div className="flex min-h-0 flex-col border-t border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] lg:col-span-5 lg:border-l lg:border-t-0">
              {geoEnabled && (
                <NextStopNavigator
                  nextStop={nextUnsolvedStop}
                  position={position}
                  geoError={geoError}
                />
              )}

              <div className="flex min-h-0 flex-1 flex-col">
                {selectedStop ? (
                  <StopDetail
                    stop={selectedStop}
                    tourType={tourType}
                    solvedIds={solvedIds}
                    stampedIds={stampedIds}
                    isUnlocked={selectedUnlocked}
                    canMarkDone={!isRiddleTour || freeTour}
                    photoDataUrl={photos[selectedStop.id] ?? null}
                    photoBusy={busyStopId === selectedStop.id}
                    onAttachPhoto={attachPhoto}
                    onRemovePhoto={removePhoto}
                    currentIndex={selectedIndex >= 0 ? selectedIndex : 0}
                    totalStops={routeStops.length}
                    onSubmitAnswer={submitAnswer}
                    onToggleVisited={
                      !isRiddleTour || freeTour ? toggleVisited : undefined
                    }
                    onNext={handleDetailNext}
                    canNext={
                      selectedIndex >= 0 && selectedIndex < routeStops.length - 1
                    }
                    onClose={handleCloseDetail}
                  />
                ) : (
                  <StopList
                    routeStops={routeStops}
                    activeStopId={activeStopId}
                    stampedIds={stampedIds}
                    solvedIds={solvedIds}
                    tourMode={false}
                    tourType={tourType}
                    freeTour={freeTour}
                    currentIndex={currentIndex}
                    onStopClick={handleStopClick}
                    onToggleVisited={
                      !isRiddleTour || freeTour ? toggleVisited : undefined
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <WorkspaceTabs
            revealProtocolSignal={protocolRevealSignal}
            protocol={
              <Laufzettel
                tourType={tourType}
                routeStops={routeStops}
                cityId={cityId}
                solved={solved}
                visited={visited}
                photos={photos}
                animatingId={animatingId}
                completionAnimating={completionAnimating}
                allFoodComplete={allFoodComplete}
                globalSightedCount={globalSightedCount}
                totalStopCount={totalStopCount}
                allCitiesComplete={allCitiesComplete}
                onCompletionShown={triggerCompletionAnimation}
                onShare={shareProgress}
                onReset={handleResetProgress}
                onNavigateToStop={handleNavigateToStop}
              />
            }
            food={
              <div className="flex flex-col gap-4">
                <div className="file-card p-4 sm:p-5">
                  <HenriksSpeisekarte
                    foodChecked={foodChecked}
                    onToggleFood={toggleFood}
                    onNavigateToStop={handleNavigateToStop}
                    cityId={cityId}
                  />
                </div>
                <GastroGuide cityId={cityId} />
              </div>
            }
            notes={
              <InvestigatorNotes
                notes={notes}
                onChange={setNotes}
                onShare={shareProgress}
              />
            }
          />
        </>
      )}
    </section>
  );
}
