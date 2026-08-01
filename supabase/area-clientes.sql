-- Área do Cliente Viver / Integra SSMA
create table if not exists public.companies(id text primary key,name text not null,cnpj text,segment text,city text,status text not null default 'Ativa',created_at timestamptz default now());
create table if not exists public.profiles(id uuid primary key references auth.users(id) on delete cascade,name text not null,email text,role text not null default 'Consulta',active boolean not null default true,created_at timestamptz default now());
create table if not exists public.company_users(company_id text references public.companies(id) on delete cascade,user_id uuid references public.profiles(id) on delete cascade,primary key(company_id,user_id));
create table if not exists public.works(id text primary key,company_id text not null references public.companies(id) on delete cascade,name text not null,code text,city text,manager text,status text,created_at timestamptz default now());
create table if not exists public.rdos(id bigint primary key,company_id text not null references public.companies(id),work_id text references public.works(id),record_date date not null,record_time time,work_name text,shift text,responsible text,weather text,workforce integer,activity text,risks text,occurrences text,status text,created_at timestamptz default now());
create table if not exists public.action_plans(id bigint primary key,company_id text not null references public.companies(id),work_id text references public.works(id),origin text,description text not null,responsible text,due_date date,priority text,status text,created_at timestamptz default now());
create table if not exists public.audits(id bigint primary key,company_id text not null references public.companies(id),work_id text references public.works(id),title text not null,standard text not null,subject text,audit_date date,auditor text,area text,answers jsonb not null default '{}',custom_items jsonb not null default '[]',status text,created_at timestamptz default now());

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and active and role='Administrador')$$;
create or replace function public.has_company(cid text) returns boolean language sql stable security definer set search_path=public as $$select public.is_admin() or exists(select 1 from public.company_users where user_id=auth.uid() and company_id=cid)$$;
alter table public.companies enable row level security;alter table public.profiles enable row level security;alter table public.company_users enable row level security;alter table public.works enable row level security;alter table public.rdos enable row level security;alter table public.action_plans enable row level security;alter table public.audits enable row level security;
create policy companies_scope on public.companies for select using(public.has_company(id));
create policy profiles_self on public.profiles for select using(id=auth.uid() or public.is_admin());
create policy memberships_self on public.company_users for select using(user_id=auth.uid() or public.is_admin());
create policy works_scope on public.works for all using(public.has_company(company_id)) with check(public.has_company(company_id));
create policy rdos_scope on public.rdos for all using(public.has_company(company_id)) with check(public.has_company(company_id));
create policy actions_scope on public.action_plans for all using(public.has_company(company_id)) with check(public.has_company(company_id));
create policy audits_scope on public.audits for all using(public.has_company(company_id)) with check(public.has_company(company_id));

