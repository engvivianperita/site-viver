-- Executar no projeto Supabase já utilizado pelo portal Viver.
-- Os registros permanecem privados. O servidor valida sessão, perfil ativo e empresa.
create table if not exists public.regularization_workspaces (
  id text primary key,
  company_id text references public.companies(id),
  state jsonb not null,
  version integer not null default 1 check (version > 0),
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now(),
  constraint regularization_state_object check (jsonb_typeof(state) = 'object')
);
alter table public.regularization_workspaces enable row level security;
revoke all on table public.regularization_workspaces from anon, authenticated;
grant select, insert, update on table public.regularization_workspaces to service_role;
comment on table public.regularization_workspaces is 'Processos Viver com acesso exclusivo pela API do servidor e controle por empresa';
