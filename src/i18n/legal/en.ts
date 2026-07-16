import type { LegalTranslations } from "./types";

export const legalEn: LegalTranslations = {
  close: "Close",
  navAria: "Legal notices",
  impressumLink: "Legal notice",
  privacyLink: "Privacy",
  liabilityLink: "Liability & copyright",
  contactHeading: "Contact",
  emailLabel: "Email",
  impressum: {
    title: "Legal notice (Impressum)",
    intro:
      "Information pursuant to Section 5 of the German Digital Services Act (DDG) and Section 18 MStV.",
    sections: [
      {
        heading: "Service provider",
        paragraphs: [
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
        ],
      },
      {
        heading: "Responsible for content (Section 18 (2) MStV)",
        paragraphs: ["{name}, address as above."],
      },
      {
        heading: "About this site",
        paragraphs: [
          "This is an unofficial fan project: a literary city tour following the Lisbon crime novels by Luis Sellano (Heyne Verlag). There is no commercial or editorial connection to the publisher or the author.",
        ],
      },
      {
        heading: "Dispute resolution",
        paragraphs: [
          "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy policy",
    intro:
      "This policy explains how personal data is processed when you visit and use this web app (EU General Data Protection Regulation, GDPR).",
    sections: [
      {
        heading: "1. Controller",
        paragraphs: [
          "Controller responsible for data processing:",
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
          "Email: {email}",
        ],
      },
      {
        heading: "2. General",
        paragraphs: [
          "This app is a client-side progressive web app. There is no user account and no server-side user management by the service provider. Where personal data is processed, this mainly happens locally on your device or through services you actively trigger (e.g. map tiles, external links).",
        ],
      },
      {
        heading: "3. Hosting and server logs",
        paragraphs: [
          "When you access the website, the hosting or CDN provider processes technically necessary connection data (e.g. IP address, time, requested resource, user agent). Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure, stable operation). Retention periods depend on the hosting provider.",
        ],
      },
      {
        heading: "4. Local storage on your device",
        paragraphs: [
          "The app stores settings and tour progress locally in the browser (localStorage) and optionally evidence photos in your device’s IndexedDB. This may include: language, mood (daylight / blue hour), visited stops, solved riddles, marked food items, notes, and – if you take photos – image data.",
          "These data are not transmitted to the service provider. Legal basis: Art. 6(1)(f) GDPR and, where required, Art. 6(1)(a) GDPR (consent by deliberately using the feature). You can delete the data via the in-app reset and via browser settings.",
        ],
      },
      {
        heading: "5. Location data (geolocation)",
        paragraphs: [
          "Only when you actively use location features (e.g. “find me” or tour navigation) does the app request your approximate location via the browser API. The position is processed only locally in the browser and is not sent to the service provider.",
          "Legal basis: Art. 6(1)(a) GDPR (consent via the browser permission). You can revoke permission at any time in browser or system settings.",
        ],
      },
      {
        heading: "6. Map services (OpenStreetMap / CARTO)",
        paragraphs: [
          "The interactive map loads tiles from CARTO (OpenStreetMap data). Your device may transmit connection data to the map provider (in particular the IP address).",
          "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in displaying the tour route). More information: https://carto.com/privacy/ and https://wiki.osmfoundation.org/wiki/Privacy_Policy.",
        ],
      },
      {
        heading: "7. External links (Google Maps etc.)",
        paragraphs: [
          "Links to Google Maps or other services are opened only when you choose to. The privacy policies of those providers then apply. These links do not trigger automatic tracking.",
        ],
      },
      {
        heading: "8. Spotify embed",
        paragraphs: [
          "The fado player may load a Spotify embed. When you open the player, your browser connects to Spotify; personal data (e.g. IP address, device information) may be transmitted to Spotify – even without a Spotify account.",
          "Legal basis: Art. 6(1)(f) GDPR or Art. 6(1)(a) GDPR when you actively open the player. Spotify privacy policy: https://www.spotify.com/legal/privacy-policy/.",
        ],
      },
      {
        heading: "9. Progressive web app / service worker",
        paragraphs: [
          "For offline use and performance, a service worker may cache content (app files, possibly map tiles) locally. This is technical storage on your device, not tracking cookies.",
        ],
      },
      {
        heading: "10. Cookies and tracking",
        paragraphs: [
          "We do not use analytics, advertising or tracking cookies and do not use third-party audience measurement. Technically necessary storage (sections 4 and 9) exists only for app functionality.",
        ],
      },
      {
        heading: "11. Retention",
        paragraphs: [
          "Locally stored data remains on your device until you delete it or the browser removes it. Hosting server logs follow the hosting provider’s deletion periods.",
        ],
      },
      {
        heading: "12. Your rights",
        paragraphs: [
          "Under the GDPR you have, among others, the right of access, rectification, erasure, restriction of processing, data portability, and to object to processing based on Art. 6(1)(f) GDPR. Where processing is based on consent, you may withdraw it at any time with effect for the future.",
          "You also have the right to lodge a complaint with a data protection supervisory authority, usually in your place of residence.",
        ],
      },
      {
        heading: "13. Changes",
        paragraphs: [
          "We may update this privacy policy if the app or the law changes. The version published on this page applies.",
        ],
      },
    ],
  },
  liability: {
    title: "Liability & copyright",
    sections: [
      {
        heading: "Unofficial fan project",
        paragraphs: [
          "This web app is an independent fan project. Characters, plots and brands of the Lisbon crime series belong to Luis Sellano and/or Heyne Verlag (Penguin Random House). There is no official partnership, licence or editorial approval.",
          "The antiquarian bookshop location and similar fan placements are interpretive associations, not official settings.",
        ],
      },
      {
        heading: "Liability for content",
        paragraphs: [
          "Tour descriptions, tips and restaurant notes are prepared carefully but do not claim to be complete or up to date. Opening hours, prices and accessibility may change. Use is at your own risk.",
          "As service provider we are responsible for our own content under general law. We are not obliged to monitor transmitted or stored third-party information.",
        ],
      },
      {
        heading: "Liability for links",
        paragraphs: [
          "This app contains links to third-party websites. We have no control over their content. The respective provider is responsible for linked pages. Links will be removed if we become aware of legal infringements.",
        ],
      },
      {
        heading: "Copyright",
        paragraphs: [
          "Unless otherwise stated, texts, layout and code of this fan app are protected by the service provider’s copyright. Novel quotations are used for literary context under quotation rights where applicable.",
          "Map data: OpenStreetMap contributors; rendered via CARTO. Third-party trademarks (including Spotify, Google) remain with their owners.",
        ],
      },
    ],
  },
};
