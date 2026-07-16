export type GastroCategory =
  | "steak"
  | "lamb"
  | "seafood"
  | "antiquariat"
  | "morbid"
  | "tasca"
  | "ritual";

export type GastroFilter = "all" | GastroCategory;

export interface GastroRestaurantBase {
  id: string;
  category: GastroCategory;
  /** Google Maps search query */
  mapsQuery: string;
}

export interface GastroRestaurant extends GastroRestaurantBase {
  name: string;
  area: string;
  description: string;
  recommendation: string;
}

/**
 * Adressen entlang der Tour (Bica–Chiado–Baixa–Comércio–Alfama–Castelo–Graça).
 * Ausgelassen: Cemitério dos Prazeres, Atalho Real.
 */
export const gastroRestaurantBases: GastroRestaurantBase[] = [
  {
    id: "sala-de-corte",
    category: "steak",
    mapsQuery: "Sala de Corte Lisboa",
  },
  {
    id: "cafe-sao-bento",
    category: "steak",
    mapsQuery: "Cafe de Sao Bento Lisboa",
  },
  {
    id: "solar-dos-presuntos",
    category: "lamb",
    mapsQuery: "Solar dos Presuntos Lisboa",
  },
  {
    id: "cervejaria-ramiro",
    category: "seafood",
    mapsQuery: "Cervejaria Ramiro Lisboa",
  },
  {
    id: "sol-e-pesca",
    category: "tasca",
    mapsQuery: "Sol e Pesca Rua Nova do Carvalho Lisboa",
  },
  {
    id: "conserveira-lisboa",
    category: "tasca",
    mapsQuery: "Conserveira de Lisboa Baixa",
  },
  {
    id: "velho-eurico",
    category: "tasca",
    mapsQuery: "O Velho Eurico Largo de São Cristóvão Lisboa",
  },
  {
    id: "livraria-simao",
    category: "antiquariat",
    mapsQuery: "Livraria Simão Escadinhas de São Cristóvão Lisboa",
  },
  {
    id: "sa-da-costa",
    category: "antiquariat",
    mapsQuery: "Livraria Sá da Costa Rua Garrett Lisboa",
  },
  {
    id: "vida-portuguesa",
    category: "antiquariat",
    mapsQuery: "A Vida Portuguesa Chiado Lisboa",
  },
  {
    id: "hospital-bonecas",
    category: "morbid",
    mapsQuery: "Hospital de Bonecas Praça da Figueira Lisboa",
  },
  {
    id: "ginjinha-ritual",
    category: "ritual",
    mapsQuery: "Ginjinha Sem Rival Lisboa",
  },
  {
    id: "vila-berta",
    category: "ritual",
    mapsQuery: "Vila Berta Graça Lisboa",
  },
  {
    id: "senhora-do-monte",
    category: "ritual",
    mapsQuery: "Miradouro da Senhora do Monte Lisboa",
  },
  {
    id: "tasca-do-jaime",
    category: "ritual",
    mapsQuery: "Tasca do Jaime Mouraria Lisboa",
  },
];

export function gastroMapsUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
}
