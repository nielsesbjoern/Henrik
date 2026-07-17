import { useEffect, useMemo, useState } from "react";
import {
  gastroMapsUrl,
  type GastroCategory,
  type GastroFilter,
  type GastroRestaurant,
} from "../data/gastro";
import type { CityId } from "../data/types";
import { useI18n } from "../i18n";

const FILTERS: GastroFilter[] = [
  "all",
  "steak",
  "lamb",
  "seafood",
  "tasca",
  "antiquariat",
  "morbid",
  "ritual",
];

function categoryClass(category: GastroCategory): string {
  return `gastro-badge gastro-badge--${category}`;
}

interface GastroGuideProps {
  cityId: CityId;
  /** When true, the list is always visible (no collapse header). */
  alwaysOpen?: boolean;
}

export function GastroGuide({ cityId, alwaysOpen = false }: GastroGuideProps) {
  const { t, format, gastroItems } = useI18n();
  const [open, setOpen] = useState(alwaysOpen);
  const [filter, setFilter] = useState<GastroFilter>("all");

  const cityItems = useMemo(
    () => gastroItems.filter((item) => item.cityId === cityId),
    [gastroItems, cityId],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return cityItems;
    return cityItems.filter((item) => item.category === filter);
  }, [filter, cityItems]);

  const availableFilters = useMemo(() => {
    const present = new Set(cityItems.map((item) => item.category));
    return FILTERS.filter((f) => f === "all" || present.has(f));
  }, [cityItems]);

  useEffect(() => {
    setFilter("all");
  }, [cityId]);

  useEffect(() => {
    if (filter !== "all" && !availableFilters.includes(filter)) {
      setFilter("all");
    }
  }, [filter, availableFilters]);

  const filterLabel = (f: GastroFilter) =>
    f === "all" ? t.gastro.filters.all : t.gastro.filters[f];

  const isOpen = alwaysOpen || open;

  return (
    <section className="gastro-guide file-card" aria-label={t.gastro.ariaLabel}>
      {!alwaysOpen && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="gastro-guide-panel"
          className="flex w-full items-start justify-between gap-3 p-5 text-left transition hover:bg-[color:var(--color-card)] sm:p-6"
        >
          <div className="min-w-0">
            <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
              {t.gastro.meta}
            </p>
            <h2 className="mt-1 text-xl text-ink sm:text-2xl">{t.gastro.title}</h2>
            <p className="mt-1 text-sm text-[color:var(--color-pencil)]">
              {t.gastro.subtitle}
            </p>
            {!isOpen && (
              <p className="meta-mono mt-2 text-[10px] text-[color:var(--color-pencil)]">
                {format(t.gastro.countHint, { count: cityItems.length })}
              </p>
            )}
          </div>
          <span
            className={`meta-mono shrink-0 pt-1 text-[color:var(--color-pencil)] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
          <span className="sr-only">
            {isOpen ? t.gastro.collapse : t.gastro.expand}
          </span>
        </button>
      )}

      {alwaysOpen && (
        <header className="border-b border-[color:var(--color-control-border)] p-5 sm:p-6">
          <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
            {t.gastro.meta}
          </p>
          <h2 className="mt-1 text-xl text-ink sm:text-2xl">{t.gastro.title}</h2>
          <p className="mt-1 text-sm text-[color:var(--color-pencil)]">
            {t.gastro.subtitle}
          </p>
        </header>
      )}

      <div
        id="gastro-guide-panel"
        className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
          isOpen ? "max-h-[4000px]" : "max-h-0"
        }`}
      >
        <div
          className={`px-5 pb-5 pt-4 sm:px-6 sm:pb-6 ${
            alwaysOpen ? "" : "border-t border-[color:var(--color-control-border)]"
          }`}
        >
          <div
            className="mb-3 flex shrink-0 flex-wrap gap-1.5"
            role="group"
            aria-label={t.gastro.filterAria}
          >
            {availableFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`meta-mono inline-flex min-h-11 items-center px-2.5 py-1.5 text-[11px] transition ${
                  filter === f
                    ? "border border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] text-[color:var(--color-paper)]"
                    : "border border-[color:var(--color-control-border)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
                }`}
              >
                {filterLabel(f)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="meta-mono text-xs text-[color:var(--color-pencil)]">
              {t.gastro.empty}
            </p>
          ) : (
            <ul className="gastro-guide__list max-h-[22rem] space-y-3 overflow-y-auto overscroll-contain pr-1 sm:max-h-[28rem]">
              {filtered.map((item) => (
                <GastroCard key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function GastroCard({ item }: { item: GastroRestaurant }) {
  const { t } = useI18n();

  return (
    <li className="gastro-card border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-base leading-snug text-ink">
            {item.name}
          </h3>
          <p className="meta-mono mt-0.5 text-[10px] tracking-[0.08em] text-[color:var(--color-pencil)]">
            {item.area}
          </p>
        </div>
        <span className={categoryClass(item.category)}>
          {t.gastro.categories[item.category]}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-pencil)]">
        {item.description}
      </p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-dashed border-[color:var(--color-control-border)] pt-2">
        <p className="font-display text-xs italic text-ink">
          {item.recommendation}
        </p>
        <a
          href={gastroMapsUrl(item.mapsQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="meta-mono shrink-0 text-[11px] font-semibold text-[color:var(--color-stamp)] transition hover:text-[color:var(--color-ink)]"
        >
          {t.gastro.mapsLink}
        </a>
      </div>
    </li>
  );
}
