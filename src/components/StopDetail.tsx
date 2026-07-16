import { getCategoryConfig } from "../utils/categories";
import type { RouteStop, TourType } from "../utils/tour";
import {
  googleMapsDirectionsUrl,
  googleMapsSearchUrl,
} from "../utils/maps";
import { CategoryBadge } from "./CategoryBadge";
import { StopQuoteBlock } from "./StopQuote";
import { RiddlePanel } from "./RiddlePanel";
import { EvidencePhoto } from "./EvidencePhoto";
import { StopStamp } from "./StopStamp";
import { useI18n } from "../i18n";

interface StopDetailProps {
  stop: RouteStop;
  tourType: TourType;
  solvedIds: Set<number>;
  stampedIds: Set<number>;
  isUnlocked: boolean;
  canMarkDone: boolean;
  photoDataUrl: string | null;
  photoBusy: boolean;
  onAttachPhoto: (stopId: number, file: File) => Promise<boolean>;
  onRemovePhoto: (stopId: number) => Promise<boolean>;
  currentIndex?: number;
  totalStops?: number;
  onSubmitAnswer: (stopId: number, answer: string, answers: string[]) => boolean;
  onToggleVisited?: (stopId: number) => void;
  onNext?: () => void;
  canNext?: boolean;
  onClose: () => void;
}

export function StopDetail({
  stop,
  tourType,
  solvedIds,
  stampedIds,
  isUnlocked,
  canMarkDone,
  photoDataUrl,
  photoBusy,
  onAttachPhoto,
  onRemovePhoto,
  currentIndex = 0,
  totalStops = 0,
  onSubmitAnswer,
  onToggleVisited,
  onNext,
  canNext = false,
  onClose,
}: StopDetailProps) {
  const { t, format } = useI18n();
  const categoryConfig = getCategoryConfig(t.categories);
  const isRiddleTour = tourType === "riddle";
  const isStamped = stampedIds.has(stop.id);

  const handleDone = () => {
    if (!onToggleVisited) return;
    if (!isStamped) {
      onToggleVisited(stop.id);
      if (canNext && onNext) onNext();
      else onClose();
      return;
    }
    onToggleVisited(stop.id);
  };

  const showDoneFooter = canMarkDone && onToggleVisited && isUnlocked;

  return (
    <div id="stop-detail" className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-[color:var(--color-control-border)] px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="meta-mono min-h-10 text-xs text-[color:var(--color-azulejo)] transition hover:underline"
        >
          ← {t.stopDetail.backToList}
        </button>
        <span className="meta-mono text-xs text-[color:var(--color-pencil)]">
          {currentIndex + 1} / {totalStops}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        {isRiddleTour && !isUnlocked ? (
          <p className="meta-mono text-center text-xs text-[color:var(--color-pencil)]">
            {format(t.riddle.lockedHint, {
              number: String(Math.max(1, stop.tourNumber - 1)).padStart(2, "0"),
            })}
          </p>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <span
                className={`stop-marker stop-marker--list${
                  isStamped ? " stop-marker--visited stop-marker--stamped" : ""
                }`}
                style={{
                  position: "relative",
                  left: "auto",
                  top: "auto",
                  backgroundColor: isStamped
                    ? "var(--color-paper)"
                    : categoryConfig[stop.category].color,
                }}
                aria-hidden
              >
                <span className="stop-marker__label">
                  {isStamped ? (
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
              <div className="min-w-0 flex-1">
                <CategoryBadge category={stop.category} />
                <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink">
                  {stop.name}
                </h3>
                <p className="meta-mono mt-1 text-xs text-[color:var(--color-pencil)]">
                  {stop.district} · {stop.bookRef}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-pencil)]">
              {stop.description}
            </p>

            {stop.quote && (
              <details className="mt-4 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)]">
                <summary className="meta-mono cursor-pointer px-3 py-2 text-[11px] text-[color:var(--color-pencil)]">
                  {t.stopDetail.showQuote}
                </summary>
                <div className="border-t border-[color:var(--color-control-border)] px-3 py-3">
                  <StopQuoteBlock quote={stop.quote} />
                </div>
              </details>
            )}

            {stop.riddle && isRiddleTour && (
              <div className="mt-5">
                <RiddlePanel
                  riddle={stop.riddle}
                  solved={solvedIds.has(stop.id)}
                  onSubmit={(answer) =>
                    onSubmitAnswer(stop.id, answer, stop.riddle!.answers)
                  }
                />
              </div>
            )}

            <div className="mt-5">
              <EvidencePhoto
                stopId={stop.id}
                stopNumber={stop.tourNumber}
                placeName={stop.name}
                canAttach={isStamped}
                photoDataUrl={photoDataUrl}
                busy={photoBusy}
                onAttach={onAttachPhoto}
                onRemove={onRemovePhoto}
              />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={googleMapsDirectionsUrl(stop.lat, stop.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-mono flex min-h-11 items-center justify-center border border-[color:var(--color-azulejo)] bg-[color:var(--color-azulejo)] px-4 py-2.5 text-center text-xs text-[color:var(--color-paper)] transition"
              >
                {t.stopDetail.directions}
              </a>
              <a
                href={googleMapsSearchUrl(stop.lat, stop.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-mono py-1 text-center text-[11px] text-[color:var(--color-azulejo)] transition hover:underline"
              >
                {t.stopDetail.openInMaps}
              </a>
            </div>
          </>
        )}
      </div>

      {showDoneFooter && (
        <div className="border-t border-[color:var(--color-control-border)] px-4 py-3">
          <button
            type="button"
            onClick={handleDone}
            className={`meta-mono flex min-h-12 w-full items-center justify-center border px-4 py-3 text-xs transition ${
              isStamped
                ? "border-[color:var(--color-control-border)] bg-[color:var(--color-card)] text-[color:var(--color-pencil)]"
                : "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
            }`}
          >
            {isStamped
              ? t.stopDetail.undoDone
              : canNext
                ? t.stopDetail.doneNext
                : t.stopDetail.done}
          </button>
        </div>
      )}
    </div>
  );
}
