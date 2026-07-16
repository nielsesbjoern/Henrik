import { useI18n } from "../i18n";

interface PlayModeToggleProps {
  freeTour: boolean;
  onToggle: () => void;
}

export function PlayModeToggle({ freeTour, onToggle }: PlayModeToggleProps) {
  const { t } = useI18n();

  return (
    <div className="border-b border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-4 py-2.5">
      <p className="meta-mono mb-1.5 text-[10px] tracking-[0.12em] text-[color:var(--color-pencil)]">
        {t.playMode.label}
      </p>
      <div
        className="grid grid-cols-2 border border-[color:var(--color-control-border)]"
        role="group"
        aria-label={t.playMode.ariaLabel}
      >
        <button
          type="button"
          onClick={() => freeTour && onToggle()}
          className={`meta-mono px-3 py-2 text-xs transition ${
            !freeTour
              ? "bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
          }`}
        >
          {t.playMode.riddle}
        </button>
        <button
          type="button"
          onClick={() => !freeTour && onToggle()}
          className={`meta-mono border-l border-[color:var(--color-control-border)] px-3 py-2 text-xs transition ${
            freeTour
              ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
          }`}
        >
          {t.playMode.free}
        </button>
      </div>
    </div>
  );
}
