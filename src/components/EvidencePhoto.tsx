import { useId, useState, type ChangeEvent } from "react";
import { useI18n } from "../i18n";

interface EvidencePhotoProps {
  stopId: number;
  stopNumber: number;
  placeName: string;
  canAttach: boolean;
  photoDataUrl: string | null;
  busy: boolean;
  onAttach: (stopId: number, file: File) => Promise<boolean>;
  onRemove: (stopId: number) => Promise<boolean>;
}

export function EvidencePhoto({
  stopId,
  stopNumber,
  placeName,
  canAttach,
  photoDataUrl,
  busy,
  onAttach,
  onRemove,
}: EvidencePhotoProps) {
  const { t, format } = useI18n();
  const inputId = useId();
  const [localError, setLocalError] = useState(false);

  if (!canAttach && !photoDataUrl) return null;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;

    setLocalError(false);
    const ok = await onAttach(stopId, file);
    if (!ok) setLocalError(true);
  };

  const handleRemove = async () => {
    setLocalError(false);
    const ok = await onRemove(stopId);
    if (!ok) setLocalError(true);
  };

  const padded = String(stopNumber).padStart(2, "0");

  return (
    <div className="evidence-block mt-4">
      <p className="meta-mono text-[10px] tracking-[0.12em] text-[color:var(--color-pencil)]">
        {t.evidence.title}
      </p>

      {photoDataUrl ? (
        <figure className="evidence-polaroid mt-2">
          <img
            src={photoDataUrl}
            alt={format(t.evidence.photoAlt, {
              number: padded,
              name: placeName,
            })}
            className="evidence-polaroid__img"
          />
          <figcaption className="evidence-polaroid__caption meta-mono">
            {format(t.evidence.caption, { number: padded })}
          </figcaption>
        </figure>
      ) : (
        <p className="meta-mono mt-1 text-[11px] text-[color:var(--color-pencil)]">
          {t.evidence.hint}
        </p>
      )}

      {canAttach && (
        <div className="mt-2 flex flex-wrap gap-2">
          <label
            htmlFor={inputId}
            className={`meta-mono inline-flex cursor-pointer items-center gap-1.5 border px-3 py-2 text-[11px] transition ${
              busy
                ? "cursor-wait border-[color:var(--color-control-border)] opacity-50"
                : "border-[color:var(--color-stamp)] text-[color:var(--color-stamp)] hover:bg-[color:var(--color-paper)]"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h3l2-2h8l2 2h3v12H3V8z"
              />
              <circle cx="12" cy="14" r="3.5" />
            </svg>
            {busy
              ? t.evidence.saving
              : photoDataUrl
                ? t.evidence.replace
                : t.evidence.capture}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            disabled={busy}
            onChange={handleChange}
          />

          {photoDataUrl && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={busy}
              className="meta-mono border border-[color:var(--color-control-border)] px-3 py-2 text-[11px] text-[color:var(--color-pencil)] transition hover:bg-[color:var(--color-paper)] disabled:opacity-40"
            >
              {t.evidence.remove}
            </button>
          )}
        </div>
      )}

      {localError && (
        <p className="meta-mono mt-1.5 text-[11px] text-[color:var(--color-stamp)]">
          {t.evidence.error}
        </p>
      )}
    </div>
  );
}
