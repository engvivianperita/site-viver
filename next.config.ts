import type { NextConfig } from "next";
const nextConfig: NextConfig = { reactStrictMode: true, async rewrites(){return [{source:"/treinamentos/camara-fria/participante",destination:"/treinamentos/camara-fria/index.html"},{source:"/treinamentos/camara-fria/admin",destination:"/treinamentos/camara-fria/index.html"},{source:"/treinamentos/camara-fria",destination:"/treinamentos/camara-fria/index.html"},{source:"/treinamentos/camara-fria/certificado/:id",destination:"/treinamentos/camara-fria/index.html"}]} };
export default nextConfig;
