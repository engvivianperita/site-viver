import Image from "next/image";
export function Logo({ negative=false }: { negative?: boolean }) { return <Image src={negative?"/brand/logo-viver-negativa-legivel.jpg":"/brand/logo-viver-positiva.png"} alt="Viver Segurança no Trabalho" width={negative?220:158} height={negative?130:120} className={negative?"footer-logo":"header-logo"} priority /> }
