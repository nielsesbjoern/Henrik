import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import type { Locale, Translations } from "./types";
import { stopBases, type Stop } from "../data/stops";
import { foodItemBases, type FoodItem } from "../data/food";
import {
  gastroRestaurantBases,
  type GastroRestaurant,
} from "../data/gastro";

const STORAGE_KEY = "luis-sellano-locale";

const translations: Record<Locale, Translations> = { de, en, pt };

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "en" || stored === "pt") return stored;

  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("pt")) return "pt";
  if (browser.startsWith("en")) return "en";
  return "de";
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  format: (template: string, vars?: Record<string, string | number>) => string;
  stops: Stop[];
  foodItems: FoodItem[];
  gastroItems: GastroRestaurant[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const t = translations[locale];

  const stops = useMemo(
    () =>
      stopBases.map((base) => ({
        ...base,
        ...t.stops[base.id],
      })),
    [t],
  );

  const foodItems = useMemo(
    () =>
      foodItemBases.map((base) => ({
        ...base,
        ...t.food.items[base.id],
      })),
    [t],
  );

  const gastroItems = useMemo(
    () =>
      gastroRestaurantBases.map((base) => ({
        ...base,
        ...t.gastro.items[base.id],
      })),
    [t],
  );

  const format = (template: string, vars: Record<string, string | number> = {}) =>
    interpolate(template, vars);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [locale, t]);

  const value = useMemo(
    () => ({ locale, setLocale, t, format, stops, foodItems, gastroItems }),
    [locale, t, stops, foodItems, gastroItems],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
