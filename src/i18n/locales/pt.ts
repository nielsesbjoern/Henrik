import type { Translations } from "../types";
import { stopsPt } from "../stops/pt";

export const pt: Translations = {
  meta: {
    title: "Nos Passos de Henrik Falkner – Passeio de Crime em Lisboa",
    description:
      "Passeio literário de crime por Lisboa nos passos da série Henrik Falkner de Luis Sellano.",
  },
  hero: {
    meta: "PROCESSO LISBOA / {count} LOCAIS",
    title: "Processo de Investigação: Henrik Falkner",
    description:
      "O tio de Falkner recolheu no antiquário vestígios e padrões criminais. Este passeio segue os seus fichários: da Bica à Alfama, de prova em prova.",
    cta: "INICIAR PASSEIO",
    cardLabel: "FICHA N.º 001",
    caseNo: "PROCESSO N.º",
    district: "BAIRRO",
    coordinates: "COORDENADAS",
    volume: "VOLUME",
  },
  mood: {
    ariaLabel: "Ambiente",
    day: "Luz do dia",
    dusk: "Hora azul",
  },
  footer: {
    text: "Projecto de fãs não oficial. As personagens e enredos dos romances pertencem à série de crimes de Lisboa de Luis Sellano (Heyne Verlag). A localização do antiquário é uma verificação de fãs.",
  },
  fado: {
    meta: "FADO · SOUNDTRACK",
    title: "Luz da noite em Lisboa",
    subtitle:
      "Mariza, Amália, Ana Moura e mais – e Fado Vadio ao vivo na Mouraria à noite (ex.: Tasca do Jaime).",
    expand: "Ouvir",
    collapse: "Fechar",
    openSpotify: "Abrir no Spotify",
    iframeTitle: "Playlist Spotify: Fado Portugal",
  },
  legend: {
    title: "Legenda dos marcadores",
    subtitle: "Codificação por cores das paragens no mapa",
  },
  workspace: {
    ariaLabel: "Mais ficheiros",
    protocol: "Protocolo",
    food: "Comida",
    notes: "Notas",
    expand: "Abrir ficheiros",
    collapse: "Fechar ficheiros",
    collapsedHint: "Protocolo, comida e notas",
  },
  infoCards: {
    title: "Notas do processo",
    full: [
      { label: "Distância total", value: "~6–7 km" },
      { label: "Tempo a pé", value: "~2 horas" },
      { label: "Com pausas", value: "cerca de meio a um dia inteiro" },
      { label: "Melhor dia", value: "Sábado (Feira da Ladra)" },
      {
        label: "Eléctrico 28",
        value:
          "Local: Martim Moniz (Volume 10). Evitar de dia. Viagem fantasma depois das ~21:30 – eléctrico de madeira vazio pela Alfama.",
      },
    ],
    short: [
      { label: "Distância total", value: "~3,5 km" },
      { label: "Tempo a pé", value: "~1 hora" },
      { label: "Com pausas", value: "~2,5 horas" },
      { label: "Melhor dia", value: "Sábado (Feira da Ladra)" },
      {
        label: "Eléctrico 28",
        value:
          "Opcional à noite: viagem fantasma depois das ~21:30 no Martim Moniz. Sem carimbo no passeio curto.",
      },
    ],
    riddle: [
      { label: "Distância total", value: "~4 km" },
      { label: "Tempo a pé", value: "~1,5 horas" },
      { label: "Com enigmas", value: "cerca de meio dia" },
      { label: "Início", value: "Castelo de São Jorge" },
      { label: "Final", value: "Antiquário do Henrik" },
      {
        label: "Eléctrico 28",
        value:
          "Local do Volume 10 no passeio completo (Martim Moniz). Depois das ~21:30: eléctrico vazio pela Alfama.",
      },
    ],
  },
  map: {
    loading: "A CARREGAR MAPA…",
    locateMe: "Localizar-me",
    geoUnsupported: "A geolocalização não é suportada neste dispositivo.",
    geoDenied: "Acesso à localização negado.",
    geoFailed: "Não foi possível determinar a localização.",
    fullTourGoogleMaps: "Passeio no Google Maps",
    legAll: "Passeio completo (paragens 1–16)",
    leg1: "Etapa 1 (paragens 1–8)",
    leg2: "Etapa 2 (paragens 8–16)",
    scrollZoomHint: "Clique no mapa e use a roda para ampliar",
  },
  stopList: {
    currentStop: "Local actual",
    allStops: "Todos os locais",
    entriesHint: "{count} LOCAIS",
    visited: "VISITADO",
    stopOf: "LOCAL {current} DE {total}",
    markVisited: "Marcar local {number} como visitado",
    done: "Concluído",
    undoDone: "Desfazer",
    expand: "Mostrar locais",
    collapse: "Ocultar locais",
  },
  tourMode: {
    title: "Modo passeio",
    visited: "{visited} de {total} locais visitados",
    endTour: "Terminar passeio",
    startTour: "Iniciar passeio",
    back: "Anterior",
    next: "Seguinte",
  },
  routeToggle: {
    label: "ESCOLHA DE ROTA",
    ariaLabel: "Variante do passeio",
    fullTitle: "PASSEIO COMPLETO",
    fullStops: "16 LOCAIS",
    shortTitle: "PASSEIO CURTO",
    shortStops: "6 LOCAIS",
    riddleTitle: "CAÇA AO TESOURO",
    riddleStops: "9 LOCAIS",
  },
  direction: {
    ariaLabel: "Direção do passeio",
    forward: "Início → Fim",
    reverse: "Fim → Início",
    toggle: "Inverter direção",
    startAt: "Início: {name}",
  },
  playMode: {
    label: "MODO DE JOGO",
    riddle: "Caça ao tesouro",
    free: "Passeio livre",
    ariaLabel: "Escolher modo de jogo",
  },
  riddle: {
    title: "Pergunta no local",
    check: "Verificar",
    correct: "Correcto! Local resolvido.",
    wrong: "Ainda não – olhe com mais atenção.",
    showHint: "Mostrar dica",
    hideHint: "Ocultar dica",
    solved: "Resolvido",
    locked: "Bloqueado",
    lockedHint: "Resolva primeiro o local {number}",
    inputLabel: "A sua resposta",
  },
  navigator: {
    title: "Próximo local",
    toStop: "Local {number} · {distance} · ~{minutes} min",
    walkTime: "~{minutes} min a pé",
    openMaps: "Abrir no Google Maps",
    waiting: "A determinar localização…",
    geoDenied: "Acesso à localização negado.",
    geoFailed: "Não foi possível determinar a localização.",
    geoUnsupported: "Geolocalização não suportada.",
  },
  progress: {
    share: "Partilhar progresso",
    shared: "Link copiado!",
    shareFailed: "Falha ao copiar",
  },
  evidence: {
    title: "FOTO PROVA",
    hint: "Tire uma foto no local – fica no seu processo.",
    capture: "Tirar foto",
    replace: "Substituir foto",
    remove: "Remover",
    saving: "A guardar…",
    error: "Não foi possível guardar a foto.",
    caption: "LOCAL {number}",
    photoAlt: "Foto prova local {number}: {name}",
    archiveAria: "Arquivo de fotos prova",
    archiveMeta: "CASE FILES · GUARDADO LOCALMENTE",
    archiveTitle: "Arquivo de provas",
    archiveCount: "{count} DE {total} FOTOS",
  },
  stopDetail: {
    close: "Fechar",
    backToList: "Voltar à lista",
    openInMaps: "Abrir no Google Maps",
    directions: "Rota até aqui",
    prev: "Anterior",
    next: "Seguinte",
    done: "Concluído",
    doneNext: "Concluído · Seguinte",
    undoDone: "Anular conclusão",
    empty: "Escolha um local no mapa ou na lista",
    showQuote: "Citação do livro",
  },
  categories: {
    buchszene: "Cena real do livro",
    kulisse: "Cenário & ambiente",
    stadttour: "Dica urbana do Henrik",
    fan: "Verificação de fãs",
  },
  stops: stopsPt,
  food: {
    ariaLabel: "Ementa do Henrik",
    meta: "PROVAS · CULINÁRIAS (5)",
    title: "Ementa do Henrik",
    markTasted: "Marcar {name} como provado",
    items: {
      "bica-nata": {
        name: "Bica & Pastel de Nata",
        where: "A Brasileira, Chiado",
        source: "Recompensa de Henrik após a subida — passeio urbano, Volume 1",
      },
      limonade: {
        name: "Limonada com manjericão",
        where: "Quiosque no Largo do Carmo",
        source: "Pausa de Henrik para reflectir sobre os mistérios do antiquário",
      },
      ginjinha: {
        name: "Ginjinha (licor de ginja)",
        where: "Sem Rival ou A Ginjinha, Rossio",
        source:
          'Ritual: no balcão diga "Com elas" (com ginjas) – beber de pé no calcetão. Volume 2.',
      },
      tintenfisch: {
        name: "Polvo grelhado & Vinho Verde",
        where: "Rua do Vigário, Alfama",
        source: "Dica de restaurante de Henrik: duas mesas na calçada",
      },
      mazagran: {
        name: "Mazagran (café gelado com limão)",
        where: "Miradouro da Graça",
        source: "Refresco de Henrik debaixo dos pinheiros — Volume 2",
      },
    },
  },
  gastro: {
    ariaLabel: "Guia de Henrik e Helena",
    meta: "SABOR · ANTIQUÁRIO · NOTAS",
    title: "Guia de Henrik & Helena",
    subtitle:
      "Steak, borrego, marisco, tascas, endereços quietos e rituais do Henrik ao longo da rota – fora do circuito turístico, sem clássicos de porco.",
    filterAria: "Filtrar categoria",
    mapsLink: "Mapa e rota ↗",
    empty: "Nenhum endereço nesta categoria.",
    expand: "Expandir guia",
    collapse: "Fechar guia",
    countHint: "{count} ENDEREÇOS",
    filters: {
      all: "Mostrar todos",
      steak: "Vaca & steak",
      lamb: "Borrego",
      seafood: "Marisco",
      tasca: "Tasca & latas",
      antiquariat: "Antiquários",
      morbid: "Melancolia",
      ritual: "Rituais",
    },
    categories: {
      steak: "Steak & vaca",
      lamb: "Borrego",
      seafood: "Marisco",
      tasca: "Tasca",
      antiquariat: "Antiquário",
      morbid: "Melancolia",
      ritual: "Ritual",
    },
    items: {
      "sala-de-corte": {
        name: "Sala de Corte",
        area: "Cais do Sodré / Praça do Comércio",
        description:
          "O templo indiscutível dos amantes de carne em Lisboa. Cortes dry-aged amadurecem numa câmara de vidro e são acabados no lendário forno Josper a carvão.",
        recommendation:
          "Sugestão: Chateaubriand ou ribeye com puré de trufa.",
      },
      "cafe-sao-bento": {
        name: "Café de São Bento",
        area: "São Bento · perto da Bica",
        description:
          "Um clássico atemporal com ambiente de clube vitoriano. Há mais de 40 anos servem o bife mais famoso da cidade, afogado numa molho de natas e manteiga.",
        recommendation:
          "Sugestão: Bife à Café de São Bento (filé na frigideira).",
      },
      "solar-dos-presuntos": {
        name: "Solar dos Presuntos",
        area: "Baixa / Restauradores",
        description:
          "Restaurante familiar conhecido pela qualidade sem concessões. Além de peixe excelente, servem uma das melhores especialidades tradicionais de borrego do país.",
        recommendation:
          "Sugestão: Paleta de Borrego assada.",
      },
      "cervejaria-ramiro": {
        name: "Cervejaria Ramiro",
        area: "Intendente · perto da Mouraria",
        description:
          "O templo mundialmente famoso do marisco. Sem firulas, puro prazer: camarões gigantes, lagostins e amêijoas fresquíssimas em azeite e alho.",
        recommendation:
          "Sugestão: Carabineiros & Prego de 'sobremesa'.",
      },
      "sol-e-pesca": {
        name: "Sol e Pesca",
        area: "Cais do Sodré · Pink Street",
        description:
          "Antiga loja de pesca, hoje um bar minúsculo ainda cheio de canas e redes. Só as melhores conservas – polvo em alho, cavalinha, sardinhas – com Vinho Verde bem frio.",
        recommendation:
          "Sugestão: Conservas do dia e Vinho Verde gelado.",
      },
      "conserveira-lisboa": {
        name: "Conserveira de Lisboa",
        area: "Baixa",
        description:
          "Quase inalterada há um século: atrás de balcões de madeira maciça, latas coloridas de sardinhas, polvo e cavala. Cada lata é embrulhada à mão em papel e atada com cordel – conservas como ofício, não fast food.",
        recommendation:
          "Sugestão: Sardinhas de safra ou polvo em alho – as rações de investigador do Henrik.",
      },
      "velho-eurico": {
        name: "O Velho Eurico",
        area: "Mouraria · Largo de São Cristóvão",
        description:
          "Uma tasca minúscula num beco, retomada por uma equipa jovem sem perder o charme rude. Sem menus turísticos: polvo tenro, bochechas de vaca, vinho da casa em bilhas de barro.",
        recommendation:
          "Sugestão: Polvo ou bochechas – cotovelos na mesa de madeira.",
      },
      "livraria-simao": {
        name: "Livraria Simão",
        area: "Mouraria · Escadinhas de São Cristóvão",
        description:
          "Uma das mais pequenas livrarias do mundo: pouco mais de quatro metros quadrados, mais de 4.000 volumes até ao tecto. O dono passa muitas vezes os tesouros para os degraus – estranho, secreto, como um sítio para achar um documento perdido.",
        recommendation:
          "Olhar de Henrik: Parece que um manuscrito perdido espera atrás da próxima pilha.",
      },
      "sa-da-costa": {
        name: "Livraria Sá da Costa",
        area: "Chiado · Rua Garrett",
        description:
          "Enquanto a Bertrand ao lado está muitas vezes cheia, aqui cheira a couro velho e história: mapas seculares, fotografias amareladas, primeiras edições – como o arquivo do tio de Henrik.",
        recommendation:
          "Olhar de Henrik: Perder horas no passado de Lisboa.",
      },
      "vida-portuguesa": {
        name: "A Vida Portuguesa",
        area: "Chiado",
        description:
          "Uma loja que salva marcas portuguesas antigas do esquecimento: sabonetes Claus Porto, cadernos nostálgicos, loiça, perfumes. Cheiro a alfazema, cera de abelha, cedro e papel.",
        recommendation:
          "Olhar de Henrik: Como vasculhar as sobras privadas do tio Arthur.",
      },
      "hospital-bonecas": {
        name: "Hospital de Bonecas",
        area: "Baixa · Praça da Figueira",
        description:
          "Desde 1830 esta pequena oficina familiar no primeiro andar restaura bonecas partidas. Cabeças de porcelana, membros, olhos de vidro – nostálgico, fascinante e um pouco inquietante.",
        recommendation:
          "Olhar de Henrik: Um microcosmo de preservação – ideal para uma pista escondida.",
      },
      "ginjinha-ritual": {
        name: "Ritual da ginjinha de pé",
        area: "Rossio · Sem Rival ou A Ginjinha",
        description:
          'Sem mesas: no balcão de madeira um copo pegajoso de ginja. À pergunta "Com ou sem elas?", responde "Com elas". Bebe-se de pé no calcetão.',
        recommendation:
          "Ritual de Henrik: combustível doce entre lisboetas a debater futebol.",
      },
      "vila-berta": {
        name: "Vila Berta",
        area: "Graça · perto do miradouro",
        description:
          "Um beco operário esquecido de 1900: varandas de ferro forjado, azulejos Arte Nova, roupa a secar sobre a rua. Quase silêncio irreal no meio da cidade.",
        recommendation:
          "Ritual de Henrik: o sítio perfeito para um encontro conspirativo com Helena.",
      },
      "senhora-do-monte": {
        name: "Miradouro da Senhora do Monte",
        area: "Graça · hora azul",
        description:
          "O miradouro mais alto de Lisboa – mais calmo que as Portas do Sol. Quando o sol se põe atrás da Ponte 25 de Abril e as lanternas da baixa se acendem, a cidade fica em silêncio aos teus pés.",
        recommendation:
          "Ritual de Henrik: Sagres ou limonada para a saudade – ordenar as peças do caso.",
      },
      "tasca-do-jaime": {
        name: "Tasca do Jaime · Fado Vadio",
        area: "Mouraria",
        description:
          "Esqueça o fado encenado do Chiado – aqui a vizinha ou o artesão cantam espontaneamente à guitarra portuguesa. Cru, por polir, debaixo da pele.",
        recommendation:
          "Ritual de Henrik: à noite, quando a luz baixa e soa a primeira nota. Complementa o Spotify.",
      },
    },
  },
  laufzettel: {
    ariaLabel: "Folha de registo",
    meta: "FOLHA DE REGISTO · PROCESSO LISBOA",
    title: "Protocolo de investigação",
    caseClosed: "SELADO A LACRE",
    allSighted: "{total} DE {total} LOCAIS REGISTADOS",
    sighted: "REGISTADOS: {count} / {total}",
    quote: "O caso está resolvido. Hora de um Vinho Verde.",
    fullyTasted: "TOTALMENTE PROVADO",
    resetProgress: "Recomeçar",
    resetConfirm:
      "Repor todo o progresso e começar o passeio do início?",
  },
  notes: {
    ariaLabel: "Bloco de notas do investigador",
    meta: "CO-OP · DIÁRIO DE VIAGEM",
    title: "Bloco de notas do investigador",
    subtitle:
      "Descobertas espontâneas, dicas de restaurantes ou suspeitas – partilha o link e a nota aparece no ecrã deles.",
    inputLabel: "Notas partilhadas",
    placeholder:
      "Dica: Na tasca, pede Vinho Verde no jarro de pedra!",
    hint: "Cada carácter entra em directo no URL depois de #",
    counter: "{count} / {max}",
    share: "Partilhar nota",
  },
  stamp: {
    ariaLabel: "Carimbo local {number}",
    sighted: "LOCAL REGISTADO",
  },
};
