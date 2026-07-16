import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CITY_ID,
  DEFAULT_TOUR_ID,
  getCity,
  getDefaultTourId,
  getTour,
  isValidCityId,
  isValidTourId,
} from "../data/cities";
import { foodItemBases } from "../data/food";
import { getStopIdsForCity, stopBases } from "../data/stops";
import type { CityId } from "../data/types";
import { formatStampDate } from "../utils/stamp";
import { checkAnswer } from "../utils/riddle";
import { isLegalPageId } from "../data/legal";

export interface VisitedEntry {
  date?: string;
}

export type VisitedRecord = Record<number, VisitedEntry>;

const VALID_STOP_IDS = new Set(stopBases.map((s) => s.id));
const VALID_FOOD_IDS = new Set(foodItemBases.map((f) => f.id));
const STORAGE_KEY = "luis-sellano-progress";

/** Soft cap so shared links stay usable in messengers. */
export const NOTES_MAX_LENGTH = 900;

interface StoredProgress {
  cityId?: CityId;
  tourId?: string;
  solved: VisitedRecord;
  visited: VisitedRecord;
  foodChecked: string[];
  freeTour: boolean;
  notes: string;
}

interface ParsedTourHash {
  cityId: CityId;
  tourId: string;
  solved: VisitedRecord;
  visited: VisitedRecord;
  foodChecked: Set<string>;
  freeTour: boolean;
  notes: string;
}

function parseStopIds(value: string, target: VisitedRecord) {
  for (const idStr of value.split(",")) {
    const id = Number.parseInt(idStr, 10);
    if (VALID_STOP_IDS.has(id)) {
      target[id] = {};
    }
  }
}

function splitHashPair(part: string): [string, string] | null {
  const eq = part.indexOf("=");
  if (eq <= 0) return null;
  return [part.slice(0, eq), part.slice(eq + 1)];
}

function clampNotes(value: string): string {
  return value.slice(0, NOTES_MAX_LENGTH);
}

function resolveTourId(cityId: CityId, tourId: string | undefined): string {
  if (tourId && isValidTourId(tourId)) {
    const found = getTour(tourId);
    if (found && found.city.id === cityId) return tourId;
  }
  return getDefaultTourId(cityId);
}

function parseTourHash(hash = window.location.hash): ParsedTourHash | null {
  const content = hash.replace(/^#/, "").trim();
  if (!content) return null;

  // Legal pages use bare hashes like #impressum — leave them alone.
  if (isLegalPageId(content.split("&")[0]?.split("=")[0] ?? content)) {
    return null;
  }

  const solved: VisitedRecord = {};
  const visited: VisitedRecord = {};
  const foodChecked = new Set<string>();
  let freeTour = false;
  let notes = "";
  let cityId: CityId = DEFAULT_CITY_ID;
  let tourId: string | undefined;

  for (const part of content.split("&")) {
    const pair = splitHashPair(part);
    if (!pair) continue;
    const [key, value] = pair;
    if (!value) continue;

    if (key === "c" && isValidCityId(value)) cityId = value;
    if (key === "t") tourId = value;
    // `s` is legacy; `r` is the documented key for solved riddles.
    if (key === "s" || key === "r") parseStopIds(value, solved);
    if (key === "v") parseStopIds(value, visited);
    if (key === "f") {
      for (const foodId of value.split(",")) {
        if (VALID_FOOD_IDS.has(foodId)) foodChecked.add(foodId);
      }
    }
    if (key === "ft" && value === "1") freeTour = true;
    if (key === "n") {
      try {
        notes = clampNotes(decodeURIComponent(value));
      } catch {
        notes = clampNotes(value);
      }
    }
  }

  return {
    cityId,
    tourId: resolveTourId(cityId, tourId),
    solved,
    visited,
    foodChecked,
    freeTour,
    notes,
  };
}

function loadStoredProgress(): StoredProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProgress;
  } catch {
    return null;
  }
}

function getInitialState(): ParsedTourHash {
  const fromHash = parseTourHash();
  const hasHash = window.location.hash.length > 1;

  if (fromHash && hasHash) return fromHash;

  const stored = loadStoredProgress();
  if (!stored) {
    return {
      cityId: DEFAULT_CITY_ID,
      tourId: DEFAULT_TOUR_ID,
      solved: {},
      visited: {},
      foodChecked: new Set(),
      freeTour: false,
      notes: "",
    };
  }

  const cityId =
    stored.cityId && isValidCityId(stored.cityId)
      ? stored.cityId
      : DEFAULT_CITY_ID;

  return {
    cityId,
    tourId: resolveTourId(cityId, stored.tourId),
    solved: stored.solved ?? {},
    visited: stored.visited ?? {},
    foodChecked: new Set(stored.foodChecked ?? []),
    freeTour: stored.freeTour ?? false,
    notes: clampNotes(stored.notes ?? ""),
  };
}

function buildTourHash(
  cityId: CityId,
  tourId: string,
  solved: VisitedRecord,
  visited: VisitedRecord,
  foodChecked: Set<string>,
  freeTour: boolean,
  notes: string,
): string {
  const parts: string[] = [`c=${cityId}`, `t=${tourId}`];

  const solvedIds = Object.keys(solved)
    .map(Number)
    .filter((id) => VALID_STOP_IDS.has(id))
    .sort((a, b) => a - b);
  if (solvedIds.length > 0) parts.push(`r=${solvedIds.join(",")}`);

  const visitedIds = Object.keys(visited)
    .map(Number)
    .filter((id) => VALID_STOP_IDS.has(id))
    .sort((a, b) => a - b);
  if (visitedIds.length > 0) parts.push(`v=${visitedIds.join(",")}`);

  const foodIds = [...foodChecked]
    .filter((id) => VALID_FOOD_IDS.has(id))
    .sort();
  if (foodIds.length > 0) parts.push(`f=${foodIds.join(",")}`);

  if (freeTour) parts.push("ft=1");

  const trimmedNotes = notes.trim();
  if (trimmedNotes) parts.push(`n=${encodeURIComponent(trimmedNotes)}`);

  return `#${parts.join("&")}`;
}

export function useTourState() {
  const initial = getInitialState();
  const [cityId, setCityIdState] = useState<CityId>(initial.cityId);
  const [tourId, setTourIdState] = useState(initial.tourId);
  const [solved, setSolved] = useState<VisitedRecord>(initial.solved);
  const [visited, setVisited] = useState<VisitedRecord>(initial.visited);
  const [foodChecked, setFoodChecked] = useState<Set<string>>(initial.foodChecked);
  const [freeTour, setFreeTour] = useState(initial.freeTour);
  const [notes, setNotesState] = useState(initial.notes);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [completionAnimating, setCompletionAnimating] = useState(false);

  const city = useMemo(() => getCity(cityId), [cityId]);
  const activeTour = useMemo(
    () => getTour(tourId)?.tour ?? city.tours[0],
    [tourId, city],
  );

  const solvedIds = useMemo(
    () => new Set(Object.keys(solved).map(Number)),
    [solved],
  );

  const visitedIds = useMemo(
    () => new Set(Object.keys(visited).map(Number)),
    [visited],
  );

  const stampedIds = useMemo(() => {
    const ids = new Set<number>();
    for (const id of solvedIds) ids.add(id);
    for (const id of visitedIds) ids.add(id);
    return ids;
  }, [solvedIds, visitedIds]);

  const allFoodComplete = foodChecked.size === foodItemBases.length;

  const totalStopCount = stopBases.length;

  const globalSightedCount = useMemo(() => {
    let count = 0;
    for (const stop of stopBases) {
      if (stampedIds.has(stop.id)) count += 1;
    }
    return count;
  }, [stampedIds]);

  const cityComplete = useCallback(
    (id: CityId) => {
      const ids = getStopIdsForCity(id);
      return ids.length > 0 && ids.every((stopId) => stampedIds.has(stopId));
    },
    [stampedIds],
  );

  const allCitiesComplete = useMemo(
    () => cityComplete("lisboa") && cityComplete("cascais"),
    [cityComplete],
  );

  const persist = useCallback(
    (
      nextCityId: CityId,
      nextTourId: string,
      nextSolved: VisitedRecord,
      nextVisited: VisitedRecord,
      nextFood: Set<string>,
      nextFreeTour: boolean,
      nextNotes: string,
    ) => {
      const payload: StoredProgress = {
        cityId: nextCityId,
        tourId: nextTourId,
        solved: nextSolved,
        visited: nextVisited,
        foodChecked: [...nextFood].sort(),
        freeTour: nextFreeTour,
        notes: nextNotes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [],
  );

  const syncHashAndStorage = useCallback(
    (
      nextCityId: CityId,
      nextTourId: string,
      nextSolved: VisitedRecord,
      nextVisited: VisitedRecord,
      nextFood: Set<string>,
      nextFreeTour: boolean,
      nextNotes: string,
    ) => {
      // Don't overwrite legal-page hashes.
      const bare = window.location.hash.replace(/^#\/?/, "").split("&")[0] ?? "";
      if (isLegalPageId(bare)) return;

      const nextHash = buildTourHash(
        nextCityId,
        nextTourId,
        nextSolved,
        nextVisited,
        nextFood,
        nextFreeTour,
        nextNotes,
      );
      const path = `${window.location.pathname}${window.location.search}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", `${path}${nextHash}`);
      }
      persist(
        nextCityId,
        nextTourId,
        nextSolved,
        nextVisited,
        nextFood,
        nextFreeTour,
        nextNotes,
      );
    },
    [persist],
  );

  useEffect(() => {
    syncHashAndStorage(
      cityId,
      tourId,
      solved,
      visited,
      foodChecked,
      freeTour,
      notes,
    );
  }, [
    cityId,
    tourId,
    solved,
    visited,
    foodChecked,
    freeTour,
    notes,
    syncHashAndStorage,
  ]);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseTourHash();
      if (!parsed) return;
      setCityIdState(parsed.cityId);
      setTourIdState(parsed.tourId);
      setSolved(parsed.solved);
      setVisited(parsed.visited);
      setFoodChecked(parsed.foodChecked);
      setFreeTour(parsed.freeTour);
      setNotesState(parsed.notes);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setNotes = useCallback((value: string) => {
    setNotesState(clampNotes(value));
  }, []);

  const setCityId = useCallback((next: CityId) => {
    setCityIdState(next);
    setTourIdState(getDefaultTourId(next));
  }, []);

  const setTourId = useCallback(
    (next: string) => {
      if (!isValidTourId(next)) return;
      const found = getTour(next);
      if (!found) return;
      setCityIdState(found.city.id);
      setTourIdState(next);
    },
    [],
  );

  const toggleVisited = useCallback((stopId: number) => {
    if (!VALID_STOP_IDS.has(stopId)) return;

    setVisited((prev) => {
      if (prev[stopId]) {
        const next = { ...prev };
        delete next[stopId];
        return next;
      }

      setAnimatingId(stopId);
      return {
        ...prev,
        [stopId]: { date: formatStampDate(new Date()) },
      };
    });
  }, []);

  const submitAnswer = useCallback(
    (stopId: number, input: string, answers: string[]) => {
      if (!VALID_STOP_IDS.has(stopId)) return false;
      if (!checkAnswer(input, answers)) return false;

      setSolved((prev) => {
        if (prev[stopId]) return prev;
        setAnimatingId(stopId);
        return {
          ...prev,
          [stopId]: { date: formatStampDate(new Date()) },
        };
      });
      return true;
    },
    [],
  );

  const toggleFood = useCallback((foodId: string) => {
    if (!VALID_FOOD_IDS.has(foodId)) return;

    setFoodChecked((prev) => {
      const next = new Set(prev);
      if (next.has(foodId)) next.delete(foodId);
      else next.add(foodId);
      return next;
    });
  }, []);

  const toggleFreeTour = useCallback(() => {
    setFreeTour((prev) => !prev);
  }, []);

  const shareProgress = useCallback(async () => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
    return false;
  }, []);

  const triggerCompletionAnimation = useCallback(() => {
    setCompletionAnimating(true);
  }, []);

  const resetProgress = useCallback(() => {
    setSolved({});
    setVisited({});
    setFoodChecked(new Set());
    setFreeTour(false);
    setNotesState("");
    setAnimatingId(null);
    setCompletionAnimating(false);
    localStorage.removeItem(STORAGE_KEY);
    const path = `${window.location.pathname}${window.location.search}`;
    const nextHash = buildTourHash(
      cityId,
      tourId,
      {},
      {},
      new Set(),
      false,
      "",
    );
    window.history.replaceState(null, "", `${path}${nextHash}`);
  }, [cityId, tourId]);

  useEffect(() => {
    if (animatingId === null) return;
    const timer = window.setTimeout(() => setAnimatingId(null), 220);
    return () => window.clearTimeout(timer);
  }, [animatingId]);

  useEffect(() => {
    if (!completionAnimating) return;
    const timer = window.setTimeout(() => setCompletionAnimating(false), 700);
    return () => window.clearTimeout(timer);
  }, [completionAnimating]);

  return {
    cityId,
    setCityId,
    tourId,
    setTourId,
    city,
    activeTour,
    solved,
    solvedIds,
    visited,
    visitedIds,
    stampedIds,
    foodChecked,
    allFoodComplete,
    globalSightedCount,
    totalStopCount,
    cityComplete,
    allCitiesComplete,
    freeTour,
    notes,
    setNotes,
    toggleVisited,
    submitAnswer,
    toggleFood,
    toggleFreeTour,
    shareProgress,
    animatingId,
    completionAnimating,
    triggerCompletionAnimation,
    resetProgress,
  };
}

export type TourState = ReturnType<typeof useTourState>;
