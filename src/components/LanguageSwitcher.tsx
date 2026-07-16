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
          className={`meta-mono px-3 py-1.5 text-xs transition ${
            locale === code
              ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-card)]"
          } ${code !== "de" ? "border-l border-[color:var(--color-control-border)]" : ""}`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
