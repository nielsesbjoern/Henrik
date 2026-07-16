import type { Translations } from "../types";
import { legalDe } from "../legal/de";
import { stopsDe } from "../stops/de";

export const de: Translations = {
  meta: {
    title: "Portugiesische Stadttour – Ein Lissabon-Krimi von Luis Sellano",
    description:
      "Literarische Stadttour durch Lissabon auf den Spuren der Lissabon-Krimis von Luis Sellano.",
  },
  hero: {
    author: "LUIS SELLANO",
    series: "EIN LISSABON-KRIMI",
    title: "Portugiesische Stadttour",
    meta: "{count} FUNDORTE · {city}",
    cta: "TOUR STARTEN",
  },
  mood: {
    ariaLabel: "Stimmung",
    day: "Tageslicht",
    dusk: "Blaue Stunde",
  },
  footer: {
    text: "Inoffizielles Fan-Projekt. Die Romanfiguren und -handlungen stammen aus der Lissabon-Krimi-Reihe von Luis Sellano (Heyne Verlag). Der Standort des Antiquariats ist eine Fan-Verortung.",
  },
  legal: legalDe,
  fado: {
    meta: "FADO · SOUNDTRACK",
    title: "Lissabonner Abendlicht",
    subtitle:
      "Mariza, Amália, Ana Moura & Co. – und abends Live-Fado Vadio in Mouraria (z. B. Tasca do Jaime).",
    expand: "Anhören",
    collapse: "Schließen",
    openSpotify: "In Spotify öffnen",
    iframeTitle: "Spotify-Playlist: Fado Portugal",
  },
  legend: {
    title: "Markierungslogik",
    subtitle: "Farbcodierung der Stopps auf der Karte",
    reconstructedNote:
      "Band 8 nennt keine konkreten Straßen — diese Orte rekonstruieren die Kulisse des Romans, sie sind keine belegten Schauplätze.",
    fictionalNote: "Nur im Roman — Lage gemäß Romankarte",
  },
  cities: {
    ariaLabel: "Akte wählen",
    lisboaTab: "AKTE LISSABON",
    cascaisTab: "AKTE CASCAIS",
    lisboaShort: "LISSABON",
    cascaisShort: "CASCAIS",
    lisboaAkte: "Akte Lissabon",
    cascaisAkte: "Akte Cascais",
    lisboaSubtitle: "Akte Lissabon · Bände 1–7, 9–11",
    cascaisSubtitle: "Akte Cascais · Band 8",
    progress: "{count}/{total}",
    sealed: "VERSIEGELT",
    antiquaryNote:
      "VERMERK DES ANTIQUARS: Die Akte Cascais folgt der Original-Romankarte aus Band 8. Vier Fundorte sind real und bestätigt — drei existieren nur zwischen zwei Buchdeckeln.",
    expandAkte: "Akte aufklappen",
    collapseAkte: "Akte einklappen",
  },
  workspace: {
    ariaLabel: "Weitere Akten",
    protocol: "Protokoll",
    food: "Essen",
    notes: "Notizen",
    expand: "Akten öffnen",
    collapse: "Akten schließen",
    collapsedHint: "Protokoll, Essen & Notizen",
    teaserEyebrow: "Akte vertiefen",
    teaserLead: "Stempel sammeln, Henriks Speisen abhaken, Spuren notieren.",
    protocolTeaser: "Laufzettel & Stempel",
    foodTeaser: "Speisekarte unterwegs",
    notesTeaser: "Eigene Ermittlernotizen",
    openCta: "Öffnen",
  },
  infoCards: {
    title: "Aktennotizen",
    full: [
      { label: "Start", value: "Antiquariat / Bica" },
      { label: "Schluss", value: "Praça do Comércio" },
      { label: "Gesamtstrecke", value: "~5 km" },
      { label: "Reine Gehzeit", value: "~1,5–2 Stunden" },
      { label: "Mit Pausen", value: "ca. einen halben bis ganzen Tag" },
      { label: "Bester Tag", value: "Samstag (Feira da Ladra)" },
      {
        label: "Tram 28",
        value:
          "Ort: Martim Moniz (Band 10). Tagsüber meiden. Geisterfahrt erst nach ~21:30 – leere Holzbahn durch die Alfama.",
      },
    ],
    short: [
      { label: "Start", value: "Antiquariat / Bica" },
      { label: "Schluss", value: "Praça do Comércio" },
      { label: "Gesamtstrecke", value: "~3,5 km" },
      { label: "Reine Gehzeit", value: "~1 Stunde" },
      { label: "Mit Pausen", value: "~2,5 Stunden" },
      { label: "Bester Tag", value: "Samstag (Feira da Ladra)" },
      {
        label: "Tram 28",
        value:
          "Optional abends: Geisterfahrt nach ~21:30 von Martim Moniz. In der Kurztour kein Stempelstopp.",
      },
    ],
    riddle: [
      { label: "Gesamtstrecke", value: "~4 km" },
      { label: "Reine Gehzeit", value: "~1,5 Stunden" },
      { label: "Mit Rätseln", value: "ca. einen halben Tag" },
      { label: "Start", value: "Castelo de São Jorge" },
      { label: "Finale", value: "Henriks Antiquariat" },
      {
        label: "Tram 28",
        value:
          "Band-10-Ort auf der großen Tour (Martim Moniz). Abends nach ~21:30: leere Bahn durch die Alfama.",
      },
    ],
  },
  map: {
    loading: "KARTE WIRD GELADEN…",
    locateMe: "Mich orten",
    geoUnsupported: "Geolocation wird von diesem Gerät nicht unterstützt.",
    geoDenied: "Standortzugriff verweigert.",
    geoFailed: "Standort konnte nicht ermittelt werden.",
    fullTourGoogleMaps: "Tour in Google Maps",
    legPart: "Etappe {index} (Stopps {from}–{to})",
    scrollZoomHint: "Karte anklicken, dann mit Mausrad zoomen",
    fitRoute: "Route zentrieren",
  },
  stopList: {
    currentStop: "Aktueller Fundort",
    allStops: "Alle Fundorte",
    entriesHint: "{count} FUNDORTE",
    visited: "BESUCHT",
    stopOf: "FUNDORT {current} VON {total}",
    markVisited: "Fundort {number} als gesichtet markieren",
    done: "Erledigt",
    undoDone: "Zurücknehmen",
    expand: "Fundorte aufklappen",
    collapse: "Fundorte einklappen",
  },
  tourMode: {
    title: "Tour-Modus",
    visited: "{visited} von {total} Fundorten gesichtet",
    endTour: "Tour beenden",
    startTour: "Tour starten",
    back: "Zurück",
    next: "Weiter",
  },
  routeToggle: {
    label: "ROUTENAUSWAHL",
    ariaLabel: "Tourvariante",
    fullTitle: "GROSSE TOUR",
    fullStops: "16 FUNDORTE",
    shortTitle: "KURZTOUR",
    shortStops: "6 FUNDORTE",
    riddleTitle: "SCHNITZELJAGD",
    riddleStops: "9 FUNDORTE",
  },
  tours: {
    "lisboa-gross": {
      title: "GROSSE TOUR",
      stops: "16 FUNDORTE",
      stats: "~6–7 km · Gehzeit ~2 h",
      heroText:
        "Auf den Spuren von Henrik Falkner: von Bica und Chiado über den Rossio auf den Castelo-Grat, durch die Alfama — und endet am Tejo.",
    },
    "lisboa-kurz": {
      title: "KURZTOUR",
      stops: "6 FUNDORTE",
      stats: "~3,5 km · Gehzeit ~1 h",
      heroText:
        "Die Essentials in zweieinhalb Stunden: Antiquariat, Chiado, Rossio, Baixa — Finale mit Blick über die Alfama.",
    },
    "lisboa-raetsel": {
      title: "SCHNITZELJAGD",
      stops: "9 FUNDORTE",
      stats: "~4 km · mit Rätseln",
      heroText:
        "Schnitzeljagd mit Rätseln: vom Castelo durch die Alfama hinunter zum Tejo — und zurück zum Antiquariat.",
    },
    cascais: {
      title: "TATORT-TOUR",
      stops: "9 FUNDORTE",
      stats: "~4 km · Gehzeit ~1,25 h · flach",
      heroText:
        "Der Fall aus Band 8: vom Bahnhof zum Tatort an der Praia da Duquesa, durch den Ort zur Marina — Epilog an der Steilküste.",
    },
  },
  direction: {
    ariaLabel: "Tourrichtung",
    forward: "Start → Ende",
    reverse: "Ende → Start",
    toggle: "Richtung umkehren",
    startAt: "Start: {name}",
  },
  playMode: {
    label: "SPIELMODUS",
    riddle: "Schnitzeljagd",
    free: "Freie Tour",
    ariaLabel: "Spielmodus wählen",
  },
  riddle: {
    title: "Frage vor Ort",
    check: "Prüfen",
    correct: "Richtig! Fundort gelöst.",
    wrong: "Noch nicht – schau noch einmal genau hin.",
    showHint: "Tipp anzeigen",
    hideHint: "Tipp verbergen",
    solved: "Gelöst",
    locked: "Gesperrt",
    lockedHint: "Löse zuerst Fundort {number}",
    inputLabel: "Deine Antwort",
  },
  navigator: {
    title: "Nächster Fundort",
    toStop: "Fundort {number} · {distance} · ~{minutes} min",
    walkTime: "~{minutes} min zu Fuß",
    openMaps: "In Google Maps öffnen",
    waiting: "Standort wird ermittelt…",
    geoDenied: "Standortzugriff verweigert.",
    geoFailed: "Standort konnte nicht ermittelt werden.",
    geoUnsupported: "Geolocation wird nicht unterstützt.",
  },
  progress: {
    share: "Fortschritt teilen",
    shared: "Link kopiert!",
    shareFailed: "Kopieren fehlgeschlagen",
  },
  evidence: {
    title: "BEWEISFOTO",
    hint: "Mach ein Foto vor Ort – es landet in deiner Ermittlerakte.",
    capture: "Foto aufnehmen",
    replace: "Foto ersetzen",
    remove: "Entfernen",
    saving: "Wird gespeichert…",
    error: "Foto konnte nicht gespeichert werden.",
    caption: "FUNDORT {number}",
    photoAlt: "Beweisfoto Fundort {number}: {name}",
    archiveAria: "Foto-Beweisarchiv",
    archiveMeta: "CASE FILES · LOKAL GESPEICHERT",
    archiveTitle: "Beweisarchiv",
    archiveCount: "{count} VON {total} FOTOS",
  },
  stopDetail: {
    close: "Schließen",
    backToList: "Zur Liste",
    cardLabel: "KARTEIKARTE NR. {number}",
    caseNo: "FALL-NR.",
    district: "VIERTEL",
    coordinates: "KOORDINATEN",
    volume: "BAND",
    openInMaps: "In Google Maps öffnen",
    directions: "Route hierhin",
    prev: "Zurück",
    next: "Weiter",
    done: "Erledigt",
    doneNext: "Erledigt · Weiter",
    undoDone: "Erledigt zurücknehmen",
    empty: "Fundort auf der Karte oder in der Liste wählen",
    showQuote: "Zitat aus dem Buch",
    fictionalPlaceNote:
      "FIKTIVER ORT — Lage gemäß Romankarte, keine reale Adresse",
  },
  categories: {
    buchszene: "Echte Buchszene",
    kulisse: "Kulisse & Handlungsumfeld",
    stadttour: "Henriks Stadttour-Tipp",
    fan: "Fan-Verortung",
    rekonstruiert: "Buchkulisse — rekonstruiert",
    fiktiv: "Fiktiver Ort — Romankarte",
  },
  stops: stopsDe,
  food: {
    ariaLabel: "Henriks Speisekarte",
    meta: "BEWEISSTÜCKE · KULINARISCH ({count})",
    title: "Henriks Speisekarte",
    markTasted: "{name} als verkostet markieren",
    items: {
      "bica-nata": {
        name: "Bica & Pastel de Nata",
        where: "A Brasileira, Chiado",
        source: "Henriks Belohnung nach dem Anstieg — Stadttour, Band 1",
      },
      limonade: {
        name: "Zitronenlimonade mit Basilikum",
        where: "Kiosk am Largo do Carmo",
        source: "Henriks Denkpause über die Mysterien aus dem Antiquariat",
      },
      ginjinha: {
        name: "Ginjinha (Kirschlikör)",
        where: "Sem Rival oder A Ginjinha, Rossio",
        source:
          "Ritual: am Schalter „Com elas“ (mit Kirschen) – stehend auf dem Kopfsteinpflaster. Band 2.",
      },
      tintenfisch: {
        name: "Gegrillter Tintenfisch & Vinho Verde",
        where: "Rua do Vigário, Alfama",
        source: "Henriks Restauranttipp: zwei Tische auf dem Gehsteig",
      },
      mazagran: {
        name: "Mazagran (Eiskaffee mit Zitrone)",
        where: "Miradouro da Graça",
        source: "Henriks Erfrischung unter den Nadelbäumen — Band 2",
      },
      mercado: {
        name: "Petiscos im Mercado da Vila",
        where: "Mercado da Vila, Cascais",
        source: "Kein Buchzitat — Bonus der Küsten-Tour",
      },
    },
  },
  gastro: {
    ariaLabel: "Henrik und Helenas Guide",
    meta: "GENUSS · ANTIQUARIAT · NEBENAKTE",
    title: "Henrik & Helenas Guide",
    subtitle:
      "Steak, Lamm, Seafood, Tascas, Insider und Henriks Rituale entlang der Route – ohne Touristenpfade und ohne Schweinefleisch-Klassiker.",
    filterAria: "Kategorie filtern",
    mapsLink: "Karte & Route ↗",
    empty: "Keine Adressen in dieser Kategorie.",
    expand: "Guide aufklappen",
    collapse: "Guide einklappen",
    countHint: "{count} ADRESSEN",
    filters: {
      all: "Alle zeigen",
      steak: "Rind & Steak",
      lamb: "Lamm",
      seafood: "Seafood",
      tasca: "Tasca & Dose",
      antiquariat: "Antiquariate",
      morbid: "Melancholie",
      ritual: "Rituale",
    },
    categories: {
      steak: "Steak & Rind",
      lamb: "Lamm",
      seafood: "Seafood",
      tasca: "Tasca",
      antiquariat: "Antiquariat",
      morbid: "Melancholie",
      ritual: "Ritual",
    },
    items: {
      "sala-de-corte": {
        name: "Sala de Corte",
        area: "Cais do Sodré / Praça do Comércio",
        description:
          "Das unangefochtene Mekka für Fleischliebhaber in Lissabon. Hier reifen verschiedene Cuts vom Rind (Dry-Aged) in einer gläsernen Reifekammer und werden im legendären Josper-Holzkohleofen perfekt zubereitet.",
        recommendation:
          "Empfehlung: Chateaubriand oder das Ribeye mit Trüffel-Püree.",
      },
      "cafe-sao-bento": {
        name: "Café de São Bento",
        area: "São Bento · nahe Bica",
        description:
          "Ein absolut zeitloser Klassiker mit viktorianischem Club-Ambiente. Seit über 40 Jahren wird hier das wohl berühmteste Steak („Bife“) der Stadt serviert, übergossen mit einer sündhaft guten Sahne-Butter-Sauce.",
        recommendation:
          "Empfehlung: Bife à Café de São Bento (Filetsteak im Pfännchen).",
      },
      "solar-dos-presuntos": {
        name: "Solar dos Presuntos",
        area: "Baixa / Restauradores",
        description:
          "Ein traditionsreiches Familienrestaurant, das für seine kompromisslose Qualität bekannt ist. Neben grandiosem Fisch servieren sie hier eine der besten traditionellen Lamm-Spezialitäten des Landes.",
        recommendation:
          "Empfehlung: Paleta de Borrego assada (langsam geschmorte Lammkeule).",
      },
      "cervejaria-ramiro": {
        name: "Cervejaria Ramiro",
        area: "Intendente · nahe Mouraria",
        description:
          "Der weltberühmte Tempel für Meeresfrüchte. Kein Chichi, sondern purer Genuss: Riesen-Garnelen, butterzarte Kaisergranate und frischeste Venusmuscheln in Knoblauchöl.",
        recommendation:
          "Empfehlung: Carabineiros & Prego (Rindersteak im Brot) zum Nachtisch.",
      },
      "sol-e-pesca": {
        name: "Sol e Pesca",
        area: "Cais do Sodré · Pink Street",
        description:
          "Einst Angelgeschäft, heute winzige Bar mit Netzen an den Wänden. Serviert wird allerbeste Dosen-Feinkost (Conservas) – Tintenfisch in Knoblauchöl, Makrelenfilets, Kaviar-Sardinen. Dazu eiskalter Vinho Verde.",
        recommendation:
          "Empfehlung: Conservas nach Tageskarte und ein kühler Vinho Verde.",
      },
      "conserveira-lisboa": {
        name: "Conserveira de Lisboa",
        area: "Baixa",
        description:
          "Seit fast 100 Jahren unverändert: hinter massiven Holztheken bunte Dosen mit Sardinen, Oktopus und Makrele. Jede Dose wird rituell in Packpapier gewickelt und mit Kordel verschnürt – Conservas als Handwerk, kein Fast Food.",
        recommendation:
          "Empfehlung: Jahrgangs-Sardinen oder Oktopus in Knoblauchöl – Henriks Ermittler-Rationen.",
      },
      "velho-eurico": {
        name: "O Velho Eurico",
        area: "Mouraria · Largo de São Cristóvão",
        description:
          "Eine winzige Gassen-Tasca, von einer jungen Crew übernommen, ohne den rauen Charme zu verlieren. Keine Touristen-Menüs: butterzarter Polvo, geschmorte Rinderbacken, Hauswein aus Tonkrügen.",
        recommendation:
          "Empfehlung: Polvo oder Rinderbacken – Ellbogen auf den Holztisch.",
      },
      "livraria-simao": {
        name: "Livraria Simão",
        area: "Mouraria · Escadinhas de São Cristóvão",
        description:
          "Einer der kleinsten Buchläden der Welt: kaum vier Quadratmeter, über 4.000 Bände bis unter die Decke. Der Besitzer reicht die Schätze oft auf die Treppenstufen hinaus – skurril, geheimnisvoll, wie ein Fundort für verschollene Dokumente.",
        recommendation:
          "Henriks Blick: Hier fühlt man sich, als warte ein verschollenes Manuskript hinter dem nächsten Stapel.",
      },
      "sa-da-costa": {
        name: "Livraria Sá da Costa",
        area: "Chiado · Rua Garrett",
        description:
          "Während die Bertrand nebenan oft überlaufen ist, duftet es hier nach altem Leder und Geschichte: jahrhundertealte Landkarten, vergilbte Fotografien, Erstausgaben – wie das Archiv von Henriks Onkel.",
        recommendation:
          "Henriks Blick: Stundenlang in der Vergangenheit Lissabons versinken.",
      },
      "vida-portuguesa": {
        name: "A Vida Portuguesa",
        area: "Chiado",
        description:
          "Ein Laden, der alte portugiesische Marken vor dem Aussterben rettet: Claus-Porto-Seifen, nostalgische Notizbücher, Geschirr, Parfums. Duft von Lavendel, Bienenwachs, Zedernholz und Papier.",
        recommendation:
          "Henriks Blick: Wie durch die Hinterlassenschaften von Onkel Arthur stöbern.",
      },
      "hospital-bonecas": {
        name: "Hospital de Bonecas",
        area: "Baixa · Praça da Figueira",
        description:
          "Seit 1830 restauriert dieser winzige Familienbetrieb im ersten Stock kaputte Puppen. Porzellanköpfe, Gliedmaßen, Glasaugen – nostalgisch, faszinierend und ein bisschen unheimlich.",
        recommendation:
          "Henriks Blick: Ein Mikrokosmos des Bewahrens – ideal für ein verstecktes Indiz.",
      },
      "ginjinha-ritual": {
        name: "Ginjinha-Steh-Ritual",
        area: "Rossio · Sem Rival oder A Ginjinha",
        description:
          "Keine Tische: am winzigen Holzschalter ein Schnapsglas Sauerkirschlikör. Auf „Com ou sem elas?“ antwortest du: „Com elas“ (mit Kirschen). Getrunken wird stehend auf dem Kopfsteinpflaster.",
        recommendation:
          "Henriks Ritual: süßer Treibstoff zwischen älteren Lissabonern, die über Fußball debattieren.",
      },
      "vila-berta": {
        name: "Vila Berta",
        area: "Graça · nahe Miradouro",
        description:
          "Eine vergessene Arbeiter-Sackgasse von 1900: schmiedeeiserne Balkone, Jugendstil-Fliesen, Wäsche über der Gasse. Fast unwirkliche Ruhe mitten in der Stadt.",
        recommendation:
          "Henriks Ritual: der perfekte Ort für ein konspiratives Treffen mit Helena.",
      },
      "senhora-do-monte": {
        name: "Miradouro da Senhora do Monte",
        area: "Graça · blaue Stunde",
        description:
          "Der höchste Aussichtspunkt Lissabons – ruhiger als Portas do Sol. Wenn die Sonne hinter der Ponte 25 de Abril versinkt und die Laternen der Altstadt angehen, liegt die Stadt schweigend zu Füßen.",
        recommendation:
          "Henriks Ritual: Sagres oder Limonade zur Saudade – Puzzleteile des Falls sortieren.",
      },
      "tasca-do-jaime": {
        name: "Tasca do Jaime · Fado Vadio",
        area: "Mouraria",
        description:
          "Kein gestyltes Fado-Menü im Chiado – hier singen Nachbarin und Handwerker spontan zur Gitarre. Unpoliert, rau, unter die Haut.",
        recommendation:
          "Henriks Ritual: abends, wenn das Licht dimmt und die erste Note erklingt. Ergänzt den Spotify-Soundtrack.",
      },
      "brasserie-entrecote": {
        name: "La Brasserie de L'Entrecôte",
        area: "Marina de Cascais",
        description:
          "Das luxuriöse Pendant zum Café de São Bento an der Küste. In edlem, klassischem Ambiente dreht sich hier alles um das perfekt zarte Entrecôte, übergossen mit einer legendären, geheimen Kräuter-Buttersauce.",
        recommendation:
          "Tipp: Perfekt für ein stilvolles Abendessen mit Blick auf die Yachten der High Society.",
      },
      "churrasqueira-viveiro": {
        name: "Churrasqueira do Viveiro",
        area: "Hügel von Cascais (Adroana)",
        description:
          "Ein echter, rauer Insider-Tipp tief in den Hügeln über der Stadt. Hier gibt es keinen Touri-Schnickschnack, sondern einen riesigen offenen Holzkohlegrill, lautes Stimmengewirr lokaler Familien und die besten Rinderrippen der Region.",
        recommendation:
          "Tipp: Bestelle die gigantische 'Costeleta de Novilho' (Rinderkotelett) medium-rare.",
      },
      "visconde-da-luz": {
        name: "Restaurante Visconde da Luz",
        area: "Jardim Visconde da Luz",
        description:
          "Ein herrlich traditionelles, fast schon museales Restaurant direkt am historischen Stadtpark von Cascais. Hier speist man auf schweren Holzstühlen unter Kronleuchtern – genau die Kulisse für Henriks zähe Zeugenbefragungen.",
        recommendation:
          "Tipp: Das im Ofen geschmorte, butterzarte Lamm (Cabrito Assado).",
      },
      "mar-do-inferno": {
        name: "Mar do Inferno",
        area: "Boca do Inferno",
        description:
          "Direkt an den Klippen des Höllenschlunds gelegen. Trotz der prominenten Lage ein absoluter Liebling der Einheimischen für frischeste Krebse, Seepocken (Percebes) und gegrillten Wildfisch.",
        recommendation:
          "Tipp: Die spektakulär gefüllte Krebsschale (Sapateira Recheada) teilen.",
      },
      "furnas-do-guincho": {
        name: "Furnas do Guincho",
        area: "Estrada do Guincho",
        description:
          "Atemberaubend direkt in die Klippen über dem tosenden Ozean gebaut. Während unter den großen Panoramafenstern die Wellen zerschellen, genießt man hier feinsten Fisch im Salzteig. Dramatisch, melancholisch, unvergesslich.",
        recommendation:
          "Tipp: Der in einer Salzkruste gebackene Wildbarsch (Robalo ao Sal).",
      },
      "taberna-clandestina": {
        name: "Taberna Clandestina Cascais",
        area: "Altstadt-Gassen",
        description:
          "Ein winziges, wunderbar schummriges Juwel in den verwinkelten Backsteingassen. Perfekt für ein geheimes, spätes Treffen bei hervorragendem portugiesischen Rotwein, mürbem Rinder-Carpaccio und handverlesenem Käse.",
        recommendation:
          "Tipp: Ein spätes Glas schweren Alentejo-Rotwein im schattigen Innenbereich genießen.",
      },
      "museu-castro-guimaraes": {
        name: "Bibliothek im Museu Condes de Castro Guimarães",
        area: "Parque Marechal Carmona",
        description:
          "Ein neogotisches Schloss direkt am Wasser, das die ultimative Schatzkammer für jeden Antiquar birgt. Die historische Schlossbibliothek beherbergt über 25.000 alte Bände, seltene Folianten und eine unbezahlbare, illuminierte Chronik aus dem Jahr 1505. Hier atmet jeder Zentimeter die dunkle Geschichte des Landes.",
        recommendation:
          "Tipp: Schau dir die kunstvollen, geschnitzten Holzdecken an, während du den Duft von Jahrhunderten altem Pergament einatmest.",
      },
      "livraria-deja-lu": {
        name: "Livraria Déjà Lu",
        area: "Cais da Cidadela",
        description:
          "Versteckt in den dicken, historischen Mauern der Festungsanlage (Cidadela) liegt dieser wunderschöne, nischige Second-Hand-Buchladen. Mit seinen urigen Regalen, alten Sesseln und Bergen von gebrauchten literarischen Schätzen fühlt es sich an wie eine charmante Miniatur-Version von Henriks eigenem Antiquariat an der Riviera.",
        recommendation:
          "Tipp: Perfekt, um eine kleine Spende dazulassen und nach versteckten, alten Reiseberichten zu stöbern.",
      },
      "bar-estoril-palacio": {
        name: "Bar Estoril (Im Hotel Palácio)",
        area: "Estoril",
        description:
          "Die legendäre 'Spionage-Bar' des Zweiten Weltkriegs. Hier saßen echte Agenten der Alliierten und der Achsenmächte im dichten Rauch nur wenige Tische voneinander entfernt, während Portugal offiziell neutral war. Ian Fleming holte sich genau an diesem Tresen die Inspiration für James Bond. Schwere Ledersessel, gedimmtes Licht und pure historische Melancholie.",
        recommendation:
          "Tipp: Einen klassischen Martini oder einen alten Dry White Port bestellen und die historischen Agenten-Fotografien an den Wänden studieren.",
      },
      "farol-santa-marta-guide": {
        name: "Farol de Santa Marta",
        area: "Küste von Cascais",
        description:
          "Der ikonische, blau-weiß gestreifte Leuchtturm mit direkt angrenzendem, historischem Herrenhaus. Ein Ort voller maritimer Sehnsucht (Saudade), an dem das Lichtsignal nachts den einsamen Seefahrern den Weg weist – für Henrik der perfekte visuelle Zufluchtsort, wenn die Ermittlungen in einer Sackgasse stecken.",
        recommendation:
          "Tipp: Komm zur blauen Stunde, setz dich auf die rauen Klippen direkt neben dem Turm und hör dem dumpfen Schlagen der Wellen zu.",
      },
      "cabo-da-roca": {
        name: "Cabo da Roca (Der westlichste Punkt)",
        area: "Sintra-Cascais Küstenstraße",
        description:
          "Der westlichste Punkt des europäischen Festlands. Ein windgepeitschter, einsamer Leuchtturm auf einer 140 Meter hohen, senkrecht abfallenden Klippe über dem tosenden Atlantik. Hier endet Europa – ein zutiefst melancholischer, rauer Ort, der die innere Zerrissenheit von Henrik Falkner perfekt widerspiegelt.",
        recommendation:
          "Tipp: Unbedingt eine Jacke mitbringen. Der Wind schneidet hier scharf und fegt jeden unnötigen Gedanken aus dem Kopf.",
      },
    },
  },
  laufzettel: {
    ariaLabel: "Laufzettel",
    meta: "LAUFZETTEL · AKTE LISSABON",
    metaCascais: "LAUFZETTEL · AKTE CASCAIS",
    title: "Ermittlungsprotokoll",
    caseClosed: "FALL ABGESCHLOSSEN",
    allSighted: "{total} VON {total} FUNDORTEN GESICHTET",
    sighted: "GESICHTET: {count} / {total}",
    totalSighted: "GESAMT: {count} / {total} FUNDORTE",
    allCasesClosed: "SÄMTLICHE AKTEN GESCHLOSSEN",
    allCasesSubtitle: "Lissabon & Cascais · {total} Fundorte",
    quote: "Der Fall ist gelöst. Zeit für einen Vinho Verde.",
    fullyTasted: "VOLLSTÄNDIG VERKOSTET",
    resetProgress: "Neu starten",
    resetConfirm:
      "Alle Fortschritte zurücksetzen und die Tour von vorn beginnen?",
  },
  notes: {
    ariaLabel: "Ermittler-Notizblock",
    meta: "CO-OP · REISETAGEBUCH",
    title: "Ermittler-Notizblock",
    subtitle:
      "Spontane Entdeckungen, Restaurant-Tipps oder Verdachtsmomente – teilt den Link, und die Notiz erscheint beim Gegenüber.",
    inputLabel: "Gemeinsame Notizen",
    placeholder:
      "Tipp: Im Tasca unbedingt den Vinho Verde im Steinkrug verlangen!",
    hint: "Jeder Buchstabe landet live in der URL hinter #",
    counter: "{count} / {max}",
    share: "Notiz teilen",
  },
  stamp: {
    ariaLabel: "Stempel Fundort {number}",
    sighted: "FUNDORT GESICHTET",
  },
};
