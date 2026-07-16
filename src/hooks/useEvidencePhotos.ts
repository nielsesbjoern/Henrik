import { useCallback, useEffect, useState } from "react";
import { fileToCompressedDataUrl } from "../utils/photo";
import {
  clearAllPhotos,
  deletePhoto,
  getAllPhotos,
  savePhoto,
} from "../utils/photoStore";

export type EvidencePhotos = Record<number, string>;

export function useEvidencePhotos() {
  const [photos, setPhotos] = useState<EvidencePhotos>({});
  const [ready, setReady] = useState(false);
  const [busyStopId, setBusyStopId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getAllPhotos()
      .then((loaded) => {
        if (!cancelled) {
          setPhotos(loaded);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPhotos({});
          setReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const attachPhoto = useCallback(async (stopId: number, file: File) => {
    setBusyStopId(stopId);
    setError(null);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      await savePhoto(stopId, dataUrl);
      setPhotos((prev) => ({ ...prev, [stopId]: dataUrl }));
      return true;
    } catch {
      setError("saveFailed");
      return false;
    } finally {
      setBusyStopId(null);
    }
  }, []);

  const removePhoto = useCallback(async (stopId: number) => {
    setBusyStopId(stopId);
    setError(null);
    try {
      await deletePhoto(stopId);
      setPhotos((prev) => {
        const next = { ...prev };
        delete next[stopId];
        return next;
      });
      return true;
    } catch {
      setError("deleteFailed");
      return false;
    } finally {
      setBusyStopId(null);
    }
  }, []);

  const clearPhotos = useCallback(async () => {
    try {
      await clearAllPhotos();
    } catch {
      // ignore – in-memory clear still happens
    }
    setPhotos({});
    setError(null);
  }, []);

  return {
    photos,
    ready,
    busyStopId,
    error,
    attachPhoto,
    removePhoto,
    clearPhotos,
  };
}
