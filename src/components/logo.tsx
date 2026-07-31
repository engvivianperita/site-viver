import Image from "next/image";
export function Logo({ negative=false }: { negative?: boolean }) { return <Image src={negative?"/brand/logo-viver-negativa.jpg":"/brand/logo-viver-cabecalho.webp"} alt="Viver Segurança no Trabalho" width={negative?170:235} height={negative?70:165} className={negative?"h-12 w-auto object-contain":"header-logo"} priority /> }
