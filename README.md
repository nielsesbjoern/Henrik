# Portugiesische Stadttour

Literarische Stadttour durch Lissabon auf den Spuren der *Lissabon-Krimis* von Luis Sellano. Mobile-first Single-Page-App mit interaktiver Karte, Tour-Modus und mehreren Routenvarianten.

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

- **Große Tour**, **Kurztour** und **Schnitzeljagd** mit gemeinsamem Datensatz
- Tourrichtung umkehrbar (Start ↔ Ende)
- Leaflet-Karte mit nummerierten Markern und Route
- Google-Maps-Deeplinks
- Geolocation und Tour-Modus mit Fortschritt
- Sammelpass mit Wachssiegel bei Vollendung

Alle Tourdaten liegen in `src/data/stops.ts`.
