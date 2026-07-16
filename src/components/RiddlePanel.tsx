import { useState, type FormEvent } from "react";
import type { StopRiddle } from "../i18n/types";
import { useI18n } from "../i18n";

interface RiddlePanelProps {
  riddle: StopRiddle;
  solved: boolean;
  onSubmit: (answer: string) => boolean;
}

export function RiddlePanel({ riddle, solved, onSubmit }: RiddlePanelProps) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (solved) return;

    const ok = onSubmit(input);
    setFeedback(ok ? "correct" : "wrong");
    if (ok) setInput("");
  };

  if (solved) {
    return (
      <div className="riddle-panel riddle-panel--solved">
        <p className="meta-mono text-xs tracking-[0.1em] text-[color:var(--color-pencil)]">
          {t.riddle.title}
        </p>
        <p className="mt-2 text-sm text-ink">{riddle.question}</p>
        <p className="meta-mono mt-3 text-xs font-semibold text-[color:var(--color-azulejo)]">
          ✓ {t.riddle.solved}
        </p>
      </div>
    );
  }

  return (
    <div className="riddle-panel">
      <p className="meta-mono text-xs tracking-[0.1em] text-[color:var(--color-pencil)]">
        {t.riddle.title}
      </p>
      <p className="mt-2 book-prose text-[1.05rem] leading-[1.65] text-ink">{riddle.question}</p>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setFeedback(null);
          }}
          placeholder={t.riddle.inputLabel}
          aria-label={t.riddle.inputLabel}
          className="meta-mono min-w-0 flex-1 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-3 py-2 text-xs text-ink"
          autoComplete="off"
          autoCapitalize="off"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="meta-mono shrink-0 border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 text-xs text-[color:var(--color-paper)] transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.riddle.check}
        </button>
      </form>

      {feedback === "correct" && (
        <p className="meta-mono mt-2 text-xs font-semibold text-[color:var(--color-azulejo)]">
          ✓ {t.riddle.correct}
        </p>
      )}
      {feedback === "wrong" && (
        <p className="meta-mono mt-2 text-xs text-[color:var(--color-stamp)]">
          ✗ {t.riddle.wrong}
        </p>
      )}

      {riddle.hint && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="meta-mono text-[11px] text-[color:var(--color-pencil)] underline decoration-dotted underline-offset-2"
          >
            {showHint ? t.riddle.hideHint : t.riddle.showHint}
          </button>
          {showHint && (
            <p className="meta-mono mt-1 text-[11px] leading-relaxed text-[color:var(--color-pencil)]">
              {riddle.hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
