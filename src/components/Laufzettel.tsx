import { useEffect, useRef, useState } from "react";
import type { RouteStop, TourType } from "../utils/tour";
import type { VisitedRecord } from "../hooks/useTourState";
import type { EvidencePhotos } from "../hooks/useEvidencePhotos";
import { StopStamp } from "./StopStamp";
import { EvidenceArchive } from "./EvidenceArchive";
import { WaxSeal } from "./WaxSeal";
import { useI18n } from "../i18n";

interface LaufzettelProps {
  tourType: TourType;
  routeStops: RouteStop[];
  solved: VisitedRecord;
  visited: VisitedRecord;
  photos: EvidencePhotos;
  animatingId: number | null;
  completionAnimating: boolean;
  allFoodComplete: boolean;
  onCompletionShown: () => void;
  onShare?: () => Promise<boolean>;
  onReset?: () => void;
  onNavigateToStop?: (stopId: number) => void;
}

export function Laufzettel({
  tourType,
  routeStops,
  solved,
  visited,
  photos,
  animatingId,
  completionAnimating,
  allFoodComplete,
  onCompletionShown,
  onShare,
  onReset,
  onNavigateToStop,
}: LaufzettelProps) {
  const { t, format } = useI18n();
  const wasCompleteRef = useRef(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "ok" | "fail">("idle");

  const totalActive = routeStops.length;

  const getEntry = (id: number) => solved[id] ?? visited[id];

  const sightedCount = routeStops.filter((stop) => getEntry(stop.id)).length;
  const isComplete = sightedCount === totalActive && totalActive > 0;

  useEffect(() => {
    if (isComplete && !wasCompleteRef.current) {
      onCompletionShown();
    }
    if (!isComplete) {
      wasCompleteRef.current = false;
      return;
    }
    wasCompleteRef.current = true;
  }, [isComplete, onCompletionShown]);

  const handleShare = async () => {
    if (!onShare) return;
    const ok = await onShare();
    setShareStatus(ok ? "ok" : "fail");
    window.setTimeout(() => setShareStatus("idle"), 2500);
  };

  const handleReset = () => {
    if (!onReset) return;
    if (!window.confirm(t.laufzettel.resetConfirm)) return;
    onReset();
  };

  return (
    <div className="laufzettel" aria-label={t.laufzettel.ariaLabel}>
      <div
        className={`file-card relative p-5 sm:p-8 ${
          completionAnimating || animatingId !== null ? "paper-shake" : ""
        }`}
      >
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
              {t.laufzettel.meta}
            </p>
            <h2 className="mt-1 text-2xl text-ink sm:text-3xl">
              {t.laufzettel.title}
            </h2>
          </div>
          {onShare && (
            <button
              type="button"
              onClick={handleShare}
              className="meta-mono shrink-0 border border-[color:var(--color-control-border)] px-3 py-1.5 text-[10px] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-card)]"
            >
              {shareStatus === "ok"
                ? t.progress.shared
                : shareStatus === "fail"
                  ? t.progress.shareFailed
                  : t.progress.share}
            </button>
          )}
        </header>

        <div className="relative">
          <ol
            className={`laufzettel-grid ${
              tourType === "full"
                ? "laufzettel-grid--full"
                : tourType === "short"
                  ? "laufzettel-grid--short"
                  : tourType === "riddle"
                    ? "laufzettel-grid--riddle"
                    : ""
            }`}
          >
            {routeStops.map((stop) => {
              const entry = getEntry(stop.id);

              return (
                <li key={`${tourType}-${stop.id}`} className="laufzettel-slot">
                  <div className="laufzettel-slot__field">
                    <span className="laufzettel-slot__circle" aria-hidden />
                    {entry && (
                      <div className="laufzettel-slot__stamp">
                        <StopStamp
                          stopId={stop.id}
                          stopNumber={stop.tourNumber}
                          placeName={stop.name}
                          category={stop.category}
                          date={entry.date}
                          animate={animatingId === stop.id}
                          sightedLabel={t.stamp.sighted}
                          ariaLabel={format(t.stamp.ariaLabel, {
                            number: stop.tourNumber,
                          })}
                        />
                      </div>
                    )}
                  </div>
                  <span className="laufzettel-slot__number meta-mono">
                    {String(stop.tourNumber).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ol>

          {isComplete && (
            <div className="laufzettel-completion">
              <WaxSeal
                animate={completionAnimating}
                label={t.laufzettel.caseClosed}
                subtitle={format(t.laufzettel.allSighted, { total: totalActive })}
              />
            </div>
          )}
        </div>

        <p className="meta-mono mt-6 text-xs text-[color:var(--color-pencil)]">
          {format(t.laufzettel.sighted, {
            count: String(sightedCount).padStart(2, "0"),
            total: String(totalActive).padStart(2, "0"),
          })}
        </p>

        {isComplete && (
          <p className="laufzettel-quote mt-4 text-lg text-ink sm:text-xl">
            {t.laufzettel.quote}
          </p>
        )}

        {isComplete && onReset && (
          <button
            type="button"
            onClick={handleReset}
            className="meta-mono mt-5 border border-[color:var(--color-control-border)] px-4 py-2.5 text-xs text-ink transition hover:bg-[color:var(--color-card)]"
          >
            {t.laufzettel.resetProgress}
          </button>
        )}

        <EvidenceArchive
          routeStops={routeStops}
          photos={photos}
          onNavigateToStop={onNavigateToStop}
        />

        {allFoodComplete && (
          <div className="laufzettel-food-stamp meta-mono" aria-hidden>
            {t.laufzettel.fullyTasted}
          </div>
        )}
      </div>
    </div>
  );
}
