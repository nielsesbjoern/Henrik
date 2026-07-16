import type { TourType } from "../utils/tour";
import { useI18n } from "../i18n";

interface InfoCardsProps {
  tourType: TourType;
}

export function InfoCards({ tourType }: InfoCardsProps) {
  const { t } = useI18n();
  const items =
    tourType === "full"
      ? t.infoCards.full
      : tourType === "riddle"
        ? t.infoCards.riddle
        : t.infoCards.short;

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl text-ink">{t.infoCards.title}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="file-card px-4 py-3"
            >
              <p className="meta-mono text-xs text-[color:var(--color-pencil)]">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
