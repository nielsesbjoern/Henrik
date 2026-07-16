import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FadoPlayer } from "./components/FadoPlayer";
import { MapSection } from "./MapSection";
import { useTourState } from "./hooks/useTourState";

function App() {
  const tourState = useTourState();

  return (
    <div className="app-shell min-h-screen bg-[color:var(--color-paper)]">
      <div className="paper-stain paper-stain--1" aria-hidden />
      <div className="paper-stain paper-stain--2" aria-hidden />
      <div className="paper-stain paper-stain--3" aria-hidden />
      <div className="app-shell__content">
        <Hero cityId={tourState.cityId} activeTour={tourState.activeTour} />
        <MapSection tourState={tourState} />
        <Footer />
      </div>
      <FadoPlayer />
    </div>
  );
}

export default App;
