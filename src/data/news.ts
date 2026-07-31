export type NewsArticle = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category: string;
  content: string[];
};

// Para publicar semanalmente: duplique um bloco, altere os campos e use um slug único.
// A data deve seguir o formato AAAA-MM-DD. A notícia mais recente aparece primeiro.
export const news: NewsArticle[] = [
  {
    slug: "documentacao-de-sst-conectada-a-rotina-de-campo",
    title: "Documentação de SST conectada à rotina de campo",
    summary: "Entenda por que programas e procedimentos devem refletir as atividades efetivamente executadas pelas equipes.",
    publishedAt: "2026-07-21",
    category: "Saúde e Segurança do Trabalho",
    content: [
      "Documentos de Saúde e Segurança do Trabalho cumprem melhor sua função quando representam as atividades, os perigos e os controles existentes em cada frente de serviço.",
      "Além da elaboração inicial, é importante revisar informações após mudanças de processo, inclusão de equipamentos, criação de funções ou identificação de novos riscos. Inspeções e conversas com as equipes ajudam a manter os registros coerentes com a operação.",
      "Essa integração facilita treinamentos, auditorias, mobilizações e o acompanhamento dos planos de ação, criando evidências mais claras sobre as medidas adotadas pela empresa.",
    ],
  },
  {
    slug: "organizacao-previa-para-mobilizacao-de-contratos",
    title: "Organização prévia para mobilização de contratos",
    summary: "Um roteiro inicial para reduzir pendências documentais antes do início das atividades.",
    publishedAt: "2026-07-14",
    category: "Contratos e mobilização",
    content: [
      "A mobilização começa com o entendimento do escopo, das funções envolvidas e dos requisitos definidos pela empresa contratante.",
      "O levantamento antecipado de ASO, treinamentos, fichas de EPI, autorizações e documentos técnicos permite identificar pendências e estabelecer responsáveis e prazos.",
      "A conferência deve considerar a validade, a coerência entre documentos e as particularidades das atividades críticas previstas no contrato.",
    ],
  },
  {
    slug: "gestao-ambiental-com-evidencias",
    title: "Gestão ambiental orientada por evidências",
    summary: "Registros consistentes ajudam a acompanhar controles e demonstrar conformidade ambiental.",
    publishedAt: "2026-07-07",
    category: "Gestão Ambiental",
    content: [
      "A gestão ambiental envolve reconhecer os aspectos e impactos das atividades e definir controles proporcionais ao contexto da operação.",
      "Registros de resíduos, inspeções, treinamentos, consumo e atendimento a condicionantes permitem acompanhar resultados e identificar oportunidades de melhoria.",
      "Essas evidências também apoiam auditorias e fiscalizações, desde que estejam organizadas, atualizadas e vinculadas às ações realizadas.",
    ],
  },
];

export const sortedNews = [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
