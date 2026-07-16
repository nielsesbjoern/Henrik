import type { CityId } from "./types";

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
  cityId: CityId;
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
 * Adressen entlang der Tour (Bica–Chiado–Rossio–Castelo–Alfama–Comércio)
 * und Cascais (Marina, Altstadt, Boca do Inferno, Guincho).
 */
export const gastroRestaurantBases: GastroRestaurantBase[] = [
  // —— Lissabon ——
  {
    id: "sala-de-corte",
    cityId: "lisboa",
    category: "steak",
    mapsQuery: "Sala de Corte Lisboa",
  },
  {
    id: "cafe-sao-bento",
    cityId: "lisboa",
    category: "steak",
    mapsQuery: "Cafe de Sao Bento Lisboa",
  },
  {
    id: "solar-dos-presuntos",
    cityId: "lisboa",
    category: "lamb",
    mapsQuery: "Solar dos Presuntos Lisboa",
  },
  {
    id: "cervejaria-ramiro",
    cityId: "lisboa",
    category: "seafood",
    mapsQuery: "Cervejaria Ramiro Lisboa",
  },
  {
    id: "sol-e-pesca",
    cityId: "lisboa",
    category: "tasca",
    mapsQuery: "Sol e Pesca Rua Nova do Carvalho Lisboa",
  },
  {
    id: "conserveira-lisboa",
    cityId: "lisboa",
    category: "tasca",
    mapsQuery: "Conserveira de Lisboa Baixa",
  },
  {
    id: "velho-eurico",
    cityId: "lisboa",
    category: "tasca",
    mapsQuery: "O Velho Eurico Largo de São Cristóvão Lisboa",
  },
  {
    id: "livraria-simao",
    cityId: "lisboa",
    category: "antiquariat",
    mapsQuery: "Livraria Simão Escadinhas de São Cristóvão Lisboa",
  },
  {
    id: "sa-da-costa",
    cityId: "lisboa",
    category: "antiquariat",
    mapsQuery: "Livraria Sá da Costa Rua Garrett Lisboa",
  },
  {
    id: "vida-portuguesa",
    cityId: "lisboa",
    category: "antiquariat",
    mapsQuery: "A Vida Portuguesa Chiado Lisboa",
  },
  {
    id: "hospital-bonecas",
    cityId: "lisboa",
    category: "morbid",
    mapsQuery: "Hospital de Bonecas Praça da Figueira Lisboa",
  },
  {
    id: "ginjinha-ritual",
    cityId: "lisboa",
    category: "ritual",
    mapsQuery: "Ginjinha Sem Rival Lisboa",
  },
  {
    id: "vila-berta",
    cityId: "lisboa",
    category: "ritual",
    mapsQuery: "Vila Berta Graça Lisboa",
  },
  {
    id: "senhora-do-monte",
    cityId: "lisboa",
    category: "ritual",
    mapsQuery: "Miradouro da Senhora do Monte Lisboa",
  },
  {
    id: "tasca-do-jaime",
    cityId: "lisboa",
    category: "ritual",
    mapsQuery: "Tasca do Jaime Mouraria Lisboa",
  },

  // —— Cascais: Rind & Steak ——
  {
    id: "brasserie-entrecote",
    cityId: "cascais",
    category: "steak",
    mapsQuery: "La Brasserie de L Entrecote Cascais",
  },
  {
    id: "churrasqueira-viveiro",
    cityId: "cascais",
    category: "steak",
    mapsQuery: "Churrasqueira do Viveiro Cascais",
  },

  // —— Cascais: Lamm ——
  {
    id: "visconde-da-luz",
    cityId: "cascais",
    category: "lamb",
    mapsQuery: "Visconde da Luz Cascais",
  },

  // —— Cascais: Seafood ——
  {
    id: "mar-do-inferno",
    cityId: "cascais",
    category: "seafood",
    mapsQuery: "Mar do Inferno Cascais",
  },
  {
    id: "furnas-do-guincho",
    cityId: "cascais",
    category: "seafood",
    mapsQuery: "Furnas do Guincho",
  },

  // —— Cascais: Tasca & Dose ——
  {
    id: "taberna-clandestina",
    cityId: "cascais",
    category: "tasca",
    mapsQuery: "Taberna Clandestina Cascais",
  },

  // —— Cascais: Antiquariat ——
  {
    id: "museu-castro-guimaraes",
    cityId: "cascais",
    category: "antiquariat",
    mapsQuery: "Museu Condes de Castro Guimaraes Cascais",
  },
  {
    id: "livraria-deja-lu",
    cityId: "cascais",
    category: "antiquariat",
    mapsQuery: "Deja Lu Cascais",
  },

  // —— Cascais: Melancholie ——
  {
    id: "bar-estoril-palacio",
    cityId: "cascais",
    category: "morbid",
    mapsQuery: "Hotel Palacio Estoril",
  },
  {
    id: "farol-santa-marta-guide",
    cityId: "cascais",
    category: "morbid",
    mapsQuery: "Farol de Santa Marta Cascais",
  },
  {
    id: "cabo-da-roca",
    cityId: "cascais",
    category: "morbid",
    mapsQuery: "Cabo da Roca",
  },
];

export function gastroMapsUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
}
