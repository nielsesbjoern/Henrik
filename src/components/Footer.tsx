import { useCallback, useEffect, useState } from "react";
import { isLegalPageId, type LegalPageId } from "../data/legal";
import { useI18n } from "../i18n";
import { LegalModal } from "./LegalModal";

function readLegalHash(): LegalPageId | null {
  const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0] ?? "";
  return isLegalPageId(raw) ? raw : null;
}

export function Footer() {
  const { t } = useI18n();
  const [legalPage, setLegalPage] = useState<LegalPageId | null>(() =>
    typeof window === "undefined" ? null : readLegalHash(),
  );

  useEffect(() => {
    const sync = () => setLegalPage(readLegalHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openLegal = useCallback((page: LegalPageId) => {
    window.location.hash = page;
  }, []);

  const closeLegal = useCallback(() => {
    if (readLegalHash()) {
      const { pathname, search } = window.location;
      window.history.pushState(null, "", `${pathname}${search}`);
    }
    setLegalPage(null);
  }, []);

  const navigateLegal = useCallback((page: LegalPageId) => {
    window.location.hash = page;
  }, []);

  return (
    <>
      <footer className="border-t border-[color:var(--color-control-border)] bg-[color:var(--color-card)] px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <p className="book-prose text-base text-[color:var(--color-pencil)]">
            {t.footer.text}
          </p>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label={t.legal.navAria}
          >
            <a
              href="#impressum"
              onClick={(event) => {
                event.preventDefault();
                openLegal("impressum");
              }}
              className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-normal text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-4 transition hover:text-[color:var(--color-ink)]"
            >
              {t.legal.impressumLink}
            </a>
            <a
              href="#datenschutz"
              onClick={(event) => {
                event.preventDefault();
                openLegal("datenschutz");
              }}
              className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-normal text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-4 transition hover:text-[color:var(--color-ink)]"
            >
              {t.legal.privacyLink}
            </a>
            <a
              href="#haftung"
              onClick={(event) => {
                event.preventDefault();
                openLegal("haftung");
              }}
              className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-normal text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-4 transition hover:text-[color:var(--color-ink)]"
            >
              {t.legal.liabilityLink}
            </a>
          </nav>
        </div>
      </footer>

      {legalPage && (
        <LegalModal
          page={legalPage}
          onClose={closeLegal}
          onNavigate={navigateLegal}
        />
      )}
    </>
  );
}
