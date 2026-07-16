import { getCategoryConfig } from "../utils/categories";
import type { Category } from "../data/stops";
import { useI18n } from "../i18n";

const categories: Category[] = ["buchszene", "kulisse", "stadttour", "fan"];

export function MapLegendChips() {
  const { t } = useI18n();
  const categoryConfig = getCategoryConfig(t.categories);

  return (
    <details className="map-legend-overlay group absolute bottom-16 left-3 z-[1000] max-w-[min(calc(100%-1.5rem),16rem)] sm:bottom-4">
      <summary className="map-pill-button meta-mono flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-[10px] text-ink">
        <span
          className="flex gap-0.5"
          aria-hidden
        >
          {categories.map((cat) => (
            <span
              key={cat}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: categoryConfig[cat].color }}
            />
          ))}
        </span>
        {t.legend.title}
      </summary>
      <ul
        className="mt-2 space-y-1.5 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] p-2.5 shadow-[0_1px_0_rgba(0,0,0,0.12)]"
        aria-label={t.legend.subtitle}
      >
        {categories.map((cat) => (
          <li
            key={cat}
            className="meta-mono flex items-center gap-2 text-[10px] text-ink"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: categoryConfig[cat].color }}
              aria-hidden
            />
            {categoryConfig[cat].label}
          </li>
        ))}
      </ul>
    </details>
  );
}
