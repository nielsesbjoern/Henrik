import { useState } from "react";
import { fadoPlaylist } from "../data/fado";
import { useI18n } from "../i18n";

export function FadoPlayer() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="fado-player">
      <div className="fado-player__bar mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="fado-player__toggle"
          aria-expanded={open}
          aria-controls="fado-embed"
        >
          <span className="min-w-0 text-left">
            <span className="font-mono hidden text-[10px] tracking-normal text-[color:var(--color-pencil)] sm:block">
              {t.fado.meta}
            </span>
            <span className="font-display mt-0.5 block truncate text-base text-[color:var(--color-ink)] sm:text-lg">
              {t.fado.title}
            </span>
          </span>
          <span className="font-mono shrink-0 text-[11px] tracking-normal text-[color:var(--color-azulejo)]">
            {open ? t.fado.collapse : t.fado.expand}
          </span>
        </button>

        {open && (
          <div id="fado-embed" className="fado-player__embed">
            <p className="mb-2 text-xs text-[color:var(--color-pencil)]">
              {t.fado.subtitle}{" "}
              <a
                href={fadoPlaylist.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-2"
              >
                {t.fado.openSpotify}
              </a>
            </p>
            <iframe
              title={t.fado.iframeTitle}
              src={fadoPlaylist.embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="fado-player__iframe"
            />
          </div>
        )}
      </div>
    </div>
  );
}
