# Henrik Falkner – Lissabon Krimi-Stadttour

Literarische Stadttour durch Lissabon auf den Spuren der *Lissabon-Krimis* von Luis Sellano (Henrik-Falkner-Reihe). Mobile-first Single-Page-App mit interaktiver Karte, Tour-Modus und zwei Routenvarianten.

## Tech-Stack

- Vite + React + TypeScript
- Tailwind CSS
- Leaflet / react-leaflet (OpenStreetMap)
- Statisch deploybar (Vercel, Netlify, etc.)

## Entwicklung

```bash
npm install
npm run dev
```

Die App läuft unter `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Features

- **Große Tour** (15 Stopps) und **Kurztour** (6 Stopps) mit gemeinsamem Datensatz
- Leaflet-Karte mit nummerierten Markern, Kategorie-Farben und gestrichelter Route
- Google-Maps-Deeplinks (einzelne Stopps, Gesamtroute in zwei Etappen)
- Geolocation („Mich orten“)
- Tour-Modus mit Fortschritt, Navigation und Abhaken besuchter Stopps (nur React-State)

Alle Tourdaten liegen in `src/data/stops.ts`.
