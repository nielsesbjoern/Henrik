import { useI18n } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MoodToggle } from "./MoodToggle";

export function Hero() {
  const { t, format, stops } = useI18n();

  return (
    <header className="border-b border-[color:var(--color-control-border)] px-4 py-4 sm:px-8 sm:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
          <MoodToggle />
          <LanguageSwitcher />
        </div>
        <p className="meta-mono text-[10px] text-[color:var(--color-pencil)] sm:text-xs">
          {format(t.hero.meta, { count: stops.length })}
        </p>
        <h1 className="mt-1.5 max-w-[18ch] text-3xl leading-tight text-ink sm:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-[color:var(--color-pencil)] sm:mt-3 sm:text-base">
          {t.hero.description}
        </p>
        <a
          href="#tour"
          className="meta-mono mt-4 inline-flex min-h-11 items-center border border-[color:var(--color-stamp)] bg-[color:var(--color-stamp)] px-4 py-2.5 text-xs text-[color:var(--color-paper)]"
        >
          {t.hero.cta}
        </a>
      </div>
    </header>
  );
}
