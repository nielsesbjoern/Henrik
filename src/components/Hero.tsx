import { LanguageSwitcher } from "./LanguageSwitcher";
import { MoodToggle } from "./MoodToggle";
import type { CityId, Tour } from "../data/types";
import { useI18n } from "../i18n";

interface HeroProps {
  cityId: CityId;
  activeTour: Tour;
}

export function Hero({ cityId, activeTour }: HeroProps) {
  const { t, format } = useI18n();
  const cityName =
    cityId === "cascais" ? t.cities.cascaisShort : t.cities.lisboaShort;
  const tourCopy = t.tours[activeTour.id];

  return (
    <header className="page-hero">
      <div className="page-hero__sky" aria-hidden />
      <div className="page-hero__glow" aria-hidden />
      <div className="page-hero__fade" aria-hidden />
      <div className="page-hero__inner">
        <div className="page-hero__toolbar">
          <MoodToggle />
          <LanguageSwitcher />
        </div>

        <p className="page-hero__author brand-author">{t.hero.author}</p>
        <p className="page-hero__series brand-series">{t.hero.series}</p>
        <h1 className="page-hero__title">{t.hero.title}</h1>
        <p className="page-hero__meta brand-label">
          {format(t.hero.meta, {
            count: activeTour.stopIds.length,
            city: cityName,
          })}
        </p>
        <p className="page-hero__text">{tourCopy.heroText}</p>
        <a href="#tour" className="page-hero__cta brand-label">
          {t.hero.cta}
        </a>
      </div>
    </header>
  );
}
