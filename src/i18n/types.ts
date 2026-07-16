import type { Category } from "../data/stops";
import type { TourId } from "../data/types";
import type { LegalTranslations } from "./legal/types";

export type Locale = "de" | "en" | "pt";

export const locales: Locale[] = ["de", "en", "pt"];

export const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  pt: "PT",
};

export interface StopQuote {
  text: string;
  attribution: string;
}

export type RiddleAnswerType = "text" | "number" | "choice";

export interface StopRiddle {
  question: string;
  /** Accepted answers (empty while `verified` is false). */
  answers: string[];
  hint?: string;
  answerType?: RiddleAnswerType;
  /** Numeric tolerance when answerType is "number". */
  tolerance?: number;
  /** Options when answerType is "choice". */
  choices?: string[];
  /**
   * When false, the riddle is a field candidate — tour stays in check-off mode.
   * Omit or true for production Lisboa riddles.
   */
  verified?: boolean;
}

export interface StopTranslation {
  name: string;
  bookRef: string;
  description: string;
  quote?: StopQuote;
  riddle?: StopRiddle;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface FoodTranslation {
  name: string;
  where: string;
  source: string;
}

export interface GastroItemTranslation {
  name: string;
  area: string;
  description: string;
  recommendation: string;
}

export interface TourCopy {
  /** Uppercase tab title, e.g. "GROSSE TOUR" */
  title: string;
  /** Stop count line, e.g. "16 FUNDORTE" */
  stops: string;
  /** Distance / duration line under the tabs */
  stats: string;
  /** Hero subtitle for the active tour */
  heroText: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    author: string;
    series: string;
    title: string;
    meta: string;
    cta: string;
  };
  mood: {
    ariaLabel: string;
    day: string;
    dusk: string;
  };
  footer: {
    text: string;
  };
  legal: LegalTranslations;
  fado: {
    meta: string;
    title: string;
    subtitle: string;
    expand: string;
    collapse: string;
    openSpotify: string;
    iframeTitle: string;
  };
  legend: {
    title: string;
    subtitle: string;
    reconstructedNote: string;
    fictionalNote: string;
  };
  cities: {
    ariaLabel: string;
    lisboaTab: string;
    cascaisTab: string;
    lisboaShort: string;
    cascaisShort: string;
    lisboaAkte: string;
    cascaisAkte: string;
    lisboaSubtitle: string;
    cascaisSubtitle: string;
    progress: string;
    sealed: string;
    antiquaryNote: string;
    expandAkte: string;
    collapseAkte: string;
  };
  workspace: {
    ariaLabel: string;
    protocol: string;
    food: string;
    notes: string;
    expand: string;
    collapse: string;
    collapsedHint: string;
  };
  infoCards: {
    title: string;
    full: InfoItem[];
    short: InfoItem[];
    riddle: InfoItem[];
  };
  map: {
    loading: string;
    locateMe: string;
    geoUnsupported: string;
    geoDenied: string;
    geoFailed: string;
    fullTourGoogleMaps: string;
    legPart: string;
    scrollZoomHint: string;
    fitRoute: string;
  };
  stopList: {
    currentStop: string;
    allStops: string;
    entriesHint: string;
    visited: string;
    stopOf: string;
    markVisited: string;
    done: string;
    undoDone: string;
    expand: string;
    collapse: string;
  };
  tourMode: {
    title: string;
    visited: string;
    endTour: string;
    startTour: string;
    back: string;
    next: string;
  };
  routeToggle: {
    label: string;
    ariaLabel: string;
    fullTitle: string;
    fullStops: string;
    shortTitle: string;
    shortStops: string;
    riddleTitle: string;
    riddleStops: string;
  };
  tours: Record<TourId, TourCopy>;
  direction: {
    ariaLabel: string;
    forward: string;
    reverse: string;
    toggle: string;
    startAt: string;
  };
  playMode: {
    label: string;
    riddle: string;
    free: string;
    ariaLabel: string;
  };
  riddle: {
    title: string;
    check: string;
    correct: string;
    wrong: string;
    showHint: string;
    hideHint: string;
    solved: string;
    locked: string;
    lockedHint: string;
    inputLabel: string;
  };
  navigator: {
    title: string;
    toStop: string;
    walkTime: string;
    openMaps: string;
    waiting: string;
    geoDenied: string;
    geoFailed: string;
    geoUnsupported: string;
  };
  progress: {
    share: string;
    shared: string;
    shareFailed: string;
  };
  evidence: {
    title: string;
    hint: string;
    capture: string;
    replace: string;
    remove: string;
    saving: string;
    error: string;
    caption: string;
    photoAlt: string;
    archiveAria: string;
    archiveMeta: string;
    archiveTitle: string;
    archiveCount: string;
  };
  stopDetail: {
    close: string;
    backToList: string;
    cardLabel: string;
    caseNo: string;
    district: string;
    coordinates: string;
    volume: string;
    openInMaps: string;
    directions: string;
    prev: string;
    next: string;
    done: string;
    doneNext: string;
    undoDone: string;
    empty: string;
    showQuote: string;
    fictionalPlaceNote: string;
  };
  categories: Record<Category, string>;
  stops: Record<number, StopTranslation>;
  food: {
    ariaLabel: string;
    meta: string;
    title: string;
    markTasted: string;
    items: Record<string, FoodTranslation>;
  };
  gastro: {
    ariaLabel: string;
    meta: string;
    title: string;
    subtitle: string;
    filterAria: string;
    mapsLink: string;
    empty: string;
    expand: string;
    collapse: string;
    countHint: string;
    filters: {
      all: string;
      steak: string;
      lamb: string;
      seafood: string;
      tasca: string;
      antiquariat: string;
      morbid: string;
      ritual: string;
    };
    categories: {
      steak: string;
      lamb: string;
      seafood: string;
      tasca: string;
      antiquariat: string;
      morbid: string;
      ritual: string;
    };
    items: Record<string, GastroItemTranslation>;
  };
  laufzettel: {
    ariaLabel: string;
    meta: string;
    metaCascais: string;
    title: string;
    caseClosed: string;
    allSighted: string;
    sighted: string;
    totalSighted: string;
    allCasesClosed: string;
    allCasesSubtitle: string;
    quote: string;
    fullyTasted: string;
    resetProgress: string;
    resetConfirm: string;
  };
  notes: {
    ariaLabel: string;
    meta: string;
    title: string;
    subtitle: string;
    inputLabel: string;
    placeholder: string;
    hint: string;
    counter: string;
    share: string;
  };
  stamp: {
    ariaLabel: string;
    sighted: string;
  };
}
