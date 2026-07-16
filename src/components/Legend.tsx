import { stopBases } from "../data/stops";
import type { CityId } from "../data/types";
import {
  categoriesPresentIn,
  getCategoryConfig,
} from "../utils/categories";
import { useI18n } from "../i18n";

interface LegendProps {
  cityId?: CityId;
}

export function Legend({ cityId = "lisboa" }: LegendProps) {
  const { t } = useI18n();
  const categoryConfig = getCategoryConfig(t.categories);
  const categories = categoriesPresentIn(
    stopBases.filter((s) => s.cityId === cityId),
  );

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
              className="file-card flex items-start gap-3 px-4 py-3"
            >
              <span
                className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-[color:var(--color-paper)] ${
                  categoryConfig[cat].dashed
                    ? "border-dashed bg-transparent"
                    : ""
                }`}
                style={
                  categoryConfig[cat].dashed
                    ? {
                        borderColor: categoryConfig[cat].color,
                        backgroundColor: "transparent",
                      }
                    : { backgroundColor: categoryConfig[cat].color }
                }
                aria-hidden
              />
              <span className="text-sm text-ink">
                {categoryConfig[cat].label}
                {cat === "rekonstruiert" && (
                  <span className="meta-mono mt-1 block text-[10px] leading-snug text-[color:var(--color-pencil)]">
                    {t.legend.reconstructedNote}
                  </span>
                )}
                {cat === "fiktiv" && (
                  <span className="meta-mono mt-1 block text-[10px] leading-snug text-[color:var(--color-pencil)]">
                    {t.legend.fictionalNote}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
