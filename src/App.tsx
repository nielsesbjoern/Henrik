import { lazy, Suspense, useCallback, useState } from "react";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { MapSection } from "./MapSection";
import { useTourState } from "./hooks/useTourState";

const FadoPlayer = lazy(() =>
  import("./components/FadoPlayer").then((m) => ({ default: m.FadoPlayer })),
);

function App() {
  const tourState = useTourState();
  const [tourActive, setTourActive] = useState(false);
  const handleTourModeChange = useCallback((active: boolean) => {
    setTourActive(active);
  }, []);

  return (
    <div className="app-shell min-h-screen bg-[color:var(--color-paper)]">
      <div className="paper-stain paper-stain--1" aria-hidden />
      <div className="paper-stain paper-stain--2" aria-hidden />
      <div className="paper-stain paper-stain--3" aria-hidden />
      <div className="app-shell__content">
        {!tourActive && (
          <Hero cityId={tourState.cityId} activeTour={tourState.activeTour} />
        )}
        <main id="main">
          <MapSection
            tourState={tourState}
            onTourModeChange={handleTourModeChange}
          />
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <FadoPlayer />
      </Suspense>
    </div>
  );
}

export default App;
