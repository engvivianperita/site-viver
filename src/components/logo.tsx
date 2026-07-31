import Image from "next/image";
export function Logo({ negative=false }: { negative?: boolean }) { return <Image src={negative?"/brand/logo-viver-negativa.jpg":"/brand/logo-viver-redonda.webp"} alt="Viver Segurança no Trabalho" width={negative?170:136} height={negative?70:136} className={negative?"h-12 w-auto object-contain":"header-logo"} priority /> }
