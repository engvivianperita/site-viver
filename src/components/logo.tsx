import Image from "next/image";
export function Logo({ negative=false }: { negative?: boolean }) { return <Image src={negative?"/brand/logo-viver-negativa.jpg":"/brand/logo-viver-positiva.png"} alt="Viver Segurança no Trabalho" width={170} height={70} className="h-12 w-auto object-contain" priority /> }
