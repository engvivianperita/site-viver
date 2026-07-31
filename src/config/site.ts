// Substitua os valores em CAIXA ALTA antes da publicação.
export const siteConfig = {
  name: "Viver Segurança no Trabalho",
  tagline: "SST, Meio Ambiente e Gestão Integrada",
  responsible: "Vívian Ermelinda Oliveira dos Santos Alves",
  phone: "5531988428153", // Somente números, com DDI e DDD.
  phoneDisplay: "(31) 9 8842-8153",
  whatsapp: "553133858015", // Somente números, com DDI e DDD.
  whatsappDisplay: "(31) 3385-8015",
  email: "viversst@viversst.com.br", // Substitua pelo e-mail de atendimento.
  instagram: "@viver_seguranca_no_trabalho", // Substitua pela URL ou usuário oficial.
  linkedin: "", // Substitua pela URL oficial.
  city: "Belo Horizonte",
  state: "Minas Gerais",
  serviceArea: "Belo Horizonte, Região Metropolitana e demais municípios de Minas Gerais",
  url: "https://www.viversst.com.br", // Domínio canônico, sem barra final.
  professionalRegistry: "Engenheira de Segurança do Trabalho CREA/MG 241319", // Não é exibido enquanto não for validado.
} as const;

export const hasWhatsApp = /^\d{10,15}$/.test(siteConfig.whatsapp);
export const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email);
