import { useState } from "react";
import { NOTES_MAX_LENGTH } from "../hooks/useTourState";
import { useI18n } from "../i18n";

interface InvestigatorNotesProps {
  notes: string;
  onChange: (value: string) => void;
  onShare?: () => Promise<boolean>;
}

export function InvestigatorNotes({
  notes,
  onChange,
  onShare,
}: InvestigatorNotesProps) {
  const { t, format } = useI18n();
  const [shareStatus, setShareStatus] = useState<"idle" | "ok" | "fail">("idle");

  const handleShare = async () => {
    if (!onShare) return;
    const ok = await onShare();
    setShareStatus(ok ? "ok" : "fail");
    window.setTimeout(() => setShareStatus("idle"), 2500);
  };

  return (
    <section className="file-card p-5 sm:p-8" aria-label={t.notes.ariaLabel}>
        <header className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
              {t.notes.meta}
            </p>
            <h2 className="mt-1 text-2xl text-ink sm:text-3xl">{t.notes.title}</h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[color:var(--color-pencil)]">
              {t.notes.subtitle}
            </p>
          </div>
          {onShare && (
            <button
              type="button"
              onClick={() => void handleShare()}
              className="meta-mono shrink-0 border border-[color:var(--color-control-border)] px-3 py-1.5 text-[10px] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-paper)]"
            >
              {shareStatus === "ok"
                ? t.progress.shared
                : shareStatus === "fail"
                  ? t.progress.shareFailed
                  : t.notes.share}
            </button>
          )}
        </header>

        <label className="sr-only" htmlFor="investigator-notes">
          {t.notes.inputLabel}
        </label>
        <textarea
          id="investigator-notes"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          maxLength={NOTES_MAX_LENGTH}
          rows={6}
          placeholder={t.notes.placeholder}
          className="investigator-notes__field w-full resize-y border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-3 py-3 text-sm leading-relaxed text-ink outline-none transition focus:border-[color:var(--color-azulejo)]"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="meta-mono text-[10px] tracking-[0.08em] text-[color:var(--color-pencil)]">
            {t.notes.hint}
          </p>
          <p className="meta-mono text-[10px] tracking-[0.08em] text-[color:var(--color-pencil)]">
            {format(t.notes.counter, {
              count: notes.length,
              max: NOTES_MAX_LENGTH,
            })}
          </p>
        </div>
    </section>
  );
}
