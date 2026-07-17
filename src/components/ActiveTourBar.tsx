import { MoodToggle } from "./MoodToggle";
import { useI18n } from "../i18n";

interface ActiveTourBarProps {
  tourTitle: string;
  cityLabel: string;
  visitedCount: number;
  totalStops: number;
  currentIndex: number;
  isRiddleTour: boolean;
  freeTour: boolean;
  onFreeTourToggle: () => void;
  onEndTour: () => void;
}

export function ActiveTourBar({
  tourTitle,
  cityLabel,
  visitedCount,
  totalStops,
  currentIndex,
  isRiddleTour,
  freeTour,
  onFreeTourToggle,
  onEndTour,
}: ActiveTourBarProps) {
  const { t, format } = useI18n();
  const progress = totalStops > 0 ? (visitedCount / totalStops) * 100 : 0;

  return (
    <div className="active-tour-bar border-b border-[color:var(--color-control-border)] bg-[color:var(--color-paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="brand-label text-[10px] tracking-[0.14em] text-[color:var(--color-stamp)]">
              {t.tourMode.activeEyebrow}
            </p>
            <h2 className="mt-1 text-lg text-ink sm:text-xl">{tourTitle}</h2>
            <p className="meta-mono mt-1 text-[11px] text-[color:var(--color-pencil)]">
              {cityLabel}
              {" · "}
              {format(t.stopList.stopOf, {
                current: String(currentIndex + 1).padStart(2, "0"),
                total: String(totalStops).padStart(2, "0"),
              })}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <MoodToggle />
            <button
              type="button"
              onClick={onEndTour}
              className="brand-label min-h-11 border border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] px-4 py-2.5 text-[11px] tracking-[0.12em] text-[color:var(--color-paper)] transition hover:opacity-90"
            >
              {t.tourMode.endTour}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="brand-label text-[10px] tracking-[0.1em] text-[color:var(--color-pencil)]">
            {format(t.tourMode.visited, {
              visited: visitedCount,
              total: totalStops,
            })}
          </p>

          {isRiddleTour && (
            <div
              className="grid grid-cols-2 border border-[color:var(--color-control-border)] sm:min-w-[15rem]"
              role="group"
              aria-label={t.playMode.ariaLabel}
            >
              <button
                type="button"
                onClick={() => freeTour && onFreeTourToggle()}
                className={`brand-label min-h-11 min-w-0 px-2 py-2 text-[10px] tracking-[0.08em] transition whitespace-pre-line sm:px-3 sm:text-[11px] sm:tracking-[0.1em] ${
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
                className={`brand-label min-h-11 min-w-0 border-l border-[color:var(--color-control-border)] px-2 py-2 text-[10px] tracking-[0.08em] transition whitespace-pre-line sm:px-3 sm:text-[11px] sm:tracking-[0.1em] ${
                  freeTour
                    ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
                    : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                }`}
              >
                {t.playMode.free}
              </button>
            </div>
          )}
        </div>

        <div
          className="h-1 overflow-hidden bg-[color:var(--color-card)]"
          role="progressbar"
          aria-valuenow={visitedCount}
          aria-valuemin={0}
          aria-valuemax={totalStops}
        >
          <div
            className="h-full bg-[color:var(--color-azulejo)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
