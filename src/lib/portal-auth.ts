export type PortalSession={access_token:string;refresh_token:string;expires_in:number;user:{id:string;email?:string}};
export type PortalProfile={id:string;name:string;email:string;role:string;active:boolean};

const base=process.env.NEXT_PUBLIC_SUPABASE_URL||"";
const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"";
export const portalConfigured=Boolean(base&&key);

async function call(path:string,init:RequestInit={},token?:string){
  if(!portalConfigured)throw new Error("A Área do Cliente ainda aguarda a configuração do banco online.");
  const response=await fetch(`${base}${path}`,{...init,headers:{apikey:key,Authorization:`Bearer ${token||key}`,"Content-Type":"application/json",...(init.headers||{})}});
  const text=await response.text();if(!response.ok){try{const body=JSON.parse(text);throw new Error(body.msg||body.message||body.error_description||"Acesso não autorizado.")}catch(e){if(e instanceof Error)throw e;throw new Error("Acesso não autorizado.")}}
  return text?JSON.parse(text):null;
}

export async function portalSignIn(email:string,password:string):Promise<PortalSession>{return call("/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email,password})})}
export async function portalRecover(email:string){return call("/auth/v1/recover",{method:"POST",body:JSON.stringify({email,redirect_to:`${location.origin}/area-do-cliente`})})}
export async function portalProfile(token:string):Promise<PortalProfile|null>{const rows=await call("/rest/v1/profiles?select=id,name,email,role,active",{},token);return rows?.[0]||null}
export function savePortalSession(session:PortalSession){localStorage.setItem("integra-ssma-cloud-session",JSON.stringify(session))}
export function getPortalSession():PortalSession|null{try{return JSON.parse(localStorage.getItem("integra-ssma-cloud-session")||"null")}catch{return null}}
export function clearPortalSession(){localStorage.removeItem("integra-ssma-cloud-session")}

