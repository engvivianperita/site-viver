# Migração do painel de carnes para a Netlify

O painel passa a usar o domínio do site Viver e o login já existente no Supabase. O cartão digital e as demais páginas existentes não são alterados.

## Rotas

- Pasta: `/clientes/processos`
- Painel: `/clientes/processos/carnes/painel`
- Guia: `/clientes/processos/carnes/guia`
- PDF: `/clientes/processos/carnes/guia.pdf`
- Sessão, acesso e dados: `/api/processos/...`

## Implantação

1. No mesmo projeto Supabase do portal, aplicar `supabase/migrations/20261124_regularization_workspaces.sql`. A tabela é exclusiva deste painel, com RLS ativada e sem acesso direto para `anon` ou `authenticated`.
2. Conferir que `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` já estão configuradas na Netlify, inclusive no ambiente das funções. A chave de serviço nunca é enviada ao navegador.
3. Exportar os dados do painel anterior em sessão autorizada. Guardar o backup em local privado; não versionar dados de clientes nem credenciais.
4. Importar o estado anterior com o script de migração, ou por uma operação administrativa equivalente. O script recusa substituir um registro já existente. Não desligar o painel anterior antes de conferir a cópia e bloquear gravações antigas durante a transferência final.
5. Publicar o código pela integração Git já usada pelo site. Verificar login, salvamento, nova leitura, guia e PDF antes de trocar definitivamente o acesso.
6. Como administrador da Viver, abrir Dados da empresa e selecionar a empresa autorizada, se o processo também será acessível aos usuários daquele cliente. Sem vínculo, o processo fica restrito a administradores ativos.
7. Depois da conferência, configurar o endereço antigo para orientar o usuário ao novo painel. Manter o backup e remover a rota temporária de exportação da hospedagem anterior.

## Permissões e integridade

O servidor valida o token no Supabase, consulta o perfil exato do usuário e exige perfil ativo. Administradores podem acessar o processo; demais usuários precisam de vínculo com a empresa designada. Só administradores podem mudar a empresa. As sessões do painel usam cookie HttpOnly e SameSite Strict; alterações exigem a mesma origem. Saves usam versão condicional para evitar sobrescritas de outra sessão. Há importação e exportação de backup em JSON.

Não inserir um token do ChatGPT ou um link privado como mecanismo de armazenamento. O painel novo não faz chamadas à hospedagem antiga.

## Verificação

- `node --test tests/processos-server.test.cjs`
- `npm run typecheck`
- `npm run build`

No ambiente publicado, conferir com uma conta administradora e uma conta de outra empresa: a segunda não pode ler, editar ou imprimir documentos do processo até ter vínculo autorizado. Sem login, dados e documentos ficam protegidos.
