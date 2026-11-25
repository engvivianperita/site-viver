const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),ts=require('typescript');
function setup({admin=true,active=true,membership=false,row=true,race=false}={}){
 const state={items:[{id:'step-1',title:'Etapa'}],questions:[],history:[],profile:{name:'Empresa'}};
 let saved=row?{id:'carnes-main',company_id:'company-A',state,version:2}:null;
 const source=ts.transpileModule(fs.readFileSync('src/lib/processos/server.ts','utf8').replace('import "server-only";',''),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const fetch=async(url,init={})=>{
  const u=new URL(url);
  if(u.pathname==='/auth/v1/user')return Response.json({id:'user-1'});
  if(u.pathname.endsWith('/profiles'))return Response.json([{id:'user-1',role:admin?'Administrador':'Consulta',active,name:'Usuário autorizado'}]);
  if(u.pathname.endsWith('/company_users'))return Response.json(membership?[{company_id:'company-A'}]:[]);
  if(u.pathname.endsWith('/companies'))return Response.json([{id:'company-A',name:'Empresa A'}]);
  if(u.pathname.endsWith('/regularization_workspaces')){
   if(init.method==='PATCH'){if(race)return Response.json([]);saved={...saved,...JSON.parse(init.body)};return Response.json([saved]);}
   if(init.method==='POST'){saved={...JSON.parse(init.body)};return Response.json([saved]);}
   return Response.json(saved?[structuredClone(saved)]:[]);
  }
  throw Error('Unexpected request: '+url);
 };
 const context={exports:{},process:{env:{NEXT_PUBLIC_SUPABASE_URL:'https://test.supabase.co',NEXT_PUBLIC_SUPABASE_ANON_KEY:'test-anon',SUPABASE_SERVICE_ROLE_KEY:'test-service'}},fetch,Response,URL,URLSearchParams,structuredClone};vm.createContext(context);vm.runInContext(source,context);
 const request=(method='GET',body,version='2',extra={})=>new Request('https://viversst.com.br/api/processos/carnes/state',{method,headers:{cookie:'viver-process-session=valid-test-token',origin:'https://viversst.com.br','If-Match':version,...extra},...(body?{body:JSON.stringify(body)}:{})});
 return{api:context.exports,request,state,getSaved:()=>saved};
}
test('anonymous request is rejected before any data is read',async()=>{const{api}=setup();await assert.rejects(api.authorize(new Request('https://viversst.com.br/api/processos/carnes/state')),e=>e.status===401)});
test('inactive users cannot access project',async()=>{const{api,request}=setup({active:false});await assert.rejects(api.authorize(request()),e=>e.status===403)});
test('client from another company is denied',async()=>{const{api,request}=setup({admin:false});await assert.rejects(api.authorize(request()),e=>e.status===403)});
test('authorized company member can read and save',async()=>{const{api,request,state,getSaved}=setup({admin:false,membership:true});assert.equal((await api.authorize(request())).admin,false);const response=await api.saveState(request('PUT',state));assert.equal(response.status,200);assert.equal(getSaved().version,3);assert.equal(getSaved().company_id,'company-A');assert.equal(getSaved().state.history.length,1)});
test('stale version and concurrent writes are rejected',async()=>{let s=setup();await assert.rejects(s.api.saveState(s.request('PUT',s.state,'1')),e=>e.status===409);s=setup({race:true});await assert.rejects(s.api.saveState(s.request('PUT',s.state)),e=>e.status===409)});
test('cross origin saves are rejected',async()=>{const{api,request,state}=setup();await assert.rejects(api.saveState(request('PUT',state,'2',{origin:'https://other.example'})),e=>e.status===403)});
test('only admin can assign a company',async()=>{const{api,request}=setup({admin:false,membership:true});await assert.rejects(api.updateAccess(request('PUT',{companyId:null})),e=>e.status===403)});
test('admin can initialize and assign a project',async()=>{const{api,request,state,getSaved}=setup({row:false});await api.saveState(request('PUT',state,'0'));assert.equal(getSaved().version,1);assert.equal(getSaved().company_id,null);await api.updateAccess(request('PUT',{companyId:'company-A'}));assert.equal(getSaved().company_id,'company-A')});
test('invalid backup is rejected before save',async()=>{const{api,request}=setup();await assert.rejects(api.saveState(request('PUT',{items:[]})),e=>e.status===400)});
test('migrated panel contains only local routes and valid guide PDF',()=>{const source=fs.readFileSync('src/lib/processos/carnes-assets.ts','utf8').replace('import "server-only";','');const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;const ctx={exports:{}};vm.createContext(ctx);vm.runInContext(js,ctx);assert.ok(ctx.exports.PANEL_HTML.includes('/api/processos/carnes/state'));assert.ok(!ctx.exports.PANEL_HTML.includes("fetch('/api/state'"));assert.ok(!ctx.exports.PANEL_HTML.includes('chatgpt.site'));assert.ok(ctx.exports.PANEL_HTML.includes('Imprimir checklist'));assert.ok(ctx.exports.GUIDE_HTML.includes('/clientes/processos/carnes/guia.pdf'));assert.equal(Buffer.from(ctx.exports.GUIDE_PDF_BASE64,'base64').subarray(0,4).toString(),'%PDF')});
