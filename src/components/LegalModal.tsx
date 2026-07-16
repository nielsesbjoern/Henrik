import { useEffect, useId, useRef, type ReactNode } from "react";
import { legalOperator, type LegalPageId } from "../data/legal";
import { useI18n } from "../i18n";
import type { LegalDocument } from "../i18n/legal/types";

interface LegalModalProps {
  page: LegalPageId;
  onClose: () => void;
  onNavigate: (page: LegalPageId) => void;
}

const operatorVars = {
  name: legalOperator.name,
  street: legalOperator.street,
  zipCity: legalOperator.zipCity,
  country: legalOperator.country,
  email: legalOperator.email,
};

function linkify(text: string): ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,;:)]+$/, "");
      const trailing = part.slice(href.length);
      return (
        <span key={index}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-2"
          >
            {href}
          </a>
          {trailing}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function LegalDocumentView({
  doc,
  format,
}: {
  doc: LegalDocument;
  format: (template: string, vars?: Record<string, string | number>) => string;
}) {
  return (
    <div className="book-prose space-y-8 text-[1.05rem] leading-relaxed text-[color:var(--color-ink)]">
      {doc.intro && (
        <p className="text-[color:var(--color-pencil)]">{format(doc.intro, operatorVars)}</p>
      )}
      {doc.sections.map((section) => (
        <section key={section.heading}>
          <h3 className="mb-3 font-book text-lg text-[color:var(--color-azulejo)]">
            {section.heading}
          </h3>
          <div className="space-y-3">
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.heading}-${index}`}>
                {linkify(format(paragraph, operatorVars))}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function LegalModal({ page, onClose, onNavigate }: LegalModalProps) {
  const { t, format } = useI18n();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const doc =
    page === "impressum"
      ? t.legal.impressum
      : page === "datenschutz"
        ? t.legal.privacy
        : t.legal.liability;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const navItems: { id: LegalPageId; label: string }[] = [
    { id: "impressum", label: t.legal.impressumLink },
    { id: "datenschutz", label: t.legal.privacyLink },
    { id: "haftung", label: t.legal.liabilityLink },
  ];

  return (
    <div
      className="legal-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="legal-modal__backdrop"
        aria-label={t.legal.close}
        onClick={onClose}
      />
      <div className="legal-modal__panel sheet-enter">
        <header className="legal-modal__header">
          <div className="min-w-0">
            <p className="meta-mono mb-1 text-[10px] tracking-[0.14em] text-[color:var(--color-pencil)]">
              {t.legal.navAria}
            </p>
            <h2 id={titleId} className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
              {doc.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="meta-mono shrink-0 rounded-sm border border-[color:var(--color-control-border)] px-3 py-2 text-xs text-[color:var(--color-azulejo)] transition hover:border-[color:var(--color-azulejo)]"
          >
            {t.legal.close}
          </button>
        </header>

        <nav className="legal-modal__nav" aria-label={t.legal.navAria}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={page === item.id ? "page" : undefined}
              className={`legal-modal__tab ${page === item.id ? "legal-modal__tab--active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="legal-modal__body">
          {page === "impressum" && (
            <aside className="legal-modal__contact mb-8 border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)]/60 p-4">
              <p className="meta-mono mb-2 text-[10px] tracking-[0.14em] text-[color:var(--color-pencil)]">
                {t.legal.contactHeading}
              </p>
              <p className="font-book text-base text-ink">{legalOperator.name}</p>
              <p className="font-book text-sm text-[color:var(--color-pencil)]">
                {legalOperator.street}
                <br />
                {legalOperator.zipCity}
                <br />
                {legalOperator.country}
              </p>
              <p className="mt-3 font-book text-sm">
                <span className="text-[color:var(--color-pencil)]">{t.legal.emailLabel}: </span>
                <a
                  href={`mailto:${legalOperator.email}`}
                  className="text-[color:var(--color-azulejo)] underline decoration-dotted underline-offset-2"
                >
                  {legalOperator.email}
                </a>
              </p>
            </aside>
          )}
          <LegalDocumentView doc={doc} format={format} />
        </div>
      </div>
    </div>
  );
}
