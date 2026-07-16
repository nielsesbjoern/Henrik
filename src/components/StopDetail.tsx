import { getCategoryConfig } from "../utils/categories";
import type { RouteStop, TourType } from "../utils/route";
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

function formatCoords(lat: number, lng: number, approximate: boolean): string {
  const value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  return approximate ? `≈ ${value}` : value;
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
  const isFictional = stop.category === "fiktiv";
  const caseNumber = String(stop.tourNumber).padStart(3, "0");
  const mapsUrl = googleMapsSearchUrl(stop.lat, stop.lng);
  const showVerifiedRiddle =
    Boolean(stop.riddle) &&
    isRiddleTour &&
    stop.riddle?.verified !== false;

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
            <article
              className={`file-card relative p-4 sm:p-5 ${
                isStamped
                  ? "border-[color:var(--color-stamp)]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="brand-label text-[10px] text-[color:var(--color-pencil)] sm:text-[11px]">
                  {format(t.stopDetail.cardLabel, { number: caseNumber })}
                </p>
                <span
                  className={`stop-marker stop-marker--list shrink-0${
                    isStamped ? " stop-marker--visited stop-marker--stamped" : ""
                  }${
                    !isStamped && stop.category === "rekonstruiert"
                      ? " stop-marker--reconstructed"
                      : ""
                  }${
                    !isStamped && stop.category === "fiktiv"
                      ? " stop-marker--fictional"
                      : ""
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
              </div>

              <CategoryBadge category={stop.category} />
              <h3 className="book-place-name mt-2 text-xl text-ink sm:text-2xl">
                {stop.name}
              </h3>

              {isFictional && (
                <p className="meta-mono mt-2 text-[10px] leading-snug tracking-[0.04em] text-[color:var(--color-pencil)]">
                  {t.stopDetail.fictionalPlaceNote}
                </p>
              )}

              <div className="meta-data mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] text-[color:var(--color-pencil)] sm:text-xs">
                <span>{t.stopDetail.caseNo}</span>
                <span>HF-{caseNumber}</span>
                <span>{t.stopDetail.district}</span>
                <span>{stop.district.toUpperCase()}</span>
                <span>{t.stopDetail.coordinates}</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--color-azulejo)] transition hover:underline"
                >
                  {formatCoords(stop.lat, stop.lng, isFictional)}
                </a>
                <span>{t.stopDetail.volume}</span>
                <span>{stop.bookRef.toUpperCase()}</span>
              </div>
            </article>

            <p className="book-prose mt-5 text-[1.05rem] leading-[1.65] text-[color:var(--color-ink)]">
              {stop.description}
            </p>

            {stop.quote && (
              <details className="stop-quote-shell mt-5">
                <summary className="meta-mono cursor-pointer px-3 py-2.5 text-[11px] tracking-[0.08em] text-[color:var(--color-pencil)]">
                  {t.stopDetail.showQuote}
                </summary>
                <div className="border-t border-[color:var(--color-control-border)] px-3 py-3">
                  <StopQuoteBlock quote={stop.quote} />
                </div>
              </details>
            )}

            {showVerifiedRiddle && stop.riddle && (
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
                className="btn-stamp brand-label flex min-h-11 items-center justify-center px-4 py-2.5 text-center text-[11px] tracking-[0.12em]"
              >
                {t.stopDetail.directions}
              </a>
              <a
                href={mapsUrl}
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
            className={`brand-label flex min-h-12 w-full items-center justify-center border px-4 py-3 text-[11px] tracking-[0.12em] transition ${
              isStamped
                ? "border-[color:var(--color-control-border)] bg-[color:var(--color-card)] text-[color:var(--color-pencil)]"
                : "btn-stamp"
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
