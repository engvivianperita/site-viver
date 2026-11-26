export const DOCUMENTACAO_HTML = `<!doctype html><html lang="pt-BR" data-storage-key="__VIVER_STORAGE_KEY__"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Viver SST | Gestão Documental</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f5faf9;color:#173b37;font:16px system-ui,sans-serif}header{background:#102f2c;color:white;padding:22px max(5vw,20px);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}header span{color:#bde4d3}main{max-width:1150px;margin:auto;padding:35px 22px}h1{font-size:clamp(32px,5vw,56px);letter-spacing:-.05em;margin:0}h2{margin-top:0}p{line-height:1.55}section{background:white;border:1px solid #d9eae7;border-radius:18px;padding:24px;margin:18px 0}nav,.actions{display:flex;flex-wrap:wrap;gap:10px}button,select,input,textarea{font:inherit}button{cursor:pointer;border:1px solid #2ca997;border-radius:9px;padding:10px 14px;background:white;color:#102f2c}button.primary,button[aria-current=true]{background:#102f2c;color:white;border-color:#102f2c}label{display:grid;gap:6px;margin:12px 0;font-weight:550}input,textarea,select{border:1px solid #b9cdc5;border-radius:8px;padding:10px;min-width:0;width:100%;background:white;color:inherit}textarea{min-height:76px}fieldset{border:1px solid #d9eae7;border-radius:10px}fieldset label{display:flex;align-items:center;font-weight:400}fieldset input{width:auto}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:0 16px}.scroll{overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px;border-bottom:1px solid #d9eae7;vertical-align:top}th{background:#f5faf9}.badge{display:inline-block;background:#e2faf1;border-radius:20px;padding:5px 10px;font-size:14px}small{display:block;margin-top:8px}a{color:#102f2c}#paper{white-space:pre-wrap;overflow-wrap:anywhere}#status{min-height:1.5em}@media print{header,nav,#intro,#clientbar,#workspace,#status{display:none!important}main{padding:0}#paper{display:block!important;border:0}}
header{background:white;color:#173b37;border-bottom:4px solid #2ca997;align-items:center}header span{color:#526863}.brand{display:flex;align-items:center;gap:20px}.brand img{width:100px;height:76px;object-fit:contain}.brand strong{border-left:1px solid #d9eae7;padding-left:20px}button.primary,button[aria-current=true]{background:#41e681;color:#102f2c;border-color:#2ca997}#paper img{display:block;width:100px;height:76px;object-fit:contain;margin-bottom:12px}#paper{border-top:4px solid #2ca997}@media print{#paper{border-top:4px solid #2ca997}}
header{padding-block:10px}nav{padding:6px 0}.dashboard,.editor-head{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}.stats{display:flex;flex-wrap:wrap;gap:8px}.stats span{background:#e2faf1;border-radius:10px;padding:12px}.stats strong{display:block;font-size:1.5rem}.doc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:12px}.doc-grid article{border:1px solid #d9eae7;border-radius:12px;padding:16px;display:flex;flex-direction:column;align-items:flex-start}.doc-grid h4{margin:12px 0 4px;font-size:1.15rem}.doc-grid p{margin:0 0 12px;flex:1}.reference{background:#f5faf9;padding:8px 12px;border-left:3px solid #2ca997}.model-table{margin:16px 0;padding:12px}.model-table textarea{min-width:105px;min-height:58px}.model-table button{margin:8px 8px 0 0}#activity-list{padding-left:20px}#activity-list li{margin:8px 0}#paper{max-width:850px;margin-inline:auto;white-space:normal;padding:32px;box-shadow:0 12px 35px #102f2c14}#paper h2{font-size:2rem;margin:12px 0;color:#102f2c}#paper h3{color:#18786c;margin-top:22px}#paper p,#paper td{white-space:pre-wrap}#paper th{background:#102f2c;color:white}#paper .pending{color:#8e4800}#paper .report-brand{border-bottom:2px solid #2ca997;margin-bottom:14px}@media print{@page{size:A4;margin:14mm}#paper{padding:0;box-shadow:none}#paper .scroll{overflow:visible}#paper th{color:#102f2c;background:#e2faf1}#paper h3{break-after:avoid}#paper tr{break-inside:avoid}}

.finding-card{margin:16px 0;padding:14px}.work-actions{margin-top:18px}.import-field{margin:12px 0}.import-field small{white-space:pre-wrap;overflow-wrap:anywhere}.import-source{white-space:pre-wrap;overflow:auto;max-height:350px;background:#f5faf9;padding:14px}</style>
<header><div class="brand"><img src="/brand/logo-viver-positiva.png" alt="Viver Segurança no Trabalho"><strong>Gestão documental</strong></div><a href="/clientes/processos">Voltar a Processos</a></header>
<main><div id="intro"><h1>Documentação de SST</h1><p>Organize as exigências por estabelecimento e prepare minutas a partir das suas avaliações de campo.</p></div>
<section id="clientbar"><div class="grid"><label>Estabelecimento ativo<select id="clients"></select></label><div class="actions" style="align-items:end;padding-bottom:12px"><button id="new" class="primary">Novo estabelecimento</button></div></div></section>
<nav aria-label="Áreas do app"><button data-tab="home">Painel</button><button data-tab="profile">Cadastro e atividades</button><button data-tab="matrix">Matriz de aplicabilidade</button><button data-tab="fieldwork">PGR do zero</button><button data-tab="attachments">Arquivos do cliente</button><button data-tab="docs">Documentos</button></nav>
<section id="workspace"></section><p id="status" role="status"></p><section id="paper" hidden></section>
</main>
<script>
const key=document.documentElement.dataset.storageKey;
const official='https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes';
const flags=['Eletricidade','Máquinas','Caldeiras e vasos de pressão','Inflamáveis','Construção','Trabalho rural','Serviços de saúde','Mineração','Abate e processamento de carnes','Espaço confinado','Trabalho em altura','Teleatendimento'];
const catalog=[
['PGR','NR-01'],['AEP','NR-17'],['AET','NR-17'],['Ordem de Serviço','NR-01'],['PCMSO, ASO e relatório analítico','NR-07'],['LTCAT e dados para PPP','Lei 8.213/1991, art. 58'],['Registros de EPI','NR-06'],['CIPA e registros','NR-05'],['Avaliações de exposição','NR-09'],['APR, POP, DDS e checklists','Conforme a atividade'],
...['Prontuário e procedimentos elétricos|NR-10','Procedimentos e registros de máquinas|NR-12','Prontuários e relatórios de inspeção|NR-13','Prontuário e plano de emergência|NR-20','PGR de obra|NR-18','PGRTR|NR-31','Documentação de serviços de saúde|NR-32','Documentação de mineração|NR-22','Documentação de abate e processamento|NR-36','PET e resgate|NR-33','Análise de risco e permissão de trabalho|NR-35','Registros de teleatendimento|NR-17 · Anexo II'].map((item,i)=>[...item.split('|'),flags[i]])
];
const forms={
'AEP':['Setor, função e atividade real','Método e evidências da avaliação','Exigências físicas, cognitivas e organizacionais','Participação dos trabalhadores','Fatores de risco identificados e avaliação','Medidas propostas e necessidade de aprofundamento'],
'AET':['Demanda e motivo do aprofundamento','Organização, processo e atividade real','Métodos, técnicas e evidências','Participação dos trabalhadores','Diagnóstico ergonômico','Recomendações e plano de intervenção','Restituição dos resultados, validação e revisão'],
'PGR':['Escopo, ambientes, processos e atividades','Critérios de avaliação e classificação','Inventário de riscos por grupo de exposição','Fatores ergonômicos e psicossociais relacionados ao trabalho','Medidas existentes e resultados de avaliações','Plano de ação com medidas, responsáveis e prazos','Acompanhamento e verificação da eficácia'],
'APR':['Atividade, local e equipe','Etapas da atividade','Perigos e consequências','Controles, responsáveis e condições de parada'],
'Ordem de Serviço':['Função e atribuições','Riscos ocupacionais','Medidas de prevenção e instruções','Procedimentos em caso de incidente e ciência'],
'POP':['Objetivo e abrangência','Responsabilidades','Materiais e condições de execução','Sequência, registros e resposta a desvios'],
'DDS':['Tema e público','Situação de trabalho','Orientações e participação'],
'Checklist':['Atividade ou equipamento','Itens de inspeção','Resultados e pendências','Responsáveis e prazos']
};
forms.PCMSO=['Objetivo e abrangência','Riscos do PGR e possíveis agravos','Critérios e condutas médicas','Vigilância da saúde e encaminhamentos','Planejamento do relatório analítico','Médico responsável e CRM'];
forms.LTCAT=['Tipo de laudo e finalidade','Ambientes, setores, funções e atividades','Fontes e vias de exposição e periodicidade','Metodologia, datas e evidências das avaliações','Descrição e eficácia das medidas de controle','Conclusão previdenciária fundamentada','Profissional habilitado, registro e responsabilidade técnica'];
const analytical='Relatório Analítico do PCMSO';
forms.APR.push('Número da APR, ordem de manutenção ou contrato','Empresa contratada, área, setor e equipamento','Programação, datas, horários e prorrogações','Objetivo e escopo do serviço','Máquinas, ferramentas, materiais e produtos','EPI, EPC e outros recursos de proteção','Critérios de probabilidade, severidade e classificação do risco','Permissões, procedimentos e condições de parada e reavaliação','Comunicação e recursos de emergência','Observações e pendências de encerramento');
forms.PGR.push('Introdução, objetivo e base legal','Responsabilidades','Identificação de perigos e avaliação de riscos','Análise de acidentes e doenças relacionadas ao trabalho','Capacitação e treinamento','Preparação para emergências','Implementação, conclusão e controle de revisões');
forms.AEP.push('Objetivo e base legal','Análise ergonômica preliminar por função','Considerações gerais e recomendações','Conclusão e necessidade de AET');
forms.PCMSO.push('Desenvolvimento e planejamento do PCMSO','Documentação, registros e ASO','Operacionalização e exames médicos ocupacionais','Exames complementares: justificativa e interpretação','Quadro de grupos homogêneos de exposição (GHE)','Cronograma e considerações finais');
forms.LTCAT.push('Introdução e fundamentação legal','Descrição do ambiente de trabalho','Setores, funções e atividades analisadas');
forms[analytical]=['Período de referência e data do relatório anterior','Médico responsável e CRM','Fundamentação legal','Funções e grupos abrangidos','Número de exames clínicos por tipo','Número e tipos de exames complementares','Resultados anormais por exame e unidade, setor ou função','Resultados agregados de aptidão','Incidência e prevalência de doenças relacionadas ao trabalho','Eventos e doenças informados em CAT','Comparação com o relatório anterior','Conclusão técnica','Recomendações e ações'];
catalog.push(['Registros de revisão e evidências','Conforme o documento']);
catalog.push([analytical,'NR-07 · 7.6.2']);
const titles={PGR:'Programa de Gerenciamento de Riscos',AEP:'Avaliação Ergonômica Preliminar',AET:'Análise Ergonômica do Trabalho',APR:'Análise Preliminar de Riscos',PCMSO:'Programa de Controle Médico de Saúde Ocupacional',LTCAT:'Laudo Técnico das Condições Ambientais do Trabalho',POP:'Procedimento Operacional Padrão',DDS:'Diálogo Diário de Segurança',Checklist:'Checklist de inspeção'};
titles[analytical]=analytical;
const reportTables={
 PGR:[['Inventário de riscos',['Setor / atividade','Perigo e fonte','Expostos / exposição','Agravos e controles','Classificação / prioridade']],['Plano de ação',['Medida','Responsável','Prazo','Acompanhamento e eficácia']]],
 AEP:[['Avaliação por situação de trabalho',['Setor / atividade','Fatores de risco','Evidência e avaliação','Medidas e encaminhamento']]],
 AET:[['Plano de intervenção',['Achado','Recomendação','Responsável e prazo','Validação / acompanhamento']]],
 APR:[
  ['Análise por etapa',['Etapa','Perigo','Consequência','Controles / risco residual','Probabilidade','Severidade','Nível inicial','Nº da PT, se aplicável']],
  ['Checklist de planejamento e liberação',['Item a verificar','Conforme / não conforme / não aplicável','Observação ou providência']],
  ['Elaboração, revisão e aprovação',['Papel','Nome / empresa','Data','Assinatura']],
  ['Ciência da equipe executante',['Nome','Empresa / função','Registro','Assinatura']],
  ['Liberação, revisão diária e mudança de cenário',['Data e horário','Mudança identificada','Providência','Responsável pela liberação']],
  ['Encerramento e plano de ação',['Pendência ou risco residual','Ação','Responsável','Prazo / situação']]
 ],
 'Ordem de Serviço':[['Ciência',['Trabalhador ou função','Data','Assinatura']]],
 POP:[['Instruções de execução',['Etapa','Procedimento','Controle / registro']]],
 DDS:[['Registro de participação',['Nome','Função','Assinatura']]],
 Checklist:[['Itens de inspeção',['Item / critério','Situação','Evidência','Ação e prazo']]],
 PCMSO:[['Planejamento médico',['Grupo / função','Risco ocupacional','Exame / periodicidade','Critérios e condutas']]],
 [analytical]:[['Consolidação de exames',['Exame','Unidade, setor ou função','Realizados','Resultados anormais']],['Comparação e encaminhamentos',['Indicador','Período anterior','Período atual','Análise e ação']]],
 LTCAT:[['Avaliações ambientais',['Setor / função','Agente / fonte','Método e resultado','Controles','Evidência']]],
};
const references={
 PGR:['NR-01 · Capítulo 1.5 — GRO','https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/manuais-e-publicacoes/2026/manual_gro_pgr_da_nr_1.pdf'],
 AEP:['NR-17 · Item 17.3 / Manual do GRO','https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/manuais-e-publicacoes/2026/manual_gro_pgr_da_nr_1.pdf'],
 AET:['NR-17 · Itens 17.3.2 e 17.3.3','https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-17-nr-17'],
 [analytical]:['NR-07 · Item 7.6.2','https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-07-atualizada-2022.pdf'],
 PCMSO:['NR-07 · Planejamento e documentação','https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-7-nr-7'],
 LTCAT:['IN PRES/INSS nº 128/2022 · Art. 276','https://portalin.inss.gov.br/in/214'],
 APR:['Modelo de APR · HU-UFGD/Ebserh','https://www.gov.br/hubrasil/pt-br/hospitais-universitarios/regiao-centro-oeste/hu-ufgd/governanca/administracao/AnexoResoluo37MANUALDEPROCEDIMENTOSDESEGURANADOTRABALHOPARAEMPRESASPRESTADORASDESERVIOS.pdf'],
 'Ordem de Serviço':['NR-01 · Deveres do empregador',official],
 POP:['Estrutura de POP · HULW/Ebserh','https://www.gov.br/hubrasil/pt-br/hospitais-universitarios/regiao-nordeste/hulw-ufpb/acesso-a-informacao/gestao-documental/nova-gestao-documental-2024/sege-setor-de-gestao-do-ensino/stgq-setor-de-gestao-da-qualidade/ugqsp-unidade-de-gestao-da-qualidade-e-seguranca-do-paciente/pop-procedimento-operacional-padrao/pop-ugqsp-011-elaboracao-de-procedimento-operacional-padrao.pdf'],
 DDS:['Modelo de DDS · DNIT','https://www.gov.br/dnit/pt-br/central-de-conteudos/atos-normativos/tipo/instrucao-normativa/2025/in-3-2025-dir-site.pdf'],
 Checklist:['Formulário de inspeção · HU-UFGD/Ebserh','https://www.gov.br/hubrasil/pt-br/hospitais-universitarios/regiao-centro-oeste/hu-ufgd/acesso-a-informacao/pops-protocolos-e-processos/gad/pop-usost-003-inspecoes-de-seguranca-do-trabalho-v-2.pdf']
};

const get=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let records=[];
try{records=JSON.parse(localStorage.getItem(key)||'[]')}catch{}
let active=records[0]?.id,tab=active?'home':'profile',docType='AEP';
const current=()=>records.find(c=>c.id===active);
function save(){try{localStorage.setItem(key,JSON.stringify(records));return true}catch{return false}}
function message(value){get('status').textContent=value}
function render(){
 const client=current();
 get('clients').innerHTML='<option value="">Selecione um estabelecimento</option>'+records.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.name)+'</option>').join('');
 get('clients').value=active||'';
 document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.tab===tab)));
 get('paper').hidden=true;
 if(tab==='home'){dashboard(client);return}
 if(tab==='profile'){profile(client);return}
 if(!client){get('workspace').innerHTML='<h2>Estabelecimento necessário</h2><p>Cadastre ou selecione um estabelecimento para continuar.</p>';return}
 if(tab==='matrix'){matrix(client);return}
 if(tab==='fieldwork'){fieldwork(client);return}
 if(tab==='attachments'){attachments(client);return}
 editor(client);
}
function profile(client){
 const fields=[['name','Empresa / estabelecimento'],['cnpj','CNPJ'],['cnae','CNAE'],['address','Endereço'],['workers','Total de empregados']];
 get('workspace').innerHTML='<h2>Cadastro do estabelecimento</h2><form id="profile"><div class="grid">'+fields.map(([name,label])=>'<label>'+label+'<input name="'+name+'" value="'+esc(client?.[name])+'" '+(name==='name'?'required':'')+(name==='workers'?' type="number" min="0"':'')+'></label>').join('')+'</div><fieldset><legend>Atividades e condições identificadas</legend><div class="grid">'+flags.map(flag=>'<label><input type="checkbox" name="flag" value="'+esc(flag)+'" '+(client?.flags.includes(flag)?'checked':'')+'>'+esc(flag)+'</label>').join('')+'</div></fieldset><fieldset><legend>Atividades personalizadas</legend><div class="grid"><label>Nome da atividade<input id="activity-name" placeholder="Ex.: Corte e preparo de carnes"></label><label>Setor<input id="activity-sector" placeholder="Ex.: Produção"></label></div><button type="button" id="add-activity">Adicionar atividade</button><ul id="activity-list"></ul></fieldset><p>Use dados fictícios para testar. Os cadastros ficam neste navegador.</p><button class="primary">Salvar cadastro</button></form>';
 let activities=[...(client?.activities||[])];
 function activityList(){
  get('activity-list').innerHTML=activities.map((item,i)=>'<li>'+esc(item.name)+(item.sector?' · '+esc(item.sector):'')+' <button type="button" data-remove-activity="'+i+'">Remover</button></li>').join('')||'<li>Nenhuma atividade personalizada cadastrada.</li>';
  get('activity-list').querySelectorAll('button').forEach(button=>button.onclick=()=>{activities.splice(Number(button.dataset.removeActivity),1);activityList()});
 }
 function addActivity(){
  const name=get('activity-name').value.trim(),sector=get('activity-sector').value.trim();
  if(!name){message('Informe o nome da atividade.');get('activity-name').focus();return false}
  if(activities.some(item=>item.name.toLocaleLowerCase()===name.toLocaleLowerCase()&&item.sector.toLocaleLowerCase()===sector.toLocaleLowerCase())){message('Essa atividade já foi cadastrada para o setor.');return false}
  activities.push({name,sector});get('activity-name').value='';get('activity-sector').value='';activityList();message('Atividade adicionada. Salve o cadastro para concluir.');return true;
 }
 get('add-activity').onclick=addActivity;
 activityList();
 get('profile').onsubmit=event=>{
  event.preventDefault();
  if(get('activity-name').value.trim()&&!addActivity())return;
  const data=new FormData(event.target);
  if(!data.get('name').trim()){message('Informe o nome do estabelecimento.');return}
  const record={...client,...Object.fromEntries(fields.map(([name])=>[name,data.get(name).trim()])),id:client?.id||crypto.randomUUID(),flags:data.getAll('flag'),activities,docs:client?.docs||{},checks:client?.checks||{}};
  records=client?records.map(c=>c.id===active?record:c):[...records,record];
  active=record.id;tab='home';render();message(save()?'Cadastro salvo.':'O navegador impediu o salvamento.');
 };
}
function matrix(client){
 get('workspace').innerHTML='<h2>Matriz de aplicabilidade</h2><p>Triagem inicial para <strong>'+esc(client.name)+'</strong>. Confirme os requisitos e as exceções antes da emissão. <a href="'+official+'" target="_blank" rel="noopener">Consultar NRs oficiais</a></p><div class="scroll"><table><thead><tr><th>Documento ou registro</th><th>Referência</th><th>Triagem</th><th>Validação técnica</th></tr></thead><tbody>'+catalog.map(([name,ref,flag],i)=>'<tr><td>'+esc(name)+'</td><td>'+esc(ref)+'</td><td><span class="badge">'+(flag?(client.flags.includes(flag)?'Atividade identificada':'Atividade a confirmar'):'Verificar enquadramento')+'</span></td><td><select aria-label="Validação de '+esc(name)+'" data-check="'+i+'">'+['A validar','Aplicável','Não aplicável'].map(s=>'<option '+(client.checks[i]===s?'selected':'')+'>'+s+'</option>').join('')+'</select></td></tr>').join('')+'</tbody></table></div>';
 document.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{client.checks[el.dataset.check]=el.value;message(save()?'Validação registrada.':'O navegador impediu o salvamento.')});
}
const visitChecklist=[
 'Relação de setores, funções, turnos e trabalhadores por atividade',
 'Descrição dos processos, máquinas, equipamentos e produtos químicos',
 'Registros de acidentes, incidentes e avaliações ambientais disponíveis',
 'Controles existentes, manutenção e registros de capacitação',
 'Observação das tarefas reais e escuta dos trabalhadores',
 'Organização, ritmo, pausas, exigências físicas e fatores psicossociais do trabalho'
];
const findingFields=[
 ['activity','Setor / atividade'],['group','Funções ou grupo exposto'],
 ['hazard','Perigo ou fator de risco'],['source','Fonte ou circunstância'],
 ['exposure','Caracterização da exposição'],['harm','Possíveis lesões ou agravos'],
 ['controls','Medidas existentes'],['evidence','Evidências e avaliações realizadas'],
 ['level','Classificação e prioridade'],['measure','Medida proposta'],
 ['owner','Responsável pela ação'],['deadline','Prazo','date'],['followup','Acompanhamento e eficácia']
];
const initialWork=()=>({step:0,profile:{},checklist:[],findings:[]});
const asText=(...parts)=>parts.filter(Boolean).join('\\n');
function fieldwork(client){
 const work=client.fieldwork||initialWork();
 const step=work.step;
 const headings=['Enquadramento','Preparar a visita','Levantamento de campo','Revisão técnica'];
 const inputs=[
  [['applicability','Enquadramento do PGR'],['basis','Fundamento, exceções e requisitos setoriais'],['criteria','Critérios de avaliação e classificação dos riscos']],
  [['visit','Data prevista da visita','date'],['contact','Contato e acompanhamento em campo'],['requests','Documentos a solicitar e roteiro complementar']],
  [['conditions','Descrição dos ambientes, processos e atividades'],['workers','Participação dos trabalhadores e organização do trabalho'],['methods','Métodos, evidências e limitações da avaliação']],
  []
 ][step];
 const field=([name,label,type])=>'<label>'+esc(label)+(type?'<input type="'+type+'" name="'+name+'" value="'+esc(work.profile[name])+'">':'<textarea name="'+name+'">'+esc(work.profile[name])+'</textarea>')+'</label>';
 const ready=work.findings.filter(f=>f.reviewed&&f.activity&&f.hazard&&f.group);
 get('workspace').innerHTML='<h2>Elaborar PGR do zero</h2><p>'+esc(client.name)+' · '+esc(headings[step])+'</p><nav aria-label="Etapas do levantamento">'+headings.map((title,i)=>'<button type="button" data-step="'+i+'" aria-current="'+(i===step)+'">'+esc(title)+'</button>').join('')+'</nav><form id="fieldwork">'+inputs.map(field).join('')+
 (step===1?'<fieldset><legend>Roteiro básico de visita</legend>'+visitChecklist.map((item,i)=>'<label><input type="checkbox" name="check" value="'+i+'" '+(work.checklist.includes(String(i))?'checked':'')+'>'+esc(item)+'</label>').join('')+'<button type="button" id="print-visit">Imprimir roteiro / PDF</button></fieldset>':'')+
 (step===2?'<p>Registre os achados por tarefa. Confirme os dados de cada registro antes de aproveitar na minuta.</p><div id="findings"></div><button type="button" id="add-finding">Adicionar achado</button>':'')+
 (step===3?'<p><strong>'+ready.length+'</strong> de '+work.findings.length+' achados com dados conferidos e identificação mínima.</p><p>Confira o enquadramento e os critérios de avaliação. Registros com informações em aberto devem ser complementados na minuta. Os campos de classificação e de medidas dependem da avaliação profissional.</p><div class="actions"><button type="button" data-generate="PGR">Abrir minuta de PGR</button><button type="button" data-generate="AEP">Abrir minuta de AEP</button></div>':'')+
 '<div class="actions work-actions"><button class="primary">Salvar etapa</button>'+(step<3?'<button type="button" id="next-step">Salvar e continuar</button>':'')+'</div></form>';
 const form=get('fieldwork');
 function findingCard(finding={}){
  const card=document.createElement('fieldset');
  card.className='finding-card';
  card.innerHTML='<legend>Achado de campo</legend><div class="grid">'+findingFields.map(([name,label,type])=>'<label>'+label+'<input data-field="'+name+'" '+(type?'type="'+type+'"':'')+(name==='activity'?' list="visit-activities"':'')+' value="'+esc(finding[name])+'"></label>').join('')+'</div><label>Tipo de achado<select data-field="kind">'+['Geral','Ergonômico','Psicossocial'].map(item=>'<option '+(finding.kind===item?'selected':'')+'>'+item+'</option>').join('')+'</select></label><label><input type="checkbox" data-reviewed '+(finding.reviewed?'checked':'')+'> Dados deste achado conferidos</label><button type="button">Remover achado</button>';
  card.querySelectorAll('[data-field]').forEach(input=>input.addEventListener('input',()=>{card.querySelector('[data-reviewed]').checked=false}));
  card.querySelector('button').onclick=()=>card.remove();
  get('findings').append(card);
 }
 if(step===2){
  const list=document.createElement('datalist');list.id='visit-activities';
  (client.activities||[]).forEach(item=>{const option=document.createElement('option');option.value=item.sector?item.sector+' / '+item.name:item.name;list.append(option)});
  get('findings').append(list);
  work.findings.forEach(findingCard);
  get('add-finding').onclick=()=>findingCard();
 }
 function persist(next=step){
  const data=new FormData(form);
  inputs.forEach(([name])=>{work.profile[name]=data.get(name).trim()});
  if(step===1) work.checklist=data.getAll('check');
  if(step===2) work.findings=[...form.querySelectorAll('.finding-card')].map(card=>({
   ...Object.fromEntries([...card.querySelectorAll('[data-field]')].map(el=>[el.dataset.field,el.value.trim()])),
   reviewed:card.querySelector('[data-reviewed]').checked
  })).filter(item=>findingFields.some(([name])=>item[name]));
  work.step=next;client.fieldwork=work;
  message(save()?'Levantamento salvo neste navegador.':'O navegador impediu o salvamento.');
 }
 form.onsubmit=event=>{event.preventDefault();persist()};
 get('workspace').querySelectorAll('[data-step]').forEach(button=>button.onclick=()=>{persist(Number(button.dataset.step));render()});
 if(get('next-step'))get('next-step').onclick=()=>{persist(step+1);render()};
 if(get('print-visit'))get('print-visit').onclick=async()=>{
  persist();
  const paper=get('paper');
  paper.innerHTML='<div class="report-brand"><img src="/brand/logo-viver-positiva.png" alt="Viver SST"></div><h2>Roteiro de visita técnica</h2><p>'+esc(client.name)+' · '+esc(work.profile.visit||'Data a definir')+'</p><p>'+esc(work.profile.contact)+'</p><ul>'+visitChecklist.map((item,i)=>'<li>'+ (work.checklist.includes(String(i))?'☑ ':'☐ ')+esc(item)+'</li>').join('')+'</ul><p>'+esc(work.profile.requests)+'</p>';
  paper.hidden=false;await paper.querySelector('img').decode().catch(()=>{});window.print();
 };
 get('workspace').querySelectorAll('[data-generate]').forEach(button=>button.onclick=()=>{persist();docType=button.dataset.generate;tab='docs';render()});
}
function fieldworkReport(work,type){
 const rows=work.findings.filter(f=>f.reviewed&&f.activity&&f.hazard&&f.group);
 const p=work.profile;
 if(type==='AEP'){
  const ergonomic=rows.filter(f=>f.kind==='Ergonômico'||f.kind==='Psicossocial');
  return {
   fields:{f0:p.conditions,f1:p.methods,f3:p.workers},
   tables:[ergonomic.map(f=>[f.activity,asText(f.hazard,f.source),asText(f.group,f.exposure,f.evidence,f.level),asText(f.controls,f.measure)])]
  };
 }
 return {
  fields:{f0:p.conditions,f1:p.criteria},
  tables:[
   rows.map(f=>[f.activity,asText(f.hazard,f.source),asText(f.group,f.exposure,f.evidence),asText(f.harm,f.controls),f.level]),
   rows.filter(f=>f.measure).map(f=>[f.activity+' — '+f.measure,f.owner,f.deadline,f.followup])
  ]
 };
}

const importTypes=['PGR','PCMSO',analytical,'LTCAT','AEP','AET','APR','Ordem de Serviço','POP','DDS','Checklist'];
const sectionAliases={
 PGR:[['escopo','caracterização dos processos','caracterização dos ambientes'],['metodologia','critérios de avaliação'],['inventário de riscos','inventário de riscos ocupacionais'],['fatores psicossociais','riscos ergonômicos e psicossociais'],['medidas de controle','medidas existentes'],['plano de ação','cronograma de ações'],['monitoramento','avaliação da eficácia']],
 AEP:[['caracterização da atividade','descrição da atividade'],['metodologia'],['exigências da atividade','organização do trabalho'],['participação dos trabalhadores'],['avaliação dos riscos','fatores de risco'],['recomendações','medidas propostas']],
 AET:[['análise da demanda','demanda'],['análise da atividade','organização do trabalho'],['metodologia'],['participação dos trabalhadores'],['diagnóstico'],['recomendações','plano de intervenção'],['restituição dos resultados','validação']],
 PCMSO:[['objetivo','abrangência'],['riscos ocupacionais'],['condutas médicas','critérios e condutas'],['vigilância da saúde'],['relatório analítico'],['médico responsável']],
 LTCAT:[['finalidade','objetivo'],['descrição das atividades','ambientes e funções'],['fontes de exposição','periodicidade da exposição'],['metodologia','avaliações ambientais'],['medidas de controle'],['conclusão'],['responsável técnico']],
 APR:[['atividade','local e equipe'],['etapas','etapas da atividade'],['perigos e consequências','perigos'],['medidas de controle','controles']],
 'Ordem de Serviço':[['atribuições','função'],['riscos ocupacionais'],['medidas de prevenção','orientações de segurança'],['procedimentos em caso de acidente','ciência']],
 POP:[['objetivo','abrangência'],['responsabilidades'],['materiais','recursos necessários'],['procedimento','etapas','registros']],
 DDS:[['tema'],['situação de trabalho'],['orientações']],
 Checklist:[['atividade','equipamento'],['itens de inspeção'],['resultados','pendências'],['responsáveis e prazos']]
};
sectionAliases.APR.push(['número da apr','om / contrato nº'],['área e setor','local de trabalho'],['programação do trabalho','horário de trabalho'],['objetivo','descrição da atividade'],['recursos materiais necessários','equipamentos a serem usados'],['equipamento de proteção individual','equipamentos de proteção coletiva necessários'],['matriz para análise de risco'],['normas de segurança principais','liberação diária'],['comunicação de emergência'],['avaliação de serviço concluído','plano de ação']);
sectionAliases.PGR[0].push('descrição geral das atividades');
sectionAliases.PGR[1].push('definições e critérios para avaliação de riscos','matriz de risco – critérios utilizados');
sectionAliases.PGR[2].push('ambientes, cargos e inventário de riscos ocupacionais','tabela técnica – inventário de riscos');
sectionAliases.PGR[4].push('medidas de prevenção');
sectionAliases.PGR[5].push('planos de ação','plano de ação detalhado');
sectionAliases.PGR.push(['introdução','fundamentação legal'],['responsabilidades'],['processo de identificação de perigos e avaliações de riscos ocupacionais','processo de identificação dos perigos e avaliações dos riscos'],['análise de acidentes e doenças relacionadas ao trabalho'],['capacitação e treinamento em segurança e saúde no trabalho'],['preparação para emergências'],['garantia de implementação do programa de gerenciamento de risco','considerações finais','conclusão','índice de revisões','encerramento']);
sectionAliases.AEP.push(['objetivo da aep','base legal'],['análise ergonômica preliminar por função','análise ergonômica por função'],['considerações gerais e recomendações adicionais'],['conclusão e necessidade de aet']);
sectionAliases.PCMSO[4].push('sobre o relatório analítico');
sectionAliases.PCMSO[1].push('reconhecimento dos riscos e exames ocupacionais','riscos ocupacionais e seus possíveis agravos à saúde x exames complementares');
sectionAliases.PCMSO.push(['desenvolvimento do pcmso','planejamento'],['documentação','aso – atestado de saúde ocupacional'],['operacionalização','exames médicos ocupacionais'],['exames complementares','exames complementares: justificativa e interpretação'],['quadro de ghe (grupo homogêneo de exposição)'],['cronograma de ação','considerações finais']);
sectionAliases.LTCAT[3].push('metodologia utilizada');
sectionAliases.LTCAT[5].push('conclusão técnica');
sectionAliases.LTCAT[6].push('responsabilidade técnica');
sectionAliases.LTCAT.push(['introdução','fundamentação legal'],['descrição do ambiente de trabalho'],['setores, funções e atividades analisadas']);
sectionAliases[analytical]=[['período de referência','período analisado'],['médico responsável pelo pcmso'],['fundamentação legal'],['funções previstas no pcmso'],['tipos de exames realizados no período'],['exames complementares registrados'],['resultados anormais'],['resultados de aptidão'],['análise epidemiológica'],['cat','comunicação de acidente de trabalho'],['comparação com o relatório anterior'],['conclusão técnica'],['recomendações']];
const normalizeHeading=value=>value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/^\\s*\\d+(?:\\.\\d+)*[.)]?\\s*[-–:]?\\s*/,'').trim();
let pdfEngine;
async function verifiedModule(file,expected){
 const response=await fetch('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/'+file);
 if(!response.ok)throw new Error('Leitor de PDF indisponível.');
 const bytes=await response.arrayBuffer();
 const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');
 if(hash!==expected)throw new Error('Não foi possível verificar a integridade do leitor de PDF.');
 return URL.createObjectURL(new Blob([bytes],{type:'text/javascript'}));
}
let ocrLibrary;
function loadOcr(){
 if(!ocrLibrary)ocrLibrary=new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/tesseract.min.js';
  script.integrity='sha256-EP/3hIQGd1nEMCigKnLXbQuQ6xcwK7I7WKnsVBC8kos=';
  script.crossOrigin='anonymous';
  script.onload=()=>{
   if(window.Tesseract?.createWorker)resolve(window.Tesseract);
   else reject(new Error('O leitor OCR não pôde ser iniciado.'));
  };
  script.onerror=()=>{script.remove();reject(new Error('O leitor OCR está indisponível. Confira a conexão e tente novamente.'))};
  document.head.append(script);
 }).catch(error=>{ocrLibrary=null;throw error});
 return ocrLibrary;
}
async function createPortugueseOcr(){
 const engine=await loadOcr();
     return engine.createWorker('por',1,{
      workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
      corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0',
      langPath:'https://cdn.jsdelivr.net/npm/@tesseract.js-data/por@1.0.0/4.0.0_best_int'
     });
}
async function recognizePage(page,worker){
 const initial=page.getViewport({scale:1});
 const scale=Math.min(2.4,Math.sqrt(5500000/(initial.width*initial.height)));
 const viewport=page.getViewport({scale});
 const canvas=document.createElement('canvas');
 canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
 try{
  await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
  const result=await worker.recognize(canvas);
  return result.data.text||'';
 }finally{canvas.width=0;canvas.height=0}
}
async function readPdf(blob,onProgress){
 if(!pdfEngine)pdfEngine=(async()=>{
  const [moduleUrl,workerUrl]=await Promise.all([verifiedModule('pdf.min.mjs','27fc2a057a00f92a4334ad06e17dbd7259912954e9fb7f76400bcca5fd190a9c'),verifiedModule('pdf.worker.min.mjs','1baa1844c89c80a5b2797c916e75ab29254be46d8e9cb53cb6364d7aad84be36')]);
  const engine=await import(moduleUrl);
  engine.GlobalWorkerOptions.workerSrc=workerUrl;
  return engine;
 })().catch(error=>{pdfEngine=null;throw error});
 const engine=await pdfEngine;
 const task=engine.getDocument({data:new Uint8Array(await blob.arrayBuffer()),isEvalSupported:false});
 let worker=null;
 let stage="PDF";
 try{
  const pdf=await task.promise,pages=[];
  for(let i=1;i<=pdf.numPages;i++){
   const page=await pdf.getPage(i),{items}=await page.getTextContent();
   let text='',lastY=null;
   for(const item of items){
    if(typeof item.str!=='string')continue;
    const y=item.transform[5];
    if(lastY!==null&&Math.abs(y-lastY)>3&&!text.endsWith('\\n'))text+='\\n';
    text+=item.str+(item.hasEOL?'\\n':' ');lastY=y;
   }
   if(text.replace(/[^\\p{L}\\p{N}]/gu,'').length<35){
    stage='OCR';
    onProgress?.('Reconhecendo texto na página '+i+' de '+pdf.numPages+'…');
    if(!worker){
     worker=await createPortugueseOcr();
    }
    const recognized=await recognizePage(page,worker);
    if(recognized.trim().length>text.trim().length){
     pages.push({label:'Página '+i+' · OCR',text:recognized});
     continue;
    }
   }
   pages.push({label:'Página '+i,text});
  }
  return pages;
 }catch(error){
  if(stage==='OCR')throw new Error('Falha no reconhecimento de texto do PDF. Confira a conexão e tente novamente.');
  throw error;
 }finally{
  if(worker)await worker.terminate().catch(()=>{});
  await task.destroy();
 }
}
async function readDocx(blob){
 const bytes=new Uint8Array(await blob.arrayBuffer()),zip=new DataView(bytes.buffer);
 let end=bytes.length-22;
 while(end>=Math.max(0,bytes.length-65557)&&zip.getUint32(end,true)!==0x06054b50)end--;
 if(end<0||end<Math.max(0,bytes.length-65557))throw new Error('Arquivo Word inválido.');
 let pos=zip.getUint32(end+16,true);
 const decoder=new TextDecoder();
 for(let i=0;i<zip.getUint16(end+10,true);i++){
  if(zip.getUint32(pos,true)!==0x02014b50)break;
  const nameLength=zip.getUint16(pos+28,true);
  if(decoder.decode(bytes.subarray(pos+46,pos+46+nameLength))==='word/document.xml'){
   const size=zip.getUint32(pos+20,true),local=zip.getUint32(pos+42,true),method=zip.getUint16(pos+10,true);
   if(zip.getUint32(pos+24,true)>30*1024*1024)throw new Error('O conteúdo do Word excede o limite de leitura.');
   const start=local+30+zip.getUint16(local+26,true)+zip.getUint16(local+28,true);
   const part=bytes.slice(start,start+size);
   if(method!==0&&method!==8)throw new Error('Compactação do Word incompatível.');
   const xml=method===0?decoder.decode(part):await new Response(new Blob([part]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
   const doc=new DOMParser().parseFromString(xml,'application/xml');
   const ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main';
   return [{label:'Documento Word',text:[...doc.getElementsByTagNameNS(ns,'p')].map(p=>[...p.getElementsByTagNameNS(ns,'t')].map(t=>t.textContent).join('')).join('\\n')}];
  }
  pos+=46+nameLength+zip.getUint16(pos+30,true)+zip.getUint16(pos+32,true);
 }
 throw new Error('O arquivo Word não contém texto legível.');
}
const canReadAttachment=item=>/\\.(pdf|docx|txt|csv|jpe?g|png)$/i.test(item.name);
async function readAttachment(item,onProgress){
 if(/\\.(jpe?g|png)$/i.test(item.name)){
  onProgress?.('Reconhecendo texto na imagem…');
  const worker=await createPortugueseOcr();
  try{
   const result=await worker.recognize(item.blob);
   return [{label:'Imagem · OCR',text:result.data.text||''}];
  }finally{await worker.terminate().catch(()=>{})}
 }
 if(/\\.pdf$/i.test(item.name))return readPdf(item.blob,onProgress);
 if(/\\.docx$/i.test(item.name))return readDocx(item.blob);
 return [{label:'Arquivo de texto',text:await item.blob.text()}];
}
function documentSuggestions(pages,type){
 const output={};
 const aliases=(sectionAliases[type]||[]).flatMap((names,i)=>[forms[type][i],...names].map(name=>[normalizeHeading(name),i]));
 let current=null;
 for(const {text,label} of pages){
  for(const line of text.split(/\\r?\\n/).map(s=>s.trim()).filter(Boolean)){
   if(/\\.{3,}\\s*\\d*\\s*$/.test(line))continue;
   if(/^(sumario|identificacao da empresa|trabalhadores avaliados)(?:$|\\s|:)/.test(normalizeHeading(line))){current=null;continue}
   const id=line.match(/^(razão social|empresa|estabelecimento|cnpj|cnae(?: principal)?|endereço|(?:total|número) de (?:empregados|trabalhadores))\\s*[:–]\\s*(.+)$/i);
   if(id){
    const field=normalizeHeading(id[1]),key=field==='cnpj'?'cnpj':field.startsWith('cnae')?'cnae':field==='endereco'?'address':/^(total|numero)/.test(field)?'workers':'name';
    const value=key==='workers'?id[2].match(/^\\d+(?=\\s|$)/)?.[0]:id[2].trim();
    if(value&&!output[key])output[key]={value,source:label};
    continue;
   }
   const heading=normalizeHeading(line).replace(/:$/,'').trim();
   const parts=line.match(/^([^:]{1,150}):\\s*(.*)$/);
   const hit=aliases.find(([name])=>name===heading)||(parts&&aliases.find(([name])=>name===normalizeHeading(parts[1])));
   if(hit){
    current='f'+hit[1];
    if(!output[current])output[current]={value:'',source:label};
    if(!output[current].source.includes(label))output[current].source+='; '+label;
    if(parts?.[2]&&heading!==hit[0])output[current].value+=(output[current].value?'\\n':'')+parts[2];
   }else if(current&&output[current].value.length<16000){
    if(!output[current].source.includes(label))output[current].source+='; '+label;
    output[current].value+=(output[current].value?'\\n':'')+line;
   }
  }
 }
 return output;
}
function reviewImport(client,item,pages,panel,onApplied){
 const analyticalTitle=/relat[oó]rio[\\s_-]+(?:anual[\\s_-]+)?anal[ií]tico/i;
 const suggestedType=analyticalTitle.test(item.name)||pages.some(page=>analyticalTitle.test(page.text))&&item.category==='Outros'?analytical:item.category;
 const excerpt=pages.map(page=>'['+page.label+']\\n'+page.text).join('\\n\\n');
 panel.innerHTML='<h3>Conferir dados de '+esc(item.name)+'</h3><label>Documento de destino<select id="import-type">'+importTypes.map(type=>'<option '+(type===suggestedType?'selected':'')+'>'+esc(type)+'</option>').join('')+'</select></label><details><summary>Consultar texto extraído</summary><pre class="import-source">'+esc(excerpt)+'</pre></details><div id="import-fields"></div>';
 if(pages.some(page=>page.label.endsWith('OCR'))){
  const notice=document.createElement('p');notice.textContent='Este PDF foi lido por OCR. Confira nomes, valores e a separação dos campos com o original.';panel.querySelector('details').before(notice);
 }
 const selector=panel.querySelector('#import-type'),fields=panel.querySelector('#import-fields');
 function show(){
  const type=selector.value,hints=documentSuggestions(pages,type);
  const digits=value=>String(value||'').replace(/\\D/g,'');
  const differentCompany=digits(client.cnpj).length===14&&digits(hints.cnpj?.value).length===14&&digits(client.cnpj)!==digits(hints.cnpj.value);
  const definitions=[['name','Empresa / estabelecimento'],['cnpj','CNPJ'],['cnae','CNAE'],['address','Endereço'],['workers','Total de empregados'],...forms[type].map((label,i)=>['f'+i,label])];
  fields.innerHTML=(differentCompany?'<p role="alert">O CNPJ identificado no arquivo diverge do cadastro. Confira o estabelecimento antes de aplicar qualquer campo.</p>':'')+'<p>Confira as sugestões e marque os campos que deseja aplicar. Você também pode colar trechos do texto extraído nos campos de destino.</p>'+definitions.map(([name,label])=>{
   const hint=hints[name],old=name.startsWith('f')?client.docs[type]?.[name]:client[name];
   return '<fieldset class="import-field" data-destination="'+name+'"><legend>'+esc(label)+'</legend><label><input type="checkbox" '+(hint?.value&&!old&&!differentCompany?'checked':'')+'>Aplicar neste campo</label>'+(old?'<small>Preenchimento atual: '+esc(old)+'</small>':'')+(hint?.value?'<small>Origem da sugestão: '+esc(hint.source)+'</small>':'')+'<textarea aria-label="'+esc(label)+'">'+esc(hint?.value)+'</textarea></fieldset>';
  }).join('')+'<button type="button" class="primary">Aplicar campos selecionados</button>';
  fields.querySelector('button').onclick=()=>{
   const selected=[...fields.querySelectorAll('[data-destination]')].filter(el=>el.querySelector('input').checked&&el.querySelector('textarea').value.trim());
   if(!selected.length){message('Selecione pelo menos um campo preenchido.');return}
   const doc={...client.docs[type]};
   const recordsForReview={...client};
   for(const el of selected){
    const name=el.dataset.destination,value=el.querySelector('textarea').value.trim();
    if(name.startsWith('f'))doc[name]=value;
    else recordsForReview[name]=value;
   }
   if(recordsForReview.workers&&!/^\\d+$/.test(recordsForReview.workers)){message('Informe um número inteiro no campo Total de empregados.');return}
   recordsForReview.docs={...client.docs,[type]:doc};
   const previous=records;
   records=records.map(record=>record.id===client.id?recordsForReview:record);
   if(!save()){records=previous;message('O navegador impediu o salvamento.');return}
   if(onApplied){onApplied(recordsForReview,selected.length);return}
   docType=type;tab='docs';render();
   message(selected.length+' campo(s) aplicado(s). Confira a minuta antes de emitir.');
  };
 }
 selector.onchange=show;show();panel.scrollIntoView();
}

const attachmentCategories=['PGR','PCMSO',analytical,'LTCAT','AEP','AET','APR','Ordem de Serviço','POP','DDS','Checklist','Laudo ou avaliação ambiental','Outros'];
const attachmentExtensions=/\\.(pdf|docx?|xlsx?|csv|txt|jpe?g|png)$/i;
function openAttachmentStore(){
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open(key+'-arquivos',1);
  request.onupgradeneeded=()=>{
   request.result.createObjectStore('attachments',{keyPath:'id'}).createIndex('client','client');
  };
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error);
  request.onblocked=()=>reject(new Error('Armazenamento bloqueado'));
 });
}
async function attachmentTransaction(mode,operation){
 const db=await openAttachmentStore();
 try{
  return await new Promise((resolve,reject)=>{
   const txn=db.transaction('attachments',mode);
   const result=operation(txn.objectStore('attachments'));
   txn.oncomplete=()=>resolve(result?.result);
   txn.onabort=()=>reject(txn.error||new Error('Operação interrompida'));
  });
 }finally{db.close()}
}
function attachments(client){
 get('workspace').innerHTML='<h2>Arquivos do cliente</h2><p>'+esc(client.name)+'</p><p>Anexe PGRs anteriores, laudos, planilhas e evidências. Os arquivos ficam neste navegador, vinculados à conta e ao estabelecimento.</p><form id="attachment-form"><div class="grid"><label>Tipo de documento<select name="category">'+attachmentCategories.map(name=>'<option>'+esc(name)+'</option>').join('')+'</select></label><label>Selecionar arquivos<input name="files" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png" multiple required></label></div><small>Até 25 MB por arquivo. Arquivos PDF, Word, Excel, CSV, TXT, JPG ou PNG.</small><div class="work-actions"><button class="primary">Anexar arquivos</button></div></form><h3>Documentos anexados</h3><div id="attachment-list" class="scroll" aria-live="polite">Carregando arquivos…</div><section id="attachment-review" hidden></section>';
 const form=get('attachment-form'),list=get('attachment-list');
 let version=0;
 const panel=get('attachment-review');
 const visible=()=>form.isConnected;
 async function refresh(){
  try{
   const items=await attachmentTransaction('readonly',store=>store.index('client').getAll(client.id));
   if(!visible())return;
   if(!items.length){list.textContent='Nenhum documento anexado a este estabelecimento.';return}
   items.sort((a,b)=>b.added.localeCompare(a.added));
   list.innerHTML='<div class="actions"><button type="button" id="read-all">Ler todos os anexos</button></div><table><thead><tr><th scope="col">Arquivo</th><th scope="col">Tipo</th><th scope="col">Incluído em</th><th scope="col">Ações</th></tr></thead><tbody>'+items.map((item,i)=>'<tr><td>'+esc(item.name)+'<small>'+esc(new Intl.NumberFormat('pt-BR',{style:'unit',unit:'kilobyte',maximumFractionDigits:1}).format(item.blob.size/1000))+'</small></td><td>'+esc(item.category)+'</td><td>'+esc(new Date(item.added).toLocaleDateString('pt-BR'))+'</td><td><div class="actions">'+(canReadAttachment(item)?'<button type="button" data-import="'+i+'">Ler e preencher</button>':'')+'<button type="button" data-download="'+i+'">Baixar</button><button type="button" data-delete="'+i+'">Remover</button></div></td></tr>').join('')+'</tbody></table>';
   get('read-all').onclick=()=>runImport(items,true);
   list.querySelectorAll('[data-import]').forEach(button=>button.onclick=()=>runImport([items[Number(button.dataset.import)]],false));
   list.querySelectorAll('[data-download]').forEach(button=>button.onclick=()=>{
    const item=items[Number(button.dataset.download)];
    const url=URL.createObjectURL(item.blob),link=document.createElement('a');
    link.href=url;link.download=item.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
   });
   list.querySelectorAll('[data-delete]').forEach(button=>button.onclick=async()=>{
    const item=items[Number(button.dataset.delete)];
    if(!confirm('Remover o anexo “'+item.name+'” deste navegador?'))return;
    button.disabled=true;
    try{
     await attachmentTransaction('readwrite',store=>store.delete(item.id));
     if(visible()){message('Anexo removido.');await refresh()}
    }catch{if(visible()){button.disabled=false;message('Não foi possível remover o anexo.')}}
   });
  }catch{if(visible())list.textContent='Não foi possível abrir o armazenamento de arquivos deste navegador.'}
 }
 async function runImport(items,batch){
  const run=++version;
  let index=0,applied=0,skipped=0;
  const issues=[];
  let workingClient=current();
  const live=()=>visible()&&version===run;
  function controls(disabled){
   list.querySelectorAll('[data-import],[data-delete],#read-all').forEach(button=>button.disabled=disabled);
   form.querySelector('button').disabled=disabled;
  }
  function finish(stopped=false){
   if(!live())return;
   panel.innerHTML='<h3>'+(stopped?'Leitura interrompida':'Leitura concluída')+'</h3><p>'+applied+' documento(s) aplicado(s) · '+skipped+' pulado(s) · '+issues.length+' sem importação.</p>'+(issues.length?'<ul>'+issues.map(issue=>'<li>'+esc(issue)+'</li>').join('')+'</ul>':'');
   controls(false);
   version++;
  }
  async function next(){
   if(!live())return;
   if(index>=items.length){finish();return}
   const item=items[index++];
   if(!canReadAttachment(item)){
    issues.push(item.name+' — formato disponível para baixar. Para leitura, converta para PDF, DOCX, TXT ou CSV.');
    await next();return;
   }
   const prefix=batch?'Arquivo '+index+' de '+items.length+' · ':'';
   panel.textContent=prefix+'Lendo '+item.name+'…';
   let pages;
   try{
    pages=await readAttachment(item,status=>{if(live())panel.textContent=prefix+status});
    if(!pages.some(page=>page.text.trim()))throw new Error('Nenhum texto legível encontrado.');
   }catch(error){
    if(!live())return;
    const description=item.name+' — '+(error?.message||'falha de leitura');
    if(batch){issues.push(description);await next()}
    else{panel.textContent=description;controls(false)}
    return;
   }
   if(!live())return;
   if(!batch){reviewImport(workingClient,item,pages,panel);controls(false);return}
   const editor=document.createElement('div');
   const actions=document.createElement('div');
   actions.className='actions';
   actions.innerHTML='<button type="button">Pular documento</button><button type="button">Encerrar lote</button>';
   const [skip,stop]=actions.querySelectorAll('button');
   skip.onclick=()=>{skipped++;next()};
   stop.onclick=()=>finish(true);
   const heading=document.createElement('p');heading.textContent='Arquivo '+index+' de '+items.length;
   panel.replaceChildren(heading,actions,editor);
   reviewImport(workingClient,item,pages,editor,(updated,count)=>{
    workingClient=updated;applied++;message(count+' campo(s) aplicado(s).');next();
   });
  }
  panel.hidden=false;controls(true);await next();
 }
 form.onsubmit=async event=>{
  event.preventDefault();
  const files=[...form.elements.files.files],category=form.elements.category.value;
  if(!files.length)return;
  const invalid=files.filter(file=>!attachmentExtensions.test(file.name)||file.size===0||file.size>25*1024*1024);
  if(invalid.length){message('Verifique o formato e o tamanho de: '+invalid.map(file=>file.name).join(', '));return}
  const button=form.querySelector('button');button.disabled=true;
  try{
   await attachmentTransaction('readwrite',store=>{
    for(const file of files)store.add({id:crypto.randomUUID(),client:client.id,name:file.name,category,blob:file,added:new Date().toISOString()});
   });
   if(visible()){form.elements.files.value='';message(files.length===1?'Arquivo anexado.':files.length+' arquivos anexados.');await refresh()}
  }catch{if(visible())message('Não foi possível salvar os arquivos. Verifique o espaço e as permissões do navegador.')}
  finally{if(visible())button.disabled=false}
 };
 refresh();
}

function dashboard(client){
 if(!client){get('workspace').innerHTML='<h2>Painel documental</h2><p>Cadastre um estabelecimento para começar.</p>';return}
 const docs=Object.entries(client.docs);
 const dated=docs.filter(([,doc])=>doc.reviewDate).sort((a,b)=>a[1].reviewDate.localeCompare(b[1].reviewDate));
 get('workspace').innerHTML='<div class="dashboard"><div><h2>'+esc(client.name)+'</h2><p>Organize o cadastro, confira os requisitos e prepare os documentos.</p></div><div class="stats"><span><strong>'+((client.activities||[]).length)+'</strong> Atividades cadastradas</span><span><strong>'+docs.length+'</strong> Minutas salvas</span><span><strong>'+dated.length+'</strong> Revisões programadas</span></div></div><h3>Documentos do estabelecimento</h3><div class="doc-grid">'+Object.keys(forms).map(name=>'<article><span class="badge">'+(client.docs[name]?'Minuta salva':'Modelo editável')+'</span><h4>'+esc(name)+'</h4><p>'+esc(titles[name]||name)+'</p><button data-open="'+esc(name)+'">Abrir modelo</button></article>').join('')+'</div><h3>Calendário de revisões</h3>'+(dated.length?'<ul>'+dated.map(([name,doc])=>'<li>'+esc(doc.reviewDate.split('-').reverse().join('/'))+' — '+esc(name)+'</li>').join('')+'</ul>':'<p>Informe a próxima revisão no editor para acompanhar a data aqui.</p>');
 get('workspace').querySelectorAll('[data-open]').forEach(button=>button.onclick=()=>{docType=button.dataset.open;tab='docs';render()});
}
function editor(client){
 const values=client.docs[docType]||{};
 const tables=reportTables[docType]||[];
 const ref=references[docType];
 const canImport=client.fieldwork&&['PGR','AEP'].includes(docType);
 const pending='[PENDENTE]';
 const date=value=>value?value.split('-').reverse().join('/'):pending;
 const activityLabel=item=>item.sector?item.sector+' / '+item.name:item.name;
 const activities=(client.activities||[]).map(activityLabel);
 const meta=[['code','Código','text'],['revision','Revisão','text'],['issued','Data de elaboração','date'],['reviewDate','Próxima revisão','date'],['reviewer','Responsável pela revisão','text']];
 get('workspace').innerHTML='<div class="editor-head"><div><h2>'+esc(titles[docType]||docType)+'</h2><p>'+esc(client.name)+' · Minuta editável</p></div><label>Modelo<select id="type">'+Object.keys(forms).map(name=>'<option '+(name===docType?'selected':'')+'>'+name+'</option>').join('')+'</select></label></div><p class="reference"><a href="'+esc(ref[1])+'" target="_blank" rel="noopener noreferrer">'+esc(ref[0])+'</a></p>'+(canImport?'<p><button type="button" id="apply-fieldwork">Aproveitar levantamento de campo</button></p>':'')+'<form id="doc"><div class="grid">'+meta.map(([name,label,type])=>'<label>'+label+'<input type="'+type+'" name="'+name+'" value="'+esc(values[name]??(name==='revision'?'00':''))+'"></label>').join('')+'</div><label>Atividades abrangidas<textarea name="scope">'+esc(values.scope??activities.join('\\n'))+'</textarea></label>'+forms[docType].map((label,i)=>'<label>'+esc(label)+'<textarea name="f'+i+'">'+esc(values['f'+i])+'</textarea></label>').join('')+tables.map(([label,columns],i)=>'<fieldset class="model-table"><legend>'+esc(label)+'</legend><div class="scroll"><table><thead><tr>'+columns.map(column=>'<th scope="col">'+esc(column)+'</th>').join('')+'<th scope="col">Linha</th></tr></thead><tbody id="table-'+i+'"></tbody></table></div><button type="button" data-add="'+i+'">Adicionar linha</button>'+(activities.length&&i===0&&['PGR','AEP','APR'].includes(docType)?'<button type="button" id="reuse">Inserir atividades cadastradas</button>':'')+'</fieldset>').join('')+'<div class="actions"><button class="primary">Salvar minuta</button><button type="button" id="preview">Visualizar documento</button><button type="button" id="pdf">Imprimir / PDF</button><button type="button" id="word">Baixar Word editável</button></div></form>';
 function addRow(index,values=[]){
  const row=get('table-'+index).insertRow();
  tables[index][1].forEach((label,i)=>{
   const cell=row.insertCell(),input=document.createElement('textarea');
   input.setAttribute('aria-label',label);input.value=values[i]||'';cell.append(input);
  });
  const button=document.createElement('button');button.type='button';button.textContent='Remover';button.onclick=()=>row.remove();row.insertCell().append(button);
 }
 tables.forEach((_,i)=>(values.tables?.[i]||[]).forEach(row=>addRow(i,row)));
 get('doc').querySelectorAll('[data-add]').forEach(button=>button.onclick=()=>addRow(Number(button.dataset.add)));
 if(get('reuse'))get('reuse').onclick=()=>{
  const existing=[...get('table-0').rows].map(row=>row.querySelector('textarea').value.trim());
  activities.filter(value=>!existing.includes(value)).forEach(value=>addRow(0,[value]));
 };
 if(get('apply-fieldwork'))get('apply-fieldwork').onclick=()=>{
  const incoming=fieldworkReport(client.fieldwork,docType);
  for(const [name,value] of Object.entries(incoming.fields)){
   const input=get('doc').elements.namedItem(name);
   if(value&&!input.value.trim())input.value=value;
  }
  let count=0;
  incoming.tables.forEach((rows,index)=>{
   const existing=new Set([...get('table-'+index).rows].map(row=>JSON.stringify([...row.querySelectorAll('textarea')].map(input=>input.value.trim()))));
   rows.forEach(row=>{
    const id=JSON.stringify(row);
    if(existing.has(id))return;
    addRow(index,row);existing.add(id);count++;
   });
  });
  persist();
  message(count?count+' linha(s) do levantamento inserida(s). Confira o conteúdo antes da emissão.':'Nenhuma nova linha para inserir. Confira os campos da minuta.');
 };
 get('type').onchange=event=>{persist();docType=event.target.value;render()};
 function persist(){
  const data=Object.fromEntries(new FormData(get('doc')));
  data.tables=tables.map((_,i)=>[...get('table-'+i).rows].map(row=>[...row.querySelectorAll('textarea')].map(input=>input.value.trim())).filter(row=>row.some(Boolean)));
  client.docs[docType]=data;
  message(save()?'Minuta salva neste navegador.':'O navegador impediu o salvamento.');
  return data;
 }
 get('doc').onsubmit=event=>{event.preventDefault();persist()};
 function report(){
  const data=persist(),value=text=>text?.trim()||pending;
  const section=(text,content)=>[{kind:'heading',text},{kind:'paragraph',text:value(content)}];
  return [{kind:'title',text:titles[docType]||docType},{kind:'paragraph',text:'MINUTA PARA REVISÃO TÉCNICA'},
   {kind:'table',columns:['Estabelecimento','CNPJ','CNAE'],rows:[[client.name,value(client.cnpj),value(client.cnae)]]},
   {kind:'paragraph',text:'Endereço: '+value(client.address)+'  |  Empregados: '+value(client.workers)},
   {kind:'table',columns:['Código','Revisão','Elaboração','Próxima revisão'],rows:[[value(data.code),value(data.revision),date(data.issued),date(data.reviewDate)]]},
   ...section('Atividades abrangidas',data.scope),
   ...forms[docType].flatMap((label,i)=>section(label,data['f'+i])),
   ...tables.flatMap(([text,columns],i)=>[{kind:'heading',text},{kind:'table',columns,rows:(data.tables[i].length?data.tables[i]:[columns.map(()=>pending)]).map(row=>row.map(value))}]),
   ...section('Referência técnica',ref.join('\\n')),
   ...section('Responsável pela revisão',data.reviewer)];
 }
 function view(){
  const blocks=report();
  get('paper').innerHTML='<div class="report-brand"><img src="/brand/logo-viver-positiva.png" alt="Viver Segurança no Trabalho"></div>'+blocks.map(block=>{
   if(block.kind==='table')return '<div class="scroll"><table><thead><tr>'+block.columns.map(value=>'<th scope="col">'+esc(value)+'</th>').join('')+'</tr></thead><tbody>'+block.rows.map(row=>'<tr>'+row.map(value=>'<td>'+esc(value)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
   const tag=block.kind==='title'?'h2':block.kind==='heading'?'h3':'p';
   return '<'+tag+(block.text===pending?' class="pending"':'')+'>'+esc(block.text)+'</'+tag+'>';
  }).join('');
  get('paper').hidden=false;get('paper').scrollIntoView();
 }
 get('preview').onclick=view;
 get('pdf').onclick=async()=>{view();await get('paper').querySelector('img').decode().catch(()=>{});window.print()};
 get('word').onclick=()=>downloadWord(report(),docType).catch(()=>message('Não foi possível gerar o Word. Tente novamente.'));
}

async function downloadWord(report,name){
 const response=await fetch('/brand/logo-viver-positiva.png');
 if(!response.ok) throw new Error('Logo indisponível');
 const logo=new Uint8Array(await response.arrayBuffer());
 const drawing='<w:p><w:r><w:drawing><wp:inline xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="1143000" cy="864448"/><wp:docPr id="1" name="Viver SST"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="1" name="Viver SST"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="1143000" cy="864448"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>';
 const xml=value=>esc(value.replace(/[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f]/g,''));
 function paragraph(value,{color='173B37',size=22,bold=false}={}){
  return String(value).split(/\\r?\\n/).map(line=>'<w:p><w:r><w:rPr>'+ (bold?'<w:b/>':'')+'<w:color w:val="'+color+'"/><w:sz w:val="'+size+'"/></w:rPr><w:t xml:space="preserve">'+xml(line)+'</w:t></w:r></w:p>').join('');
 }
 function wordBlock(block){
  if(block.kind==='title')return paragraph(block.text,{size:44,bold:true,color:'102F2C'});
  if(block.kind==='heading')return paragraph(block.text,{size:28,bold:true,color:'18786C'});
  if(block.kind==='table'){
   const rows=[block.columns,...block.rows];
   return '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:bottom w:val="single" w:sz="5" w:color="D9EAE7"/><w:insideH w:val="single" w:sz="5" w:color="D9EAE7"/><w:insideV w:val="single" w:sz="5" w:color="D9EAE7"/></w:tblBorders></w:tblPr>'+rows.map((row,i)=>'<w:tr>'+(i===0?'<w:trPr><w:tblHeader/></w:trPr>':'')+row.map(value=>'<w:tc><w:tcPr><w:tcW w:w="'+Math.floor(5000/block.columns.length)+'" w:type="pct"/>'+(i===0?'<w:shd w:fill="102F2C"/>':'')+'</w:tcPr>'+paragraph(value,{color:i===0?'FFFFFF':'173B37',size:20,bold:i===0})+'</w:tc>').join('')+'</w:tr>').join('')+'</w:tbl>';
  }
  return paragraph(block.text,{color:block.text==='[PENDENTE]'?'8E4800':'173B37'});
 }
 const files={
  '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
  '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
  'word/media/logo.png':logo,
  'word/_rels/document.xml.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/></Relationships>',
   'word/document.xml':'<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+drawing+report.map(wordBlock).join('')+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1050" w:right="1000" w:bottom="1050" w:left="1000"/></w:sectPr></w:body></w:document>' 
 };
 const encoder=new TextEncoder(),local=[],central=[];
 let offset=0,centralSize=0;
 for(const [path,content] of Object.entries(files)){
  const filename=encoder.encode(path),data=typeof content==='string'?encoder.encode(content):content;
  let crc=-1;
  for(const byte of data){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}
  crc^=-1;
  const h=new DataView(new ArrayBuffer(30)),c=new DataView(new ArrayBuffer(46));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);
  h.setUint32(14,crc,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,filename.length,true);
  c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);
  c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,filename.length,true);c.setUint32(42,offset,true);
  local.push(h.buffer,filename,data);central.push(c.buffer,filename);
  offset+=30+filename.length+data.length;centralSize+=46+filename.length;
 }
 const end=new DataView(new ArrayBuffer(22)),count=Object.keys(files).length;
 end.setUint32(0,0x06054b50,true);end.setUint16(8,count,true);end.setUint16(10,count,true);end.setUint32(12,centralSize,true);end.setUint32(16,offset,true);
 const url=URL.createObjectURL(new Blob([...local,...central,end.buffer],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}));
 const link=document.createElement('a');link.href=url;link.download=name+'-Viver-SST.docx';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
get('clients').onchange=event=>{active=event.target.value;render();message('')};
get('new').onclick=()=>{active=undefined;tab='profile';render();message('');get('profile').elements.name.focus()};
document.querySelectorAll('[data-tab]').forEach(button=>button.onclick=()=>{tab=button.dataset.tab;render();message('')});
render();
</script></html>
`;
