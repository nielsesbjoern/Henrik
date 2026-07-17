import { localeLabels, locales, useI18n, type Locale } from "../i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex border border-[color:var(--color-control-border)]"
      role="group"
      aria-label="Language"
    >
      {locales.map((code: Locale) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`brand-label inline-flex min-h-11 items-center px-3 py-2 text-[10px] tracking-[0.16em] transition sm:text-[11px] ${
            locale === code
              ? "bg-[color:var(--color-azulejo)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-pencil)] hover:bg-[color:var(--color-card)] hover:text-ink"
          } ${code !== "de" ? "border-l border-[color:var(--color-control-border)]" : ""}`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
