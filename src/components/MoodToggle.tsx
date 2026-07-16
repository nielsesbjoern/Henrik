import { useI18n } from "../i18n";
import { useMood, type Mood } from "../mood/context";

const moods: Mood[] = ["day", "dusk"];

export function MoodToggle() {
  const { t } = useI18n();
  const { mood, setMood } = useMood();

  const labels: Record<Mood, string> = {
    day: t.mood.day,
    dusk: t.mood.dusk,
  };

  return (
    <div
      className="flex border border-[color:var(--color-control-border)]"
      role="group"
      aria-label={t.mood.ariaLabel}
    >
      {moods.map((code, index) => (
        <button
          key={code}
          type="button"
          onClick={() => setMood(code)}
          className={`meta-mono px-3 py-1.5 text-xs transition ${
            mood === code
              ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
          } ${index > 0 ? "border-l border-[color:var(--color-control-border)]" : ""}`}
          aria-pressed={mood === code}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
