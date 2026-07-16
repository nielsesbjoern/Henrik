const DB_NAME = "luis-sellano-photos";
const DB_VERSION = 1;
const STORE = "evidence";

export interface EvidencePhotoRecord {
  stopId: number;
  dataUrl: string;
  savedAt: number;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "stopId" });
      }
    };
  });
}

function idbRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

export async function savePhoto(stopId: number, dataUrl: string): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    await idbRequest(
      tx.objectStore(STORE).put({
        stopId,
        dataUrl,
        savedAt: Date.now(),
      } satisfies EvidencePhotoRecord),
    );
  } finally {
    db.close();
  }
}

export async function getPhoto(stopId: number): Promise<string | null> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readonly");
    const record = await idbRequest(
      tx.objectStore(STORE).get(stopId) as IDBRequest<EvidencePhotoRecord | undefined>,
    );
    return record?.dataUrl ?? null;
  } finally {
    db.close();
  }
}

export async function getAllPhotos(): Promise<Record<number, string>> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readonly");
    const records = await idbRequest(
      tx.objectStore(STORE).getAll() as IDBRequest<EvidencePhotoRecord[]>,
    );
    const map: Record<number, string> = {};
    for (const record of records) {
      map[record.stopId] = record.dataUrl;
    }
    return map;
  } finally {
    db.close();
  }
}

export async function deletePhoto(stopId: number): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    await idbRequest(tx.objectStore(STORE).delete(stopId));
  } finally {
    db.close();
  }
}

export async function clearAllPhotos(): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    await idbRequest(tx.objectStore(STORE).clear());
  } finally {
    db.close();
  }
}
