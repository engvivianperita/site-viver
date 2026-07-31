import { MessageCircle } from "lucide-react"; import { siteConfig } from "@/config/site";

export function WhatsAppButton(){
  const message=encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da Viver Segurança no Trabalho.");
  return <a className="whatsapp" href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Abrir conversa com a Viver no WhatsApp"><MessageCircle/></a>
}
