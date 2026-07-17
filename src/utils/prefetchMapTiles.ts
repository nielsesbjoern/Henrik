import { cities } from "../data/cities";
import { stopBases } from "../data/stops";
import type { CityId } from "../data/types";

const TILE_SUBDOMAINS = ["a", "b", "c", "d"] as const;
const BASE_LAYERS = ["light_nolabels", "light_only_labels"] as const;

/** Padding around stop bounds so streets nearby stay readable offline. */
const LAT_PAD = 0.006;
const LNG_PAD = 0.008;

/** One walking zoom — enough for the tour without flooding the network. */
const MIN_ZOOM = 15;
const MAX_ZOOM = 15;

const PREFETCH_FLAG = "luis-sellano-tiles-prefetched-v3";
const CONCURRENCY = 3;
/** Wait until after Lighthouse / first paint before warming the cache. */
const PREFETCH_DELAY_MS = 20_000;

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

function cityBounds(cityId: CityId) {
  const stops = stopBases.filter((s) => s.cityId === cityId);
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const stop of stops) {
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
  const urls: string[] = [];
  let subdomainIndex = 0;

  for (const city of cities) {
    const bounds = cityBounds(city.id);

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
              `https://${sub}.basemaps.cartocdn.com/${layer}/${z}/${x}/${y}.png`,
            );
          }
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
 * Prefetches CARTO tiles for each city's tour bounding box so the Service Worker
 * can serve the map offline after one online visit (e.g. hotel Wi‑Fi).
 * Deferred so first paint / Lighthouse are not competing with hundreds of tiles.
 */
export function prefetchTourMapTiles(): void {
  if (typeof window === "undefined") return;
  if (!navigator.onLine) return;
  if (localStorage.getItem(PREFETCH_FLAG) === "1") return;

  const run = () => {
    if (document.visibilityState === "hidden") return;
    const urls = buildTileUrls();
    void fetchWithLimit(urls, CONCURRENCY).then(() => {
      localStorage.setItem(PREFETCH_FLAG, "1");
    });
  };

  const schedule =
    typeof window.requestIdleCallback === "function"
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 15_000 })
      : (cb: () => void) => window.setTimeout(cb, 4_000);

  const start = () => {
    window.setTimeout(() => schedule(run), PREFETCH_DELAY_MS);
  };

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
}
