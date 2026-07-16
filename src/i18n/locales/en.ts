import type { Translations } from "../types";
import { stopsEn } from "../stops/en";

export const en: Translations = {
  meta: {
    title: "In the Footsteps of Henrik Falkner – Lisbon Crime Tour",
    description:
      "A literary crime walking tour through Lisbon following the Henrik Falkner series by Luis Sellano.",
  },
  hero: {
    meta: "LISBON FILE / {count} LOCATIONS",
    title: "Case File: Henrik Falkner",
    description:
      "Falkner's uncle collected traces and patterns of crime in the bookshop. This tour follows his index cards: from Bica to Alfama, from clue to clue.",
    cta: "START TOUR",
    cardLabel: "INDEX CARD NO. 001",
    caseNo: "CASE NO.",
    district: "DISTRICT",
    coordinates: "COORDINATES",
    volume: "VOLUME",
  },
  mood: {
    ariaLabel: "Mood",
    day: "Daylight",
    dusk: "Blue hour",
  },
  footer: {
    text: "Unofficial fan project. The novel characters and plots are from the Lisbon crime series by Luis Sellano (Heyne Verlag). The bookshop location is a fan placement.",
  },
  fado: {
    meta: "FADO · SOUNDTRACK",
    title: "Lisbon evening light",
    subtitle:
      "Mariza, Amália, Ana Moura & more – and live Fado Vadio in Mouraria at night (e.g. Tasca do Jaime).",
    expand: "Listen",
    collapse: "Close",
    openSpotify: "Open in Spotify",
    iframeTitle: "Spotify playlist: Fado Portugal",
  },
  legend: {
    title: "Marker legend",
    subtitle: "Colour coding of stops on the map",
  },
  workspace: {
    ariaLabel: "More case files",
    protocol: "Log",
    food: "Food",
    notes: "Notes",
    expand: "Open case files",
    collapse: "Close case files",
    collapsedHint: "Log, food & notes",
  },
  infoCards: {
    title: "Case notes",
    full: [
      { label: "Total distance", value: "~6–7 km" },
      { label: "Walking time", value: "~2 hours" },
      { label: "With breaks", value: "about half to a full day" },
      { label: "Best day", value: "Saturday (Feira da Ladra)" },
      {
        label: "Tram 28",
        value:
          "Location: Martim Moniz (Volume 10). Avoid by day. Ghost ride after ~21:30 – empty wooden tram through Alfama.",
      },
    ],
    short: [
      { label: "Total distance", value: "~3.5 km" },
      { label: "Walking time", value: "~1 hour" },
      { label: "With breaks", value: "~2.5 hours" },
      { label: "Best day", value: "Saturday (Feira da Ladra)" },
      {
        label: "Tram 28",
        value:
          "Optional in the evening: ghost ride after ~21:30 from Martim Moniz. Not a stamp stop on the short tour.",
      },
    ],
    riddle: [
      { label: "Total distance", value: "~4 km" },
      { label: "Walking time", value: "~1.5 hours" },
      { label: "With riddles", value: "about half a day" },
      { label: "Start", value: "Castelo de São Jorge" },
      { label: "Finale", value: "Henrik's bookshop" },
      {
        label: "Tram 28",
        value:
          "Volume 10 location is on the full tour (Martim Moniz). After ~21:30: empty tram through Alfama.",
      },
    ],
  },
  map: {
    loading: "LOADING MAP…",
    locateMe: "Locate me",
    geoUnsupported: "Geolocation is not supported on this device.",
    geoDenied: "Location access denied.",
    geoFailed: "Could not determine location.",
    fullTourGoogleMaps: "Tour in Google Maps",
    legAll: "Full tour (stops 1–16)",
    leg1: "Stage 1 (stops 1–8)",
    leg2: "Stage 2 (stops 8–16)",
    scrollZoomHint: "Click map, then scroll to zoom",
  },
  stopList: {
    currentStop: "Current location",
    allStops: "All locations",
    entriesHint: "{count} LOCATIONS",
    visited: "VISITED",
    stopOf: "LOCATION {current} OF {total}",
    markVisited: "Mark location {number} as visited",
    done: "Done",
    undoDone: "Undo",
    expand: "Show stops",
    collapse: "Hide stops",
  },
  tourMode: {
    title: "Tour mode",
    visited: "{visited} of {total} locations visited",
    endTour: "End tour",
    startTour: "Start tour",
    back: "Back",
    next: "Next",
  },
  routeToggle: {
    label: "ROUTE SELECTION",
    ariaLabel: "Tour variant",
    fullTitle: "FULL TOUR",
    fullStops: "16 LOCATIONS",
    shortTitle: "SHORT TOUR",
    shortStops: "6 LOCATIONS",
    riddleTitle: "SCAVENGER HUNT",
    riddleStops: "9 LOCATIONS",
  },
  direction: {
    ariaLabel: "Tour direction",
    forward: "Start → End",
    reverse: "End → Start",
    toggle: "Reverse direction",
    startAt: "Start: {name}",
  },
  playMode: {
    label: "PLAY MODE",
    riddle: "Scavenger hunt",
    free: "Free tour",
    ariaLabel: "Choose play mode",
  },
  riddle: {
    title: "On-site question",
    check: "Check",
    correct: "Correct! Location solved.",
    wrong: "Not yet – look again carefully.",
    showHint: "Show hint",
    hideHint: "Hide hint",
    solved: "Solved",
    locked: "Locked",
    lockedHint: "Solve location {number} first",
    inputLabel: "Your answer",
  },
  navigator: {
    title: "Next location",
    toStop: "Location {number} · {distance} · ~{minutes} min",
    walkTime: "~{minutes} min on foot",
    openMaps: "Open in Google Maps",
    waiting: "Determining location…",
    geoDenied: "Location access denied.",
    geoFailed: "Could not determine location.",
    geoUnsupported: "Geolocation is not supported.",
  },
  progress: {
    share: "Share progress",
    shared: "Link copied!",
    shareFailed: "Copy failed",
  },
  evidence: {
    title: "EVIDENCE PHOTO",
    hint: "Take a photo on site – it goes into your case file.",
    capture: "Take photo",
    replace: "Replace photo",
    remove: "Remove",
    saving: "Saving…",
    error: "Could not save photo.",
    caption: "LOCATION {number}",
    photoAlt: "Evidence photo location {number}: {name}",
    archiveAria: "Photo evidence archive",
    archiveMeta: "CASE FILES · STORED LOCALLY",
    archiveTitle: "Evidence archive",
    archiveCount: "{count} OF {total} PHOTOS",
  },
  stopDetail: {
    close: "Close",
    backToList: "Back to list",
    openInMaps: "Open in Google Maps",
    directions: "Directions here",
    prev: "Previous",
    next: "Next",
    done: "Done",
    doneNext: "Done · Next",
    undoDone: "Undo done",
    empty: "Select a stop on the map or from the list",
    showQuote: "Quote from the book",
  },
  categories: {
    buchszene: "Actual book scene",
    kulisse: "Setting & backdrop",
    stadttour: "Henrik's city tip",
    fan: "Fan placement",
  },
  stops: stopsEn,
  food: {
    ariaLabel: "Henrik's menu",
    meta: "EVIDENCE · CULINARY (5)",
    title: "Henrik's menu",
    markTasted: "Mark {name} as tasted",
    items: {
      "bica-nata": {
        name: "Bica & Pastel de Nata",
        where: "A Brasileira, Chiado",
        source: "Henrik's reward after the climb — city tour, Volume 1",
      },
      limonade: {
        name: "Lemonade with basil",
        where: "Kiosk at Largo do Carmo",
        source: "Henrik's pause for thought on mysteries from the bookshop",
      },
      ginjinha: {
        name: "Ginjinha (cherry liqueur)",
        where: "Sem Rival or A Ginjinha, Rossio",
        source:
          'Ritual: at the counter say "Com elas" (with cherries) – drink standing on the cobbles. Volume 2.',
      },
      tintenfisch: {
        name: "Grilled squid & Vinho Verde",
        where: "Rua do Vigário, Alfama",
        source: "Henrik's restaurant tip: two tables on the pavement",
      },
      mazagran: {
        name: "Mazagran (iced coffee with lemon)",
        where: "Miradouro da Graça",
        source: "Henrik's refreshment under the pine trees — Volume 2",
      },
    },
  },
  gastro: {
    ariaLabel: "Henrik and Helena's guide",
    meta: "TASTE · BOOKSHOPS · SIDE NOTES",
    title: "Henrik & Helena's Guide",
    subtitle:
      "Steak, lamb, seafood, tascas, insider spots and Henrik's rituals along the route – off the tourist trail, no pork classics.",
    filterAria: "Filter category",
    mapsLink: "Map & directions ↗",
    empty: "No addresses in this category.",
    expand: "Expand guide",
    collapse: "Collapse guide",
    countHint: "{count} ADDRESSES",
    filters: {
      all: "Show all",
      steak: "Beef & steak",
      lamb: "Lamb",
      seafood: "Seafood",
      tasca: "Tasca & tins",
      antiquariat: "Bookshops",
      morbid: "Melancholy",
      ritual: "Rituals",
    },
    categories: {
      steak: "Steak & beef",
      lamb: "Lamb",
      seafood: "Seafood",
      tasca: "Tasca",
      antiquariat: "Bookshop",
      morbid: "Melancholy",
      ritual: "Ritual",
    },
    items: {
      "sala-de-corte": {
        name: "Sala de Corte",
        area: "Cais do Sodré / Praça do Comércio",
        description:
          "Lisbon's undisputed temple for meat lovers. Dry-aged cuts mature in a glass ageing chamber and are finished in the legendary Josper charcoal oven.",
        recommendation:
          "Try: Chateaubriand or the ribeye with truffle mash.",
      },
      "cafe-sao-bento": {
        name: "Café de São Bento",
        area: "São Bento · near Bica",
        description:
          "A timeless classic with Victorian club ambience. For over 40 years they have served the city's most famous steak ('Bife'), drowned in a sinful cream-butter sauce.",
        recommendation:
          "Try: Bife à Café de São Bento (fillet steak in a skillet).",
      },
      "solar-dos-presuntos": {
        name: "Solar dos Presuntos",
        area: "Baixa / Restauradores",
        description:
          "A family restaurant known for uncompromising quality. Alongside superb fish they serve one of the country's finest traditional lamb specialities.",
        recommendation:
          "Try: Paleta de Borrego assada (slow-roasted lamb shoulder).",
      },
      "cervejaria-ramiro": {
        name: "Cervejaria Ramiro",
        area: "Intendente · near Mouraria",
        description:
          "The world-famous seafood temple. No fuss, pure pleasure: giant prawns, buttery langoustines and the freshest clams in garlic oil.",
        recommendation:
          "Try: Carabineiros & a Prego (garlic beef sandwich) for 'dessert'.",
      },
      "sol-e-pesca": {
        name: "Sol e Pesca",
        area: "Cais do Sodré · Pink Street",
        description:
          "Once a fishing-tackle shop, now a tiny bar still lined with rods and nets. Only the finest tinned seafood (conservas) – squid in garlic oil, mackerel, caviar sardines – with ice-cold Vinho Verde.",
        recommendation:
          "Try: Conservas of the day and a chilled Vinho Verde.",
      },
      "conserveira-lisboa": {
        name: "Conserveira de Lisboa",
        area: "Baixa",
        description:
          "Almost unchanged for a century: behind heavy wooden counters, colourful tins of sardines, octopus and mackerel. Each tin is wrapped by hand in paper and tied with cord – conservas as craft, not fast food.",
        recommendation:
          "Try: Vintage sardines or octopus in garlic oil – Henrik's investigator rations.",
      },
      "velho-eurico": {
        name: "O Velho Eurico",
        area: "Mouraria · Largo de São Cristóvão",
        description:
          "A tiny alley tasca taken over by a young crew without losing its rough charm. No tourist menus: buttery octopus, braised beef cheeks, house wine from clay jugs.",
        recommendation:
          "Try: Polvo or beef cheeks – elbows on the wooden table.",
      },
      "livraria-simao": {
        name: "Livraria Simão",
        area: "Mouraria · Escadinhas de São Cristóvão",
        description:
          "One of the world's smallest bookshops: barely four square metres, over 4,000 volumes to the ceiling. The owner often passes treasures out onto the steps – odd, secretive, like a place to find a lost document.",
        recommendation:
          "Henrik's eye: It feels as if a missing manuscript waits behind the next stack.",
      },
      "sa-da-costa": {
        name: "Livraria Sá da Costa",
        area: "Chiado · Rua Garrett",
        description:
          "While Bertrand next door is often packed, here it smells of old leather and history: centuries-old maps, faded photographs, first editions – like Henrik's uncle's archive.",
        recommendation:
          "Henrik's eye: Lose hours in Lisbon's past.",
      },
      "vida-portuguesa": {
        name: "A Vida Portuguesa",
        area: "Chiado",
        description:
          "A shop that rescues old Portuguese brands from oblivion: Claus Porto soaps, nostalgic notebooks, crockery, perfumes. The scent of lavender, beeswax, cedar and paper.",
        recommendation:
          "Henrik's eye: Like browsing Uncle Arthur's private leftovers.",
      },
      "hospital-bonecas": {
        name: "Hospital de Bonecas",
        area: "Baixa · Praça da Figueira",
        description:
          "Since 1830 this tiny family workshop upstairs has restored broken dolls. Porcelain heads, limbs, glass eyes – nostalgic, fascinating and a little uncanny.",
        recommendation:
          "Henrik's eye: A microcosm of preserving – perfect for a hidden clue.",
      },
      "ginjinha-ritual": {
        name: "Ginjinha standing ritual",
        area: "Rossio · Sem Rival or A Ginjinha",
        description:
          'No tables: order a sticky glass of sour-cherry liqueur at the tiny wooden counter. When asked "Com ou sem elas?", answer "Com elas" (with cherries). Drink standing on the cobbles.',
        recommendation:
          "Henrik's ritual: sweet fuel among older Lisboetas arguing about football.",
      },
      "vila-berta": {
        name: "Vila Berta",
        area: "Graça · near the miradouro",
        description:
          "A forgotten workers' cul-de-sac from 1900: wrought-iron balconies, Art Nouveau tiles, laundry over the alley. Almost unreal quiet in the middle of the city.",
        recommendation:
          "Henrik's ritual: the perfect spot for a conspiratorial meeting with Helena.",
      },
      "senhora-do-monte": {
        name: "Miradouro da Senhora do Monte",
        area: "Graça · blue hour",
        description:
          "Lisbon's highest viewpoint – quieter than Portas do Sol. When the sun sinks behind the 25 de Abril Bridge and the old-town lamps come on, the city lies silently at your feet.",
        recommendation:
          "Henrik's ritual: a Sagres or lemonade for saudade – sorting the pieces of the case.",
      },
      "tasca-do-jaime": {
        name: "Tasca do Jaime · Fado Vadio",
        area: "Mouraria",
        description:
          "Skip the styled Chiado Fado dinner – here the neighbour or the local craftsman sings spontaneously to Portuguese guitar. Unpolished, raw, under the skin.",
        recommendation:
          "Henrik's ritual: at night, when the lights dim and the first note sounds. Complements the Spotify soundtrack.",
      },
    },
  },
  laufzettel: {
    ariaLabel: "Progress sheet",
    meta: "PROGRESS SHEET · LISBON FILE",
    title: "Investigation log",
    caseClosed: "SEALED IN WAX",
    allSighted: "{total} OF {total} LOCATIONS SIGHTED",
    sighted: "SIGHTED: {count} / {total}",
    quote: "Case closed. Time for a Vinho Verde.",
    fullyTasted: "FULLY TASTED",
    resetProgress: "Start over",
    resetConfirm: "Reset all progress and start the tour from the beginning?",
  },
  notes: {
    ariaLabel: "Investigator notebook",
    meta: "CO-OP · TRAVEL DIARY",
    title: "Investigator notebook",
    subtitle:
      "Spontaneous finds, restaurant tips or suspicions – share the link and the note appears on their screen.",
    inputLabel: "Shared notes",
    placeholder:
      "Tip: At the tasca, insist on Vinho Verde in the stone jug!",
    hint: "Every character is written live into the URL after #",
    counter: "{count} / {max}",
    share: "Share note",
  },
  stamp: {
    ariaLabel: "Stamp location {number}",
    sighted: "LOCATION SIGHTED",
  },
};
