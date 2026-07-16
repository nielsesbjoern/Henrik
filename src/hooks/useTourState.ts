import { useCallback, useEffect, useMemo, useState } from "react";
import { foodItemBases } from "../data/food";
import { stopBases } from "../data/stops";
import { formatStampDate } from "../utils/stamp";
import { checkAnswer } from "../utils/riddle";

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
  solved: VisitedRecord;
  visited: VisitedRecord;
  foodChecked: string[];
  freeTour: boolean;
  notes: string;
}

interface ParsedTourHash {
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

function parseTourHash(hash = window.location.hash): ParsedTourHash {
  const solved: VisitedRecord = {};
  const visited: VisitedRecord = {};
  const foodChecked = new Set<string>();
  let freeTour = false;
  let notes = "";
  const content = hash.replace(/^#/, "").trim();
  if (!content) return { solved, visited, foodChecked, freeTour, notes };

  for (const part of content.split("&")) {
    const pair = splitHashPair(part);
    if (!pair) continue;
    const [key, value] = pair;
    if (!value) continue;

    if (key === "s") parseStopIds(value, solved);
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

  return { solved, visited, foodChecked, freeTour, notes };
}

function loadStoredProgress(): StoredProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredProgress;
    return data;
  } catch {
    return null;
  }
}

function getInitialState(): ParsedTourHash {
  const fromHash = parseTourHash();
  const hasHash = window.location.hash.length > 1;

  if (hasHash) return fromHash;

  const stored = loadStoredProgress();
  if (!stored) return fromHash;

  return {
    solved: stored.solved ?? {},
    visited: stored.visited ?? {},
    foodChecked: new Set(stored.foodChecked ?? []),
    freeTour: stored.freeTour ?? false,
    notes: clampNotes(stored.notes ?? ""),
  };
}

function buildTourHash(
  solved: VisitedRecord,
  visited: VisitedRecord,
  foodChecked: Set<string>,
  freeTour: boolean,
  notes: string,
): string {
  const parts: string[] = [];

  const solvedIds = Object.keys(solved)
    .map(Number)
    .filter((id) => VALID_STOP_IDS.has(id))
    .sort((a, b) => a - b);
  if (solvedIds.length > 0) parts.push(`s=${solvedIds.join(",")}`);

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

  return parts.length > 0 ? `#${parts.join("&")}` : "";
}

export function useTourState() {
  const initial = getInitialState();
  const [solved, setSolved] = useState<VisitedRecord>(initial.solved);
  const [visited, setVisited] = useState<VisitedRecord>(initial.visited);
  const [foodChecked, setFoodChecked] = useState<Set<string>>(initial.foodChecked);
  const [freeTour, setFreeTour] = useState(initial.freeTour);
  const [notes, setNotesState] = useState(initial.notes);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [completionAnimating, setCompletionAnimating] = useState(false);

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

  const persist = useCallback(
    (
      nextSolved: VisitedRecord,
      nextVisited: VisitedRecord,
      nextFood: Set<string>,
      nextFreeTour: boolean,
      nextNotes: string,
    ) => {
      const payload: StoredProgress = {
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
      nextSolved: VisitedRecord,
      nextVisited: VisitedRecord,
      nextFood: Set<string>,
      nextFreeTour: boolean,
      nextNotes: string,
    ) => {
      const nextHash = buildTourHash(
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
      persist(nextSolved, nextVisited, nextFood, nextFreeTour, nextNotes);
    },
    [persist],
  );

  useEffect(() => {
    syncHashAndStorage(solved, visited, foodChecked, freeTour, notes);
  }, [solved, visited, foodChecked, freeTour, notes, syncHashAndStorage]);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseTourHash();
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
    window.history.replaceState(null, "", path);
  }, []);

  useEffect(() => {
    if (animatingId === null) return;
    const timer = window.setTimeout(() => setAnimatingId(null), 220);
    return () => window.clearTimeout(timer);
  }, [animatingId]);

  useEffect(() => {
    if (!completionAnimating) return;
    const timer = window.setTimeout(() => setCompletionAnimating(false), 220);
    return () => window.clearTimeout(timer);
  }, [completionAnimating]);

  return {
    solved,
    solvedIds,
    visited,
    visitedIds,
    stampedIds,
    foodChecked,
    allFoodComplete,
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
