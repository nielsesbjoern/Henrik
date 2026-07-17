/** Local Wikimedia Commons caches for stop place photos (active tour detail). */

export interface StopImage {
  /** Path under /public */
  src: string;
  /** Photographer / rights holder (short) */
  credit: string;
  /** License short label */
  license: string;
  /** Commons file page title without "File:" */
  commonsFile: string;
  /** True when photo is nearby atmosphere, not the exact (fictional) place */
  atmosphere?: boolean;
}

function commonsUrl(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

export function getStopImageCommonsUrl(image: StopImage): string {
  return commonsUrl(image.commonsFile);
}

export const stopImages: Record<number, StopImage> = {
  1: {
    src: "/stops/01.jpg",
    credit: "Stefan Wloch",
    license: "CC BY 2.0",
    commonsFile: "Rua_da_Bica_de_Duarte_Belo,_Lisbon,_Portugal_(51732426965).jpg",
    atmosphere: true,
  },
  2: {
    src: "/stops/02.jpg",
    credit: "Vitor Oliveira",
    license: "CC BY-SA 2.0",
    commonsFile:
      "Miradouro_de_Santa_Catarina_-_Lisboa_-_Portugal_(51793131734).jpg",
    atmosphere: true,
  },
  3: {
    src: "/stops/03.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA",
    commonsFile: "Lisboa_-_Café_A_Brasileira.jpg",
  },
  4: {
    src: "/stops/04.jpg",
    credit: "Husond",
    license: "CC BY-SA 3.0",
    commonsFile: "Convento_do_Carmo.JPG",
  },
  5: {
    src: "/stops/05.jpg",
    credit: "Simon Burchell",
    license: "CC BY-SA 4.0",
    commonsFile: "Elevador_de_Santa_Justa,_Lisboa_06.jpg",
  },
  6: {
    src: "/stops/06.jpg",
    credit: "Simon Burchell",
    license: "CC BY-SA 4.0",
    commonsFile: "Praça_Dom_Pedro_IV,_Lisboa_12.jpg",
  },
  7: {
    src: "/stops/07.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY 3.0",
    commonsFile: "Rua_Augusta_Arch.jpg",
  },
  8: {
    src: "/stops/08.jpg",
    credit: "Deensel",
    license: "CC BY 2.0",
    commonsFile: "Lisbon_main_square_(36622604910).jpg",
  },
  9: {
    src: "/stops/09.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 2.0",
    commonsFile: "Alfama_-_Lisboa_-_Portugal_(50069110356).jpg",
    atmosphere: true,
  },
  10: {
    src: "/stops/10.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 2.0",
    commonsFile: "Lisboa_(45553713505).jpg",
    atmosphere: true,
  },
  11: {
    src: "/stops/11.jpg",
    credit: "Palickap",
    license: "CC BY-SA 4.0",
    commonsFile: "Lisboa,_Miradouro_das_Portas_do_Sol,_vista.jpg",
  },
  12: {
    src: "/stops/12.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 2.0",
    commonsFile: "Château_Saint-Georges,_Lisbonne,_Portugal_(45991541042).jpg",
  },
  13: {
    src: "/stops/13.jpg",
    credit: "Filipe Rocha",
    license: "CC BY-SA 3.0",
    commonsFile: "Miradouro_da_Graça.jpg",
  },
  14: {
    src: "/stops/14.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    commonsFile: "Panteão_Nacional_2025.jpg",
  },
  15: {
    src: "/stops/15.jpg",
    credit: "Shadowgate",
    license: "CC BY 2.0",
    commonsFile: "Feira_da_Ladra_(34214031535).jpg",
  },
  16: {
    src: "/stops/16.jpg",
    credit: "swissbert",
    license: "CC BY 2.0",
    commonsFile:
      "View_from_southern_side_of_the_Praça_Martim_Moniz_(Photo_by_swissbert,_FlickrId_30638785310).jpg",
  },
  101: {
    src: "/stops/101.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    commonsFile: "Baía_de_Cascais.jpg",
    atmosphere: true,
  },
  102: {
    src: "/stops/102.jpg",
    credit: "Diego Delso",
    license: "CC BY-SA 4.0",
    commonsFile: "Praia_da_Ribeira,_Cascais,_Portugal,_2022-07-25,_DD_02.jpg",
    atmosphere: true,
  },
  103: {
    src: "/stops/103.jpg",
    credit: "Herbert wie",
    license: "CC BY-SA 4.0",
    commonsFile: "Pontão_da_Praia_da_Ribeira_Cascais,_Portugal.jpg",
    atmosphere: true,
  },
  104: {
    src: "/stops/104.jpg",
    credit: "Herbert wie",
    license: "CC BY-SA 4.0",
    commonsFile: "Estátua_de_Dom_Pedro_I_Praça_5_de_Outubro_Cascais_Portugal.JPG",
    atmosphere: true,
  },
  105: {
    src: "/stops/105.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    commonsFile: "Cascais_-_Travessa_Afonso_Sanches.jpg",
    atmosphere: true,
  },
  106: {
    src: "/stops/106.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    commonsFile: "Cascais,_the_Rua_Afonso_Sanches.JPG",
    atmosphere: true,
  },
  107: {
    src: "/stops/107.jpg",
    credit: "Vitor Oliveira",
    license: "CC BY-SA 2.0",
    commonsFile: "Marina_de_Cascais_-_Portugal_(8408318249).jpg",
  },
  108: {
    src: "/stops/108.jpg",
    credit: "Rúdisicyon",
    license: "CC BY-SA 4.0",
    commonsFile: "Farol_de_Santa_Marta,_Cascais._02-20_(cropped).jpg",
  },
  109: {
    src: "/stops/109.jpg",
    credit: "Vitor Oliveira",
    license: "CC BY-SA 2.0",
    commonsFile: "Boca_do_Inferno_-_Cascais_-_Portugal_(269119308).jpg",
  },
};
