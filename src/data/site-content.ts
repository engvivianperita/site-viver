import { Building2, ClipboardCheck, GraduationCap, HardHat, Leaf, Scale, Settings, ShieldCheck } from "lucide-react";

export const primaryServices = [
  { title: "Saúde e Segurança do Trabalho", description: "Gestão de riscos, programas, laudos e controles conectados à operação.", icon: ShieldCheck },
  { title: "Gestão Ambiental", description: "Aspectos e impactos, resíduos, produtos químicos e conformidade ambiental.", icon: Leaf },
  { title: "Mobilização e contratos", description: "Organização técnica e documental para iniciar e manter contratos.", icon: ClipboardCheck },
  { title: "Auditorias e conformidade", description: "Verificação de requisitos, evidências e planos de adequação.", icon: Scale },
  { title: "Treinamentos e capacitações", description: "NRs, integração, CIPA, brigada, EPI, ergonomia e conteúdos personalizados.", icon: GraduationCap },
  { title: "Inspeções em campo", description: "Avaliação prática das condições e acompanhamento das ações.", icon: HardHat },
  { title: "Gestão integrada", description: "Integração entre qualidade, meio ambiente e segurança.", icon: Settings },
  { title: "Perícias e assistência técnica", description: "Análises especializadas, pareceres e apoio em diligências.", icon: Building2 },
];

export const sectors = ["Obras civis e infraestrutura","Manutenção industrial","Montagem eletromecânica","Instalações elétricas e telecomunicações","Transporte e logística","Limpeza e conservação industrial","Máquinas e equipamentos","Andaimes e trabalho em altura","Monitoramento ambiental","Alimentação, apoio operacional e facilities","Controle de vetores e pragas","Serviços executados em áreas de mineração","Clínicas, consultórios e laboratórios","Hospitais, serviços de saúde e apoio diagnóstico","Serviços de saúde ocupacional e atendimento ambulatorial"];

export const environmentalHighlights = [
  "Diagnóstico e conformidade ambiental",
  "Licenciamento e condicionantes",
  "Gestão de resíduos e produtos químicos",
  "Água, efluentes e proteção do solo",
  "Emissões, poeira e ruído ambiental",
  "Auditorias e inspeções ambientais",
  "Emergências ambientais",
  "Educação ambiental e sustentabilidade",
];

export const differentials = [
  { title: "Atendimento integrado", text: "SST e meio ambiente analisados conjuntamente, evitando documentos desconectados da realidade operacional." },
  { title: "Visão de campo", text: "As recomendações consideram a execução prática dos serviços, os riscos da atividade e as exigências do contrato." },
  { title: "Documentação personalizada", text: "Os documentos são desenvolvidos conforme a empresa, as funções, os riscos e as frentes de trabalho." },
  { title: "Foco em evidências", text: "Organização dos registros para demonstrar conformidade em auditorias, fiscalizações e mobilizações." },
  { title: "Atendimento próximo", text: "Contato direto, acompanhamento das pendências e suporte durante o processo de adequação." },
  { title: "Flexibilidade", text: "Contratação por documento, projeto, diagnóstico, auditoria, treinamento, visita, pacote mensal ou acompanhamento contínuo." },
];

export const methodology = [
  ["Diagnóstico","Levantamento das atividades, documentos, riscos e requisitos."],
  ["Planejamento","Definição do escopo, prioridades, responsáveis e cronograma."],
  ["Desenvolvimento","Elaboração dos documentos, inspeções, treinamentos e avaliações."],
  ["Implementação","Apoio na aplicação das medidas e organização das evidências."],
  ["Verificação","Auditoria, acompanhamento dos indicadores e análise das ações."],
  ["Melhoria contínua","Atualização dos documentos e aperfeiçoamento dos controles."],
];

export const engagement = [
  ["Serviço pontual","Elaboração de documentos, treinamentos, laudos, inspeções ou auditorias específicas."],
  ["Projeto de mobilização","Preparação da empresa e dos trabalhadores para o início de um contrato."],
  ["Assessoria mensal","Suporte contínuo em SST e meio ambiente, com acompanhamento de documentos, indicadores, inspeções e planos de ação."],
  ["Profissional sob demanda","Atendimento técnico para reuniões, diligências, auditorias, fiscalizações e necessidades específicas."],
];
