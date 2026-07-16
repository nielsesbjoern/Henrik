import type { LegalTranslations } from "./types";

export const legalDe: LegalTranslations = {
  close: "Schließen",
  navAria: "Rechtliche Hinweise",
  impressumLink: "Impressum",
  privacyLink: "Datenschutz",
  liabilityLink: "Haftung & Urheberrecht",
  contactHeading: "Kontakt",
  emailLabel: "E-Mail",
  impressum: {
    title: "Impressum",
    intro: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 MStV.",
    sections: [
      {
        heading: "Diensteanbieter",
        paragraphs: [
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        paragraphs: ["{name}, Anschrift wie oben."],
      },
      {
        heading: "Hinweis zum Angebot",
        paragraphs: [
          "Dieses Angebot ist ein inoffizielles Fan-Projekt zur literarischen Stadttour auf den Spuren der Lissabon-Krimis von Luis Sellano (Heyne Verlag). Es besteht keine geschäftliche oder redaktionelle Verbindung zum Verlag oder zum Autor.",
        ],
      },
      {
        heading: "Streitbeilegung",
        paragraphs: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
    ],
  },
  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung informiert Sie über die Verarbeitung personenbezogener Daten beim Besuch und bei der Nutzung dieser Web-App (Datenschutz-Grundverordnung, DSGVO).",
    sections: [
      {
        heading: "1. Verantwortlicher",
        paragraphs: [
          "Verantwortlich für die Datenverarbeitung:",
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
          "E-Mail: {email}",
        ],
      },
      {
        heading: "2. Allgemeines",
        paragraphs: [
          "Diese App ist eine rein clientseitige Progressive Web App. Es gibt kein Nutzerkonto und keine serverseitige Nutzerverwaltung durch den Diensteanbieter. Soweit personenbezogene Daten verarbeitet werden, geschieht das vor allem lokal auf Ihrem Gerät oder durch Dienste, die Sie selbst anstoßen (z. B. Kartenkacheln, externe Links).",
        ],
      },
      {
        heading: "3. Hosting und Server-Logs",
        paragraphs: [
          "Beim Aufruf der Website verarbeitet der jeweilige Hosting- bzw. CDN-Anbieter technisch erforderliche Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, aufgerufene Ressource, User-Agent). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und stabilem Betrieb). Speicherdauer und weitere Details richten sich nach dem eingesetzten Hosting-Anbieter.",
        ],
      },
      {
        heading: "4. Lokale Speicherung auf Ihrem Gerät",
        paragraphs: [
          "Die App speichert Einstellungen und Tour-Fortschritt lokal im Browser (localStorage) sowie optional Beweisfotos in der IndexedDB Ihres Geräts. Dazu gehören insbesondere: Sprache, Stimmung (Tageslicht / Blaue Stunde), besuchte Stopps, gelöste Rätsel, markierte Speisen, Notizen und – falls Sie Fotos aufnehmen – Bilddaten.",
          "Diese Daten werden nicht an den Diensteanbieter übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO bzw. – soweit erforderlich – Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch bewusste Nutzung der jeweiligen Funktion). Sie können die Daten jederzeit über die Reset-Funktion in der App sowie über die Browser-Einstellungen löschen.",
        ],
      },
      {
        heading: "5. Standortdaten (Geolocation)",
        paragraphs: [
          "Nur wenn Sie die Standortfunktion aktiv nutzen (z. B. „Mich finden“ oder Tour-Navigation), fragt die App über die Browser-API nach Ihrem ungefähren Standort. Die Position wird ausschließlich lokal im Browser verarbeitet und nicht an den Diensteanbieter gesendet.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über die Browser-Berechtigung). Sie können die Berechtigung jederzeit in den Browser- bzw. Systemeinstellungen widerrufen.",
        ],
      },
      {
        heading: "6. Kartendienste (OpenStreetMap / CARTO)",
        paragraphs: [
          "Für die interaktive Karte werden Kartenkacheln von CARTO geladen (OpenStreetMap-Daten). Dabei kann Ihr Gerät Verbindungsdaten an den Kartenanbieter übermitteln (insbesondere IP-Adresse).",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Darstellung der Tourroute). Weitere Informationen: https://carto.com/privacy/ und https://wiki.osmfoundation.org/wiki/Privacy_Policy.",
        ],
      },
      {
        heading: "7. Externe Links (Google Maps u. a.)",
        paragraphs: [
          "Links zu Google Maps oder anderen Diensten öffnen Sie bewusst selbst. Erst dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Es findet kein automatisches Tracking über diese Links statt.",
        ],
      },
      {
        heading: "8. Spotify-Einbettung",
        paragraphs: [
          "Im Fado-Player kann ein Spotify-Embed geladen werden. Beim Öffnen des Players stellt Ihr Browser eine Verbindung zu Spotify her; dabei können personenbezogene Daten (z. B. IP-Adresse, Geräteinformationen) an Spotify übermittelt werden – auch wenn Sie kein Spotify-Konto haben.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO, soweit Sie den Player aktiv öffnen. Datenschutzhinweise von Spotify: https://www.spotify.com/legal/privacy-policy/.",
        ],
      },
      {
        heading: "9. Progressive Web App / Service Worker",
        paragraphs: [
          "Zur Offline-Nutzung und Performance kann ein Service Worker Inhalte (App-Dateien, ggf. Kartenkacheln) lokal zwischenspeichern. Es handelt sich um technische Speicherung auf Ihrem Gerät, nicht um Tracking-Cookies.",
        ],
      },
      {
        heading: "10. Cookies und Tracking",
        paragraphs: [
          "Wir setzen keine Analyse-, Werbe- oder Tracking-Cookies ein und nutzen keine Reichweitenmessung Dritter. Technisch notwendige Speicherung (siehe Abschnitte 4 und 9) dient ausschließlich der Funktion der App.",
        ],
      },
      {
        heading: "11. Speicherdauer",
        paragraphs: [
          "Lokal gespeicherte Daten verbleiben auf Ihrem Gerät, bis Sie sie löschen oder der Browser sie entfernt. Server-Logs beim Hosting richten sich nach den Löschfristen des Hosting-Anbieters.",
        ],
      },
      {
        heading: "12. Ihre Rechte",
        paragraphs: [
          "Sie haben nach der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Soweit eine Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.",
          "Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist in der Regel die Aufsichtsbehörde Ihres Wohnsitzes.",
        ],
      },
      {
        heading: "13. Änderungen",
        paragraphs: [
          "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die App oder die Rechtslage ändert. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.",
        ],
      },
    ],
  },
  liability: {
    title: "Haftung & Urheberrecht",
    sections: [
      {
        heading: "Inoffizielles Fan-Projekt",
        paragraphs: [
          "Diese Web-App ist ein unabhängiges Fan-Projekt. Romanfiguren, Handlungsstränge und Marken der Lissabon-Krimi-Reihe gehören Luis Sellano bzw. dem Heyne Verlag (Penguin Random House Verlagsgruppe). Es besteht keine offizielle Partnerschaft, Lizenz oder redaktionelle Freigabe.",
          "Der Standort des Antiquariats und vergleichbare Fan-Verortungen sind interpretative Zuordnungen und keine offiziellen Schauplätze.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        paragraphs: [
          "Die Tourbeschreibungen, Tipps und Gastro-Hinweise werden mit Sorgfalt erstellt, erheben aber keinen Anspruch auf Vollständigkeit oder Aktualität. Öffnungszeiten, Preise und Erreichbarkeit von Orten können sich ändern. Die Nutzung erfolgt auf eigene Verantwortung.",
          "Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Verpflichtungen zur Überwachung übermittelter oder gespeicherter fremder Informationen bestehen nicht.",
        ],
      },
      {
        heading: "Haftung für Links",
        paragraphs: [
          "Diese App enthält Links zu externen Websites Dritter. Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links entfernt.",
        ],
      },
      {
        heading: "Urheberrecht",
        paragraphs: [
          "Texte, Layout und Code dieser Fan-App unterliegen – soweit nicht anders gekennzeichnet – dem Urheberrecht des Diensteanbieters. Zitate aus den Romanen dienen der literarischen Einordnung im Rahmen des Zitatrechts.",
          "Kartenmaterial: OpenStreetMap-Mitwirkende; Darstellung über CARTO. Marken Dritter (u. a. Spotify, Google) bleiben Eigentum der jeweiligen Rechteinhaber.",
        ],
      },
    ],
  },
};
