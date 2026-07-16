import { useEffect, useState } from "react";

export interface GeoPosition {
  lat: number;
  lng: number;
  heading: number | null;
}

interface UseGeolocationOptions {
  enabled: boolean;
}

export function useGeolocation({ enabled }: UseGeolocationOptions) {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setPosition(null);
      setError(null);
      return;
    }

    if (!navigator.geolocation) {
      setError("unsupported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          heading: pos.coords.heading,
        });
        setError(null);
      },
      (err) => {
        setError(err.code === 1 ? "denied" : "failed");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { position, error };
}
