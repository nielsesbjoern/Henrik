import type { LegalTranslations } from "./types";

export const legalPt: LegalTranslations = {
  close: "Fechar",
  navAria: "Avisos legais",
  impressumLink: "Aviso legal",
  privacyLink: "Privacidade",
  liabilityLink: "Responsabilidade e direitos de autor",
  contactHeading: "Contacto",
  emailLabel: "E-mail",
  impressum: {
    title: "Aviso legal (Impressum)",
    intro:
      "Informações nos termos do § 5 da lei alemã de serviços digitais (DDG) e do § 18 MStV.",
    sections: [
      {
        heading: "Prestador do serviço",
        paragraphs: [
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
        ],
      },
      {
        heading: "Responsável pelo conteúdo (§ 18 Abs. 2 MStV)",
        paragraphs: ["{name}, morada como acima."],
      },
      {
        heading: "Sobre esta oferta",
        paragraphs: [
          "Esta é um projeto de fãs não oficial: um passeio literário nos passos dos romances de crime de Lisboa de Luis Sellano (Heyne Verlag). Não existe ligação comercial ou editorial com a editora ou o autor.",
        ],
      },
      {
        heading: "Resolução de litígios",
        paragraphs: [
          "A Comissão Europeia disponibiliza uma plataforma de resolução de litígios em linha (RLL): https://ec.europa.eu/consumers/odr/. Não estamos obrigados nem dispostos a participar em processos de resolução de litígios perante uma entidade de arbitragem de consumo.",
        ],
      },
    ],
  },
  privacy: {
    title: "Política de privacidade",
    intro:
      "Esta declaração informa sobre o tratamento de dados pessoais ao visitar e utilizar esta aplicação web (Regulamento Geral sobre a Proteção de Dados, RGPD).",
    sections: [
      {
        heading: "1. Responsável",
        paragraphs: [
          "Responsável pelo tratamento de dados:",
          "{name}",
          "{street}",
          "{zipCity}",
          "{country}",
          "E-mail: {email}",
        ],
      },
      {
        heading: "2. Geral",
        paragraphs: [
          "Esta app é uma progressive web app do lado do cliente. Não existe conta de utilizador nem gestão de utilizadores no servidor pelo prestador. Quando há tratamento de dados pessoais, ocorre sobretudo localmente no seu dispositivo ou através de serviços que ativa (p. ex. mosaicos de mapa, ligações externas).",
        ],
      },
      {
        heading: "3. Alojamento e registos do servidor",
        paragraphs: [
          "Ao aceder ao site, o fornecedor de alojamento ou CDN processa dados de ligação tecnicamente necessários (p. ex. endereço IP, hora, recurso pedido, user-agent). Base jurídica: art. 6.º, n.º 1, alínea f), do RGPD (interesse legítimo no funcionamento seguro e estável). Os prazos de conservação dependem do fornecedor de alojamento.",
        ],
      },
      {
        heading: "4. Armazenamento local no seu dispositivo",
        paragraphs: [
          "A app guarda definições e progresso do passeio localmente no browser (localStorage) e, opcionalmente, fotos de prova na IndexedDB do dispositivo. Isto pode incluir: idioma, ambiente (luz do dia / hora azul), paragens visitadas, enigmas resolvidos, comidas marcadas, notas e – se tirar fotos – dados de imagem.",
          "Estes dados não são transmitidos ao prestador. Base jurídica: art. 6.º, n.º 1, alínea f), do RGPD e, se necessário, art. 6.º, n.º 1, alínea a) (consentimento pelo uso deliberado da função). Pode apagar os dados através da função de reposição na app e nas definições do browser.",
        ],
      },
      {
        heading: "5. Dados de localização (geolocalização)",
        paragraphs: [
          "Só quando utiliza ativamente funções de localização (p. ex. «encontrar-me» ou navegação do passeio) é que a app pede a sua localização aproximada através da API do browser. A posição é processada apenas localmente e não é enviada ao prestador.",
          "Base jurídica: art. 6.º, n.º 1, alínea a), do RGPD (consentimento via permissão do browser). Pode revogar a permissão a qualquer momento nas definições do browser ou do sistema.",
        ],
      },
      {
        heading: "6. Serviços de mapas (OpenStreetMap / CARTO)",
        paragraphs: [
          "O mapa interativo carrega mosaicos da CARTO (dados OpenStreetMap). O seu dispositivo pode transmitir dados de ligação ao fornecedor do mapa (em especial o endereço IP).",
          "Base jurídica: art. 6.º, n.º 1, alínea f), do RGPD (interesse legítimo em mostrar o percurso). Mais informações: https://carto.com/privacy/ e https://wiki.osmfoundation.org/wiki/Privacy_Policy.",
        ],
      },
      {
        heading: "7. Ligações externas (Google Maps etc.)",
        paragraphs: [
          "As ligações para o Google Maps ou outros serviços só são abertas quando as escolhe. Aplicam-se então as políticas de privacidade desses fornecedores. Estas ligações não ativam rastreio automático.",
        ],
      },
      {
        heading: "8. Incorporação Spotify",
        paragraphs: [
          "O leitor de fado pode carregar um embed do Spotify. Ao abrir o leitor, o browser liga-se ao Spotify; dados pessoais (p. ex. IP, informações do dispositivo) podem ser transmitidos ao Spotify – mesmo sem conta Spotify.",
          "Base jurídica: art. 6.º, n.º 1, alínea f), ou alínea a) do RGPD quando abre o leitor ativamente. Política de privacidade do Spotify: https://www.spotify.com/legal/privacy-policy/.",
        ],
      },
      {
        heading: "9. Progressive web app / service worker",
        paragraphs: [
          "Para uso offline e desempenho, um service worker pode guardar conteúdos (ficheiros da app, eventualmente mosaicos) localmente. Trata-se de armazenamento técnico no dispositivo, não de cookies de rastreio.",
        ],
      },
      {
        heading: "10. Cookies e rastreio",
        paragraphs: [
          "Não utilizamos cookies de análise, publicidade ou rastreio, nem medição de audiência de terceiros. O armazenamento tecnicamente necessário (secções 4 e 9) serve apenas à funcionalidade da app.",
        ],
      },
      {
        heading: "11. Conservação",
        paragraphs: [
          "Os dados armazenados localmente permanecem no seu dispositivo até os apagar ou o browser os remover. Os registos do servidor de alojamento seguem os prazos do fornecedor.",
        ],
      },
      {
        heading: "12. Os seus direitos",
        paragraphs: [
          "Nos termos do RGPD tem, entre outros, direito de acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição a tratamentos com base no art. 6.º, n.º 1, alínea f). Se o tratamento se basear em consentimento, pode retirá-lo a qualquer momento com efeitos para o futuro.",
          "Tem também o direito de apresentar reclamação a uma autoridade de controlo de proteção de dados, normalmente no seu local de residência.",
        ],
      },
      {
        heading: "13. Alterações",
        paragraphs: [
          "Podemos atualizar esta política se a app ou a lei mudarem. Aplica-se a versão publicada nesta página.",
        ],
      },
    ],
  },
  liability: {
    title: "Responsabilidade e direitos de autor",
    sections: [
      {
        heading: "Projeto de fãs não oficial",
        paragraphs: [
          "Esta aplicação web é um projeto de fãs independente. Personagens, enredos e marcas da série de crimes de Lisboa pertencem a Luis Sellano e/ou à Heyne Verlag (Penguin Random House). Não existe parceria oficial, licença ou aprovação editorial.",
          "A localização do antiquário e associações semelhantes de fãs são interpretações, não cenários oficiais.",
        ],
      },
      {
        heading: "Responsabilidade pelos conteúdos",
        paragraphs: [
          "As descrições do passeio, dicas e notas gastronómicas são preparadas com cuidado, mas não pretendem ser completas ou atualizadas. Horários, preços e acessibilidade podem mudar. A utilização é por sua conta e risco.",
          "Como prestador somos responsáveis pelos nossos próprios conteúdos segundo a lei geral. Não estamos obrigados a monitorizar informações de terceiros transmitidas ou armazenadas.",
        ],
      },
      {
        heading: "Responsabilidade por ligações",
        paragraphs: [
          "Esta app contém ligações a sites de terceiros. Não controlamos os seus conteúdos. O respetivo fornecedor é responsável pelas páginas ligadas. As ligações serão removidas se tomarmos conhecimento de violações legais.",
        ],
      },
      {
        heading: "Direitos de autor",
        paragraphs: [
          "Salvo indicação em contrário, textos, layout e código desta app de fãs estão protegidos pelos direitos de autor do prestador. Citações dos romances servem o contexto literário no âmbito do direito de citação, quando aplicável.",
          "Dados de mapa: contribuidores OpenStreetMap; renderização via CARTO. Marcas de terceiros (incluindo Spotify, Google) permanecem dos respetivos titulares.",
        ],
      },
    ],
  },
};
