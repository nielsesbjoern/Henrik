import type { RouteStop } from "../utils/tour";
import { useI18n } from "../i18n";
import type { EvidencePhotos } from "../hooks/useEvidencePhotos";

interface EvidenceArchiveProps {
  routeStops: RouteStop[];
  photos: EvidencePhotos;
  onNavigateToStop?: (stopId: number) => void;
}

export function EvidenceArchive({
  routeStops,
  photos,
  onNavigateToStop,
}: EvidenceArchiveProps) {
  const { t, format } = useI18n();

  const entries = routeStops.filter((stop) => photos[stop.id]);
  if (entries.length === 0) return null;

  return (
    <section className="evidence-archive mt-8" aria-label={t.evidence.archiveAria}>
      <header className="mb-3">
        <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
          {t.evidence.archiveMeta}
        </p>
        <h3 className="mt-1 text-xl text-ink">{t.evidence.archiveTitle}</h3>
        <p className="meta-mono mt-1 text-[11px] text-[color:var(--color-pencil)]">
          {format(t.evidence.archiveCount, {
            count: entries.length,
            total: routeStops.length,
          })}
        </p>
      </header>

      <ul className="evidence-archive__grid">
        {entries.map((stop) => {
          const padded = String(stop.tourNumber).padStart(2, "0");
          const dataUrl = photos[stop.id];

          return (
            <li key={stop.id}>
              <button
                type="button"
                className="evidence-polaroid evidence-polaroid--mini w-full text-left"
                onClick={() => onNavigateToStop?.(stop.id)}
              >
                <img
                  src={dataUrl}
                  alt={format(t.evidence.photoAlt, {
                    number: padded,
                    name: stop.name,
                  })}
                  className="evidence-polaroid__img"
                />
                <span className="evidence-polaroid__caption meta-mono">
                  {format(t.evidence.caption, { number: padded })}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
