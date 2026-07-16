import { useSyncExternalStore } from "react";

function readDebugFlag(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

/** True when the URL has `?debug=1` — for developer-only map overlays. */
export function useDebugFlag(): boolean {
  return useSyncExternalStore(subscribe, readDebugFlag, () => false);
}
