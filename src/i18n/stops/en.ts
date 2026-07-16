import type { StopTranslation } from "../types";

export const stopsEn: Record<number, StopTranslation> = {
  1: {
    name: "Rua do Almada – Henrik's Antiquarian Bookshop",
    bookRef: "All volumes",
    description:
      "This is where Henrik's story begins: he inherits a dilapidated townhouse and antiquarian bookshop from his unknown uncle Martin – on the condition that he never sells. Behind the chaos lies a system: for years Martin collected objects that point to unsolved crimes. Every volume opens with a find from this shop. Westward, the Miradouro de Santa Catarina is worth the detour. (Location: fan placement, not an official address.)",
  },
  2: {
    name: "Ascensor da Bica",
    bookRef: "Volume 2",
    description:
      "In Portuguese Revenge Henrik rides this historic funicular up the steep hillside – one of the city's most beautiful backdrops, two minutes from the bookshop.",
  },
  3: {
    name: "A Brasileira",
    bookRef: "Volume 1 / City tour",
    description:
      "Henrik's reward after the climb from Bica: a bica and pastel de nata. Here he meets Adriana from Volume 1, 'who draws every eye' – or Fernando Pessoa as a bronze statue, with a chair free beside him.",
  },
  4: {
    name: "Largo do Carmo",
    bookRef: "City tour",
    description:
      "Henrik's retreat beneath the jacaranda trees. At the kiosk: lemonade with basil – 'an ideal place to ponder the mysteries I occasionally stumble upon in the bookshop'. Behind it, the roofless Gothic arches of the Convento do Carmo, memorial to the earthquake of 1755.",
  },
  5: {
    name: "Elevador de Santa Justa",
    bookRef: "City tour",
    description:
      "Between Chiado and Baixa: a 'masterpiece of lift engineering'. Henrik himself prefers Rua Garrett – 'a better eye on supposed pursuers'. So you can skip the queue.",
  },
  6: {
    name: "Rossio & Largo de São Domingos",
    bookRef: "Volume 2 (opening) / City tour",
    description:
      "The city's pulse, steps from the station: ginjinha across from the church – with or without fruit. Peek into Igreja de São Domingos under its salmon-coloured dome; Helena likes conspiratorial whispers in sacred buildings. Beside it, the wave mosaic – and the opening of Portuguese Revenge, where the blood looks 'sticky like the cherry liqueur' poured at the Largo.",
  },
  7: {
    name: "Rua Augusta & Arco da Rua Augusta",
    bookRef: "Volume 1",
    description:
      "The final swing toward the river: the straight grand avenue to the white triumphal arch – Henrik's crossing back into tourist Baixa before the day ends at the Tagus.",
  },
  8: {
    name: "Praça do Comércio",
    bookRef: "Volume 1 / City tour",
    description:
      "Tour finale by the Tagus: Henrik buys water among tourists, sits on the stone steps and catches his breath. Back through the Arco into the Baixa – and if you like Henrik's ending, an ice cream at Amorino before the day is done.",
  },
  9: {
    name: "Rua do Vigário – Lunch break",
    bookRef: "City tour",
    description:
      "Deep in Alfama: Henrik's restaurant tip – the utterly unassuming Tasco do Vigário, whose pavement fits exactly two tables. His order: grilled squid and Vinho Verde. 'If there's a free seat, don't hesitate.' Then on toward Baixa and the Tagus.",
  },
  10: {
    name: "Igreja de Santo Estêvão",
    bookRef: "Volume 7 / City tour",
    description:
      "Descent from the miradouro into the heart of Alfama, Helena's neighbourhood. Directly below lies the public washhouse – whoever finds it 'counts among the especially keen noses'. The view of this church graces the cover of Volume 7 (Portuguese Poison).",
  },
  11: {
    name: "Miradouro das Portas do Sol",
    bookRef: "City tour",
    description:
      "After the flea market, back to the viewpoint: over Henrik's territory – the rooftops of Alfama down to the Tagus. From here his rule applies: drift without a map, 'that's when it gets most exciting'.",
  },
  12: {
    name: "Castelo de São Jorge",
    bookRef: "Volume 1",
    description:
      "Uphill from Martim Moniz: the Moorish castle above the old town – topography for Volume 1 chase scenes. Best panoramic view before continuing to Graça and down into Alfama.",
  },
  13: {
    name: "Miradouro da Graça",
    bookRef: "Volume 2 / City tour",
    description:
      "Henrik's refreshment beneath shady pine trees: a mazagran, iced coffee with lemon juice. In Volume 2 he climbs Rua da Voz do Operário to Igreja da Graça and on into Jardim Augusto Gil – exactly this corner.",
  },
  14: {
    name: "São Vicente de Fora & Panteão Nacional",
    bookRef: "Volume 1",
    description:
      "Henrik only reveals this much: he was allowed to 'experience an unpleasant adventure' here – yet he still loves the quiet monastery courtyard. Behind it rises the white dome of the Pantheon.",
  },
  15: {
    name: "Feira da Ladra",
    bookRef: "Volume 2 / City tour",
    description:
      "The 'Thieves' Market' (Tue + Sat) behind São Vicente: azulejos, faded photos, rusty keys, inherited leftovers. Henrik digs for forgotten letters and diaries. Tip: arrive early as stalls open – and hunt for hand-painted tiles. In the evening you can take Tram 28 towards Chiado from here; the Volume 10 location itself is Martim Moniz.",
  },
  16: {
    name: "Martim Moniz – Tram 28",
    bookRef: "Volume 10",
    description:
      "This is where the legendary line 28 begins and ends – and where Volume 10 is set. Stand at the terminus, hear the wooden trams squeal, and let the yellow backdrop sink in. The tour stays on foot: by day the 28 is packed. For the real 'ghost ride', return after ~21:30 – when empty cars roll through Alfama.",
    quote: {
      text: "The yellow wooden tram rattled around the corner like a ghost from another time. Anyone who rode along in Volume 10 knew: in Lisbon, the crime scene is sometimes on the move.",
      attribution: "Luis Sellano, Volume 10",
    },
  },

  // —— Cascais (Volume 8 · novel map) ——
  101: {
    name: "Cascais station",
    bookRef: "Volume 8 (novel map)",
    description:
      "Terminus of the Linha de Cascais from Lisbon — on the novel map the hub from which every scene unfolds. This is where Henrik and the investigation literally arrive in Cascais; the railway is also the narrative umbilical cord back to Lisbon's lanes, where the secret began.",
    riddle: {
      question: "How many tracks does Cascais station have?",
      answers: [],
      answerType: "number",
      tolerance: 0,
      hint: "Count at the end of the platforms.",
      verified: false,
    },
  },
  102: {
    name: "Praia da Duquesa — the crime scene",
    bookRef: "Volume 8 (novel map: 'crime scene')",
    description:
      "Marked expressly as CRIME SCENE on the publisher's map: here the dead woman lies on the beach where the volume opens — 'forensic medicine does not rule out foul play'. Two minutes' walk from the station, overlooked by hotel terraces: a public, sunny place where a crime can first look like an accident.",
    riddle: {
      question: "How many beach bars/kiosks stand right on Praia da Duquesa?",
      answers: [],
      answerType: "number",
      tolerance: 1,
      hint: "Count only structures directly on the sand.",
      verified: false,
    },
  },
  103: {
    name: "Pequeno Paraíso Hotel",
    bookRef: "Volume 8 (novel map)",
    description:
      "The 'little paradise' — a fictional hotel near the old town whose name carries the volume's ironic motif: summer, sun, death on the beach. The novel map places it between the station and the Irish pub; the exact address does not exist.",
  },
  104: {
    name: "Irish Pub O'Learys",
    bookRef: "Volume 8 (novel map) — real model suspected",
    description:
      "The pub from the novel. At exactly this spot, Praça 5 de Outubro, sits the real O'Neill's Irish Pub — Sellano likes to disguise real places with lightly altered names. Kept as fictional until verified on site; anyone who likes can check over a pint whether the book's description matches the room.",
    riddle: {
      question: "What is the Irish pub on Praça 5 de Outubro really called?",
      answers: ["o'neill's"],
      answerType: "choice",
      choices: ["O'Learys", "O'Neill's", "O'Connor's"],
      hint: "The sign above the door — and a smile at Sellano's disguise.",
      verified: false,
    },
  },
  105: {
    name: "Rachel's flat",
    bookRef: "Volume 8 (novel map)",
    description:
      "Home of the character Rachel, on the map in the residential streets between the police station and the station. No real address — the pin marks the neighbourhood, not a house. Walking past still shows how close everything sits in this town: crime scene, witnesses, investigators.",
  },
  106: {
    name: "Cascais police station (PSP)",
    bookRef: "Volume 8 (novel map)",
    description:
      "The real PSP station on Rua Afonso Sanches — Helena's local base. From here the investigation is coordinated while Henrik, still marked by his gunshot wound, joins only with delay. Please view from outside only — it is an active station.",
  },
  107: {
    name: "Marina de Cascais",
    bookRef: "Volume 8 (novel map)",
    description:
      "The yacht harbour as counterworld to the fishing town: money, boats, discretion. On the novel map the southernmost marked point — and the right milieu for a 'dark secret' that thrives better here than on the busy beach.",
    riddle: {
      question: "How many characters are on the beacon marking at the marina entrance?",
      answers: [],
      answerType: "number",
      tolerance: 1,
      hint: "Mole head at the harbour entrance.",
      verified: false,
    },
  },
  108: {
    name: "Farol de Santa Marta (epilogue)",
    bookRef: "Volume 8 (blurb backdrop)",
    description:
      "Not on the novel map, but part of the 'picturesque cliff coast' from the blurb — the tiled lighthouse marks the turn from investigative Cascais to postcard Cascais. Tue–Sun 10–18, free entry.",
  },
  109: {
    name: "Boca do Inferno (epilogue)",
    bookRef: "Volume 8 (blurb backdrop)",
    description:
      "The Mouth of Hell — the most dramatic stretch of cliff, where the Atlantic crashes into hollowed rock. As the tour's closing note, the backdrop that gives the volume its tension: a holiday paradise with an abyss.",
  },
};
