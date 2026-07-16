import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mood = "day" | "dusk";

const STORAGE_KEY = "luis-sellano-mood";

interface MoodContextValue {
  mood: Mood;
  setMood: (mood: Mood) => void;
  toggleMood: () => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);

function isMood(value: string | null): value is Mood {
  return value === "day" || value === "dusk";
}

function detectDefaultMood(): Mood {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isMood(stored)) return stored;

  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? "dusk" : "day";
}

function applyMood(mood: Mood) {
  document.documentElement.dataset.mood = mood;
}

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<Mood>(() => {
    if (typeof window === "undefined") return "day";
    const initial = detectDefaultMood();
    applyMood(initial);
    return initial;
  });

  useEffect(() => {
    applyMood(mood);
    localStorage.setItem(STORAGE_KEY, mood);
  }, [mood]);

  const setMood = useCallback((next: Mood) => {
    setMoodState(next);
  }, []);

  const toggleMood = useCallback(() => {
    setMoodState((prev) => (prev === "day" ? "dusk" : "day"));
  }, []);

  const value = useMemo(
    () => ({ mood, setMood, toggleMood }),
    [mood, setMood, toggleMood],
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within MoodProvider");
  return ctx;
}
