import type { TourType } from "../utils/tour";
import { useI18n } from "../i18n";

interface RouteToggleProps {
  tourType: TourType;
  onChange: (type: TourType) => void;
}

export function RouteToggle({ tourType, onChange }: RouteToggleProps) {
  const { t } = useI18n();

  const tabs: { type: TourType; title: string; stops: string }[] = [
    { type: "full", title: t.routeToggle.fullTitle, stops: t.routeToggle.fullStops },
    { type: "short", title: t.routeToggle.shortTitle, stops: t.routeToggle.shortStops },
    { type: "riddle", title: t.routeToggle.riddleTitle, stops: t.routeToggle.riddleStops },
  ];

  return (
    <div className="border-b border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <p className="meta-mono text-xs text-[color:var(--color-pencil)]">
          {t.routeToggle.label}
        </p>
        <div
          className="grid grid-cols-1 border border-[color:var(--color-control-border)] sm:grid-cols-3"
          role="tablist"
          aria-label={t.routeToggle.ariaLabel}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={tourType === tab.type}
              onClick={() => onChange(tab.type)}
              className={`meta-mono px-3 py-2.5 text-left text-xs transition sm:px-4 ${
                index > 0 ? "border-t border-[color:var(--color-control-border)] sm:border-t-0 sm:border-l" : ""
              } ${
                tourType === tab.type
                  ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
              }`}
            >
              <span className="block">{tab.title}</span>
              <span className="block opacity-90">{tab.stops}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
