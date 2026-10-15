import crypto from 'node:crypto';
import data from './course.json' with {type:'json'};
const {lessons,publicLessons,sources,version}=data;
const examLessons=[2,4,5,6,7,9,10,11,13,14].map(n=>lessons[n-1]);
export const basePath='/treinamentos/camara-fria';
const cookieName='viver_cf_session';
const id=()=>crypto.randomUUID(),now=()=>new Date().toISOString();
const localDate=d=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(d));
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status})};
const text=(v,n=1000)=>typeof v==='string'?v.trim().slice(0,n):'';
const required=(v,label,n=1000)=>text(v,n)||fail('Informe '+label+'.');
const uid=v=>{if(!/^[0-9a-f-]{36}$/i.test(v||''))fail('Identificador inválido.');return v};
const passwordCheck=p=>{if(typeof p!=='string'||p.length<12||p.length>128)fail('A senha deve ter entre 12 e 128 caracteres.')};
const digest=s=>crypto.createHash('sha256').update(s).digest('hex');
const hash=p=>{const salt=crypto.randomBytes(16).toString('hex');return salt+':'+crypto.scryptSync(p,salt,64).toString('hex')};
const verify=(p,h)=>{if(typeof p!=='string'||p.length>128)return false;const [salt,x]=h.split(':');const a=Buffer.from(x,'hex'),b=crypto.scryptSync(p,salt,64);return a.length===b.length&&crypto.timingSafeEqual(a,b)};
const clean=u=>u?{id:u.id,name:u.name,email:u.email,role:u.role,company:u.company,job:u.job,changePassword:!!u.change_password}:null;
const admin=u=>{if(u.role!=='admin')fail('Acesso restrito ao administrador.',403)};
async function rest(path,method='GET',body){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key||url.includes('SEU-PROJETO')||key.includes('SUA_CHAVE'))fail('A conexão do treinamento está sendo configurada.',503);
 const r=await fetch(url+'/rest/v1/'+path,{method,headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json',Prefer:'return=representation'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(15000)});
 const s=await r.text();let result;try{result=s?JSON.parse(s):null}catch{fail('Falha de comunicação com o banco.',502)}
 if(!r.ok){if(result?.code==='23505')fail('Este cadastro já existe.');if(result?.code==='P0001')fail(result.message);throw Error('Banco indisponível: '+r.status+' '+result?.code)}
 return result;
}
const rows=(table,q='')=>rest('cf_'+table+'?'+q);
const first=async(table,q)=>(await rows(table,q+'&limit=1'))[0];
const insert=(table,v)=>rest('cf_'+table,'POST',v);
const patch=(table,q,v)=>rest('cf_'+table+'?'+q,'PATCH',v);
const del=(table,q)=>rest('cf_'+table+'?'+q,'DELETE');
const rpc=(name,args)=>rest('rpc/cf_'+name,'POST',args);
const audit=(u,event,detail='')=>insert('audit',{actor:u,event,detail});
const progress=user=>rows('progress','user=eq.'+uid(user)+'&order=lesson');
const certificates=user=>rows('certificates','user=eq.'+uid(user)+'&select=id,created,revoked');
const eq=(column,value)=>column+'=eq.'+encodeURIComponent(value);
export async function handle(req){
 let cookie;
 const send=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...(cookie?{'Set-Cookie':cookie}:{})}});
 try{
 const url=new URL(req.url),p=url.pathname.split('/api/')[1];
 if(!['GET','POST'].includes(req.method))fail('Método inválido.',405);
 if(req.method==='POST'){
  if(!req.headers.get('content-type')?.startsWith('application/json'))fail('Formato inválido.',415);
  if(req.headers.get('origin')&&req.headers.get('origin')!==url.origin)fail('Origem não autorizada.',403);
  if(req.headers.get('sec-fetch-site')==='cross-site')fail('Origem não autorizada.',403);
 }
 const body=async()=>{const t=await req.text();if(t.length>100000)fail('Solicitação muito grande.',413);try{return JSON.parse(t)}catch{fail('Dados inválidos.')}};
 const setCookie=t=>`${cookieName}=${t}; HttpOnly; SameSite=Strict; Path=${basePath}; Max-Age=${t?28800:0}${url.protocol==='https:'?'; Secure':''}`;
 const token=req.headers.get('cookie')?.split('; ').find(c=>c.startsWith(cookieName+'='))?.split('=')[1];
 let u=null;
 if(token&&token.length<=100){const session=await first('sessions',eq('token',digest(token))+'&expires=gt.'+Date.now());if(session){const found=await first('users',eq('id',session.user)+'&active=eq.1');if(found&&found.auth_version===session.auth_version)u=found}}
 if(p==='me')return send({user:clean(u)});
 if(p==='login'&&req.method==='POST'){
  const b=await body(),email=text(b.email,160).toLowerCase();
  const key=digest(email),allowed=await rpc('limit',{p_key:key,p_now:Date.now()});if(!allowed)fail('Muitas tentativas. Aguarde 15 minutos.',429);
  const found=await first('users',eq('email',email)+'&active=eq.1');if(!found||!verify(b.password,found.password))fail('Login ou senha incorretos.',401);
  const t=crypto.randomBytes(32).toString('base64url');await insert('sessions',{token:digest(t),user:found.id,expires:Date.now()+28800000,auth_version:found.auth_version});await del('rate_limits',eq('key',key));cookie=setCookie(t);await audit(found.id,'login');return send({user:clean(found)});
 }
 if(!u)fail('Entre na sua conta.',401);
 if(p==='logout'&&req.method==='POST'){await del('sessions',eq('token',digest(token)));cookie=setCookie('');return send({ok:true})}
 if(p==='password'&&req.method==='POST'){const b=await body();passwordCheck(b.password);if(!verify(b.current,u.password))fail('Senha atual incorreta.',403);if(b.current===b.password)fail('Escolha uma senha diferente.');await rpc('password',{p_user:u.id,p_hash:hash(b.password),p_temporary:0});cookie=setCookie('');await audit(u.id,'password_changed');return send({ok:true})}
 if(u.change_password)fail('Troque a senha temporária para continuar.',403);
 if(p==='final-exam'&&req.method==='GET'){admin(u);return send({version,minimum:80,questions:examLessons.map(l=>({id:l.id,question:l.quiz[0],options:l.quiz[1]}))});}
 if(p==='course'&&req.method==='GET')return send({lessons:publicLessons,sources,version,progress:await progress(u.id),company:u.company?await first('companies',eq('id',u.company)):null,certificates:await certificates(u.id)});
 if(p==='ping'&&req.method==='POST'){const b=await body();if(!Number.isInteger(b.lesson)||!lessons[b.lesson-1])fail('Aula inválida.');return send({seconds:await rpc('ping',{p_user:u.id,p_lesson:b.lesson,p_now:Date.now()})})}
 if(p==='answer'&&req.method==='POST'){const b=await body(),l=lessons[b.lesson-1];if(!l||!Number.isInteger(b.answer)||b.answer<0||b.answer>2)fail('Resposta inválida.');const correct=b.answer===l.quiz[2];await rpc('answer',{p_user:u.id,p_lesson:b.lesson,p_answer:b.answer,p_correct:correct,p_version:version});return send({correct,feedback:l.quiz[3],progress:await progress(u.id)})}
 if(p==='admin'&&req.method==='GET'){
  admin(u);const users=await rows('users','select=id,name,email,role,company,job,change_password,active&order=name'),pr=await rows('progress'),cs=await rows('certificates','select=id,user,created,revoked');return send({shareUrl:url.origin+basePath+'/',companies:await rows('companies','order=name'),users:users.map(x=>({...x,progress:pr.filter(v=>v.user===x.id),certificates:cs.filter(c=>c.user===x.id)})),audit:await rows('audit','select=event,detail,created&order=id.desc&limit=40')});
 }
 if(p==='share-settings'&&req.method==='POST'){admin(u);const b=await body();if(b.url!==url.origin+basePath+'/')fail('O link do curso é definido pelo endereço desta publicação.');return send({ok:true})}
 if(p==='companies'&&req.method==='POST'){admin(u);const b=await body(),cid=id();await insert('companies',{id:cid,name:required(b.name,'a razão social',200),cnpj:required(b.cnpj,'o CNPJ',30),unit:required(b.unit,'a unidade e endereço',300),procedure:required(b.procedure,'o procedimento local',6000),contact:required(b.contact,'o contato do tutor',200)});await audit(u.id,'company_created',cid);return send({id:cid})}
 if(p==='users'&&req.method==='POST'){admin(u);const b=await body(),email=required(b.email,'o e-mail',160).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail('E-mail inválido.');passwordCheck(b.password);if(!await first('companies',eq('id',uid(b.company))))fail('Empresa inválida.');const userId=id();await insert('users',{id:userId,name:required(b.name,'o nome',160),email,password:hash(b.password),role:'student',company:b.company,job:required(b.job,'a função',160)});await audit(u.id,'employee_created',userId);return send({id:userId})}
 if(p==='reset'&&req.method==='POST'){admin(u);const b=await body();passwordCheck(b.password);if(!await first('users',eq('id',uid(b.user))+'&role=eq.student'))fail('Funcionário inválido.');await rpc('password',{p_user:b.user,p_hash:hash(b.password),p_temporary:1});await audit(u.id,'password_reset',b.user);return send({ok:true})}
 if(p==='issue'&&req.method==='POST'){
  admin(u);const b=await body(),student=await first('users',eq('id',uid(b.user))+'&role=eq.student');if(!student)fail('Funcionário inválido.');
  const pr=await progress(student.id);if(pr.filter(x=>x.completed).length!==lessons.length)fail('Conclua todas as aulas e exercícios.');
  const minutes=Number(b.minutes),online=Math.floor(pr.reduce((a,x)=>a+x.seconds,0)/60),total=online+minutes;
  if(!Number.isInteger(minutes)||minutes<1||minutes>2400)fail('Informe a duração real das atividades complementares.');
  if(!['complementar','inicial','periodico'].includes(b.type))fail('Modalidade inválida.');
  if((b.type==='inicial'&&total<240)||(b.type==='periodico'&&total<120))fail('Carga horária insuficiente.');
  if(b.practice!==true||b.review!==true||(b.type!=='complementar'&&b.fullscope!==true))fail('Confirme a prática, a revisão e o enquadramento do treinamento.');
  const start=required(b.start,'a data inicial',10),end=required(b.end,'a data final',10),today=localDate(now());
  const validDate=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
  if(!validDate(start)||!validDate(end)||start>end||end>today)fail('Datas inválidas ou futuras.');
  const dates=pr.map(x=>localDate(x.completed)).sort();if(start>dates[0]||end<dates.at(-1))fail('O período deve incluir a conclusão das aulas.');
  const snapshot={student:clean(student),company:await first('companies',eq('id',student.company)),type:b.type,online,minutes,total,start,end,place:required(b.place,'o local',200),instructor:required(b.instructor,'o instrutor e qualificação',500),responsible:required(b.responsible,'o responsável técnico e qualificação',500),activities:required(b.activities,'os registros da prática e avaliação',6000),evidence:required(b.evidence,'a referência dos registros',2000),version,topics:lessons.map(l=>l.title),issuer:u.name,issued:now(),ack:{practice:true,review:true,fullscope:b.fullscope===true}};
  if(b.examVersion!==version||b.supervised!==true)fail('Confirme a aplicação supervisionada da prova e atualize a página.');
  if(!Array.isArray(b.answers)||b.answers.length!==examLessons.length||b.answers.some(a=>!Number.isInteger(a)||a<0||a>2))fail('Responda todas as questões da prova final.');
  const correct=examLessons.filter((l,i)=>b.answers[i]===l.quiz[2]).length,score=correct*10;
  const exam={id:id(),user:student.id,actor:u.id,created:now(),version,answers:b.answers,score,passed:score>=80};
  await insert('final_exams',exam);
  await audit(u.id,'final_exam_graded',JSON.stringify({user:student.id,exam:exam.id,score}));
  if(!exam.passed)return send({passed:false,score,message:'Aproveitamento abaixo de 80%. Revise os assuntos e aplique nova avaliação.'});
  snapshot.exam={id:exam.id,score,minimum:80,version,supervised:true};
  const cid=id();await insert('certificates',{id:cid,user:student.id,snapshot});await audit(u.id,'certificate_generated',cid);return send({id:cid});
 }
 if(p==='revoke'&&req.method==='POST'){admin(u);const b=await body();await patch('certificates',eq('id',uid(b.id)),{revoked:1});await audit(u.id,'certificate_revoked',b.id);return send({ok:true})}
 if(p?.startsWith('certificate/')&&req.method==='GET'){const c=await first('certificates',eq('id',uid(p.split('/')[1])));if(!c)fail('Certificado não encontrado.',404);if(u.role!=='admin'&&c.user!==u.id)fail('Sem acesso a este certificado.',403);return send(c)}
 fail('Rota não encontrada.',404);
 }catch(e){if(!e.status)console.error('Falha no treinamento:',e.message);return send({error:e.status?e.message:'Não foi possível concluir. Tente novamente ou avise o responsável.'},e.status||500)}
}
