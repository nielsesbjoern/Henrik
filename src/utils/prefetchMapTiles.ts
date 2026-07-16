import { stopBases } from "../data/stops";

const TILE_SUBDOMAINS = ["a", "b", "c", "d"] as const;
const BASE_LAYERS = [
  "light_nolabels",
  "light_only_labels",
] as const;

/** Padding around stop bounds so streets nearby stay readable offline. */
const LAT_PAD = 0.008;
const LNG_PAD = 0.01;

/** Street-level zooms for walking the tour; keep modest for hotel Wi‑Fi. */
const MIN_ZOOM = 14;
const MAX_ZOOM = 16;

const PREFETCH_FLAG = "luis-sellano-tiles-prefetched-v1";
const CONCURRENCY = 6;

function lon2tile(lon: number, zoom: number): number {
  return Math.floor(((lon + 180) / 360) * 2 ** zoom);
}

function lat2tile(lat: number, zoom: number): number {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) *
      2 ** zoom,
  );
}

function tourBounds() {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const stop of stopBases) {
    minLat = Math.min(minLat, stop.lat);
    maxLat = Math.max(maxLat, stop.lat);
    minLng = Math.min(minLng, stop.lng);
    maxLng = Math.max(maxLng, stop.lng);
  }

  return {
    minLat: minLat - LAT_PAD,
    maxLat: maxLat + LAT_PAD,
    minLng: minLng - LNG_PAD,
    maxLng: maxLng + LNG_PAD,
  };
}

function buildTileUrls(): string[] {
  const bounds = tourBounds();
  const urls: string[] = [];
  let subdomainIndex = 0;

  for (let z = MIN_ZOOM; z <= MAX_ZOOM; z++) {
    const xMin = lon2tile(bounds.minLng, z);
    const xMax = lon2tile(bounds.maxLng, z);
    const yMin = lat2tile(bounds.maxLat, z);
    const yMax = lat2tile(bounds.minLat, z);

    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        for (const layer of BASE_LAYERS) {
          const sub = TILE_SUBDOMAINS[subdomainIndex % TILE_SUBDOMAINS.length];
          subdomainIndex += 1;
          urls.push(
            `https://${sub}.basemaps.cartocdn.com/${layer}/${z}/${x}/${y}@2x.png`,
          );
        }
      }
    }
  }

  return urls;
}

async function fetchWithLimit(
  urls: string[],
  concurrency: number,
): Promise<void> {
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      const current = index;
      index += 1;
      try {
        await fetch(urls[current], { mode: "cors", credentials: "omit" });
      } catch {
        // Best-effort warm-up; offline walk still works for tiles that landed.
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()),
  );
}

/**
 * Prefetches CARTO tiles for the tour bounding box so the Service Worker
 * can serve the map offline after one online visit (e.g. hotel Wi‑Fi).
 */
export function prefetchTourMapTiles(): void {
  if (typeof window === "undefined") return;
  if (!navigator.onLine) return;
  if (localStorage.getItem(PREFETCH_FLAG) === "1") return;

  const run = () => {
    const urls = buildTileUrls();
    void fetchWithLimit(urls, CONCURRENCY).then(() => {
      localStorage.setItem(PREFETCH_FLAG, "1");
    });
  };

  const schedule =
    typeof window.requestIdleCallback === "function"
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 8000 })
      : (cb: () => void) => window.setTimeout(cb, 2500);

  schedule(run);
}
