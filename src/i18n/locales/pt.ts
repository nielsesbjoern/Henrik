import type { Translations } from "../types";
import { legalPt } from "../legal/pt";
import { stopsPt } from "../stops/pt";

export const pt: Translations = {
  meta: {
    title: "Passeio Português – Um Crime de Lisboa de Luis Sellano",
    description:
      "Passeio literário por Lisboa nos passos dos romances de crime de Lisboa de Luis Sellano.",
  },
  hero: {
    author: "LUIS SELLANO",
    series: "UM CRIME DE LISBOA",
    title: "Passeio Português",
    meta: "{count} LOCAIS · {city}",
    cta: "INICIAR PASSEIO",
  },
  mood: {
    ariaLabel: "Ambiente",
    day: "Luz do dia",
    dusk: "Hora azul",
  },
  footer: {
    text: "Projecto de fãs não oficial. As personagens e enredos dos romances pertencem à série de crimes de Lisboa de Luis Sellano (Heyne Verlag). A localização do antiquário é uma verificação de fãs.",
  },
  legal: legalPt,
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
    reconstructedNote:
      "O Volume 8 não nomeia ruas concretas — estes locais reconstroem o cenário do romance; não são cenas de crime comprovadas.",
    fictionalNote: "Só no romance — posição conforme o mapa do livro",
  },
  cities: {
    ariaLabel: "Escolher processo",
    lisboaTab: "PROCESSO LISBOA",
    cascaisTab: "PROCESSO CASCAIS",
    lisboaShort: "LISBOA",
    cascaisShort: "CASCAIS",
    lisboaAkte: "Processo Lisboa",
    cascaisAkte: "Processo Cascais",
    lisboaSubtitle: "Processo Lisboa · Volumes 1–7, 9–11",
    cascaisSubtitle: "Processo Cascais · Volume 8",
    progress: "{count}/{total}",
    sealed: "SELADO",
    antiquaryNote:
      "NOTA DO ANTIQUÁRIO: O processo Cascais segue o mapa original do romance do Volume 8. Quatro locais são reais e confirmados — três existem apenas entre duas capas.",
    expandAkte: "Abrir processo",
    collapseAkte: "Fechar processo",
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
      { label: "Início", value: "Antiquário / Bica" },
      { label: "Fim", value: "Praça do Comércio" },
      { label: "Distância total", value: "~5 km" },
      { label: "Tempo a pé", value: "~1,5–2 horas" },
      { label: "Com pausas", value: "cerca de meio a um dia inteiro" },
      { label: "Melhor dia", value: "Sábado (Feira da Ladra)" },
      {
        label: "Eléctrico 28",
        value:
          "Local: Martim Moniz (Volume 10). Evitar de dia. Viagem fantasma depois das ~21:30 – eléctrico de madeira vazio pela Alfama.",
      },
    ],
    short: [
      { label: "Início", value: "Antiquário / Bica" },
      { label: "Fim", value: "Praça do Comércio" },
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
    legPart: "Etapa {index} (paragens {from}–{to})",
    scrollZoomHint: "Clique no mapa e use a roda para ampliar",
    fitRoute: "Centrar o percurso",
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
  tours: {
    "lisboa-gross": {
      title: "PASSEIO COMPLETO",
      stops: "16 LOCAIS",
      stats: "~6–7 km · a pé ~2 h",
      heroText:
        "Nas pegadas de Henrik Falkner: da Bica e do Chiado, passando pelo Rossio até ao Castelo, pela Alfama — e termina no Tejo.",
    },
    "lisboa-kurz": {
      title: "PASSEIO CURTO",
      stops: "6 LOCAIS",
      stats: "~3,5 km · a pé ~1 h",
      heroText:
        "O essencial em duas horas e meia: antiquário, Chiado, Rossio, Baixa — final com vista sobre a Alfama.",
    },
    "lisboa-raetsel": {
      title: "CAÇA AO TESOURO",
      stops: "9 LOCAIS",
      stats: "~4 km · com enigmas",
      heroText:
        "Uma caça ao tesouro com enigmas: do Castelo pela Alfama até ao Tejo — e de volta ao antiquário.",
    },
    cascais: {
      title: "PASSEIO DO CRIME",
      stops: "9 LOCAIS",
      stats: "~4 km · a pé ~1,25 h · plano",
      heroText:
        "O caso do Volume 8: da estação ao local do crime na Praia da Duquesa, pela vila até à marina — epílogo na costa escarpada.",
    },
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
    cardLabel: "FICHA N.º {number}",
    caseNo: "PROCESSO N.º",
    district: "BAIRRO",
    coordinates: "COORDENADAS",
    volume: "VOLUME",
    openInMaps: "Abrir no Google Maps",
    directions: "Rota até aqui",
    prev: "Anterior",
    next: "Seguinte",
    done: "Concluído",
    doneNext: "Concluído · Seguinte",
    undoDone: "Anular conclusão",
    empty: "Escolha um local no mapa ou na lista",
    showQuote: "Citação do livro",
    fictionalPlaceNote:
      "LOCAL FICTÍCIO — posição conforme o mapa do romance, sem morada real",
  },
  categories: {
    buchszene: "Cena real do livro",
    kulisse: "Cenário & ambiente",
    stadttour: "Dica urbana do Henrik",
    fan: "Verificação de fãs",
    rekonstruiert: "Cenário do livro — reconstruído",
    fiktiv: "Local fictício — mapa do romance",
  },
  stops: stopsPt,
  food: {
    ariaLabel: "Ementa do Henrik",
    meta: "PROVAS · CULINÁRIAS ({count})",
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
      mercado: {
        name: "Petiscos no Mercado da Vila",
        where: "Mercado da Vila, Cascais",
        source: "Sem citação do livro — bónus do passeio costeiro",
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
      "brasserie-entrecote": {
        name: "La Brasserie de L'Entrecôte",
        area: "Marina de Cascais",
        description:
          "O equivalente luxuoso do Café de São Bento na costa. Em ambiente clássico e elegante, tudo gira em torno do entrecôte perfeitamente tenro, com uma lendária molho secreto de manteiga e ervas.",
        recommendation:
          "Dica: Ideal para um jantar elegante com vista para os iates.",
      },
      "churrasqueira-viveiro": {
        name: "Churrasqueira do Viveiro",
        area: "Colinas de Cascais (Adroana)",
        description:
          "Uma dica local rude nas colinas acima da vila. Sem firulas turísticas — um enorme grelhador a carvão, o bulício de famílias locais e as melhores costelas da região.",
        recommendation:
          "Dica: Peça a gigante 'Costeleta de Novilho' medium-rare.",
      },
      "visconde-da-luz": {
        name: "Restaurante Visconde da Luz",
        area: "Jardim Visconde da Luz",
        description:
          "Um restaurante maravilhosamente tradicional, quase museológico, junto ao jardim histórico de Cascais. Cadeiras pesadas de madeira sob candelabros — o cenário exacto para os interrogatórios mais difíceis de Henrik.",
        recommendation:
          "Dica: O cabrito assado no forno, tenro como manteiga.",
      },
      "mar-do-inferno": {
        name: "Mar do Inferno",
        area: "Boca do Inferno",
        description:
          "Mesmo nas falésias da Boca do Inferno. Apesar da localização proeminente, um favorito dos locais para caranguejo fresco, percebes e peixe selvagem grelhado.",
        recommendation:
          "Dica: Partilhar a sapateira recheada.",
      },
      "furnas-do-guincho": {
        name: "Furnas do Guincho",
        area: "Estrada do Guincho",
        description:
          "Construído de forma deslumbrante nas falésias sobre o oceano. Enquanto as ondas rebentam sob as janelas panorâmicas, come-se peixe fino em crosta de sal. Dramático, melancólico, inesquecível.",
        recommendation:
          "Dica: O robalo ao sal.",
      },
      "taberna-clandestina": {
        name: "Taberna Clandestina Cascais",
        area: "Ruelas da vila",
        description:
          "Uma joia minúscula e sombria nas ruelas de pedra. Perfeita para um encontro tardio e secreto com excelente tinto português, carpaccio de vaca e queijos escolhidos à mão.",
        recommendation:
          "Dica: Um copo tardio de tinto pesado do Alentejo no interior sombreado.",
      },
      "museu-castro-guimaraes": {
        name: "Biblioteca do Museu Condes de Castro Guimarães",
        area: "Parque Marechal Carmona",
        description:
          "Um palacete neogótico junto à água — o tesouro definitivo para qualquer antiquário. A biblioteca histórica guarda mais de 25.000 volumes antigos, fólios raros e uma crónica iluminada inestimável de 1505. Cada centímetro respira a história escura do país.",
        recommendation:
          "Dica: Olha para os tectos de madeira entalhada enquanto respiras o cheiro de pergaminho secular.",
      },
      "livraria-deja-lu": {
        name: "Livraria Déjà Lu",
        area: "Cais da Cidadela",
        description:
          "Escondida nas muralhas da Cidadela, esta linda livraria de usados — prateleiras peculiares, poltronas antigas, pilhas de achados literários — parece uma miniatura encantadora do antiquário do Henrik na Riviera.",
        recommendation:
          "Dica: Deixa uma pequena oferta e procura relatos de viagem antigos e escondidos.",
      },
      "bar-estoril-palacio": {
        name: "Bar Estoril (Hotel Palácio)",
        area: "Estoril",
        description:
          "O lendário bar de espionagem da Segunda Guerra Mundial. Agentes aliados e do Eixo sentavam-se no fumo denso a poucas mesas de distância enquanto Portugal se mantinha oficialmente neutro. Ian Fleming encontrou aqui a inspiração para James Bond. Poltronas de couro, luz baixa, melancolia histórica pura.",
        recommendation:
          "Dica: Um martini clássico ou um dry white port antigo — e estudar as fotografias de agentes nas paredes.",
      },
      "farol-santa-marta-guide": {
        name: "Farol de Santa Marta",
        area: "Costa de Cascais",
        description:
          "O icónico farol azul e branco junto a um solar histórico. Um lugar de saudade marítima, onde o sinal nocturno guia marinheiros solitários — para Henrik o refúgio visual perfeito quando a investigação emperra.",
        recommendation:
          "Dica: Vem à hora azul, senta-te nas falésias junto à torre e ouve o bater surdo das ondas.",
      },
      "cabo-da-roca": {
        name: "Cabo da Roca (o ponto mais ocidental)",
        area: "Estrada costeira Sintra–Cascais",
        description:
          "O ponto mais ocidental da Europa continental. Um farol solitário e açoitado pelo vento numa falésia de 140 metros sobre o Atlântico. Aqui acaba a Europa — um lugar profundamente melancólico e cru, espelho da fractura interior de Henrik Falkner.",
        recommendation:
          "Dica: Leva um casaco. O vento corta afiado e varre do cabeça qualquer pensamento inútil.",
      },
    },
  },
  laufzettel: {
    ariaLabel: "Folha de registo",
    meta: "FOLHA DE REGISTO · PROCESSO LISBOA",
    metaCascais: "FOLHA DE REGISTO · PROCESSO CASCAIS",
    title: "Protocolo de investigação",
    caseClosed: "CASO ENCERRADO",
    allSighted: "{total} DE {total} LOCAIS REGISTADOS",
    sighted: "REGISTADOS: {count} / {total}",
    totalSighted: "TOTAL: {count} / {total} LOCAIS",
    allCasesClosed: "TODOS OS PROCESSOS ENCERRADOS",
    allCasesSubtitle: "Lisboa & Cascais · {total} locais",
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
