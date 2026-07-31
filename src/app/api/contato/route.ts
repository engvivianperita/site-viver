import { NextResponse } from "next/server";

const requiredFields=["Nome","Empresa","Telefone","E-mail","Cidade","Serviço de interesse","Número aproximado de trabalhadores","Mensagem"];
const clean=(value: unknown)=>String(value??"").trim().slice(0,3000);
const escapeHtml=(value:string)=>value.replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]!));

export async function POST(request: Request) {
  try {
    const body=await request.json() as Record<string,unknown>;
    if(clean(body.website)) return NextResponse.json({ok:true,email:false,whatsapp:false});
    const data=Object.fromEntries(requiredFields.map(field=>[field,clean(body[field])]));
    if(requiredFields.some(field=>!data[field]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["E-mail"])) return NextResponse.json({error:"Preencha corretamente todos os campos obrigatórios."},{status:400});
    const lines=["Nova solicitação pelo site da Viver","",...requiredFields.map(field=>`${field}: ${data[field]}`)];
    const html=`<h2>Nova solicitação pelo site</h2>${requiredFields.map(field=>`<p><strong>${escapeHtml(field)}:</strong> ${escapeHtml(data[field]).replace(/\n/g,"<br>")}</p>`).join("")}`;
    const [email,whatsapp]=await Promise.allSettled([sendEmail(html,data["E-mail"]),sendWhatsApp(lines.join("\n"))]);
    const emailSent=email.status==="fulfilled"&&email.value;
    const whatsappSent=whatsapp.status==="fulfilled"&&whatsapp.value;
    if(!emailSent&&!whatsappSent) return NextResponse.json({error:"Os canais de envio ainda não estão configurados. Tente novamente mais tarde."},{status:503});
    return NextResponse.json({ok:true,email:emailSent,whatsapp:whatsappSent});
  } catch { return NextResponse.json({error:"Não foi possível processar a solicitação."},{status:500}); }
}

async function sendEmail(html:string,replyTo:string){
  const key=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO_EMAIL,from=process.env.CONTACT_FROM_EMAIL;
  if(!key||!to||!from) return false;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:replyTo,subject:"Nova solicitação de proposta — Site Viver",html})});
  return response.ok;
}

async function sendWhatsApp(message:string){
  const token=process.env.WHATSAPP_ACCESS_TOKEN,phoneId=process.env.WHATSAPP_PHONE_NUMBER_ID,to=process.env.WHATSAPP_TO_NUMBER;
  if(!token||!phoneId||!to) return false;
  const response=await fetch(`https://graph.facebook.com/v23.0/${phoneId}/messages`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",recipient_type:"individual",to,type:"text",text:{preview_url:false,body:message.slice(0,4096)}})});
  return response.ok;
}
