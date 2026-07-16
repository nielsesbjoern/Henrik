import { getCategoryConfig } from "../utils/categories";
import type { Category } from "../data/stops";
import { useI18n } from "../i18n";

const categories: Category[] = ["buchszene", "kulisse", "stadttour", "fan"];

export function Legend() {
  const { t } = useI18n();
  const categoryConfig = getCategoryConfig(t.categories);

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl text-ink">{t.legend.title}</h2>
        <p className="meta-mono mt-1 text-xs text-[color:var(--color-pencil)]">
          {t.legend.subtitle}
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className="file-card flex items-center gap-3 px-4 py-3"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border-2 border-[color:var(--color-paper)]"
                style={{ backgroundColor: categoryConfig[cat].color }}
                aria-hidden
              />
              <span className="text-sm text-ink">
                {categoryConfig[cat].label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
