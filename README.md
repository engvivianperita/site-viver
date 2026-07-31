# Viver Segurança no Trabalho

Site institucional em Next.js, TypeScript, Tailwind CSS e App Router.

## Executar

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Dados que precisam ser configurados

Edite `src/config/site.ts` para informar telefone, WhatsApp, e-mail, Instagram, LinkedIn, domínio e, quando validado, registro profissional. Os valores provisórios estão identificados com `INSERIR_...` e comentados.

## Publicar na Vercel

1. Envie o projeto para um repositório Git.
2. Na Vercel, selecione **Add New > Project** e importe o repositório.
3. Mantenha o preset **Next.js** e os comandos detectados automaticamente.
4. Clique em **Deploy**.
5. Cadastre o domínio em **Settings > Domains** e atualize `siteConfig.url` com o endereço definitivo.

O formulário não armazena dados no servidor. Ele valida os campos no navegador e prepara o envio por WhatsApp; se o número não estiver configurado, utiliza e-mail quando disponível.

## Publicar uma notícia semanal

Edite `src/data/news.ts`, duplique um dos blocos existentes e altere `slug`, `title`, `summary`, `publishedAt`, `category` e `content`. Use a data no formato `AAAA-MM-DD` e um `slug` único, sem espaços ou acentos. As notícias são ordenadas automaticamente da mais recente para a mais antiga.

## Ativar o formulário por e-mail e WhatsApp

Copie as chaves indicadas em `.env.example` para as variáveis de ambiente da Vercel. O e-mail é enviado pela API do Resend e exige um domínio remetente verificado. O WhatsApp utiliza a Cloud API oficial da Meta e exige token permanente, ID do número comercial e número destinatário.

O formulário só confirma os canais que efetivamente aceitaram a mensagem. Se nenhuma integração estiver configurada, apresenta um erro claro sem descartar silenciosamente a solicitação.
